import { useEffect, useRef, useState } from 'react'
import LabScene3D from './components/LabScene3D'
import ControlPanel from './components/ControlPanel'
import { SUBSTANCES } from './data/substances'

const RANKS = ['Стажёр', 'Исследователь', 'Лаборант', 'Химик', 'Мастер Лаборатории']
const TUT_KEY = 'arhimed3d_tut'
const TUT_STEPS = [
  { t: 'Вращай лабораторию', d: 'Потяни мышью по пустому месту — сцену можно крутить, рассматривать колбу и пробирки со всех сторон.' },
  { t: 'Потяни пробирку в колбу', d: 'Захвати пробирку с золотым кольцом, потяни её к колбе и отпусти — раствор «перельётся» и сменит цвет.' },
  { t: 'Выполни 4 миссии', d: 'Лавуазье просит найти 4 раствора по цвету. Открывай их, собирай звёзды и стань Мастером Лаборатории!' },
]

export default function App() {
  const [substance, setSubstance] = useState(SUBSTANCES[0])
  const [mission, setMission] = useState(0)
  const [stars, setStars] = useState(0)
  const [discovered, setDiscovered] = useState([])
  const [msg, setMsg] = useState('Потяни пробирку за горлышко и опусти её в колбу — посмотрим, что у неё внутри!')
  const [tutorial, setTutorial] = useState(() => (typeof localStorage !== 'undefined' && !localStorage.getItem(TUT_KEY) ? 1 : 0))
  const [tutStep, setTutStep] = useState(0)
  const [confetti, setConfetti] = useState(false)
  const lastPour = useRef(Date.now())

  const target = SUBSTANCES[mission]
  const rank = RANKS[Math.min(stars, 4)]

  const handlePour = (s) => {
    lastPour.current = Date.now()
    setSubstance(s)
    setDiscovered((prev) => (prev.includes(s.id) ? prev : [...prev, s.id]))
    if (s.id === target.id) {
      const ns = stars + 1
      setStars(ns)
      if (ns >= SUBSTANCES.length) {
        setConfetti(true)
        setMsg('Эврика! Ты открыл все четыре раствора и стал Мастером Лаборатории! Лавуазье гордится тобой.')
        setTimeout(() => setConfetti(false), 4200)
      } else {
        setMsg('Эврика! ' + s.name + ' — цвет: ' + s.desc + '.')
        setTimeout(() => setMission((m) => m + 1), 1600)
      }
    } else {
      setMsg('Хм… это ' + s.short + '. А миссия — найти ' + target.name + '. Продолжай, ты почти у цели!')
    }
  }

  /* новая миссия → подсказка */
  useEffect(() => {
    if (mission > 0) {
      setMsg('Новая миссия: найди раствор ' + SUBSTANCES[mission].name + '. Ищи пробирку с золотым кольцом!')
    }
  }, [mission])

  /* подсказка при бездействии */
  useEffect(() => {
    if (tutorial) return
    const id = setInterval(() => {
      if (Date.now() - lastPour.current > 8000) {
        setMsg('Потяни пробирку с золотым кольцом и опусти её в колбу!')
      }
    }, 4000)
    return () => clearInterval(id)
  }, [tutorial])

  const closeTutorial = () => {
    localStorage.setItem(TUT_KEY, '1')
    setTutorial(0)
  }

  return (
    <>
      <header className="masthead">
        <div>
          <div className="journal">Журнал лаборатории · Лаборатория Лавуазье</div>
          <h1>
            Алхимический атлас <em>растворов</em>
          </h1>
          <div className="sub">3D-лаборатория · потяни пробирку в колбу и собери все 4 раствора</div>
        </div>
        <div className="issue">
          <div>Том I · № 1789</div>
          <div className="big">Париж · Арсенал</div>
        </div>
      </header>

      {/* ===== Панель миссии ===== */}
      <div className="quest-row">
        <div className="quest-card">
          <span className="q-label">Миссия {mission + 1} / {SUBSTANCES.length}</span>
          <span className="q-target">
            <span className="q-swatch" style={{ background: target.color }} title={target.name} />
            Найди: <b>{target.name}</b>
          </span>
        </div>
        <div className="quest-card">
          <span className="q-label">Открыто растворов</span>
          <span className="q-stars">{'★'.repeat(stars)}{'☆'.repeat(SUBSTANCES.length - stars)}</span>
        </div>
        <div className="quest-card rank">
          <span className="q-label">Звание</span>
          <span className="q-rank">{rank}</span>
        </div>
      </div>

      {/* ===== Сцена в оправе ===== */}
      <div className="frame">
        <span className="screw tl" aria-hidden="true" />
        <span className="screw tr" aria-hidden="true" />
        <span className="screw bl" aria-hidden="true" />
        <span className="screw br" aria-hidden="true" />

        <div className="canvas-holder">
          <div className="thermo" title="Термометр Реомюра (1730)">
            <div className="scale" />
            <div className="mercury" />
            <span className="mark" style={{ bottom: '2px' }}>40°R</span>
          </div>
          <div className="scene-wrap">
            <LabScene3D substance={substance} onPour={handlePour} targetId={target.id} />
            {tutorial && (
              <div className="tut-arrow" aria-hidden="true">▼</div>
            )}
            <div className="scene-hint" aria-hidden="true">
              Тяни пробирку с золотым кольцом → в колбу
            </div>
          </div>
        </div>

        <div className="plaque">
          <span className="fig">Фиг. I</span> — Лаборатория Лавуазье · перелей раствор в колбу
        </div>
      </div>

      {/* ===== Сообщение Архимеда ===== */}
      <div className="msg-bar">
        <span className="msg-ico">◈</span> {msg}
      </div>

      {/* ===== Дневник открытий ===== */}
      <div className="chips-row">
        <span className="chips-label">Дневник открытий:</span>
        {SUBSTANCES.map((s) => {
          const found = discovered.includes(s.id)
          return (
            <span key={s.id} className={'chip' + (found ? ' found' : '')}>
              <span className="dot" style={{ background: s.color }} />
              {found ? s.short : '???'}
              {found && <span className="chip-ok">✓</span>}
            </span>
          )
        })}
      </div>

      <ControlPanel current={substance} onSelect={setSubstance} />

      <p className="footnote">
        Вращай сцену мышью · потяни пробирку в колбу · 4 миссии Лавуазье ждут тебя
      </p>

      {/* ===== Конфетти ===== */}
      {confetti && (
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                left: Math.random() * 100 + '%',
                background: ['#d9a441', '#c8795a', '#7fb8a0', '#b06fd0', '#6fb4f0'][i % 5],
                animationDelay: Math.random() * 0.6 + 's',
                animationDuration: 1.6 + Math.random() * 1.4 + 's',
              }}
            />
          ))}
        </div>
      )}

      {/* ===== Туториал ===== */}
      {tutorial && (
        <div className="tutorial">
          <div className="tut-card">
            <div className="tut-step">
              Шаг {tutStep + 1} из {TUT_STEPS.length}
            </div>
            <h2>{TUT_STEPS[tutStep].t}</h2>
            <p>{TUT_STEPS[tutStep].d}</p>
            <div className="tut-actions">
              {tutStep > 0 && <button className="btn-ghost" onClick={() => setTutStep((s) => s - 1)}>Назад</button>}
              {tutStep < TUT_STEPS.length - 1 ? (
                <button className="btn-brass" onClick={() => setTutStep((s) => s + 1)}>Дальше →</button>
              ) : (
                <button className="btn-brass" onClick={closeTutorial}>Понятно, начинаю!</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
