import { useEffect, useRef } from 'react'

const W = 1200
const H = 760

/* Рендер фона (один раз, в офскрин-канвас) */
function renderBackground() {
  const off = document.createElement('canvas')
  off.width = W
  off.height = H
  const b = off.getContext('2d')

  const g = b.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, '#1e2e26')
  g.addColorStop(0.45, '#14221b')
  g.addColorStop(1, '#0a120e')
  b.fillStyle = g
  b.fillRect(0, 0, W, H)

  const glow = b.createRadialGradient(560, 300, 30, 560, 300, 340)
  glow.addColorStop(0, 'rgba(255,220,170,0.10)')
  glow.addColorStop(1, 'rgba(255,220,170,0)')
  b.fillStyle = glow
  b.fillRect(0, 0, W, H)

  const vg = b.createRadialGradient(600, 380, 200, 600, 380, 800)
  vg.addColorStop(0, 'rgba(0,0,0,0)')
  vg.addColorStop(1, 'rgba(0,0,0,0.45)')
  b.fillStyle = vg
  b.fillRect(0, 0, W, H)

  const benchY = 552
  const bg2 = b.createLinearGradient(0, benchY, 0, H)
  bg2.addColorStop(0, '#6b4a2c')
  bg2.addColorStop(0.15, '#5a3d24')
  bg2.addColorStop(0.7, '#3c2817')
  bg2.addColorStop(1, '#241708')
  b.fillStyle = bg2
  b.fillRect(0, benchY, W, H - benchY)

  b.strokeStyle = 'rgba(0,0,0,0.35)'
  b.lineWidth = 1.5
  for (let i = 0; i < 6; i++) {
    const yy = benchY + 6 + i * 34
    b.beginPath()
    b.moveTo(0, yy)
    b.lineTo(W, yy)
    b.stroke()
  }

  const benchGlow = b.createRadialGradient(520, benchY + 6, 10, 520, benchY + 6, 300)
  benchGlow.addColorStop(0, 'rgba(255,215,160,0.14)')
  benchGlow.addColorStop(1, 'rgba(0,0,0,0)')
  b.fillStyle = benchGlow
  b.fillRect(0, benchY, W, H - benchY)

  b.fillStyle = 'rgba(8,16,12,0.85)'
  b.fillRect(0, 84, W, 14)
  return off
}

/* ============ Примитивы стекла ============ */
function glassHighlight(ctx, x, y, w, h, r) {
  ctx.save()
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
  ctx.clip()
  const hg = ctx.createLinearGradient(x + 4, y, x + w * 0.35, y + h)
  hg.addColorStop(0, 'rgba(255,255,255,0.35)')
  hg.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hg
  ctx.fillRect(x, y, w * 0.5, h)
  ctx.restore()
}

function softShadow(ctx, x, y, w, blur) {
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.55)'
  ctx.shadowBlur = blur
  ctx.fillStyle = 'rgba(0,0,0,0.0)'
  ctx.beginPath()
  ctx.ellipse(x + w / 2, y, w * 0.42, 9, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

/* ============ Колба Эрленмейера ============ */
function drawFlask(ctx, time, col) {
  const bx = 470, by = 120, bw = 240, bh = 250
  const neckW = 34, neckH = 46
  const cx = bx + bw / 2
  const bodyTop = by + neckH
  const liq = 0.62
  const liqTop = bodyTop + (bh - neckH) * (1 - liq) * 0.9

  softShadow(ctx, bx - 14, by + bh - 12, bw + 28, 22)

  ctx.beginPath()
  ctx.moveTo(cx - neckW / 2, by)
  ctx.lineTo(cx + neckW / 2, by)
  ctx.lineTo(cx + neckW / 2, bodyTop)
  ctx.bezierCurveTo(bx + bw * 0.55, bodyTop + 30, bx + bw * 0.9, bodyTop + 90, bx + bw * 0.88, by + bh - 40)
  ctx.quadraticCurveTo(bx + bw * 0.85, by + bh - 6, cx, by + bh - 6)
  ctx.quadraticCurveTo(bx + bw * 0.15, by + bh - 6, bx + bw * 0.12, by + bh - 40)
  ctx.bezierCurveTo(bx + bw * 0.1, bodyTop + 90, bx + bw * 0.45, bodyTop + 30, cx - neckW / 2, bodyTop)
  ctx.closePath()
  ctx.fillStyle = 'rgba(210,228,250,0.10)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(225,238,255,0.5)'
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.save()
  ctx.clip()
  const lg = ctx.createLinearGradient(0, liqTop, 0, by + bh)
  lg.addColorStop(0, col.light)
  lg.addColorStop(0.5, col.color)
  lg.addColorStop(1, col.dark)
  ctx.fillStyle = lg
  ctx.beginPath()
  ctx.moveTo(cx - neckW / 2, liqTop + 8)
  ctx.lineTo(cx + neckW / 2, liqTop + 8)
  ctx.lineTo(cx + neckW / 2, bodyTop + 6)
  ctx.bezierCurveTo(bx + bw * 0.53, bodyTop + 32, bx + bw * 0.87, bodyTop + 90, bx + bw * 0.86, by + bh - 40)
  ctx.quadraticCurveTo(bx + bw * 0.83, by + bh - 6, cx, by + bh - 6)
  ctx.quadraticCurveTo(bx + bw * 0.17, by + bh - 6, bx + bw * 0.14, by + bh - 40)
  ctx.bezierCurveTo(bx + bw * 0.13, bodyTop + 90, bx + bw * 0.47, bodyTop + 32, cx - neckW / 2, bodyTop + 6)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = 'rgba(255,255,255,0.30)'
  ctx.beginPath()
  ctx.ellipse(cx, liqTop + 8, neckW / 2 - 2, 3.5, 0, 0, Math.PI * 2)
  ctx.fill()

  for (let i = 0; i < 7; i++) {
    const ph = (time * (0.6 + i * 0.12) + i * 13) % 1
    const px = cx + Math.sin(time * 2 + i * 2.1) * 30 + (i - 3) * 16
    const py = by + bh - 14 - ph * (bh - 60)
    const r = 2.5 + (i % 3) * 1.6
    ctx.fillStyle = 'rgba(255,255,255,0.22)'
    ctx.beginPath()
    ctx.arc(px, py, r, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.55)'
    ctx.beginPath()
    ctx.arc(px - r * 0.3, py - r * 0.3, r * 0.35, 0, Math.PI * 2)
    ctx.fill()
  }

  const refr = ctx.createLinearGradient(bx + bw * 0.35, 0, bx + bw * 0.6, 0)
  refr.addColorStop(0, 'rgba(255,255,255,0)')
  refr.addColorStop(0.5, 'rgba(255,255,255,0.18)')
  refr.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = refr
  ctx.fillRect(bx + bw * 0.2, liqTop, bw * 0.6, by + bh - liqTop)
  ctx.restore()

  glassHighlight(ctx, bx, by, bw, bh, 8)
  ctx.strokeStyle = 'rgba(255,255,255,0.75)'
  ctx.lineWidth = 2.2
  ctx.beginPath()
  ctx.arc(cx, bodyTop + 34, 26, Math.PI * 1.15, Math.PI * 1.45)
  ctx.stroke()

  ctx.save()
  ctx.globalAlpha = 0.16
  const rf = ctx.createLinearGradient(0, by + bh, 0, by + bh + 46)
  rf.addColorStop(0, col.color)
  rf.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = rf
  ctx.beginPath()
  ctx.ellipse(cx, by + bh + 6, bw * 0.42, 20, 0, 0, Math.PI)
  ctx.fill()
  ctx.restore()
}

/* ============ Бюретка ============ */
function drawBurette(ctx, x, topY) {
  const w = 30, h = 300
  const cx = x + w / 2
  softShadow(ctx, x - 6, topY + h - 8, w + 12, 18)

  ctx.fillStyle = 'rgba(215,232,252,0.12)'
  ctx.beginPath()
  ctx.roundRect(x, topY, w, h, 7)
  ctx.fill()
  ctx.strokeStyle = 'rgba(225,238,255,0.5)'
  ctx.lineWidth = 1.8
  ctx.stroke()

  ctx.strokeStyle = 'rgba(220,235,255,0.5)'
  ctx.lineWidth = 1
  for (let i = 0; i <= 10; i++) {
    const yy = topY + 10 + i * 28
    ctx.beginPath()
    ctx.moveTo(x + w - 4, yy)
    ctx.lineTo(x + w - (i % 2 ? 10 : 14), yy)
    ctx.stroke()
  }

  const liqTop = topY + 34, liqBot = topY + h - 16
  const lg = ctx.createLinearGradient(0, liqTop, 0, liqBot)
  lg.addColorStop(0, '#8fd08a')
  lg.addColorStop(1, '#3e8a5a')
  ctx.save()
  ctx.beginPath()
  ctx.roundRect(x, liqTop, w, liqBot - liqTop, 5)
  ctx.clip()
  ctx.fillStyle = lg
  ctx.fillRect(x, liqTop, w, liqBot - liqTop)
  ctx.restore()
  glassHighlight(ctx, x, topY, w, h, 7)

  ctx.fillStyle = '#8a93a8'
  ctx.beginPath()
  ctx.roundRect(cx - 8, topY + h - 12, 16, 10, 3)
  ctx.fill()
  ctx.fillStyle = '#5d6678'
  ctx.beginPath()
  ctx.arc(cx, topY + h - 2, 4.5, 0, Math.PI * 2)
  ctx.fill()
}

/* ============ Штатив + стакан ============ */
function drawStandAndBeaker(ctx, x, topY) {
  ctx.fillStyle = '#3a4256'
  ctx.beginPath()
  ctx.roundRect(x - 3, topY, 8, 300, 3)
  ctx.fill()
  ctx.fillStyle = '#4a5470'
  ctx.beginPath()
  ctx.roundRect(x - 26, topY + 88, 54, 8, 3)
  ctx.fill()
  ctx.fillStyle = '#2c3246'
  ctx.beginPath()
  ctx.roundRect(x - 12, topY + 276, 26, 16, 3)
  ctx.fill()

  const bx = x - 26, by = topY + 118, bw = 52, bh = 74
  softShadow(ctx, bx, by + bh - 8, bw, 14)
  ctx.fillStyle = 'rgba(215,232,252,0.13)'
  ctx.beginPath()
  ctx.roundRect(bx, by, bw, bh, 6)
  ctx.fill()
  ctx.strokeStyle = 'rgba(225,238,255,0.45)'
  ctx.lineWidth = 1.6
  ctx.stroke()
  const lg = ctx.createLinearGradient(0, by + 22, 0, by + bh)
  lg.addColorStop(0, '#8fd08a')
  lg.addColorStop(1, '#3e8a5a')
  ctx.fillStyle = lg
  ctx.beginPath()
  ctx.roundRect(bx + 3, by + 22, bw - 6, bh - 24, 4)
  ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.beginPath()
  ctx.ellipse(bx + bw / 2, by + 22, bw / 2 - 4, 2.6, 0, 0, Math.PI * 2)
  ctx.fill()
  glassHighlight(ctx, bx, by, bw, bh, 6)
}

/* ============ Штатив с пробирками ============ */
function drawTestTubes(ctx, x, topY, tubes) {
  const rackY = topY + 170
  ctx.fillStyle = '#4a4250'
  ctx.beginPath()
  ctx.roundRect(x - 20, rackY, 150, 8, 3)
  ctx.fill()
  ctx.fillStyle = '#38323e'
  ctx.beginPath()
  ctx.roundRect(x - 8, rackY + 8, 126, 10, 3)
  ctx.fill()

  for (let i = 0; i < 3; i++) {
    const tx = x + i * 38
    const tw = 22, th = 118, ty = topY + 44
    const col = tubes[i]
    softShadow(ctx, tx - 4, ty + th - 10, tw + 8, 14)
    ctx.fillStyle = 'rgba(215,232,252,0.12)'
    ctx.beginPath()
    ctx.roundRect(tx, ty, tw, th, 9)
    ctx.fill()
    ctx.strokeStyle = 'rgba(225,238,255,0.5)'
    ctx.lineWidth = 1.6
    ctx.stroke()
    const liqTop = ty + 26, liqBot = ty + th - 12
    const lg = ctx.createLinearGradient(0, liqTop, 0, liqBot)
    lg.addColorStop(0, col.light)
    lg.addColorStop(1, col.dark)
    ctx.fillStyle = lg
    ctx.beginPath()
    ctx.roundRect(tx + 2, liqTop, tw - 4, liqBot - liqTop, 6)
    ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.32)'
    ctx.beginPath()
    ctx.ellipse(tx + tw / 2, liqTop, tw / 2 - 3, 2.4, 0, 0, Math.PI * 2)
    ctx.fill()
    glassHighlight(ctx, tx, ty, tw, th, 9)
  }
}

/* ============ Подписи ============ */
function drawLabels(ctx, cur) {
  ctx.fillStyle = 'rgba(232,226,212,0.65)'
  ctx.font = '13px Georgia'
  ctx.textAlign = 'center'
  ctx.fillText('Бюретка · NaOH', 165, 516)
  ctx.fillText('Колба Эрленмейера', 585, 582)
  ctx.fillText('Штатив с пробирками', 960, 582)
  ctx.fillStyle = 'rgba(217,185,138,0.85)'
  ctx.font = '12px Georgia'
  ctx.fillText(cur.name, 585, 610)
}

/* ============ Компонент ============ */
export default function LabScene({ substance }) {
  const canvasRef = useRef(null)
  const substanceRef = useRef(substance)

  useEffect(() => {
    substanceRef.current = substance
  }, [substance])

  useEffect(() => {
    const cv = canvasRef.current
    const ctx = cv.getContext('2d')
    const bg = renderBackground()
    let raf = 0
    let time = 0

    const draw = () => {
      time += 0.016
      ctx.clearRect(0, 0, W, H)
      ctx.drawImage(bg, 0, 0)

      // тёплый ключевой свет сверху
      ctx.save()
      ctx.globalAlpha = 0.05 + 0.02 * Math.sin(time * 0.5)
      ctx.fillStyle = 'rgba(255,230,190,1)'
      ctx.fillRect(0, 0, W, 60)
      ctx.restore()

      drawBurette(ctx, 150, 108)
      drawStandAndBeaker(ctx, 160, 108)
      drawFlask(ctx, time, substanceRef.current)
      drawTestTubes(ctx, 875, 130, SUBSTANCES_SLICE)
      drawLabels(ctx, substanceRef.current)

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} width={W} height={H} />
}

/* срез первых трёх веществ для пробирок (цвета фиксированы — демонстрация шкалы) */
import { SUBSTANCES } from '../data/substances'
const SUBSTANCES_SLICE = SUBSTANCES.slice(0, 3)
