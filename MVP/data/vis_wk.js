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

/* ================= УРОК 24 · Цепочки сравнений ================= */
(function(){
  const L24 = {
    id: 24, title: 'Цепочки сравнений', ico: '📏',
    src: 'Логика · транзитивность · кто выше/тяжелее всех', subj: 'math',
    explain: [
      'Лесная линейка Архимеда: Лиса выше Зайца, а Волк выше Лисы. Можно ли узнать, кто выше всех, не измеряя? Можно! Сравнения складываются в цепочку: если Лиса выше Зайца, а Волк выше Лисы, то Волк выше и Зайца тоже.',
      'Строим цепочку: запиши условия друг за другом — Лиса > Заяц и Волк > Лиса. Соединяем звенья: Волк > Лиса > Заяц. Сразу виден порядок: выше всех тот, кто стоит в цепочке первым, — Волк!',
      'Это свойство называют транзитивностью: если A > B и B > C, то A > C. Оно работает для роста, массы, длины, возраста — для любых сравнений «больше/меньше». Промежуточное звено можно «выбросить»!',
      'Весы работают так же: X легче Y, а Y легче Z. Значит, X < Y < Z — тяжелее всех Z, а легче всех X. Стрелка сравнения всегда указывает от более лёгкого к более тяжёлому.',
      'Пиши всю цепочку одной строкой: Волк > Лиса > Заяц. Кто первый — самый высокий, кто последний — самый низкий. Порядок звеньев — это готовый ответ на вопрос «кто выше/ниже всех».',
      'Четыре зверя: Медведь выше Волка, Волк выше Лисы, Лиса выше Зайца. Соединяем: Медведь > Волк > Лиса > Заяц. Медведь — самый высокий, Заяц — самый низкий. Длинная цепочка работает так же, как короткая!',
      'А если данных не хватает? Лиса выше Зайца и Волк выше Зайца — кто выше: Лиса или Волк? Неизвестно! Мы знаем только, что оба выше Зайца. Отвечай ровно на то, что следует из цепочки, и не додумывай лишнего.',
      'Сравнивать можно что угодно: Аня старше Бори, Боря старше Васи — старшая Аня. Дорога до школы длиннее дороги до парка, парк — дальше стадиона? Собери звенья — и ответ найдётся сам. Правило одно: звенья должны идти в одну сторону!',
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

  const big=(t)=>`<div class="wv-big" style="font-size:22px">${t}</div>`;
  const sml=(t)=>`<div class="wv-sml" style="max-width:330px">${t}</div>`;
  const chip=(t,c)=>`<span class="wv-chip" style="border-color:${c||'#3d5c49'};color:#e8dcc8;font-size:14px">${t}</span>`;
  const ans=(t,c)=>`<div class="wv-ans" style="font-size:20px;color:${c||'#8fd1a8'};font-weight:bold;font-family:Georgia,serif">${t}</div>`;
  const kv=(t,c)=>`<span style="display:inline-block;padding:3px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-family:Georgia,serif;font-size:19px;color:${c};font-weight:bold;margin:2px">${t}</span>`;

  // «башни» зверей: seq=[{e,t,h,c}]
  function towers(seq,opts){
    const o=opts||{};
    const W=o.w||330, x0=14, bw=54, gap=(W-28-54*seq.length)/Math.max(1,seq.length-1);
    const ground=o.ground||150, top=o.top||8;
    let s='';
    seq.forEach((it,i)=>{
      const x=x0+i*(bw+gap);
      s+=`<rect x="${x}" y="${ground-it.h}" width="${bw}" height="${it.h}" rx="12" fill="rgba(255,255,255,.05)" stroke="${it.c}" stroke-width="2.4"/>`;
      s+=`<text x="${x+bw/2}" y="${ground-it.h-8}" text-anchor="middle" font-size="22">${it.e}</text>`;
      s+=`<text x="${x+bw/2}" y="${ground+16}" text-anchor="middle" font-size="12" fill="${it.c}" font-weight="bold">${it.t}</text>`;
      if(i<seq.length-1){
        s+=`<text x="${x+bw+(gap)/2}" y="${ground-it.h-14}" text-anchor="middle" font-size="22" fill="#8fa08f" font-weight="bold">&gt;</text>`;
      }
    });
    s+=`<line x1="${x0-2}" y1="${ground+4}" x2="${x0+seq.length*bw+(seq.length-1)*gap+4}" y2="${ground+4}" stroke="#3d5c49" stroke-width="2"/>`;
    return `<svg width="${W}" height="${ground+26}" viewBox="0 0 ${W} ${ground+26}" style="display:block;margin:0 auto">${s}</svg>`;
  }
  function chainArrows(items,opts){ // горизонтальные карточки A > B > C
    const o=opts||{};
    const W=o.w||322;
    const n=items.length;
    const cw=Math.min(96,(W-28-(n-1)*34)/n);
    let s='';
    items.forEach((it,i)=>{
      const x=14+i*(cw+34);
      const hl=o.hl&&o.hl.indexOf(i)>=0;
      s+=`<rect x="${x}" y="10" width="${cw}" height="64" rx="13" fill="${hl?'rgba(217,164,65,.12)':'rgba(255,255,255,.05)'}" stroke="${hl?'#ffd76a':'#3d5c49'}" stroke-width="${hl?2.4:1.6}"/>`;
      s+=`<text x="${x+cw/2}" y="36" text-anchor="middle" font-size="20" fill="${hl?'#ffd76a':'#cfe0cf'}" font-weight="bold">${it.a}</text>`;
      s+=`<text x="${x+cw/2}" y="58" text-anchor="middle" font-size="11.5" fill="#9ec0a8">${it.t}</text>`;
      if(i<n-1){
        const ax=x+cw+2;
        s+=`<text x="${ax+15}" y="50" text-anchor="middle" font-size="22" fill="#ff8a7a" font-weight="bold">&gt;</text>`;
        if(o.hlStep&&o.hlStep[i]){ s+=`<circle cx="${ax+15}" cy="18" r="10" fill="#1d3a2c"/><text x="${ax+15}" y="22" text-anchor="middle" font-size="11" fill="#8fd1a8" font-weight="bold">${o.hlStep[i]}</text>`; }
      }
    });
    return `<svg width="${W}" height="86" viewBox="0 0 ${W} 86" style="display:block;margin:0 auto">${s}</svg>`;
  }

  function visW24(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    const btns=(...b)=>`<div class="wv-row" style="margin-top:2px">${b.join('')}</div>`;
    const btn=(t,act)=>`<button class="hint-btn" onclick="visW24Act('${lk}','${act}')">${t}</button>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        ${big('Лесная линейка Архимеда 🐾')}
        ${towers([{e:'🐰',t:'Заяц',h:52,c:'#c9a06a'},{e:'🦊',t:'Лиса',h:82,c:'#e08a4a'},{e:'🐺',t:'Волк',h:116,c:'#7f9bb8'}],{ground:120,top:6})}
        <div class="wv-row">${kv('Лиса > Заяц','#ffd76a')}${kv('Волк > Лиса','#7fd1ff')}</div>
        <div class="wv-pop3 wv-ans" style="color:#ffd76a">кто выше всех — сразу видно после сборки цепочки?</div>
        ${sml('известно только два сравнения — но они уже складываются в ответ. листай!')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${big('Собираем цепочку')}
        <div class="wv-row">
          ${kv('Лиса > Заяц','#ffd76a')}<span class="wv-sml" style="margin:0">+</span>${kv('Волк > Лиса','#7fd1ff')}
        </div>
        ${chainArrows([{a:'Волк',t:'🐺'},{a:'Лиса',t:'🦊'},{a:'Заяц',t:'🐰'}],{hl:[0]})}
        ${ans('Волк > Лиса > Заяц — выше всех Волк!','#8fd1a8')}
        ${sml('сравнения встают в ряд, как звенья цепи: середина соединяет края')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${big('Секрет — транзитивность')}
        ${chainArrows([{a:'A',t:'больше'},{a:'B',t:'середина'},{a:'C',t:'меньше'}],{hlStep:['1','2']})}
        <svg width="300" height="66" viewBox="0 0 300 66" style="display:block;margin:0 auto">
          <rect x="8" y="6" width="284" height="54" rx="13" fill="rgba(143,209,168,.07)" stroke="#8fd1a8" stroke-width="1.8"/>
          <text x="150" y="30" text-anchor="middle" font-size="16" fill="#8fd1a8" font-weight="bold">если A &gt; B и B &gt; C, то A &gt; C</text>
          <text x="150" y="50" text-anchor="middle" font-size="12" fill="#9ec0a8">промежуточное звено можно «выбросить»</text>
        </svg>
        <div class="wv-row">${chip('рост','rgba(127,209,255,.5)')}${chip('масса','rgba(127,209,160,.5)')}${chip('длина','rgba(217,164,65,.5)')}${chip('возраст','rgba(232,160,216,.5)')}</div>
        ${sml('правило работает для любых сравнений «больше/меньше»!')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${big('Весы: X, Y и Z')}
        <svg width="320" height="120" viewBox="0 0 320 120" style="display:block;margin:0 auto">
          <circle cx="160" cy="26" r="14" fill="rgba(255,255,255,.07)" stroke="#cbb89a" stroke-width="2"/>
          <line x1="160" y1="40" x2="160" y2="64" stroke="#cbb89a" stroke-width="2"/>
          <line x1="70" y1="66" x2="250" y2="66" stroke="#cbb89a" stroke-width="3"/>
          <line x1="70" y1="66" x2="70" y2="84" stroke="#cbb89a" stroke-width="3"/>
          <line x1="250" y1="66" x2="250" y2="84" stroke="#cbb89a" stroke-width="3"/>
          <rect x="46" y="84" width="48" height="26" rx="7" fill="rgba(255,255,255,.05)" stroke="#7fd1ff" stroke-width="2"/>
          <text x="70" y="101" text-anchor="middle" font-size="14" fill="#7fd1ff" font-weight="bold">X</text>
          <rect x="226" y="84" width="48" height="26" rx="7" fill="rgba(255,255,255,.05)" stroke="#ffd76a" stroke-width="2"/>
          <text x="250" y="101" text-anchor="middle" font-size="14" fill="#ffd76a" font-weight="bold">Z</text>
          <text x="160" y="112" text-anchor="middle" font-size="11" fill="#8fa08f">X легче Y · Y легче Z</text>
        </svg>
        <div class="wv-row">${kv('X < Y < Z','#ffd76a')}</div>
        ${ans('тяжелее всех — Z, легче всех — X','#8fd1a8')}
        ${sml('стрелка всегда указывает от лёгкого к тяжёлому — идём по ней до конца')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${big('Цепочка одной строкой')}
        ${chainArrows([{a:'Волк',t:'🐺'},{a:'Лиса',t:'🦊'},{a:'Заяц',t:'🐰'}],{hl:[0,2]})}
        <div class="wv-row">
          <span class="wv-chip" style="border-color:#ffd76a;color:#ffd76a">первый — выше всех</span>
          <span class="wv-chip" style="border-color:#8fd1a8;color:#8fd1a8">последний — ниже всех</span>
        </div>
        ${sml('кто в цепочке первый — самый высокий; кто последний — самый низкий')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${big('Четыре зверя по росту')}
        ${towers([{e:'🐻',t:'Медведь',h:128,c:'#b98a5a'},{e:'🐺',t:'Волк',h:96,c:'#7f9bb8'},{e:'🦊',t:'Лиса',h:70,c:'#e08a4a'},{e:'🐰',t:'Заяц',h:46,c:'#c9a06a'}],{ground:150})}
        ${ans('Медведь > Волк > Лиса > Заяц','#8fd1a8')}
        ${sml('длинная цепочка работает так же, как короткая: звено за звеном')}
      </div>`;
    } else if(step===6){
      // данных не хватает — интерактив: добавить условие
      if(st.mode==null) st.mode=0;
      h=`<div class="wv-col">
        ${big('Данных не хватает?')}
        ${towers([{e:'🦊',t:'Лиса',h:70,c:'#e08a4a'},{e:'🐰',t:'Заяц',h:46,c:'#c9a06a'}],{ground:96,top:10})}
        <div class="wv-row">${kv('Лиса > Заяц','#ffd76a')}${kv('Волк > Заяц','#7fd1ff')}</div>
        ${st.mode===0
          ? `<svg width="300" height="54" viewBox="0 0 300 54" style="display:block;margin:0 auto"><rect x="8" y="4" width="284" height="46" rx="12" fill="rgba(232,106,90,.07)" stroke="#b0635a"/><text x="150" y="31" text-anchor="middle" font-size="15" fill="#ffcfc2">кто выше: Лиса или Волк? пока не знаем!</text></svg>
             ${btns(btn('➕ добавить: Волк выше Лисы','w'))}`
          : `<div class="wv-row">${chainArrows([{a:'Волк',t:'🐺'},{a:'Лиса',t:'🦊'},{a:'Заяц',t:'🐰'}],{})}</div>
             ${ans('теперь ясно: Волк выше Лисы и оба выше Зайца!','#8fd1a8')}
             ${btns(btn('↺ сброс','r'))}`}
        ${sml('если данных не хватает — отвечай только на то, что следует из цепочки')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${big('Любые величины — те же звенья')}
        ${chainArrows([{a:'Аня',t:'старше'},{a:'Боря',t:'средний'},{a:'Вася',t:'младше'}],{hl:[0]})}
        <svg width="300" height="58" viewBox="0 0 300 58" style="display:block;margin:0 auto">
          <rect x="8" y="6" width="284" height="46" rx="12" fill="rgba(127,209,255,.06)" stroke="#7fd1ff" stroke-width="1.6"/>
          <text x="150" y="26" text-anchor="middle" font-size="14.5" fill="#cfe0cf">Аня старше Бори · Боря старше Васи</text>
          <text x="150" y="45" text-anchor="middle" font-size="14" fill="#7fd1ff" font-weight="bold">Аня > Боря > Вася → старшая Аня</text>
        </svg>
        <div class="wv-row">${chip('старше/младше','rgba(127,209,255,.5)')}${chip('длиннее/короче','rgba(127,209,160,.5)')}${chip('быстрее/медленнее','rgba(217,164,65,.5)')}</div>
        ${sml('главное — все звенья должны смотреть в одну сторону!')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${big('Проверь себя')}
        ${chainArrows([{a:'X',t:'легче'},{a:'Y',t:'средний'},{a:'Z',t:'тяжелее'}],{})}
        <div class="wv-row">${kv('X легче Y','#7fd1ff')}${kv('Y легче Z','#7fd1ff')}</div>
        <div class="wv-pulse" style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 14px;font-size:18px;color:#ffd76a;font-family:Georgia,serif">кто тяжелее всех?</div>
        ${sml('собери цепочку X < Y < Z — и ответ готов!')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.VISKW[24]=visW24;
  function visW24Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='w') st.mode=1;
    if(act==='r') CHS[lk]={};
    chRender(0);
  }
  window.visW24Act=visW24Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===24){ window.ARH_LESSONS[i]=L24; break; } } })();
})();

/* ================= УРОК 45 · НОД и НОК ================= */
(function(){
  const L45 = {
    id: 45, title: 'НОД и НОК', ico: '🔗',
    src: 'Математика · 6 класс · Делимость: НОД и НОК', subj: 'math',
    explain: [
      'Мастерская Архимеда: два задания. Первое — застелить пол 24×36 квадратной плиткой одного размера, самой большой из возможных. Второе — два автобуса: один приезжает каждые 4 минуты, другой каждые 6 — когда они снова встретятся на остановке? Для таких задач нужны два инструмента: НОД и НОК.',
      'НОД — наибольший общий делитель: самое большое число, на которое делятся оба числа. Делители 12: 1, 2, 3, 4, 6, 12. Делители 18: 1, 2, 3, 6, 9, 18. Общие: 1, 2, 3, 6. Наибольший из общих — 6. Значит, НОД(12, 18) = 6.',
      'Находим НОД перебором: выпиши все делители каждого числа, найди общие и возьми наибольший. Для 24 и 36: общие делители 1, 2, 3, 4, 6, 12 — наибольший 12. НОД(24, 36) = 12. Это и есть сторона самой большой квадратной плитки!',
      'НОК — наименьшее общее кратное: самое маленькое число, которое делится на оба числа. Кратные 6: 6, 12, 18, 24, 30… Кратные 8: 8, 16, 24, 32… Первое общее — 24. Значит, НОК(6, 8) = 24.',
      'Автобусы снова вместе! Один приезжает каждые 4 минуты: 4, 8, 12, 16… Другой — каждые 6: 6, 12, 18… Первый раз они встретятся через 12 минут: НОК(4, 6) = 12. Наименьшее общее кратное отвечает на вопрос «когда совпадёт».',
      'Быстрый способ — разложение на простые множители. 24 = 2 · 2 · 2 · 3 = 2³·3, а 36 = 2 · 2 · 3 · 3 = 2²·3². НОД берёт общие множители с наименьшей степенью: 2²·3 = 12. НОК берёт ВСЕ множители с наибольшей степенью: 2³·3² = 72.',
      'Красивая связь: НОД(24, 36) · НОК(24, 36) = 12 · 72 = 864 — и 24 · 36 = 864! Произведение НОД и НОК двух чисел равно произведению самих чисел. Удобная проверка!',
      'НОД и НОК в деле. Плитка: пол 24 на 36, плитка 12×12 — кладём 2 по ширине и 3 по высоте: ровно 6 плиток! Автобусы: 4 и 6 минут → вместе через НОК(4,6) = 12 минут. Один режет на крупные равные части, другой ищет момент совпадения.',
      'И дроби они чинят! Сократить 18/24: делим верх и низ на НОД(18, 24) = 6 → получаем 3/4. Привести к общему знаменателю 1/4 и 1/6: берём НОК(4, 6) = 12 → 3/12 и 2/12. НОД и НОК — главные помощники дробей!'
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

  const big=(t)=>`<div class="wv-big" style="font-size:22px">${t}</div>`;
  const sml=(t)=>`<div class="wv-sml" style="max-width:330px">${t}</div>`;
  const chip=(t,c)=>`<span class="wv-chip" style="border-color:${c||'#3d5c49'};color:#e8dcc8;font-size:14px">${t}</span>`;
  const ans=(t,c)=>`<div class="wv-ans" style="font-size:20px;color:${c||'#8fd1a8'};font-weight:bold;font-family:Georgia,serif">${t}</div>`;
  const kv=(t,c)=>`<span style="display:inline-block;padding:3px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-family:Georgia,serif;font-size:19px;color:${c};font-weight:bold;margin:2px">${t}</span>`;
  const divs=(n)=>Array.from({length:n},(_,i)=>i+1).filter(d=>n%d===0);
  function divRow(n,color,label){
    const ds=divs(n);
    const cells=ds.map((d,i)=>`<span class="wv-pop" style="animation-delay:${(i*0.07).toFixed(2)}s;display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:30px;margin:2px;border-radius:8px;background:rgba(255,255,255,.05);border:1.5px solid ${color};font-size:15px;color:#e8dcc8;font-family:Georgia,serif">${d}</span>`).join('');
    return `<div style="display:flex;flex-direction:column;align-items:center"><div style="font-size:12px;color:${color};margin-bottom:2px">${label}</div><div style="display:flex;flex-wrap:wrap;justify-content:center;max-width:250px">${cells}</div></div>`;
  }
  function lane(a,upTo,color,cy,mark,uid){
    let s='';
    for(let m=1;a*m<=upTo;m++){
      const x=14+a*m*(288/upTo);
      const isMark=mark.indexOf(a*m)>=0;
      s+=`<circle cx="${x.toFixed(1)}" cy="${cy}" r="${isMark?9:7}" fill="${isMark?'rgba(217,164,65,.25)':'rgba(255,255,255,.06)'}" stroke="${isMark?'#ffd76a':color}" stroke-width="${isMark?2.6:1.8}"/>`;
      if(isMark) s+=`<text x="${x.toFixed(1)}" y="${cy-13}" text-anchor="middle" font-size="11" fill="#ffd76a" font-weight="bold">${a*m}</text>`;
    }
    s+=`<text x="10" y="${cy+4}" font-size="13" fill="${color}" font-weight="bold">${a}·</text>`;
    return s;
  }
  function ladder(n,cx,color,top){
    // лесенка деления на простые
    const steps=[]; let x=n;
    for(let d=2;d*d<=x||x>1;d++){
      while(x%d===0){ steps.push([x,d]); x/=d; }
      if(x===1) break;
    }
    if(x>1&&x!==n) steps.push([x,x]);
    let s='';
    steps.forEach((st,i)=>{
      const y=top+i*30;
      const cur=st[0], d=st[1], nx=cur/d;
      s+=`<rect x="${cx-88}" y="${y-16}" width="176" height="26" rx="9" fill="rgba(255,255,255,.04)" stroke="${color}" stroke-width="1.4"/>`;
      s+=`<text x="${cx-66}" y="${y+1}" text-anchor="middle" font-size="15" fill="#fff" font-family="Georgia,serif">${cur}</text>`;
      s+=`<text x="${cx-30}" y="${y+1}" text-anchor="middle" font-size="13" fill="#ffd76a">÷ ${d}</text>`;
      s+=`<text x="${cx+4}" y="${y+1}" text-anchor="middle" font-size="10" fill="#8fa08f">→</text>`;
      s+=`<text x="${cx+44}" y="${y+1}" text-anchor="middle" font-size="15" fill="${color}" font-weight="bold" font-family="Georgia,serif">${nx}</text>`;
    });
    return s;
  }

  function visW45(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    const btns=(...b)=>`<div class="wv-row" style="margin-top:2px">${b.join('')}</div>`;
    const btn=(t,act)=>`<button class="hint-btn" onclick="visW45Act('${lk}','${act}')">${t}</button>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        ${big('Мастерская Архимеда 🔧')}
        <svg width="320" height="150" viewBox="0 0 320 150" style="display:block;margin:0 auto">
          <rect x="8" y="10" width="146" height="130" rx="13" fill="rgba(127,209,255,.05)" stroke="#7fd1ff" stroke-width="1.8"/>
          <text x="81" y="32" text-anchor="middle" font-size="13" fill="#9fc5e8">задание 1 · плитка</text>
          ${[0,1,2,3,4,5].map(i=>{const r=Math.floor(i/2),c2=i%2; return `<rect x="${26+c2*56}" y="${44+r*40}" width="48" height="32" rx="6" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="1.3"/><text x="${50+c2*56}" y="${63+r*40}" text-anchor="middle" font-size="12" fill="#9ec0a8">?</text>`;}).join('')}
          <text x="81" y="136" text-anchor="middle" font-size="12" fill="#7fd1ff">пол 24 × 36</text>
          <rect x="166" y="10" width="146" height="130" rx="13" fill="rgba(217,164,65,.05)" stroke="#d9a441" stroke-width="1.8"/>
          <text x="239" y="32" text-anchor="middle" font-size="13" fill="#d9c088">задание 2 · автобусы</text>
          <circle cx="239" cy="72" r="26" fill="none" stroke="#ffd76a" stroke-width="5"/>
          <circle cx="239" cy="72" r="14" fill="none" stroke="#ffd76a" stroke-width="2"/>
          <text x="239" y="76" text-anchor="middle" font-size="12" fill="#ffd76a">4</text>
          <circle cx="290" cy="120" r="0" fill="none"/>
          <circle cx="196" cy="114" r="16" fill="none" stroke="#7fd1ff" stroke-width="4"/>
          <text x="196" y="119" text-anchor="middle" font-size="10" fill="#7fd1ff">6</text>
          <text x="239" y="132" text-anchor="middle" font-size="11" fill="#d9c088">4 и 6 минут</text>
        </svg>
        <div class="wv-row">${chip('НОД — режет на равные части','rgba(127,209,255,.5)')}${chip('НОК — ищет совпадение','rgba(217,164,65,.5)')}</div>
        ${sml('два инструмента на два вопроса: «какой самый большой общий кусок?» и «когда снова совпадёт?»')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${big('НОД(12, 18) = ?')}
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
          ${divRow(12,'#7fd1ff','делители 12')}
          ${divRow(18,'#8fd1a8','делители 18')}
        </div>
        <svg width="320" height="86" viewBox="0 0 320 86" style="display:block;margin:0 auto">
          <circle cx="108" cy="46" r="44" fill="rgba(127,209,255,.07)" stroke="#7fd1ff" stroke-width="1.6"/>
          <circle cx="212" cy="46" r="44" fill="rgba(143,209,168,.07)" stroke="#8fd1a8" stroke-width="1.6"/>
          <text x="150" y="40" text-anchor="middle" font-size="12" fill="#cfe0cf">общие</text>
          <text x="150" y="56" text-anchor="middle" font-size="12" fill="#ffd76a" font-weight="bold">1, 2, 3, 6</text>
          <text x="58" y="20" text-anchor="middle" font-size="11" fill="#7fd1ff">4, 12</text>
          <text x="242" y="20" text-anchor="middle" font-size="11" fill="#8fd1a8">9, 18</text>
        </svg>
        ${ans('НОД(12, 18) = 6 — самый большой общий делитель','#8fd1a8')}
        ${sml('общие делители 1, 2, 3, 6 — берём наибольший: 6')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${big('Перебор: НОД(24, 36)')}
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
          ${divRow(24,'#7fd1ff','делители 24')}
          ${divRow(36,'#8fd1a8','делители 36')}
        </div>
        <svg width="320" height="72" viewBox="0 0 320 72" style="display:block;margin:0 auto">
          <rect x="8" y="6" width="304" height="60" rx="13" fill="rgba(217,164,65,.07)" stroke="#d9a441" stroke-width="1.8"/>
          <text x="160" y="30" text-anchor="middle" font-size="14.5" fill="#ffd76a">общие: 1, 2, 3, 4, 6, 12</text>
          <text x="160" y="52" text-anchor="middle" font-size="15" fill="#fff" font-weight="bold" font-family="Georgia,serif">наибольший → НОД(24, 36) = <tspan fill="#ffd76a">12</tspan></text>
        </svg>
        ${ans('сторона самой большой квадратной плитки — 12!','#8fd1a8')}
        ${sml('перебор всегда работает: делители → общие → наибольший')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${big('НОК: когда числа «встретятся»')}
        <svg width="320" height="96" viewBox="0 0 320 96" style="display:block;margin:0 auto">
          <text x="6" y="24" font-size="12" fill="#8fa08f">кратные 6:</text>
          ${lane(6,24,'#7fd1ff',28,[24],'a')}
          <text x="6" y="58" font-size="12" fill="#8fa08f">кратные 8:</text>
          ${lane(8,24,'#8fd1a8',62,[24],'b')}
          <rect x="60" y="70" width="200" height="22" rx="11" fill="rgba(217,164,65,.12)" stroke="#d9a441"/>
          <text x="160" y="85" text-anchor="middle" font-size="13" fill="#ffd76a" font-weight="bold">первое общее — 24!</text>
        </svg>
        <div class="wv-row">${chip('кратные 6: 6, 12, 18, 24…','rgba(127,209,255,.5)')}${chip('кратные 8: 8, 16, 24…','rgba(127,209,160,.5)')}</div>
        ${ans('НОК(6, 8) = 24','#ffd76a')}
        ${sml('НОК — наименьшее общее кратное: первое число, кратное обоим')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${big('Автобусы: 4 и 6 минут 🚌')}
        <svg width="320" height="96" viewBox="0 0 320 96" style="display:block;margin:0 auto">
          <text x="6" y="24" font-size="12" fill="#8fa08f">автобус А (4 мин):</text>
          ${lane(4,12,'#7fd1ff',28,[12],'c')}
          <text x="6" y="58" font-size="12" fill="#8fa08f">автобус Б (6 мин):</text>
          ${lane(6,12,'#8fd1a8',62,[12],'d')}
        </svg>
        <div class="wv-row">${chip('4: 4, 8, 12…','rgba(127,209,255,.5)')}${chip('6: 6, 12…','rgba(127,209,160,.5)')}</div>
        ${ans('встретятся через НОК(4, 6) = 12 минут!','#ffd76a')}
        ${sml('наименьшее общее кратное — ответ на вопрос «когда снова совпадёт»')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${big('Разложение на простые')}
        <svg width="330" height="210" viewBox="0 0 330 210" style="display:block;margin:0 auto">
          <text x="90" y="20" text-anchor="middle" font-size="13" fill="#7fd1ff" font-weight="bold">24 = 2³ · 3</text>
          ${ladder(24,90,'#7fd1ff',34)}
          <text x="240" y="20" text-anchor="middle" font-size="13" fill="#8fd1a8" font-weight="bold">36 = 2² · 3²</text>
          ${ladder(36,240,'#8fd1a8',34)}
        </svg>
        <div class="wv-row">
          <span class="wv-chip" style="border-color:#4c8a5a;color:#8fd1a8">НОД: общие с меньшей степенью 2²·3 = 12</span>
          <span class="wv-chip" style="border-color:#d9a441;color:#ffd76a">НОК: все с большей степенью 2³·3² = 72</span>
        </div>
        ${ans('НОД(24,36)=12 · НОК(24,36)=72','#8fd1a8')}
        ${sml('общие множители — в НОД, все множители — в НОК')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${big('Волшебная связь')}
        <svg width="320" height="130" viewBox="0 0 320 130" style="display:block;margin:0 auto">
          <rect x="8" y="8" width="304" height="114" rx="14" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <rect x="24" y="22" width="88" height="44" rx="10" fill="rgba(143,209,168,.1)" stroke="#8fd1a8"/>
          <text x="68" y="40" text-anchor="middle" font-size="11" fill="#9ec0a8">НОД(24,36)</text>
          <text x="68" y="59" text-anchor="middle" font-size="18" fill="#8fd1a8" font-weight="bold">12</text>
          <text x="118" y="52" font-size="20" fill="#8fa08f">·</text>
          <rect x="128" y="22" width="88" height="44" rx="10" fill="rgba(217,164,65,.1)" stroke="#d9a441"/>
          <text x="172" y="40" text-anchor="middle" font-size="11" fill="#d9c088">НОК(24,36)</text>
          <text x="172" y="59" text-anchor="middle" font-size="18" fill="#ffd76a" font-weight="bold">72</text>
          <text x="222" y="52" font-size="20" fill="#8fa08f">=</text>
          <text x="282" y="52" text-anchor="middle" font-size="17" fill="#fff" font-weight="bold" font-family="Georgia,serif">864</text>
          <text x="160" y="92" text-anchor="middle" font-size="14" fill="#cfe0cf">и 24 · 36 = 864 тоже!</text>
          <text x="160" y="112" text-anchor="middle" font-size="12.5" fill="#ffd76a">НОД · НОК = a · b</text>
        </svg>
        ${sml('перемножь НОД и НОК — получишь произведение самих чисел. удобная проверка!')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${big('НОД и НОК в деле')}
        <svg width="320" height="150" viewBox="0 0 320 150" style="display:block;margin:0 auto">
          <text x="90" y="18" text-anchor="middle" font-size="13" fill="#7fd1ff" font-weight="bold">плитка 12×12 для пола 24×36</text>
          ${[0,1,2,3,4,5].map(i=>{const r=Math.floor(i/2),c2=i%2; return `<rect x="${24+c2*72}" y="${28+r*46}" width="64" height="38" rx="8" fill="rgba(127,209,255,.08)" stroke="#7fd1ff" stroke-width="1.8"/><text x="${56+c2*72}" y="${51+r*46}" text-anchor="middle" font-size="10.5" fill="#7fd1ff">12</text>`;}).join('')}
          <text x="90" y="118" text-anchor="middle" font-size="11.5" fill="#9fc5e8">(24:12)·(36:12) = 2·3 = 6 плиток</text>
          <text x="246" y="18" text-anchor="middle" font-size="13" fill="#d9a441" font-weight="bold">автобусы 4 и 6 мин</text>
          <line x1="180" y1="60" x2="300" y2="60" stroke="#3d5c49" stroke-width="2"/>
          ${[4,8,12].map(m=>`<circle cx="${168+m*11}" cy="60" r="6" fill="rgba(127,209,255,.2)" stroke="#7fd1ff" stroke-width="1.8"/>`).join('')}
          ${[6,12].map(m=>`<circle cx="${168+m*11}" cy="86" r="6" fill="rgba(143,209,168,.2)" stroke="#8fd1a8" stroke-width="1.8"/>`).join('')}
          <circle cx="300" cy="60" r="10" fill="rgba(217,164,65,.25)" stroke="#ffd76a" stroke-width="2.4"/>
          <circle cx="300" cy="86" r="10" fill="rgba(217,164,65,.25)" stroke="#ffd76a" stroke-width="2.4"/>
          <text x="300" y="64" text-anchor="middle" font-size="11" fill="#ffd76a" font-weight="bold">12</text>
          <text x="300" y="90" text-anchor="middle" font-size="11" fill="#ffd76a" font-weight="bold">12</text>
          <text x="240" y="118" text-anchor="middle" font-size="11.5" fill="#d9c088">вместе через 12 минут</text>
        </svg>
        ${sml('НОД нарезает пол на 6 одинаковых плиток, НОК сводит автобусы в 12-ю минуту')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${big('НОД и НОК чинят дроби')}
        <svg width="320" height="120" viewBox="0 0 320 120" style="display:block;margin:0 auto">
          <text x="160" y="16" text-anchor="middle" font-size="13" fill="#8fd1a8" font-weight="bold">сокращаем 18/24 на НОД = 6</text>
          ${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${14+i*19}" y="26" width="16" height="22" rx="3" fill="${i<6?'#e0523d':'rgba(255,255,255,.06)'}" stroke="${i<6?'#8f2f22':'#3d5c49'}" stroke-width="1"/>`).join('')}
          <text x="150" y="66" text-anchor="middle" font-size="13" fill="#cfe0cf">↓</text>
          ${[0,1,2,3].map(i=>`<rect x="${62+i*52}" y="74" width="44" height="30" rx="6" fill="${i<3?'#8fd1a8':'rgba(255,255,255,.06)'}" stroke="${i<3?'#3d7a55':'#3d5c49'}" stroke-width="1.2"/>`).join('')}
          <text x="160" y="93" text-anchor="middle" font-size="10.5" fill="#8fd1a8">3/4</text>
          <text x="160" y="112" text-anchor="middle" font-size="12" fill="#9ec0a8">18:6 = 3 · 24:6 = 4</text>
        </svg>
        <div class="wv-row">${chip('1/4 + 1/6: НОК(4,6)=12 → 3/12 + 2/12','rgba(217,164,65,.5)')}</div>
        ${ans('НОД — сокращать дроби, НОК — общий знаменатель','#ffd76a')}
        ${sml('готов? теперь проверь себя: НОД(12, 18) = ?')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.VISKW[45]=visW45;
  function visW45Act(lk,act){ chRender(0); }
  window.visW45Act=visW45Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===45){ window.ARH_LESSONS[i]=L45; break; } } })();
})();
