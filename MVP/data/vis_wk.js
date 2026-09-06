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
