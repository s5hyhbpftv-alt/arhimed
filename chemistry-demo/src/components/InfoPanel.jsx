export default function InfoPanel({ substance }) {
  return (
    <div className="entry">
      <span className="probe-no">Запись о пробе — {substance.name}.</span>{' '}
      <b>Цвет раствора:</b> {substance.desc}{' '}
      <span className="probe-no">Внесите пробу в колбу, чтобы наблюдать раствор в движении.</span>
    </div>
  )
}
