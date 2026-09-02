import { SUBSTANCES } from '../data/substances'

export default function ControlPanel({ current, onSelect }) {
  return (
    <div className="probes">
      {SUBSTANCES.map((s, i) => (
        <button
          key={s.id}
          className={'probe' + (s.id === current.id ? ' sel' : '')}
          onClick={() => onSelect(s)}
        >
          <span className="dot" style={{ background: s.color }} />
          <span>Проба {String(i + 1).padStart(2, '0')} · {s.short}</span>
        </button>
      ))}
    </div>
  )
}
