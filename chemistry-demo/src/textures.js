import * as THREE from 'three'

/* ============================================================
   Процедурные текстуры (canvas → THREE.CanvasTexture).
   Старое дерево, каменный пол, состаренная латунь, штукатурка —
   без внешних файлов, всё генерируется на лету.
   ============================================================ */

function seeded(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

/* ---------- Старое дерево ---------- */
export function woodTextures({ seed = 7, planks = 4, knots = 16, scratches = 160 } = {}) {
  const rnd = seeded(seed)
  const w = 512, h = 512
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const x = c.getContext('2d')

  // основа — состаренный тёмный дуб
  x.fillStyle = '#2e1c0e'
  x.fillRect(0, 0, w, h)

  // доски (горизонтальные полосы)
  const plankH = h / planks
  for (let p = 0; p < planks; p++) {
    const tone = 0.92 + rnd() * 0.16
    x.fillStyle = `rgba(62,40,20,${tone})`
    x.fillRect(0, p * plankH, w, plankH)
    // край доски — светлее/темнее
    x.fillStyle = `rgba(20,10,4,${0.25 + rnd() * 0.2})`
    x.fillRect(0, p * plankH, w, 4)
  }
  // щели между досками
  for (let p = 1; p < planks; p++) {
    x.strokeStyle = 'rgba(0,0,0,0.6)'
    x.lineWidth = 3
    x.beginPath(); x.moveTo(0, p * plankH + 2); x.lineTo(w, p * plankH + 2); x.stroke()
    x.strokeStyle = 'rgba(255,225,180,0.06)'
    x.lineWidth = 1
    x.beginPath(); x.moveTo(0, p * plankH + 4); x.lineTo(w, p * plankH + 4); x.stroke()
  }

  // волокна древесины (волнистые линии)
  for (let i = 0; i < 420; i++) {
    const y = rnd() * h
    const amp = 1.5 + rnd() * 5
    const alpha = 0.05 + rnd() * 0.09
    const light = rnd() > 0.55
    x.strokeStyle = light ? `rgba(200,160,110,${alpha})` : `rgba(12,6,2,${alpha})`
    x.lineWidth = 0.6 + rnd() * 1.2
    x.beginPath()
    for (let xx = 0; xx <= w; xx += 8) {
      const yy = y + Math.sin(xx * 0.018 + i * 1.7) * amp + Math.sin(xx * 0.05 + i) * 1.2
      if (xx === 0) x.moveTo(xx, yy); else x.lineTo(xx, yy)
    }
    x.stroke()
  }

  // сучки
  for (let k = 0; k < knots; k++) {
    const kx = 30 + rnd() * (w - 60)
    const ky = 30 + rnd() * (h - 60)
    const kr = 6 + rnd() * 14
    for (let rr = kr; rr > 2; rr -= 2) {
      x.strokeStyle = `rgba(16,7,2,${0.12 + (kr - rr) / kr * 0.3})`
      x.lineWidth = 1.4
      x.beginPath()
      x.ellipse(kx, ky, rr, rr * (0.7 + rnd() * 0.3), rnd() * 3, 0, Math.PI * 2)
      x.stroke()
    }
    x.fillStyle = 'rgba(10,4,1,0.7)'
    x.beginPath(); x.ellipse(kx, ky, 2.4, 1.8, 0, 0, Math.PI * 2); x.fill()
  }

  // царапины и потёртости
  for (let s = 0; s < scratches; s++) {
    const sx = rnd() * w, sy = rnd() * h
    const len = 12 + rnd() * 46
    const light = rnd() > 0.5
    x.strokeStyle = light ? 'rgba(235,215,180,0.12)' : 'rgba(0,0,0,0.3)'
    x.lineWidth = 0.6 + rnd() * 1.3
    x.beginPath()
    x.moveTo(sx, sy)
    x.lineTo(sx + len, sy + (rnd() - 0.5) * 8)
    x.stroke()
  }

  // тёмные пятна (грязь, пролитое)
  for (let s = 0; s < 12; s++) {
    const sx = rnd() * w, sy = rnd() * h, r = 18 + rnd() * 70
    const g = x.createRadialGradient(sx, sy, 2, sx, sy, r)
    g.addColorStop(0, 'rgba(0,0,0,0.22)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    x.fillStyle = g
    x.beginPath(); x.arc(sx, sy, r, 0, Math.PI * 2); x.fill()
  }

  // карта шероховатости (для roughnessMap)
  const rc = document.createElement('canvas')
  rc.width = w; rc.height = h
  const rx = rc.getContext('2d')
  rx.fillStyle = '#8a8a8a'
  rx.fillRect(0, 0, w, h)
  const img = x.getImageData(0, 0, w, h).data
  const out = rx.createImageData(w, h)
  for (let i = 0; i < img.length; i += 4) {
    const lum = (img[i] * 0.3 + img[i + 1] * 0.5 + img[i + 2] * 0.2)
    const v = 130 + (lum - 90) * 0.45 + (rnd() - 0.5) * 26
    const gv = Math.max(60, Math.min(200, v))
    out.data[i] = out.data[i + 1] = out.data[i + 2] = gv
    out.data[i + 3] = 255
  }
  rx.putImageData(out, 0, 0)

  const map = new THREE.CanvasTexture(c)
  map.wrapS = map.wrapT = THREE.RepeatWrapping
  map.colorSpace = THREE.SRGBColorSpace
  map.anisotropy = 4
  const roughnessMap = new THREE.CanvasTexture(rc)
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping
  return { map, roughnessMap }
}

/* ---------- Каменный пол ---------- */
export function stoneTextures({ seed = 21 } = {}) {
  const rnd = seeded(seed)
  const w = 512, h = 512
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const x = c.getContext('2d')

  x.fillStyle = '#141414'
  x.fillRect(0, 0, w, h)

  // плиты
  const rows = 4, cols = 4
  const cw = w / cols, ch = h / rows
  for (let r = 0; r < rows; r++) {
    for (let cc = 0; cc < cols; cc++) {
      const tone = 0.16 + rnd() * 0.12
      x.fillStyle = `rgb(${Math.round(20 + tone * 120)},${Math.round(20 + tone * 120)},${Math.round(22 + tone * 130)})`
      x.fillRect(cc * cw + 2, r * ch + 2, cw - 4, ch - 4)
      // трещинки на плите
      const cracks = 2 + Math.floor(rnd() * 4)
      for (let k = 0; k < cracks; k++) {
        const sx = cc * cw + rnd() * cw, sy = r * ch + rnd() * ch
        x.strokeStyle = 'rgba(0,0,0,0.35)'
        x.lineWidth = 1
        x.beginPath(); x.moveTo(sx, sy)
        x.lineTo(sx + (rnd() - 0.5) * 30, sy + (rnd() - 0.5) * 30)
        x.stroke()
      }
      // пятна на плите
      const stains = 1 + Math.floor(rnd() * 3)
      for (let k = 0; k < stains; k++) {
        const sx = cc * cw + rnd() * cw, sy = r * ch + rnd() * ch, r_ = 4 + rnd() * 12
        const g = x.createRadialGradient(sx, sy, 1, sx, sy, r_)
        g.addColorStop(0, 'rgba(0,0,0,0.28)')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        x.fillStyle = g
        x.beginPath(); x.arc(sx, sy, r_, 0, Math.PI * 2); x.fill()
      }
    }
  }
  // швы между плитами
  x.strokeStyle = 'rgba(0,0,0,0.75)'
  x.lineWidth = 3
  for (let i = 1; i < rows; i++) {
    x.beginPath(); x.moveTo(0, i * ch); x.lineTo(w, i * ch); x.stroke()
  }
  for (let i = 1; i < cols; i++) {
    x.beginPath(); x.moveTo(i * cw, 0); x.lineTo(i * cw, h); x.stroke()
  }
  // грязь в швах
  for (let i = 0; i < 90; i++) {
    const sx = rnd() * w, sy = rnd() * h
    x.strokeStyle = `rgba(60,45,25,${0.12 + rnd() * 0.2})`
    x.lineWidth = 2 + rnd() * 2
    x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + 8, sy); x.stroke()
  }

  const map = new THREE.CanvasTexture(c)
  map.wrapS = map.wrapT = THREE.RepeatWrapping
  map.colorSpace = THREE.SRGBColorSpace
  map.anisotropy = 4
  return { map }
}

/* ---------- Состаренная латунь / металл ---------- */
export function brushedMetalTexture({ base = '#8a6c3f', seed = 5 } = {}) {
  const rnd = seeded(seed)
  const w = 256, h = 256
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const x = c.getContext('2d')
  x.fillStyle = base
  x.fillRect(0, 0, w, h)
  // щёточные полосы
  for (let i = 0; i < 900; i++) {
    const y = rnd() * h
    const light = rnd() > 0.5
    x.strokeStyle = light ? `rgba(255,225,170,${0.05 + rnd() * 0.1})` : `rgba(0,0,0,${0.08 + rnd() * 0.14})`
    x.lineWidth = 0.5 + rnd() * 0.8
    x.beginPath(); x.moveTo(0, y); x.lineTo(w, y); x.stroke()
  }
  // патина и пятна
  for (let s = 0; s < 8; s++) {
    const sx = rnd() * w, sy = rnd() * h, r = 10 + rnd() * 40
    const g = x.createRadialGradient(sx, sy, 2, sx, sy, r)
    g.addColorStop(0, 'rgba(30,60,40,0.18)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    x.fillStyle = g
    x.beginPath(); x.arc(sx, sy, r, 0, Math.PI * 2); x.fill()
  }
  const map = new THREE.CanvasTexture(c)
  map.wrapS = map.wrapT = THREE.RepeatWrapping
  map.colorSpace = THREE.SRGBColorSpace
  return map
}

/* ---------- Старая штукатурка стены ---------- */
export function plasterTexture({ seed = 42 } = {}) {
  const rnd = seeded(seed)
  const w = 512, h = 384
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const x = c.getContext('2d')
  x.fillStyle = '#3a3d35'
  x.fillRect(0, 0, w, h)
  // неровный слой штукатурки
  for (let i = 0; i < 2600; i++) {
    const sx = rnd() * w, sy = rnd() * h, r = 1.5 + rnd() * 6
    const light = rnd() > 0.5
    const g = x.createRadialGradient(sx, sy, 0.5, sx, sy, r)
    if (light) {
      g.addColorStop(0, `rgba(110,112,100,${0.08 + rnd() * 0.12})`)
    } else {
      g.addColorStop(0, `rgba(20,20,16,${0.1 + rnd() * 0.14})`)
    }
    g.addColorStop(1, 'rgba(0,0,0,0)')
    x.fillStyle = g
    x.beginPath(); x.arc(sx, sy, r, 0, Math.PI * 2); x.fill()
  }
  // трещины
  for (let k = 0; k < 9; k++) {
    let sx = rnd() * w, sy = rnd() * h
    x.strokeStyle = 'rgba(12,12,10,0.5)'
    x.lineWidth = 1 + rnd()
    x.beginPath(); x.moveTo(sx, sy)
    const segs = 5 + Math.floor(rnd() * 8)
    for (let s = 0; s < segs; s++) {
      sx += (rnd() - 0.5) * 40
      sy += (rnd() - 0.5) * 40
      x.lineTo(sx, sy)
    }
    x.stroke()
  }
  // копоть сверху (старая лампа)
  const soot = x.createLinearGradient(0, 0, 0, h * 0.3)
  soot.addColorStop(0, 'rgba(8,8,6,0.5)')
  soot.addColorStop(1, 'rgba(8,8,6,0)')
  x.fillStyle = soot
  x.fillRect(0, 0, w, h * 0.3)

  const map = new THREE.CanvasTexture(c)
  map.wrapS = map.wrapT = THREE.RepeatWrapping
  map.colorSpace = THREE.SRGBColorSpace
  map.anisotropy = 4
  return map
}

/* ---------- Древнее дерево баобаба ----------
   Светлое, волокнистое, грубое — как срез тысячелетнего ствола:
   длинные волокна, глубокие трещины, выветренные пятна. */
export function baobabWoodTextures({ seed = 77, planks = 3, fibers = 900, cracks = 26 } = {}) {
  const rnd = seeded(seed)
  const w = 512, h = 512
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const x = c.getContext('2d')

  const base = x.createLinearGradient(0, 0, 0, h)
  base.addColorStop(0, '#cfbb92')
  base.addColorStop(0.5, '#c2ab7d')
  base.addColorStop(1, '#ad9468')
  x.fillStyle = base
  x.fillRect(0, 0, w, h)

  const plankH = h / planks
  for (let p = 0; p < planks; p++) {
    const tone = 0.94 + rnd() * 0.12
    x.fillStyle = `rgba(190,170,130,${tone})`
    x.fillRect(0, p * plankH, w, plankH)
  }
  for (let p = 1; p < planks; p++) {
    x.strokeStyle = 'rgba(80,60,30,0.55)'
    x.lineWidth = 3
    x.beginPath(); x.moveTo(0, p * plankH + 2); x.lineTo(w, p * plankH + 2); x.stroke()
  }

  for (let i = 0; i < fibers; i++) {
    const y = rnd() * h
    const amp = 0.8 + rnd() * 3
    const light = rnd() > 0.5
    x.strokeStyle = light
      ? `rgba(240,225,190,${0.10 + rnd() * 0.16})`
      : `rgba(120,95,55,${0.10 + rnd() * 0.16})`
    x.lineWidth = 0.5 + rnd() * 1.1
    x.beginPath()
    for (let xx = 0; xx <= w; xx += 6) {
      const yy = y + Math.sin(xx * 0.014 + i * 2.3) * amp + Math.sin(xx * 0.04 + i) * 0.8
      if (xx === 0) x.moveTo(xx, yy); else x.lineTo(xx, yy)
    }
    x.stroke()
  }

  for (let k = 0; k < cracks; k++) {
    let sx = rnd() * w, sy = rnd() * h
    const segs = 6 + Math.floor(rnd() * 9)
    x.strokeStyle = `rgba(70,50,25,${0.5 + rnd() * 0.35})`
    x.lineWidth = 1.6 + rnd() * 1.8
    x.beginPath(); x.moveTo(sx, sy)
    for (let s = 0; s < segs; s++) {
      sx += (rnd() - 0.5) * 46
      sy += (rnd() - 0.5) * 46
      x.lineTo(sx, sy)
    }
    x.stroke()
    x.strokeStyle = 'rgba(245,230,195,0.25)'
    x.lineWidth = 0.8
    x.beginPath(); x.moveTo(sx + 2, sy + 2)
    for (let s = 0; s < 4; s++) {
      sx += (rnd() - 0.5) * 20
      sy += (rnd() - 0.5) * 20
      x.lineTo(sx, sy)
    }
    x.stroke()
  }

  for (let s = 0; s < 16; s++) {
    const sx = rnd() * w, sy = rnd() * h, r = 22 + rnd() * 80
    const g = x.createRadialGradient(sx, sy, 2, sx, sy, r)
    g.addColorStop(0, `rgba(${90 + Math.floor(rnd() * 40)},${70 + Math.floor(rnd() * 30)},${40},0.20)`)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    x.fillStyle = g
    x.beginPath(); x.arc(sx, sy, r, 0, Math.PI * 2); x.fill()
  }
  for (let s = 0; s < 8; s++) {
    const sx = rnd() * w, sy = rnd() * h, r = 8 + rnd() * 26
    const g = x.createRadialGradient(sx, sy, 1, sx, sy, r)
    g.addColorStop(0, 'rgba(50,36,18,0.3)')
    g.addColorStop(1, 'rgba(50,36,18,0)')
    x.fillStyle = g
    x.beginPath(); x.arc(sx, sy, r, 0, Math.PI * 2); x.fill()
  }

  for (let s = 0; s < 130; s++) {
    const sx = rnd() * w, sy = rnd() * h
    x.strokeStyle = rnd() > 0.5 ? 'rgba(245,230,195,0.14)' : 'rgba(90,70,40,0.3)'
    x.lineWidth = 0.6 + rnd() * 1.2
    x.beginPath()
    x.moveTo(sx, sy)
    x.lineTo(sx + 14 + rnd() * 40, sy + (rnd() - 0.5) * 10)
    x.stroke()
  }

  const rc = document.createElement('canvas')
  rc.width = w; rc.height = h
  const rx = rc.getContext('2d')
  const img = x.getImageData(0, 0, w, h).data
  const out = rx.createImageData(w, h)
  for (let i = 0; i < img.length; i += 4) {
    const lum = img[i] * 0.3 + img[i + 1] * 0.5 + img[i + 2] * 0.2
    const gv = Math.max(70, Math.min(215, 140 + (lum - 130) * 0.5 + (rnd() - 0.5) * 40))
    out.data[i] = out.data[i + 1] = out.data[i + 2] = gv
    out.data[i + 3] = 255
  }
  rx.putImageData(out, 0, 0)

  const map = new THREE.CanvasTexture(c)
  map.wrapS = map.wrapT = THREE.RepeatWrapping
  map.colorSpace = THREE.SRGBColorSpace
  map.anisotropy = 4
  const roughnessMap = new THREE.CanvasTexture(rc)
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping
  return { map, roughnessMap }
}
