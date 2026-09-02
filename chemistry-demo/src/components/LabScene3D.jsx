import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js'
import { SUBSTANCES } from '../data/substances'
import { woodTextures, stoneTextures, brushedMetalTexture, plasterTexture, baobabWoodTextures } from '../textures'

/* ============================================================
   LabScene3D — фотореалистичная 3D-сцена лаборатории (WebGL).
   ИГРА: потяни пробирку с реактивом и опусти её в колбу —
   пробирка наклонится, жидкость ВЫЛЬЕТСЯ струёй, раствор сменит цвет.
   Фотореализм: стекло с аттенюацией, туман, контактные тени,
   процедурные текстуры (старое дерево, камень, штукатурка, латунь).
   ============================================================ */

export default function LabScene3D({ substance, onPour, targetId }) {
  const mountRef = useRef(null)
  const substanceRef = useRef(substance)
  const onPourRef = useRef(onPour)
  const targetIdRef = useRef(targetId)

  useEffect(() => { substanceRef.current = substance }, [substance])
  useEffect(() => { onPourRef.current = onPour }, [onPour])
  useEffect(() => { targetIdRef.current = targetId }, [targetId])

  useEffect(() => {
    const mount = mountRef.current
    const W = mount.clientWidth || 1200
    const H = mount.clientHeight || 760

    /* ---------- Рендерер ---------- */
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.28
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    /* ---------- Сцена, камера, туман ---------- */
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0d1a14)
    scene.fog = new THREE.FogExp2(0x0d1a14, 0.024)
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100)
    camera.position.set(0, 6.6, 15.5)
    /* режиссёрский въезд камеры (приём из slow-zoom/dolly скилов) */
    const camStart = new THREE.Vector3(0, 10.5, 23)
    const camEnd = new THREE.Vector3(0, 6.6, 15.5)
    camera.position.copy(camStart)
    let camIntro = 0

    /* ---------- Окружение (IBL для стекла) ---------- */
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    /* ---------- Пост-обработка: SSAO (окклюзия) + Bloom ----------
       Стекло и жидкости НЕ пишут глубину (depthWrite:false) — SSAO работает
       только по непрозрачным поверхностям и больше не ломает прозрачность. */
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const ssaoPass = new SSAOPass(scene, camera, W, H)
    ssaoPass.kernelRadius = 6
    ssaoPass.minDistance = 0.004
    ssaoPass.maxDistance = 0.08
    composer.addPass(ssaoPass)
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(W, H), 0.2, 0.55, 0.85)
    composer.addPass(bloomPass)

    /* ---------- Свет (студийный, с мягкими тенями) ---------- */
    scene.add(new THREE.HemisphereLight(0xdfe8e0, 0x1a0e05, 0.55))
    scene.add(new THREE.AmbientLight(0xcfe8dd, 0.25))
    const key = new THREE.DirectionalLight(0xffe2b8, 2.6)
    key.position.set(6, 10, 6)
    key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    key.shadow.bias = -0.0004
    key.shadow.radius = 5
    key.shadow.camera.left = -8; key.shadow.camera.right = 8
    key.shadow.camera.top = 8; key.shadow.camera.bottom = -8
    key.shadow.camera.near = 1; key.shadow.camera.far = 30
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x7fd1ff, 1.0)
    rim.position.set(-6, 4, -4)
    scene.add(rim)
    const fill = new THREE.DirectionalLight(0xffffff, 0.3)
    fill.position.set(0, 3, 9)
    scene.add(fill)
    const bounce = new THREE.DirectionalLight(0xb8906a, 0.4)
    bounce.position.set(0, -2, 5)
    scene.add(bounce)

    /* ---------- Световые лучи из окна (сверху-слева) ---------- */
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xffe9c4, transparent: true, opacity: 0.05,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    })
    const beamGeo = new THREE.PlaneGeometry(3.4, 9)
    const beams = []
    ;[[-1.2, 4.6, -1.5, 0.55], [0.6, 4.2, -1.0, 0.42], [2.2, 4.9, -0.6, 0.5]].forEach(([bx, by, bz, tilt]) => {
      const beam = new THREE.Mesh(beamGeo, beamMat.clone())
      beam.position.set(bx, by, bz)
      beam.rotation.x = 0.38
      beam.rotation.z = tilt
      beam.userData.baseOpacity = 0.045 + Math.random() * 0.02
      scene.add(beam)
      beams.push(beam)
    })

    /* ---------- Пылинки в свете ---------- */
    const DUST_N = 90
    const dustGeo = new THREE.BufferGeometry()
    const dPos = new Float32Array(DUST_N * 3)
    for (let i = 0; i < DUST_N; i++) {
      dPos[i * 3] = (Math.random() - 0.5) * 7
      dPos[i * 3 + 1] = 0.3 + Math.random() * 4.5
      dPos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3))
    const dustMat = new THREE.PointsMaterial({
      color: 0xffe9c4, size: 0.035, transparent: true, opacity: 0.5,
      depthWrite: false, blending: THREE.AdditiveBlending,
    })
    const dust = new THREE.Points(dustGeo, dustMat)
    dust.frustumCulled = false
    scene.add(dust)
    const dustData = Array.from({ length: DUST_N }, (_, i) => ({
      sx: dPos[i * 3], sy: dPos[i * 3 + 1], sz: dPos[i * 3 + 2],
      ph: Math.random() * Math.PI * 2, sp: 0.1 + Math.random() * 0.25,
    }))

    /* ---------- Текстуры ---------- */
    const disposables = []
    const track = (tt) => { if (tt) disposables.push(tt); return tt }

    const benchWood = track(woodTextures({ seed: 11, planks: 4, knots: 20, scratches: 220 }))
    const floorStone = track(stoneTextures({ seed: 23 }))
    const brassMap = track(brushedMetalTexture({ base: '#8a6c3f', seed: 5 }))
    const ironMap = track(brushedMetalTexture({ base: '#3a4256', seed: 9 }))
    const wallMap = track(plasterTexture({ seed: 42 }))

    /* ---------- Стена сзади (старая штукатурка) ---------- */
    const wall = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 14.6),
      new THREE.MeshStandardMaterial({ map: wallMap, roughness: 0.95 })
    )
    wallMap.repeat.set(7, 3)
    wall.position.set(0, 4.7, -8)
    wall.receiveShadow = true
    scene.add(wall)

    /* ---------- Пол (старый камень, уровень пола) ---------- */
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(34, 34),
      new THREE.MeshStandardMaterial({ map: floorStone.map, roughness: 0.9, envMapIntensity: 0.5 })
    )
    floorStone.map.repeat.set(10, 10)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -2.6
    floor.receiveShadow = true
    scene.add(floor)

    /* ---------- Старый деревянный стол: столешница + 4 ножки ---------- */
    const baobab = track(baobabWoodTextures({ seed: 77, planks: 3, fibers: 900, cracks: 26 }))
    const tableWood = new THREE.MeshStandardMaterial({
      map: baobab.map,
      roughnessMap: baobab.roughnessMap,
      roughness: 0.8,
      metalness: 0.02,
    })
    const tableSideMat = new THREE.MeshStandardMaterial({ map: baobab.map, color: 0x9a9078, roughness: 0.92 })
    baobab.map.repeat.set(2, 4)
    baobab.roughnessMap.repeat.set(2, 4)

    /* столешница */
    const tabletop = new THREE.Mesh(new THREE.BoxGeometry(15, 0.5, 6.4), tableWood)
    tabletop.position.y = -0.25
    tabletop.castShadow = true
    tabletop.receiveShadow = true
    scene.add(tabletop)
    /* торцы столешницы чуть темнее */
    const tabletopEdge = new THREE.Mesh(new THREE.BoxGeometry(15.1, 0.56, 6.46), tableSideMat)
    tabletopEdge.position.y = -0.27
    scene.add(tabletopEdge)

    /* ножки — старые, со следами времени */
    const legGeo = new THREE.BoxGeometry(0.55, 2.2, 0.55)
    ;[
      [-6.65, -2.85], [6.65, -2.85], [-6.65, 2.85], [6.65, 2.85],
    ].forEach(([lx, lz], i) => {
      const leg = new THREE.Mesh(legGeo, i % 2 ? tableWood : tableSideMat)
      leg.position.set(lx, -1.48, lz) // низ ножки почти касается пола (-2.6)
      leg.castShadow = true
      leg.receiveShadow = true
      scene.add(leg)
      contactShadow(lx, lz, 0.6, 0.45, -2.57)
    })

    /* ---------- Материалы ----------
       «Фейковое стекло»: прозрачное, НЕ пишет глубину (depthWrite:false),
       поэтому жидкость внутри всегда видна сквозь стенку. Надёжнее
       transmission-стекла и не конфликтует с пост-обработкой. */
    const makeGlass = (roughness = 0.05) =>
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        transparent: true,
        opacity: 0.16,
        envMapIntensity: 1.7,
        side: THREE.DoubleSide,
        depthWrite: false,
      })

    /* фотореалистичная жидкость: преломление (transmission) + глубина цвета.
       depthWrite:false — видна сквозь «фейковое» стекло (которое не пишет глубину). */
    const makeLiquid = (hex) => {
      const col = new THREE.Color(hex)
      const dark = col.clone().multiplyScalar(0.5)
      return new THREE.MeshPhysicalMaterial({
        color: col,
        roughness: 0.07,
        metalness: 0,
        transmission: 0.92,
        ior: 1.33,
        thickness: 0.6,
        attenuationColor: dark,
        attenuationDistance: 1.6,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.5,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    }

    const brass = new THREE.MeshStandardMaterial({ map: brassMap, metalness: 0.85, roughness: 0.42 })
    const darkMetal = new THREE.MeshStandardMaterial({ map: ironMap, metalness: 0.7, roughness: 0.5 })

    /* ---------- Контактные тени ---------- */
    function contactShadow(x, z, r, opacity = 0.42, y = 0.015) {
      const c = document.createElement('canvas')
      c.width = 64; c.height = 64
      const cx = c.getContext('2d')
      const g = cx.createRadialGradient(32, 32, 2, 32, 32, 30)
      g.addColorStop(0, `rgba(0,0,0,${opacity})`)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      cx.fillStyle = g
      cx.fillRect(0, 0, 64, 64)
      const tex = track(new THREE.CanvasTexture(c))
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(r * 2, r * 2),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
      )
      m.rotation.x = -Math.PI / 2
      m.position.set(x, y, z)
      scene.add(m)
      return m
    }
    contactShadow(0, 0, 2.3, 0.5)
    contactShadow(-3.9, -1.8, 1.1, 0.4)
    contactShadow(4.2, -1.8, 1.2, 0.4)

    /* ---------- Колба Эрленмейера ---------- */
    const flaskPts = [
      new THREE.Vector2(0, 0), new THREE.Vector2(1.05, 0),
      new THREE.Vector2(1.3, 0.45), new THREE.Vector2(1.42, 0.95),
      new THREE.Vector2(1.48, 1.5), new THREE.Vector2(1.5, 2.0),
      new THREE.Vector2(0.5, 2.12), new THREE.Vector2(0.46, 2.5),
      new THREE.Vector2(0.46, 2.85),
    ]
    const flaskGeo = new THREE.LatheGeometry(flaskPts, 48)
    const flask = new THREE.Mesh(flaskGeo, makeGlass())
    flask.castShadow = true
    scene.add(flask)

    /* жидкость в колбе */
    const liqPts = [
      new THREE.Vector2(0.02, 0.02), new THREE.Vector2(0.98, 0.02),
      new THREE.Vector2(1.2, 0.45), new THREE.Vector2(1.32, 0.95),
      new THREE.Vector2(1.37, 1.45),
    ]
    const liqGeo = new THREE.LatheGeometry(liqPts, 40)
    const liquidMat = makeLiquid(substanceRef.current.color)
    const liquid = new THREE.Mesh(liqGeo, liquidMat)
    scene.add(liquid)
    /* поверхность жидкости (рефрактивный мениск) */
    const topMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(substanceRef.current.color),
      roughness: 0.06, metalness: 0,
      transmission: 0.9, ior: 1.33, thickness: 0.4,
      clearcoat: 1, clearcoatRoughness: 0.08,
      envMapIntensity: 1.4, depthWrite: false,
    })
    const liquidTop = new THREE.Mesh(new THREE.CircleGeometry(1.3, 40), topMat)
    liquidTop.rotation.x = -Math.PI / 2
    liquidTop.position.y = 1.44
    scene.add(liquidTop)

    /* пузырьки */
    const N = 42
    const bubbleGeo = new THREE.SphereGeometry(0.055, 8, 8)
    const bubbleMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, roughness: 0.1, clearcoat: 1, transparent: true,
      opacity: 0.9, envMapIntensity: 1.3, depthTest: false,
    })
    const bubbles = new THREE.InstancedMesh(bubbleGeo, bubbleMat, N)
    const bubbleData = Array.from({ length: N }, (_, i) => ({
      phase: Math.random() * Math.PI * 2,
      speed: 0.35 + Math.random() * 0.5,
      x: (Math.random() - 0.5) * 1.7,
      z: (Math.random() - 0.5) * 1.7,
      y: Math.random() * 1.4,
    }))
    scene.add(bubbles)

    /* ---------- Бюретка и штатив (слева) ---------- */
    const standRod = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 4.4, 12), darkMetal)
    standRod.position.set(-4.4, 2.2, -1.8)
    scene.add(standRod)
    const standArm = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.1), darkMetal)
    standArm.position.set(-4.2, 3.4, -1.8)
    scene.add(standArm)
    const burette = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 3.1, 24, 1, true), makeGlass(0.05))
    burette.position.set(-3.9, 1.55, -1.8)
    scene.add(burette)
    const buretteLiq = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 2.1, 24), makeLiquid(0x4e9a5e))
    buretteLiq.position.set(-3.9, 0.9, -1.8)
    scene.add(buretteLiq)
    const clamp = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.5, 10), brass)
    clamp.position.set(-4.05, 1.9, -1.8)
    scene.add(clamp)

    /* ---------- Штатив с пробирками (справа) ---------- */
    const rackBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.16, 0.7),
      new THREE.MeshStandardMaterial({ map: benchWood.map, color: 0xb0a090, roughness: 0.9 })
    )
    rackBase.position.set(4.2, 0.08, -1.8)
    scene.add(rackBase)
    ;[0x2e7fd4, 0x7a2a9e, 0xb07a2a].forEach((c, i) => {
      const tx = 3.4 + i * 0.8
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.3, 20, 1, true), makeGlass(0.05))
      tube.position.set(tx, 0.75, -1.8)
      scene.add(tube)
      const tl = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.9, 20), makeLiquid(c))
      tl.position.set(tx, 0.5, -1.8)
      scene.add(tl)
    })

    /* ---------- Реактивные пробирки (драг-энд-дроп) ---------- */
    const vials = []
    SUBSTANCES.forEach((s, i) => {
      const g = new THREE.Group()
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 1.6, 24, 1, true), makeGlass(0.04))
      const liq = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.05, 24), makeLiquid(s.color))
      liq.position.y = -0.18
      const cork = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.26, 0.26, 20),
        new THREE.MeshStandardMaterial({ map: brassMap, color: 0x9a6a3a, roughness: 0.95 })
      )
      cork.position.y = 0.78
      g.add(tube, liq, cork)
      const x = -3.9 + i * 2.55
      g.position.set(x, 0.8, 3.4)
      g.userData = { id: s.id, color: s.color, home: new THREE.Vector3(x, 0.8, 3.4), hover: false, locked: false }
      scene.add(g)
      vials.push(g)
      contactShadow(x, 3.4, 0.6, 0.4)
    })

    /* золотое кольцо-подсказка над целью миссии */
    const targetRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.46, 0.04, 12, 44),
      new THREE.MeshStandardMaterial({
        color: 0xd9a441, emissive: 0xb8860b, emissiveIntensity: 0.7,
        metalness: 0.7, roughness: 0.25,
      })
    )
    targetRing.rotation.x = Math.PI / 2
    targetRing.position.y = 0.03
    targetRing.visible = false
    scene.add(targetRing)

    /* зона сброса: кольцо на столе вокруг колбы */
    const dropRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.05, 0.045, 12, 60),
      new THREE.MeshStandardMaterial({
        color: 0x7fb8a0, emissive: 0x3e7a5e, emissiveIntensity: 0.5,
        metalness: 0.4, roughness: 0.4, transparent: true, opacity: 0.85,
      })
    )
    dropRing.rotation.x = -Math.PI / 2
    dropRing.position.set(0, 0.03, 0)
    dropRing.visible = false
    scene.add(dropRing)

    /* ---------- Управление камерой ---------- */
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 1.6, 0)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.minDistance = 6
    controls.maxDistance = 30
    controls.maxPolarAngle = Math.PI / 2.15
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.6

    /* ---------- Частицы ---------- */
    /* мягкая текстура-кружок для частиц (струя, брызги, пар) */
    const blobC = document.createElement('canvas')
    blobC.width = blobC.height = 64
    const blobX = blobC.getContext('2d')
    const blobG = blobX.createRadialGradient(32, 32, 2, 32, 32, 30)
    blobG.addColorStop(0, 'rgba(255,255,255,1)')
    blobG.addColorStop(0.55, 'rgba(255,255,255,0.45)')
    blobG.addColorStop(1, 'rgba(255,255,255,0)')
    blobX.fillStyle = blobG
    blobX.fillRect(0, 0, 64, 64)
    const blobTex = track(new THREE.CanvasTexture(blobC))

    const MAX_P = 60
    const particleGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(MAX_P * 3)
    const pCol = new Float32Array(MAX_P * 3)
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3))
    const pMat = new THREE.PointsMaterial({
      size: 0.11, map: blobTex, vertexColors: true, transparent: true,
      opacity: 1, depthWrite: false, depthTest: false,
    })
    const points = new THREE.Points(particleGeo, pMat)
    points.frustumCulled = false
    points.visible = false
    scene.add(points)
    const particles = []

    /* струя при выливании */
    const SMAX = 150
    const streamGeo = new THREE.BufferGeometry()
    const sPos = new Float32Array(SMAX * 3)
    const sCol = new Float32Array(SMAX * 3)
    streamGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3))
    streamGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3))
    const sMat = new THREE.PointsMaterial({
      size: 0.14, map: blobTex, vertexColors: true, transparent: true,
      opacity: 0.95, depthWrite: false, depthTest: false,
    })
    const stream = new THREE.Points(streamGeo, sMat)
    stream.frustumCulled = false
    stream.visible = false
    scene.add(stream)
    const streamParts = Array(SMAX).fill(null)
    let spIdx = 0

    /* сплошной столб жидкости из носика пробирки в колбу */
    const streamCol = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.09, 1, 14, 1, true),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff, roughness: 0.15, clearcoat: 1, clearcoatRoughness: 0.12,
        transparent: true, opacity: 0, depthWrite: false, depthTest: false,
        side: THREE.DoubleSide, envMapIntensity: 1.2,
      })
    )
    streamCol.visible = false
    scene.add(streamCol)

    /* ---------- Драг-энд-дроп ---------- */
    const raycaster = new THREE.Raycaster()
    const ndc = new THREE.Vector2()
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.8)
    const planeHit = new THREE.Vector3()
    /* центр колбы на столе (для проверки сброса) и точка над горлышком (для выливания) */
    const DROP_CTR = new THREE.Vector3(0, 0.8, 0)
    const POUR_CENTER = new THREE.Vector3(0, 2.62, -0.78)
    const POUR_TILT = -1.35
    let dragged = null
    let hovering = null
    let overFlask = false

    const toNDC = (e) => {
      const r = renderer.domElement.getBoundingClientRect()
      return new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    }

    const onDown = (e) => {
      if (pouring) return
      ndc.copy(toNDC(e))
      raycaster.setFromCamera(ndc, camera)
      const hits = raycaster.intersectObjects(vials, true)
      if (hits.length) {
        let g = hits[0].object
        while (g.parent && !vials.includes(g)) g = g.parent
        if (vials.includes(g) && !g.userData.locked) {
          dragged = g
          controls.enabled = false
          controls.autoRotate = false
          renderer.domElement.style.cursor = 'grabbing'
          dragged.userData.hover = true
        }
      }
    }
    const onMove = (e) => {
      ndc.copy(toNDC(e))
      raycaster.setFromCamera(ndc, camera)
      if (dragged) {
        raycaster.ray.intersectPlane(dragPlane, planeHit)
        if (planeHit) {
          dragged.position.x = THREE.MathUtils.clamp(planeHit.x, -5.5, 5.5)
          dragged.position.z = THREE.MathUtils.clamp(planeHit.z, -3.5, 5.5)
        }
        overFlask = dragged.position.distanceTo(DROP_CTR) < 3.0
        return
      }
      overFlask = false
      const hits = raycaster.intersectObjects(vials, true)
      const hitVial = hits.length ? (() => { let g = hits[0].object; while (g.parent && !vials.includes(g)) g = g.parent; return vials.includes(g) ? g : null })() : null
      if (hovering !== hitVial) {
        if (hovering) hovering.userData.hover = false
        hovering = hitVial
        if (hovering) hovering.userData.hover = true
        renderer.domElement.style.cursor = hovering ? 'grab' : 'default'
      }
    }
    const onUp = () => {
      if (dragged) {
        const d = dragged.position.distanceTo(DROP_CTR)
        if (d < 3.0) startPour(dragged, SUBSTANCES.find((x) => x.id === dragged.userData.id))
        else tweenHome(dragged)
        dragged.userData.hover = false
        dragged = null
        overFlask = false
        controls.enabled = true
        controls.autoRotate = true
        renderer.domElement.style.cursor = 'default'
      }
    }
    const tweenHome = (g) => {
      homeTweens.push({ g, from: g.position.clone(), to: g.userData.home.clone(), t: 0 })
    }

    /* ---------- Выливание ---------- */
    let pouring = null
    let pourAnim = null
    let shake = 0
    let afterPour = 0
    let dropTimer = 0
    let steamTimer = 0
    let lastPouredColor = new THREE.Color(0xffffff)
    let liquidRise = 0

    function startPour(g, s) {
      if (!s) return
      pouring = { g, s, color: new THREE.Color(s.color), phase: 0, t: 0, startPos: g.position.clone() }
      g.userData.locked = true
      g.userData.hover = false
      lastPouredColor = new THREE.Color(s.color)
      afterPour = 2.4
      hazeOpacity = 0.26
    }

    function spawnStream(dt) {
      if (!pouring) return
      const g = pouring.g
      g.updateMatrixWorld()
      const mouth = new THREE.Vector3(0, -0.8, 0).applyMatrix4(g.matrixWorld)
      for (let k = 0; k < 6; k++) {
        streamParts[spIdx] = {
          x: mouth.x + (Math.random() - 0.5) * 0.12,
          y: mouth.y - 0.05,
          z: mouth.z + (Math.random() - 0.5) * 0.12,
          vx: (0 - mouth.x) * 1.2 + (Math.random() - 0.5) * 0.35,
          vy: -2.1 - Math.random() * 0.7,
          vz: (0.2 - mouth.z) * 1.2 + (Math.random() - 0.5) * 0.35,
          life: 0,
          max: 0.75 + Math.random() * 0.35,
          col: pouring.color.clone(),
        }
        spIdx = (spIdx + 1) % SMAX
      }
      stream.visible = true
    }

    function updateStream(dt) {
      if (!stream.visible) return
      let alive = 0
      for (let i = 0; i < SMAX; i++) {
        const p = streamParts[i]
        if (!p) continue
        p.life += dt
        if (p.life >= p.max) { streamParts[i] = null; continue }
        p.vy -= 2.4 * dt
        p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt
        /* всплеск: капля отскакивает от поверхности раствора */
        if (p.y < 1.42 && p.vy < 0) {
          p.y = 1.42
          p.vy = 0.4 + Math.random() * 0.7
          p.vx += (Math.random() - 0.5) * 0.9
          p.vz += (Math.random() - 0.5) * 0.9
        }
        sPos[i * 3] = p.x; sPos[i * 3 + 1] = p.y; sPos[i * 3 + 2] = p.z
        const k = 1 - p.life / p.max
        sCol[i * 3] = p.col.r * k; sCol[i * 3 + 1] = p.col.g * k; sCol[i * 3 + 2] = p.col.b * k
        alive++
      }
      streamGeo.attributes.position.needsUpdate = true
      streamGeo.attributes.color.needsUpdate = true
      if (!alive) stream.visible = false
    }

    /* ---------- Капли на столе после выливания ---------- */
    const DROP_N = 16
    const dropGeo = new THREE.SphereGeometry(1, 16, 10)
    const dropPool = []
    for (let i = 0; i < DROP_N; i++) {
      const m = new THREE.Mesh(
        dropGeo,
        new THREE.MeshPhysicalMaterial({
          color: 0xffffff, roughness: 0.15, clearcoat: 1,
          transparent: true, opacity: 0, envMapIntensity: 1.2, depthWrite: false,
        })
      )
      m.visible = false
      m.userData = { active: false }
      scene.add(m)
      dropPool.push(m)
    }
    let dropIdx = 0
    function spawnDrop(color) {
      const m = dropPool[dropIdx]
      dropIdx = (dropIdx + 1) % DROP_N
      const ang = Math.random() * Math.PI * 2
      const rad = 1.0 + Math.random() * 1.5
      const size = 0.05 + Math.random() * 0.07
      m.userData = {
        active: true, t: 0, phase: 'grow',
        growT: 0.1 + Math.random() * 0.1, holdT: 2.2 + Math.random() * 1.6, fadeT: 1.5,
        size,
      }
      m.position.set(Math.cos(ang) * rad, 0.06, Math.sin(ang) * rad)
      m.material.color.set(color)
      m.material.opacity = 0
      m.visible = true
    }
    function updateDrops(dt) {
      for (const m of dropPool) {
        const u = m.userData
        if (!u.active) continue
        u.t += dt
        if (u.phase === 'grow') {
          const k = Math.min(u.t / u.growT, 1)
          m.scale.set(u.size * k, u.size * 0.42 * k, u.size * k)
          m.material.opacity = 0.85 * k
          if (k >= 1) { u.phase = 'hold'; u.t = 0 }
        } else if (u.phase === 'hold') {
          if (u.t >= u.holdT) { u.phase = 'fade'; u.t = 0 }
        } else {
          const k = Math.min(u.t / u.fadeT, 1)
          m.material.opacity = 0.85 * (1 - k)
          if (k >= 1) { m.visible = false; m.material.opacity = 0; u.active = false }
        }
      }
    }

    /* ---------- Пар над колбой и конденсат ---------- */
    const steamTex = blobTex

    const STEAM_N = 14
    const steamPool = []
    for (let i = 0; i < STEAM_N; i++) {
      const sp = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: steamTex, color: 0xffffff, transparent: true, opacity: 0, depthWrite: false })
      )
      sp.visible = false
      sp.userData = { active: false }
      scene.add(sp)
      steamPool.push(sp)
    }
    let steamIdx = 0
    function spawnSteam() {
      const sp = steamPool[steamIdx]
      steamIdx = (steamIdx + 1) % STEAM_N
      sp.userData = {
        active: true, t: 0,
        life: 1.8 + Math.random() * 1.4,
        vy: 0.5 + Math.random() * 0.55,
        drift: (Math.random() - 0.5) * 0.7,
        size: 0.45 + Math.random() * 0.5,
      }
      sp.position.set((Math.random() - 0.5) * 0.6, 2.8, (Math.random() - 0.5) * 0.6)
      sp.material.opacity = 0
      sp.visible = true
    }
    function updateSteam(dt) {
      for (const sp of steamPool) {
        const u = sp.userData
        if (!u.active) continue
        u.t += dt
        if (u.t >= u.life) { sp.visible = false; sp.material.opacity = 0; u.active = false; continue }
        const k = u.t / u.life
        sp.position.y += u.vy * dt
        sp.position.x += u.drift * dt * 0.4 + Math.sin(u.t * 2 + u.drift * 10) * dt * 0.3
        const grow = Math.min(1, k * 4)
        sp.scale.setScalar(u.size * (0.4 + 1.7 * grow))
        const fade = k < 0.72 ? Math.min(1, k * 5) : 1 - (k - 0.72) / 0.28
        sp.material.opacity = 0.3 * fade
      }
    }

    /* конденсат внутри колбы (лёгкая дымка сразу после вливания) */
    const haze = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 24, 18),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false })
    )
    haze.position.y = 1.05
    scene.add(haze)
    let hazeOpacity = 0

    function burst(hex) {
      const c = new THREE.Color(hex)
      for (let i = 0; i < MAX_P; i++) {
        const ang = Math.random() * Math.PI * 2
        particles[i] = {
          x: (Math.random() - 0.5) * 0.8,
          y: 1.9 + Math.random() * 0.5,
          z: (Math.random() - 0.5) * 0.8,
          vx: Math.cos(ang) * (0.5 + Math.random() * 0.9),
          vz: Math.sin(ang) * (0.5 + Math.random() * 0.9),
          vy: 1.2 + Math.random() * 1.8,
          life: 0,
          max: 0.7 + Math.random() * 0.5,
          col: c.clone().lerp(new THREE.Color(0xffffff), Math.random() * 0.4),
        }
      }
      points.visible = true
    }
    function updateParticles(dt) {
      if (!points.visible) return
      let alive = 0
      for (let i = 0; i < MAX_P; i++) {
        const p = particles[i]
        if (!p) continue
        p.life += dt
        if (p.life >= p.max) { particles[i] = null; continue }
        p.vy -= 3.2 * dt
        p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt
        pPos[i * 3] = p.x; pPos[i * 3 + 1] = p.y; pPos[i * 3 + 2] = p.z
        const k = 1 - p.life / p.max
        pCol[i * 3] = p.col.r * k; pCol[i * 3 + 1] = p.col.g * k; pCol[i * 3 + 2] = p.col.b * k
        alive++
      }
      pMat.opacity = alive ? Math.min(1, alive / 20) : 0
      particleGeo.attributes.position.needsUpdate = true
      particleGeo.attributes.color.needsUpdate = true
      if (!alive) points.visible = false
    }

    /* ---------- Цикл ---------- */
    const homeTweens = []
    const dummy = new THREE.Object3D()
    const clock = new THREE.Clock()
    let t = 0
    let raf = 0

    const easeOut = (k) => 1 - Math.pow(1 - k, 3)

    function animate() {
      raf = requestAnimationFrame(animate)
      const dt = Math.min(clock.getDelta(), 0.05)
      t += dt

      /* пузырьки */
      for (let i = 0; i < N; i++) {
        const b = bubbleData[i]
        const y = ((b.y + t * b.speed) % 1.35) + 0.18
        dummy.position.set(b.x, y, b.z)
        dummy.scale.setScalar(1 + 0.3 * Math.sin(t * 6 + b.phase))
        dummy.updateMatrix()
        bubbles.setMatrixAt(i, dummy.matrix)
      }
      bubbles.instanceMatrix.needsUpdate = true

      /* пылинки дрейфуют в свете (фотореализм) */
      const dp = dust.geometry.attributes.position.array
      for (let i = 0; i < DUST_N; i++) {
        const dd = dustData[i]
        dp[i * 3] = dd.sx + Math.sin(t * dd.sp + dd.ph) * 0.5
        dp[i * 3 + 1] = dd.sy + Math.sin(t * dd.sp * 0.7 + dd.ph * 2) * 0.4
        dp[i * 3 + 2] = dd.sz + Math.cos(t * dd.sp * 0.6 + dd.ph) * 0.5
      }
      dust.geometry.attributes.position.needsUpdate = true
      /* лёгкое мерцание световых лучей */
      for (const bm of beams) {
        bm.material.opacity = bm.userData.baseOpacity * (1 + 0.25 * Math.sin(t * 0.7 + bm.position.x))
      }

      /* машина выливания */
      if (pouring) {
        const p = pouring
        p.t += dt
        if (p.phase === 0) {
          const k = Math.min(p.t / 0.4, 1)
          p.g.position.lerpVectors(p.startPos, POUR_CENTER, easeOut(k))
          if (k >= 1) { p.phase = 1; p.t = 0 }
        } else if (p.phase === 1) {
          const k = Math.min(p.t / 0.5, 1)
          p.g.rotation.x = POUR_TILT * easeOut(k)
          spawnStream(dt)
          if (!pourAnim) {
            pourAnim = { from: liquidMat.color.clone(), to: new THREE.Color(p.s.color), t: 0 }
            shake = 1
            burst(p.s.color)
            if (onPourRef.current) onPourRef.current(p.s)
          }
          if (k >= 1) { p.phase = 2; p.t = 0 }
        } else if (p.phase === 2) {
          p.t += dt
          spawnStream(dt)
          if (p.t >= 0.7) {
            p.g.rotation.x = 0
            p.g.userData.locked = false
            tweenHome(p.g)
            pouring = null
          }
        }
      }

      /* сплошной столб жидкости из носика в колбу + подъём уровня */
      if (pouring && pouring.phase >= 1) {
        liquidRise = Math.min(0.12, liquidRise + dt * 0.2)
        const top = POUR_CENTER.y - 0.2
        const bot = 1.44 + liquidRise * 1.45
        const mid = (top + bot) / 2
        const hgt = Math.max(0.1, top - bot)
        streamCol.position.set(0, mid, 0)
        streamCol.scale.set(1, hgt, 1)
        streamCol.material.opacity = 0.85
        streamCol.material.color.set(pouring.s.color)
        streamCol.visible = true
      } else if (streamCol.visible) {
        streamCol.material.opacity = Math.max(0, streamCol.material.opacity - dt * 3.5)
        if (streamCol.material.opacity <= 0.01) streamCol.visible = false
      }
      /* уровень жидкости в колбе (чуть поднимается) */
      liquid.scale.y = 1 + liquidRise
      liquidTop.position.y = 1.44 + liquidRise * 1.45

      /* капли и пар — пока льётся и ещё ~1.5 c после */
      if (afterPour > 0) {
        afterPour -= dt
        dropTimer += dt
        if (dropTimer > 0.13) {
          dropTimer = 0
          spawnDrop(pouring ? pouring.s.color : lastPouredColor)
        }
        steamTimer += dt
        if (steamTimer > 0.17) {
          steamTimer = 0
          spawnSteam()
        }
      }
      /* конденсат внутри колбы тает */
      if (hazeOpacity > 0.002) {
        hazeOpacity = Math.max(0, hazeOpacity - dt * 0.05)
        haze.material.opacity = hazeOpacity
      }

      /* плавная смена цвета жидкости */
      if (pourAnim) {
        pourAnim.t += dt * 1.5
        if (pourAnim.t >= 1) {
          liquidMat.color.copy(pourAnim.to)
          topMat.color.copy(pourAnim.to)
          pourAnim = null
        } else {
          liquidMat.color.lerpColors(pourAnim.from, pourAnim.to, pourAnim.t)
          topMat.color.lerpColors(pourAnim.from, pourAnim.to, pourAnim.t)
        }
      }

      /* встряска колбы */
      if (shake > 0.01) {
        flask.rotation.z = Math.sin(t * 70) * 0.05 * shake
        shake *= Math.pow(0.002, dt)
      } else flask.rotation.z = 0

      /* возврат пробирок */
      for (let i = homeTweens.length - 1; i >= 0; i--) {
        const h = homeTweens[i]
        h.t += dt * 2.2
        if (h.t >= 1) { h.g.position.copy(h.to); h.g.rotation.x = 0; homeTweens.splice(i, 1) }
        else h.g.position.lerpVectors(h.from, h.to, h.t)
      }

      /* подсветка наведения */
      for (const g of vials) {
        const s = g.userData.hover ? 1.06 : 1
        g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 0.25))
      }

      /* лёгкое «дыхание» пробирок — видимое живое движение */
      for (let i = 0; i < vials.length; i++) {
        const g = vials[i]
        if (g === dragged || pouring === g || g.userData.locked || homeTweens.some((h) => h.g === g)) continue
        g.position.y = 0.8 + Math.sin(t * 1.4 + i * 1.9) * 0.035
      }

      /* кольцо цели миссии */
      const tv = vials.find((v) => v.userData.id === targetIdRef.current)
      if (tv) {
        targetRing.visible = true
        targetRing.position.x = tv.position.x
        targetRing.position.z = tv.position.z
        targetRing.scale.setScalar(1 + 0.07 * Math.sin(t * 4))
        targetRing.material.emissiveIntensity = 0.6 + 0.5 * Math.sin(t * 4)
      } else targetRing.visible = false

      /* зона сброса светится, когда пробирка над колбой */
      if (overFlask) {
        dropRing.visible = true
        dropRing.scale.setScalar(1 + 0.08 * Math.sin(t * 6))
        dropRing.material.emissiveIntensity = 1.1 + 0.5 * Math.sin(t * 6)
        dropRing.material.opacity = 0.95
      } else {
        dropRing.visible = false
      }

      updateParticles(dt)
      updateStream(dt)
      updateDrops(dt)
      updateSteam(dt)
      /* въезд камеры: пока идёт — не даём OrbitControls перехватить позицию */
      if (camIntro < 1) {
        camIntro = Math.min(1, camIntro + dt / 1.8)
        const k = 1 - Math.pow(1 - camIntro, 3)
        camera.position.lerpVectors(camStart, camEnd, k)
      } else {
        controls.update()
      }
      composer.render()
    }
    animate()

    /* ---------- Ресайз ---------- */
    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth, h = mount.clientHeight
      renderer.setSize(w, h)
      composer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    ro.observe(mount)

    /* ---------- События мыши ---------- */
    renderer.domElement.addEventListener('pointerdown', onDown)
    renderer.domElement.addEventListener('pointerup', onUp)
    renderer.domElement.addEventListener('pointercancel', onUp)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    renderer.domElement.style.touchAction = 'none'

    /* ---------- Очистка ---------- */
    return () => {
      cancelAnimationFrame(raf)
      renderer.domElement.removeEventListener('pointerdown', onDown)
      renderer.domElement.removeEventListener('pointerup', onUp)
      renderer.domElement.removeEventListener('pointercancel', onUp)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      ro.disconnect()
      controls.dispose()
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose()
        if (o.material) {
          const ms = Array.isArray(o.material) ? o.material : [o.material]
          ms.forEach((m) => m.dispose())
        }
      })
      disposables.forEach((tt) => tt.dispose && tt.dispose())
      pmrem.dispose()
      composer.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="scene3d" />
}
