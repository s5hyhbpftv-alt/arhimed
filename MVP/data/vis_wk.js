/* Волна «неделя и остатки»: уроки 12 (Остатки при делении) и 17 (Дни недели и остатки).
   Без комиксов: обычные уроки с explain (9 шагов) + свой интерактивный SVG-виджет на каждый шаг.
   Загружается ПОСЛЕ vis_kl.js, поэтому перекрывает комикс-версию урока 17.
   Диспетчер: window.VISKW[id] — вызывается первым в chRender/renderLessonVis (в lessons.js). */
window.VISKW = window.VISKW || {};

/* ================= УРОК 12 · Остатки при делении ================= */
(function(){
  const L12 = {
    id: 12, title: 'Остатки при делении', ico: '🍬',
    src: 'ВсОШ-стиль · остатки', subj: 'math',
    explain: [
      'Архимед раскладывает 17 конфет в мешочки по 5 конфет. Получается 3 полных мешочка — это 15 конфет — и остаются 2 конфеты, которые ни в один мешочек не поместились. Эти «лишние» конфеты и есть остаток. Остатки помогают решать очень хитрые задачи!',
      'Что такое остаток? Делим 17 на 5: 17 = 5 · 3 + 2. Говорят: 17 : 5 = 3 и остаток 2. Проверка: 5 · 3 + 2 = 17 — всё сходится! Частное 3 показывает, сколько раз по 5 поместилось, а остаток 2 — что не поместилось.',
      'Запомни запись-помощник: делимое = делитель · частное + остаток. Для 17 : 5: делимое 17 = делитель 5 · частное 3 + остаток 2. Проверяй так любую задачу с остатком!',
      'Главное правило: остаток всегда МЕНЬШЕ делителя. При делении на 5 остаток бывает только 0, 1, 2, 3 или 4. Остаток 5 невозможен: 5 конфет снова собрались бы в целый мешочек!',
      'Остатки идут по кругу: 6 : 5 = 1 и остаток 1, 7 : 5 — остаток 2, 8 — остаток 3, 9 — остаток 4, 10 — остаток 0, а 11 — снова остаток 1. Каждые 5 чисел всё повторяется!',
      'Числа с одинаковым остатком образуют «семью». Остаток 2 при делении на 5 дают числа 2, 7, 12, 17, 22… Следующее число семьи получается прибавлением 5: шаг семьи равен делителю!',
      'Считаем членов семьи: сколько чисел от 1 до 40 дают остаток 2 при делении на 5? Это числа 2, 7, 12, …, 37. Формула: (37 − 2) : 5 + 1 = 7 + 1 = 8. Промежутков между числами 7, а точек — на одну больше!',
      'Остаток 0 — это когда число делится нацело. Кратные 7: 7, 14, 21, …, 98 — у всех остаток 0 при делении на 7. Сколько таких чисел от 1 до 100? 100 : 7 = 14 и остаток 2 → ровно 14 кратных!',
      'Проверь себя: найди остаток при делении 47 на 5. Ближайшее кратное 5, не большее 47, — это 45. 47 − 45 = 2. Остаток 2! Теперь — вперёд, к проверке!'
    ],
    check: { q: 'Остаток при делении 47 на 5 равен…', choices: ['1', '2', '3', '4'], ans: 1,
      exp: '45 делится на 5, значит 47 − 45 = 2.' },
    tasks: [
      { q: 'Сколько чисел от 1 до 40 дают остаток 2 при делении на 5?', kind: 'unit', ans: 8, tol: 0,
        hints: ['Это числа 2, 7, 12, …, 37.', 'Шаг 5: (37 − 2) : 5 + 1', '35 : 5 + 1 = 8.'], sol: '(37 − 2)/5 + 1 = 8 чисел с остатком 2.' },
      { q: 'Сколько чисел от 1 до 100 делятся на 7?', kind: 'unit', ans: 14, tol: 0,
        hints: ['Это кратные 7: 7, 14, …, 98.', '98 : 7 = 14.', 'Ответ: 14 чисел.'], sol: 'Кратные 7 до 100: 98 : 7 = 14 чисел.' }
    ]
  };

  /* ---------- помощники ---------- */
  const candy=(x,y,r,fill,stroke)=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${fill}" stroke="${stroke||'#5a3a20'}" stroke-width="1"/>`;
  const bag=(x,y,w,h,label,color)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="rgba(255,255,255,.05)" stroke="${color||'#3d7a55'}" stroke-width="1.6" stroke-dasharray="${label?'':'5 4'}"/>`;

  function visW12(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    const chip=(t,c)=>`<span class="wv-chip" style="border-color:${c||'#3d5c49'};color:#e8dcc8;font-size:14px">${t}</span>`;
    const big=(t)=>`<div class="wv-big" style="font-size:22px">${t}</div>`;
    const sml=(t)=>`<div class="wv-sml" style="max-width:330px">${t}</div>`;
    const ans=(t,c)=>`<div class="wv-ans" style="font-size:20px;color:${c||'#8fd1a8'};font-weight:bold;font-family:Georgia,serif">${t}</div>`;
    const btns=(...b)=>`<div class="wv-row" style="margin-top:2px">${b.join('')}</div>`;
    const btn=(t,act)=>`<button class="hint-btn" onclick="visW12Act('${lk}','${act}')">${t}</button>`;
    const fr=(a,b)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;font-family:Georgia,serif;font-weight:bold;font-size:26px;line-height:1.08"><span style="color:#ffd76a">${a}</span><span style="border-top:2px solid #ffd76a;margin-top:1px;padding:0 7px;color:#fff">${b}</span></span>`;
    const kv=(t,c)=>`<span style="display:inline-block;padding:3px 11px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-family:Georgia,serif;font-size:19px;color:${c};font-weight:bold;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      // конфеты по мешочкам — меняем горсть кнопками
      if(st.n==null) st.n=17;
      const n=st.n, k=5;
      const b=Math.floor(n/k), rem=n%5;
      const groups=Math.min(b,5);
      const W=302, x0=6, bw=40, bh=46, gapx=4, top=6;
      let s='';
      for(let g=0;g<groups;g++){
        const x=x0+g*(bw+gapx);
        s+=`<rect x="${x}" y="${top}" width="${bw}" height="${bh}" rx="10" fill="rgba(255,255,255,.05)" stroke="#3d7a55" stroke-width="1.7"/>`;
        for(let j=0;j<5;j++){
          const cx2=x+9+(j%3)*8, cy2=top+(j<3?13:28);
          s+=candy(cx2,cy2,3.2,'#e0523d');
        }
      }
      if(b>groups) s+=`<text x="${x0+groups*(bw+gapx)+4}" y="${top+30}" font-size="12" fill="#9ec0a8">… ещё ${b-groups}</text>`;
      if(rem>0){
        const rx=x0+Math.min(groups,b)*(bw+gapx)+1;
        s+=`<rect x="${rx}" y="${top}" width="46" height="${bh}" rx="10" fill="rgba(217,164,65,.08)" stroke="#d9a441" stroke-width="2"/>`;
        for(let j=0;j<rem;j++) s+=candy(rx+9+j*10, top+22, 3.2, '#ffd76a');
      }
      h=`<div class="wv-col">
        ${big('Конфеты Архимеда 🍬')}
        <div class="wv-row">${chip('горсть: '+n+' конфет','rgba(127,209,255,.5)')}${chip('кладём по 5','rgba(127,209,160,.5)')}</div>
        <svg width="${W}" height="${top+bh+32}" viewBox="0 0 ${W} ${top+bh+32}" style="display:block;margin:0 auto">
          <rect x="1" y="1" width="${W-2}" height="${top+bh+26}" rx="12" fill="rgba(0,0,0,.15)"/>
          ${s}
          ${rem>0?`<text x="${x0+4}" y="${top+bh+20}" font-size="12" fill="#ffd76a">остаток — ${rem} конфеты в золотом мешочке</text>`:`<text x="${x0+4}" y="${top+bh+20}" font-size="12" fill="#8fd1a8">остаток 0 — всё разложилось ровно!</text>`}
        </svg>
        <div class="wv-row">${kv(n+' = 5·'+b+' + '+rem,'#ffd76a')}</div>
        ${btns(btn('🍬 новая горсть','n'))}
        ${sml('полных мешочков: '+b+' ('+b*5+' конфет), остаток: '+rem+'. остаток — то, что не поместилось!')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${big('Делим: частное и остаток')}
        <div class="wv-row" style="gap:10px">
          <div style="text-align:center;background:rgba(255,255,255,.04);border:1.5px solid #3d5c49;border-radius:14px;padding:10px 16px">
            <div class="wv-pop">${fr(17,5)}</div>
            <div style="margin-top:6px;font-size:14px;color:#8fa08f">делим 17 на 5</div>
          </div>
          <div class="wv-pop2" style="font-size:30px;color:#8fa08f">→</div>
          <div style="text-align:center;background:rgba(255,255,255,.04);border:1.5px solid #3d5c49;border-radius:14px;padding:10px 16px">
            <div style="font-size:17px;color:#7fd1ff;font-weight:bold">частное</div>
            <div class="wv-ans" style="font-size:26px;color:#fff;font-family:Georgia,serif">3</div>
            <div style="font-size:12px;color:#8fa08f">5 поместилось 3 раза</div>
          </div>
          <div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #d9a441;border-radius:14px;padding:10px 16px">
            <div style="font-size:17px;color:#ffd76a;font-weight:bold">остаток</div>
            <div class="wv-ans" style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">2</div>
            <div style="font-size:12px;color:#9e8a5f">не поместилось</div>
          </div>
        </div>
        <svg width="280" height="64" viewBox="0 0 280 64" style="display:block;margin:0 auto">
          <rect x="6" y="8" width="268" height="48" rx="12" fill="rgba(143,209,168,.06)"/>
          <text x="140" y="29" text-anchor="middle" font-size="17" fill="#8fd1a8" font-family="Georgia,serif" font-weight="bold">проверка: 5 · 3 + 2 = 17 ✔</text>
          <text x="140" y="48" text-anchor="middle" font-size="12" fill="#9ec0a8">частное 3, остаток 2 — всё сходится!</text>
        </svg>
        ${sml('частное — сколько раз по 5 поместилось; остаток — что осталось')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${big('Запись-помощник')}
        <svg width="300" height="150" viewBox="0 0 300 150" style="display:block;margin:0 auto">
          <rect x="6" y="6" width="288" height="138" rx="14" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <rect x="18" y="16" width="74" height="44" rx="9" fill="rgba(127,209,255,.1)" stroke="#7fd1ff"/>
          <text x="55" y="35" text-anchor="middle" font-size="11" fill="#9fc5e8">делимое</text>
          <text x="55" y="52" text-anchor="middle" font-size="17" fill="#7fd1ff" font-weight="bold">17</text>
          <text x="100" y="44" font-size="22" fill="#8fa08f">=</text>
          <rect x="112" y="16" width="70" height="44" rx="9" fill="rgba(127,209,160,.1)" stroke="#8fd1a8"/>
          <text x="147" y="35" text-anchor="middle" font-size="11" fill="#9ec0a8">делитель</text>
          <text x="147" y="52" text-anchor="middle" font-size="17" fill="#8fd1a8" font-weight="bold">5</text>
          <text x="190" y="44" font-size="20" fill="#8fa08f">·</text>
          <rect x="204" y="16" width="76" height="44" rx="9" fill="rgba(255,215,106,.1)" stroke="#ffd76a"/>
          <text x="242" y="35" text-anchor="middle" font-size="11" fill="#d9c088">частное</text>
          <text x="242" y="52" text-anchor="middle" font-size="17" fill="#ffd76a" font-weight="bold">3</text>
          <text x="98" y="92" font-size="26" fill="#8fa08f">5 · 3 + 2 = 17</text>
          <rect x="96" y="104" width="108" height="30" rx="15" fill="rgba(217,164,65,.12)" stroke="#d9a441"/>
          <text x="150" y="125" text-anchor="middle" font-size="14" fill="#ffd76a" font-weight="bold">проверка верна!</text>
        </svg>
        ${sml('делимое = делитель · частное + остаток. подставляй числа — и проверяй любой ответ!')}
      </div>`;
    } else if(step===3){
      // остаток всегда меньше делителя: «карманы остатков»
      const k=5, pockets=5;
      const W=302, top=8, pw=54, ph=54, gap=4, x0=6;
      let s='';
      const rows=[[],[],[],[],[]];
      for(let n2=1;n2<=13;n2++) rows[n2%k].push(n2);
      for(let p=0;p<pockets;p++){
        const x=x0+p*(pw+gap);
        s+=`<rect x="${x}" y="${top}" width="${pw}" height="${ph}" rx="10" fill="${p===4?'rgba(232,106,90,.05)':'rgba(255,255,255,.04)'}" stroke="${p===4?'#b0635a':'#4c8a5a'}" stroke-width="${p===4?2:1.6}" ${p===4?'stroke-dasharray="5 4"':''}/>`;
        s+=`<text x="${x+pw/2}" y="${top+20}" text-anchor="middle" font-size="11" fill="#8fa08f">${p===4?'(не бывает)':'остаток '+p}</text>`;
        s+=`<text x="${x+pw/2}" y="${top+42}" text-anchor="middle" font-size="16" fill="${p===4?'#ff9a8a':'#ffd76a'}" font-weight="bold" font-family="Georgia,serif">${p===4?'5 ✗':p}</text>`;
        rows[p].slice(0,4).forEach((nn,ii)=>{ s+=`<text x="${x+9+ii*12}" y="${top+52}" text-anchor="middle" font-size="10" fill="#cfe0cf">${nn}</text>`; });
      }
      h=`<div class="wv-col">
        ${big('Карманы остатков при делении на 5')}
        <svg width="${W}" height="${top+ph+8}" viewBox="0 0 ${W} ${top+ph+8}" style="display:block;margin:0 auto">
          ${s}
        </svg>
        <div class="wv-row">${chip('остаток всегда < делителя','#4c8a5a')}${chip('остаток 5? ✗ невозможен','#b0635a')}</div>
        ${sml('в карманы раскладываются числа 1..13: у каждого свой остаток 0, 1, 2, 3 или 4')}
      </div>`;
    } else if(step===4){
      // остатки по кругу на ленте 6..15
      const nums=[6,7,8,9,10,11,12,13,14,15];
      const cols=['#7fd1ff','#8fd1a8','#ffd76a','#e8a0d8','#ff8a7a'];
      const W=322, cw=31, top=26;
      let s='';
      nums.forEach((nn,i)=>{
        const x=6+i*cw, c=cols[nn%5];
        s+=`<rect x="${x}" y="${top}" width="${cw-5}" height="36" rx="9" fill="rgba(255,255,255,.05)" stroke="${c}" stroke-width="2"/>`;
        s+=`<text x="${x+(cw-5)/2}" y="${top+23}" text-anchor="middle" font-size="16" fill="${c}" font-weight="bold">${nn}</text>`;
        s+=`<text x="${x+(cw-5)/2}" y="${top+33}" text-anchor="middle" font-size="9" fill="#8fa08f">${nn%5}</text>`;
      });
      // легенда
      let lg='';
      for(let r=0;r<5;r++) lg+=`<rect x="${10+r*38}" y="80" width="18" height="10" rx="3" fill="${cols[r]}"/><text x="${31+r*38}" y="89" font-size="10" fill="#cfe0cf">ост.${r}</text>`;
      h=`<div class="wv-col">
        ${big('Остатки идут по кругу')}
        <svg width="${W}" height="100" viewBox="0 0 ${W} 100" style="display:block;margin:0 auto">
          <text x="${W/2}" y="16" text-anchor="middle" font-size="12" fill="#8fa08f">числа 6..15 · внутри — их остаток при делении на 5</text>
          ${s}
          ${lg}
        </svg>
        ${ans('6 → 11, 7 → 12, 8 → 13… каждый +5 возвращает тот же остаток!','#ffd76a')}
        ${sml('под каждым числом — его остаток: 1, 2, 3, 4, 0 и снова 1, 2, 3, 4, 0')}
      </div>`;
    } else if(step===5){
      // семья с шагом 5: цепочка 2→7→12→17
      const W=306, top=16, r=26, gap=38, x0=8;
      let s='';
      const members=[2,7,12,17,22];
      members.forEach((m,i)=>{
        const x=x0+i*(r*2+gap-16);
        s+=`<circle cx="${x+r}" cy="${top+r}" r="${r}" fill="rgba(217,164,65,.08)" stroke="#d9a441" stroke-width="2.4"/>`;
        s+=`<text x="${x+r}" y="${top+r+7}" text-anchor="middle" font-size="19" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">${m}</text>`;
        if(i<members.length-1){
          const ax=x+r*2+gap-24;
          s+=`<line x1="${x+r*2-2}" y1="${top+r}" x2="${ax}" y2="${top+r}" stroke="#7fd1ff" stroke-width="2"/>`;
          s+=`<polygon points="${ax+5},${top+r} ${ax-2},${top+r-5} ${ax-2},${top+r+5}" fill="#7fd1ff"/>`;
          s+=`<text x="${(x+r*2+ax)/2}" y="${top+r-8}" text-anchor="middle" font-size="12" fill="#7fd1ff">+5</text>`;
        }
      });
      h=`<div class="wv-col">
        ${big('Семья чисел с остатком 2')}
        <svg width="${W}" height="80" viewBox="0 0 ${W} 80" style="display:block;margin:0 auto">
          <text x="${W/2}" y="8" text-anchor="middle" font-size="11" fill="#8fa08f">шаг семьи = делитель = 5</text>
          ${s}
        </svg>
        <div class="wv-row">${[2,7,12,17,22].map(m=>chip(m+' = 5·'+(Math.floor(m/5))+' + 2','rgba(127,209,255,.5)')).join('')}</div>
        ${ans('все дают остаток 2 при делении на 5 ✔','#8fd1a8')}
        ${sml('следующее число семьи = предыдущее + 5. так и строим ряд до любого предела!')}
      </div>`;
    } else if(step===6){
      // счёт членов семьи от 1 до 40
      const W=318, top=20, cw=34;
      const mem=[2,7,12,17,22,27,32,37];
      let s='';
      for(let n2=1;n2<=40;n2++){
        const x=6+(n2-1)*cw;
        if(x>W-10) break;
        const on=mem.indexOf(n2)>=0;
        s+=`<rect x="${x}" y="${top}" width="${cw-6}" height="${on?40:24}" rx="8" fill="${on?'rgba(217,164,65,.14)':'rgba(255,255,255,.04)'}" stroke="${on?'#d9a441':'#3d5c49'}" stroke-width="${on?2:1}"/>`;
        if(on) s+=`<text x="${x+(cw-6)/2}" y="${top+13}" text-anchor="middle" font-size="10" fill="#ffd76a">${n2}</text>`;
        else if(n2%10===0||n2===1) s+=`<text x="${x+(cw-6)/2}" y="${top+17}" text-anchor="middle" font-size="9" fill="#5b6b58">${n2}</text>`;
      }
      h=`<div class="wv-col">
        ${big('Сколько членов в семье до 40?')}
        <svg width="${W}" height="90" viewBox="0 0 ${W} 90" style="display:block;margin:0 auto">
          <text x="${W/2}" y="14" text-anchor="middle" font-size="11" fill="#8fa08f">числа 1..40 · семья «остаток 2» — золотые</text>
          ${s}
          <text x="${W/2}" y="82" text-anchor="middle" font-size="13" fill="#ffd76a" font-weight="bold">2, 7, 12, 17, 22, 27, 32, 37 — 8 чисел</text>
        </svg>
        <div class="wv-row">${chip('(37 − 2) : 5 + 1','rgba(127,209,255,.5)')}${kv('= 8','#8fd1a8')}</div>
        ${sml('промежутков между числами 7, а чисел — на одно больше: 8!')}
      </div>`;
    } else if(step===7){
      // кратные 7 до 100: лента-линейка
      const W=320, x0=14, L=288;
      let s='';
      for(let k=0;k<=100;k+=10){
        const x=x0+L*k/100;
        s+=`<line x1="${x}" y1="26" x2="${x}" y2="32" stroke="#5b6b58" stroke-width="1.5"/>`;
        if(k%20===0) s+=`<text x="${x}" y="44" text-anchor="middle" font-size="9" fill="#5b6b58">${k}</text>`;
      }
      for(let k=7;k<=98;k+=7){
        const x=x0+L*k/100;
        s+=`<circle cx="${x}" cy="26" r="6" fill="#8fd1a8" stroke="#3d7a55" stroke-width="1.5"/>`;
      }
      s+=`<text x="14" y="13" font-size="10.5" fill="#8fa08f">0</text><text x="${W-16}" y="13" font-size="10.5" fill="#8fa08f">100</text>`;
      h=`<div class="wv-col">
        ${big('Кратные 7 — остаток 0')}
        <svg width="${W}" height="56" viewBox="0 0 ${W} 56" style="display:block;margin:0 auto">
          <rect x="8" y="20" width="${L+4}" height="13" rx="7" fill="rgba(255,255,255,.05)"/>
          ${s}
        </svg>
        <div class="wv-row">${kv('100 : 7 = 14','#7fd1ff')}${kv('остаток 2','#ffd76a')}${ans('→ кратных ровно 14','#8fd1a8')}</div>
        ${sml('7, 14, 21, …, 98 — четырнадцать чисел с остатком 0. остаток 0 ⇔ делится нацело!')}
      </div>`;
    } else {
      // проверь себя: 47 : 5
      h=`<div class="wv-col">
        ${big('Проверь себя: 47 : 5')}
        <svg width="300" height="120" viewBox="0 0 300 120" style="display:block;margin:0 auto">
          <rect x="8" y="8" width="284" height="104" rx="14" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <text x="150" y="34" text-anchor="middle" font-size="16" fill="#cfe0cf">ближайшее кратное 5, не большее 47 —</text>
          <rect x="96" y="42" width="108" height="34" rx="17" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="2"/>
          <text x="150" y="65" text-anchor="middle" font-size="18" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">это 45 = 5 · 9</text>
          <text x="150" y="92" text-anchor="middle" font-size="15" fill="#ffd76a">47 − 45 = <tspan font-size="19" font-weight="bold">2</tspan> → остаток 2!</text>
        </svg>
        <div class="wv-row">${chip('5 · 9 = 45','rgba(127,209,160,.5)')}${chip('47 − 45 = 2','rgba(217,164,65,.5)')}</div>
        ${sml('готов? жми «Понял! Проверю себя» — там остаток 47 на 5!')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.VISKW[12]=visW12;
  function visW12Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    const POOL=[17,22,27,32,18,23];
    if(act==='n') st.n=POOL[((POOL.indexOf(st.n)+1)%POOL.length+POOL.length)%POOL.length];
    chRender(0);
  }
  window.visW12Act=visW12Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===12){ window.ARH_LESSONS[i]=L12; break; } } })();
})();

/* ================= УРОК 17 · Дни недели и остатки ================= */
(function(){
  const L17 = {
    id: 17, title: 'Дни недели и остатки', ico: '📅',
    src: 'ВсОШ-стиль · остатки', subj: 'math',
    explain: [
      'Дни недели повторяются каждые 7 дней: понедельник, вторник, среда, четверг, пятница, суббота, воскресенье — и снова понедельник. Это как часы, на циферблате которых 7 делений. Через 7 дней наступит ТОТ ЖЕ день недели!',
      'Сегодня понедельник. Какой день будет через 10 дней? 10 дней — это 1 полная неделя (7 дней) и ещё 3 дня. Полная неделя возвращает нас в понедельник, значит, важен только остаток — 3 дня.',
      'Удобно делить с остатком на 7: 10 = 7 · 1 + 3. Частное 1 — это полные недели, их выбрасываем. Остаток 3 — на столько дней сдвигаемся вперёд по кругу недели.',
      'Сдвигаемся на 3 дня от понедельника: понедельник → вторник (1) → среда (2) → четверг (3). Значит, через 10 дней будет ЧЕТВЕРГ! Остаток 3 честно показал день.',
      'А через 30 дней? 30 = 4 · 7 + 2. Четыре полные недели (28 дней) выбрасываем, остаток 2. От понедельника +2 дня: вторник, среда. Через 30 дней будет среда!',
      'Даже 100 дней — легко! 100 = 14 · 7 + 2, ведь 14 · 7 = 98. Полных недель 14, остаток 2 — сдвиг всего на 2 дня. От понедельника через 100 дней снова среда. Остаток экономит время!',
      'Главный секрет: при счёте дней важны только остатки от деления на 7. Остаток 0 — тот же день, остаток 1 — следующий, …, остаток 6 — день через шесть дней. Полные недели ничего не меняют — выбрасывай их!',
      'Потренируйся: нажимай кнопки и смотри, как остаток двигает стрелку по кругу недели. Сколько дней добавить — 10, 30 или 100? Стрелка покажет день!',
      'Проверь себя: сегодня понедельник. Какой день будет через 7 дней? 7 — это полная неделя, остаток 0. День не изменится! Вперёд, к проверке!'
    ],
    check: { q: 'Сегодня понедельник. Какой день будет через 7 дней?', choices: ['Понедельник', 'Вторник', 'Суббота', 'Воскресенье'], ans: 0,
      exp: '7 дней — полная неделя, день тот же.' },
    tasks: [
      { q: 'Сегодня понедельник. Какой день будет через 10 дней?', choices: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], ans: 3, tol: 0,
        hints: ['10 = 7 + 3 — сдвиг на 3 дня.', 'Понедельник +3 = четверг.'], sol: '10 ≡ 3 (по модулю 7): понедельник + 3 дня = четверг.', kind: 'choice' },
      { q: 'Сегодня понедельник. Какой день будет через 30 дней?', choices: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], ans: 2, tol: 0,
        hints: ['30 = 28 + 2 — сдвиг на 2 дня.', 'Понедельник + 2 = среда.'], sol: '30 ≡ 2 (mod 7): понедельник + 2 дня = среда.', kind: 'choice' }
    ]
  };

  /* ---------- помощники ---------- */
  const DAYS=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  const DFULL=['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'];
  const rad=(d)=>d*Math.PI/180;
  function dayXY(i,cx,cy,R){ const a=rad(-90+i*45); return {x:cx+R*Math.cos(a), y:cy+R*Math.sin(a)}; }
  function ringSVG(hlArr,cur,size){
    // hlArr — массив индексов подсвеченных дней, cur — текущий (Пн по умолчанию 0)
    const cx=size/2, cy=size/2, R=size/2-24, r=23;
    let s='';
    s+=`<circle cx="${cx}" cy="${cy}" r="${R+16}" fill="rgba(0,0,0,.16)" stroke="#3d5c49" stroke-width="1.5"/>`;
    for(let i=0;i<7;i++){
      const p=dayXY(i,cx,cy,R);
      const isHl=hlArr.indexOf(i)>=0;
      const isCur=i===cur;
      s+=`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${r}" fill="${isHl?'#d9a441':(isCur?'rgba(217,164,65,.35)':'rgba(255,255,255,.05)')}" stroke="${isHl?'#ffd76a':(isCur?'#d9a441':'#3d5c49')}" stroke-width="${isHl||isCur?2.6:1.4}"/>`;
      s+=`<text x="${p.x.toFixed(1)}" y="${(p.y+5).toFixed(1)}" text-anchor="middle" font-size="14" fill="${isHl?'#0d1a13':'#e8dcc8'}" font-weight="bold">${DAYS[i]}</text>`;
    }
    s+=`<circle cx="${cx}" cy="${cy}" r="15" fill="rgba(255,255,255,.05)" stroke="#3d5c49"/>`;
    s+=`<text x="${cx}" y="${cy+4}" text-anchor="middle" font-size="11" fill="#cbb89a">7</text>`;
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="display:block;margin:0 auto">${s}</svg>`;
  }
  function arcArrow(cx,cy,R,a0deg,a1deg,color){
    const p0=dayXYa(cx,cy,R,(-90+a0deg)*Math.PI/180);
    const p1=dayXYa(cx,cy,R,(-90+a1deg)*Math.PI/180);
    const sweep=a1deg>a0deg?1:0;
    const large=Math.abs(a1deg-a0deg)>180?1:0;
    const tan=rad(-90+a1deg+90);
    const ax=p1.x+Math.cos(tan)*9, ay=p1.y+Math.sin(tan)*9;
    return `<path d="M${p0.x.toFixed(1)},${p0.y.toFixed(1)} A${R},${R} 0 ${large} ${sweep} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}" fill="none" stroke="${color}" stroke-width="2.6" stroke-dasharray="7 6" marker-end="url(#ah)"/>`+
      `<polygon points="${ax.toFixed(1)},${ay.toFixed(1)} ${(p1.x-Math.cos(tan)*4+Math.cos(rad(-90+a1deg+180))*4).toFixed(1)},${(p1.y-Math.sin(tan)*4+Math.sin(rad(-90+a1deg+180))*4).toFixed(1)} ${(p1.x-Math.cos(tan)*4-Math.cos(rad(-90+a1deg+180))*4).toFixed(1)},${(p1.y-Math.sin(tan)*4-Math.sin(rad(-90+a1deg+180))*4).toFixed(1)}" fill="${color}"/>`;
  }
  function dayXYa(cx,cy,R,aRad){ return {x:cx+R*Math.cos(aRad), y:cy+R*Math.sin(aRad)}; }
  const chip=(t,c)=>`<span class="wv-chip" style="border-color:${c||'#3d5c49'};color:#e8dcc8;font-size:14px">${t}</span>`;
  const big=(t)=>`<div class="wv-big" style="font-size:22px">${t}</div>`;
  const sml=(t)=>`<div class="wv-sml" style="max-width:330px">${t}</div>`;
  const ans=(t,c)=>`<div class="wv-ans" style="font-size:21px;color:${c||'#8fd1a8'};font-weight:bold;font-family:Georgia,serif">${t}</div>`;
  const btns=(...b)=>`<div class="wv-row" style="margin-top:2px">${b.join('')}</div>`;
  const btn=(t,act)=>`<button class="hint-btn" onclick="visW17Act('${lidKey(LV.id)}','${act}')">${t}</button>`;
  const kv=(t,c)=>`<span style="display:inline-block;padding:3px 11px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-family:Georgia,serif;font-size:18px;color:${c};font-weight:bold;margin:2px">${t}</span>`;

  function visW17(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      if(st.cur==null) st.cur=0;
      const c=st.cur;
      const hl=[];
      for(let i=0;i<7&&i<=c;i++) hl.push(i%7);
      const note=c===0? 'сегодня — понедельник, двигай стрелку!'
        : c%7===0? 'полная неделя — снова '+DFULL[0]+'!'
        : 'через '+c+' '+(c%10===1&&c%100!==11?'день':(c<5||c>21?'дня':'дней'))+' — '+DFULL[c%7];
      h=`<div class="wv-col">
        ${big('Неделя — часы с 7 делениями')}
        ${ringSVG(hl,0,240)}
        ${ans(note,'#ffd76a')}
        ${btns(btn('+1 день →','d+'),btn('+7 дней','w'),btn('↺ сброс','r'))}
        ${sml('через 7 дней — тот же день: полные недели возвращают в начало круга!')}
      </div>`;
    } else if(step===1){
      // 10 дней = неделя + 3: полоса из 10 дней
      const W=330, top=34, cw=30, x0=8, r=12;
      let s='';
      for(let i=0;i<10;i++){
        const x=x0+i*(cw+2);
        const isWeek=i<7, isExtra=i>=7;
        s+=`<circle cx="${x+r}" cy="${top}" r="${r}" fill="${isWeek?'rgba(127,209,255,.1)':(isExtra?'rgba(217,164,65,.18)':'')}" stroke="${isWeek?'#7fd1ff':(isExtra?'#ffd76a':'#3d5c49')}" stroke-width="${isWeek||isExtra?2:1}"/>`;
        s+=`<text x="${x+r}" y="${top+4}" text-anchor="middle" font-size="10.5" fill="${isExtra?'#ffd76a':'#cfe0cf'}" font-weight="bold">${DAYS[i%7]}</text>`;
      }
      s+=`<path d="M${x0-2},${top-20} h 202 v 12" fill="none" stroke="#7fd1ff" stroke-width="1.6" stroke-dasharray="4 3"/>`;
      s+=`<text x="${x0+99}" y="${top-24}" text-anchor="middle" font-size="11" fill="#7fd1ff">1 полная неделя — выбросили</text>`;
      s+=`<path d="M${x0+206},${top-16} h 86 v 12" fill="none" stroke="#ffd76a" stroke-width="1.6"/>`;
      s+=`<text x="${x0+249}" y="${top-20}" text-anchor="middle" font-size="11" fill="#ffd76a">+3 дня</text>`;
      h=`<div class="wv-col">
        ${big('Через 10 дней = неделя + 3')}
        <svg width="${W}" height="70" viewBox="0 0 ${W} 70" style="display:block;margin:0 auto">${s}</svg>
        <div class="wv-row">${kv('10 = 7 + 3','#7fd1ff')}${chip('важен только остаток: 3','rgba(217,164,65,.5)')}</div>
        ${sml('полная неделя возвращает в понедельник — остаётся сдвинуться на 3 дня')}
      </div>`;
    } else if(step===2){
      // остаток от деления на 7: машина
      h=`<div class="wv-col">
        ${big('Делим с остатком на 7')}
        <div class="wv-row" style="gap:8px">
          <div class="wv-pop" style="text-align:center;background:rgba(255,255,255,.04);border:1.5px solid #3d5c49;border-radius:14px;padding:10px 14px">
            <div style="font-size:26px">📆</div>
            <div style="font-family:Georgia,serif;font-size:24px;color:#fff;font-weight:bold">10 дней</div>
          </div>
          <div class="wv-pop2" style="text-align:center;background:rgba(0,0,0,.2);border:1.5px solid #d9a441;border-radius:50%;width:58px;height:58px;display:flex;align-items:center;justify-content:center">
            <span style="color:#ffd76a;font-weight:bold;font-size:13px">÷ 7</span>
          </div>
          <div class="wv-pop3" style="text-align:center;background:rgba(255,255,255,.04);border:1.5px solid #3d5c49;border-radius:14px;padding:10px 14px">
            <div style="font-size:12px;color:#7fd1ff">частное</div>
            <div style="font-family:Georgia,serif;font-size:22px;color:#7fd1ff;font-weight:bold">1 неделя</div>
          </div>
        </div>
        <svg width="300" height="52" viewBox="0 0 300 52" style="display:block;margin:0 auto">
          <rect x="10" y="4" width="280" height="44" rx="11" fill="rgba(217,164,65,.08)" stroke="#d9a441" stroke-width="1.6"/>
          <text x="150" y="31" text-anchor="middle" font-size="16" fill="#ffd76a" font-weight="bold">остаток 3 — на столько дней сдвиг!</text>
        </svg>
        ${kv('10 = 7 · 1 + 3','#ffd76a')}
        ${sml('частное 1 — полные недели (выбрасываем), остаток 3 — рабочий сдвиг')}
      </div>`;
    } else if(step===3){
      // Пн + 3 = Чт: кольцо с дугой
      const S=250, cx=S/2, cy=S/2, R=S/2-24;
      const p1=dayXY(1,cx,cy,R), p2=dayXY(2,cx,cy,R), p3=dayXY(3,cx,cy,R);
      const tag=(p,i)=>`<g class="wv-pop" style="animation-delay:${(i*0.25).toFixed(2)}s"><circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="15" fill="#1d3a2c"/><text x="${p.x.toFixed(1)}" y="${(p.y+4).toFixed(1)}" text-anchor="middle" font-size="13" fill="#8fd1a8" font-weight="bold">${i}</text></g>`;
      h=`<div class="wv-col">
        ${big('Понедельник + 3 = четверг')}
        <svg width="${S}" height="${S+24}" viewBox="0 0 ${S} ${S+24}" style="display:block;margin:0 auto">
          <defs><marker id="ahw17" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><polygon points="0 0, 9 4.5, 0 9" fill="#8fd1a8"/></marker></defs>
          <circle cx="${cx}" cy="${cy+12}" r="${R+15}" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          ${[0,1,2,3,4,5,6].map(i=>{const q=dayXY(i,cx,cy+12,R); return `<circle cx="${q.x.toFixed(1)}" cy="${q.y.toFixed(1)}" r="23" fill="${i===3?'#d9a441':(i===0?'rgba(217,164,65,.3)':'rgba(255,255,255,.05)')}" stroke="${i===3?'#ffd76a':(i===0?'#d9a441':'#3d5c49')}" stroke-width="${i===3?2.6:1.4}"/><text x="${q.x.toFixed(1)}" y="${(q.y+5).toFixed(1)}" text-anchor="middle" font-size="14" fill="${i===3?'#0d1a13':'#e8dcc8'}" font-weight="bold">${DAYS[i]}</text>`;}).join('')}
          ${tag(p1,1)}${tag(p2,2)}${tag(p3,3)}
          <path d="M${dayXYa(cx,cy+12,R,rad(-90)).x.toFixed(1)},${dayXYa(cx,cy+12,R,rad(-90)).y.toFixed(1)} A${R},${R} 0 0 1 ${dayXYa(cx,cy+12,R,rad(-90+135)).x.toFixed(1)},${dayXYa(cx,cy+12,R,rad(-90+135)).y.toFixed(1)}" fill="none" stroke="#8fd1a8" stroke-width="2.4" stroke-dasharray="6 5" marker-end="url(#ahw17)"/>
        </svg>
        ${ans('через 10 дней — четверг! 🎯','#8fd1a8')}
        ${sml('остаток 3 → шагаем от понедельника на 3 дня по кругу')}
      </div>`;
    } else if(step===4){
      // 30 дней = 4·7 + 2 → среда
      h=`<div class="wv-col">
        ${big('Через 30 дней')}
        <svg width="310" height="120" viewBox="0 0 310 120" style="display:block;margin:0 auto">
          <rect x="6" y="6" width="298" height="108" rx="14" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <rect x="18" y="20" width="128" height="56" rx="12" fill="rgba(127,209,255,.08)" stroke="#7fd1ff"/>
          <text x="82" y="42" text-anchor="middle" font-size="12" fill="#9fc5e8">4 полные недели</text>
          <text x="82" y="62" text-anchor="middle" font-size="20" fill="#7fd1ff" font-weight="bold">4 · 7 = 28 дней</text>
          <text x="158" y="52" font-size="22" fill="#8fa08f">+</text>
          <rect x="170" y="20" width="96" height="56" rx="12" fill="rgba(217,164,65,.12)" stroke="#d9a441"/>
          <text x="218" y="42" text-anchor="middle" font-size="12" fill="#d9c088">остаток</text>
          <text x="218" y="62" text-anchor="middle" font-size="20" fill="#ffd76a" font-weight="bold">2 дня</text>
          <text x="155" y="102" text-anchor="middle" font-size="16" fill="#8fd1a8" font-weight="bold">Пн + 2 → вторник → среда!</text>
        </svg>
        <div class="wv-row">${kv('30 = 4 · 7 + 2','#ffd76a')}${kv('→ среда','#8fd1a8')}</div>
        ${sml('28 дней — ровно 4 недели, выбрасываем их, остаток 2 двигает день')}
      </div>`;
    } else if(step===5){
      // 100 дней
      h=`<div class="wv-col">
        ${big('Даже 100 дней — легко!')}
        <svg width="310" height="130" viewBox="0 0 310 130" style="display:block;margin:0 auto">
          <rect x="6" y="6" width="298" height="118" rx="14" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="155" y="30" text-anchor="middle" font-size="14" fill="#cfe0cf">делим 100 на 7</text>
          <rect x="30" y="40" width="76" height="40" rx="10" fill="rgba(127,209,255,.08)" stroke="#7fd1ff"/>
          <text x="68" y="66" text-anchor="middle" font-size="19" fill="#7fd1ff" font-weight="bold">100</text>
          <text x="112" y="66" font-size="22" fill="#8fa08f">=</text>
          <rect x="122" y="40" width="60" height="40" rx="10" fill="rgba(255,255,255,.05)" stroke="#3d5c49"/>
          <text x="152" y="66" text-anchor="middle" font-size="17" fill="#fff" font-weight="bold">14·7</text>
          <text x="188" y="66" font-size="22" fill="#8fa08f">+</text>
          <rect x="198" y="40" width="58" height="40" rx="10" fill="rgba(217,164,65,.12)" stroke="#d9a441"/>
          <text x="227" y="66" text-anchor="middle" font-size="19" fill="#ffd76a" font-weight="bold">2</text>
          <text x="155" y="106" text-anchor="middle" font-size="15" fill="#8fd1a8" font-weight="bold">14 · 7 = 98 → остаток 2 → среда</text>
        </svg>
        ${ans('100 дней → сдвиг всего на 2 дня!','#ffd76a')}
        ${sml('не нужно считать все 100 дней — остаток от деления на 7 делает всё сам')}
      </div>`;
    } else if(step===6){
      // таблица остатков 0..6 → день
      const S=252;
      let cells='';
      for(let r=0;r<7;r++){
        const x=(r%4)*63+6, y=6+Math.floor(r/4)*72;
        const c=r===0?'#8fd1a8':'#ffd76a';
        cells+=`<rect x="${x}" y="${y}" width="57" height="64" rx="11" fill="rgba(255,255,255,.04)" stroke="${c}" stroke-width="1.8"/>`;
        cells+=`<text x="${x+28}" y="${y+24}" text-anchor="middle" font-size="14" fill="${c}" font-weight="bold">остаток ${r}</text>`;
        cells+=`<text x="${x+28}" y="${y+46}" text-anchor="middle" font-size="13.5" fill="#e8dcc8">${DAYS[r]}</text>`;
      }
      h=`<div class="wv-col">
        ${big('Остаток решает день!')}
        <svg width="${S}" height="152" viewBox="0 0 ${S} 152" style="display:block;margin:0 auto">${cells}</svg>
        <div class="wv-row">${kv('0 → Пн','#8fd1a8')}${kv('3 → Чт','#ffd76a')}${kv('6 → Вс','#ffd76a')}</div>
        ${sml('остаток 0 — тот же день, остаток r — день под номером r от понедельника')}
      </div>`;
    } else if(step===7){
      // тренажёр: кнопки + кольцо
      if(st.n==null) st.n=10;
      const n=st.n;
      const k=Math.floor(n/7), r=n%7;
      const hl=[];
      for(let i=0;i<=r;i++) hl.push(i);
      h=`<div class="wv-col">
        ${big('Тренажёр: стрелка по кругу')}
        ${ringSVG(hl,0,224)}
        ${ans('+'+n+' дней → '+DFULL[r]+' ('+DAYS[r]+')','#ffd76a')}
        <div class="wv-row">${chip(n+' = '+k+'·7 + '+r,'rgba(217,164,65,.5)')}</div>
        ${btns(btn('+10 дней','n10'),btn('+30 дней','n30'),btn('+100 дней','n100'),btn('↺','r'))}
        ${sml('полные недели (k штук) выброшены — двигаемся на остаток r!')}
      </div>`;
    } else {
      // проверь себя: +7
      h=`<div class="wv-col">
        ${big('Проверь себя: +7 дней')}
        ${ringSVG([0],0,224)}
        <div class="wv-row">${kv('7 = 1 · 7 + 0','#8fd1a8')}${chip('остаток 0 → тот же день','rgba(127,209,160,.5)')}</div>
        ${ans('через 7 дней — снова понедельник!','#8fd1a8')}
        ${sml('полная неделя не двигает стрелку. готов к проверке?')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.VISKW[17]=visW17;
  function visW17Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    switch(act){
      case 'd+': st.cur=(st.cur==null?0:st.cur)+1; if(st.cur>14) st.cur=0; break;
      case 'w': st.cur=(st.cur==null?0:st.cur)+7; if(st.cur>21) st.cur=0; break;
      case 'n10': st.n=10; break;
      case 'n30': st.n=30; break;
      case 'n100': st.n=100; break;
      case 'r': CHS[lk]={}; break;
    }
    chRender(0);
  }
  window.visW17Act=visW17Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===17){ window.ARH_LESSONS[i]=L17; break; } } })();
})();

/* ===== Общий UI-кит «АРХИМЕД»: аккуратная типографика, ничего не вылезает ===== */
(function(){
  if(window.__wkCssDone) return; window.__wkCssDone=1;
  const st=document.createElement('style');
  st.textContent=
    '#lvis g.wv-pop,#lvis rect.wv-pop,#lvis circle.wv-pop,#lvis text.wv-pop{transform-box:fill-box;transform-origin:center;}'+
    '.wk-frame{background:linear-gradient(180deg,rgba(26,52,40,.92),rgba(15,30,23,.95));border:1px solid #3d5c49;border-radius:18px;padding:12px 10px 13px;max-width:344px;margin:0 auto;overflow:hidden;}'+
    '.wk-hero{display:flex;justify-content:center;}'+
    '.wk-big{font-size:20px;color:#ffd76a;font-family:Georgia,serif;line-height:1.25;text-align:center;padding:0 4px;}'+
    '.wk-sml{color:#c9b795;font-size:13px;line-height:1.5;max-width:322px;text-align:center;margin:0 auto;}'+
    '.wk-row{display:flex;gap:7px;justify-content:center;flex-wrap:wrap;align-items:center;}'+
    '.wk-chip{display:inline-block;padding:3px 10px;border-radius:999px;background:rgba(255,255,255,.05);border:1.5px solid #3d5c49;font-size:13.5px;color:#e8dcc8;}'+
    '.wk-ans{font-size:19px;font-weight:bold;font-family:Georgia,serif;text-align:center;line-height:1.3;}'+
    '.wk-btn{padding:9px 14px;font-size:13.5px;border-radius:10px;border:1px solid #3d5c49;background:rgba(255,255,255,.06);color:#ffe9c9;cursor:pointer;font-weight:bold;}'+
    '.wk-btn:active{transform:scale(.96);}';
  document.head.appendChild(st);
})();
const wkBig=t=>`<div class="wk-big">${t}</div>`;
const wkSml=t=>`<div class="wk-sml">${t}</div>`;
const wkChip=(t,c)=>`<span class="wk-chip" style="border-color:${c||'#3d5c49'}">${t}</span>`;
const wkPill=(t,c)=>`<span style="display:inline-block;padding:4px 13px;border-radius:12px;background:rgba(255,255,255,.06);border:2px solid ${c||'#ffd76a'};font-family:Georgia,serif;font-size:18px;font-weight:bold;color:${c||'#ffd76a'}">${t}</span>`;
const wkAns=(t,c)=>`<div class="wk-ans" style="color:${c||'#8fd1a8'}">${t}</div>`;
const wkRow=(...x)=>`<div class="wk-row">${x.join('')}</div>`;
const wkBtn=(t,on)=>`<button class="wk-btn" onclick="${on}">${t}</button>`;
const wkFrame=(inner)=>`<div class="wk-frame"><div class="wk-col" style="display:flex;flex-direction:column;gap:9px;align-items:center">${inner}</div></div>`;
const wkHero=(svg)=>`<div class="wk-hero" style="width:100%">${svg}</div>`;
const wkNote=(t,c)=>`<div style="font-size:13px;color:${c||'#cfe0cf'};text-align:center;line-height:1.45">${t}</div>`;
const wkP=(t)=>`<div class="wv-pop">${t}</div>`;
const fitTxt=(x,y,boxW,txt,size,fill,w)=>{let s=size;const est=txt.length*s*0.62+4;if(est>boxW)s=Math.max(8.5,Math.floor((boxW-4)/(txt.length*0.62)));return `<text x="${x}" y="${y}" text-anchor="middle" font-size="${s}" fill="${fill}"${w?' font-weight="bold"':''} font-family="Georgia,serif">${txt}</text>`;};

/* ================= УРОК 12 · Остатки при делении (v2, качественная) ================= */
(function(){
  const L12 = {
    id: 12, title: 'Остатки при делении', ico: '🍬',
    src: 'ВсОШ-стиль · остатки', subj: 'math',
    explain: [
      'Архимед раскладывает 17 конфет в мешочки по 5 конфет. Получается 3 полных мешочка — это 15 конфет — и остаются 2 конфеты, которые ни в один мешочек не поместились. Эти «лишние» конфеты и есть остаток. Остатки помогают решать очень хитрые задачи!',
      'Что такое остаток? Делим 17 на 5: 17 = 5 · 3 + 2. Говорят: 17 : 5 = 3 и остаток 2. Проверка: 5 · 3 + 2 = 17 — всё сходится! Частное 3 показывает, сколько раз по 5 поместилось, а остаток 2 — что не поместилось.',
      'Запомни запись-помощник: делимое = делитель · частное + остаток. Для 17 : 5: делимое 17 = делитель 5 · частное 3 + остаток 2. Проверяй так любую задачу с остатком!',
      'Главное правило: остаток всегда МЕНЬШЕ делителя. При делении на 5 остаток бывает только 0, 1, 2, 3 или 4. Остаток 5 невозможен: 5 конфет снова собрались бы в целый мешочек!',
      'Остатки идут по кругу: 6 : 5 = 1 и остаток 1, 7 : 5 — остаток 2, 8 — остаток 3, 9 — остаток 4, 10 — остаток 0, а 11 — снова остаток 1. Каждые 5 чисел всё повторяется!',
      'Числа с одинаковым остатком образуют «семью». Остаток 2 при делении на 5 дают числа 2, 7, 12, 17, 22… Следующее число семьи получается прибавлением 5: шаг семьи равен делителю!',
      'Считаем членов семьи: сколько чисел от 1 до 40 дают остаток 2 при делении на 5? Это числа 2, 7, 12, …, 37. Формула: (37 − 2) : 5 + 1 = 7 + 1 = 8. Промежутков между числами 7, а точек — на одну больше!',
      'Остаток 0 — это когда число делится нацело. Кратные 7: 7, 14, 21, …, 98 — у всех остаток 0 при делении на 7. Сколько таких чисел от 1 до 100? 100 : 7 = 14 и остаток 2 → ровно 14 кратных!',
      'Проверь себя: найди остаток при делении 47 на 5. Ближайшее кратное 5, не большее 47, — это 45. 47 − 45 = 2. Остаток 2! Теперь — вперёд, к проверке!'
    ],
    check: { q: 'Остаток при делении 47 на 5 равен…', choices: ['1', '2', '3', '4'], ans: 1,
      exp: '45 делится на 5, значит 47 − 45 = 2.' },
    tasks: [
      { q: 'Сколько чисел от 1 до 40 дают остаток 2 при делении на 5?', kind: 'unit', ans: 8, tol: 0,
        hints: ['Это числа 2, 7, 12, …, 37.', 'Шаг 5: (37 − 2) : 5 + 1', '35 : 5 + 1 = 8.'], sol: '(37 − 2)/5 + 1 = 8 чисел с остатком 2.' },
      { q: 'Сколько чисел от 1 до 100 делятся на 7?', kind: 'unit', ans: 14, tol: 0,
        hints: ['Это кратные 7: 7, 14, …, 98.', '98 : 7 = 14.', 'Ответ: 14 чисел.'], sol: 'Кратные 7 до 100: 98 : 7 = 14 чисел.' }
    ]
  };
  const C={red:'#e0523d',green:'#8fd1a8',blue:'#7fd1ff',gold:'#ffd76a',dim:'#8fa08f',cream:'#e8dcc8'};
  const TX=(cx,cy,s,size,fill,w)=>`<text x="${cx}" y="${cy}" text-anchor="middle" font-size="${size}" fill="${fill||C.cream}"${w?' font-weight="bold"':''} font-family="Georgia,serif">${s}</text>`;

  function visW12(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      if(st.n==null) st.n=17;
      const n=st.n, b=Math.floor(n/5), rem=n%5;
      const showB=Math.min(b,4);
      const W=320, bx0=14, bw=52, bh=52, gapx=8, y=14;
      let bags='';
      for(let g=0;g<showB;g++){
        const x=bx0+g*(bw+gapx);
        bags+=`<g class="wv-pop" style="animation-delay:${(g*0.12).toFixed(2)}s">
          <rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="12" fill="rgba(255,255,255,.05)" stroke="${C.green}" stroke-width="2"/>
          <text x="${x+bw/2}" y="${y+21}" text-anchor="middle" font-size="11" fill="${C.green}">мешочек ${g+1}</text>
          ${[0,1,2,3,4].map(j=>`<circle cx="${x+13+(j%3)*13}" cy="${y+(j<3?33:44)}" r="4.6" fill="${C.red}"/>`).join('')}
        </g>`;
      }
      let extra='';
      if(b>showB) extra=wkNote('и ещё '+(b-showB)+' мешочек по 5', C.blue);
      let remSvg='';
      if(rem>0){
        const rx=bx0+showB*(bw+gapx)+2;
        remSvg=`<g class="wv-pop" style="animation-delay:${(showB*0.12+0.15).toFixed(2)}s">
          <rect x="${rx}" y="${y}" width="58" height="${bh}" rx="12" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.4"/>
          <text x="${rx+29}" y="${y+21}" text-anchor="middle" font-size="11" fill="${C.gold}">остаток</text>
          ${[0,1,2,3].slice(0,rem).map(j=>`<circle cx="${rx+14+j*12}" cy="${y+37}" r="4.6" fill="${C.gold}"/>`).join('')}
        </g>`;
      } else {
        remSvg=`<text x="160" y="${y+34}" text-anchor="middle" font-size="14" fill="${C.green}">всё разложилось ровно!</text>`;
      }
      const W2=Math.min(330,bx0*2+(showB*(bw+gapx))+70);
      h=wkFrame(wkBig('Конфеты Архимеда 🍬')+
        wkRow(wkChip('горсть: '+n+' конфет', C.blue), wkChip('кладём по 5', C.green))+
        wkHero(`<svg width="${Math.min(W2,330)}" height="${y+bh+10}" viewBox="0 0 ${Math.min(W2,330)} ${y+bh+10}" style="display:block;max-width:100%">${bags}${remSvg}</svg>`)+
        extra+
        wkRow(wkPill(n+' = 5·'+b+' + '+rem, C.gold))+
        wkRow(wkBtn('🍬 новая горсть',`visW12Act('${lk}','n')`))+
        wkSml('полных мешочков: '+b+' — это '+b*5+' конфет. Остаток: '+rem+'. Остаток — то, что не поместилось в мешочки!'));
    } else if(step===1){
      h=wkFrame(wkBig('Делим: частное и остаток')+
        wkHero(`<svg width="322" height="132" viewBox="0 0 322 132" style="display:block">
          <rect x="4" y="6" width="314" height="120" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49" stroke-width="1.5"/>
          <g class="wv-pop">
            <rect x="16" y="18" width="88" height="96" rx="13" fill="rgba(255,255,255,.05)" stroke="#5a6f7f"/>
            <text x="60" y="56" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold" font-family="Georgia,serif">17</text>
            <line x1="34" y1="68" x2="86" y2="68" stroke="#9ec0a8" stroke-width="2"/>
            <text x="60" y="94" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold" font-family="Georgia,serif">5</text>
            <text x="60" y="110" text-anchor="middle" font-size="11" fill="#9ec0a8">делим</text>
          </g>
          <text x="126" y="70" font-size="24" fill="#8fa08f">→</text>
          <g class="wv-pop2">
            <rect x="146" y="18" width="76" height="96" rx="13" fill="rgba(127,209,255,.08)" stroke="${C.blue}" stroke-width="2"/>
            <text x="184" y="52" text-anchor="middle" font-size="13" fill="${C.blue}">частное</text>
            <text x="184" y="92" text-anchor="middle" font-size="30" fill="${C.blue}" font-weight="bold" font-family="Georgia,serif">3</text>
            
          </g>
          <g class="wv-pop3">
            <rect x="240" y="18" width="70" height="96" rx="13" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.4"/>
            <text x="275" y="52" text-anchor="middle" font-size="13" fill="${C.gold}">остаток</text>
            <text x="275" y="92" text-anchor="middle" font-size="30" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">2</text>
            
          </g>
        </svg>`)+
        wkAns('проверка: 5 · 3 + 2 = 17 ✔', C.green)+
        wkSml('частное — сколько раз поместилось по 5, остаток — что осталось «лишним»'));
    } else if(step===2){
      h=wkFrame(wkBig('Запись-помощник')+
        wkHero(`<svg width="322" height="120" viewBox="0 0 322 120" style="display:block">
          <rect x="4" y="4" width="314" height="112" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          ${[['делимое','17',C.blue,22,76],['делитель','5',C.green,118,76],['частное','3',C.gold,206,76]].map((b,i)=>`
            <g class="wv-pop" style="animation-delay:${(i*0.15).toFixed(2)}s">
              <rect x="${b[3]-8}" y="18" width="76" height="56" rx="12" fill="rgba(255,255,255,.05)" stroke="${b[2]}" stroke-width="2"/>
              <text x="${b[3]+30}" y="36" text-anchor="middle" font-size="12" fill="${b[2]}">${b[0]}</text>
              <text x="${b[3]+30}" y="62" text-anchor="middle" font-size="24" fill="${b[2]}" font-weight="bold" font-family="Georgia,serif">${b[1]}</text>
            </g>`).join('')}
          <text x="104" y="56" font-size="20" fill="#8fa08f">=</text>
          <text x="196" y="56" font-size="20" fill="#8fa08f">·</text>
          <text x="284" y="56" font-size="20" fill="#8fa08f">+</text>
          <g class="wv-pop3">
            <rect x="268" y="18" width="44" height="56" rx="12" fill="rgba(255,215,106,.12)" stroke="${C.gold}" stroke-width="2"/>
            <text x="290" y="36" text-anchor="middle" font-size="11" fill="${C.gold}">ост.</text>
            <text x="290" y="62" text-anchor="middle" font-size="24" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">2</text>
          </g>
          <rect x="86" y="86" width="150" height="26" rx="13" fill="rgba(143,209,168,.1)" stroke="${C.green}"/>
          <text x="161" y="104" text-anchor="middle" font-size="15" fill="${C.green}" font-weight="bold">17 = 5·3 + 2 ✓</text>
        </svg>`)+
        wkSml('делимое = делитель · частное + остаток. Подставляй числа и проверяй любой ответ!'));
    } else if(step===3){
      // 5 коробок-карманов с остатками, аккуратная сетка
      const cols=[C.blue,C.green,C.gold,'#e8a0d8','#ff8a7a'];
      const data=[[],[],[],[],[]];
      for(let nn=1;nn<=13;nn++) data[nn%5].push(nn);
      const W=324, x0=8, cw=60, gap=3.5, y0=12, ch=88;
      let cells='';
      for(let p=0;p<5;p++){
        const x=x0+p*(cw+gap);
        const last=p===4;
        cells+=`<g class="wv-pop" style="animation-delay:${(p*0.1).toFixed(2)}s">
          <rect x="${x}" y="${y0}" width="${cw}" height="${ch}" rx="13" fill="${last?'rgba(232,106,90,.05)':'rgba(255,255,255,.04)'}" stroke="${last?'#c0564c':'#3d7a55'}" stroke-width="${last?2.2:1.8}" ${last?'stroke-dasharray="6 4"':''}/>
          ${fitTxt(x+cw/2,y0+22,cw-6,'остаток '+p,12,last?'#ff9a8a':cols[p],false)}
          <text x="${x+cw/2}" y="${y0+48}" text-anchor="middle" font-size="26" fill="${last?'#ff9a8a':C.cream}" font-weight="bold" font-family="Georgia,serif">${last?'✗':p}</text>
          <text x="${x+cw/2}" y="${y0+72}" text-anchor="middle" font-size="9.5" fill="#9ec0a8">${last?'—':data[p].slice(0,4).join('·')}</text>
        </g>`;
      }
      h=wkFrame(wkBig('Карманы остатков · делим на 5')+
        wkHero(`<svg width="${W}" height="${y0+ch+8}" viewBox="0 0 ${W} ${y0+ch+8}" style="display:block">${cells}</svg>`)+
        wkRow(wkChip('остаток всегда < делителя', C.green), wkChip('остаток 5 не бывает ✗', '#c0564c'))+
        wkSml('в карманы разложены числа 1…13: у каждого свой остаток — 0, 1, 2, 3 или 4'));
    } else if(step===4){
      // лента 6..15: крупные плитки, остаток снизу отдельно
      const cols=[C.blue,C.green,C.gold,'#e8a0d8','#ff8a7a'];
      const nums=[6,7,8,9,10,11,12,13,14,15];
      const W=330, x0=8, cw=30.5, gap=0.5, y0=14, th=44;
      let cells='';
      nums.forEach((nn,i)=>{
        const x=x0+i*(cw+gap), c=cols[nn%5];
        cells+=`<g class="wv-pop" style="animation-delay:${(i*0.06).toFixed(2)}s">
          <rect x="${x}" y="${y0}" width="${cw-1.5}" height="${th}" rx="9" fill="rgba(255,255,255,.05)" stroke="${c}" stroke-width="2"/>
          <text x="${x+(cw-1.5)/2}" y="${y0+26}" text-anchor="middle" font-size="17" fill="#fff" font-weight="bold" font-family="Georgia,serif">${nn}</text>
          <circle cx="${x+(cw-1.5)/2}" cy="${y0+38}" r="8" fill="${c}"/>
          <text x="${x+(cw-1.5)/2}" y="${y0+42}" text-anchor="middle" font-size="10" fill="#0d1a13" font-weight="bold">${nn%5}</text>
        </g>`;
      });
      h=wkFrame(wkBig('Остатки идут по кругу')+
        wkHero(`<svg width="${W}" height="${y0+th+6}" viewBox="0 0 ${W} ${y0+th+6}" style="display:block">${cells}</svg>`)+
        wkRow(wkChip('6 → остаток 1', cols[1]), wkChip('10 → остаток 0', cols[0]), wkChip('11 → снова 1', cols[1]))+
        wkAns('каждые 5 чисел остатки повторяются!', C.gold)+
        wkSml('под каждым числом — цветной кружок с его остатком при делении на 5'));
    } else if(step===5){
      // семья с шагом 5: крупные круги по центру
      const mem=[2,7,12,17];
      const W=326, cx=36, d=84;
      let s='';
      mem.forEach((m,i)=>{
        const x=18+i*d;
        s+=`<g class="wv-pop" style="animation-delay:${(i*0.15).toFixed(2)}s">
          <circle cx="${x+42}" cy="52" r="36" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.6"/>
          <text x="${x+42}" y="${x?60:60}" text-anchor="middle" font-size="24" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">${m}</text>
        </g>`;
        if(i<mem.length-1){
          const ax=x+78;
          s+=`<g class="wv-pop" style="animation-delay:${(i*0.15+0.1).toFixed(2)}s">
            <line x1="${ax}" y1="52" x2="${ax+24}" y2="52" stroke="${C.blue}" stroke-width="3"/>
            <polygon points="${ax+28},52 ${ax+20},47 ${ax+20},57" fill="${C.blue}"/>
            <text x="${ax+12}" y="40" text-anchor="middle" font-size="14" fill="${C.blue}" font-weight="bold">+5</text>
          </g>`;
        }
      });
      h=wkFrame(wkBig('Семья чисел с остатком 2')+
        wkHero(`<svg width="${W}" height="110" viewBox="0 0 ${W} 110" style="display:block">${s}</svg>`)+
        wkRow(wkChip('2 = 5·0 + 2', C.blue), wkChip('7 = 5·1 + 2', C.blue), wkChip('12 = 5·2 + 2', C.blue), wkChip('17 = 5·3 + 2', C.blue))+
        wkAns('все дают остаток 2 при делении на 5', C.green)+
        wkSml('шаг семьи равен делителю: каждое следующее число — плюс 5'));
    } else if(step===6){
      // члены семьи на шкале 1..40: точки + формула
      const mem=[2,7,12,17,22,27,32,37];
      const W=330, x0=14, L=302, y0=40;
      let s='';
      for(let k=1;k<=40;k++){
        const x=x0+L*k/41;
        const on=mem.indexOf(k)>=0;
        s+=`<circle cx="${x.toFixed(1)}" cy="${y0}" r="${on?9:3}" fill="${on?'#ffd76a':'rgba(255,255,255,.12)'}" class="${on?'wv-pop':''}"/>`;
        if(on) s+=`<text x="${x.toFixed(1)}" y="${y0+22}" text-anchor="middle" font-size="9.5" fill="#ffd76a">${k}</text>`;
        else if(k%10===0) s+=`<text x="${x.toFixed(1)}" y="${y0+20}" text-anchor="middle" font-size="8.5" fill="#5b6b58">${k}</text>`;
      }
      s+=`<line x1="${x0}" y1="${y0}" x2="${x0+L}" y2="${y0}" stroke="#3d5c49" stroke-width="3"/>`;
      h=wkFrame(wkBig('Сколько членов до 40?')+
        wkHero(`<svg width="${W}" height="80" viewBox="0 0 ${W} 80" style="display:block">${s}</svg>`)+
        wkAns('2, 7, 12, …, 37 — ровно 8 чисел!', C.gold)+
        wkRow(wkPill('(37 − 2) : 5 + 1', C.blue), wkPill('= 8', C.green))+
        wkSml('промежутков между числами 7, а самих чисел — на одно больше: 8'));
    } else if(step===7){
      // кратные 7 до 100 — шкала
      const W=330, x0=16, L=298, y0=36;
      let s='';
      s+=`<line x1="${x0}" y1="${y0}" x2="${x0+L}" y2="${y0}" stroke="#3d5c49" stroke-width="3"/>`;
      for(let k=0;k<=100;k+=10){
        const x=x0+L*k/100;
        s+=`<line x1="${x}" y1="${y0-7}" x2="${x}" y2="${y0+7}" stroke="#5b6b58" stroke-width="1.6"/>`;
        if(k%20===0) s+=`<text x="${x}" y="${y0+24}" text-anchor="middle" font-size="10" fill="#7a8a80">${k}</text>`;
      }
      for(let k=7;k<=98;k+=7){
        const x=x0+L*k/100;
        s+=`<circle cx="${x.toFixed(1)}" cy="${y0}" r="8" fill="${C.green}" class="wv-pop"/>`;
      }
      h=wkFrame(wkBig('Кратные 7 — это остаток 0')+
        wkHero(`<svg width="${W}" height="70" viewBox="0 0 ${W} 70" style="display:block">${s}</svg>`)+
        wkRow(wkChip('7, 14, 21, …, 98 — делятся нацело', C.green))+
        wkRow(wkPill('100 : 7 = 14 (ост. 2)', C.blue), wkPill('→ кратных 14', C.gold))+
        wkSml('остаток 0 ⇔ число делится нацело. Считаем так: сколько раз 7 помещается в 100'));
    } else {
      // проверь себя: 47 : 5
      h=wkFrame(wkBig('Проверь себя: 47 : 5')+
        wkHero(`<svg width="322" height="132" viewBox="0 0 322 132" style="display:block">
          <rect x="4" y="4" width="314" height="124" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="wv-pop">
            <rect x="16" y="18" width="120" height="52" rx="12" fill="rgba(127,209,160,.1)" stroke="${C.green}" stroke-width="2"/>
            <text x="76" y="40" text-anchor="middle" font-size="12.5" fill="#9ec0a8">кратное 5:</text>
            <text x="76" y="62" text-anchor="middle" font-size="20" fill="${C.green}" font-weight="bold" font-family="Georgia,serif">45 = 5 · 9</text>
          </g>
          <g class="wv-pop2">
            <rect x="150" y="18" width="156" height="52" rx="12" fill="rgba(255,255,255,.05)" stroke="#3d5c49"/>
            <text x="228" y="40" text-anchor="middle" font-size="12.5" fill="#9ec0a8">отнимаем от 47</text>
            <text x="228" y="62" text-anchor="middle" font-size="20" fill="#fff" font-weight="bold" font-family="Georgia,serif">47 − 45 = 2</text>
          </g>
          <g class="wv-pop3">
            <rect x="96" y="84" width="130" height="32" rx="16" fill="rgba(217,164,65,.12)" stroke="${C.gold}" stroke-width="2"/>
            <text x="161" y="105" text-anchor="middle" font-size="16" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">остаток 2!</text>
          </g>
        </svg>`)+
        wkSml('готов? жми «Понял! Проверю себя» — там вопрос про остаток 47 на 5!'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[12]=visW12;
  function visW12Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    const POOL=[17,22,27,32,18,23];
    const i0=POOL.indexOf(st.n==null?17:st.n);
    st.n=POOL[(i0+1)%POOL.length];
    chRender(0);
  }
  window.visW12Act=visW12Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===12){ window.ARH_LESSONS[i]=L12; break; } } })();
})();

/* ================= УРОК 17 · Дни недели и остатки (v2, качественная) ================= */
(function(){
  const L17 = {
    id: 17, title: 'Дни недели и остатки', ico: '📅',
    src: 'ВсОШ-стиль · остатки', subj: 'math',
    explain: [
      'Дни недели повторяются каждые 7 дней: понедельник, вторник, среда, четверг, пятница, суббота, воскресенье — и снова понедельник. Это как часы, на циферблате которых 7 делений. Через 7 дней наступит ТОТ ЖЕ день недели!',
      'Сегодня понедельник. Какой день будет через 10 дней? 10 дней — это 1 полная неделя (7 дней) и ещё 3 дня. Полная неделя возвращает нас в понедельник, значит, важен только остаток — 3 дня.',
      'Удобно делить с остатком на 7: 10 = 7 · 1 + 3. Частное 1 — это полные недели, их выбрасываем. Остаток 3 — на столько дней сдвигаемся вперёд по кругу недели.',
      'Сдвигаемся на 3 дня от понедельника: понедельник → вторник (1) → среда (2) → четверг (3). Значит, через 10 дней будет ЧЕТВЕРГ! Остаток 3 честно показал день.',
      'А через 30 дней? 30 = 4 · 7 + 2. Четыре полные недели (28 дней) выбрасываем, остаток 2. От понедельника +2 дня: вторник, среда. Через 30 дней будет среда!',
      'Даже 100 дней — легко! 100 = 14 · 7 + 2, ведь 14 · 7 = 98. Полных недель 14, остаток 2 — сдвиг всего на 2 дня. От понедельника через 100 дней снова среда. Остаток экономит время!',
      'Главный секрет: при счёте дней важны только остатки от деления на 7. Остаток 0 — тот же день, остаток 1 — следующий, …, остаток 6 — день через шесть дней. Полные недели ничего не меняют — выбрасывай их!',
      'Потренируйся: нажимай кнопки и смотри, как остаток двигает подсветку по кругу недели. Сколько дней добавить — 10, 30 или 100? Круг покажет день!',
      'Проверь себя: сегодня понедельник. Какой день будет через 7 дней? 7 — это полная неделя, остаток 0. День не изменится! Вперёд, к проверке!'
    ],
    check: { q: 'Сегодня понедельник. Какой день будет через 7 дней?', choices: ['Понедельник', 'Вторник', 'Суббота', 'Воскресенье'], ans: 0,
      exp: '7 дней — полная неделя, день тот же.' },
    tasks: [
      { q: 'Сегодня понедельник. Какой день будет через 10 дней?', choices: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], ans: 3, tol: 0,
        hints: ['10 = 7 + 3 — сдвиг на 3 дня.', 'Понедельник +3 = четверг.'], sol: '10 ≡ 3 (по модулю 7): понедельник + 3 дня = четверг.', kind: 'choice' },
      { q: 'Сегодня понедельник. Какой день будет через 30 дней?', choices: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], ans: 2, tol: 0,
        hints: ['30 = 28 + 2 — сдвиг на 2 дня.', 'Понедельник + 2 = среда.'], sol: '30 ≡ 2 (mod 7): понедельник + 2 дня = среда.', kind: 'choice' }
    ]
  };
  const DAYS=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  const DFULL=['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'];
  const C2={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',dim:'#8fa08f',cream:'#e8dcc8'};
  const rad=(d)=>d*Math.PI/180;
  function fitTxt(x,y,boxW,txt,size,fill,w){
    let s=size;
    const estW=txt.length*s*0.62+4;
    if(estW>boxW) s=Math.max(8.5,Math.floor((boxW-4)/(txt.length*0.62)));
    return `<text x="${x}" y="${y}" text-anchor="middle" font-size="${s}" fill="${fill}"${w?' font-weight="bold"':''} font-family="Georgia,serif">${txt}</text>`;
  }
  // Кольцо недели: today — золотой, target — зелёный, hl — дополнительные подсвеченные
  function ring17(opts){
    const o=opts||{};
    const S=252, cx=S/2, cy=S/2, R=80, r=27;
    const gold=o.today!=null?o.today:-1;
    const target=o.target!=null?o.target:-1;
    const hl=o.hl||[];
    let s='';
    s+=`<circle cx="${cx}" cy="${cy}" r="110" fill="rgba(0,0,0,.22)" stroke="#3d5c49" stroke-width="1.6"/>`;
    s+=`<circle cx="${cx}" cy="${cy}" r="96" fill="none" stroke="#2c4738" stroke-width="1.2"/>`;
    for(let i=0;i<7;i++){
      const a=rad(-90+i*45);
      const x=cx+R*Math.cos(a), y=cy+R*Math.sin(a);
      const isGold=i===gold, isTarget=i===target, isHl=hl.indexOf(i)>=0;
      const fill=isGold?C2.gold:(isTarget?C2.green:(isHl?'rgba(127,209,160,.14)':'rgba(255,255,255,.05)'));
      const stroke=isGold?C2.gold:(isTarget?C2.green:(isHl?'#5aa883':'#3d5c49'));
      const txtFill=isGold||isTarget?'#0d1a13':'#e8dcc8';
      s+=`<g class="${isTarget||isGold?'wv-pop':''}" style="${isTarget||isGold?`animation-delay:${(isTarget?0.3:0.1).toFixed(2)}s`:''}">
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${isGold||isTarget?3:1.6}"/>
        <text x="${x.toFixed(1)}" y="${(y+5).toFixed(1)}" text-anchor="middle" font-size="15.5" fill="${txtFill}" font-weight="bold">${DAYS[i]}</text>
      </g>`;
    }
    s+=`<circle cx="${cx}" cy="${cy}" r="26" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="1.6"/>`;
    s+=`<text x="${cx}" y="${cy-4}" text-anchor="middle" font-size="11" fill="#9ec0a8">неделя</text>`;
    s+=`<text x="${cx}" y="${cy+13}" text-anchor="middle" font-size="17" fill="#cfe0cf" font-weight="bold">7 дней</text>`;
    return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" style="display:block;margin:0 auto">${s}</svg>`;
  }
  function stepChips(arr,color){
    return arr.map((t,i)=>`<span class="wv-pop" style="animation-delay:${(i*0.22).toFixed(2)}s;display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border-radius:999px;background:rgba(255,255,255,.05);border:1.5px solid ${color||C2.green};font-size:13.5px;color:#e8dcc8">${t}</span>`).join('');
  }

  function visW17(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      if(st.cur==null) st.cur=0;
      const c=st.cur;
      const day=c%7;
      const note=c===0? 'нажми кнопку и посмотри, как меняется день!'
        : (day===0? 'полная неделя — снова понедельник! ✔' : '+'+c+' '+(c%10===1&&c%100!==11?'день':((c%10<5&&c%10>1)||c%10===0?'дней':'дня'))+' → '+DFULL[day]);
      h=wkFrame(wkBig('Неделя — часы с 7 делениями')+
        wkHero(ring17({today:0,target:c>0?day:-1}))+
        wkAns(note, day===0&&c>0?C2.green:C2.gold)+
        wkRow(wkBtn('+1 день →',`visW17Act('${lk}','d')`),wkBtn('+7 дней',`visW17Act('${lk}','w')`),wkBtn('↺',`visW17Act('${lk}','r')`))+
        wkSml('через 7 дней — тот же день: полная неделя возвращает в начало круга'));
    } else if(step===1){
      const W=330, x0=10, cw=30, gap=1.4, y0=26, r2=13.5;
      let s='';
      for(let i=0;i<10;i++){
        const x=x0+i*(cw+gap);
        const week=i<7, extra=i>=7;
        s+=`<g class="wv-pop" style="animation-delay:${(i*0.08).toFixed(2)}s">
          <circle cx="${x+cw/2}" cy="${y0}" r="${r2}" fill="${week?'rgba(127,209,255,.12)':(extra?'rgba(217,164,65,.16)':'rgba(255,255,255,.05)')}" stroke="${week?C2.blue:(extra?C2.gold:'#3d5c49')}" stroke-width="2.2"/>
          <text x="${x+cw/2}" y="${y0+5}" text-anchor="middle" font-size="11" fill="${extra?'#ffd76a':'#cfe0cf'}" font-weight="bold">${DAYS[i%7]}</text>
          <text x="${x+cw/2}" y="${y0+26}" text-anchor="middle" font-size="9.5" fill="#7a8a80">${i+1}</text>
        </g>`;
      }
      s+=`<rect x="${x0-6}" y="${y0-24}" width="${7*(cw+gap)+4}" height="18" rx="9" fill="rgba(127,209,255,.08)" stroke="${C2.blue}" stroke-width="1.6"/>`;
      s+=`<text x="${x0-6+7*(cw+gap)/2+2}" y="${y0-11}" text-anchor="middle" font-size="11" fill="${C2.blue}">полная неделя — выбросили</text>`;
      s+=`<rect x="${x0+7*(cw+gap)-4}" y="${y0+30}" width="${3*(cw+gap)+8}" height="18" rx="9" fill="rgba(217,164,65,.08)" stroke="${C2.gold}" stroke-width="1.6"/>`;
      s+=`<text x="${x0+7*(cw+gap)+3*(cw+gap)/2}" y="${y0+43}" text-anchor="middle" font-size="11" fill="${C2.gold}">осталось 3 дня</text>`;
      h=wkFrame(wkBig('Через 10 дней = неделя + 3')+
        wkHero(`<svg width="${W}" height="${y0+52}" viewBox="0 0 ${W} ${y0+52}" style="display:block">${s}</svg>`)+
        wkRow(wkPill('10 = 7 + 3', C2.blue), wkChip('важен только остаток — 3', C2.gold))+
        wkSml('полная неделя возвращает в понедельник, дальше двигаемся на 3 дня'));
    } else if(step===2){
      h=wkFrame(wkBig('Делим с остатком на 7')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <g class="wv-pop"><rect x="10" y="18" width="84" height="92" rx="14" fill="rgba(255,255,255,.05)" stroke="#5a6f7f" stroke-width="1.8"/>
            <text x="52" y="52" text-anchor="middle" font-size="13" fill="#9ec0a8">сколько дней?</text>
            <text x="52" y="90" text-anchor="middle" font-size="30" fill="#fff" font-weight="bold" font-family="Georgia,serif">10</text></g>
          <g class="wv-pop2"><circle cx="136" cy="64" r="27" fill="rgba(217,164,65,.1)" stroke="${C2.gold}" stroke-width="2.4"/>
            <text x="136" y="70" text-anchor="middle" font-size="14" fill="${C2.gold}" font-weight="bold">÷7</text></g>
          <g class="wv-pop3"><rect x="196" y="18" width="118" height="40" rx="11" fill="rgba(127,209,255,.09)" stroke="${C2.blue}" stroke-width="2"/>
            <text x="255" y="44" text-anchor="middle" font-size="15" fill="${C2.blue}" font-weight="bold">1 неделя</text></g>
          <g class="wv-pop3"><rect x="196" y="70" width="118" height="40" rx="11" fill="rgba(217,164,65,.1)" stroke="${C2.gold}" stroke-width="2.4"/>
            <text x="255" y="96" text-anchor="middle" font-size="15" fill="${C2.gold}" font-weight="bold">остаток 3</text></g>
          <rect x="30" y="126" width="262" height="18" rx="9" fill="rgba(255,255,255,.04)" stroke="#3d5c49"/>
          <text x="161" y="139" text-anchor="middle" font-size="12" fill="#9ec0a8">1 неделя = 7 дней — её выбрасываем</text>
        </svg>`)+
        wkRow(wkPill('10 = 7 · 1 + 3', C2.gold))+
        wkSml('частное 1 — полные недели, остаток 3 — рабочий сдвиг'));
    } else if(step===3){
      h=wkFrame(wkBig('Понедельник + 3 = четверг')+
        wkHero(ring17({today:0,target:3,hl:[1,2]}))+
        wkRow(stepChips(['шаг 1 → Вт','шаг 2 → Ср','шаг 3 → Чт'],C2.green))+
        wkAns('через 10 дней — четверг! 🎯', C2.green)+
        wkSml('шагаем от понедельника по кругу на остаток 3'));
    } else if(step===4){
      h=wkFrame(wkBig('Через 30 дней')+
        wkHero(`<svg width="322" height="140" viewBox="0 0 322 140" style="display:block">
          <g class="wv-pop"><rect x="10" y="16" width="142" height="58" rx="13" fill="rgba(127,209,255,.08)" stroke="${C2.blue}" stroke-width="2.2"/>
            <text x="81" y="40" text-anchor="middle" font-size="13" fill="#9fc5e8">4 полные недели</text>
            <text x="81" y="64" text-anchor="middle" font-size="19" fill="${C2.blue}" font-weight="bold" font-family="Georgia,serif">4 · 7 = 28 дней</text></g>
          <g class="wv-pop2"><rect x="168" y="16" width="144" height="58" rx="13" fill="rgba(217,164,65,.1)" stroke="${C2.gold}" stroke-width="2.4"/>
            <text x="240" y="40" text-anchor="middle" font-size="13" fill="#d9c088">и остаток</text>
            <text x="240" y="64" text-anchor="middle" font-size="19" fill="${C2.gold}" font-weight="bold" font-family="Georgia,serif">2 дня</text></g>
          <rect x="46" y="90" width="230" height="36" rx="18" fill="rgba(143,209,168,.1)" stroke="${C2.green}" stroke-width="2"/>
          <text x="161" y="113" text-anchor="middle" font-size="15" fill="${C2.green}" font-weight="bold" font-family="Georgia,serif">Пн + 2 → среда!</text>
        </svg>`)+
        wkRow(wkPill('30 = 4 · 7 + 2', C2.gold), wkPill('→ среда', C2.green))+
        wkSml('28 дней — ровно 4 недели: выбрасываем их, остаток 2 двигает день'));
    } else if(step===5){
      h=wkFrame(wkBig('Даже 100 дней — легко!')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <g class="wv-pop"><rect x="10" y="16" width="96" height="60" rx="13" fill="rgba(255,255,255,.05)" stroke="#5a6f7f" stroke-width="1.8"/>
            <text x="58" y="42" text-anchor="middle" font-size="13" fill="#9ec0a8">дней</text>
            <text x="58" y="66" text-anchor="middle" font-size="24" fill="#fff" font-weight="bold" font-family="Georgia,serif">100</text></g>
          <g class="wv-pop2"><rect x="124" y="16" width="86" height="60" rx="13" fill="rgba(127,209,255,.08)" stroke="${C2.blue}" stroke-width="2"/>
            <text x="167" y="42" text-anchor="middle" font-size="13" fill="#9fc5e8">14 · 7</text>
            <text x="167" y="66" text-anchor="middle" font-size="20" fill="${C2.blue}" font-weight="bold" font-family="Georgia,serif">= 98</text></g>
          <g class="wv-pop3"><rect x="228" y="16" width="84" height="60" rx="13" fill="rgba(217,164,65,.1)" stroke="${C2.gold}" stroke-width="2.4"/>
            <text x="270" y="42" text-anchor="middle" font-size="13" fill="#d9c088">остаток</text>
            <text x="270" y="66" text-anchor="middle" font-size="20" fill="${C2.gold}" font-weight="bold" font-family="Georgia,serif">2</text></g>
          <rect x="36" y="96" width="250" height="40" rx="20" fill="rgba(143,209,168,.1)" stroke="${C2.green}" stroke-width="2"/>
          <text x="161" y="121" text-anchor="middle" font-size="15.5" fill="${C2.green}" font-weight="bold" font-family="Georgia,serif">сдвиг на 2 дня → среда</text>
        </svg>`)+
        wkRow(wkChip('14 полных недель (98 дней) выбрасываем', C2.blue))+
        wkSml('не нужно считать все 100 дней — остаток от деления на 7 всё решает'));
    } else if(step===6){
      const W=326, x0=6, cw=42, gap=2, y0=14, ch=64;
      let s='';
      for(let r=0;r<7;r++){
        const x=x0+r*(cw+gap);
        const gold=r===0;
        s+=`<g class="wv-pop" style="animation-delay:${(r*0.09).toFixed(2)}s">
          <rect x="${x}" y="${y0}" width="${cw}" height="${ch}" rx="12" fill="${gold?'rgba(143,209,168,.12)':'rgba(255,255,255,.04)'}" stroke="${gold?C2.green:'#3d5c49'}" stroke-width="2"/>
          ${fitTxt(x+cw/2,y0+24,cw-8,'ост. '+r,12,gold?C2.green:'#9ec0a8')}
          <circle cx="${x+cw/2}" cy="${y0+45}" r="15" fill="${gold?C2.green:'rgba(255,255,255,.06)'}" stroke="${gold?C2.green:'#4c8a5a'}"/>
          <text x="${x+cw/2}" y="${y0+50}" text-anchor="middle" font-size="13" fill="#e8dcc8" font-weight="bold">${DAYS[r]}</text>
        </g>`;
      }
      h=wkFrame(wkBig('Остаток решает день!')+
        wkHero(`<svg width="${W}" height="${y0+ch+8}" viewBox="0 0 ${W} ${y0+ch+8}" style="display:block">${s}</svg>`)+
        wkRow(wkChip('остаток 0 → Пн', C2.green), wkChip('остаток 1 → Вт', C2.cream), wkChip('… остаток 6 → Вс', C2.cream))+
        wkSml('остаток 0 — тот же день; остаток r — день номер r от понедельника'));
    } else if(step===7){
      if(st.n==null) st.n=10;
      const n=st.n, k=Math.floor(n/7), r=n%7;
      h=wkFrame(wkBig('Тренажёр: подсветка по кругу')+
        wkHero(ring17({today:0,target:r>0?r:-1,hl:r>0?[r]:[]}))+
        wkAns('+'+n+' дней → '+DFULL[r]+' ('+DAYS[r]+')', C2.gold)+
        wkRow(wkPill(n+' = '+k+' · 7 + '+r, C2.blue))+
        wkRow(wkBtn('+10 дней',`visW17Act('${lk}','n10')`),wkBtn('+30 дней',`visW17Act('${lk}','n30')`),wkBtn('+100 дней',`visW17Act('${lk}','n100')`),wkBtn('↺',`visW17Act('${lk}','r')`))+
        wkSml('полные недели (их '+k+') выброшены — двигаемся на остаток '+r));
    } else {
      h=wkFrame(wkBig('Проверь себя: +7 дней')+
        wkHero(ring17({today:0,target:-1}))+
        wkRow(wkPill('7 = 1 · 7 + 0', C2.green), wkChip('остаток 0 → день не меняется', C2.green))+
        wkAns('через 7 дней — снова понедельник!', C2.green)+
        wkSml('полная неделя не двигает стрелку. Готов к проверке?'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[17]=visW17;
  function visW17Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    switch(act){
      case 'd': st.cur=((st.cur==null?0:st.cur)+1)%15; break;
      case 'w': st.cur=((st.cur==null?0:st.cur)+7)%22; break;
      case 'n10': st.n=10; break;
      case 'n30': st.n=30; break;
      case 'n100': st.n=100; break;
      case 'r': CHS[lk]={}; break;
    }
    chRender(0);
  }
  window.visW17Act=visW17Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===17){ window.ARH_LESSONS[i]=L17; break; } } })();
})();

/* ================= УРОК 24 · Цепочки сравнений (v2) ================= */
(function(){
  const L24 = {
    id: 24, title: 'Цепочки сравнений', ico: '📏',
    src: 'Логика · транзитивность · кто выше/тяжелее всех', subj: 'math',
    explain: [
      'Лесная линейка Архимеда: Лиса выше Зайца, а Волк выше Лисы. Можно ли узнать, кто выше всех, даже не измеряя их? Можно! Если Лиса выше Зайца, а Волк выше Лисы, то Волк выше и Зайца тоже — сравнения выстраиваются в цепочку.',
      'Строим цепочку: записываем условия одно за другим — «Лиса > Заяц» и «Волк > Лиса». Соединяем звенья: Волк > Лиса > Заяц. Теперь порядок виден сразу: выше всех тот, кто стоит в цепочке первым, — Волк!',
      'Это свойство называют транзитивностью: если A больше B, а B больше C, то A больше C. Промежуточное звено B можно «выбросить» — вывод останется верным. Правило работает для роста, массы, длины, возраста — для любых сравнений.',
      'Весы работают точно так же. X легче Y, а Y легче Z — значит, X < Y < Z. Тяжелее всех Z, легче всех X. Стрелка сравнения всегда указывает от более лёгкого к более тяжёлому.',
      'Пиши цепочку одной строкой: Волк > Лиса > Заяц. Кто первый — самый высокий, кто последний — самый низкий. Порядок звеньев — это готовый ответ на вопрос «кто выше или ниже всех».',
      'Четыре зверя: Медведь выше Волка, Волк выше Лисы, Лиса выше Зайца. Соединяем: Медведь > Волк > Лиса > Заяц. Медведь — самый высокий, Заяц — самый низкий. Длинная цепочка работает так же, как короткая.',
      'А если данных не хватает? Лиса выше Зайца и Волк выше Зайца. Кто выше — Лиса или Волк? Неизвестно! Мы знаем только, что оба выше Зайца. Отвечай ровно на то, что следует из цепочки, и не додумывай лишнего.',
      'Тест из учебника: A выше B, B выше C — кто выше всех? Правильный ответ A: A > B > C. А если A выше B, B выше C, C выше D — кто ниже всех? Правильный ответ D. Попробуй ответить сам в виджете ниже!',
      'Проверь себя: X легче Y, а Y легче Z. Кто тяжелее всех? Собери цепочку X < Y < Z — и ответ готов. Вперёд, к проверке!'
    ],
    check: { q: 'X легче Y, а Y легче Z. Кто тяжелее всех?', choices: ['X', 'Y', 'Z'], ans: 2,
      exp: 'X < Y < Z — тяжелее всех Z.' },
    tasks: [
      { q: 'A выше B, B выше C. Кто выше всех?', choices: ['A', 'B', 'C'], ans: 0, tol: 0,
        hints: ['Цепочка: A > B > C.'], sol: 'A > B > C — выше всех A.', kind: 'choice' },
      { q: 'A выше B, B выше C, C выше D. Кто ниже всех?', choices: ['A', 'B', 'C', 'D'], ans: 3, tol: 0,
        hints: ['Цепочка: A > B > C > D.', 'Ниже всех — последний.'], sol: 'A > B > C > D — ниже всех D.', kind: 'choice' }
    ]
  };
  const C={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',dim:'#8fa08f',cream:'#e8dcc8',red:'#ff8a7a'};
  // башни-звери: seq=[{e,t,h,c}]
  function towers(seq,opts){
    const o=opts||{};
    const colW=o.colW||58, gap=o.gap||10, base=o.base||124, top=o.top||10;
    const W=seq.length*colW+(seq.length-1)*gap+12;
    const x0=6;
    let s='';
    seq.forEach((it,i)=>{
      const x=x0+i*(colW+gap);
      const hh=it.h;
      s+=`<g class="wv-pop" style="animation-delay:${(i*0.13).toFixed(2)}s">
        <rect x="${x}" y="${base-hh}" width="${colW}" height="${hh}" rx="12" fill="rgba(255,255,255,.05)" stroke="${it.c}" stroke-width="2.4"/>
        <text x="${x+colW/2}" y="${base-hh+30}" text-anchor="middle" font-size="24">${it.e}</text>
        <text x="${x+colW/2}" y="${base+16}" text-anchor="middle" font-size="12.5" fill="${it.c}" font-weight="bold">${it.t}</text>
      </g>`;
    });
    s+=`<line x1="4" y1="${base+3}" x2="${W-4}" y2="${base+3}" stroke="#3d5c49" stroke-width="2"/>`;
    return `<svg width="${W}" height="${base+26}" viewBox="0 0 ${W} ${base+26}" style="display:block;margin:0 auto">${s}</svg>`;
  }
  function chain24(arr,hlIdx){
    const cells=arr.map((a,i)=>{
      const hl=hlIdx&&hlIdx.indexOf(i)>=0;
      return `<span class="wv-pop" style="animation-delay:${(i*0.15).toFixed(2)}s;display:inline-flex;flex-direction:column;align-items:center;gap:2px;padding:7px 13px;border-radius:13px;background:${hl?'rgba(217,164,65,.14)':'rgba(255,255,255,.05)'};border:2px solid ${hl?C.gold:'#4c8a5a'};min-width:64px">
        <span style="font-size:24px">${a.e}</span><span style="font-size:13px;color:#e8dcc8">${a.t}</span></span>`;
    }).join(`<span style="font-size:24px;color:${C.red};font-weight:bold"> &gt; </span>`);
    return `<div class="wk-row" style="gap:6px">${cells}</div>`;
  }
  const Q24=[
    {q:'A выше B, B выше C. Кто выше всех?',opts:['A','B','C'],ans:0},
    {q:'A выше B, B выше C, C выше D. Кто ниже всех?',opts:['A','B','C','D'],ans:3}
  ];
  function testUI(lk,st){
    const T=Q24[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.05)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.2)':'rgba(232,106,90,.2)'; bd=i===T.ans?C.green:C.red; tc=i===T.ans?C.green:C.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:64px;font-size:17px" onclick="visW24T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1? '<div class="wk-ans" style="color:#8fd1a8">🎉 верно! Оба теста решены!</div>' : '<div class="wk-ans" style="color:#8fd1a8">✅ верно! Цепочка работает!</div>')
        : '<div class="wk-ans" style="color:#ff8a7a">❌ не так. Собери цепочку и посмотри, кто первый, а кто последний.</div>';
    }
    const next = st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий вопрос →',`visW24Act('${lk}','nq')`):'';
    const rst = wkBtn('↺ заново',`visW24Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row">${opts}</div>${msg}<div class="wk-row">${next}${rst}</div>`;
  }
  function visW24(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      h=wkFrame(wkBig('Лесная линейка Архимеда 🐾')+
        wkHero(towers([{e:'🐰',t:'Заяц',h:46,c:'#c9a06a'},{e:'🦊',t:'Лиса',h:76,c:'#e08a4a'},{e:'🐺',t:'Волк',h:108,c:'#7f9bb8'}],{base:118}))+
        wkRow(wkPill('Лиса > Заяц',C.gold),wkPill('Волк > Лиса',C.blue))+
        `<div class="wk-ans wv-pulse" style="color:#ffd76a">кто выше всех — видно сразу после сборки цепочки?</div>`+
        wkSml('известно только два сравнения, но они уже складываются в ответ. Листай дальше!'));
    } else if(step===1){
      h=wkFrame(wkBig('Собираем цепочку')+
        wkHero(towers([{e:'🐺',t:'Волк',h:108,c:'#7f9bb8'},{e:'🦊',t:'Лиса',h:76,c:'#e08a4a'},{e:'🐰',t:'Заяц',h:46,c:'#c9a06a'}],{base:118}))+
        chain24([{e:'🐺',t:'Волк'},{e:'🦊',t:'Лиса'},{e:'🐰',t:'Заяц'}],[0])+
        wkAns('Волк > Лиса > Заяц — выше всех Волк!',C.green)+
        wkSml('сравнения встают в ряд, как звенья цепи: середина соединяет края'));
    } else if(step===2){
      h=wkFrame(wkBig('Секрет — транзитивность')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="4" y="4" width="314" height="142" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          ${[['A','больше','#7fd1ff',20],['B','середина','#8fd1a8',126],['C','меньше','#ffd76a',232]].map((b,i)=>`
            <g class="wv-pop" style="animation-delay:${(i*0.16).toFixed(2)}s">
              <rect x="${b[3]}" y="24" width="72" height="64" rx="14" fill="rgba(255,255,255,.05)" stroke="${b[2]}" stroke-width="2.4"/>
              <text x="${b[3]+36}" y="58" text-anchor="middle" font-size="26" fill="${b[2]}" font-weight="bold" font-family="Georgia,serif">${b[0]}</text>
              <text x="${b[3]+36}" y="78" text-anchor="middle" font-size="11" fill="#9ec0a8">${b[1]}</text>
            </g>`).join('')}
          <text x="96" y="64" font-size="24" fill="${C.red}" font-weight="bold">></text>
          <text x="202" y="64" font-size="24" fill="${C.red}" font-weight="bold">></text>
          <rect x="66" y="104" width="190" height="30" rx="15" fill="rgba(143,209,168,.1)" stroke="${C.green}" stroke-width="1.8"/>
          <text x="161" y="124" text-anchor="middle" font-size="13.5" fill="${C.green}" font-weight="bold">A > B и B > C → A > C</text>
        </svg>`)+
        wkRow(wkChip('рост',C.blue),wkChip('масса',C.green),wkChip('длина',C.gold),wkChip('возраст','#e8a0d8'))+
        wkSml('промежуточное звено можно «выбросить»: вывод останется верным!'));
    } else if(step===3){
      h=wkFrame(wkBig('Весы: X, Y и Z')+
        wkHero(`<svg width="322" height="170" viewBox="0 0 322 170" style="display:block">
          <rect x="4" y="4" width="314" height="162" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="wv-pop"><circle cx="161" cy="34" r="15" fill="rgba(255,255,255,.07)" stroke="#cbb89a" stroke-width="2.4"/>
            <line x1="161" y1="49" x2="161" y2="74" stroke="#cbb89a" stroke-width="2.4"/>
            <line x1="70" y1="76" x2="252" y2="76" stroke="#cbb89a" stroke-width="4"/>
            <line x1="70" y1="76" x2="70" y2="98" stroke="#cbb89a" stroke-width="4"/>
            <line x1="252" y1="76" x2="252" y2="98" stroke="#cbb89a" stroke-width="4"/>
            <rect x="42" y="98" width="56" height="42" rx="10" fill="rgba(127,209,255,.1)" stroke="${C.blue}" stroke-width="2.2"/>
            <text x="70" y="124" text-anchor="middle" font-size="20" fill="${C.blue}" font-weight="bold" font-family="Georgia,serif">X</text>
            <rect x="224" y="98" width="56" height="42" rx="10" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.2"/>
            <text x="252" y="124" text-anchor="middle" font-size="20" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">Z</text>
            <text x="161" y="80" text-anchor="middle" font-size="12" fill="#9ec0a8">X легче Y · Y легче Z</text>
          </g>
          <rect x="86" y="132" width="150" height="26" rx="13" fill="rgba(143,209,168,.1)" stroke="${C.green}"/>
          <text x="161" y="150" text-anchor="middle" font-size="14" fill="${C.green}" font-weight="bold">X < Y < Z</text>
        </svg>`)+
        wkAns('тяжелее всех Z, легче всех X',C.green)+
        wkSml('стрелка всегда указывает от лёгкого к тяжёлому — идём по ней до конца'));
    } else if(step===4){
      h=wkFrame(wkBig('Цепочка одной строкой')+
        wkHero(towers([{e:'🐺',t:'Волк',h:108,c:'#7f9bb8'},{e:'🦊',t:'Лиса',h:76,c:'#e08a4a'},{e:'🐰',t:'Заяц',h:46,c:'#c9a06a'}],{base:118}))+
        wkRow(wkChip('первый — выше всех',C.gold),wkChip('последний — ниже всех',C.green))+
        wkSml('кто в цепочке первый — самый высокий; кто последний — самый низкий'));
    } else if(step===5){
      h=wkFrame(wkBig('Четыре зверя по росту')+
        wkHero(towers([{e:'🐻',t:'Медведь',h:122,c:'#b98a5a'},{e:'🐺',t:'Волк',h:94,c:'#7f9bb8'},{e:'🦊',t:'Лиса',h:68,c:'#e08a4a'},{e:'🐰',t:'Заяц',h:42,c:'#c9a06a'}],{base:140,colW:56,gap:8}))+
        chain24([{e:'🐻',t:'Медведь'},{e:'🐺',t:'Волк'},{e:'🦊',t:'Лиса'},{e:'🐰',t:'Заяц'}])+
        wkSml('длинная цепочка работает так же, как короткая: звено за звеном'));
    } else if(step===6){
      if(st.mode==null) st.mode=0;
      h=wkFrame(wkBig('Данных не хватает?')+
        wkHero(st.mode===0
          ? towers([{e:'🦊',t:'Лиса',h:76,c:'#e08a4a'},{e:'🐰',t:'Заяц',h:46,c:'#c9a06a'}],{base:96,colW:60})
          : towers([{e:'🐺',t:'Волк',h:108,c:'#7f9bb8'},{e:'🦊',t:'Лиса',h:76,c:'#e08a4a'},{e:'🐰',t:'Заяц',h:46,c:'#c9a06a'}],{base:118}))+
        wkRow(wkPill('Лиса > Заяц',C.gold),wkPill('Волк > Заяц',C.blue))+
        (st.mode===0
          ? `<div class="wk-ans" style="color:#ffcfc2">кто выше: Лиса или Волк? пока не знаем!</div>
             ${wkRow(wkBtn('➕ добавить: Волк выше Лисы',`visW24Act('${lk}','w')`))}`
          : `${wkAns('теперь ясно: Волк выше Лисы, оба выше Зайца!',C.green)}
             ${wkRow(wkBtn('↺ сброс',`visW24Act('${lk}','rst')`))}`)+
        wkSml('если данных не хватает — отвечай только на то, что следует из цепочки'));
    } else if(step===7){
      h=wkFrame(wkBig('Тест из учебника 📝')+testUI(lk,st)+
        wkSml('это вопросы из учебника: собери цепочку — и ответ найдётся сам'));
    } else {
      h=wkFrame(wkBig('Проверь себя')+
        wkHero(`<svg width="322" height="120" viewBox="0 0 322 120" style="display:block">
          ${[['X','легче','#7fd1ff',22],['Y','средний','#8fd1a8',124],['Z','тяжелее','#ffd76a',226]].map((b,i)=>`
            <g class="wv-pop" style="animation-delay:${(i*0.16).toFixed(2)}s">
              <rect x="${b[3]}" y="18" width="70" height="64" rx="13" fill="rgba(255,255,255,.05)" stroke="${b[2]}" stroke-width="2.4"/>
              <text x="${b[3]+35}" y="52" text-anchor="middle" font-size="26" fill="${b[2]}" font-weight="bold" font-family="Georgia,serif">${b[0]}</text>
              <text x="${b[3]+35}" y="72" text-anchor="middle" font-size="11" fill="#9ec0a8">${b[1]}</text>
            </g>`).join('')}
          <text x="96" y="58" font-size="22" fill="${C.red}" font-weight="bold"><</text>
          <text x="198" y="58" font-size="22" fill="${C.red}" font-weight="bold"><</text>
        </svg>`)+
        wkRow(wkPill('X < Y < Z',C.gold))+
        wkAns('тяжелее всех — Z! Готов к проверке?',C.green)+
        wkSml('жми «Понял! Проверю себя» — там вопрос про X, Y и Z'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[24]=visW24;
  function visW24T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW24T=visW24T;
  function visW24Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='w') st.mode=1;
    if(act==='rst') CHS[lk]={};
    if(act==='nq'){ st.q=1; st.sel=null; }
    chRender(0);
  }
  window.visW24Act=visW24Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===24){ window.ARH_LESSONS[i]=L24; break; } } })();
})();

/* ================= УРОК 45 · НОД и НОК (v2) ================= */
(function(){
  const L45 = {
    id: 45, title: 'НОД и НОК', ico: '🔗',
    src: 'Математика · 6 класс · Делимость: НОД и НОК', subj: 'math',
    explain: [
      'Мастерская Архимеда: два задания. Первое — застелить пол 24 на 36 одинаковыми квадратными плитками, самыми большими из возможных. Второе — два автобуса: один приезжает на остановку каждые 4 минуты, другой каждые 6. Когда они снова встретятся? Для таких задач нужны два инструмента — НОД и НОК.',
      'НОД — наибольший общий делитель: самое большое число, на которое делятся оба числа. Выпишем делители 12: 1, 2, 3, 4, 6, 12. Делители 18: 1, 2, 3, 6, 9, 18. Общие делители: 1, 2, 3, 6. Наибольший из них — 6. Значит, НОД(12, 18) = 6.',
      'Как искать НОД перебором? Шаг 1 — выпиши все делители каждого числа. Шаг 2 — найди общие. Шаг 3 — возьми наибольший. Для 24 и 36: общие делители 1, 2, 3, 4, 6, 12, наибольший — 12. НОД(24, 36) = 12. Это и есть сторона самой большой квадратной плитки!',
      'НОК — наименьшее общее кратное: самое маленькое число, которое делится на оба числа. Кратные 6: 6, 12, 18, 24, 30… Кратные 8: 8, 16, 24, 32… Первое общее — 24. Значит, НОК(6, 8) = 24.',
      'Вернёмся к автобусам: один приезжает каждые 4 минуты — 4, 8, 12, 16… Другой каждые 6 — 6, 12, 18… Впервые они встретятся через 12 минут. НОК(4, 6) = 12. НОК отвечает на вопрос «когда снова совпадёт».',
      'Быстрый способ — разложение на простые множители. 24 = 2 · 2 · 2 · 3 = 2³ · 3, а 36 = 2 · 2 · 3 · 3 = 2² · 3². НОД берёт общие множители с наименьшей степенью: 2² · 3 = 12. НОК берёт все множители с наибольшей степенью: 2³ · 3² = 72.',
      'Красивая связь: НОД(24, 36) · НОК(24, 36) = 12 · 72 = 864, и 24 · 36 = 864 тоже! Произведение НОД и НОК двух чисел равно произведению самих чисел. Удобная проверка для любого ответа.',
      'Тест из учебника: найди НОД чисел 24 и 36 (подсказка: общие делители 1, 2, 3, 4, 6, 12) и НОК чисел 4 и 6 (подсказка: кратные 4 — 4, 8, 12…). Попробуй ответить в виджете ниже!',
      'Проверь себя: НОД(12, 18) = ? Делители 12 и 18 мы уже выписывали — общие 1, 2, 3, 6, наибольший 6. Вперёд, к проверке!'
    ],
    check: { q: 'Найди НОД чисел 12 и 18.', choices: ['3', '6', '9', '36'], ans: 1,
      exp: 'Общие делители 1,2,3,6 — наибольший 6.' },
    tasks: [
      { q: 'Найди НОД чисел 24 и 36.', kind: 'unit', ans: 12, tol: 0,
        hints: ['24 = 2³·3, 36 = 2²·3².', 'Общее: 2²·3 = 12.'], sol: 'НОД(24,36) = 12.' },
      { q: 'Найди НОК чисел 4 и 6.', kind: 'unit', ans: 12, tol: 0,
        hints: ['Кратные 4: 4,8,12…', 'Кратные 6: 6,12…', 'Первое общее — 12.'], sol: 'НОК(4,6) = 12.' }
    ]
  };
  const C={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',dim:'#8fa08f',cream:'#e8dcc8',red:'#ff8a7a'};
  const divs=(n)=>Array.from({length:n},(_,i)=>i+1).filter(d=>n%d===0);
  function divRow(n,color,label){
    const ds=divs(n);
    const cells=ds.map((d,i)=>`<span class="wv-pop" style="animation-delay:${(i*0.06).toFixed(2)}s;display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:28px;margin:2px;border-radius:8px;background:rgba(255,255,255,.05);border:1.5px solid ${color};font-size:14px;color:#e8dcc8;font-family:Georgia,serif">${d}</span>`).join('');
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:2px"><span style="font-size:12px;color:${color}">${label}</span><div style="display:flex;flex-wrap:wrap;justify-content:center;max-width:190px">${cells}</div></div>`;
  }
  function lane45(a,upTo,color,cy,mark){
    let s='';
    const span=270, x0=44;
    for(let m=1;a*m<=upTo;m++){
      const x=x0+(a*m)*(span/upTo);
      const isMark=mark.indexOf(a*m)>=0;
      s+=`<circle cx="${x.toFixed(1)}" cy="${cy}" r="${isMark?9.5:7.5}" fill="${isMark?'rgba(217,164,65,.22)':'rgba(255,255,255,.06)'}" stroke="${isMark?C.gold:color}" stroke-width="${isMark?2.6:2}"/>`;
      if(isMark) s+=`<text x="${x.toFixed(1)}" y="${cy-14}" text-anchor="middle" font-size="12" fill="${C.gold}" font-weight="bold">${a*m}</text>`;
    }
    s+=`<text x="12" y="${cy+4}" font-size="14" fill="${color}" font-weight="bold">${a}:</text>`;
    s+=`<text x="20" y="${cy+4}" font-size="14" fill="#5b6b58"> </text>`;
    return s;
  }
  function ladder45(n,cx,color,top){
    const steps=[]; let x=n;
    for(let d=2;d<=x;d++){
      while(x%d===0){ steps.push([x,d]); x/=d; }
    }
    let s='';
    steps.forEach((st,i)=>{
      const y=top+i*30;
      s+=`<g class="wv-pop" style="animation-delay:${(i*0.12).toFixed(2)}s">
        <rect x="${cx-66}" y="${y-16}" width="132" height="26" rx="9" fill="rgba(255,255,255,.04)" stroke="${color}" stroke-width="1.6"/>
        <text x="${cx-42}" y="${y+1}" text-anchor="middle" font-size="15" fill="#fff" font-family="Georgia,serif" font-weight="bold">${st[0]}</text>
        <text x="${cx-8}" y="${y+1}" text-anchor="middle" font-size="13" fill="#ffd76a">÷${st[1]}</text>
        <text x="${cx+34}" y="${y+1}" text-anchor="middle" font-size="15" fill="${color}" font-weight="bold" font-family="Georgia,serif">${st[0]/st[1]}</text>
      </g>`;
    });
    return s;
  }
  const Q45=[
    {q:'Найди НОД чисел 24 и 36.',opts:['6','12','18','24'],ans:1},
    {q:'Найди НОК чисел 4 и 6.',opts:['8','12','24','4'],ans:1}
  ];
  function testUI(lk,st){
    const T=Q45[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.05)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.2)':'rgba(232,106,90,.2)'; bd=i===T.ans?C.green:C.red; tc=i===T.ans?C.green:C.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:58px;font-size:17px" onclick="visW45T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1? '<div class="wk-ans" style="color:#8fd1a8">🎉 верно! Оба теста решены!</div>' : '<div class="wk-ans" style="color:#8fd1a8">✅ верно! НОД найден!</div>')
        : '<div class="wk-ans" style="color:#ff8a7a">❌ не так. Выпиши делители/кратные и найди общее.</div>';
    }
    const next = st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий вопрос →',`visW45Act('${lk}','nq')`):'';
    const rst = wkBtn('↺ заново',`visW45Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row">${opts}</div>${msg}<div class="wk-row">${next}${rst}</div>`;
  }
  function visW45(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      h=wkFrame(wkBig('Мастерская Архимеда 🔧')+
        wkHero(`<svg width="322" height="140" viewBox="0 0 322 140" style="display:block">
          <g class="wv-pop"><rect x="8" y="10" width="148" height="122" rx="15" fill="rgba(127,209,255,.05)" stroke="${C.blue}" stroke-width="2"/>
            <text x="82" y="32" text-anchor="middle" font-size="12.5" fill="#9fc5e8">задание 1 · плитка</text>
            <rect x="20" y="44" width="52" height="40" rx="7" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="1.4"/>
            <text x="46" y="68" text-anchor="middle" font-size="13" fill="#9ec0a8">?</text>
            <rect x="80" y="44" width="52" height="40" rx="7" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="1.4"/>
            <text x="106" y="68" text-anchor="middle" font-size="13" fill="#9ec0a8">?</text>
            <rect x="20" y="92" width="52" height="32" rx="7" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="1.4"/>
            <rect x="80" y="92" width="52" height="32" rx="7" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="1.4"/>
            <text x="82" y="126" text-anchor="middle" font-size="11.5" fill="${C.blue}">пол 24 × 36</text></g>
          <g class="wv-pop2"><rect x="166" y="10" width="148" height="122" rx="15" fill="rgba(217,164,65,.05)" stroke="${C.gold}" stroke-width="2"/>
            <text x="240" y="32" text-anchor="middle" font-size="12.5" fill="#d9c088">задание 2 · автобусы</text>
            <circle cx="240" cy="80" r="34" fill="none" stroke="#3d5c49" stroke-width="3"/>
            <text x="240" y="86" text-anchor="middle" font-size="15" fill="#cfe0cf">4 и 6</text>
            <text x="240" y="112" text-anchor="middle" font-size="10.5" fill="#9ec0a8">минут</text>
            <text x="240" y="128" text-anchor="middle" font-size="11" fill="${C.gold}">когда встретятся?</text></g>
        </svg>`)+
        wkRow(wkChip('НОД — режет на равные части',C.blue),wkChip('НОК — ищет совпадение',C.gold))+
        wkSml('два инструмента на два вопроса: «какой самый большой общий кусок?» и «когда снова совпадёт?»'));
    } else if(step===1){
      h=wkFrame(wkBig('НОД(12, 18) = ?')+
        wkRow(divRow(12,C.blue,'делители 12'),divRow(18,C.green,'делители 18'))+
        wkHero(`<svg width="322" height="96" viewBox="0 0 322 96" style="display:block">
          <circle cx="112" cy="50" r="42" fill="rgba(127,209,255,.07)" stroke="${C.blue}" stroke-width="1.8"/>
          <circle cx="210" cy="50" r="42" fill="rgba(143,209,168,.07)" stroke="${C.green}" stroke-width="1.8"/>
          <text x="161" y="46" text-anchor="middle" font-size="12" fill="#cfe0cf">общие</text>
          <text x="161" y="64" text-anchor="middle" font-size="13" fill="${C.gold}" font-weight="bold">1, 2, 3, 6</text>
          <text x="70" y="22" text-anchor="middle" font-size="11" fill="${C.blue}">4, 12</text>
          <text x="252" y="22" text-anchor="middle" font-size="11" fill="${C.green}">9, 18</text>
        </svg>`)+
        wkAns('НОД(12, 18) = 6 — самый большой общий делитель',C.green)+
        wkSml('общие делители 1, 2, 3, 6 — берём наибольший'));
    } else if(step===2){
      h=wkFrame(wkBig('Перебор: НОД(24, 36)')+
        wkRow(divRow(24,C.blue,'делители 24'),divRow(36,C.green,'делители 36'))+
        wkHero(`<svg width="322" height="86" viewBox="0 0 322 86" style="display:block">
          <rect x="6" y="6" width="310" height="74" rx="15" fill="rgba(217,164,65,.06)" stroke="${C.gold}" stroke-width="1.8"/>
          <text x="161" y="32" text-anchor="middle" font-size="13.5" fill="#d9c088">делители → общие → наибольший</text>
          <text x="161" y="58" text-anchor="middle" font-size="17" fill="#fff" font-weight="bold" font-family="Georgia,serif">общие: 1, 2, 3, 4, 6, 12 → НОД = <tspan fill="${C.gold}">12</tspan></text>
        </svg>`)+
        wkAns('сторона самой большой плитки — 12!',C.green)+
        wkSml('перебор всегда работает: делители → общие → наибольший'));
    } else if(step===3){
      h=wkFrame(wkBig('НОК: когда числа «встретятся»')+
        wkHero(`<svg width="322" height="108" viewBox="0 0 322 108" style="display:block">
          <rect x="4" y="4" width="314" height="100" rx="15" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          ${lane45(6,24,C.blue,28,[24])}
          ${lane45(8,24,C.green,62,[24])}
          <rect x="76" y="80" width="170" height="20" rx="10" fill="rgba(217,164,65,.12)" stroke="${C.gold}"/>
          <text x="161" y="94" text-anchor="middle" font-size="12.5" fill="${C.gold}" font-weight="bold">первое общее — 24!</text>
        </svg>`)+
        wkRow(wkPill('НОК(6, 8) = 24',C.gold))+
        wkSml('НОК — наименьшее общее кратное: первое число, кратное обоим'));
    } else if(step===4){
      h=wkFrame(wkBig('Автобусы: 4 и 6 минут 🚌')+
        wkHero(`<svg width="322" height="104" viewBox="0 0 322 104" style="display:block">
          <rect x="4" y="4" width="314" height="96" rx="15" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          ${lane45(4,12,C.blue,28,[12])}
          ${lane45(6,12,C.green,62,[12])}
          <circle cx="240" cy="45" r="16" fill="rgba(255,255,255,.06)" stroke="#3d5c49"/>
          <text x="240" y="50" text-anchor="middle" font-size="11" fill="#9ec0a8">🚌</text>
        </svg>`)+
        wkRow(wkPill('НОК(4, 6) = 12',C.gold))+
        wkAns('встретятся через 12 минут!',C.green)+
        wkSml('наименьшее общее кратное — ответ на вопрос «когда снова совпадёт»'));
    } else if(step===5){
      h=wkFrame(wkBig('Разложение на простые')+
        wkHero(`<svg width="322" height="216" viewBox="0 0 322 216" style="display:block">
          <text x="92" y="20" text-anchor="middle" font-size="13" fill="${C.blue}" font-weight="bold">24 = 2³ · 3</text>
          ${ladder45(24,92,C.blue,32)}
          <text x="230" y="20" text-anchor="middle" font-size="13" fill="${C.green}" font-weight="bold">36 = 2² · 3²</text>
          ${ladder45(36,230,C.green,32)}
        </svg>`)+
        wkRow(wkPill('НОД: общие, меньшая степень 2²·3 = 12',C.green),wkPill('НОК: все, большая степень 2³·3² = 72',C.gold))+
        wkSml('общие множители — в НОД, все множители — в НОК'));
    } else if(step===6){
      h=wkFrame(wkBig('Волшебная связь')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="4" y="4" width="314" height="142" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="wv-pop"><rect x="20" y="24" width="88" height="52" rx="12" fill="rgba(143,209,168,.1)" stroke="${C.green}" stroke-width="2"/>
            <text x="64" y="46" text-anchor="middle" font-size="11" fill="#9ec0a8">НОД(24,36)</text>
            <text x="64" y="68" text-anchor="middle" font-size="20" fill="${C.green}" font-weight="bold" font-family="Georgia,serif">12</text></g>
          <text x="114" y="60" font-size="20" fill="#8fa08f">·</text>
          <g class="wv-pop2"><rect x="126" y="24" width="88" height="52" rx="12" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2"/>
            <text x="170" y="46" text-anchor="middle" font-size="11" fill="#d9c088">НОК(24,36)</text>
            <text x="170" y="68" text-anchor="middle" font-size="20" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">72</text></g>
          <text x="220" y="60" font-size="20" fill="#8fa08f">=</text>
          <g class="wv-pop3"><rect x="232" y="24" width="76" height="52" rx="12" fill="rgba(255,255,255,.06)" stroke="#5a6f7f" stroke-width="2"/>
            <text x="270" y="46" text-anchor="middle" font-size="11" fill="#9ec0a8">24 · 36</text>
            <text x="270" y="68" text-anchor="middle" font-size="19" fill="#fff" font-weight="bold" font-family="Georgia,serif">864</text></g>
          <rect x="46" y="96" width="230" height="40" rx="20" fill="rgba(255,255,255,.04)" stroke="#3d5c49"/>
          <text x="161" y="121" text-anchor="middle" font-size="14.5" fill="#ffd76a" font-weight="bold">НОД · НОК = a · b (12·72 = 24·36)</text>
        </svg>`)+
        wkSml('перемножь НОД и НОК — получишь произведение самих чисел. Удобная проверка!'));
    } else if(step===7){
      h=wkFrame(wkBig('Тест из учебника 📝')+testUI(lk,st)+
        wkSml('вопросы из учебника 6 класса: НОД — перебором делителей, НОК — по кратным'));
    } else {
      h=wkFrame(wkBig('Применения и проверка')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="4" y="4" width="314" height="142" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="wv-pop"><rect x="14" y="16" width="142" height="56" rx="12" fill="rgba(127,209,255,.07)" stroke="${C.blue}" stroke-width="2"/>
            <text x="85" y="38" text-anchor="middle" font-size="12" fill="#9fc5e8">плитка: пол 24×36</text>
            <text x="85" y="62" text-anchor="middle" font-size="15" fill="${C.blue}" font-weight="bold">12×12 → 6 шт</text></g>
          <g class="wv-pop2"><rect x="166" y="16" width="142" height="56" rx="12" fill="rgba(127,209,160,.07)" stroke="${C.green}" stroke-width="2"/>
            <text x="237" y="38" text-anchor="middle" font-size="12" fill="#9ec0a8">дроби: 18/24</text>
            <text x="237" y="62" text-anchor="middle" font-size="15" fill="${C.green}" font-weight="bold">:6 → 3/4</text></g>
          <g class="wv-pop3"><rect x="34" y="86" width="254" height="50" rx="13" fill="rgba(217,164,65,.08)" stroke="${C.gold}" stroke-width="2"/>
            <text x="161" y="108" text-anchor="middle" font-size="12.5" fill="#d9c088">общий знаменатель: 1/4 + 1/6</text>
            <text x="161" y="128" text-anchor="middle" font-size="14.5" fill="${C.gold}" font-weight="bold">НОК(4,6)=12 → 3/12 + 2/12 = 5/12</text></g>
        </svg>`)+
        wkRow(wkPill('НОД(12, 18) = ?',C.green))+
        wkSml('готов? жми «Понял! Проверю себя» — там НОД чисел 12 и 18'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[45]=visW45;
  function visW45T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW45T=visW45T;
  function visW45Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW45Act=visW45Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===45){ window.ARH_LESSONS[i]=L45; break; } } })();
})();
