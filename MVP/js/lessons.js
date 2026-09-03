/* АРХИМЕД MVP · lessons.js — ВсОШ-уроки «объясни → реши» (встроенные) */
'use strict';
let LV = { id:null, step:0, phase:'explain', ch:null, task:0, hints:0, sel:null };
let LX = null; // визуальное состояние виджетов (улитки/голуби/цифры)

function lessonById(id){ return window.ARH_LESSONS.find(L=>L.id===id); }
function lrec(){ DB.lessons=DB.lessons||{}; if(!DB.lessons[LV.id]) DB.lessons[LV.id]={done:false,stars:0,tasks:[]}; return DB.lessons[LV.id]; }

/* ---------- список ---------- */
const SUBJ_META={
  jun:{ico:'🧸', name:'Начальная школа', dsc:'1–4 класс · просто и понятно'},
  math:{ico:'🏛', name:'Математика', dsc:'Сиракузы · логика, числа, комбинаторика'},
  phys:{ico:'🍎', name:'Физика', dsc:'Ньютон · движение, силы, энергия'},
  chem:{ico:'⚗️', name:'Химия', dsc:'Лавуазье · вещества, реакции, растворы'},
  inf:{ico:'💻', name:'Информатика', dsc:'Код, алгоритмы, логика'}};
function subjOf(L){ return (L&&L.subj) || (/Начальная школа/.test(L.src||'')?'jun':/Информатика/.test(L.src||'')?'inf':/физика/i.test(L.src||'')?'phys':'math'); }
function lessonPool(){
  try{
    if(typeof isJunior==='function'&&isJunior()) return window.ARH_LESSONS.filter(L=>subjOf(L)==='jun');
    return window.ARH_LESSONS.filter(L=>subjOf(L)!=='jun');
  }catch(e){ return window.ARH_LESSONS; }
}
let BK={ subj:'all', open:{} };   // фильтр по предмету + раскрытые секции
function lessonRow(L){
  const rec=DB.lessons&&DB.lessons[L.id];
  const done=!!(rec&&rec.done);
  return `<div class="lesson-row ${done?'done':''}" onclick="openLessonView(${L.id})">
    <span class="lr-ico">${L.ico}</span>
    <span class="lr-ti"><span class="lr-tt">${esc(L.title)}</span>
    <span class="lr-td">${esc(L.src)} · ${L.comic? L.comic.length+' кадров': L.explain.length+' шагов'}</span></span>
    <span class="lr-pr">${done?'✅':(rec&&rec.stars? '⭐ '+rec.stars+'/2':'⭐ 0/2')}</span>
  </div>`;
}
function bookSel(){
  try{ if(typeof isJunior==='function'&&isJunior()) return 'jun'; }catch(e){}
  return BK.subj;
}
function renderBookList(){
  const s=document.getElementById('screen');
  const pool=lessonPool();
  const doneAll=pool.filter(L=>DB.lessons&&DB.lessons[L.id]&&DB.lessons[L.id].done).length;
  const totalL=pool.length;
  const junior=typeof isJunior==='function'&&isJunior();
  const order=junior? ['jun'] : ['all','math','phys','chem','inf'];
  const grouped=order.filter(s=>s==='all'||pool.some(L=>subjOf(L)===s)).map(subj=>{
    if(subj==='all') return { subj:'all', meta:{ico:'📚',name:'Все предметы'}, items:pool };
    const meta=SUBJ_META[subj]; return { subj, meta, items:pool.filter(L=>subjOf(L)===subj) };
  }).filter(g=>g.items.length);
  const sel=bookSel();
  // табы-предметы
  const tabs=grouped.map(g=>{
    const on = sel===g.subj;
    const gd=g.items.filter(L=>DB.lessons&&DB.lessons[L.id]&&DB.lessons[L.id].done).length;
    const p=Math.round(gd/g.items.length*100);
    return `<button class="btab ${on?'on':''}" onclick="bookPick('${g.subj}')">
      <span class="bt-ico">${g.meta.ico}</span>
      <span class="bt-name">${g.subj==='all'? 'Все': g.meta.name}</span>
      <span class="bt-bar"><i style="width:${p}%"></i></span>
    </button>`;}).join('');
  // содержимое: для конкретного предмета — шапка + строки уроков; для «Все» — аккордеон секций
  const content = sel!=='all'
    ? (()=>{ const g=grouped.find(x=>x.subj===sel); if(!g) return '';
        const gd=g.items.filter(L=>DB.lessons&&DB.lessons[L.id]&&DB.lessons[L.id].done).length;
        return `<div class="book-subj-head">
            <span class="bsh-ico">${g.meta.ico}</span>
            <span><b>${g.meta.name}</b><br>
            <span class="small" style="color:var(--muted)">${esc(g.meta.dsc)} · ${gd}/${g.items.length} пройдено</span></span>
          </div>${g.items.map(lessonRow).join('')}`; })()
    : grouped.filter(g=>g.subj!=='all').map((g,i)=>{
        const isOpen = BK.open[g.subj]===true || (BK.open[g.subj]===undefined && i===0);
        const gd=g.items.filter(L=>DB.lessons&&DB.lessons[L.id]&&DB.lessons[L.id].done).length;
        return `<div class="book-sec">
          <div class="bs-head" onclick="bookToggle('${g.subj}')">
            <span class="bs-ico">${g.meta.ico}</span>
            <span style="flex:1;text-align:left"><b>${g.meta.name}</b>
              <span class="small" style="color:var(--muted);display:block">${esc(g.meta.dsc)}</span></span>
            <span class="pr2">${gd}/${g.items.length} <i class="caret ${isOpen?'down':''}">▸</i></span>
          </div>
          ${isOpen? g.items.map(lessonRow).join('') : ''}
        </div>`;}).join('');
  s.innerHTML=`<h2>📖 Книга знаний <span class="small">(пройдено ${doneAll}/${totalL})</span></h2>
    <div class="arch"><span class="who">◈ Архимед</span>
      «Сначала я объясню приём — по шагам. Потом проверим, как ты понял, — и только затем дам задачи».</div>
    <div class="btabs">${tabs}</div>
    ${content}`;
  hud();
}
function bookPick(v){ BK.subj=v; renderBookList(); }
function bookToggle(subj){
  BK.open[subj]= !(BK.open[subj]===true);
  renderBookList();
}

/* ---------- экран урока ---------- */
function openLessonView(id){
  const L=lessonById(id); if(!L) return;
  LV={ id, step:0, phase:'explain', ch:null, task:0, hints:0, sel:null };
  LX={ a:1, b:7, c:2, pigeons:null, hour:0, cells:[64,0,0,0,0,0,0] };
  if(L.comic&&typeof COMIC!=='undefined'&&COMIC.open){ COMIC.open(L); return; }
  renderLessonView();
}
function lessonTitle(){ const L=lessonById(LV.id); return `${L.ico} Урок ${L.id} · ${L.title}`; }
/* персонажи комиксов */
const COMIC_CH={
  arch:{ emoji:'🧙‍♂️', name:'Архимед', bg:'rgba(217,164,65,.14)' },
  kid:{ emoji:'🧒', name:'Ты', bg:'rgba(127,209,255,.12)' },
  cat:{ emoji:'🐱', name:'Барсик', bg:'rgba(127,184,160,.14)' },
  fish:{ emoji:'🐟', name:'Рыбка', bg:'rgba(127,209,255,.12)' },
  granny:{ emoji:'👵', name:'Бабушка', bg:'rgba(232,106,90,.12)' },
  coin:{ emoji:'🪙', name:'Монетка', bg:'rgba(217,164,65,.16)' },
  pig:{ emoji:'🐷', name:'Пятачок', bg:'rgba(232,106,90,.12)' }
};
function lessonSteps(L){ return L.comic? L.comic.length : L.explain.length; }
function renderLessonView(){
  const L=lessonById(LV.id);
  const screen=document.getElementById('screen');
  const n=lessonSteps(L);
  const dots=LV.phase==='explain' ? `<div style="display:flex;gap:5px;margin:4px 0 8px">${Array.from({length:n},(_,i)=>
    `<div class="sdot ${i<LV.step?'past':''} ${i===LV.step?'on':''}"></div>`).join('')}</div>` : '';
  let msg='', nav='', phase2='';
  if(LV.phase==='explain'){
    if(L.comic){
      // ===== КОМИКС: кадр с персонажем и пузырём речи =====
      const fr=L.comic[LV.step];
      const ch=COMIC_CH[fr.who]||COMIC_CH.arch;
      msg=`<div class="comic-panel">
        <div class="comic-side" style="background:${ch.bg}">
          <div class="comic-ava">${ch.emoji}</div>
          <div class="comic-name">${ch.name}</div>
        </div>
        <div class="comic-main">
          <div class="comic-speech">${esc(fr.say)}</div>
          ${fr.note?`<div class="comic-note">${esc(fr.note)}</div>`:''}
        </div>
      </div>`;
      nav=`<button class="btn ghost" onclick="lvStep(-1)" ${LV.step===0?'disabled':''}>← Назад</button>`+
          (LV.step>=n-1
            ? `<button class="btn ok2" onclick="lvToCheck()">Понял! Проверю себя →</button>`
            : `<button class="btn" onclick="lvStep(1)">Дальше →</button>`);
    } else {
      msg=`<span class="who">◈ Архимед · шаг ${LV.step+1} из ${n}</span>${esc(L.explain[LV.step])}`;
      nav=`<button class="btn ghost" onclick="lvStep(-1)" ${LV.step===0?'disabled':''}>← Назад</button>`+
          (LV.step>=n-1
            ? `<button class="btn ok2" onclick="lvToCheck()">Понял! Проверю себя →</button>`
            : `<button class="btn" onclick="lvStep(1)">Дальше →</button>`);
    }
  } else if(LV.phase==='check'){
    const c=L.check;
    msg=`<span class="who">◈ Архимед · проверь себя</span>${esc(c.q)}`;
    const fb=LV.ch!==null?(LV.ch===c.ans
      ? `<div class="fb ok" style="margin-top:8px">✅ Точно! ${esc(c.exp)}</div><button class="btn ok2" style="margin-top:8px" onclick="lvToTasks()">К задачам →</button>`
      : `<div class="fb no" style="margin-top:8px">❌ Не так. Подсказка: ${esc(c.exp)}</div>`):'';
    phase2=`<div class="card"><div class="choices">${c.choices.map((x,i)=>`<button class="choice ${LV.ch===i?(i===c.ans?'right':'wrong'):''}" onclick="lvCheck(${i})">${esc(x)}</button>`).join('')}</div>${fb}</div>`;
    nav=`<button class="btn ghost" onclick="lvBackExplain()">← К объяснению</button>`;
  } else if(LV.phase==='tasks'){
    const T=L.tasks[LV.task]; const rec=lrec(); const done=rec.tasks.indexOf(LV.task)>=0;
    msg=`<span class="who">◈ Архимед · реши сам · задача ${LV.task+1} из ${L.tasks.length}</span>${esc(T.q)}`;
    const costs=['бесплатно','5 ⭐','10 ⭐'];
    const hints=`<div class="hints" style="margin-top:8px">${T.hints.map((_,i)=>`<button class="hint-btn" ${LV.hints>i?'disabled':''} onclick="lvHint(${i})">Подсказка ${i+1} · ${costs[i]}</button>`).join('')}</div>`
      +T.hints.filter((_,i)=>LV.hints>i).map(h=>`<div class="hint-box">${esc(h)}</div>`).join('');
    const input = T.kind==='unit'
      ? `<div class="answer-row"><input type="number" id="lvNum" step="any" placeholder="число">
         <button class="btn ok2" onclick="lvNum()" style="margin:0">Ответить</button></div>`
      : `<div class="choices">${T.choices.map((c,i)=>`<button class="choice ${LV.sel===i?'wrong':''}" onclick="lvPick(${i})">${esc(c)}</button>`).join('')}</div>`;
    const fb=done?`<div class="fb ok" style="margin-top:8px">✅ Верно! ${LV.task===L.tasks.length-1?'Урок пройден!':'Следующая задача…'}</div>`:
      LV.sel===-1?`<div class="fb no" style="margin-top:8px">❌ ${esc(T.trap||'Попробуй ещё')}</div>`:'';
    phase2=`<div class="card"><div style="color:#8a94ad;font-size:11px;margin-bottom:6px">задача ${LV.task+1}/${L.tasks.length} · стиль ВсОШ · награда 1 ⭐</div>${input}${hints}${fb}
      ${done?`<button class="btn ok2" style="margin-top:10px" onclick="${LV.task<L.tasks.length-1?'lvNextTask()':'lvFinish()'}">${LV.task<L.tasks.length-1?'Следующая задача →':'Забрать награду ⭐'}</button>`:''}</div>`;
    nav=`<button class="btn ghost" onclick="lvBackExplain()">↺ Перечитать объяснение</button>`;
  } else { // done
    msg=`<span class="who">◈ Архимед</span>Отлично! Приём «${esc(L.title)}» усвоен — он работает на любых похожих задачах ВсОШ.`;
    nav=`<button class="btn ok2" onclick="go('book')">К списку уроков →</button>`;
    phase2=`<div class="card" style="text-align:center"><div style="font-size:30px">🏆</div>
      <div style="font-size:16px;margin:4px 0">Урок пройден!</div><div class="small">+2 ⭐ к прогрессу</div></div>`;
  }
  screen.innerHTML=`<button class="btn ghost" onclick="go('book')">← Книга знаний</button>
    <h2 style="margin:6px 0 2px">${esc(lessonTitle())}</h2>
    <div class="small" style="margin-bottom:6px">${esc(L.src)}</div>${dots}
    <div class="card"><div class="arch" style="margin-top:0">${msg}</div>
      ${LV.phase==='explain'?`<div id="lvis"></div>`:''}</div>
    <div class="btnrow" style="margin-bottom:8px">${nav}</div>${phase2}`;
  if(LV.phase==='explain') renderLessonVis();
  hud();
}
function lvStep(d){ const L=lessonById(LV.id); LV.step=Math.max(0,Math.min(lessonSteps(L)-1,LV.step+d)); renderLessonView(); }
function lvToCheck(){ LV.phase='check'; LV.ch=null; renderLessonView(); }
function lvBackExplain(){ const L=lessonById(LV.id); if(L&&L.comic&&typeof COMIC!=='undefined'&&COMIC.open){ COMIC.open(L); return; } LV.phase='explain'; renderLessonView(); }
function lvCheck(i){ LV.ch=i; renderLessonView(); }
function lvToTasks(){ LV.phase='tasks'; LV.task=0; LV.hints=0; LV.sel=null; renderLessonView(); }
function lvHint(i){ if(LV.hints>i) return; const cost=i===0?0:(i===1?5:10);
  if(cost&&DB.points<cost){ toast('Не хватает ⭐'); return; } DB.points-=cost; LV.hints=i+1; save(); renderLessonView(); }
function lvPick(i){
  const T=lessonById(LV.id).tasks[LV.task]; const rec=lrec();
  if(rec.tasks.indexOf(LV.task)>=0) return;
  if(i===T.ans){ lvWin(); } else { LV.sel=i; renderLessonView(); }
}
function lvNum(){
  const T=lessonById(LV.id).tasks[LV.task]; const rec=lrec();
  if(rec.tasks.indexOf(LV.task)>=0) return;
  const n=parseFloat(document.getElementById('lvNum').value);
  if(isNaN(n)){ toast('Введи число!'); return; }
  if(Math.abs(convert(n,(T.unit)||'')-T.ans)<=T.tol) lvWin(); else { LV.sel=-1; renderLessonView(); }
}
function lvWin(){
  const L=lessonById(LV.id); const rec=lrec();
  if(rec.tasks.indexOf(LV.task)>=0) return;
  rec.tasks.push(LV.task); rec.stars=(rec.stars||0)+1;
  DB.points+=Math.max(8,18-LV.hints*5);
  save();
  if(rec.tasks.length>=L.tasks.length){ rec.done=true; save(); }
  renderLessonView();
}
function lvNextTask(){ LV.task++; LV.hints=0; LV.sel=null; renderLessonView(); }
function lvFinish(){ lrec().done=true; save(); LV.phase='done'; showConfetti(); renderLessonView(); }

/* ---------- виджеты-визуализации ---------- */
/* ---------- visMath: иллюстрации для всех уроков математики ---------- */
function visMath(el){
  try{
    const L=lessonById(LV.id); if(!L){ el.innerHTML=''; return; }
    const all=((L.explain||[]).join(' ')+' '+(L.check&&L.check.q||'')+' '+L.title).toLowerCase();
    const raw=(L.check&&L.check.q||'');
    const nums=(raw.match(/\d+(?:[.,]\d+)?/g)||[]).map(x=>parseFloat(x.replace(',','.')));
    const a=nums[0], b=nums[1], c=nums[2];
    const has=(...ws)=>ws.some(w=>all.includes(w));
    const dots=(n,c)=>n>0?Array.from({length:Math.min(n,60)},()=>`<span style="color:${c||'var(--amber)'};font-size:17px;line-height:1">●</span>`).join(''):'<span class="small">—</span>';
    const card=(inner)=>`<div style="display:flex;flex-direction:column;align-items:center;gap:8px">${inner}</div>`;
    const big=(t)=>`<div style="font-size:20px;color:var(--amber);font-family:Georgia,serif">${t}</div>`;
    let h='';
    if(has('сложение до 100','вычитание до 100','столбиком')){ h=card(`<div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;justify-content:center">${dots(a||40,'#7fb8a0')}<span style="color:#cbb89a;font-size:22px">${a||'?'} ${has('вычитание')?'−':'+'} ${b||'?'}</span>${dots(b||40,'#c96f4a')}</div>`+big(`${has('вычитание')?(a-(b||0)):(a+(b||0))}`)); }
    else if(has('таблиц умножен','умножение','умнож','на 2','на 3','на 5','на 10','парами')){
      const cols=Math.min(b||3,8), rows=Math.min(a||3,6);
      let g='';
      for(let r=0;r<rows;r++){ for(let col=0;col<cols;col++) g+='<span style="color:#7fd1ff;font-size:15px">●</span>'; g+='<br>'; }
      h=card(`<div style="text-align:center;line-height:1.1">${g}</div>`+big(`${a||'?'} · ${b||'?'} = ${(a||0)*(b||0)}`));
    }
    else if(has('куб числа','кубов')){ const n=a||2; let lay=''; for(let i=0;i<Math.min(n,5);i++) lay+=dots(n,'#c96f4a')+'<br>';
      h=card(`<div style="text-align:center;line-height:1.15">${lay}</div>`+big(`${n}³ = ${n*n*n}`)); }
    else if(has('квадрат числа','квадраты')){ const n=a||5; let g=''; for(let r=0;r<Math.min(n,9);r++){for(let k=0;k<Math.min(n,9);k++) g+='<span style="color:#7fb8a0;font-size:13px">▣</span>'; g+='<br>';}
      h=card(`<div style="text-align:center;line-height:1.05">${g}</div>`+big(`${n}² = ${n*n}`)); }
    else if(has('дроб','дол','часть числа','половина','четверть','треть')){
      const den=Math.min(b||a||4,10), num=Math.min(a||1,den);
      let cells='';
      for(let i=0;i<den;i++) cells+=`<div style="width:26px;height:26px;border:2px solid #33291e;background:${i<num?'#f0c75e':'#efe6d0'};border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:13px">${i<num?'✓':''}</div>`;
      h=card(`<div style="display:flex;gap:3px;flex-wrap:wrap;justify-content:center">${cells}</div>`+big(`${num}/${den}`));
    }
    else if(has('процент','скидк','%')){ const pct=(a||b||20); const val=has('от')?(c||a||40):(b||a||40);
      h=card(`<div style="width:230px;height:20px;border:2px solid #33291e;border-radius:10px;overflow:hidden"><i style="display:block;height:100%;width:${Math.min(100,pct)}%;background:linear-gradient(90deg,#c96f4a,var(--brass))"></i></div>`+big(`${pct}%`)+`<div class="small" style="color:#cbb89a">часть выделена цветом</div>`); }
    else if(has('уравнени')){ h=card(big(`x ${a!=null&&b!=null?'+ '+b:''} = ${c!=null?c:(a||0)+(b||0)}`)+`<div style="font-size:30px">⚖️</div>`+`<div class="small" style="color:#cbb89a">весы в равновесии: найдём x</div>`); }
    else if(has('отрицательн','модул','координат','прямой')){ let line='';
      for(let i=-6;i<=6;i++) line+=`<div style="width:26px;text-align:center;font-size:11px;color:${i===0?'var(--amber)':'#cbb89a'}">${i}</div>`;
      h=card(`<div style="display:flex;justify-content:center">${line}</div><div style="font-size:15px;color:#cbb89a">← меньше · больше →</div>`); }
    else if(has('средн')){ const vals=[a||5,b||7,c||9]; const sum=vals.reduce((x,y)=>x+y,0); const avg=sum/vals.length;
      const bars=vals.map(v=>`<div style="display:flex;flex-direction:column;align-items:center;gap:2px"><div style="height:${v*7}px;width:26px;background:#7fb8a0;border-radius:4px"></div><span style="font-size:11px;color:#cbb89a">${v}</span></div>`).join('');
      h=card(`<div style="display:flex;gap:8px;align-items:flex-end">${bars}</div>`+big(`среднее = ${avg}`)); }
    else if(has('пропорц','отношен','разделить в отношен')){ const pa=a||2,pb=b||3,total=c||a+b||5;
      h=card(`<div style="width:230px;height:22px;border:2px solid #33291e;border-radius:6px;overflow:hidden;display:flex"><i style="width:${pa/(pa+pb)*100}%;background:#7fb8a0"></i><i style="flex:1;background:#c96f4a"></i></div>`+big(`${pa} : ${pb}`)); }
    else if(has('площадь','периметр')){ const ww=a||6, hh=b||4;
      h=card(`<svg viewBox="0 0 200 130" style="max-width:100%;display:block;margin:0 auto"><rect x="25" y="20" width="${150}" height="${75}" fill="#7fb8a0" stroke="#33291e" stroke-width="2.5"/><text x="25" y="14" font-size="12" fill="#cbb89a">${ww}</text><text x="${185}" y="${55}" font-size="12" fill="#cbb89a">${hh}</text><text x="100" y="${120}" text-anchor="middle" font-size="14" fill="var(--amber)">S = ${ww}·${hh} = ${ww*hh}</text></svg>`); }
    else if(has('объём','объем')){ const x=a||2,y=b||3,z=c||4;
      h=card(big(`${x} · ${y} · ${z} = ${x*y*z}`)+`<div style="font-size:40px">📦</div><div class="small" style="color:#cbb89a">длина × ширина × высота</div>`); }
    else if(has('угол','треугольник')){ const a1=a||40,b1=b||60,c1=c||(180-a-b||80);
      h=card(`<svg viewBox="0 0 220 150" style="max-width:100%"><polygon points="20,130 200,130 110,20" fill="#7fb8a0" stroke="#33291e" stroke-width="2.5"/><text x="30" y="150" font-size="13" fill="#cbb89a">${a1}°</text><text x="190" y="150" font-size="13" fill="#cbb89a">${b1}°</text><text x="100" y="16" font-size="13" fill="#cbb89a">${c1}°</text></svg>`+`<div class="small" style="color:#cbb89a">сумма = 180°</div>`); }
    else if(has('окружност','круг')){ const r=a||4;
      h=card(`<svg viewBox="0 0 180 140" style="max-width:100%"><circle cx="90" cy="70" r="${Math.min(55,r*13)}" fill="#7fb8a0" stroke="#33291e" stroke-width="2.5"/><line x1="90" y1="70" x2="${90+Math.min(55,r*13)}" y2="70" stroke="#c96f4a" stroke-width="2"/><text x="${100+Math.min(55,r*13)}" y="64" font-size="12" fill="#cbb89a">r=${r}</text></svg>`+big(`C ≈ 2·3·${r} = ${6*r}`)); }
    else if(has('пифагор')){ const ka=a||3,kb=b||4, kc=c||(Math.round(Math.sqrt(ka*ka+kb*kb)));
      h=card(`<svg viewBox="0 0 200 150" style="max-width:100%"><polygon points="20,130 130,130 20,40" fill="#7fb8a0" stroke="#33291e" stroke-width="2"/><text x="20" y="150" font-size="12" fill="#cbb89a">${ka}</text><text x="135" y="120" font-size="12" fill="#cbb89a">${kb}</text><text x="8" y="60" font-size="12" fill="#cbb89a">${kc}</text></svg>`+big(`${ka}²+${kb}² = ${kc}²`)); }
    else if(has('корн','квадратным корн')){ const rn=Math.round(Math.sqrt(a||b||49)); const v=(rn||7)*(rn||7);
      h=card(`<div style="text-align:center">${dots(Math.min(v,60),'#7fb8a0')}</div>`+big(`√${v} = ${rn}`)); }
    else if(has('вариант','перестанов','способ','комбинац')){ const nn=a||3;
      h=card(big(`${nn}!`)+`<div style="font-size:30px">🌳</div>`+`<div class="small" style="color:#cbb89a">вариантов: ${nn} · … · 1</div>`); }
    else if(has('делимост','нод','нок','остатк','делится','кратн')){
      h=card(`<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">${dots(a||12,'#7fb8a0')}</div>`+`<div class="small" style="color:#cbb89a">делим на группы — смотрим остатки</div>`); }
    else {
      // общая карточка: формула/правило крупно
      const first=(L.explain&&L.explain[0])||L.title||'';
      h=card(`<div style="font-size:26px">🧮</div>`+big(L.title||'')+`<div class="small" style="color:#cbb89a;text-align:center;max-width:280px">${esc(first).slice(0,120)}…</div>`);
    }
    el.innerHTML=`<div style="background:rgba(16,31,24,.75);border:1px solid #3d5c49;border-radius:12px;padding:10px;margin-top:10px">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}


function visIsMath(){
  try{ const L=lessonById(LV.id); if(!L) return false;
    return L.subj==='math' || (L.subj==='jun' && !L.comic);
  }catch(e){ return false; }
}


function visMathNew(el){
  try{
    const L=lessonById(LV.id); if(!L){ el.innerHTML=''; return; }
    const all=((L.explain||[]).join(' ')+' '+(L.check&&L.check.q||'')+' '+L.title).toLowerCase();
    const raw=(L.check&&L.check.q||'');
    const nums=(raw.match(/\d+(?:[.,]\d+)?/g)||[]).map(x=>parseFloat(x.replace(',','.')));
    const a=nums[0], b=nums[1], c=nums[2];
    const has=(...ws)=>ws.some(w=>all.includes(w));
    const dots=(n,col)=>n>0?Array.from({length:Math.min(n,72)},()=>`<span style="color:${col||'var(--amber)'};font-size:16px;line-height:1">●</span>`).join(''):'<span class="small">—</span>';
    const card=(inner)=>`<div class="wv-col" style="gap:9px">${inner}</div>`;
    const big=(t)=>`<div class="wv-big">${t}</div>`;
    let h='';
    if(has('окружност','длина окружности','площадь круга','круга радиуса')){
      const r=Math.max(a||b||4,1); const rp=Math.min(50, r*11);
      h=card(`<svg viewBox="0 0 200 140" style="max-width:100%;display:block;margin:0 auto"><circle cx="100" cy="70" r="${rp}" fill="#7fb8a0" stroke="#33291e" stroke-width="2.5"/><line x1="100" y1="70" x2="${100+rp}" y2="70" stroke="#c96f4a" stroke-width="2.5"/><circle cx="100" cy="70" r="3" fill="#c96f4a"/><text x="${100+rp+4}" y="66" font-size="13" fill="#cbb89a">r=${r}</text></svg>`
        + (has('окружност','длина окружности')? big(`C = 2·π·${r} ≈ ${6*r}`) : big(`S = π·${r}² ≈ ${3*r*r}`)));
    }
    else if(has('пифагор')){ const ka=a||3,kb=b||4,kc=c||(Math.round(Math.sqrt(ka*ka+kb*kb)));
      h=card(`<svg viewBox="0 0 210 150" style="max-width:100%"><polygon points="20,135 140,135 20,30" fill="#7fb8a0" stroke="#33291e" stroke-width="2.5"/><text x="14" y="152" font-size="13" fill="#cbb89a">${ka}</text><text x="145" y="120" font-size="13" fill="#cbb89a">${kb}</text><text x="6" y="55" font-size="13" fill="#cbb89a">${kc}</text></svg>`+big(`${ka}² + ${kb}² = ${kc}²`));
    }
    else if(has('параллелепипед','объём','объем')){ const x=Math.max(a||2,1),y=Math.max(b||3,1),z=Math.max(c||4,1);
      let layers=''; for(let k=0;k<Math.min(z,4);k++){ layers+=`<div style="display:flex;gap:2px;justify-content:center">${Array.from({length:Math.min(x,10)},()=>'<span style="font-size:13px">🧊</span>').join('')}</div>`; }
      h=card(layers+big(`${x}·${y}·${z} = ${x*y*z}`)+`<div class="small" style="color:#cbb89a">слоёв ${z} по ${x}×${y}</div>`);
    }
    else if(has('квадратные уравнения','квадратн')){
      const na=a||1, nb=b||-5, nc=c||6;
      h=card(`<div style="font-size:34px">🪞</div>`+big(`x² ${nb<0?'−':'+'} ${Math.abs(nb)}x ${nc<0?'−':'+'} ${Math.abs(nc)} = 0`)+`<div class="small" style="color:#cbb89a">два корня — парабола пересекает ось</div>`);
    }
    else if(has('квадратного корн','квадратн. корн','корн')){ const v=Math.round(a||b||49), rn=Math.round(Math.sqrt(v));
      h=card(`<div style="text-align:center;line-height:1.15">${Array.from({length:Math.min(rn,10)},()=>Array.from({length:Math.min(rn,10)},()=>'<span style="font-size:13px">▣</span>').join('')+'<br>').join('')}</div>`+big(`√${v} = ${rn}`));
    }
    else if(has('угол','треугольник')){ const a1=a||40,b1=b||60,c1=c||80;
      h=card(`<svg viewBox="0 0 220 150" style="max-width:100%"><polygon points="25,135 200,135 112,25" fill="#7fb8a0" stroke="#33291e" stroke-width="2.5"/><text x="30" y="152" font-size="13" fill="#cbb89a">${a1}°</text><text x="196" y="152" font-size="13" fill="#cbb89a">${b1}°</text><text x="104" y="20" font-size="13" fill="#cbb89a">${c1}°</text></svg>`+`<div class="small" style="color:#cbb89a">${a1}+${b1}+${c1} = 180°</div>`);
    }
    else if(has('квадрат числа')||has('квадраты')){ const n=Math.max(a||5,1);
      let g=''; for(let r=0;r<Math.min(n,8);r++){ for(let k=0;k<Math.min(n,8);k++) g+='<span style="color:#7fb8a0;font-size:13px">▣</span>'; g+='<br>'; }
      h=card(`<div style="text-align:center;line-height:1.06">${g}</div>`+big(`${n}² = ${n*n}`));
    }
    else if(has('куб числа','кубов')){ const n=Math.max(a||2,1);
      let g=''; for(let k=0;k<Math.min(n,4);k++){ g+=Array.from({length:Math.min(n,6)},()=>'<span style="font-size:15px">🧊</span>').join('')+'<br>'; }
      h=card(`<div style="text-align:center;line-height:1.15">${g}</div>`+big(`${n}³ = ${n*n*n}`));
    }
    else if(has('площадь')&&has('прямоугольн')){ const ww=a||6,hh=b||4;
      h=card(`<svg viewBox="0 0 200 120" style="max-width:100%;display:block;margin:0 auto"><rect x="25" y="20" width="${150}" height="${75}" fill="#7fb8a0" stroke="#33291e" stroke-width="2.5"/><text x="22" y="15" font-size="13" fill="#cbb89a">${ww}</text><text x="${182}" y="${56}" font-size="13" fill="#cbb89a">${hh}</text><text x="100" y="${112}" text-anchor="middle" font-size="14" fill="var(--amber)">S = ${ww}·${hh} = ${ww*hh}</text></svg>`);
    }
    else if(has('периметр')){ const ww=a||6,hh=b||4;
      h=card(`<svg viewBox="0 0 200 120" style="max-width:100%;display:block;margin:0 auto"><rect x="25" y="20" width="${150}" height="${75}" fill="none" stroke="#f0c75e" stroke-width="3" stroke-dasharray="8 5"/><text x="20" y="15" font-size="13" fill="#cbb89a">${ww}</text><text x="${182}" y="${56}" font-size="13" fill="#cbb89a">${hh}</text><text x="100" y="${112}" text-anchor="middle" font-size="14" fill="var(--amber)">P = 2·(${ww}+${hh}) = ${2*(ww+hh)}</text></svg>`);
    }
    else if(has('дроб','половина','четверть','треть','часть числа','доли')){ const den=Math.max(b||a||4,2); const num=Math.max(a||1,1); const dn=Math.min(den,12);
      let cells=''; for(let i=0;i<dn;i++) cells+=`<div style="width:24px;height:24px;border:2px solid #33291e;background:${i<num?'#f0c75e':'#efe6d0'};border-radius:5px;display:inline-flex;align-items:center;justify-content:center;margin:1px">${i<num?'✓':''}</div>`;
      h=card(`<div style="max-width:300px;display:flex;flex-wrap:wrap;justify-content:center">${cells}</div>`+big(`${num}/${dn}`)+`<div class="small" style="color:#cbb89a">${dn} равных долей, ${num} выделено</div>`);
    }
    else if(has('процент','скидк')||raw.includes('%')){ const pct=Math.max(a||b||20,1), base=c||(has('от')?(b||a||100):100);
      h=card(`<div style="width:230px;height:20px;border:2px solid #33291e;border-radius:10px;overflow:hidden"><i style="display:block;height:100%;width:${Math.min(100,pct)}%;background:linear-gradient(90deg,#c96f4a,var(--brass))"></i></div>`+big(`${pct}%`)+`<div class="small" style="color:#cbb89a">от ${base}</div>`);
    }
    else if(has('уравнени')){ h=card(big(`x ${b!=null?'+ '+b:''} = ${c!=null?c:(a||0)+(b||0)}`)+`<div style="font-size:32px">⚖️</div>`+`<div class="small" style="color:#cbb89a">весы: снимем с обеих чашек одинаковое — найдём x</div>`);
    }
    else if(has('отрицательн','модул','координат')){ let cells=''; for(let i=-6;i<=6;i++) cells+=`<div style="width:24px;font-size:10.5px;color:${i===0?'var(--amber)':'#cbb89a'};text-align:center">${i}</div>`;
      h=card(`<div style="display:flex;justify-content:center">${cells}</div><div class="small" style="color:#cbb89a">← меньше · больше →</div>`);
    }
    else if(has('средн')){ const vs=[a||5,b||7,c||9].filter(v=>v!=null); const sum=vs.reduce((x,y)=>x+y,0), avg=sum/vs.length;
      h=card(`<div style="display:flex;gap:8px;align-items:flex-end;justify-content:center">${vs.map(v=>`<div style="display:flex;flex-direction:column;align-items:center;gap:2px"><div style="height:${v*8}px;width:26px;background:#7fb8a0;border-radius:4px"></div><span style="font-size:11px;color:#cbb89a">${v}</span></div>`).join('')}</div>`+big(`среднее = ${avg}`));
    }
    else if(has('пропорц','отношен')){ const pa=Math.max(a||2,1),pb=Math.max(b||3,1);
      h=card(`<div style="width:230px;height:22px;border:2px solid #33291e;border-radius:6px;overflow:hidden;display:flex"><i style="width:${pa/(pa+pb)*100}%;background:#7fb8a0"></i><i style="flex:1;background:#c96f4a"></i></div>`+big(`${pa} : ${pb}`));
    }
    else if(has('вариант','перестанов','способ','комбинац')){ const n=Math.max(a||3,2);
      h=card(big(`${n}!`)+`<div style="font-size:34px">🌳</div>`+`<div class="small" style="color:#cbb89a">вариантов: ${n}·${n-1}·…·1</div>`);
    }
    else if(has('умнож')||has('таблиц умнож')||has('парами')||/на [235]|на 10/.test(all)){ const rows=Math.max(a||3,1), cols=Math.max(b||3,1);
      let g=''; for(let r=0;r<Math.min(rows,6);r++){ for(let k=0;k<Math.min(cols,8);k++) g+='<span style="color:#7fd1ff;font-size:15px">●</span>'; g+='<br>'; }
      h=card(`<div style="text-align:center;line-height:1.15">${g}</div>`+big(`${rows} · ${cols} = ${rows*cols}`));
    }
    else if(has('сложение','вычитание','счёт','складыв')){ const x=a||3,y=b||4; const op=has('вычитание','отним','минус')?'−':'+'; const res=op==='+'?x+y:x-y;
      h=card(`<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center">${dots(x,'#7fb8a0')}<span style="color:#cbb89a;font-size:24px">${op}</span>${dots(y,'#c96f4a')}</div>`+big(`${x} ${op} ${y} = ${res}`));
    }
    else { const first=(L.explain&&L.explain[0])||''; h=card(`<div style="font-size:30px">🧮</div>`+big(L.title||'')+`<div class="small" style="color:#cbb89a;max-width:290px">${esc(first).slice(0,140)}…</div>`); }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}


var CHS={};
function chRender(lid){ const el=document.getElementById('lvis'); if(!el) return; if(LV.id===10) visL10(el); else if(LV.id===33) visL33(el); else if(visIsChem()) visChemNew(el); else if(visIsPhys()) visPhysNew(el); else if(visIsMath()) visMathNew(el); }
function visChemNew(el){
  try{
    const L=lessonById(LV.id); if(!L){ el.innerHTML=''; return; }
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const all=((L.explain||[]).join(' ')+' '+(L.check&&L.check.q||'')+' '+L.title).toLowerCase();
    const raw=(L.check&&L.check.q||'');
    const nums=(raw.match(/\d+(?:[.,]\d+)?/g)||[]).map(x=>parseFloat(x.replace(',','.')));
    const a=nums[0], b=nums[1], c=nums[2];
    const has=(...ws)=>ws.some(w=>all.includes(w));
    const col=(...ps)=>`<div class="wv-col">${ps.join('')}</div>`;
    const big=(t)=>`<div class="wv-big">${t}</div>`;
    const sml=(t)=>`<div class="wv-sml">${t}</div>`;
    const icon=(e,extra)=>`<div class="wv-ic2 ${extra||''}" style="${extra?'':'line-height:1.2'}">${e}</div>`;
    const btns=(...bs)=>`<div class="wv-row">${bs.join('')}</div>`;
    const btn=(txt,on,extra)=>`<button class="hint-btn" onclick="${on}" ${extra||''}>${txt}</button>`;
    const id=LV.id; const TARGET=12;
    let h='';
    // ============ интерактив по конкретным урокам ============
    if(id===111){
      // пробирка с раствором + признак, который анимируется
      const eff=['💨 газ!','🧊 осадок!','🎨 цвет!','🔥 тепло!'];
      const cur=(st.eff==null?0:st.eff)%eff.length;
      const scene = cur===0 ? `<div style="position:absolute;left:14px;right:14px;bottom:10px;height:44px;background:linear-gradient(#bfe0c8,#8fc7a8);border-radius:4px"></div>
        <span class="wv-bub wv-rise" style="left:30%"></span><span class="wv-bub wv-rise2" style="left:50%"></span><span class="wv-bub wv-rise3" style="left:70%"></span>`
        : cur===1 ? `<div style="position:absolute;left:14px;right:14px;bottom:10px;height:44px;background:linear-gradient(#a8d8f0,#7fb8d8);border-radius:4px"></div>
        <div class="wv-pop" style="position:absolute;left:20%;right:20%;bottom:4px;height:16px;background:#d9c9a8;border-radius:3px"></div>`
        : cur===2 ? `<div class="wv-morph" style="position:absolute;left:14px;right:14px;bottom:10px;height:44px;background:linear-gradient(#e8b4d8,#c96f9f);border-radius:4px"></div>`
        : `<div style="position:absolute;left:14px;right:14px;bottom:10px;height:44px;background:linear-gradient(#ffe9a8,#f0c75e);border-radius:4px"></div><div style="position:absolute;top:-30px;left:50%;transform:translateX(-50%);font-size:34px" class="wv-flick">🔥</div>`;
      h=col(icon('🧪'), big(eff[cur]),
        `<div class="wv-flask" style="width:110px;height:120px;background:linear-gradient(rgba(255,255,255,.06),rgba(255,255,255,.02))">${scene}</div>`+
        btn('🧪 провести опыт', `chReact('${lk}')`)+
        sml('нажми — увидишь один из признаков химической реакции'));
    } else if(id===112){
      const acts=[['Понюхать вещество','danger'],['Попробовать на вкус','danger'],['Плеснуть без перчаток','danger'],['Спросить взрослого','ok']];
      const cur=st.safe==null?-1:st.safe;
      const res = cur<0 ? sml('как поступишь в лаборатории?')
        : big(acts[cur][1]==='ok'?'✅ правильно!':'🚫 опасно — так нельзя!', ) ;
      h=col(icon('🧤'), res,
        btns(...acts.map((x,i)=>btn(x[0], `chSafe('${lk}',${i})`, `style="${cur===i?(x[1]==='ok'?'background:#3d8f4f;animation:wvGlow 1s infinite':'background:#c96f4a;animation:wvShake .5s ease'):''}"`))));
    } else if(id===113){
      const sels=[['Железо','metal'],['Медь','metal'],['Кислород','nonmetal'],['Сера','nonmetal']];
      const cur=st.sel2==null?0:st.sel2; const [nm,kind]=sels[cur]; const lamp=!!st.tok;
      h=col(
        `<div class="wv-cable" style="width:190px">${lamp&&kind==='metal'?'<span class="wv-dot wv-flow" style="left:0"></span><span class="wv-dot wv-flow" style="left:0;animation-delay:.4s"></span>':''}</div>`+
        `<div style="display:flex;align-items:center;gap:12px;justify-content:center">
          <div style="font-size:44px">🔋</div><div style="font-size:30px;color:#cbb89a">⚡</div>
          <div style="font-size:56px" class="${lamp&&kind==='metal'?'wv-glow':''}">${lamp?(kind==='metal'?'💡':'🚫'):'💡'}</div></div>`+
        big(nm)+btns(...sels.map((x,i)=>btn(x[0], `chMetal('${lk}','s',${i})`)))+
        btn('🔌 проверить ток', `chMetal('${lk}','t')`)+
        (lamp? sml(kind==='metal'?'💡 металл проводит ток — цепь замкнута!':'💡 неметалл ток не проводит — лампа не горит') : sml('испытай: проводит ли ток?')));
    } else if(id===117){
      // валентность: центральный атом, партнёры по кругу; двойные связи = 2 линии
      const exs=[
        {cen:'O', frm:'H₂O · вода', bonds:[['H',1],['H',1]], angs:[-52,52]},
        {cen:'C', frm:'CO₂ · углекислый газ', bonds:[['O',2],['O',2]], angs:[0,180]},
        {cen:'N', frm:'NH₃ · аммиак', bonds:[['H',1],['H',1],['H',1]], angs:[-90,30,150]},
        {cen:'Cl', frm:'HCl · хлороводород', bonds:[['H',1]], angs:[0]}
      ];
      const cur=(st.vx==null?0:st.vx)%exs.length; const E=exs[cur];
      const val=E.bonds.reduce((s,[p,k])=>s+k,0);
      const CX=110, CY=92, R=58;
      const lines=[];
      E.bonds.forEach(([par,k],i)=>{
        const a=E.angs[i]*Math.PI/180;
        const x=CX+Math.cos(a)*R, y=CY+Math.sin(a)*R;
        const L=Math.hypot(x-CX,y-CY), ang=Math.atan2(y-CY,x-CX)*180/Math.PI;
        const offs = k===2 ? [-4,4] : [0];
        offs.forEach((off,oi)=>{
          const px = -Math.sin(a)*off, py = Math.cos(a)*off;
          lines.push(`<div class="wv-pop" style="position:absolute;left:${CX+px}px;top:${CY+py}px;width:${L}px;height:3px;transform-origin:27px 50%;transform:rotate(${ang}deg);background:linear-gradient(90deg,#cbb89a,#8a94ad);border-radius:2px;animation-delay:${.22*i+oi*.06+.08}s"></div>`);
        });
        lines.push(`<div class="wv-pop" style="position:absolute;left:${x-20}px;top:${y-20}px;width:40px;height:40px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffe9a8,#c96f4a);border:2px solid #33291e;display:flex;align-items:center;justify-content:center;font-weight:bold;color:#33291e;font-size:18px;animation-delay:${.22*i+.14}s">${par}</div>`);
      });
      h=col(icon('🔗'), big(E.frm),
        `<div style="position:relative;width:220px;height:184px;margin:0 auto">
          <div class="wv-pop" style="position:absolute;left:${CX-29}px;top:${CY-29}px;width:58px;height:58px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffe9a8,#e8b4a0);border:3px solid #33291e;display:flex;align-items:center;justify-content:center;font-weight:bold;color:#33291e;font-size:30px;font-family:Georgia,serif">${E.cen}</div>
          ${lines.join('')}</div>`+
        big(`валентность ${E.cen} = ${val}`)+
        btn('показать ещё пример', `chValEx('${lk}')`)+
        sml('валентность — число связей атома: '+val+' (двойная связь = 2 линии)'));
    } else if(id===123){
      const eqs=[['2H₂ + O₂ → 2H₂O','соединение','A + B → AB'],['CaCO₃ → CaO + CO₂','разложение','AB → A + B'],['Fe + CuSO₄ → FeSO₄ + Cu','замещение','A + BC → AC + B'],['AgNO₃ + NaCl → AgCl↓ + NaNO₃','обмен','AB + CD → AD + CB']];
      const cur=(st.tp==null?0:st.tp)%eqs.length; const [eq,ans,scheme]=eqs[cur];
      const last=st.last;
      h=col(
        `<div class="wv-pop" style="background:rgba(127,209,255,.08);border:1px solid rgba(127,209,255,.3);border-radius:10px;padding:8px 14px;font-size:19px;color:#d8ecff">${eq}</div>`+
        big(scheme)+
        btns(...['соединение','разложение','замещение','обмен'].map(t=>btn(t, `chType('${lk}','${t}')`, `style="${st.msg&&ans===t?(last?'background:#3d8f4f':'background:#c96f4a'):''}"`)))+
        (st.msg? `<div class="wv-big" style="${last?'color:#7fd1a0':'color:#e89a8f'}">${st.msg}</div>` : sml('выбери тип реакции'))+
        btn('следующее уравнение ➜', `chTypeNext('${lk}')`));
    } else if(has('титрован')||(has('кислот')&&has('основан'))||has('лакмус')||has('индикатор')){
      const d=st.drops||0; const done=d>=TARGET;
      const color=d===0?'#f7f0e0':(done?'#ff9fb0':'#e8dff0'); st.drops=d;
      const lev=Math.min(d*3,40);
      h=col(`<div style="display:flex;align-items:flex-end;gap:16px;justify-content:center">
          <div class="wv-flask" style="width:52px;height:150px;background:linear-gradient(#fff,#dde8ff)">
            <div style="position:absolute;bottom:0;left:0;right:0;height:${lev}px;background:#9fc5f5;transition:height .6s"></div>
            <div style="position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:22px" class="wv-pulse">🫗</div>
            ${d>0&&!done?'<div style="position:absolute;top:14px;left:50%;transform:translateX(-50%);width:12px;height:12px;border-radius:50%;background:#7fd1ff;animation:wvDrop .9s ease .1s both"></div>':''}</div>
          <div class="wv-stand" style="width:74px;height:96px;background:${color};transition:background .7s;display:flex;align-items:flex-end;justify-content:center;padding-bottom:10px;font-size:14px;color:#33291e;font-weight:bold">${done?'розовый!':'кислота'}</div></div>`+
        big(`капель щёлочи: ${Math.min(d,TARGET)}`)+
        btns(btn('💧 капля', `chTitr('${lk}',1)`, done?'disabled':''), btn('↺ сброс', `chTitr('${lk}',0)`))+
        sml(done?'нейтрализация: индикатор стал розовым!':'добавляй щёлочь по капле — следи за цветом'));
    } else if(has('молярная масса')||has('mr(')||has('относительн')){
      const parts=st.parts||[]; const M=st.M||0;
      const chips=parts.map(([nm,v],i)=>`<span class="wv-chip wv-pop" style="animation-delay:${i*.08}s">${nm}(${v})</span>`).join(' ');
      h=col(`<div style="display:flex;align-items:center;gap:14px;justify-content:center">
          <div style="font-size:52px" class="wv-swing">⚖️</div>
          <div style="min-width:140px;display:flex;flex-wrap:wrap;gap:4px;justify-content:center">${parts.length?chips:'<span class="wv-sml">— нажми на атом —</span>'}</div></div>`+
        big(`Mr = ${M}`)+
        btns(...[['H',1],['O',16],['C',12],['N',14],['Na',23],['Cl',35]].map(([nm,v])=>btn(`+${nm}`, `chMr('${lk}','${nm}',${v})`)), btn('↺', `chMr('${lk}','',0)`)));
    } else if(has('моль')){ const n=st.n||0;
      const dots=Array.from({length:Math.min(n,14)},()=>`<span class="wv-dot" style="position:static;display:inline-block;margin:2px"></span>`).join('');
      h=col(icon('🧂'), big(`${n} моль`),
        `<div style="max-width:240px;line-height:1.1;min-height:34px">${dots||'<span class="wv-sml">0 частиц</span>'}</div>`+
        btns(btn('+1 моль', `chMol('${lk}',1)`), btn('↺', `chMol('${lk}',0)`))+
        sml('1 моль = 6·10²³ частиц (число Авогадро)'));
    } else if(has('раствор')||has('массовая доля')){
      const salt=(st.salt==null?10:st.salt), water=st.water==null?90:st.water; st.salt=salt; st.water=water;
      const pct=Math.round(salt/(salt+water)*100);
      const grit=Array.from({length:Math.min(Math.ceil(salt/3),26)},()=>`<span style="display:inline-block;width:4px;height:4px;border-radius:50%;background:#fff;margin:1px"></span>`).join('');
      h=col(`<div class="wv-stand" style="width:130px;height:160px;background:linear-gradient(#bcd9f2,#7fb8d8)">
          <div style="position:absolute;top:6px;left:0;right:0;text-align:center;font-size:13px;color:#2a3b52;font-weight:bold">${water} г воды</div>
          <div style="position:absolute;bottom:0;left:0;right:0;height:${Math.max(8,pct*1.4)}px;background:#f4f4ee;transition:height .6s;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;padding:4px">${grit}</div></div>`+
        big(`${salt} г соли · доля ${pct}%`)+
        btns(btn('+10 г', `chSalt('${lk}',10)`), btn('−10 г', `chSalt('${lk}',-10)`), btn('↺', `chSalt('${lk}',0)`))+
        sml('массовая доля = соль : (соль+вода) · 100%'));
    } else if(has('горен')){ const on=st.fire==null?1:st.fire; st.fire=on;
      h=col(
        `<div style="font-size:64px">${on?'<span class="wv-flick">🔥</span>':'💨'}</div>`+
        big(on?'горит!':'погас…')+
        (on?'<span class="wv-sml" style="color:#d9c9a8">🔥 пламя мерцает — идёт реакция горения</span>':'')+
        btns(btn('🔥 зажечь', `chFire('${lk}',1)`), btn('🧯 потушить', `chFire('${lk}',0)`))+
        sml(on?'нужны горючее, кислород и тепло':'убрали одно условие — огонь погас'));
    } else if(has('кислот')&&has('металл')){ const nz=st.zn||0;
      h=col(
        `<div class="wv-flask" style="width:130px;height:150px;background:linear-gradient(rgba(255,255,255,.06),rgba(255,255,255,.02))">
          <div style="position:absolute;left:10px;right:10px;bottom:8px;height:56px;background:linear-gradient(#d8ecff,#9fc5f5);border-radius:4px"></div>
          ${nz?'<span class="wv-bub wv-rise" style="left:30%"></span><span class="wv-bub wv-rise2" style="left:55%"></span><span class="wv-bub wv-rise3" style="left:72%"></span>':''}
          <div style="position:absolute;bottom:18px;left:50%;transform:translateX(-50%);font-size:30px">${nz?'⚙️':'<span class="wv-sml" style="color:#cbb89a">кислота HCl</span>'}</div></div>`+
        big('Zn + 2HCl → ZnCl₂ + H₂')+
        btn('добавить цинк', `chZn('${lk}',1)`)+
        sml(nz?'выделяется водород — пузырьки газа!':'брось кусочек цинка в кислоту'));
    } else if(has('молекул')||has('атом')||has('формул')||has('символ')||has('вода')||has('воздух')){ const m=st.mol==null?0:st.mol; st.mol=m;
      const mols=Array.from({length:Math.min(m,6)},(_,i)=>`<span class="wv-pop" style="display:inline-block;font-size:40px;animation-delay:${i*.1}s">🧪</span>`).join('');
      h=col(`<div style="min-height:56px;display:flex;gap:6px;justify-content:center;align-items:center">${mols||'<span class="wv-sml">пока нет молекул</span>'}</div>`+
        big(`${m} молекул`)+
        btns(btn('+молекула', `chMol2('${lk}',1)`), btn('↺', `chMol2('${lk}',0)`))+
        sml('молекулы состоят из атомов — считаем их'));
    } else if(has('металл')||has('неметалл')){
      const cur=st.sel3==null?0:st.sel3; const sels=[['Железо','metal','🔩'],['Медь','metal','🪙'],['Сера','nonmetal','🟡'],['Кислород','nonmetal','🎈']]; const [nm,kind,ic]=sels[cur%4];
      h=col(`<div style="font-size:76px" class="${kind==='metal'?'wv-glow':''}">${ic}</div>`+big(nm)+
        btns(...sels.map((x,i)=>btn(x[0], `chMetal('${lk}','s',${i})`)))+
        sml(kind==='metal'?'блестит, проводит ток и тепло':'не блестит, ток не проводит'));
    } else {
      // гарантированный интерактив: листаем объяснения
      const lines=L.explain||[L.title]; const cur=(st.tip==null?0:st.tip)%lines.length;
      h=col(icon('🧪'), `<div class="wv-in" style="font-size:17px;color:#cbb89a;max-width:320px">${esc(lines[cur]).slice(0,180)}</div>`+
        btn('дальше по теме ➜', `chTip('${lk}')`)+
        sml('интересный факт урока'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}

function chReact(lk){ const st=CHS[lk]||(CHS[lk]={}); st.eff=((st.eff==null?0:st.eff)+1); chRender(0); }
function chSafe(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.safe=i; chRender(0); }
function chMetal(lk,kind,i){ const st=CHS[lk]||(CHS[lk]={}); if(kind==='s'){ st.sel2=i; st.sel3=i; st.tok=false; } else { st.tok=!st.tok; } chRender(0); }
function chValEx(lk){ const st=CHS[lk]||(CHS[lk]={}); st.vx=(st.vx==null?0:st.vx)+1; chRender(0); }
function chType(lk,ans){ const st=CHS[lk]||(CHS[lk]={}); const eqs=[['2H₂ + O₂ → 2H₂O','соединение'],['CaCO₃ → CaO + CO₂','разложение'],['Fe + CuSO₄ → FeSO₄ + Cu','замещение'],['AgNO₃ + NaCl → AgCl↓ + NaNO₃','обмен']]; const cur=(st.tp==null?0:st.tp)%eqs.length; const ok=eqs[cur][1]===ans; st.sc=(st.sc||0)+(ok?1:0); st.last=ok; st.msg=ok?'✅ верно!':'❌ это '+eqs[cur][1]; chRender(0); }
function chTypeNext(lk){ const st=CHS[lk]||(CHS[lk]={}); st.tp=(st.tp==null?0:st.tp)+1; st.msg=''; chRender(0); }
function chTip(lk){ const st=CHS[lk]||(CHS[lk]={}); st.tip=(st.tip==null?0:st.tip)+1; chRender(0); }

function lidKey(id){ return 'l'+id; }
function chTitr(lk,d){ const st=CHS[lk]||(CHS[lk]={}); st.drops=d? (st.drops||0)+1 : 0; chRender(0); }
function chVal(lk,nm){ const st=CHS[lk]||(CHS[lk]={}); st.sel=nm; chRender(0); }
function chMr(lk,nm,v){ const st=CHS[lk]||(CHS[lk]={}); if(!v){st.M=0;st.parts=[];} else { st.parts=(st.parts||[]).concat([[nm,v]]); st.M=(st.M||0)+v; } chRender(0); }
function chMol(lk,d){ const st=CHS[lk]||(CHS[lk]={}); st.n=Math.max(0,(st.n||0)+(d?1:-1)); chRender(0); }
function chMol2(lk,d){ const st=CHS[lk]||(CHS[lk]={}); st.mol=Math.max(0,(st.mol||0)+(d?1:-1)); chRender(0); }
function chSalt(lk,d){ const st=CHS[lk]||(CHS[lk]={}); if(d===0){st.salt=10;st.water=90;} else { st.salt=Math.max(0,(st.salt==null?10:st.salt)+d); } chRender(0); }
function chFire(lk,on){ const st=CHS[lk]||(CHS[lk]={}); st.fire=on; chRender(0); }
function chZn(lk,d){ const st=CHS[lk]||(CHS[lk]={}); st.zn=d; chRender(0); }
function visIsChem(){ try{ const L=lessonById(LV.id); return !!L && L.subj==='chem'; }catch(e){ return false; } }


function l10Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  const bump=(k,d,lo)=> st[k]=Math.max(lo||1, Math.round(((st[k]==null?1:st[k])+d)*10)/10);
  switch(act){
    case 'v1+': bump('v1',5); break; case 'v1-': bump('v1',-5); break;
    case 'v2+': bump('v2',5); break; case 'v2-': bump('v2',-5); break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function carSVG(moving, color, w){
  // Седан, строгий вид сбоку, едет ВПРАВО. Пропорции реального авто. moving=true — колёса крутятся.
  const C=color||'#d43a2e';
  const W=w||180, H=Math.round(W*140/320);
  const sp1=moving? 'class="l10-wheel" style="--spin:.6s"':'style="animation:none"';
  const sp2=moving? 'class="l10-wheel" style="--spin:.6s;animation-delay:-.3s"':'style="animation:none"';
  return `<svg width="${W}" height="${H}" viewBox="0 0 320 140" style="display:block">
  <defs>
    <linearGradient id="cb" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ff9d85"/><stop offset=".18" stop-color="${C}"/>
      <stop offset=".5" stop-color="${C}"/><stop offset=".8" stop-color="#8c1f16"/>
      <stop offset="1" stop-color="#3f0a06"/>
    </linearGradient>
    <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f2fbff"/><stop offset=".5" stop-color="#8fc6e6"/>
      <stop offset="1" stop-color="#1c4356"/>
    </linearGradient>
    <radialGradient id="hub" cx=".35" cy=".3" r="1.15">
      <stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#c4cdd5"/>
      <stop offset="1" stop-color="#626d78"/>
    </radialGradient>
  </defs>
  <ellipse cx="166" cy="135" rx="132" ry="5.5" fill="rgba(0,0,0,.55)"/>
  <!-- кузов: нижний силуэт с арками -->
  <path d="M34,118 C24,118 18,112 21,103 C23,97 30,93 42,91
           L58,85 C66,80 76,76 86,74
           L108,70 C120,68 130,67 142,68
           L168,69 C186,70 200,73 212,78
           L232,86 C248,90 262,96 276,102
           C290,108 300,114 298,120
           L120,120 Z" fill="url(#cb)" stroke="rgba(0,0,0,.4)" stroke-width="1.5"/>
  <!-- тёмная нижняя часть (порог) -->
  <path d="M30,118 L120,120 L298,120 L298,126 L30,126 Z" fill="rgba(0,0,0,.32)"/>
  <!-- верхний силуэт: капот/крыша/багажник -->
  <path d="M86,74 C96,66 112,58 132,55
           C150,52 170,52 188,55
           C206,58 220,63 230,70
           L240,78 L238,66 L214,50
           C206,44 194,41 182,40
           C166,39 150,40 140,42
           C126,44 112,48 102,52
           L86,74 Z" fill="${C}"/>
  <!-- блик на крыше/капоте -->
  <path d="M138,47 C156,44 176,45 194,50 L210,58 L176,58 L128,52 Z" fill="rgba(255,255,255,.22)"/>
  <path d="M242,66 L252,72 L248,56 Z" fill="rgba(255,255,255,.14)"/>
  <!-- стёкла -->
  <path d="M108,70 C120,60 140,55 158,54 L186,56 C196,57 204,60 210,64 L232,84 L100,84 Z" fill="url(#cg)"/>
  <!-- рама стёкол -->
  <path d="M120,68 L160,56 L186,58 L216,66 L232,84 L228,86 L98,86 Z" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="2"/>
  <!-- лобовое -->
  <path d="M162,55 C172,55 182,57 190,61 L204,72 L150,72 L152,58 Z" fill="url(#cg)"/>
  <!-- заднее окно -->
  <path d="M112,68 C124,60 140,55 156,55 L152,72 L104,72 Z" fill="url(#cg)" opacity=".97"/>
  <!-- блик на стекле -->
  <path d="M128,62 L152,57 L150,66 L120,68 Z" fill="rgba(255,255,255,.45)"/>
  <path d="M166,58 L184,60 L196,68 L162,68 Z" fill="rgba(255,255,255,.4)"/>
  <!-- стойки B -->
  <path d="M158,55 L162,55 L164,84 L158,84 Z" fill="${C}"/>
  <!-- зеркало -->
  <path d="M208,66 Q220,61 224,67 L218,74 L206,72 Z" fill="${C}" stroke="rgba(0,0,0,.35)"/>
  <!-- линия дверей -->
  <path d="M160,72 L160,102 M118,74 L118,100" stroke="rgba(0,0,0,.2)" stroke-width="1.5" fill="none"/>
  <!-- молдинг хром -->
  <path d="M52,110 L286,110 L286,112.5 L52,112.5 Z" fill="rgba(226,230,235,.75)"/>
  <!-- ручки -->
  <rect x="134" y="78" width="16" height="5" rx="2.5" fill="#260c08"/>
  <!-- фары -->
  <path d="M286,92 L300,98 L296,106 L282,102 Z" fill="#fffbe0"/>
  <path d="M282,102 L296,106 L294,112 L278,108 Z" fill="#ffc46b"/>
  <rect x="284" y="90" width="14" height="5" rx="2" fill="#e8f6ff"/>
  <!-- решётка -->
  <path d="M298,98 L312,104 L312,114 L300,108 Z" fill="#13161a"/>
  <path d="M301,101 L310,105 M300,105 L309,109 M299,109 L308,113" stroke="#7e8a96" stroke-width="1.3"/>
  <!-- задний фонарь -->
  <path d="M22,84 L32,81 L32,92 L22,92 Z" fill="#ff2d1f"/>
  <path d="M32,92 L22,92 L22,101 L34,98 Z" fill="#ff7a6c"/>
  <!-- ЗАДНЕЕ колесо -->
  <g>
    <circle cx="104" cy="118" r="24" fill="#0b0e11"/>
    <circle cx="104" cy="118" r="20" fill="#23272e"/>
    <circle cx="104" cy="118" r="16" fill="none" stroke="#454e58" stroke-width="2.4"/>
    <g ${sp1}>
      <circle cx="104" cy="118" r="12.5" fill="url(#hub)"/>
      <path d="M104,106 L104,130 M92,118 L116,118 M95.5,109.5 L112.5,126.5 M95.5,126.5 L112.5,109.5" stroke="#5c6771" stroke-width="3.4"/>
      <circle cx="104" cy="118" r="4" fill="#343d47"/>
    </g>
  </g>
  <!-- ПЕРЕДНЕЕ колесо -->
  <g>
    <circle cx="258" cy="118" r="24" fill="#0b0e11"/>
    <circle cx="258" cy="118" r="20" fill="#23272e"/>
    <circle cx="258" cy="118" r="16" fill="none" stroke="#454e58" stroke-width="2.4"/>
    <g ${sp2}>
      <circle cx="258" cy="118" r="12.5" fill="url(#hub)"/>
      <path d="M258,106 L258,130 M246,118 L270,118 M249.5,109.5 L266.5,126.5 M249.5,126.5 L266.5,109.5" stroke="#5c6771" stroke-width="3.4"/>
      <circle cx="258" cy="118" r="4" fill="#343d47"/>
    </g>
  </g>
  <!-- арки: затемнение над колёсами -->
  <path d="M80,118 A24,24 0 0 1 128,118 Z" fill="rgba(0,0,0,.34)"/>
  <path d="M234,118 A24,24 0 0 1 282,118 Z" fill="rgba(0,0,0,.34)"/>
  <!-- тень кузова на колёсах -->
  <ellipse cx="160" cy="112" rx="120" ry="4" fill="rgba(0,0,0,.16)"/>
</svg>`;
}

function l10Road(moving, v1, v2, dur, dist, start){
  // «профиль дороги»: асфальт внизу, машина (вид сбоку) стоит НА нём и едет по нему.
  // Километры — придорожные знаки. Никакой разметки «вид сверху».
  const W=300, ASF=30;                 // ширина дороги, высота асфальтовой полосы
  const CARW=86;                       // ширина машины
  const stX=start==null? 8 : start;
  const dx=Math.max(0, dist);
  const sign=(x,lab)=>{ // придорожный знак километра: стойка от асфальта, табличка высоко
    return `<div style="position:absolute;left:${x}px;bottom:${ASF-2}px;transform:translateX(-50%);z-index:2;display:flex;flex-direction:column-reverse;align-items:center">
      <div style="width:2px;height:26px;background:rgba(217,164,65,.5)"></div>
      <div style="background:rgba(11,23,18,.92);border:1px solid rgba(217,164,65,.7);border-radius:6px;padding:2px 7px;font-size:10px;color:#ffe9a8;white-space:nowrap;font-weight:bold">${lab}</div></div>`;
  };
  const dust=moving? '<div class="l10-dust" style="left:6px;bottom:26px"></div><div class="l10-dust" style="left:14px;bottom:24px;animation-delay:.5s"></div>':'';
  return `<div style="position:relative;width:${W}px;height:104px;margin:0 auto;border-radius:14px;overflow:hidden;background:
      linear-gradient(180deg,rgba(16,31,24,.25) 0%,rgba(20,38,30,.55) 60%,rgba(15,28,22,.9) 100%)">
    <!-- линия горизонта/даль -->
    <div style="position:absolute;left:0;right:0;top:${ASF-2}px;height:2px;background:rgba(127,184,160,.18)"></div>
    ${sign(22,'0 км')}${sign(W/2+4,'60 км')}${sign(W-34,'120 км')}
    <!-- машина (стоит на асфальте: низ фото = верх асфальта) -->
    <div style="position:absolute;bottom:${ASF}px;left:${stX}px;z-index:4;animation:wvDrive ${dur||1.6}s cubic-bezier(.45,0,.55,1) both;--dx:${dx}px;line-height:0">
      <div class="${moving?'l10-bob':''}" style="line-height:0">
        <img src="img/car.png?v=77" alt="машина" style="width:${CARW}px;height:auto;display:block">
      </div>
    </div>
    ${dust}
    <!-- асфальт -->
    <div style="position:absolute;left:0;right:0;bottom:0;height:${ASF}px;z-index:1;
      background:linear-gradient(180deg,#4a5159 0%,#33383e 55%,#23272c 100%)"></div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:${ASF}px;z-index:1;opacity:.6;
      background:repeating-linear-gradient(90deg,rgba(255,255,255,.02) 0 3px,transparent 3px 9px)"></div>
    <!-- белая кромка асфальта -->
    <div style="position:absolute;left:0;right:0;bottom:${ASF-2}px;height:2px;background:rgba(232,224,204,.5);z-index:2"></div>
    <!-- тень машины на асфальте -->
    <div style="position:absolute;left:${stX+4}px;bottom:${ASF-3}px;width:${CARW-8}px;height:5px;z-index:3;
      border-radius:50%;background:rgba(0,0,0,.5);filter:blur(2px);animation:wvDrive ${dur||1.6}s cubic-bezier(.45,0,.55,1) both;--dx:${dx}px"></div>
  </div>`;
}

function l33Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  const bump=(k,d,lo)=> st[k]=Math.max(lo||1, Math.round(((st[k]==null?1:st[k])+d)*10)/10);
  switch(act){
    case 'm+': bump('m',1); break; case 'm-': bump('m',-1); break;
    case 'V+': bump('V',1); break; case 'V-': bump('V',-1); break;
    case 'w+': bump('m',5); break; case 'w-': bump('m',-5); break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l33HexColor(hex,amt){
  // amt>0 светлее к белому, amt<0 темнее к чёрному
  try{
    const h=hex.replace('#',''); const n=parseInt(h,16);
    let r=(n>>16)&255,g=(n>>8)&255,b=n&255;
    const t=amt>0?255:0; const a=Math.abs(amt);
    r=Math.round(r+(t-r)*a); g=Math.round(g+(t-g)*a); b=Math.round(b+(t-b)*a);
    return 'rgb('+r+','+g+','+b+')';
  }catch(e){ return hex; }
}
function l33Mat(mat){
  const M={пробка:'#d9a06e',дерево:'#a9713f',лёд:'#8fd0ef',вода:'#4f9fd9',стекло:'#a8cede',железо:'#9aa7b5',сталь:'#9aa7b5',золото:'#e6bf4a'};
  return M[mat]||'#b9b3a6';
}
function l33CubeSvg(mat,w,rho){
  // изометрический векторный кубик с тремя гранями
  const base=l33Mat(mat);
  const W=w||64, H=Math.round(W*112/124);
  return `<svg width="${W}" height="${H}" viewBox="0 0 124 112" style="display:block">
    <polygon points="62,10 116,36 62,62 8,36" fill="${l33HexColor(base,.42)}" stroke="rgba(0,0,0,.35)" stroke-width="1.6"/>
    <polygon points="8,36 62,62 62,108 8,82" fill="${l33HexColor(base,-.45)}" stroke="rgba(0,0,0,.35)" stroke-width="1.6"/>
    <polygon points="62,62 116,36 116,82 62,108" fill="${base}" stroke="rgba(0,0,0,.35)" stroke-width="1.6"/>
    <polygon points="66,14 110,38 110,40 66,17" fill="rgba(255,255,255,.35)"/>
    ${rho!=null?`<text x="62" y="98" text-anchor="middle" font-size="13" font-weight="bold" fill="rgba(255,255,255,.9)">${rho}</text>`:''}
  </svg>`;
}
function l33Bath(items, opts){
  // ванна Архимеда (вид сбоку): вода занимает низ, предметы плавают/тонут
  const o=opts||{};
  const W=o.w||260, H=o.h||170, waterTop=o.waterTop||Math.round(H*.42);
  const bodies=(items||[]).map(it=>{
    const floatY=H-waterTop-20;      // плавающий: погружён на ~1/3 (bottom от низа)
    const botY=8;                     // тонущий: на дне ванны
    const y = it.swim? floatY : botY;
    const w=it.size||64;
    const lbl=it.label!=null?it.label:(it.mat+(it.rho!=null?'  ρ='+it.rho:''));
    return `<div class="wv-pop" style="position:absolute;left:${it.x!=null?it.x:'50%'};transform:translateX(-50%);bottom:${y}px;z-index:3;text-align:center;animation-delay:${it.delay||0}s">
      <div style="font-size:11px;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.85),0 0 2px rgba(0,0,0,.6);font-weight:bold;white-space:nowrap;margin-bottom:2px">${lbl}</div>
      ${l33CubeSvg(it.mat,w)}
    </div>`;
  }).join('');
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:10px 10px 26px 26px;border:3px solid #55463a;background:linear-gradient(180deg,#f6efe2 0%,#e8ddc9 100%);overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,.3)">
    <!-- стенка-стекло -->
    <div style="position:absolute;inset:3px;border-radius:8px 8px 22px 22px;border:2px solid rgba(127,184,160,.25)"></div>
    <!-- вода -->
    <div style="position:absolute;left:8px;right:8px;bottom:8px;height:${H-waterTop-8}px;border-radius:0 0 20px 20px;
      background:linear-gradient(180deg,rgba(122,190,235,.92),rgba(60,130,190,.95) 60%,rgba(35,95,155,.98))"></div>
    <!-- поверхность воды -->
    <div style="position:absolute;left:4px;right:4px;top:${waterTop}px;height:5px;background:rgba(210,240,255,.85);border-radius:50%;filter:blur(1px)"></div>
    ${bodies}
    <!-- ножки ванны -->
    <div style="position:absolute;bottom:-6px;left:18px;width:14px;height:14px;background:#8a6f4d;border-radius:0 0 6px 6px"></div>
    <div style="position:absolute;bottom:-6px;right:18px;width:14px;height:14px;background:#8a6f4d;border-radius:0 0 6px 6px"></div>
  </div>`;
}
function visL33(el){
  // Урок 33 «Плотность»: сюжет «Ванна Архимеда», векторные сцены
  try{
    const L=lessonById(LV.id); if(!L){ el.innerHTML=''; return; }
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    const step=LV.step||0;
    const col=(...ps)=>`<div class="wv-col">${ps.join('')}</div>`;
    const big=(t,ex)=>`<div class="wv-big" ${ex||''}>${t}</div>`;
    const sml=(t)=>`<div class="wv-sml">${t}</div>`;
    const btns=(...bs)=>`<div class="wv-row">${bs.join('')}</div>`;
    const btn=(txt,on,extra)=>`<button class="hint-btn" onclick="${on}" ${extra||''}>${txt}</button>`;
    const chip=(t,c)=>`<span style="display:inline-block;padding:2px 10px;border-radius:9px;background:rgba(127,209,255,.07);border:1px solid ${c||'rgba(127,184,160,.5)'};font-size:15px;color:#d8ecff;margin:2px">${t}</span>`;
    const rowC=(inner)=>`<div style="display:flex;gap:14px;justify-content:center;align-items:flex-end;flex-wrap:wrap;margin:2px 0">${inner}</div>`;
    const item=(mat,rho,w,extra)=>`<div style="text-align:center">${l33CubeSvg(mat,w||52,rho)}${extra||''}</div>`;
    let h='';
    if(step===0){
      // ванна + игрушки рядом: кто утонет?
      h=col(big('Ванна Архимеда: что утонет?'),
        l33Bath([],{h:150,w:250}),
        `<div style="margin-top:6px">${rowC(
          `<div style="text-align:center;width:84px">${l33CubeSvg('железо',44)}<div style="font-size:11px;color:#cbb89a">железо</div></div>`+
          `<div style="text-align:center;width:84px">${l33CubeSvg('дерево',44)}<div style="font-size:11px;color:#cbb89a">дерево</div></div>`+
          `<div style="text-align:center;width:84px">${l33CubeSvg('лёд',44)}<div style="font-size:11px;color:#cbb89a">лёд</div></div>`)}</div>`+
        sml('Архимед бросает их в воду. Что утонет, а что поплывёт?'));
    } else if(step===1){
      h=col(big('Бульк! Железо — на дно'),
        l33Bath([
          {mat:'железо',swim:false,x:'50%',delay:.2,size:64},
          {mat:'пробка',swim:true,x:'22%',delay:.5,size:52},
          {mat:'лёд',swim:true,x:'38%',delay:.7,size:48},
          {mat:'дерево',swim:true,x:'76%',delay:.9,size:56}
        ],{h:170,w:260})+
        big('почему по-разному?')+sml('дело не в размере — дело в плотности вещества'));
    } else if(step===2){
      h=col(big('Что такое плотность'),
        `<div style="font-size:44px;color:var(--brass);font-family:Georgia,serif">ρ = m : V</div>`+
        rowC(
          `<div style="text-align:center">${l33CubeSvg('железо',46)}<div style="font-size:11px;color:#cbb89a">1 см³</div><div style="font-size:14px;color:#ffd9a0">7,8 г</div></div>`+
          `<div style="text-align:center">${l33CubeSvg('дерево',46)}<div style="font-size:11px;color:#cbb89a">1 см³</div><div style="font-size:14px;color:#cbb89a">0,6 г</div></div>`)+
        sml('масса в единице объёма: в одинаковых кубиках разная масса'));
    } else if(step===3){
      h=col(big('Кубики ровно 1 см³'),
        rowC(
          `<div style="text-align:center;width:88px">${l33CubeSvg('пробка',44)}<div style="font-size:11px;color:#7fa88f">пробка</div><div style="font-size:14px;color:#ffd9a0">0,2 г</div></div>`+
          `<div style="text-align:center;width:88px">${l33CubeSvg('дерево',44)}<div style="font-size:11px;color:#7fa88f">дерево</div><div style="font-size:14px;color:#ffd9a0">0,6 г</div></div>`+
          `<div style="text-align:center;width:88px">${l33CubeSvg('лёд',44)}<div style="font-size:11px;color:#7fa88f">лёд</div><div style="font-size:14px;color:#ffd9a0">0,9 г</div></div>`+
          `<div style="text-align:center;width:88px">${l33CubeSvg('железо',44)}<div style="font-size:11px;color:#7fa88f">железо</div><div style="font-size:14px;color:#ffd9a0">7,8 г</div></div>`)+
        sml('один объём — разная масса. вода = 1 г/см³ — эталон'));
    } else if(step===4){
      h=col(big('Сравниваем с водой (ρ воды = 1)'),
        rowC(
          `<div style="text-align:center;padding:6px 14px;border:2px solid #7fd1a0;border-radius:14px;background:rgba(127,209,160,.07)"><div style="font-size:15px">ρ > 1</div><div style="font-size:26px">⬇</div><b style="font-size:15px">тонет</b><div class="wv-sml" style="font-size:11px">железо 7,8</div></div>`+
          `<div style="text-align:center;padding:6px 14px;border:2px solid #7fd1ff;border-radius:14px;background:rgba(127,209,255,.07)"><div style="font-size:15px">ρ < 1</div><div style="font-size:26px">⬆</div><b style="font-size:15px">плавает</b><div class="wv-sml" style="font-size:11px">пробка 0,2</div></div>`)+
        sml('тяжелее воды → тонет · легче воды → всплывает'));
    } else if(step===5){
      h=col(big('Проверяем игрушки Архимеда'),
        l33Bath([
          {mat:'железо',swim:false,x:'30%',delay:.1,size:56},
          {mat:'пробка',swim:true,x:'72%',delay:.6,size:52}
        ],{h:150,w:240})+
        sml('железо 7,8 > 1 — на дне. пробка 0,2 < 1 — плавает ✓'));
    } else if(step===6){
      h=col(big('Разбираем задачку'),
        `<div class="wv-row" style="margin:2px 0">${chip('V = 3 см³','rgba(127,184,160,.5)')} ${chip('m = 6 г','rgba(232,106,90,.5)')}</div>`+
        rowC(item('дерево',null,46,`<div style="font-size:12px;color:#cbb89a">брусок</div>`))+
        `<div style="font-size:19px;margin:2px 0" class="wv-pop">ρ = m : V = 6 : 3</div>`+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">ρ = 2 г/см³ ✓</div>`+
        sml('2 > 1 — брусок утонул бы, как железный якорь'));
    } else if(step===7){
      h=col(big('Находим массу'),
        `<div class="wv-row">${chip('ρ = 2 г/см³','rgba(127,184,160,.5)')} ${chip('V = 5 см³','rgba(127,209,255,.5)')}</div>`+
        `<div style="font-size:20px;margin:4px 0" class="wv-pop">m = ρ · V = 2 · 5</div>`+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">m = 10 г</div>`+
        sml('масса = плотность × объём'));
    } else if(step===8){
      h=col(big('Находим объём'),
        `<div class="wv-row">${chip('m = 12 г','rgba(232,106,90,.5)')} ${chip('ρ = 3 г/см³','rgba(127,184,160,.5)')}</div>`+
        `<div style="font-size:20px;margin:4px 0" class="wv-pop">V = m : ρ = 12 : 3</div>`+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">V = 4 см³</div>`+
        sml('объём = масса : плотность'));
    } else if(step===9){
      h=col(big('Треугольник-помощник'),
        `<div style="position:relative;width:190px;height:160px;margin:4px auto">
          <div style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:0;height:0;border-left:88px solid transparent;border-right:88px solid transparent;border-bottom:140px solid rgba(217,164,65,.17)"></div>
          <div style="position:absolute;top:36px;left:50%;transform:translateX(-50%);font-size:30px;font-weight:bold;color:var(--brass);font-family:Georgia,serif">m</div>
          <div style="position:absolute;bottom:26px;left:50%;transform:translateX(-50%);width:120px;border-top:2px dashed rgba(232,224,204,.45)"></div>
          <div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);display:flex;gap:22px;font-size:26px;font-weight:bold;color:#d8ecff;font-family:Georgia,serif"><span>ρ</span><span>V</span></div>
        </div>`+
        sml('закрой неизвестное пальцем: m = ρ·V · ρ = m:V · V = m:ρ'));
    } else if(step===10){
      // стальной корабль
      h=col(big('А корабль-то плавает!'),
        l33Bath([],{h:150,w:250})+
        `<div style="position:absolute;left:50%;transform:translateX(-50%);bottom:${150-52}px;font-size:44px" class="wv-pulse">🚢</div>`+
        big('сталь тяжелее воды — но внутри воздух!')+
        sml('средняя плотность корабля (металл + воздух) < 1 → плавает'));
    } else if(step===11){
      // тренажёр
      if(st.m==null) st.m=6; if(st.V==null) st.V=3;
      const rho=Math.round(st.m/st.V*100)/100; const swim=rho<=1;
      const mat = rho>4.5?'железо': rho>1?'дерево':'пробка';
      h=col(big('Тренажёр-ванна: крути и смотри'),
        `<div class="wv-row">${chip('m = '+st.m+' г','rgba(232,106,90,.5)')} ${chip('V = '+st.V+' см³','rgba(127,184,160,.5)')}</div>`+
        l33Bath([{mat:swim?'пробка':'железо',swim:swim,x:'50%',size:72}],{h:170,w:230,waterTop:70})+
        `<div style="font-size:22px" class="wv-ans">ρ = ${st.m} : ${st.V} = ${rho} г/см³</div>`+
        btns(btn('+1 г',`l33Act('${lk}','m+')`),btn('−1 г',`l33Act('${lk}','m-')`),btn('+1 см³',`l33Act('${lk}','V+')`),btn('−1 см³',`l33Act('${lk}','V-')`),btn('↺',`l33Act('${lk}','r')`))+
        sml(rho>1?'ρ > 1 — предмет тяжелее воды и тонет':'ρ ≤ 1 — предмет плавает. Вопрос дальше: 6 г и 3 см³ → 2 г/см³'));
    } else {
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:320px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.7">
          ✅ <b>ρ = m : V</b> — плотность = масса : объём.<br>
          💧 Сравнивай с водой: <b>ρ = 1 г/см³</b>.<br>
          ⬇ ρ &gt; 1 — тонет · ⬆ ρ &lt; 1 — плавает.<br>
          🚢 Корабль плавает, потому что внутри воздух.<br>
          🔁 m = ρ·V · V = m:ρ.</div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там брусок 3 см³ и 6 г'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}
function visL10(el){
  // Урок 10 «Средняя скорость»: полный пошаговый разбор с анимацией
  try{
    const L=lessonById(LV.id); if(!L){ el.innerHTML=''; return; }
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    const step=LV.step||0;
    const col=(...ps)=>`<div class="wv-col">${ps.join('')}</div>`;
    const big=(t,extra)=>`<div class="wv-big" ${extra||''}>${t}</div>`;
    const sml=(t)=>`<div class="wv-sml">${t}</div>`;
    const btns=(...bs)=>`<div class="wv-row">${bs.join('')}</div>`;
    const btn=(txt,on,extra)=>`<button class="hint-btn" onclick="${on}" ${extra||''}>${txt}</button>`;
    const chip=(t,c)=>`<span style="display:inline-block;padding:2px 10px;border-radius:9px;background:rgba(127,209,255,.07);border:1px solid ${c||'rgba(127,184,160,.5)'};font-size:15px;color:#d8ecff;margin:2px">${t}</span>`;
    const l10=(mv,v1,v2,dur,dist,extra)=>l10Road(mv, v1, v2, dur, dist, extra);
    // таймер времени (полоса, заполняется)
    const timer=(label,hours,col,fill)=>{
      return `<div style="flex:1;text-align:center;max-width:130px">
        <div style="font-size:12px;color:#cbb89a">${label}</div>
        <div style="height:12px;background:#0d1a13;border:1px solid #3d5c49;border-radius:7px;overflow:hidden;margin:3px 0">
          <div class="wv-pop" style="height:100%;width:${fill}%;background:${col};transform-origin:0 50%;animation:wvGrow .9s ease both"></div></div>
        <div style="font-size:16px;color:#e8e0cc;font-weight:bold">⏱ ${hours}</div></div>`;
    };
    let h='';
    if(step===0){
      h=col(
        `<div class="wv-row">${chip('в школу: 30 км/ч','rgba(127,184,160,.5)')} ${chip('обратно: 20 км/ч','rgba(232,106,90,.5)')}</div>`+
        l10Road(false,30,20,0,10)+
        `<div style="font-size:30px;margin-top:2px" class="wv-pulse">🤔</div>`+
        big(`(30 + 20) : 2 = 25 км/ч — так ли?`)+
        sml('Кажется очевидным… но Архимед просит проверить на числах. Листай ➜'));
    } else if(step===1){
      h=col(big('Давай проверим на числах'),
        l10Road(false,30,20,0,10)+
        `<div class="wv-pop" style="font-size:17px;color:#d8ecff">путь до школы = 60 км · обратно = 60 км</div>`+
        `<div style="font-size:24px">➕</div>`+
        big('весь путь = 120 км')+
        sml('половинки ОДИНАКОВЫЕ — по 60 км. Теперь посчитаем время на каждой'));
    } else if(step===2){
      h=col(big('Первая половина: едем 30 км/ч'),
        l10Road(true,30,20,1.1,99,8)+
        `<div class="wv-row" style="margin-top:4px">${timer('время в школу', '2 часа', '#7fb8a0', 40)}</div>`+
        big('t₁ = 60 : 30 = 2 часа')+
        sml('быстро! машина проезжает 60 км за 2 часа (анимация — как раз ~2 тика)'));
    } else if(step===3){
      h=col(big('Вторая половина: ползём 20 км/ч'),
        l10Road(true,30,20,2.2,97,107)+
        `<div class="wv-row" style="margin-top:4px">${timer('время обратно', '3 часа', '#c96f4a', 60)}</div>`+
        big('t₂ = 60 : 20 = 3 часа')+
        sml('заметь: машина едет медленнее и дольше! 3 часа против 2'));
    } else if(step===4){
      h=col(big('Вся поездка'),
        l10Road(true,30,20,2.4,196,8)+
        `<div class="wv-row" style="margin-top:6px">${chip('путь = 120 км','rgba(127,184,160,.5)')} ${chip('время = 2 + 3 = 5 ч','rgba(232,106,90,.5)')}</div>`+
        `<div class="wv-ans" style="font-size:30px;color:var(--brass);font-weight:bold">v = 120 : 5 = 24 км/ч</div>`+
        sml('средняя скорость = весь путь : всё время. Вот честный ответ!'));
    } else if(step===5){
      h=col(big('Почему 24, а не 25?'),
        `<div class="wv-row" style="gap:10px;justify-content:center">${timer('участок 30 км/ч', '2 часа', '#7fb8a0', 40)}${timer('участок 20 км/ч', '3 часа', '#c96f4a', 60)}</div>`+
        `<div style="font-size:26px">⚖️</div>`+big(`медленный участок «весит» больше`)+
        sml('3 часа на 20 км/ч тянут среднюю вниз сильнее, чем 2 часа на 30 км/ч поднимают вверх'));
    } else if(step===6){
      h=col(big('Выводим формулу'),
        `<div style="display:flex;flex-direction:column;gap:6px;margin:6px 0;font-size:18px">
          <div class="wv-pop">пусть половина пути = S, скорости = v₁, v₂</div>
          <div class="wv-pop" style="color:#d8ecff">время: t = S/v₁ + S/v₂</div>
          <div class="wv-pop" style="color:#e8dcc8">средняя: v = 2S : (S/v₁ + S/v₂)</div></div>`+
        big(`делим на S: v = 2 : (1/v₁ + 1/v₂)`)+
        sml('S сокращается — путь уходит, остаются только скорости'));
    } else if(step===7){
      h=col(big('Складываем дроби'),
        `<div style="display:flex;flex-direction:column;gap:6px;margin:6px 0;font-size:19px">
          <div class="wv-pop" style="color:#d8ecff">1/v₁ + 1/v₂ = (v₁+v₂)/(v₁·v₂)</div>
          <div class="wv-pop" style="color:#e8dcc8">v = 2 : (v₁+v₂)/(v₁·v₂)</div></div>`+
        `<div class="wv-ans" style="font-size:24px;color:var(--brass);font-weight:bold;margin:4px 0">v = 2·v₁·v₂ : (v₁ + v₂)</div>`+
        sml('гармоническое среднее — вот главная формула этого урока!'));
    } else if(step===8){
      const v1=30,v2=20,v=24;
      h=col(big('Подставляем числа'),
        `<div style="display:flex;flex-direction:column;gap:6px;margin:6px 0;font-size:19px">
          <div class="wv-pop">v = 2·30·20 : (30 + 20)</div>
          <div class="wv-pop" style="color:#d8ecff">v = 1200 : 50</div></div>`+
        `<div class="wv-ans" style="font-size:32px;color:#7fd1a0;font-weight:bold">v = 24 км/ч ✓</div>`+
        sml('совпало с честным подсчётом 120:5 — формула работает!'));
    } else if(step===9){
      h=col(big('Правило-проверка'),
        `<div style="display:flex;gap:12px;justify-content:center;align-items:center;flex-wrap:wrap;margin:4px 0">
          <div style="text-align:center;opacity:.6"><div style="font-size:22px">полусумма</div><div style="font-size:30px;text-decoration:line-through;color:#e86a5a">25</div></div>
          <div style="font-size:28px">❯</div>
          <div style="text-align:center"><div style="font-size:22px">средняя скорость</div><div style="font-size:34px;color:#7fd1a0;font-weight:bold">24 ✓</div></div></div>`+
        big(`v ср &lt; (v₁+v₂)/2 — всегда!`)+
        sml('если получил больше полусуммы — ищи ошибку. Медленный участок тянет вниз'));
    } else if(step===10){
      // тренажёр: 12 и 6 как в вопросе
      if(st.v1==null) st.v1=12; if(st.v2==null) st.v2=6;
      const v=Math.round(2*st.v1*st.v2/(st.v1+st.v2)*10)/10;
      const t1=Math.round(120/st.v1*10)/10, t2=Math.round(120/st.v2*10)/10;
      const frac1=Math.min(1, 2/t1), frac2=Math.min(1, 3/t2);
      h=col(big('Тренажёр: попробуй сам!'),
        `<div class="wv-row">${chip('v₁ = '+st.v1+' км/ч')} ${chip('v₂ = '+st.v2+' км/ч')}</div>`+
        l10Road(false,st.v1,st.v2,0,10)+
        `<div style="margin-top:4px">${chip('v = 2·'+st.v1+'·'+st.v2+'/('+st.v1+'+'+st.v2+')','rgba(217,164,65,.4)')}</div>`+
        `<div class="wv-ans" style="font-size:34px;color:var(--brass);font-weight:bold">v ср = ${v} км/ч</div>`+
        btns(btn('🚗 +5 км/ч', `l10Act('${lk}','v1+')`),btn('−5 км/ч', `l10Act('${lk}','v1-')`),
             btn('+5 км/ч', `l10Act('${lk}','v2+')`),btn('−5 км/ч', `l10Act('${lk}','v2-')`),btn('↺', `l10Act('${lk}','r')`))+
        sml(v===8?'вопрос дальше: 12 и 6 → 8, а не 9!':'стартуй с v₁=12, v₂=6 — увидишь ответ вопроса'));
    } else {
      // памятка Архимеда
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:320px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.65">
          ✅ Путь — две РАВНЫЕ половины (v₁ и v₂):<br>&nbsp;&nbsp;<b>v = 2·v₁·v₂/(v₁+v₂)</b> — гармоническое среднее.<br>
          ⏱ Путь — РАВНЫЕ ВРЕМЕНА (час на 30 и час на 20):<br>&nbsp;&nbsp;<b>v = (30+20)/2 = 25</b> — арифметическое!<br>
          ⚠️ Участки разные — считай честно: <b>v = S : t</b>.<br>
          🔍 Проверка: v ср всегда меньше полусуммы.</div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там ровно такой пример: 12 и 6'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}

function visPhysNew(el){
  try{
    const L=lessonById(LV.id); if(!L){ el.innerHTML=''; return; }
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const T=(L.title||'').toLowerCase();
    const all=((L.explain||[]).join(' ')+' '+(L.check&&L.check.q||'')+' '+L.title).toLowerCase();
    const raw=(L.check&&L.check.q||'');
    const q=(L.check&&L.check.q||'');
    const nums=(raw.match(/\d+(?:[.,]\d+)?/g)||[]).map(x=>parseFloat(x.replace(',','.')));
    const has=(...ws)=>ws.some(w=>all.includes(w));
    const hasT=(...ws)=>ws.some(w=>T.includes(w));
    const col=(...ps)=>`<div class="wv-col">${ps.join('')}</div>`;
    const big=(t)=>`<div class="wv-big">${t}</div>`;
    const sml=(t)=>`<div class="wv-sml">${t}</div>`;
    const btns=(...bs)=>`<div class="wv-row">${bs.join('')}</div>`;
    const btn=(txt,on,extra)=>`<button class="hint-btn" onclick="${on}" ${extra||''}>${txt}</button>`;
    const icon=(e)=>`<div class="wv-ic2">${e}</div>`;
    const id=LV.id; const i=st.i==null?0:st.i;
    let h='';
    // ======== обзорные/тематические уроки — по id (раньше ключей, чтобы не путать) ========
    if(id===92){ const exs=[['движение','🚗','тела движутся — скорость, путь, время'],['свет','🌞','свет и тень, зеркала, радуга'],['звук','🔊','звук — волна, эхо'],['тепло','🔥','нагревание, плавление, кипение'],['электричество','⚡','ток, лампочка, магнит'],['силы','🪨','тяжесть, упругость, трение']];
      const [nm,ic,ds]=exs[i%exs.length];
      h=col(icon('🔭'), big(L.title), `<div style="font-size:64px" class="wv-pop">${ic}</div>`+big(nm)+sml(ds)+btn('показать ещё явление', `phAct('${lk}','nx')`));
    }
    else if(id===95){ const mats=[['Железо','притянулось!','🧷',1],['Сталь','притянулось!','🔩',1],['Дерево','не притягивается','🪵',0],['Стекло','не притягивается','🥛',0],['Пластик','не притягивается','🧴',0]];
      const [nm,res,ic,ok]=mats[i%mats.length];
      h=col(`<div style="font-size:64px">🧲</div>`+big(L.title)+
        `<div style="display:flex;align-items:center;gap:10px;justify-content:center;flex-wrap:wrap"><div style="font-size:52px" class="wv-pop">${ic}</div><div style="font-size:26px">→</div><div class="wv-big" style="color:${ok?'#7fd1a0':'#e89a8f'}">${res}</div></div>`+
        sml('железо и сталь притягиваются, дерево и стекло — нет')+
        btn('поднести другой предмет', `phAct('${lk}','nx')`));
    }
    else if(id===96){ const srcs=[['Солнце','светит само — источник света','🌞'],['Свеча','светит сама — источник света','🕯️'],['Луна','не светит — отражает свет Солнца','🌙'],['Зеркало','не светит — отражает','🪞'],['Светлячок','светится сам!','✨']];
      const [nm,res,ic]=srcs[i%srcs.length];
      h=col(`<div style="font-size:64px" class="wv-glow">💡</div>`+big(L.title)+`<div style="font-size:56px" class="wv-pop">${ic}</div>`+big(nm)+sml(res)+btn('проверить другой предмет', `phAct('${lk}','nx')`));
    }
    else if(id===98){ const sts=[['лёд','0 °C и ниже','🧊'],['вода','выше 0 °C','💧'],['пар','100 °C','💨']];
      const [nm,tmp,ic]=sts[i%sts.length];
      h=col(`<div style="font-size:64px">💧</div>`+big(L.title)+`<div style="font-size:64px" class="wv-pop">${ic}</div>`+big(nm)+big(tmp)+sml('вода бывает твёрдой (лёд), жидкой и газообразной (пар)')+btn('изменить температуру', `phAct('${lk}','nx')`));
    }
    else if(id===99){ const gases=[['Азот','≈ 78% — больше всего','🟦'],['Кислород','≈ 21% — им дышим','🟥'],['Прочие газы','≈ 1% — аргон, CO₂…','🟨']];
      const [nm,pct,ic]=gases[i%gases.length];
      h=col(`<div style="font-size:64px">🎈</div>`+big(L.title)+
        `<div style="display:flex;align-items:flex-end;gap:8px;justify-content:center;height:110px">
          <div style="width:52px;height:86px;background:linear-gradient(#9fc5f5,#6aa8dc);border-radius:6px 6px 0 0;text-align:center;font-size:10px;color:#fff;padding-top:3px">азот 78%</div>
          <div style="width:38px;height:24px;background:#e86a5a;border-radius:6px 6px 0 0;text-align:center;font-size:10px;color:#fff;padding-top:2px">21%</div>
          <div style="width:22px;height:6px;background:#d9a441;border-radius:3px 3px 0 0"></div></div>`+
        `<div style="font-size:26px">${ic}</div>`+big(nm)+big(pct)+sml('воздух — смесь газов: больше всего азота')+btn('показать другой газ', `phAct('${lk}','nx')`));
    }
    else {
    // ======== тема по заголовку — точное попадание ========
    const kind =
      hasT('скорост','движени') ? 'speed' :
      hasT('плотност') ? 'dens' :
      hasT('архимед') ? 'arch' :
      hasT('трени') ? 'fric' :
      hasT('паскал','давление жидкост') ? 'pascal' :
      hasT('давление') ? 'press' :
      hasT('тяжест','вес') ? 'weight' :
      hasT('ом','электрическ','ток','цеп') ? 'ohm' :
      hasT('энерг') ? 'energy' :
      hasT('работ') ? 'work' :
      hasT('нагрев','охлажд','температур','тепл') ? 'heat' :
      hasT('звук') ? 'sound' :
      hasT('измерен','единиц','метр','длина') ? 'units' : '';
    // если заголовок невнятный — уточняем по ключам текста (без «ом»-подстрок)
    const kind2 = kind ? kind :
      has('сила тока','напряжен','сопротивлен','вольт','ампер') ? 'ohm' :
      has('выталкива','архимед') ? 'arch' :
      has('скорост') ? 'speed' :
      has('плотност') ? 'dens' :
      has('трен') ? 'fric' :
      has('давление жидкост','паскал') ? 'pascal' :
      has('давление') ? 'press' :
      has('тяжест','вес') ? 'weight' :
      has('кинетическ','потенциальн') ? 'energy' :
      has('калор','нагрев','температур') ? 'heat' :
      has('звук') ? 'sound' :
      has('измерен','сантиметр','килограмм') ? 'units' : '';
    const sel=kind2||'generic';
    if(sel==='speed'){
      if(hasT('средняя скорост')||(has('гармоническ'))){
        if(st.v1==null) st.v1=Math.max(nums[0]||12,1); if(st.v2==null) st.v2=Math.max(nums[1]||6,1);
        const vs=Math.round(2*st.v1*st.v2/(st.v1+st.v2)*10)/10;
        h=col(
          `<div style="display:flex;gap:8px;justify-content:center;align-items:center;flex-wrap:wrap">
            <div class="wv-chip">участок 1: ${st.v1} км/ч</div><div style="font-size:20px">+</div>
            <div class="wv-chip">участок 2: ${st.v2} км/ч</div></div>`+
          big(`v ср = 2·${st.v1}·${st.v2}/(${st.v1}+${st.v2}) = ${vs} км/ч`)+
          btns(btn('+5 км/ч (1)',`phAct('${lk}','V1+')`),btn('−5 км/ч (1)',`phAct('${lk}','V1-')`),btn('+5 км/ч (2)',`phAct('${lk}','V2+')`),btn('−5 км/ч (2)',`phAct('${lk}','V2-')`),btn('↺',`phAct('${lk}','r')`))+
          sml('средняя скорость НЕ равна (v₁+v₂)/2 = '+Math.round((st.v1+st.v2)/2)+' — она меньше!'));
      } else {
        const findV=/скорость\?/.test(q)||hasT('скорость движения');
        if(findV){
          if(st.p==null) st.p=Math.max(nums[0]||40,1); if(st.t==null) st.t=Math.max(nums[1]||4,1);
          const v=Math.round(st.p/st.t*10)/10; const px=Math.min(208, st.p*3);
          h=col(
            `<div class="wv-road" style="width:300px"><div class="wv-lane"></div>
              <div style="position:absolute;bottom:-2px;left:2px;transform:translateX(${px}px);transition:transform 1s ease;line-height:0"><img src="img/car.png?v=77" style="width:88px;height:auto;display:block"></div>
              <div style="position:absolute;top:-4px;right:2px;font-size:12px;color:#7fa88f;font-weight:bold">${st.p} км</div>
              <div style="position:absolute;top:1px;left:4px;font-size:12px;color:#9fc5f5">⏱ ${st.t} ч</div></div>`+
            big(`S = ${st.p} км · t = ${st.t} ч`)+big(`v = S : t = ${st.p} : ${st.t} = ${v} км/ч`)+
            btns(btn('+10 км',`phAct('${lk}','p+')`),btn('−10 км',`phAct('${lk}','p-')`),btn('⏱ +1 ч',`phAct('${lk}','t+')`),btn('⏱ −1 ч',`phAct('${lk}','t-')`),btn('↺',`phAct('${lk}','r')`))+
            sml('машинка прошла путь S за время t — скорость = путь : время'));
        } else {
          if(st.v==null) st.v=Math.max(nums[0]||15,1); if(st.t==null) st.t=Math.max(nums[1]||2,1);
          const S=st.v*st.t; const px=Math.min(208, S*3);
          h=col(
            `<div class="wv-road" style="width:300px"><div class="wv-lane"></div>
              <div style="position:absolute;bottom:-2px;left:2px;transform:translateX(${px}px);transition:transform 1s ease;line-height:0"><img src="img/car.png?v=77" style="width:88px;height:auto;display:block"></div>
              <div style="position:absolute;top:-4px;right:2px;font-size:12px;color:#7fa88f;font-weight:bold">${S} км</div></div>`+
            big(`v=${st.v} км/ч · t=${st.t} ч`)+big(`S = v·t = ${S} км`)+
            btns(btn('🚗 +5 км/ч',`phAct('${lk}','v+')`),btn('−5 км/ч',`phAct('${lk}','v-')`),btn('⏱ +1 ч',`phAct('${lk}','t+')`),btn('⏱ −1 ч',`phAct('${lk}','t-')`),btn('↺',`phAct('${lk}','r')`))+
            sml('машинка едет v км/ч t часов — путь S = v·t'));
        }
      }
    }
    else if(sel==='dens'){
      if(st.m==null) st.m=Math.max(nums[0]||6,1); if(st.V==null) st.V=Math.max(nums[1]||2,1);
      const ro=Math.round(st.m/st.V*100)/100; const swim=ro<=1;
      const waterH=Math.min(104, 34+st.V*12);
      const bodyY = swim? waterH-24 : 4;
      h=col(
        `<div class="wv-stand" style="width:150px;height:120px;background:linear-gradient(#cfe8fb,#9fc5f5)">
          <div style="position:absolute;bottom:0;left:0;right:0;height:${waterH}px;background:linear-gradient(#9fc5f5,#6aa8dc);transition:height .6s"></div>
          <div class="wv-pop" style="position:absolute;left:50%;transform:translateX(-50%);bottom:${bodyY}px;width:40px;height:26px;background:${swim?'#7fb8a0':'#a06a3a'};border:2px solid #33291e;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;transition:bottom .7s ease">${st.m}г</div></div>`+
        big(`ρ = ${st.m} : ${st.V} = ${ro} г/см³`)+
        btns(btn('+1 г',`phAct('${lk}','m+')`),btn('−1 г',`phAct('${lk}','m-')`),btn('+1 см³',`phAct('${lk}','V+')`),btn('−1 см³',`phAct('${lk}','V-')`),btn('↺',`phAct('${lk}','r')`))+
        sml(swim?'ρ ≤ 1 г/см³ — тело легче воды и всплывает':'ρ > 1 г/см³ — тело тяжелее воды и тонет'));
    }
    else if(sel==='weight'){
      if(st.m==null) st.m=Math.max(nums[0]||3,1);
      const F=st.m*10; const ext=Math.min(100, F*3);
      h=col(
        `<div style="display:flex;gap:14px;align-items:flex-end;justify-content:center">
          <div class="wv-stand" style="width:56px;height:150px;background:#fff">
            <div style="position:absolute;top:4px;left:0;right:0;text-align:center;font-size:15px;color:#33291e;font-weight:bold">${F} Н</div>
            <div style="position:absolute;top:24px;left:50%;width:6px;height:${ext}px;background:repeating-linear-gradient(0deg,#7fd1ff 0 5px,#fff 5px 9px);transform:translateX(-50%);transition:height .5s"></div>
            <div class="wv-swing" style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:34px;height:12px;background:#a06a3a;border-radius:4px;text-align:center;font-size:9px;color:#fff">${st.m} кг</div></div>
          <div style="text-align:center"><div style="font-size:52px">🪨</div><div class="wv-sml" style="font-size:12px">${st.m} кг</div></div></div>`+
        big(`F = m·g = ${st.m}·10 = ${F} Н`)+
        btns(btn('+1 кг',`phAct('${lk}','m+')`),btn('−1 кг',`phAct('${lk}','m-')`),btn('↺',`phAct('${lk}','r')`))+
        sml('пружина динамометра растягивается сильнее с ростом массы'));
    }
    else if(sel==='press'){
      if(st.F==null) st.F=Math.max(nums[0]||60,1); if(st.S==null) st.S=Math.max(nums[1]||3,1);
      const p=Math.round(st.F/st.S); const sink=Math.min(36, p*2);
      h=col(
        `<div style="display:flex;flex-direction:column;align-items:center;gap:2px">
          <div style="width:${Math.min(180,50+st.S*16)}px;height:34px;background:linear-gradient(#8a94ad,#6a7288);border:2px solid #33291e;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px;color:#fff">${st.F} Н</div>
          <div style="font-size:22px;margin:2px 0">⬇</div>
          <div style="width:${Math.min(188,58+st.S*16)}px;height:12px;background:#d9c9a8;border:1px solid #33291e;border-radius:4px"></div>
          <div style="width:${Math.min(188,58+st.S*16)}px;height:${sink}px;background:repeating-linear-gradient(90deg,#e8d9b8 0 6px,#d9c9a8 6px 10px);transition:height .6s"></div></div>`+
        big(`p = F : S = ${st.F} : ${st.S} = ${p} Па`)+
        btns(btn('+10 Н',`phAct('${lk}','F+')`),btn('−10 Н',`phAct('${lk}','F-')`),btn('+1 м²',`phAct('${lk}','S+')`),btn('−1 м²',`phAct('${lk}','S-')`),btn('↺',`phAct('${lk}','r')`))+
        sml('груз вдавливается в песок тем глубже, чем больше давление p = F:S'));
    }
    else if(sel==='arch'){
      if(st.d==null) st.d=1;
      const depth=6+(st.d-1)*10; const F=Math.round(st.d*10);
      h=col(
        `<div class="wv-stand" style="width:170px;height:140px;background:linear-gradient(#cfe8fb,#9fc5f5)">
          <div class="wv-sml" style="position:absolute;top:2px;left:0;right:0;text-align:center;color:#123;font-weight:bold">F = ${F} Н</div>
          <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:${depth}px;width:46px;height:26px;background:#a06a3a;border:2px solid #33291e;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;transition:bottom .7s ease">${st.d*10}%</div>
          <div style="position:absolute;bottom:2px;left:0;right:0;text-align:center;font-size:12px;color:#1a3a55">вода вытесняется ↑</div></div>`+
        big(`глубина погружения: ${st.d*10}% · сила Архимеда: ${F} Н`)+
        btns(btn('⬇ глубже',`phAct('${lk}','d+')`),btn('⬆ выше',`phAct('${lk}','d-')`),btn('↺',`phAct('${lk}','r')`))+
        sml('чем глубже погружено тело, тем больше вытесненной воды и сила Архимеда'));
    }
    else if(sel==='pascal'){
      if(st.h==null) st.h=Math.max(nums[0]||nums[1]||2,1);
      const p=1000*10*st.h; const lvl=Math.min(120, st.h*8);
      h=col(
        `<div style="display:flex;gap:12px;align-items:flex-end;justify-content:center">
          <div class="wv-stand" style="width:80px;height:140px;background:linear-gradient(#cfe8fb,#9fc5f5)">
            <div style="position:absolute;bottom:0;left:0;right:0;height:${lvl}px;background:linear-gradient(#9fc5f5,#6aa8dc);transition:height .6s"></div>
            <div style="position:absolute;top:4px;left:0;right:0;text-align:center;font-size:13px;color:#123;font-weight:bold">h = ${st.h} м</div></div>
          <div style="text-align:center"><div style="font-size:40px">🌀</div><div class="wv-sml" style="font-size:11px">манометр<br>${p} Па</div></div></div>`+
        big(`p = ρ·g·h = 1000·10·${st.h} = ${p} Па = ${p/1000} кПа`)+
        btns(btn('⬇ глубже',`phAct('${lk}','h+')`),btn('⬆ выше',`phAct('${lk}','h-')`),btn('↺',`phAct('${lk}','r')`))+
        sml('на глубине h давление жидкости p = ρ·g·h — глубже = больше'));
    }
    else if(sel==='ohm'){
      if(st.U==null) st.U=Math.max(nums[0]||6,1); if(st.R==null) st.R=Math.max(nums[1]||2,1);
      const I=Math.round(st.U/st.R*10)/10; const bright=Math.min(1,I/3); const dur=Math.max(.3,1.3-I*.2);
      h=col(
        `<div style="display:flex;align-items:center;gap:10px;justify-content:center">
          <div style="font-size:44px">🔋</div>
          <div class="wv-cable" style="width:110px">${I>0?'<span class="wv-dot wv-flow" style="left:0"></span><span class="wv-dot wv-flow" style="left:0;animation-delay:.5s;animation-duration:'+dur+'s"></span>':''}</div>
          <div style="font-size:54px;filter:brightness(${0.3+bright});transition:filter .5s">💡</div>
          <div class="wv-sml" style="width:52px;font-size:12px">${I>=1.5?'ярко!':'тускло'}</div></div>`+
        big(`I = U : R = ${st.U} : ${st.R} = ${I} А`)+
        btns(btn('+3 В',`phAct('${lk}','U+')`),btn('−3 В',`phAct('${lk}','U-')`),btn('+1 Ом',`phAct('${lk}','R+')`),btn('−1 Ом',`phAct('${lk}','R-')`),btn('↺',`phAct('${lk}','r')`))+
        sml('электроны бегут: чем больше U или меньше R, тем больше ток I и ярче лампочка'));
    }
    else if(sel==='energy'){
      const kin = has('кинетическ') && !has('потенциальн') && !/потенциальн/.test(q);
      if(st.a==null) st.a=Math.max(nums[0]||(kin?3:2),1); if(st.b==null) st.b=Math.max(nums[1]||(kin?2:5),1);
      const E=Math.round((kin? st.a*st.b*st.b/2 : st.a*10*st.b));
      const px=kin? Math.min(290, st.b*30):0; const lift=kin?0:Math.min(90, st.b*9);
      const scene = kin
        ? `<div style="position:relative;width:300px;height:80px;border-bottom:2px solid #3d5c49">
            <div style="position:absolute;bottom:-4px;left:2px;font-size:44px;transform:translateX(${px}px);transition:transform 1s ease">⚽</div>
            <div class="wv-sml" style="position:absolute;bottom:14px;left:2px;font-size:11px">v = ${st.b} м/с</div></div>`
        : `<div style="position:relative;width:150px;height:160px">
            <div style="position:absolute;bottom:8px;left:6px;right:6px;height:2px;background:#3d5c49"></div>
            <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:${lift}px;font-size:46px;transition:bottom .8s ease">🎈</div>
            <div class="wv-sml" style="position:absolute;top:18px;left:0;right:0;text-align:center;font-size:11px;color:#7fa88f">h = ${st.b} м</div></div>`;
      h=col(scene+
        (kin? big(`E = m·v²/2 = ${st.a}·${st.b}²/2 = ${E} Дж`) : big(`E = m·g·h = ${st.a}·10·${st.b} = ${E} Дж`))+
        btns(btn('+1 кг',`phAct('${lk}','a+')`),btn('−1 кг',`phAct('${lk}','a-')`),btn(kin?'+1 м/с':'+1 м',`phAct('${lk}','b+')`),btn(kin?'−1 м/с':'−1 м',`phAct('${lk}','b-')`),btn('↺',`phAct('${lk}','r')`))+
        sml(kin?'мяч катится быстрее при росте v — кинетическая энергия E = mv²/2 растёт':'поднимем груз выше — потенциальная энергия E = mgh растёт'));
    }
    else if(sel==='work'){
      if(st.a==null) st.a=Math.max(nums[0]||10,1); if(st.b==null) st.b=Math.max(nums[1]||5,1);
      const A=st.a*st.b; const lift=Math.min(110, st.b*11);
      h=col(
        `<div style="position:relative;width:150px;height:150px">
          <div style="position:absolute;bottom:6px;left:50%;transform:translateX(-50%);font-size:50px">🏋️</div>
          <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:${lift}px;width:52px;height:14px;background:#c96f4a;border:2px solid #33291e;border-radius:5px;text-align:center;font-size:10px;color:#fff;transition:bottom .7s ease">${st.b} м</div></div>`+
        big(`A = F·s = ${st.a}·${st.b} = ${A} Дж`)+
        btns(btn('+5 Н',`phAct('${lk}','a+')`),btn('−5 Н',`phAct('${lk}','a-')`),btn('+1 м',`phAct('${lk}','b+')`),btn('−1 м',`phAct('${lk}','b-')`),btn('↺',`phAct('${lk}','r')`))+
        sml('атлет поднимает груз на высоту s — работа A = F·s'));
    }
    else if(sel==='heat'){
      if(st.dt==null) st.dt=Math.max(nums[1]||10,1); if(st.m==null) st.m=Math.max(nums[0]||1,1);
      const Q=st.m*st.dt;
      h=col(
        `<div style="display:flex;align-items:flex-end;gap:12px;justify-content:center">
          <div style="text-align:center"><div style="font-size:${st.dt>=6?'56px':'44px'}" class="${st.dt>=6?'wv-flick':''}">🔥</div><div class="wv-sml" style="font-size:11px">пламя</div></div>
          <div class="wv-stand" style="width:60px;height:110px;background:linear-gradient(#cfe8fb,#9fc5f5)">
            <div style="position:absolute;bottom:0;left:0;right:0;height:${Math.min(96, 26+st.dt*5)}px;background:linear-gradient(#9fc5f5,#6aa8dc);transition:height .6s"></div>
            <div class="wv-sml" style="position:absolute;top:2px;left:0;right:0;text-align:center;font-size:10px;color:#123">${st.m} г</div></div>
          <div class="wv-sml" style="width:56px;font-size:12px">Δt = ${st.dt}°</div></div>`+
        big(`Q = m·Δt = ${st.m}·${st.dt} = ${Q} кал`)+
        btns(btn('+1 г',`phAct('${lk}','m+')`),btn('−1 г',`phAct('${lk}','m-')`),btn('+1°',`phAct('${lk}','dt+')`),btn('−1°',`phAct('${lk}','dt-')`),btn('↺',`phAct('${lk}','r')`))+
        sml('нагрев 1 г воды на 1° = 1 кал: Q = m·Δt'));
    }
    else if(sel==='sound'){
      if(st.t==null) st.t=Math.max(nums[0]||3,1);
      const S=340*st.t;
      h=col(
        `<div style="display:flex;align-items:center;gap:12px;justify-content:center">
          <div style="font-size:56px" class="wv-pulse">📢</div>
          <div style="position:relative;width:120px;height:60px">
            ${[0,.4,.8].map(d=>`<span class="wv-wave" style="position:absolute;left:36px;top:50%;width:28px;height:28px;margin:-14px 0 0 -14px;border:2.5px solid #7fd1ff;border-radius:50%;animation-delay:${d}s"></span>`).join('')}</div></div>`+
        big(`S = v·t = 340·${st.t} = ${S} м`)+
        btns(btn('+1 с',`phAct('${lk}','t+')`),btn('−1 с',`phAct('${lk}','t-')`),btn('↺',`phAct('${lk}','r')`))+
        sml('звук — волна: за t секунд проходит S = 340·t м'));
    }
    else if(sel==='units'){
      if(st.v==null) st.v=Math.max(nums[0]||3,1);
      h=col(
        `<div class="wv-road" style="width:240px;background:#13251c">
          <div style="position:absolute;top:0;left:0;bottom:0;width:${Math.min(230,st.v*40)}px;background:linear-gradient(90deg,#7fd1ff,var(--brass));transition:width .6s;display:flex;align-items:center;justify-content:flex-end;padding-right:4px;font-size:13px;font-weight:bold;color:#0b1712">${st.v} м</div></div>`+
        big(`${st.v} м = ${st.v*100} см`)+
        btns(btn('+1 м',`phAct('${lk}','v+')`),btn('−1 м',`phAct('${lk}','v-')`),btn('↺',`phAct('${lk}','r')`))+
        sml('лента удлиняется: 1 м = 100 см'));
    }
    else if(sel==='fric'){
      if(st.f==null) st.f=6; const srf=st.srf||'шершавый асфальт';
      const rough=srf!=='гладкий лёд'; const px=rough?80:205;
      h=col(
        `<div style="position:relative;width:260px;height:64px;border-radius:8px;background:${rough?'repeating-linear-gradient(90deg,#5a4630 0 6px,#4a3622 6px 9px)':'linear-gradient(#cfe8fb,#9fc5f5)'};overflow:hidden">
          <div style="position:absolute;bottom:4px;left:8px;font-size:40px;transform:translateX(${px}px);transition:transform 1s ease">🧊</div>
          <div class="wv-sml" style="position:absolute;top:2px;left:6px;font-size:11px">${srf}</div></div>`+
        big(`сила трения: ${st.f} Н`)+
        btns(btn('🧊 гладкий лёд',`phAct('${lk}','smooth')`),btn('🪨 шершавый асфальт',`phAct('${lk}','rough')`))+
        sml(rough?('шершавая поверхность → трение '+st.f+' Н, брусок еле едет'):('гладкий лёд → трение '+st.f+' Н, брусок скользит далеко')));
    }
    else {
      h=col(`<div style="font-size:64px">🔭</div>`+big(L.title||'')+`<div class="wv-sml" style="max-width:320px">${esc(((L.explain&&L.explain[0])||'')).slice(0,170)}…</div>`+btn('дальше по теме ➜', `phAct('${lk}','nx')`));
    }
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}

function phAct(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  const bump=(k,d,min)=> st[k]=Math.max(min||1, Math.round(((st[k]==null?1:st[k])+d)*10)/10);
  switch(act){
    case 'v+': bump('v',5); break; case 'v-': bump('v',-5); break;
    case 'p+': bump('p',10); break; case 'p-': bump('p',-10); break;
    case 'V1+': bump('v1',5); break; case 'V1-': bump('v1',-5); break;
    case 'V2+': bump('v2',5); break; case 'V2-': bump('v2',-5); break;
    case 't+': bump('t',1); break; case 't-': bump('t',-1); break;
    case 'm+': bump('m',1); break; case 'm-': bump('m',-1); break;
    case 'V+': bump('V',1); break; case 'V-': bump('V',-1); break;
    case 'F+': bump('F',10); break; case 'F-': bump('F',-10); break;
    case 'S+': bump('S',1); break; case 'S-': bump('S',-1); break;
    case 'd+': st.d=Math.min(9,(st.d||1)+1); break; case 'd-': st.d=Math.max(1,(st.d||1)-1); break;
    case 'h+': bump('h',1); break; case 'h-': bump('h',-1); break;
    case 'U+': bump('U',3); break; case 'U-': bump('U',-3); break;
    case 'R+': bump('R',1); break; case 'R-': bump('R',-1); break;
    case 'a+': bump('a',1); break; case 'a-': bump('a',-1); break;
    case 'b+': bump('b',1); break; case 'b-': bump('b',-1); break;
    case 'dt+': bump('dt',1); break; case 'dt-': bump('dt',-1); break;
    case 'smooth': st.srf='гладкий лёд'; st.f=1; break;
    case 'rough': st.srf='шершавый асфальт'; st.f=6; break;
    case 'r': CHS[lk]={}; break;
    default: if(/^i[0-9]$/.test(act)) st.i=parseInt(act.slice(1),10);
             else if(act==='nx') st.i=(st.i==null?1:st.i+1);
  }
  chRender(0);
}
function visIsPhys(){ try{ const L=lessonById(LV.id); return !!L && L.subj==='phys'; }catch(e){ return false; } }

function renderLessonVis(){
  const el=document.getElementById('lvis'); if(!el) return;
  const id=LV.id;
  if(id===1) visDigits(el);
  else if(id===2) visPigeon(el);
  else if(id===3) visSnail(el);
  else if(id===4) visCandy(el);
  else if(id===5) visTourn(el);
  else if(id===6) visVillage(el);
  else if(id===10) visL10(el);
  else if(id===33) visL33(el);
  else if(visIsChem()) visChemNew(el);
  else if(visIsPhys()) visPhysNew(el);
  else if(visIsMath()) visMathNew(el);
  else el.innerHTML='';
}
function visDigits(el){
  const blk=(n,c)=>`<div style="display:flex;flex-direction:column-reverse;gap:2px;min-height:110px;align-items:center">${Array.from({length:n},()=>`<div style="width:36px;height:11px;background:${c};border-radius:3px"></div>`).join('')||'<div class="small">—</div>'}</div>`;
  const num=100*LX.a+10*LX.b+LX.c, rev=100*LX.c+10*LX.b+LX.a;
  el.innerHTML=`<div style="display:flex;gap:10px;justify-content:center;align-items:flex-end;flex-wrap:wrap">
    ${[['a',1,9,'#c96f4a'],['b',0,9,'#b06fd0'],['c',1,9,'#7fb8a0']].map(([k,lo,hi,col])=>`
      <div style="text-align:center"><div style="font-size:26px;color:var(--brass)">${LX[k]}</div>
      <div style="display:flex;gap:4px;justify-content:center">
        <button class="hint-btn" onclick="dig('${k}',-1,${lo},${hi})">−</button>
        <button class="hint-btn" onclick="dig('${k}',1,${lo},${hi})">+</button></div></div>`).join('')}
    <div style="display:flex;gap:4px;align-items:flex-end">${blk(LX.a,'#c96f4a')}${blk(LX.b,'#b06fd0')}${blk(LX.c,'#7fb8a0')}</div>
  </div>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:8px;font-size:13px;color:#cbb89a">
    <span>число <b style="color:var(--amber)">${num}</b></span><span>наоборот <b style="color:var(--amber)">${rev}</b></span>
    <span>сумма <b style="color:var(--amber)">${num+rev}</b></span><span>разность <b style="color:var(--amber)">${Math.abs(num-rev)}</b></span>
  </div>`;
}
function dig(k,d,lo,hi){ LX[k]=Math.max(lo,Math.min(hi,LX[k]+d)); renderLessonVis(); }
function visPigeon(el){
  if(!LX.pigeons){ const arr=[]; for(let i=0;i<7;i++)arr.push(i); for(let i=0;i<3;i++)arr.push((i*2)%7); LX.pigeons=arr; }
  const cells=Array.from({length:7},()=>[]); LX.pigeons.forEach(p=>cells[p].push(1));
  el.innerHTML=`<div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:center">${cells.map((c,i)=>`
    <div style="width:70px;min-height:92px;border:2px solid ${c.length>=2?'var(--danger)':'#3d5c49'};border-radius:8px;background:#101f18;display:flex;flex-wrap:wrap;align-content:flex-start;gap:1px;padding:5px;position:relative">
      ${'🕊'.repeat(c.length).split('').map(p=>`<span style="font-size:13px">${p}</span>`).join('')}
      <span style="position:absolute;bottom:2px;left:0;right:0;text-align:center;font-size:9px;color:#8a94ad">${i+1} · ${c.length}</span></div>`).join('')}</div>
    <div style="text-align:center;margin-top:6px;color:#cbb89a;font-size:12.5px">10 голубей · 7 клеток → где-то точно двое! ⌈10/7⌉ = 2</div>`;
}
function visSnail(el){
  const c=LX.cells, pts=Array.from({length:7},(_,i)=>{const a=-Math.PI/2+i*2*Math.PI/7;return [150+62*Math.cos(a),104+62*Math.sin(a)];});
  el.innerHTML=`<svg width="300" height="200" viewBox="0 0 300 200" style="max-width:100%;display:block;margin:0 auto">
    ${pts.map((p,i)=>{const q=pts[(i+1)%7];return `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="#3d5c49" stroke-width="2"/>`;}).join('')}
    ${pts.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="24" fill="#1b2f24" stroke="${i===3?'var(--brass)':'#8a94ad'}" stroke-width="${i===3?2.5:1.5}"/>
      <text x="${p[0]}" y="${p[1]+4}" text-anchor="middle" font-size="12" fill="${i===3?'#E8A33D':'#cbb89a'}">${c[i]}</text>`).join('')}
    <text x="150" y="20" text-anchor="middle" font-size="11" fill="#8a94ad">прошло часов: ${LV.step>=0?LX.hour:0} · сумма всегда 64</text></svg>
    <div style="display:flex;gap:8px;justify-content:center;margin-top:4px">
      <button class="hint-btn" onclick="snailHour()" ${LX.hour>=5?'disabled':''}>⏱ Час +</button>
      <button class="hint-btn" onclick="snailReset()">↺ Сброс</button></div>
    ${LX.hour>=5?'<div style="text-align:center;color:var(--amber);font-size:13px;margin-top:6px">Через 5 часов в оранжевой ячейке — 10 улиток ✓</div>':''}`;
}
function snailHour(){ if(LX.hour>=5) return; const c=LX.cells,n=7,out=Array(n).fill(0);
  c.forEach((x,i)=>{ if(x>0){ out[(i-1+n)%n]+=x/2; out[(i+1)%n]+=x/2; } }); LX.hour++; LX.cells=out; renderLessonView(); }
function snailReset(){ LX.hour=0; LX.cells=[64,0,0,0,0,0,0]; renderLessonView(); }
function visCandy(el){
  el.innerHTML=`<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
    ${[['Ваня',2,'чёт → правда'],['Стёпа',1,'нечёт → соврал'],['Лёша',3,'нечёт → соврал']].map(([nm,c,st])=>`
      <div style="width:130px;background:#13251c;border:1px solid #3d5c49;border-radius:10px;padding:10px;text-align:center">
      <div style="font-size:24px">🍬</div><div style="font-size:26px;color:var(--brass)">${c}</div>
      <div style="font-weight:bold">${nm}</div><div class="small" style="font-size:10.5px">${st}</div></div>`).join('')}
  </div><div style="text-align:center;font-size:12.5px;color:#cbb89a;margin-top:6px">2+1+3 = 6 ✓ · «вместе 6» — правда (Ваня, чёт)</div>`;
}
function visTourn(el){
  el.innerHTML=`${[['Настя',2,'12 очк.'],['Юля',4,'20 очк.'],['Саша',0,'0 очк.']].map(([nm,w,pt])=>`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:12.5px">
      <span style="width:64px">${nm}</span>
      <span style="flex:1;height:14px;background:#101f18;border-radius:4px;overflow:hidden;max-width:300px"><i style="display:block;height:100%;width:${w/4*100}%;background:linear-gradient(90deg,#c96f4a,var(--brass))"></i></span>
      <span style="width:56px;text-align:right;color:var(--amber)">${pt}</span></div>`).join('')}
  <div style="text-align:center;font-size:12.5px;color:#8a94ad">победы (макс 4 игры): Настя 2, Юля 4, Саша 0</div>`;
}
function visVillage(el){
  const grp=(nm,comp)=>`<div style="border:2px solid ${comp?'var(--glow)':'#3d5c49'};border-radius:10px;padding:6px 10px;background:#101f18;text-align:center;min-width:96px">
    <div class="small" style="font-size:10px">${nm}</div><div style="color:var(--amber);font-size:16px">20 шт</div>
    <div style="font-size:9.5px;color:${comp?'#7FD1FF':'#54705f'}">${comp||''}</div></div>`;
  el.innerHTML=`<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
    ${grp('остаток 0', LV.step>=2?'остров A':'')}${grp('остаток 1', LV.step>=2?'остров B':'')}${grp('остаток 4', LV.step>=2?'остров B':'')}
    ${grp('остаток 2', LV.step>=2?'остров C':'')}${grp('остаток 3', LV.step>=2?'остров C':'')}</div>
    <div style="text-align:center;font-size:12.5px;color:#cbb89a;margin-top:6px">
    ${LV.step<1?'Дороги: 1↔4 и 2↔3 (сумма кратна 5), кратные 5 — между собой.'
      :LV.step===1?'Остаток 1 связан ТОЛЬКО с остатком 4.'
      :LV.step===2?'Три острова: {0}, {1 и 4}, {2 и 3}.'
      :LV.step===3?'Оценка: 3 острова → минимум 2 дороги.'
      :'Пример: 2 дороги связали всё. Ответ: 2!'}</div>`;
}
