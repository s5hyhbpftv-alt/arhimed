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
function chRender(lid){ const el=document.getElementById('lvis'); if(!el) return; if(LV.id===10) visL10(el); else if(LV.id===33) visL33(el); else if(LV.id===34) visL34(el); else if(LV.id===35) visL35(el); else if(LV.id===36) visL36(el); else if(LV.id===37) visL37(el); else if(LV.id===48) visL48(el); else if(LV.id===49) visL49(el); else if(LV.id===50) visL50(el); else if(LV.id===76) visL76(el); else if(LV.id===77) visL77(el); else if(LV.id===78) visL78(el); else if(LV.id===79) visL79(el); else if(LV.id===80) visL80(el); else if(LV.id===81) visL81(el); else if(LV.id===82) visL82(el); else if(LV.id===83) visL83(el); else if(visIsChem()) visChemNew(el); else if(visIsPhys()) visPhysNew(el); else if(visIsMath()) visMathNew(el); }
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
    case 'drop': st.drop=(st.drop||0)+1; break;
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
  // изометрический векторный кубик с текстурой материала и бликами
  const base=l33Mat(mat);
  const W=w||64, H=Math.round(W*112/124);
  const id='t'+(Math.random()*1e6|0);
  const grain = mat==='дерево' ? `<line x1="20" y1="56" x2="104" y2="48" stroke="rgba(90,52,20,.4)" stroke-width="2"/><line x1="14" y1="70" x2="110" y2="62" stroke="rgba(90,52,20,.3)" stroke-width="1.6"/><line x1="18" y1="86" x2="106" y2="78" stroke="rgba(90,52,20,.25)" stroke-width="1.4"/>` : '';
  const pores = mat==='пробка' ? Array.from({length:9},(_,i)=>`<circle cx="${18+((i*37)%92)}" cy="${44+((i*29)%56)}" r="1.8" fill="rgba(120,70,30,.35)"/>`).join('') : '';
  const ice= mat==='лёд' ? `<polygon points="62,10 116,36 116,44 62,19" fill="rgba(255,255,255,.5)"/>` : '';
  const steel= mat==='железо'||mat==='сталь' ? `<circle cx="70" cy="52" r="3.4" fill="rgba(255,255,255,.75)"/><circle cx="70" cy="68" r="3.4" fill="rgba(255,255,255,.55)"/><circle cx="70" cy="84" r="3.4" fill="rgba(255,255,255,.4)"/>` : '';
  const gold= mat==='золото' ? `<polygon points="62,10 116,36 62,62 8,36" fill="rgba(255,240,180,.5)"/>` : '';
  return `<svg width="${W}" height="${H}" viewBox="0 0 124 112" style="display:block">
    <polygon points="62,10 116,36 62,62 8,36" fill="${l33HexColor(base,.55)}" stroke="rgba(0,0,0,.4)" stroke-width="1.6"/>
    <polygon points="8,36 62,62 62,108 8,82" fill="${l33HexColor(base,-.55)}" stroke="rgba(0,0,0,.4)" stroke-width="1.6"/>
    <polygon points="62,62 116,36 116,82 62,108" fill="${base}" stroke="rgba(0,0,0,.4)" stroke-width="1.6"/>
    ${pores}${grain}${ice}${steel}${gold}
    <polygon points="62,10 116,36 116,44 62,18" fill="rgba(255,255,255,.28)"/>
    <polygon points="8,36 62,62 62,68 8,42" fill="rgba(255,255,255,.14)"/>
    ${rho!=null?`<text x="62" y="101" text-anchor="middle" font-size="14" font-weight="bold" fill="#fff" stroke="rgba(0,0,0,.5)" stroke-width=".5">${rho}</text>`:''}
  </svg>`;
}
function l33Bath(items, opts){
  // ванна Архимеда (вид сбоку): вода занимает низ, предметы плавают/тонут
  const o=opts||{};
  const W=o.w||260, H=o.h||170, waterTop=o.waterTop||Math.round(H*.42);
  const bodies=(items||[]).map(it=>{
    const floatY=H-waterTop-18;      // плавающий: погружён на ~1/3 (bottom от низа)
    const botY=6;                     // тонущий: на дне ванны
    const y = it.swim? floatY : botY;
    const w=it.size||64;
    const lbl=it.label!=null?it.label:(it.mat+(it.rho!=null?'  ρ='+it.rho:''));
    const delay=(it.delay||0);
    // внешний слой: падение с высоты (или всплытие); внутренний: покачивание для плавающих
    const inner = it.swim
      ? `<div class="l33-bob2" style="animation-delay:${delay+1.7}s">${lbl?`<div style="font-size:11px;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.85);font-weight:bold;white-space:nowrap;margin-bottom:2px">${lbl}</div>`:''}${l33CubeSvg(it.mat,w)}</div>`
      : `${lbl?`<div style="font-size:11px;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.85);font-weight:bold;white-space:nowrap;margin-bottom:2px">${lbl}</div>`:''}${l33CubeSvg(it.mat,w)}`;
    return `<div style="position:absolute;left:${it.x!=null?it.x:'50%'};transform:translateX(-50%);bottom:${y}px;z-index:3;text-align:center">
      <div class="l33-fall" style="animation-delay:${delay}s">${inner}</div>
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
function l33BoatSvg(w){
  // векторный парусник: деревянный корпус, мачта, паруса, флажок
  const W=w||84, H=Math.round(W*0.62);
  return `<svg width="${W}" height="${H}" viewBox="0 0 140 88" style="display:block">
    <!-- корпус (деревянная лодка) -->
    <path d="M6,58 Q14,74 34,78 L108,78 Q128,76 134,60 Q128,54 108,50 L34,50 Q16,50 6,58 Z"
          fill="#8a5a2b" stroke="#4a2f12" stroke-width="2"/>
    <path d="M10,60 Q18,68 34,70 L106,70 Q122,68 130,60 L106,56 L34,56 Z" fill="#b07b43" opacity=".8"/>
    <line x1="30" y1="52" x2="30" y2="76" stroke="rgba(74,47,18,.6)" stroke-width="1.6"/>
    <line x1="70" y1="52" x2="70" y2="76" stroke="rgba(74,47,18,.6)" stroke-width="1.6"/>
    <!-- мачта -->
    <line x1="78" y1="76" x2="78" y2="6" stroke="#5a3a18" stroke-width="3"/>
    <!-- задний парус -->
    <path d="M78,12 Q108,24 114,44 L78,50 Z" fill="#e8e4da" stroke="#8a8470" stroke-width="1.4"/>
    <path d="M78,14 Q96,22 100,34 L78,40 Z" fill="#f6f3ec" opacity=".9"/>
    <!-- передний парус -->
    <path d="M78,16 Q52,28 44,48 L78,52 Z" fill="#f0ece2" stroke="#8a8470" stroke-width="1.4"/>
    <!-- флажок -->
    <path d="M78,6 L102,12 L78,18 Z" fill="#e0523d"/>
    <!-- ватерлиния -->
    <path d="M6,64 Q40,60 134,60" stroke="rgba(255,255,255,.25)" stroke-width="2" fill="none"/>
  </svg>`;
}
function l34Tree(){
  // яблоня (сцена легенды Ньютона)
  return `<svg viewBox="0 0 240 190" style="width:240px;height:190px;display:block">
    <defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#aee0f5"/><stop offset="1" stop-color="#d8f0fa"/></linearGradient></defs>
    <rect x="0" y="0" width="240" height="150" fill="url(#sk)"/>
    <rect x="0" y="150" width="240" height="40" fill="#4a7a32"/>
    <circle cx="60" cy="52" r="34" fill="#5d9c3a"/><circle cx="110" cy="38" r="40" fill="#68a844"/>
    <circle cx="158" cy="52" r="32" fill="#5d9c3a"/><circle cx="84" cy="66" r="34" fill="#71b34e"/>
    <circle cx="140" cy="68" r="32" fill="#71b34e"/>
    <path d="M118,80 L118,170 L96,170 L96,80 Z" fill="#7a4a24"/>
    <path d="M118,120 Q150,118 176,128" stroke="#7a4a24" stroke-width="9" fill="none" stroke-linecap="round"/>
    <circle cx="176" cy="126" r="6" fill="#e23b2e"/><circle cx="196" cy="122" r="5" fill="#d92f22"/>
  </svg>`;
}
function l35Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  switch(act){
    case 'wide': st.orient='wide'; break;
    case 'narrow': st.orient='narrow'; break;
    case 'F+': st.F=Math.min(240,(st.F==null?60:st.F)+20); break;
    case 'F-': st.F=Math.max(20,(st.F==null?60:st.F)-20); break;
    case 'S+': st.S=Math.min(8,(st.S==null?2:st.S)+1); break;
    case 'S-': st.S=Math.max(1,(st.S==null?2:st.S)-1); break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l35Brick(w,h){
  // кирпич с дырками и фактурой
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block">
    <defs><linearGradient id="br${w}${h}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c96a4a"/><stop offset=".5" stop-color="#a34a30"/><stop offset="1" stop-color="#7c3420"/></linearGradient></defs>
    <rect x="1" y="1" width="${w-2}" height="${h-2}" rx="6" fill="url(#br${w}${h})" stroke="#5a2414" stroke-width="2"/>
    <rect x="${w*.08}" y="${h*.06}" width="${w*.84}" height="${h*.1}" rx="3" fill="rgba(255,255,255,.16)"/>
    ${[.28,.5,.72].map(fx=>`<rect x="${w*fx-w*.045}" y="${h*.3}" width="${w*.09}" height="${h*.4}" rx="${Math.min(6,w*.04)}" fill="#5a2414"/>`).join('')}
    <rect x="${w*.06}" y="${h*.84}" width="${w*.88}" height="${h*.08}" rx="3" fill="rgba(0,0,0,.14)"/>
  </svg>`;
}
function l35Flakes(n,h,big){
  // декоративный снегопад: n снежинок падают по всей сцене (h — высота сцены)
  let s='';
  for(let i=0;i<n;i++){
    const x=((i*53+11)%100);
    const size=big? (2.4+(i%3)*1.2) : (1.8+(i%4)*1);
    const cls= (i%3===0)?'l35-flake':'l35-flake2';
    const dur=(3.2+(i%5)*1.15).toFixed(2);
    const del=(-(i*.47)%3).toFixed(2);
    s+=`<span class="${cls}" style="left:${x}%;width:${size}px;height:${size}px;--fd:${dur}s;--d:${del}s;--fh:${h+16}px;--fx:${((i%2?1:-1)*((i*7)%14+4)).toFixed(0)}px"></span>`;
  }
  return s;
}
function l35ArchSvg(w, pose){
  // Архимед в полный рост (анфас). pose: 'down' — руки вдоль тела; 'up' — руки вверх («ой!»); 'ski' — +лыжи и палки
  const H=Math.round(w*214/150);
  const skin='#f6c391', skinD='#d99c67', skinL='#fbdab2';
  const robe='#f4ead1', robeD='#e2cfaa', fold='#d9c196';
  const drape='#b5d8ec', drapeD='#93bcd6';
  const beard='#fbfdff', beardD='#e3ebf0';
  const belt='#a5814c', beltD='#8a6937';
  const boot='#8a5a34', bootD='#6a4122', sole='#4a2f18';
  const skiC='#c0533c', skiD='#8e3a29';
  const armUp = pose==='up';
  const armL = armUp
    ? `<path d="M61,62 L49,44 L42,30" stroke="${skinD}" stroke-width="13" fill="none" stroke-linecap="round"/>
       <path d="M61,62 L49,44 L42,30" stroke="${skin}" stroke-width="9.5" fill="none" stroke-linecap="round"/>
       <circle cx="41" cy="28" r="6.2" fill="${skin}"/>
       <circle cx="41" cy="28" r="6.2" fill="none" stroke="${skinD}" stroke-width="1.4"/>
       <circle cx="39" cy="26.5" r="1.3" fill="${skinL}"/>`
    : `<path d="M61,61 Q53,76 48,92" stroke="${skinD}" stroke-width="13" fill="none" stroke-linecap="round"/>
       <path d="M61,61 Q53,76 48,92" stroke="${skin}" stroke-width="9.5" fill="none" stroke-linecap="round"/>
       <circle cx="47.5" cy="95" r="5.4" fill="${skin}"/>
       <circle cx="47.5" cy="95" r="5.4" fill="none" stroke="${skinD}" stroke-width="1.3"/>`;
  const armR = armUp
    ? `<path d="M89,62 L101,44 L108,30" stroke="${skinD}" stroke-width="13" fill="none" stroke-linecap="round"/>
       <path d="M89,62 L101,44 L108,30" stroke="${skin}" stroke-width="9.5" fill="none" stroke-linecap="round"/>
       <circle cx="109" cy="28" r="6.2" fill="${skin}"/>
       <circle cx="109" cy="28" r="6.2" fill="none" stroke="${skinD}" stroke-width="1.4"/>
       <circle cx="111" cy="26.5" r="1.3" fill="${skinL}"/>`
    : `<path d="M89,61 Q97,76 102,92" stroke="${skinD}" stroke-width="13" fill="none" stroke-linecap="round"/>
       <path d="M89,61 Q97,76 102,92" stroke="${skin}" stroke-width="9.5" fill="none" stroke-linecap="round"/>
       <circle cx="102.5" cy="95" r="5.4" fill="${skin}"/>
       <circle cx="102.5" cy="95" r="5.4" fill="none" stroke="${skinD}" stroke-width="1.3"/>`;
  const legs=`
    <!-- левая нога -->
    <rect x="61" y="122" width="13" height="48" rx="6" fill="url(#l35skin)"/>
    <path d="M63,128 L63,168" stroke="${skinD}" stroke-width="2.2" opacity=".55"/>
    <rect x="59.5" y="163" width="16" height="29" rx="7" fill="${boot}"/>
    <rect x="59.5" y="163" width="16" height="7" rx="3.5" fill="${bootD}"/>
    <rect x="58" y="188" width="19" height="7" rx="3.5" fill="${sole}"/>
    <!-- правая нога -->
    <rect x="76" y="122" width="13" height="48" rx="6" fill="url(#l35skin)"/>
    <path d="M87,128 L87,168" stroke="${skinD}" stroke-width="2.2" opacity=".55"/>
    <rect x="74.5" y="163" width="16" height="29" rx="7" fill="${boot}"/>
    <rect x="74.5" y="163" width="16" height="7" rx="3.5" fill="${bootD}"/>
    <rect x="73" y="188" width="19" height="7" rx="3.5" fill="${sole}"/>`;
  const skis = pose==='ski' ? `
    <!-- лыжи (веер от ботинок) -->
    <path d="M66,199 L22,208" stroke="${skiC}" stroke-width="7" stroke-linecap="round"/>
    <path d="M20,209 q-6,-2 -8,-9" stroke="${skiD}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M84,199 L128,208" stroke="${skiC}" stroke-width="7" stroke-linecap="round"/>
    <path d="M130,209 q6,-2 8,-9" stroke="${skiD}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <!-- крепления -->
    <rect x="60" y="196" width="12" height="5" rx="2" fill="${sole}"/>
    <rect x="78" y="196" width="12" height="5" rx="2" fill="${sole}"/>
    <!-- палки -->
    <path d="M48,96 L26,182" stroke="#a0713f" stroke-width="2.8" stroke-linecap="round"/>
    <circle cx="26" cy="182" r="3.6" fill="none" stroke="#c9a02c" stroke-width="2"/>
    <path d="M102,96 L124,182" stroke="#a0713f" stroke-width="2.8" stroke-linecap="round"/>
    <circle cx="124" cy="182" r="3.6" fill="none" stroke="#c9a02c" stroke-width="2"/>`
 : '';
  return `<svg width="${w}" height="${H}" viewBox="0 0 150 214" style="display:block">
    <defs>
      <linearGradient id="l35skin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${skin}"/><stop offset="1" stop-color="${skinD}"/></linearGradient>
      <linearGradient id="l35robe" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f8f0da"/><stop offset="1" stop-color="${robeD}"/></linearGradient>
    </defs>
    ${legs}
    <!-- хитон -->
    <path d="M59,58 L91,58 C99,60 101,66 101,73 L105,118 C105,128 96,130 88,130 L62,130 C54,130 45,128 45,118 L49,73 C49,66 51,60 59,58 Z" fill="url(#l35robe)"/>
    <path d="M66,58 L75,71 L84,58" fill="none" stroke="${robeD}" stroke-width="3.2"/>
    <path d="M63,62 C60,90 61,110 58,128" stroke="${fold}" stroke-width="2" fill="none" opacity=".8"/>
    <path d="M72,60 C72,92 72,112 72,126" stroke="${fold}" stroke-width="2" fill="none" opacity=".8"/>
    <path d="M81,62 C84,90 83,110 86,128" stroke="${fold}" stroke-width="2" fill="none" opacity=".8"/>
    <path d="M93,66 C96,88 95,110 94,124" stroke="${fold}" stroke-width="1.6" fill="none" opacity=".6"/>
    <path d="M57,66 C55,88 54,108 53,124" stroke="${fold}" stroke-width="1.6" fill="none" opacity=".6"/>
    <!-- гиматий через плечо -->
    <path d="M59,58 L88,58 L92,118 L78,126 L63,116 Z" fill="${drape}" opacity=".94"/>
    <path d="M88,60 L90,116" stroke="${drapeD}" stroke-width="2" fill="none" opacity=".7"/>
    <path d="M63,64 L64,110" stroke="${drapeD}" stroke-width="2" fill="none" opacity=".7"/>
    <!-- пояс -->
    <path d="M48,100 L102,100 L100,109 L50,109 Z" fill="${belt}"/>
    <rect x="71" y="97" width="8" height="13" rx="2" fill="${beltD}"/>
    <path d="M73,110 L70,118 M77,110 L80,118" stroke="${beltD}" stroke-width="2.4" stroke-linecap="round"/>
    <!-- руки -->
    ${armL}${armR}
    <circle cx="59" cy="60" r="6.5" fill="${robe}"/>
    <circle cx="91" cy="60" r="6.5" fill="${robe}"/>
    <!-- шея и голова -->
    <rect x="68" y="38" width="14" height="16" rx="5" fill="${skin}"/>
    <path d="M79,40 L80,53" stroke="${skinD}" stroke-width="2" opacity=".5"/>
    <circle cx="57" cy="28" r="3.6" fill="${skinD}"/>
    <circle cx="93" cy="28" r="3.6" fill="${skinD}"/>
    <circle cx="75" cy="25" r="16.6" fill="${skin}"/>
    <ellipse cx="69" cy="17.5" rx="5.5" ry="3" fill="rgba(255,255,255,.22)"/>
    <circle cx="62" cy="13" r="4" fill="#eef3f6"/>
    <circle cx="75" cy="10.5" r="4.2" fill="#f2f6f8"/>
    <circle cx="88" cy="13" r="4" fill="#eef3f6"/>
    <path d="M64,24 q5,-3.4 10,0" stroke="#ffffff" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M76,24 q5,-3.4 10,0" stroke="#ffffff" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <circle cx="69" cy="29.5" r="2.15" fill="#3c3c4a"/>
    <circle cx="81" cy="29.5" r="2.15" fill="#3c3c4a"/>
    <circle cx="69.8" cy="28.9" r=".75" fill="#fff"/>
    <circle cx="81.8" cy="28.9" r=".75" fill="#fff"/>
    <path d="M73,31 q2,5 -1,8" stroke="${skinD}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="64.5" cy="34.5" r="2.4" fill="rgba(224,120,90,.28)"/>
    <circle cx="85.5" cy="34.5" r="2.4" fill="rgba(224,120,90,.28)"/>
    <!-- борода -->
    <path d="M60,35 C56.5,45 61.5,54 66,59 C70,65 80,65 84,59 C88.5,54 93.5,45 90,35 C84,43 66,43 60,35 Z" fill="${beard}"/>
    <path d="M66,51 q4,3 8,0 M74,55 q5,2 8,-1" stroke="${beardD}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M62,37 q10,4 18,1" stroke="${beardD}" stroke-width="1.6" fill="none" opacity=".5"/>
    <!-- венок -->
    <path d="M58,15 Q75,1 92,15" stroke="#6f9e4a" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <g fill="#7aa54f"><ellipse cx="64" cy="9.5" rx="4" ry="1.9" transform="rotate(-38 64 9.5)"/>
      <ellipse cx="72" cy="6.2" rx="4" ry="1.9" transform="rotate(-12 72 6.2)"/>
      <ellipse cx="80" cy="5.8" rx="4" ry="1.9" transform="rotate(12 80 5.8)"/>
      <ellipse cx="87" cy="8.6" rx="4" ry="1.9" transform="rotate(38 87 8.6)"/></g>
    <circle cx="60" cy="14.5" r="1.5" fill="#d9a92e"/>
    <circle cx="90" cy="14" r="1.5" fill="#d9a92e"/>
    ${skis}
  </svg>`;
}
function l35WinterBg(w,h,gh){
  // зимний фон: небо, солнце, облако, далёкие холмы, снег-основа
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0">
    <defs>
      <linearGradient id="l35sky${w}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#b9ddf2"/><stop offset="1" stop-color="#e4f4fb"/></linearGradient>
      <linearGradient id="l35snow${w}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d6e7f2"/></linearGradient>
    </defs>
    <rect x="0" y="0" width="${w}" height="${h}" fill="url(#l35sky${w})"/>
    <circle cx="${w*.82}" cy="${h*.13}" r="13" fill="#fff3c4" opacity=".95"/>
    <circle cx="${w*.82}" cy="${h*.13}" r="13" fill="none" stroke="rgba(255,243,196,.55)" stroke-width="6"/>
    <g fill="#ffffff" opacity=".9">
      <ellipse cx="${w*.22}" cy="${h*.2}" rx="20" ry="8"/><ellipse cx="${w*.35}" cy="${h*.16}" rx="14" ry="7"/>
    </g>
    <g fill="#e3f1f9">
      <path d="M0,${gh+6} Q${w*.18},${gh-16} ${w*.38},${gh+2} T${w},${gh-8} L${w},${h} L0,${h} Z" opacity=".55"/>
    </g>
    <rect x="0" y="${gh}" width="${w}" height="${h-gh}" fill="url(#l35snow${w})"/>
    <path d="M0,${gh} Q${w*.2},${gh+5} ${w*.45},${gh} T${w},${gh+2}" stroke="rgba(255,255,255,.95)" stroke-width="3" fill="none"/>
  </svg>`;
}
function l35SinkPanel(w){
  // панель: Архимед провалился в снег ПО КОЛЕНО (сугроб до колен)
  const h=Math.round(w*1.32);
  const skyH=Math.round(h*.58);        // небо
  const fw=Math.round(w*.61);          // ширина фигуры
  const svgH=Math.round(fw*214/150);
  const svgTop=Math.round(h*.1);
  // уровень снега-сугроба у ног фигуры (колени чуть ниже кромки)
  const mdTop=Math.round(h*.56);
  return `<div style="position:relative;width:${w}px;height:${h}px;border-radius:14px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.25)">
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0">
      <defs>
        <linearGradient id="l35sks${w}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#bcdcf0"/><stop offset="1" stop-color="#e8f6fd"/></linearGradient>
        <linearGradient id="l35sns${w}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d3e5f1"/></linearGradient>
      </defs>
      <rect x="0" y="0" width="${w}" height="${h}" fill="url(#l35sks${w})"/>
      <circle cx="${Math.round(w*.8)}" cy="${Math.round(h*.1)}" r="10" fill="#fff3c4" opacity=".95"/>
      <circle cx="${Math.round(w*.8)}" cy="${Math.round(h*.1)}" r="10" fill="none" stroke="rgba(255,243,196,.5)" stroke-width="5"/>
      <g fill="#ffffff" opacity=".92">
        <ellipse cx="${Math.round(w*.24)}" cy="${Math.round(h*.14)}" rx="16" ry="7"/><ellipse cx="${Math.round(w*.36)}" cy="${Math.round(h*.11)}" rx="11" ry="6"/>
      </g>
      <!-- снег за фигурой -->
      <rect x="0" y="${skyH}" width="${w}" height="${h-skyH}" fill="url(#l35sns${w})"/>
    </svg>
    ${l35Flakes(8,h,false)}
    <!-- Архимед (полный рост), нижняя часть скрыта сугробом -->
    <div class="l35-land" style="position:absolute;left:${Math.round(w*.16)}px;top:${svgTop}px;width:${fw}px;z-index:2">${l35ArchSvg(fw,'up')}</div>
    <!-- сугроб до колен -->
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0;z-index:3">
      <defs><linearGradient id="l35mnd${w}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cfe2ef"/></linearGradient></defs>
      <path d="M0,${h} L0,${mdTop-6} Q${Math.round(w*.3)},${mdTop+10} ${Math.round(w*.75)},${mdTop-14} Q${w},${mdTop-8} ${w},${mdTop+2} L${w},${h} Z" fill="url(#l35mnd${w})"/>
      <path d="M0,${mdTop-6} Q${Math.round(w*.3)},${mdTop+10} ${Math.round(w*.75)},${mdTop-14} Q${w},${mdTop-8} ${w},${mdTop+2}" stroke="#f7fbff" stroke-width="4" fill="none" opacity=".9"/>
      <g fill="#ffffff" opacity=".95">
        ${[0,1,2,3,4,5].map(i=>`<circle cx="${Math.round(w*(.06+i*.16))}" cy="${Math.round(h*(.7+i*.045))}" r="${1.5+(i%2)}"/>`).join('')}
      </g>
    </svg>
    <div class="l35-puff" style="left:${Math.round(w*.34)}px;bottom:${h-mdTop-16}px;width:8px;height:8px;--px:-9px;--py:-14px;animation-delay:.5s;z-index:4"></div>
    <div class="l35-puff" style="left:${Math.round(w*.6)}px;bottom:${h-mdTop-20}px;width:7px;height:7px;--px:8px;--py:-11px;animation-delay:.66s;z-index:4"></div>
    <div class="l35-ring" style="left:${Math.round(w*.3)}px;bottom:${h-mdTop-6}px;width:22px;height:8px;animation-delay:.36s;z-index:4"></div>
  </div>`;
}
function l35SkiPanel(w){
  // панель: Архимед на лыжах скользит по снегу (виден в полный рост)
  const h=Math.round(w*1.24);
  const gh=Math.round(h*.86);
  const fw=Math.round(w*.62);
  const svgH=Math.round(fw*214/150);
  const skiBottom=Math.round((214-204)/214*svgH); // низ лыж выше низа svg на столько px
  const cssBottom=Math.max(0,(h-gh)-skiBottom);   // так лыжи стоят ровно на снегу
  return `<div style="position:relative;width:${w}px;height:${h}px;border-radius:14px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.25)">
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0">
      <defs>
        <linearGradient id="l35skk${w}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#bcdcf0"/><stop offset="1" stop-color="#e8f6fd"/></linearGradient>
        <linearGradient id="l35snn${w}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d3e5f1"/></linearGradient>
      </defs>
      <rect x="0" y="0" width="${w}" height="${h}" fill="url(#l35skk${w})"/>
      <circle cx="${Math.round(w*.82)}" cy="${Math.round(h*.12)}" r="11" fill="#fff3c4" opacity=".95"/>
      <circle cx="${Math.round(w*.82)}" cy="${Math.round(h*.12)}" r="11" fill="none" stroke="rgba(255,243,196,.5)" stroke-width="5"/>
      <g fill="#ffffff" opacity=".92">
        <ellipse cx="${w*.2}" cy="${h*.15}" rx="15" ry="6.5"/><ellipse cx="${w*.31}" cy="${h*.12}" rx="10" ry="5.5"/>
      </g>
      <g fill="#e3f1f9">
        <path d="M0,${gh+4} Q${w*.2},${gh-12} ${w*.5},${gh} T${w},${gh-6} L${w},${h} L0,${h} Z" opacity=".5"/>
      </g>
      <rect x="0" y="${gh}" width="${w}" height="${h-gh}" fill="url(#l35snn${w})"/>
      <path d="M0,${gh} Q${w*.25},${gh+4} ${w*.55},${gh} T${w},${gh+2}" stroke="#f7fbff" stroke-width="3" fill="none"/>
    </svg>
    ${l35Flakes(7,h,false)}
    <!-- снежная пыль за лыжами -->
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0;z-index:2">
      <g fill="#fff" opacity=".9">
        <ellipse cx="${w*.13}" cy="${gh+3}" rx="${w*.08}" ry="2.6"/>
        <ellipse cx="${w*.2}" cy="${gh+1}" rx="${w*.05}" ry="1.8"/>
        <ellipse cx="${w*.05}" cy="${gh+5}" rx="${w*.04}" ry="1.5"/>
      </g>
    </svg>
    <div class="l35-glide" style="position:absolute;left:${Math.round(w*.32)}px;bottom:${cssBottom}px;width:${fw}px;z-index:3">${l35ArchSvg(fw,'ski')}</div>
  </div>`;
}
function l35Duel(){
  // шаг 0: оба состояния Архимеда
  return `<div style="display:flex;gap:8px;justify-content:center;align-items:flex-start;flex-wrap:wrap">
    <div style="text-align:center">
      ${l35SinkPanel(152)}
      <div style="margin-top:4px"><span style="background:rgba(232,106,90,.16);border:1px solid rgba(232,106,90,.6);border-radius:9px;padding:2px 9px;font-size:12px;color:#f0a89a;font-weight:bold">👢 по колено в снегу!</span></div>
    </div>
    <div style="text-align:center">
      ${l35SkiPanel(152)}
      <div style="margin-top:4px"><span style="background:rgba(127,209,160,.14);border:1px solid rgba(127,209,160,.6);border-radius:9px;padding:2px 9px;font-size:12px;color:#9fe8c0;font-weight:bold">🎿 на лыжах — скользит!</span></div>
    </div>
  </div>`;
}
function l35BrickScene(orient, F, showP){
  // кирпич на снегу (детально): широкая грань vs узкий торец
  const W=300, H=196;
  const S = orient==='narrow'? 0.5 : 2;
  const p = Math.round(F/S);
  const snowBase=54;
  const snowH=Math.max(15, Math.round(snowBase - p*0.3));
  const narrow=orient==='narrow';
  const bw=narrow?46:168, bh=narrow?94:44;
  const brickTop=H-snowH-bh-4;
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.25)">
    ${l35WinterBg(W,H,snowH-6)}
    ${l35Flakes(9,H,false)}
    <!-- снег под кирпичом -->
    <div style="position:absolute;left:0;right:0;bottom:0;height:${snowH}px;background:linear-gradient(180deg,#ffffff,#d3e5f0);box-shadow:inset 0 -6px 10px rgba(140,180,205,.25)"></div>
    <div style="position:absolute;left:${Math.round((W-bw)/2-6)}px;bottom:${snowH-3}px;width:${bw+12}px;height:7px;background:rgba(90,120,150,.35);border-radius:50%;filter:blur(3px)"></div>
    <div class="l35-brickdrop" style="position:absolute;left:${Math.round((W-bw)/2)}px;top:${brickTop}px;width:${bw}px;z-index:3">${l35Brick(bw,bh)}</div>
    ${narrow?`<div class="l35-ring" style="left:${Math.round((W-bw)/2-12)}px;bottom:${snowH-2}px;width:${bw+24}px;height:11px;animation-delay:.3s;z-index:4"></div>
      <div class="l35-puff" style="left:${Math.round((W-bw)/2-8)}px;bottom:${snowH+8}px;width:8px;height:8px;--px:-12px;--py:6px;animation-delay:.5s;z-index:4"></div>
      <div class="l35-puff" style="left:${Math.round((W-bw)/2+bw+2)}px;bottom:${snowH+6}px;width:7px;height:7px;--px:12px;--py:4px;animation-delay:.62s;z-index:4"></div>`:''}
    <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:3px;z-index:5">
      <span style="background:rgba(16,48,76,.55);border-radius:9px;padding:2px 10px;font-size:12px;color:#fff;font-weight:bold;white-space:nowrap">${narrow?'на торце — продавил снег!':'плашмя — почти не продавил'}</span>
    </div>
    ${showP?`<div style="position:absolute;top:4px;left:50%;transform:translateX(-50%);z-index:5;font-size:15px;color:#0d3a5c;font-weight:bold;text-shadow:0 1px 0 rgba(255,255,255,.6)">p = ${F} : ${S} = ${p} Па</div>`:''}
  </div>`;
}
function l35UnitTile(w){
  // плитка 1 м² с силой 1 Н — визуал паскаля
  return `<div style="position:relative;width:${w}px;height:${w}px;margin:0 auto">
    <svg width="${w}" height="${w}" viewBox="0 0 120 120" style="display:block">
      <defs><linearGradient id="l35tile" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#cfe4f2"/></linearGradient></defs>
      <rect x="12" y="12" width="96" height="96" rx="9" fill="url(#l35tile)" stroke="#8fb0c6" stroke-width="2.5" stroke-dasharray="7 5"/>
      <path d="M6,58 L120,58 M58,6 L58,120" stroke="rgba(143,176,198,.4)" stroke-width="1.5" stroke-dasharray="3 5"/>
      <text x="60" y="100" text-anchor="middle" font-size="15" font-weight="bold" fill="#2f6a92">1 м²</text>
    </svg>
    <div style="position:absolute;left:50%;top:-8px;transform:translateX(-50%);text-align:center">
      <div class="l35-press" style="font-size:24px;line-height:1.1">⬇</div>
      <div style="font-size:12px;color:#fff;font-weight:bold;background:#e0523d;border-radius:7px;padding:1px 6px;display:inline-block">1 Н</div>
    </div>
  </div>`;
}
function l35FootPanels(){
  // шаг 1: разрезы снега: ботинок — глубоко, лыжа — мелко
  const mk=(narrow)=>{
    const W=narrow?96:148,H=136;
    const deep=narrow;
    return `<div style="position:relative;width:${W}px;height:${H}px;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.22);background:linear-gradient(180deg,#e6f4fb,#ffffff)">
      <!-- небо/воздух -->
      <!-- снег -->
      <div style="position:absolute;left:0;right:0;bottom:0;height:${H-24}px;background:linear-gradient(180deg,#f4f9fd,#d3e4f0)"></div>
      <div style="position:absolute;left:0;right:0;bottom:${H-24}px;height:5px;background:#ffffff"></div>
      ${deep?`<div style="position:absolute;left:50%;transform:translateX(-50%);top:${H-100}px;bottom:0;width:34px;background:linear-gradient(180deg,#fff,#e6f0f8);border-radius:4px 4px 0 0"></div>`:''}
      ${narrow
        ? `<div style="position:absolute;left:50%;transform:translateX(-50%);bottom:${H-92}px;width:24px;height:15px;background:#5a3a2a;border-radius:5px 5px 8px 8px;z-index:2"></div>
           <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:${H-98}px;width:30px;height:7px;background:#3f2818;border-radius:4px;z-index:2"></div>`
        : `<div style="position:absolute;left:50%;transform:translateX(-50%);bottom:${H-40}px;width:128px;height:10px;background:linear-gradient(180deg,#c0533c,#963f2e);border-radius:6px;z-index:2"></div>
           <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:${H-44}px;width:136px;height:4px;background:rgba(120,140,160,.25);border-radius:50%;z-index:2"></div>`}
      <div style="position:absolute;left:50%;transform:translateX(-50%);top:5px;font-size:11px;color:#1a4a6a;font-weight:bold;text-shadow:0 1px 0 #fff;white-space:nowrap">${narrow?'площадь мала':'площадь велика'}</div>
      <div class="l35-press" style="position:absolute;left:${narrow?6:10}px;top:8px;font-size:15px;color:#e0523d;font-weight:bold;z-index:3">⬇ вес</div>
    </div>`;
  };
  return `<div style="display:flex;gap:9px;justify-content:center;align-items:flex-start;flex-wrap:wrap">
    <div style="text-align:center">${mk(true)}<div style="margin-top:3px;font-size:11px;color:#e0523d;font-weight:bold">след глубокий</div></div>
    <div style="text-align:center">${mk(false)}<div style="margin-top:3px;font-size:11px;color:#3a9a5a;font-weight:bold">след мелкий</div></div>
  </div>`;
}
function l37Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  switch(act){
    case 'roll': st.roll=1; break;
    case 'up': st.roll=0; break;
    case 'm+': st.m=Math.min(10,(st.m==null?2:st.m)+1); break;
    case 'm-': st.m=Math.max(1,(st.m==null?2:st.m)-1); break;
    case 'h+': st.h=Math.min(10,(st.h==null?5:st.h)+1); break;
    case 'h-': st.h=Math.max(1,(st.h==null?5:st.h)-1); break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l37Ball(r){
  // мячик с бликом
  const rr=r||13;
  return `<svg width="${rr*2}" height="${rr*2}" viewBox="0 0 ${rr*2} ${rr*2}">
    <circle cx="${rr}" cy="${rr}" r="${rr-1}" fill="#e0523d" stroke="#7a1a10" stroke-width="1.5"/>
    <ellipse cx="${rr-rr*.38}" cy="${rr-rr*.38}" rx="${rr*.32}" ry="${rr*.22}" fill="rgba(255,255,255,.55)"/>
  </svg>`;
}
function l37Skittle(){
  // кегля
  return `<svg width="26" height="46" viewBox="0 0 26 46">
    <path d="M8,2 a5,5 0 0 1 10,0 L20,20 a9,9 0 0 1 0,16 L6,36 a9,9 0 0 1 0,-16 Z" fill="#f4f4ee" stroke="#9a94a0" stroke-width="1.5"/>
    <path d="M7,16 a11,11 0 0 1 12,0" stroke="#e0523d" stroke-width="3" fill="none"/>
  </svg>`;
}
function l37Scene(p, hit, opts){
  // горка: мяч катится по наклонной; p=0 верх, p=1 низ
  const o=opts||{};
  const W=252, H=150;
  const topX=34, topY=22, botX=206, botY=100; // линия ската
  const x=topX+(botX-topX)*p, y=topY+(botY-topY)*p;
  const ballR=13;
  const dur=o.dur||'1.3s';
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:14px;overflow:hidden;
      background:linear-gradient(180deg,#aee0f5 0%,#d8f0fa 55%,#7fb87a 55%,#5d9c4a 100%)">
    <!-- солнце -->
    <div style="position:absolute;right:10px;top:8px;width:26px;height:26px;border-radius:50%;background:#ffd94a;box-shadow:0 0 14px rgba(255,217,74,.7)"></div>
    <!-- горка (наклонная) -->
    <svg width="${W}" height="${H}" style="position:absolute;inset:0">
      <polygon points="${topX-14},${topY+20} ${topX},${topY} ${botX},${botY} ${botX},${botY+22}" fill="#b08968"/>
      <line x1="${topX-2}" y1="${topY-2}" x2="${botX+2}" y2="${botY+2}" stroke="#8a6f4d" stroke-width="5"/>
      <line x1="${topX-2}" y1="${topY-2}" x2="${botX+2}" y2="${botY+2}" stroke="#c9a878" stroke-width="2.5"/>
    </svg>
    <!-- мяч: если o.slide — анимация спуска от вершины к этой точке -->
    ${o.slide
      ? `<div class="l37-slide" style="position:absolute;left:${x-ballR}px;top:${y-ballR-14}px;z-index:3;--sx:${-(botX-topX)}px;--sy:${-(botY-topY)}px">${l37Ball(ballR)}</div>`
      : `<div style="position:absolute;left:${x-ballR}px;top:${y-ballR-14}px;z-index:3">${l37Ball(ballR)}</div>`}
    <!-- кегля: падает с задержкой (когда мяч приехал) -->
    <div style="position:absolute;left:${botX+16}px;top:${botY-44}px;transform-origin:50% 100%;transform:${hit?'rotate(70deg) translateY(6px)':''};transition:transform .4s ease-in ${hit?'1s':''};z-index:2">${l37Skittle()}</div>
    ${o.mark?`<div style="position:absolute;left:${o.mark.x}px;top:${o.mark.y}px;font-size:11px;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.6);font-weight:bold">${o.mark.t}</div>`:''}
  </div>`;
}
function l37Bars(p, animate){
  // полоски энергии: зелёная (потенциальная) и оранжевая (кинетическая)
  const ep=Math.round((1-p)*100), ek=Math.round(p*100);
  const bar=(lab,col,val,animTo,animCls)=>{
    const inner = animate
      ? `width:100%;transform-origin:left center;animation:${animCls} 1.3s cubic-bezier(.4,0,.8,1) both;`
      : `width:${val}%;`;
    return `<div style="display:flex;align-items:center;gap:6px;margin:2px 0">
      <span style="font-size:10.5px;color:#cbb89a;width:76px;text-align:right">${lab}</span>
      <div style="flex:1;height:12px;background:rgba(0,0,0,.3);border-radius:6px;overflow:hidden">
        <div style="height:100%;${inner}background:${col}"></div></div>
      <span style="font-size:11px;color:#e8e0cc;width:36px;font-weight:bold">${val}%</span></div>`;
  };
  return `<div style="width:232px;margin:0 auto">${bar('потенциальная','#7fd1a0',ep,0,'l37Shrink')}${bar('кинетическая','#f0a35a',ek,100,'l37Grow')}</div>`;
}
function visL48(el){
  // Урок 48 «Архимедова сила»: легенда о короне Гиерона и «Эврика!»
  try{
    const L=lessonById(LV.id); if(!L){ el.innerHTML=''; return; }
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    window.LK48=lk;
    const step=LV.step||0;
    const col=(...ps)=>`<div class="wv-col">${ps.join('')}</div>`;
    const big=(t,ex)=>`<div class="wv-big" ${ex||''}>${t}</div>`;
    const sml=(t)=>`<div class="wv-sml">${t}</div>`;
    const btns=(...bs)=>`<div class="wv-row">${bs.join('')}</div>`;
    const btn=(txt,on,extra)=>`<button class="hint-btn" onclick="${on}" ${extra||''}>${txt}</button>`;
    const chip=(t,c)=>`<span style="display:inline-block;padding:2px 10px;border-radius:9px;background:rgba(127,209,255,.07);border:1px solid ${c||'rgba(127,184,160,.5)'};font-size:15px;color:#d8ecff;margin:2px">${t}</span>`;
    const rowC=(...ps)=>`<div style="display:flex;gap:14px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${ps.join('')}</div>`;
    let h='';
    if(step===0){
      h=col(big('Корона царя Гиерона'),
        `<div style="position:relative;width:190px;height:160px;margin:2px auto;border-radius:16px;overflow:hidden;
            background:radial-gradient(circle at 50% 28%,#34465c 0%,#1b2532 78%)">
          <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 20%,rgba(255,215,140,.14),transparent 55%)"></div>
          <div style="position:absolute;left:50%;transform:translateX(-50%);top:4px;filter:drop-shadow(0 6px 9px rgba(0,0,0,.55));z-index:2">${l48Crown(112)}</div>
          <!-- бархатная подушка -->
          <div style="position:absolute;left:50%;transform:translateX(-50%);top:104px;width:132px;height:16px;border-radius:50%;
            background:radial-gradient(ellipse at 50% 35%,#b0455a,#7c2438 70%)"></div>
          <div style="position:absolute;left:50%;transform:translateX(-50%);top:107px;width:104px;height:6px;border-radius:50%;
            background:rgba(0,0,0,.35)"></div>
          <!-- колонна-пьедестал -->
          <div style="position:absolute;left:50%;transform:translateX(-50%);top:116px;width:56px;height:28px;border-radius:3px 3px 10px 10px;
            background:linear-gradient(180deg,#7a5a34,#5c4024 60%,#4a3220);box-shadow:inset 4px 0 6px rgba(255,220,170,.18)"></div>
          <div style="position:absolute;left:50%;transform:translateX(-50%);top:140px;width:86px;height:12px;border-radius:4px;
            background:linear-gradient(180deg,#6a4c2c,#4e3820)"></div>
          <!-- отражение на полу -->
          <div style="position:absolute;left:50%;transform:translateX(-50%);top:150px;width:120px;height:6px;border-radius:50%;
            background:rgba(0,0,0,.45)"></div>
        </div>`+
        big('золотая ли она на самом деле?')+
        sml('ювелир мог подменить часть золота серебром. проверить, не ломая корону? — эту задачу дали Архимеду'));
    } else if(step===1){
      const dip=!!st.dip3;
      h=col(big('Эврика!'),
        l48BathFull(dip)+
        (dip
          ? big('💦 Вода выплеснулась! Эврика!')
          : big('потяни корону в полную ванну')+
            btn('✨ (или просто нажми «опустить»)', `l48Act('${lk}','dip3')`))+
        (dip? sml('объём тела = объём вытесненной воды — так Архимед измерил корону!') : sml('Архимед: вода выплеснется ровно на объём короны!')));
    } else if(step===2){
      // опускаем корону в мензурку: 150 мл → 350 мл (вытеснено 200 мл)
      const dip=!!st.dip2;
      const p=(dip?350:150)/400;              // вся шкала 0–400 мл
      const bottom=dip?14:74;                  // dip: на дне под водой; иначе висит над водой на нити
      h=col(big('Измеряем корону'),
        l48Cylinder(p, l48Crown(56), {bottom, thread:!dip, bodyH:50})+
        (dip? big('вытеснено 200 мл!') : btn('🔱 опустить корону', `l48Act('${lk}','dip2')`))+
        sml('сколько воды вытеснила корона — таков её объём. корона цела!'));
    } else if(step===3){
      h=col(big('Сила Архимеда'),
        `<div style="display:flex;gap:8px;justify-content:center;align-items:center;margin:4px 0">
          <div style="font-size:36px">🍎</div><div style="font-size:26px;color:#7fd1ff">⬆</div><div style="font-size:30px">🌊</div></div>`+
        big('вода толкает тело вверх!')+
        sml('выталкивающая сила, или сила Архимеда — она равна весу вытесненной жидкости'));
    } else if(step===4){
      h=col(big('Формула'),
        `<div style="font-size:30px;color:var(--brass);font-family:Georgia,serif">F = ρ·g·V</div>`+
        `<div style="font-size:17px;color:#d8ecff">или F = m(вытесненной воды) · g</div>`+
        sml('V — объём погружённой части тела. больше вытеснил — сильнее толкает!'));
    } else if(step===5){
      h=col(big('Разбираем на числах'),
        `<div class="wv-row">${chip('V = 2 л','rgba(127,209,255,.5)')} ${chip('вытеснил 2 кг воды','rgba(127,184,160,.5)')}</div>`+
        l48Cylinder(0.5, l48CubeBody(0.5), {label:'дерево в воде', imm:18})+
        `<div style="font-size:19px" class="wv-pop">F = m·g = 2 · 10 = 20 Н</div>`+
        sml('вода толкает дерево вверх с силой 20 Н'));
    } else if(step===6){
      h=col(big('Всплывает или тонет?'),
        rowC(
          `<div style="text-align:center;width:120px;border:2px solid rgba(127,209,160,.5);border-radius:12px;padding:6px"><div style="font-size:13px">Fa &gt; вес</div><div style="font-size:22px">⬆</div><b>всплывает</b></div>`+
          `<div style="text-align:center;width:120px;border:2px solid rgba(232,106,90,.5);border-radius:12px;padding:6px"><div style="font-size:13px">Fa &lt; вес</div><div style="font-size:22px">⬇</div><b>тонет</b></div>`+
          `<div style="text-align:center;width:120px;border:2px solid rgba(127,209,255,.5);border-radius:12px;padding:6px"><div style="font-size:13px">Fa = вес</div><div style="font-size:22px">⏺</div><b>плавает внутри</b></div>`)+
        sml('сравни выталкивающую силу с весом тела!'));
    } else if(step===7){
      h=col(big('Опыт в аквариуме'),
        l33Bath([
          {mat:'пробка',swim:true,x:'20%',delay:.2,size:50},
          {mat:'дерево',swim:true,x:'38%',delay:.5,size:52},
          {mat:'лёд',swim:true,x:'70%',delay:.8,size:48},
          {mat:'железо',swim:false,x:'52%',delay:1.1,size:58}
        ],{h:160,w:250})+
        sml('пробка, дерево и лёд легче воды — Fa выталкивает их. железо тяжелее — тонет'));
    } else if(step===8){
      h=col(big('Почему корабль плавает?'),
        `<div style="display:flex;gap:10px;justify-content:center;align-items:center;margin:2px 0">
          <div style="text-align:center">${l33BoatSvg(140)}</div>
        </div>`+
        big('корпус вытесняет много воды → Fa огромная')+
        sml('сила Архимеда больше веса корабля — и он держится на воде!'));
    } else if(step===9){
      h=col(big('Айсберг'),
        `<svg width="200" height="140" viewBox="0 0 200 140" style="display:block;margin:0 auto">
          <rect x="0" y="60" width="200" height="80" fill="#2a5f9e"/>
          <path d="M0,70 L30,55 L70,62 L110,40 L160,58 L200,50 L200,80 L0,80 Z" fill="#bfe0f0"/>
          <path d="M0,72 L40,66 L90,72 L140,60 L200,66 L200,140 L0,140 Z" fill="#2a5f9e" opacity=".9"/>
          <path d="M50,66 L70,70 L60,64 Z" fill="#fff" opacity=".5"/>
          <path d="M120,60 L150,70 L138,60 Z" fill="#fff" opacity=".4"/>
          <text x="100" y="88" text-anchor="middle" font-size="12" fill="#fff" font-weight="bold">9/10 под водой!</text>
        </svg>`+
        big('видна только макушка!')+sml('лёд чуть легче воды — под водой прячется около 9/10 айсберга'));
    } else if(step===10){
      h=col(big('Разбираем задачку'),
        `<div class="wv-row">${chip('вытеснил 2 кг воды','rgba(127,184,160,.5)')} ${chip('g = 10','rgba(217,164,65,.5)')}</div>`+
        `<div style="font-size:20px" class="wv-pop">F = m·g = 2 · 10</div>`+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">F = 20 Н ✓</div>`+
        sml('такой вопрос будет дальше!'));
    } else if(step===11){
      // тренажёр: вес тела vs вытесненная вода
      if(st.w==null) st.w=4; if(st.b==null) st.b=3;  // w = кг вытесненной воды, b = кг вес тела
      const Fa=st.w*10, Wt=st.b*10;
      const state = Fa>Wt ? 'up' : Fa<Wt ? 'down' : 'mid';
      const yy = state==='up'? 108 : state==='down'? 8 : 58;
      h=col(big('Тренажёр: всплывёт или утонет?'),
        `<div class="wv-row">${chip('вода вытеснена: '+st.w+' кг','rgba(127,184,160,.5)')} ${chip('вес тела: '+st.b+' кг','rgba(232,106,90,.5)')}</div>`+
        `<div style="position:relative;width:230px;height:170px;margin:0 auto;border-radius:14px;overflow:hidden;background:linear-gradient(180deg,#d8f0fa,transparent 40%,#9fc5e8 40%,#5d9fd6)">
          <div style="position:absolute;left:8px;right:8px;top:40%;height:3px;background:rgba(255,255,255,.7);border-radius:2px"></div>
          <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:${yy}px;transition:bottom .6s ease;z-index:3;width:56px">${l33CubeSvg(state==='down'?'железо':'пробка',56)}</div>
          <div style="position:absolute;top:2px;left:8px;font-size:10px;color:#1a3a55">вода</div>
          <div style="position:absolute;right:6px;top:2px;font-size:15px;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.5)">${state==='up'?'⬆ всплывает':state==='down'?'⬇ тонет':'⏺ плавает'}</div>
        </div>`+
        `<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:2px 0">
          <span style="background:rgba(127,209,160,.12);border:1px solid rgba(127,209,160,.5);border-radius:9px;padding:3px 10px;font-size:17px;color:#9fe8c0">⬆ Fa = ${Fa} Н</span>
          <span style="background:rgba(232,106,90,.12);border:1px solid rgba(232,106,90,.5);border-radius:9px;padding:3px 10px;font-size:17px;color:#f0a89a">⬇ вес = ${Wt} Н</span></div>`+
        btns(btn('+1 кг воды выт.',`l48Act('${lk}','w+')`),btn('−1 кг',`l48Act('${lk}','w-')`),btn('+1 кг веса',`l48Act('${lk}','b+')`),btn('−1 кг',`l48Act('${lk}','b-')`),btn('↺',`l48Act('${lk}','r')`))+
        sml(Fa>Wt?'Fa больше веса — тело всплывает!':'Fa меньше веса — тонет. добавь вытесненной воды!'));
    } else {
      // памятка
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:320px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.7">
          🛁 <b>Эврика!</b> объём тела = объём вытесненной воды.<br>
          ⬆ Сила Архимеда толкает вверх: <b>F = m(выт.)·g = ρ·g·V</b>.<br>
          🚢 Fa &gt; вес — всплывает · Fa &lt; вес — тонет.<br>
          🧊 Айсберг прячет под водой 9/10 объёма!</div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там дерево вытеснило 2 кг воды'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}
function l34Scene0(dropped){
  // Детальная сцена «яблоня Ньютона»: небо, солнце, облако, трава, дерево с яблоками.
  // Падающее яблоко: до клика висит на ветке; после — падает на землю (анимация), 💥 в момент удара.
  const W=258, H=210;
  const GROUND=152;                 // верх травы
  const appleH=40;
  const fallY=GROUND-appleH+4;      // яблоко чуть «в траве» — лежит на земле
  const tree=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0;z-index:1">
    <!-- небо -->
    <defs><linearGradient id="l34sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8ec9f0"/><stop offset="1" stop-color="#cfeaf9"/></linearGradient></defs>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#l34sky)"/>
    <!-- трава -->
    <rect x="0" y="${GROUND}" width="${W}" height="${H-GROUND}" fill="#5d9c4a"/>
    <rect x="0" y="${GROUND}" width="${W}" height="7" fill="#71b35a"/>
    ${[12,36,62,88,120,150,182,214,244].map(x=>`<path d="M${x},${GROUND+6} q3,-6 6,0" stroke="#4a8a3a" stroke-width="2" fill="none"/>`).join('')}
    <!-- солнце -->
    <circle cx="222" cy="26" r="16" fill="#ffd94a"/>
    <circle cx="222" cy="26" r="16" fill="none" stroke="rgba(255,217,74,.5)" stroke-width="5"/>
    <!-- облако -->
    <g fill="#fff" opacity=".92">
      <ellipse cx="54" cy="34" rx="24" ry="10"/>
      <ellipse cx="76" cy="30" rx="18" ry="9"/>
      <ellipse cx="38" cy="30" rx="16" ry="8"/>
    </g>
    <!-- ствол -->
    <path d="M128,120 Q124,${GROUND+16} 122,${GROUND+40} L144,${GROUND+40} Q146,${GROUND+12} 142,120 Z" fill="#7a4a24"/>
    <path d="M126,128 Q128,${GROUND+20} 130,${GROUND+34}" stroke="#5a3318" stroke-width="3" fill="none" opacity=".7"/>
    <path d="M140,126 Q138,${GROUND+18} 136,${GROUND+32}" stroke="#8a5a2e" stroke-width="3" fill="none" opacity=".6"/>
    <!-- ветки -->
    <path d="M136,110 Q160,100 178,102" stroke="#7a4a24" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M134,116 Q108,104 92,108" stroke="#7a4a24" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M140,104 Q150,86 160,80" stroke="#6a3f1c" stroke-width="5" fill="none" stroke-linecap="round"/>
    <!-- крона -->
    <circle cx="128" cy="74" r="34" fill="#4a9a3a"/>
    <circle cx="160" cy="66" r="30" fill="#5aa848"/>
    <circle cx="100" cy="80" r="28" fill="#4a9a3a"/>
    <circle cx="178" cy="82" r="26" fill="#5aa848"/>
    <circle cx="132" cy="58" r="24" fill="#63b051"/>
    <circle cx="148" cy="90" r="22" fill="#3f8f2f"/>
    <!-- блики на листве -->
    <circle cx="122" cy="64" r="10" fill="rgba(255,255,255,.12)"/>
    <circle cx="165" cy="58" r="8" fill="rgba(255,255,255,.12)"/>
    <!-- яблоки на дереве -->
    <circle cx="108" cy="96" r="7" fill="#e23b2e"/><circle cx="105" cy="94" r="2" fill="rgba(255,255,255,.4)"/>
    <circle cx="172" cy="78" r="6.5" fill="#d92f22"/><circle cx="170" cy="76" r="2" fill="rgba(255,255,255,.4)"/>
    <circle cx="146" cy="74" r="6" fill="#e23b2e"/><circle cx="144" cy="72" r="2" fill="rgba(255,255,255,.4)"/>
    <circle cx="128" cy="96" r="6.5" fill="#c92f22"/>
  </svg>`;
  // падающее яблоко: конечная точка на земле; если dropped — анимация падения сверху
  const appleEl = dropped
    ? `<div class="l34-fall" style="position:absolute;left:176px;top:${fallY}px;z-index:3;--fy:-${116-fallY}px;width:${appleH}px">${l34AppleSVG(appleH)}</div>
       <div style="position:absolute;left:176px;top:${GROUND-3}px;z-index:2;width:40px;height:7px;border-radius:50%;background:rgba(0,0,0,.3);filter:blur(2px)"></div>
       <div class="l34-boom" style="position:absolute;left:196px;top:${fallY-10}px;z-index:3;font-size:26px;line-height:1">💥</div>
       <div class="l34-boom" style="position:absolute;left:164px;top:${fallY-4}px;z-index:3;font-size:15px;line-height:1;animation-delay:1s">✦</div>`
    : `<div style="position:absolute;left:172px;top:66px;z-index:3;width:${appleH}px;filter:drop-shadow(0 2px 2px rgba(0,0,0,.3))">${l34AppleSVG(appleH)}</div>`;
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.3)">
    ${tree}${appleEl}
  </div>`;
}
function visL34(el){
  // Урок 34 «Сила тяжести и вес»: сюжет «Яблоко Ньютона»
  try{
    const L=lessonById(LV.id); if(!L){ el.innerHTML=''; return; }
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    window.LK48=lk;
    const step=LV.step||0;
    const col=(...ps)=>`<div class="wv-col">${ps.join('')}</div>`;
    const big=(t,ex)=>`<div class="wv-big" ${ex||''}>${t}</div>`;
    const sml=(t)=>`<div class="wv-sml">${t}</div>`;
    const btns=(...bs)=>`<div class="wv-row">${bs.join('')}</div>`;
    const btn=(txt,on,extra)=>`<button class="hint-btn" onclick="${on}" ${extra||''}>${txt}</button>`;
    const chip=(t,c)=>`<span style="display:inline-block;padding:2px 10px;border-radius:9px;background:rgba(127,209,255,.07);border:1px solid ${c||'rgba(127,184,160,.5)'};font-size:15px;color:#d8ecff;margin:2px">${t}</span>`;
    const rowC=(...ps)=>`<div style="display:flex;gap:14px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${ps.join('')}</div>`;
    const girya=(kg,w)=>`<svg width="${w||64}" height="${Math.round((w||64)*.9)}" viewBox="0 0 80 72" style="display:block">
      <path d="M28,6 a12,12 0 0 1 24,0 L52,20 a14,14 0 0 1 14,14 L66,58 a10,10 0 0 1 -10,10 L24,68 a10,10 0 0 1 -10,-10 L14,34 a14,14 0 0 1 14,-14 Z" fill="#8a94a2" stroke="#3a3f47" stroke-width="2"/>
      <rect x="34" y="26" width="12" height="18" rx="3" fill="#5c6672"/>
      <text x="40" y="47" text-anchor="middle" font-size="15" font-weight="bold" fill="#fff">${kg}</text>
    </svg>`;
    let h='';
    if(step===0){
      const dropped=!!st.fall;
      h=col(big('Легенда о яблоке Ньютона'),
        l34Scene0(dropped)+
        (dropped
          ? big('Бам! Яблоко упало на землю!')+sml('его притянула Земля — так родилась наука о силах. Почему вниз? Смотри дальше ➜')
          : big('почему яблоко падает вниз?')+
            btn('🍎 уронить яблоко', `l34Act('${lk}','drop')`)+
            sml('Ньютон задумался… нажми и увидишь!'))
      );
    } else if(step===1){
      h=col(big('Сила тяжести'),
        `<div style="display:flex;gap:10px;justify-content:center;align-items:center;margin:4px 0">
          <div style="text-align:center">${girya(5,64)}<div style="font-size:11px;color:#7fa88f">груз 5 кг</div></div>
          <div style="font-size:34px;color:#e86a5a;animation:wvPulse 1s infinite">⬇</div>
          <div style="text-align:center">${l34Earth(64)}<div style="font-size:11px;color:#7fd1ff">Земля</div></div>
        </div>`+
        big('Земля притягивает всё — это сила тяжести')+
        sml('направлена вниз, к центру Земли. Даже лежащее яблоко Земля тянет!'));
    } else if(step===2){
      h=col(big('Считаем по формуле'),
        `<div style="font-size:40px;color:var(--brass);font-family:Georgia,serif">F = m · g</div>`+
        rowC(
          `<div style="text-align:center">${girya(1,60)}<div style="font-size:12px;color:#7fa88f">1 кг</div></div>`+
          `<div style="font-size:28px;color:#cbb89a">×</div>`+
          `<div style="text-align:center"><div style="font-size:26px">🌍</div><div style="font-size:12px;color:#7fd1ff">g ≈ 10</div></div>`+
          `<div style="font-size:28px;color:#cbb89a">=</div>`+
          `<div style="font-size:30px;color:#7fd1a0;font-weight:bold">10 Н</div>`)+
        sml('g = 10 Н/кг — каждый килограмм Земля тянет с силой 10 Н'));
    } else if(step===3){
      h=col(big('Разбираем на числах'),
        rowC(girya(5,84))+
        `<div style="display:flex;flex-direction:column;gap:4px;margin:4px 0;font-size:20px">
          <div class="wv-pop">F = m · g = 5 · 10</div>
          <div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">F = 50 Н</div></div>`+
        sml('5 кг давят на опору с силой 50 Н — как 5-литровая канистра воды'));
    } else if(step===4){
      h=col(big('Вес — давление на опору'),
        `<div style="position:relative;width:230px;height:130px;margin:2px auto">
          <div style="position:absolute;left:8px;right:8px;bottom:34px;height:6px;background:#8a6f4d;border-radius:3px"></div>
          <div style="position:absolute;left:40px;right:40px;bottom:34px;height:4px;background:#b08968"></div>
          <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:40px;z-index:2;width:56px">${l34AppleSVG(56)}</div>
          <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:88px;font-size:26px;color:#7fd1a0">⬆</div>
          <div style="position:absolute;left:16px;bottom:12px;font-size:11px;color:#7fd1a0">опора держит</div>
          <div style="position:absolute;right:6px;bottom:44px;font-size:20px;color:#e86a5a">⬇</div>
          <div style="position:absolute;right:10px;top:6px;font-size:11px;color:#e89a8f">сила тяжести</div>
        </div>`+
        big('вес — с какой силой тело давит на опору')+
        sml('в покое вес = силе тяжести. яблоко давит на стол с силой ≈ 1 Н'));
    } else if(step===5){
      h=col(big('Измеряем динамометром'),
        `<div style="display:flex;gap:12px;justify-content:center;align-items:flex-end">
          ${l34Dyn(50,5,'Земля',96)}
          <div style="max-width:120px;text-align:left"><div style="font-size:14px;color:#cbb89a">груз 5 кг</div><div style="font-size:13px;color:#7fa88f">пружина растянута стрелкой на 50 Н</div></div>
        </div>`+
        sml('динамометр — прибор для измерения силы. чем тяжелее груз, тем сильнее пружина'));
    } else if(step===6){
      h=col(big('Масса ≠ вес'),
        rowC(
          `<div style="text-align:center;width:120px;border:2px solid rgba(127,184,160,.4);border-radius:12px;padding:8px"><div style="font-size:22px">⚖️</div><b>Масса</b><div class="wv-sml" style="font-size:11px">сколько вещества<br>всегда одинакова</div><div style="color:#7fd1a0">кг</div></div>`+
          `<div style="text-align:center;width:120px;border:2px solid rgba(232,106,90,.45);border-radius:12px;padding:8px"><div style="font-size:22px">💪</div><b>Вес</b><div class="wv-sml" style="font-size:11px">сила на опору<br>зависит от места</div><div style="color:#e89a8f">Н</div></div>`)+
        sml('килограммы и ньютоны — разные вещи!'));
    } else if(step===7){
      h=col(big('А на Луне?'),
        rowC(
          `<div style="text-align:center">${l34Earth(60)}<div style="font-size:12px;color:#7fd1ff">Земля · g=10</div></div>`+
          `<div style="text-align:center">${l34Moon(60)}<div style="font-size:12px;color:#cbb89a">Луна · g=1,6</div></div>`)+
        big('на Луне притяжение в 6 раз слабее')+
        sml('космонавт там весит в 6 раз меньше — хотя масса прежняя!'));
    } else if(step===8){
      h=col(big('Космонавт массой 60 кг'),
        rowC(
          `<div style="text-align:center">${l34Dyn(600,60,'Земля',88,600)}<div style="font-size:12px;color:#7fd1ff">Земля</div></div>`+
          `<div style="text-align:center">${l34Dyn(96,60,'Луна',88,600)}<div style="font-size:12px;color:#cbb89a">Луна</div></div>`)+
        big('Земля: 600 Н · Луна: 96 Н')+
        sml('масса одна — 60 кг, а вес разный!'));
    } else if(step===9){
      h=col(big('Разбираем задачку'),
        `<div class="wv-row">${chip('m = 3 кг','rgba(127,184,160,.5)')} ${chip('g = 10 Н/кг','rgba(127,209,255,.5)')}</div>`+
        `<div style="font-size:20px;margin:4px 0" class="wv-pop">F = m · g = 3 · 10</div>`+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">F = 30 Н ✓</div>`+
        sml('такой вопрос будет дальше! на Луне было бы 3·1,6 = 4,8 Н'));
    } else if(step===10){
      // тренажёр: масса и место
      if(st.m==null) st.m=10; if(!st.place) st.place='Земля';
      const g=st.place==='Луна'?1.6:10;
      const F=Math.round(st.m*g*10)/10;
      h=col(big('Тренажёр: Земля или Луна?'),
        `<div class="wv-row">${chip('масса = '+st.m+' кг','rgba(127,184,160,.5)')} ${chip('место: '+st.place+(st.place==='Луна'?' · g=1,6':' · g=10'), st.place==='Луна'?'rgba(200,200,210,.5)':'rgba(127,209,255,.5)')}</div>`+
        `<div style="display:flex;gap:10px;justify-content:center;align-items:flex-end;flex-wrap:wrap">
          <div style="text-align:center">${st.place==='Луна'?l34Moon(46):l34Earth(46)}<div style="font-size:11px;color:#7fa88f">${st.place}</div></div>
          ${l34Dyn(F,st.m,st.place,110)}
        </div>`+
        `<div style="font-size:22px" class="wv-ans">F = ${st.m} · ${g} = ${F} Н</div>`+
        btns(btn('+1 кг',`l34Act('${lk}','m+')`),btn('−1 кг',`l34Act('${lk}','m-')`),btn('🌍 Земля',`l34Act('${lk}','earth')`),btn('🌙 Луна',`l34Act('${lk}','moon')`),btn('↺',`l34Act('${lk}','r')`))+
        sml(F<100?'попробуй 60 кг — как космонавт!':'видишь: масса та же, а вес скачет!'));
    } else {
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:320px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.7">
          🍎 Сила тяжести тянет всё к Земле: <b>F = m · g</b>, g ≈ 10 Н/кг.<br>
          💪 <b>Вес</b> — сила давления на опору (Н).<br>
          ⚖️ <b>Масса</b> (кг) не меняется, <b>вес</b> (Н) зависит от места.<br>
          🌙 На Луне g = 1,6 — вес в 6 раз меньше.<br>
          🔁 m = F : g · g = F : m.</div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там тело 3 кг'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}
function l36Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  const bump=(k,d,lo,hi)=> st[k]=Math.max(lo||1, Math.min(hi||24, (st[k]==null?1:st[k])+d));
  switch(act){
    case 'U+': bump('U',1,1,24); break; case 'U-': bump('U',-1,1,24); break;
    case 'R+': bump('R',1,1,12); break; case 'R-': bump('R',-1,1,12); break;
    case 'kz': st.kz=st.kz?0:1; break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l36Dial(w,val,max,label,unit,col){
  // круглая шкала-прибор
  const cx=w/2, cy=w/2, r=w*.34;
  const a0=-210, a1=30, frac=Math.max(0,Math.min(1,val/max));
  const ang=a0+frac*(a1-a0);
  const rad=(d)=> d*Math.PI/180;
  const px=cx+r*Math.cos(rad(ang)), py=cy+r*Math.sin(rad(ang));
  const arcLen=(from,to)=>{ let d=''; const steps=Math.max(2,Math.ceil(Math.abs(to-from)/8));
    for(let i=0;i<=steps;i++){ const a=from+(to-from)*i/steps; const x=cx+r*Math.cos(rad(a)), y=cy+r*Math.sin(rad(a));
      d+=(i?'L':'M')+x.toFixed(1)+','+y.toFixed(1); } return d; };
  return `<svg width="${w}" height="${w}" viewBox="0 0 ${w} ${w}" style="display:block">
    <circle cx="${cx}" cy="${cy}" r="${r+3}" fill="none" stroke="#3c5170" stroke-width="2"/>
    <path d="${arcLen(a0,a1)}" stroke="#23314d" stroke-width="${r*.5}" fill="none" stroke-linecap="round"/>
    <path d="${arcLen(a0,ang)}" stroke="${col||'#f0a35a'}" stroke-width="${r*.5}" fill="none" stroke-linecap="round" class="l49-on"/>
    ${[0,.25,.5,.75,1].map(f=>{ const a=a0+f*(a1-a0); const x1=cx+(r+6)*Math.cos(rad(a)), y1=cy+(r+6)*Math.sin(rad(a)); return `<circle cx="${x1}" cy="${y1}" r="1.4" fill="#7fa3ba"/>`;}).join('')}
    <line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="#e8e0cc" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#e8e0cc"/>
    <text x="${cx}" y="${cy+9}" text-anchor="middle" font-size="${Math.round(w*.2)}" fill="#fff" font-weight="bold">${val}</text>
    <text x="${cx}" y="${w-2}" text-anchor="middle" font-size="${Math.round(w*.12)}" fill="#9fc5e8">${label}, ${unit}</text>
  </svg>`;
}
function l36Pipe(w,uid){
  // «Архимедов водопровод»: насос (U) → поток капель (I) → узкое место (R)
  const W=w||312, H=150;
  const y=86, tubeH=26;
  const nx=Math.round(W*.28);        // сужение
  const pumpX=Math.round(W*.1);
  let drops='';
  for(let i=0;i<7;i++){
    const pos=W*.06+i*W*.125;
    if(pos<nx-30||pos>nx+40){
      const dur=(1.6+(i%3)*.4);
      drops+=`<circle r="3.4" fill="#bfe6ff"><animateMotion dur="${dur}s" begin="${(-i*dur/7).toFixed(2)}s" repeatCount="indefinite" path="M${pumpX+34},${y+13} L${nx-34},${y+13}"/></circle>`;
    }
  }
  for(let i=0;i<5;i++){
    drops+=`<circle r="2.8" fill="#dff0ff"><animateMotion dur="1.7s" begin="${(-i*.5).toFixed(2)}s" repeatCount="indefinite" path="M${nx+44},${y+13} L${W-28},${y+13}"/></circle>`;
  }
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 3px 12px rgba(0,0,0,.35)">
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0">
      <defs>
        <linearGradient id="l36bg${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f2a44"/><stop offset="1" stop-color="#071523"/></linearGradient>
        <linearGradient id="l36tube${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(140,210,255,.22)"/><stop offset="1" stop-color="rgba(70,150,220,.34)"/></linearGradient>
      </defs>
      <rect x="0" y="0" width="${W}" height="${H}" fill="url(#l36bg${uid})"/>
      <!-- пол -->
      <rect x="0" y="${H-14}" width="${W}" height="14" fill="#0a1c30"/>
      <!-- насос с вращающимся винтом -->
      <g transform="translate(${pumpX},${H-34})">
        <rect x="6" y="-34" width="58" height="34" rx="7" fill="#3c5a78" stroke="#243e58" stroke-width="2"/>
        <circle cx="35" cy="-17" r="13" fill="#16314e"/>
        <g><animateTransform attributeName="transform" type="rotate" from="0 35 -17" to="360 35 -17" dur="1.7s" repeatCount="indefinite"/>
          <path d="M35,-17 L30,-29 A13,13 0 0 1 40,-29 Z M35,-17 L22,-14 A13,13 0 0 1 23,-6 Z M35,-17 L29,-5 A13,13 0 0 1 41,-6 Z M35,-17 L48,-14 A13,13 0 0 1 47,-22 Z" fill="#bfe6ff" opacity=".9"/></g>
        <circle cx="35" cy="-17" r="4" fill="#e8e0cc"/>
        <text x="35" y="10" text-anchor="middle" font-size="10" fill="#9fd4f2">насос «Архимедов винт»</text>
        <text x="35" y="24" text-anchor="middle" font-size="10.5" fill="#ffd9a0" font-weight="bold">напор = батарейка (U)</text>
      </g>
      <!-- манометр -->
      <g transform="translate(${pumpX+40},22)">${l36Dial(44,6,12,'U','В','#f0a35a')}</g>
      <!-- труба: толстая, потом сужение -->
      <rect x="${pumpX+54}" y="${y}" width="${W-pumpX-90}" height="${tubeH}" rx="13" fill="url(#l36tube${uid})" stroke="#7fd1ff" stroke-width="2"/>
      <!-- сужение -->
      <path d="M${nx-26},${y} L${nx+6},${y+tubeH/2-6} L${nx+6},${y+tubeH/2+6} L${nx-26},${y+tubeH}" fill="none" stroke="#ffb04a" stroke-width="2.5"/>
      <path d="M${nx+6},${y+tubeH/2-7} L${nx+40},${y+tubeH/2-4} L${nx+40},${y+tubeH/2+4} L${nx+6},${y+tubeH/2+7} Z" fill="#8a4a1a" opacity=".9"/>
      <text x="${nx+23}" y="${y-8}" text-anchor="middle" font-size="11" fill="#ffcf8a" font-weight="bold">R — узкое место</text>
      <!-- мерный стакан справа -->
      <g transform="translate(${W-52},${y-2})">
        <rect x="-16" y="0" width="32" height="40" rx="4" fill="rgba(190,230,255,.15)" stroke="#7fd1ff" stroke-width="2"/>
        <rect x="-12" y="10" width="24" height="30" fill="#4a90d0" opacity=".8"/>
        <text x="0" y="-5" text-anchor="middle" font-size="9.5" fill="#9fd4f2">ток I</text>
        <text x="0" y="26" text-anchor="middle" font-size="11" fill="#fff" font-weight="bold">3 А</text>
      </g>
      ${drops}
      <!-- капли-объяснение -->
      <text x="${Math.round(pumpX+52)}" y="${y+tubeH+22}" text-anchor="middle" font-size="10.5" fill="#bfe6ff">поток = ток I</text>
      <text x="${Math.round((nx+40+W-52)/2)}" y="${y+tubeH+22}" text-anchor="middle" font-size="10.5" fill="#bfe6ff">чем уже — тем меньше поток</text>
    </svg>
  </div>`;
}
function l36Board(U,R,uid,mini){
  // электрическая цепь на плате: батарея, резистор, лампа; яркость ∝ I
  const I=Math.round(U/R*100)/100;
  const bright=Math.min(1,Math.max(.06,I/4));
  const W=mini? 148 : 300;
  const H=mini? 112 : 168;
  const yT=Math.round(H*.3), yB=Math.round(H*.78);
  const xL=Math.round(W*.16), xR=Math.round(W*.88);
  const dur=Math.max(.5,(2.6-I*.5)).toFixed(2);
  const col=(v)=> v>=3.5?'#7df3ff': v>=2?'#7fd1ff': v>=1?'#4d9fe8':'#7fa3ba';
  const bulbX=Math.round(W*.74);
  const resX=Math.round(W*.42);
  const resL=Math.round(W*.16);
  const wireTop= yT;
  const electrons= [0,1,2].map(i=>`<circle r="3" fill="${col(I)}"><animateMotion dur="${dur}s" begin="${(-i*dur/3).toFixed(2)}s" repeatCount="indefinite" path="M${xL+8},${wireTop} L${xR-6},${wireTop} L${xR-6},${yB} L${xL+8},${yB} Z"/></circle>`).join('');
  const zig=(x0,y,len)=>{ const n=3, seg=len/(n*2); let d=`M${x0},${y}`; for(let i=0;i<n;i++){ d+=` l${seg},${-7} l${seg},${7}`;} d+=` l${seg},${-7} l${seg},${7}`; return d; };
  return `<div style="position:relative;width:${W}px;height:${H}px;border-radius:14px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.3)">
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0">
      <defs><linearGradient id="l36bd${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d2b47"/><stop offset="1" stop-color="#0f1728"/></linearGradient></defs>
      <rect x="0" y="0" width="${W}" height="${H}" rx="14" fill="url(#l36bd${uid})"/>
      <line x1="${xL}" y1="${wireTop}" x2="${resX-8}" y2="${wireTop}" stroke="#e8d9a8" stroke-width="3"/>
      <path d="${zig(resX,wireTop,resL)}" stroke="#f0a35a" stroke-width="3.2" fill="none"/>
      <line x1="${resX+resL+8}" y1="${wireTop}" x2="${bulbX-14}" y2="${wireTop}" stroke="#e8d9a8" stroke-width="3"/>
      <line x1="${bulbX+14}" y1="${wireTop}" x2="${xR}" y2="${wireTop}" stroke="#e8d9a8" stroke-width="3"/>
      <line x1="${xR}" y1="${wireTop}" x2="${xR}" y2="${yB}" stroke="#e8d9a8" stroke-width="3"/>
      <line x1="${xR}" y1="${yB}" x2="${xL}" y2="${yB}" stroke="#e8d9a8" stroke-width="3"/>
      <line x1="${xL}" y1="${yB}" x2="${xL}" y2="${wireTop}" stroke="#e8d9a8" stroke-width="3"/>
      <!-- батарея -->
      <g transform="translate(${xL-14},${(yT+yB)/2})">
        <rect x="-8" y="-16" width="16" height="32" rx="4" fill="#eef3f6" stroke="#9aa7b4" stroke-width="1.6"/>
        <text x="0" y="4" text-anchor="middle" font-size="9" fill="#e0523d" font-weight="bold">${U}В</text>
        <path d="M0,-28 v-6 M-5,-34 h10" stroke="#e8e0cc" stroke-width="3" fill="none"/>
        <path d="M0,26 v6" stroke="#e8e0cc" stroke-width="3"/>
      </g>
      <text x="${resX+resL/2}" y="${wireTop-12}" text-anchor="middle" font-size="${mini?9:11}" fill="#ffd9a0" font-weight="bold">${mini? R+' Ом':'R = '+R+' Ом'}</text>
      <!-- лампа -->
      <g transform="translate(${bulbX},${wireTop})">
        ${I>0.4?`<circle r="26" fill="rgba(255,224,120,${.1+bright*.22})"/><circle r="18" fill="rgba(255,224,120,${.14+bright*.3})"/>`:''}
        <circle r="13" fill="${I>1.5?'#fff6c8':'#dfe4ea'}" stroke="${I>1.5?'#d9a52a':'#97a4b1'}" stroke-width="2"/>
        <path d="M-4,0 q0,-6 0,0 M0,-6 v6" stroke="${I>1.5?'#8a5a10':'#6f7b88'}" stroke-width="1.8" fill="none"/>
        ${I>2?`<circle cx="-5" cy="-4" r="2.4" fill="rgba(255,255,255,.9)"/>`:''}
        <path d="M-8,8 L8,8 L5,14 L-5,14 Z" fill="#97a4b1"/>
      </g>
      <text x="${bulbX}" y="${wireTop+26}" text-anchor="middle" font-size="${mini?8.5:10}" fill="${I>1?'#ffd9a0':'#9aa7b4'}">${mini?'': 'лампочка'}</text>
      <!-- приборы -->
      ${mini?'':`
        <g transform="translate(${xL-10},${yB-34})"><rect x="0" y="0" width="52" height="20" rx="6" fill="#14233c" stroke="#3c5170" stroke-width="1.6"/>
          <text x="26" y="13" text-anchor="middle" font-size="11" fill="#f0a35a" font-weight="bold">U=${U} В</text></g>
        <g transform="translate(${xR-56},${yB-34})"><rect x="0" y="0" width="60" height="20" rx="6" fill="#14233c" stroke="#3c5170" stroke-width="1.6"/>
          <text x="30" y="13" text-anchor="middle" font-size="11" fill="#7fd1ff" font-weight="bold">I=${I} А</text></g>`}
      ${electrons}
    </svg>
  </div>`;
}
function l36KZ(kz,uid){
  // раскалённый провод при коротком замыкании + предохранитель
  const W=312,H=170, xL=64, xR=W-40, y=86, yB=126;
  let html='';
  html+=`<line x1="${xL}" y1="${y}" x2="${xR}" y2="${y}" stroke="${kz?'#ff6a4a':'#e8d9a8'}" stroke-width="${kz?5:3}" class="${kz?'l49-heat':''}"/>`;
  html+=`<rect x="${xL-16}" y="${y-14}" width="13" height="28" rx="3" fill="#eef3f6" stroke="#9aa7b4" stroke-width="1.5"/><text x="${xL-9}" y="${y+4}" text-anchor="middle" font-size="8" fill="#e0523d">+</text>`;
  html+=`<rect x="${xR-2}" y="${y-14}" width="13" height="28" rx="3" fill="#eef3f6" stroke="#9aa7b4" stroke-width="1.5"/><text x="${xR+5}" y="${y+4}" text-anchor="middle" font-size="8" fill="#3a6a8a">−</text>`;
  // предохранитель посередине
  const fx=(xL+xR)/2;
  html+=`<rect x="${fx-13}" y="${y-8}" width="26" height="16" rx="4" fill="${kz?'#b3543f':'#f0c060'}" stroke="#7a5a20" stroke-width="2"/>
    <path d="M${fx-9},${y} L${fx+9},${y}" stroke="#7a5a20" stroke-width="2"/>`;
  if(kz){
    html+=`<path d="M${fx-8},${y-6} L${fx+8},${y+6} M${fx+8},${y-6} L${fx-8},${y+6}" stroke="#8a2f20" stroke-width="2.6"/>
      <text x="${fx}" y="${y-16}" text-anchor="middle" font-size="10" fill="#ffb0a0" font-weight="bold">предохранитель сгорел!</text>
      <path d="M${xL+40},${y-10} q6,-10 12,0 M${xR-52},${y-10} q6,-10 12,0" class="l49-bolt" stroke="#ffe27a" stroke-width="3" fill="none"/>
      <circle cx="${xL+60}" cy="${y-26}" r="4" fill="#8a94ad"><animate attributeName="cy" values="${y-26};${y-40};${y-26}" dur="1.1s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="1.1s" repeatCount="indefinite"/></circle>
      <circle cx="${xR-46}" cy="${y-22}" r="3" fill="#8a94ad"><animate attributeName="cy" values="${y-22};${y-34};${y-22}" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/></circle>`;
  } else {
    html+=`<text x="${fx}" y="${y-16}" text-anchor="middle" font-size="10" fill="#9fd4f2">предохранитель 10 А</text>`;
  }
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:14px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.3)">
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0">
      <defs><linearGradient id="l36kz${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d2b47"/><stop offset="1" stop-color="#0f1728"/></linearGradient></defs>
      <rect x="0" y="0" width="${W}" height="${H}" rx="14" fill="url(#l36kz${uid})"/>
      ${html}
      <text x="${W/2}" y="${yB+22}" text-anchor="middle" font-size="11.5" fill="${kz?'#ffb0a0':'#9fe8c0'}" font-weight="bold">${kz?'R ≈ 0 → ток огромный: провод раскаляется, предохранитель спасает!':'провод цел, ток в норме — предохранитель на страже'}</text>
    </svg>
  </div>`;
}
function visL36(el){
  // Урок 36 «Закон Ома»: «Архимедов водопровод» — вода объясняет электричество
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
    const rowC=(...ps)=>`<div style="display:flex;gap:12px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${ps.join('')}</div>`;
    const card=(inner,w)=>`<div style="text-align:center;${w?'width:'+w+'px':''}">${inner}</div>`;
    let h='';
    if(step===0){
      h=col(big('Архимедов водопровод'),
        l36Pipe(312,'w')+
        big('насос даёт напор · труба несёт поток · узкое место мешает')+
        sml('так и с электричеством: батарейка «давит», по проводу «течёт» ток, а резистор — как узкое место. листай!'));
    } else if(step===1){
      h=col(big('Вода → электричество'),
        `<div style="display:flex;flex-direction:column;gap:7px;align-items:stretch;max-width:300px;margin:0 auto">
          ${[['🚰 насос','=','🔋 батарейка','напряжение U','#f0a35a'],['🌊 поток воды','=','⚡ электрический ток','сила тока I','#7fd1ff'],['🚧 узкая труба','=','〰️ резистор','сопротивление R','#7fd1a0']].map(([a,e,b,c,cc],i)=>`
            <div class="l35-pop" style="animation-delay:${(0.2+i*.25).toFixed(2)}s;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.03);border:1px solid rgba(127,209,255,.16);border-radius:12px;padding:6px 8px">
              <span style="font-size:24px">${a}</span><span style="color:#cbb89a;font-weight:bold">${e}</span><span style="font-size:24px">${b}</span>
              <span style="flex:1;text-align:right;font-size:12px;color:${cc};font-weight:bold">${c}</span>
            </div>`).join('')}
        </div>`+
        sml('принцип один: что-то «давит», что-то «течёт», что-то «мешает»'));
    } else if(step===2){
      h=col(big('Три главные величины'),
        rowC(
          card(`<div style="width:108px">${l36Dial(100,6,12,'напряжение','В','#f0a35a')}<div class="wv-sml" style="font-size:10px;color:#cbb89a">🔋 «напор» батарейки</div></div>`),
          card(`<div style="width:108px">${l36Dial(100,3,6,'сила тока','А','#7fd1ff')}<div class="wv-sml" style="font-size:10px;color:#cbb89a">⚡ «поток» зарядов</div></div>`),
          card(`<div style="width:108px;position:relative"><div style="position:relative;width:100px;height:100px;border-radius:50%;border:2px solid #3c5170;background:#14233c;display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto">
              <svg width="58" height="30" viewBox="0 0 120 60" style="display:block"><path d="M6,30 h10 l7,-11 l7,22 l7,-22 l7,22 l7,-22 l7,11 h10" stroke="#e8a05a" stroke-width="4" fill="none" stroke-linejoin="round"/></svg>
              <div style="font-size:20px;color:#fff;font-weight:bold">R</div></div><div class="wv-sml" style="font-size:10px;color:#cbb89a">🚧 «узкое место»</div></div>`))+
        sml('U — вольты, I — амперы, R — омы. как напор, поток и узкое место в трубе'));
    } else if(step===3){
      h=col(big('Закон Ома'),
        `<div style="font-size:44px;color:var(--brass);font-family:Georgia,serif;position:relative;display:inline-block;overflow:hidden;border-radius:10px;white-space:nowrap">I = U : R<span class="l35-shine"></span></div>`+
        rowC(chip('напряжение U — «давит»','rgba(232,160,90,.5)'),chip('сопротивление R — «мешает»','rgba(232,106,90,.5)'))+
        `<div style="font-size:17px" class="wv-pop">сила тока = напряжение ÷ сопротивление</div>`+
        sml('напор больше → ток сильнее. преграда больше → ток слабее. так закон Ома связал все три!'));
    } else if(step===4){
      h=col(big('Разбираем на числах'),
        `<div class="wv-row">${chip('U = 6 В','rgba(232,160,90,.5)')} ${chip('R = 2 Ом','rgba(232,106,90,.5)')}</div>`+
        l36Board(6,2,'a')+
        `<div style="font-size:19px" class="wv-pop">I = U : R = 6 : 2</div>`+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">I = 3 А</div>`+
        sml('лампочка светится ярко: по цепи течёт ток 3 ампера'));
    } else if(step===5){
      const p=(U,R)=>`<div style="text-align:center;width:156px;border:1px solid rgba(127,209,255,.35);border-radius:14px;padding:6px;background:rgba(127,209,255,.04)">
        ${l36Board(U,R,'m'+U+R,true)}<div style="font-size:12px;color:#d8ecff;margin-top:3px">${U} В · ${R} Ом → I = ${Math.round(U/R*10)/10} А</div></div>`;
      h=col(big('Проверяем закон'),
        rowC(p(12,2),p(6,4))+
        sml('напряжение выросло в 2 раза → ток вырос в 2 раза (12:2 = 6 А). сопротивление выросло в 2 раза → ток упал в 2 раза (6:4 = 1,5 А)!'));
    } else if(step===6){
      h=col(big('Находим напряжение'),
        `<div class="wv-row">${chip('I = 2 А','rgba(127,209,255,.5)')} ${chip('R = 3 Ом','rgba(232,106,90,.5)')}</div>`+
        rowC(card(`<div style="width:104px">${l36Dial(100,6,12,'напряжение','В','#f0a35a')}</div>`))+
        `<div style="font-size:20px" class="wv-pop">U = I · R = 2 · 3</div>`+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">U = 6 В</div>`+
        sml('напряжение = ток × сопротивление: три ома «пропускают» по 2 ампера → нужно 6 вольт'));
    } else if(step===7){
      h=col(big('Находим сопротивление'),
        `<div class="wv-row">${chip('U = 12 В','rgba(232,160,90,.5)')} ${chip('I = 3 А','rgba(127,209,255,.5)')}</div>`+
        rowC(card(`<div style="width:104px">${l36Dial(100,4,8,'сопротивление','Ом','#7fd1a0')}</div>`))+
        `<div style="font-size:20px" class="wv-pop">R = U : I = 12 : 3</div>`+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">R = 4 Ом</div>`+
        sml('сопротивление = напряжение : ток: 12 вольт «разложили» на 3 ампера — каждому по 4 ома'));
    } else if(step===8){
      const kz=!!st.kz;
      h=col(big('Почему опасно КЗ'),
        l36KZ(kz,'z')+
        btns(btn(kz?'✅ вернуть как было':'⚡ замкнуть накоротко',`l36Act('${lk}','kz')`))+
        sml(kz?'провод раскалился, предохранитель перегорел — цепь разорвана и спасена!':'замкни провод накоротко — и увидишь, почему нельзя'));
    } else if(step===9){
      h=col(big('Разбираем задачку'),
        `<div class="wv-row">${chip('U = 6 В','rgba(232,160,90,.5)')} ${chip('R = 2 Ом','rgba(232,106,90,.5)')}</div>`+
        l36Board(6,2,'t')+
        `<div style="font-size:20px" class="wv-pop">I = U : R = 6 : 2</div>`+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">I = 3 А ✓</div>`+
        sml('такой вопрос будет дальше!'));
    } else if(step===10){
      // тренажёр
      if(st.U==null) st.U=6; if(st.R==null) st.R=2;
      const I=Math.round(st.U/st.R*100)/100;
      h=col(big('Тренажёр: покрути закон!'),
        `<div class="wv-row">${chip('U = '+st.U+' В','rgba(232,160,90,.5)')} ${chip('R = '+st.R+' Ом','rgba(232,106,90,.5)')}</div>`+
        l36Board(st.U,st.R,'tr')+
        `<div class="wv-ans" style="font-size:26px;color:#7fd1a0;font-weight:bold">I = ${st.U} : ${st.R} = ${I} А</div>`+
        btns(btn('+1 В',`l36Act('${lk}','U+')`),btn('−1 В',`l36Act('${lk}','U-')`),btn('+1 Ом',`l36Act('${lk}','R+')`),btn('−1 Ом',`l36Act('${lk}','R-')`),btn('↺',`l36Act('${lk}','r')`))+
        sml(I>=2.5?'ток большой — лампочка яркая, электроны быстрые!':'ток маленький — лампочка тусклая. увеличь U или уменьши R!'));
    } else {
      // памятка
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap">
          <div style="width:88px;opacity:.95">${typeof l35ArchSvg==='function'?l35ArchSvg(88,'down'):''}</div>
          <div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:250px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.8">
            ⚡ <b>I = U : R</b> — главный закон электричества.<br>
            🔋 U (В) — «напор» · ⚡ I (А) — «поток» · 🚧 R (Ом) — «узкое место».<br>
            🔁 U = I·R · R = U:I — все три формулы из одной!<br>
            💥 Больше R → меньше ток. R ≈ 0 → короткое замыкание!</div>
        </div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там 6 В и 2 Ом'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}

function l50Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  const bump=(k,d,lo,hi)=> st[k]=Math.max(lo||1, Math.min(hi||120, (st[k]==null?1:st[k])+d));
  switch(act){
    case 'v+': bump('v',10,10,120); break;
    case 'v-': bump('v',-10,10,120); break;
    case 't+': bump('t',1,1,6); break;
    case 't-': bump('t',-1,1,6); break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l50Road(vehicle,v,t,S,uid){
  // дорога: равные метки по времени, гонец проезжает путь S за t часов
  const W=300,H=150, L=22, R=W-16;
  const x=Math.round(L+ (R-L)*0.02); // старт
  const reach=Math.round(L+ (R-L)*0.94);
  const marks=Math.max(1,t);
  const mstep=(R-L)/marks;
  const dots=Array.from({length:marks},(_,k)=>`<div class="l35-pop" style="animation-delay:${(0.2+k*0.25).toFixed(2)}s;position:absolute;left:${Math.round(x+ (reach-x)*((k+1)/marks))}px;top:86px;width:7px;height:7px;border-radius:50%;background:#fff;box-shadow:0 0 4px rgba(255,255,255,.6)"></div>`).join('');
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.25)">
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0">
      <defs><linearGradient id="l50sk${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#aee0f5"/><stop offset="1" stop-color="#e6f6fd"/></linearGradient></defs>
      <rect x="0" y="0" width="${W}" height="${H}" fill="url(#l50sk${uid})"/>
      <rect x="0" y="108" width="${W}" height="${H-108}" fill="#7fb87a"/>
      <rect x="0" y="104" width="${W}" height="7" fill="#9ed08f"/>
      <!-- дорога -->
      <rect x="0" y="66" width="${W}" height="34" fill="#5b6b78" rx="6"/>
      <line x1="0" y1="83" x2="${W}" y2="83" stroke="#fff3c4" stroke-width="3" stroke-dasharray="18 12"/>
      <!-- километровые столбики -->
      ${Array.from({length:6},(_,i)=>`<rect x="${Math.round(L+((R-L)/5)*i)-2}" y="98" width="5" height="14" fill="#8a5a34"/><circle cx="${Math.round(L+((R-L)/5)*i)}" cy="98" r="5" fill="#c96a3a"/>`).join('')}
      <!-- метки времени -->
      <g font-size="11" fill="#1a4a6a" font-weight="bold">
        ${Array.from({length:marks},(_,k)=>`<text x="${Math.round(x+ (reach-x)*((k+1)/marks))}" y="58" text-anchor="middle">${k+1} ч</text>`).join('')}
      </g>
      <text x="${W-8}" y="30" text-anchor="end" font-size="12" fill="#1a4a6a" font-weight="bold">равные часы — равные пути</text>
    </svg>
    ${dots}
    <!-- гонец -->
    <div class="l50-drv" style="position:absolute;left:${x}px;top:60px;width:40px;height:32px;font-size:26px;line-height:1;z-index:3;--tx:${reach-x-12}px"><span class="l50-mirror" style="display:inline-block">${vehicle}</span></div>
    <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:4px;background:rgba(20,50,70,.6);border-radius:10px;padding:2px 10px;font-size:12px;color:#fff;font-weight:bold;white-space:nowrap">v = ${v} · t = ${t} ч → S = ${S}</div>
  </div>`;
}
function l50Compare(uid){
  // равномерно vs неравномерно: две дорожки с точками и бегущими огоньками
  const lane=(uniform)=>{
    const W=300,H=88;
    return `<div style="position:relative;width:${W}px;height:${H}px;border-radius:12px;overflow:hidden;background:linear-gradient(180deg,#dff1fa,#ffffff);box-shadow:0 2px 8px rgba(0,0,0,.15)">
      <div style="position:absolute;left:0;right:0;top:42px;height:26px;background:#5b6b78"></div>
      <div style="position:absolute;left:0;right:0;top:55px;height:2px;background:#fff3c4"></div>
      <!-- следы -->
      ${uniform
        ? Array.from({length:7},(_,i)=>`<div class="l35-pop" style="animation-delay:${(i*0.12).toFixed(2)}s;position:absolute;top:30px;left:${10+i*43}px;width:9px;height:9px;border-radius:50%;background:#3a8a5a;box-shadow:0 0 0 2px rgba(58,138,90,.2)"></div>`).join('')
        : [[12,16],[60,64],[108,112],[154,168],[198,202],[244,286]].map(p=>`<div class="l35-pop" style="animation-delay:.2s;position:absolute;top:30px;left:${p[0]}px;width:9px;height:9px;border-radius:50%;background:#c96a3a;box-shadow:0 0 0 2px rgba(201,106,58,.2)"></div><div class="l35-pop" style="animation-delay:.34s;position:absolute;top:30px;left:${p[1]}px;width:9px;height:9px;border-radius:50%;background:#e8a35a;box-shadow:0 0 0 2px rgba(232,163,90,.2)"></div>`).join('')}
      <div class="${uniform?'l50-run':'l50-bus'}" style="position:absolute;top:14px;left:8px;width:20px;height:20px;font-size:16px">${uniform?'🚴':'🚌'}</div>
      <div style="position:absolute;top:2px;left:8px;font-size:10px;color:${uniform?'#1a6a3a':'#b04a2a'};font-weight:bold">${uniform?'следы ровные — равномерно!':'остановки и разгоны — неравномерно'}</div>
    </div>`;
  };
  return `<div style="display:flex;flex-direction:column;gap:8px;align-items:center">${lane(true)}${lane(false)}</div>`;
}
function l50Graph(uid,speeds){
  // график пути: время (ч) — путь (км); прямые рисуются, точки бегут по линии
  const W=300,H=200, mx=40, my=14, gx=W-16, gy=H-38;
  const T=4;
  const maxS=Math.max(...speeds.map(v=>v*T));
  const step = maxS<=80?20: maxS<=200?40:60;
  const Ymax=Math.ceil(maxS/step)*step;
  const X=(t)=>mx+(gx-mx)*(t/T);
  const Y=(s)=>gy-(gy-my)*(s/Ymax);
  const cols=['#2f6fb0','#e0523d'];
  let lines='';
  // сетка и подписи по оси пути
  for(let s=0;s<=Ymax;s+=step){
    lines+=`<line x1="${mx}" y1="${Y(s).toFixed(1)}" x2="${gx}" y2="${Y(s).toFixed(1)}" stroke="rgba(90,107,120,.18)" stroke-width="1"/>
      <text x="${mx-6}" y="${Y(s).toFixed(1)+3}" text-anchor="end" font-size="9.5" fill="#5b6b78">${s}</text>`;
  }
  for(let t=0;t<=T;t++){
    lines+=`<text x="${X(t)}" y="${gy+15}" text-anchor="middle" font-size="10" fill="#5b6b78">${t}</text>
      <line x1="${X(t)}" y1="${my}" x2="${X(t)}" y2="${gy}" stroke="rgba(90,107,120,.12)" stroke-width="1"/>`;
  }
  speeds.forEach((v,i)=>{
    const col=cols[i%cols.length];
    const pts=[];
    for(let k=0;k<=T;k++) pts.push(`${X(k).toFixed(1)},${Y(v*k).toFixed(1)}`);
    lines+=`<polyline class="l50-draw" style="animation-delay:${(0.2+i*0.5).toFixed(2)}s" points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-width="3.5" stroke-linecap="round"/>
      ${Array.from({length:T},(_,k)=>`<circle cx="${X(k+1).toFixed(1)}" cy="${Y(v*(k+1)).toFixed(1)}" r="4" fill="${col}" stroke="#fff" stroke-width="1.5"/>`).join('')}
      <circle r="6" fill="${col}" stroke="#fff" stroke-width="2"><animateMotion dur="${3.4-i*0.6}s" repeatCount="indefinite" begin="${(i*0.7).toFixed(2)}s" path="M${X(0)},${Y(0).toFixed(1)} L${X(T)},${Y(v*T).toFixed(1)}"/></circle>`;
  });
  const leg=speeds.map((v,i)=>`<span style="display:inline-flex;align-items:center;gap:5px;font-size:12px;color:#d8ecff;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:2px 8px"><span style="width:16px;height:5px;border-radius:3px;background:${cols[i%2]};display:inline-block"></span>${v} км/ч</span>`).join('');
  return `<div style="position:relative;width:${W}px;height:${H+8}px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.22);background:linear-gradient(180deg,#f7faf6,#e9f2ec)">
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;left:0;top:0">
      <line x1="${mx}" y1="${my}" x2="${mx}" y2="${gy}" stroke="#5b6b78" stroke-width="2"/>
      <line x1="${mx}" y1="${gy}" x2="${gx}" y2="${gy}" stroke="#5b6b78" stroke-width="2"/>
      <text x="${mx}" y="${my-5}" font-size="10.5" fill="#5b6b78" font-weight="bold">путь S, км</text>
      <text x="${gx-2}" y="${gy+30}" text-anchor="end" font-size="10.5" fill="#5b6b78">время t, ч</text>
      ${lines}
    </svg>
    <div style="position:absolute;left:0;right:0;bottom:2px;display:flex;gap:6px;justify-content:center">${leg}</div>
  </div>`;
}
function l50Sky(uid){
  // самолёт летит ПО ЭШЕЛОНУ: трасса-квадратичная кривая, движение CSS по точкам
  const W=300,H=150;
  const P0=[14,110], PC=[150,52], P1=[286,108];
  const keys=[]; 
  for(let i=0;i<=10;i++){
    const u=i/10;
    const x=(1-u)*(1-u)*P0[0]+2*(1-u)*u*PC[0]+u*u*P1[0];
    const y=(1-u)*(1-u)*P0[1]+2*(1-u)*u*PC[1]+u*u*P1[1];
    const dx=2*(1-u)*(PC[0]-P0[0])+2*u*(P1[0]-PC[0]);
    const dy=2*(1-u)*(PC[1]-P0[1])+2*u*(P1[1]-PC[1]);
    const rot=Math.round(Math.atan2(dy,dx)*180/Math.PI);
    keys.push(`${(i*10)}%{transform:translate(${(x-P0[0]).toFixed(1)}px,${(y-P0[1]).toFixed(1)}px) rotate(${rot}deg)}`);
  }
  const plane=`<svg width="44" height="20" viewBox="-24 -12 48 24" style="overflow:visible">
    <ellipse cx="0" cy="0" rx="19" ry="4.6" fill="#ffffff" stroke="#7fa3ba" stroke-width="1.4"/>
    <path d="M17,-3.6 L27,0 L17,3.6 Z" fill="#ffffff" stroke="#7fa3ba" stroke-width="1.2"/>
    <path d="M-16,-1.5 L-23,-10 L-14,-4.5 Z" fill="#dff0fb" stroke="#7fa3ba" stroke-width="1.2"/>
    <path d="M-4,2 L4,15 L11,12 L6,1 Z" fill="#dff0fb" stroke="#7fa3ba" stroke-width="1.2"/>
    <path d="M2,-2.5 L8,-12 L13,-9 L7,0 Z" fill="#cfe6f2" stroke="#7fa3ba" stroke-width="1.2"/>
    <rect x="-19" y="-0.8" width="12" height="1.6" fill="#ff8a5a"/>
  </svg>`;
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.22)">
    <style>@keyframes l50fly${uid}{ ${keys.join('')} }</style>
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0">
      <defs><linearGradient id="l50sky${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ec9f0"/><stop offset="1" stop-color="#d6effc"/></linearGradient></defs>
      <rect x="0" y="0" width="${W}" height="${H}" fill="url(#l50sky${uid})"/>
      <circle cx="258" cy="30" r="14" fill="#fff3c4"/>
      <g fill="#fff" opacity=".9"><ellipse cx="70" cy="36" rx="20" ry="8"/><ellipse cx="92" cy="31" rx="14" ry="6"/></g>
      <!-- эшелон -->
      <path d="M${P0[0]},${P0[1]} Q${PC[0]},${PC[1]} ${P1[0]},${P1[1]}" stroke="#ffffff" stroke-width="3" stroke-dasharray="16 14" fill="none" opacity=".95"/>
      <circle cx="64" cy="99" r="5" fill="#fff"/><text x="64" y="130" text-anchor="middle" font-size="11" fill="#1a4a6a" font-weight="bold">1 ч · 800 км</text>
      <circle cx="172" cy="77" r="5" fill="#fff"/><text x="172" y="104" text-anchor="middle" font-size="11" fill="#1a4a6a" font-weight="bold">2 ч · 1600 км</text>
    </svg>
    <div style="position:absolute;left:${P0[0]-22}px;top:${P0[1]-12}px;width:44px;height:24px;transform-origin:22px 12px;animation:l50fly${uid} 5.5s linear infinite;will-change:transform">${plane}</div>
    <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:2px;background:rgba(20,50,70,.6);border-radius:10px;padding:2px 10px;font-size:12px;color:#fff;font-weight:bold;white-space:nowrap">S = 800 · 2 = 1600 км</div>
  </div>`;
}
function visL50(el){
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
    const rowC=(inner)=>`<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${inner}</div>`;
    let h='';
    if(step===0){
      h=col(big('Дорога Архимеда'),
        l50Road('🚗',60,2,120,'a')+
        big('равномерное движение — скорость не меняется')+
        sml('за каждый час — одинаковый путь! Архимед поставил метки каждый час и увидел: ровно, без сюрпризов. листай ➜'));
    } else if(step===1){
      h=col(big('Равномерно или нет?'),
        l50Compare('c')+
        sml('велосипед катится ровно — за равные времена равные пути. автобус тормозит и разгоняется — неравномерно!'));
    } else if(step===2){
      h=col(big('Три формулы движения'),
        `<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          ${[['S = v · t','путь','#7fd1a0'],['v = S : t','скорость','#f0a35a'],['t = S : v','время','#7fd1ff']].map(([f,n,c],i)=>`
            <div class="l35-pop" style="animation-delay:${(i*0.18).toFixed(2)}s;width:96px;border:2px solid ${c}66;border-radius:14px;padding:10px 6px;text-align:center;background:rgba(255,255,255,.02)">
              <div style="font-size:22px;font-family:Georgia,serif;color:${c};font-weight:bold;white-space:nowrap">${f}</div>
              <div style="font-size:12px;color:#cbb89a;margin-top:2px">${n}</div>
            </div>`).join('')}
        </div>`+
        sml('знаешь две величины — найдёшь третью! путь = скорость × время'));
    } else if(step===3){
      h=col(big('Километры и метры'),
        rowC(chip('1 м/с = 3,6 км/ч','rgba(127,209,255,.5)'))+
        `<div style="display:flex;gap:8px;justify-content:center;align-items:center;flex-wrap:wrap">
          <div style="text-align:center;min-width:110px;border:1px solid rgba(127,184,160,.4);border-radius:12px;padding:8px"><div style="font-size:24px">🚶</div><b>1 м/с</b><div style="font-size:11px;color:#9fceb2">человек идёт</div></div>
          <div style="font-size:24px" class="l35-press">→</div>
          <div style="text-align:center;min-width:110px;border:1px solid rgba(232,160,90,.4);border-radius:12px;padding:8px"><div style="font-size:24px">🚴</div><b>3,6 км/ч</b><div style="font-size:11px;color:#f0d9a8">это же скорость!</div></div>
        </div>`+
        sml('10 м/с = 36 км/ч · 20 м/с = 72 км/ч: метры в секунду умножай на 3,6'));
    } else if(step===4){
      h=col(big('Велосипедист'),
        l50Road('🚴',15,4,60,'b')+
        `<div class="wv-row">${chip('v = 15 км/ч','rgba(127,184,160,.5)')} ${chip('t = 4 ч','rgba(127,209,255,.5)')}</div>`+
        `<div style="font-size:20px" class="wv-pop">S = v · t = 15 · 4</div>`+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">S = 60 км</div>`+
        sml('ровно по 15 км каждый час — 4 часа — и проехал 60 км'));
    } else if(step===5){
      h=col(big('Поезд'),
        l50Road('🚆',40,3,120,'d')+
        `<div class="wv-row">${chip('S = 120 км','rgba(232,106,90,.5)')} ${chip('t = 3 ч','rgba(127,209,255,.5)')}</div>`+
        `<div style="font-size:20px" class="wv-pop">v = S : t = 120 : 3</div>`+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">v = 40 км/ч</div>`+
        sml('поезд прошёл путь за 3 часа — значит, каждый час по 40 км'));
    } else if(step===6){
      h=col(big('Самолёт'),
        l50Sky('p')+
        `<div class="wv-row">${chip('v = 800 км/ч','rgba(127,184,160,.5)')} ${chip('t = 2 ч','rgba(127,209,255,.5)')}</div>`+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">S = 1600 км</div>`+
        sml('за час — 800 км, за два — вдвое больше'));
    } else if(step===7){
      h=col(big('График пути — прямая'),
        l50Graph('g',[40])+
        sml('по горизонтали — часы, по вертикали — километры. ровная прямая = ровная скорость!'));
    } else if(step===8){
      h=col(big('Круче — быстрее'),
        l50Graph('gg',[20,60])+
        sml('синяя линия пологая — скорость 20 км/ч. красная крутая — 60 км/ч: чем круче, тем больше скорость!'));
    } else if(step===9){
      h=col(big('Разбираем задачку'),
        l50Road('🚴',15,4,60,'q')+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">S = 60 км ✓</div>`+
        sml('такой вопрос будет дальше!'));
    } else if(step===10){
      if(st.v==null) st.v=30; if(st.t==null) st.t=2;
      const S=st.v*st.t;
      h=col(big('Тренажёр: гонка!'),
        `<div class="wv-row">${chip('v = '+st.v+' км/ч','rgba(127,184,160,.5)')} ${chip('t = '+st.t+' ч','rgba(127,209,255,.5)')}</div>`+
        l50Road('🚗',st.v,st.t,S,'tr')+
        `<div class="wv-ans" style="font-size:26px;color:#7fd1a0;font-weight:bold">S = v·t = ${st.v}·${st.t} = ${S} км</div>`+
        btns(btn('🚗 +10 км/ч',`l50Act('${lk}','v+')`),btn('−10 км/ч',`l50Act('${lk}','v-')`),btn('⏱ +1 ч',`l50Act('${lk}','t+')`),btn('⏱ −1 ч',`l50Act('${lk}','t-')`),btn('↺',`l50Act('${lk}','r')`))+
        sml('быстрее или дольше — путь растёт! а в м/с это '+Math.round(st.v/3.6*10)/10+' м/с'));
    } else {
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap">
          <div style="width:88px;opacity:.95">${typeof l35ArchSvg==='function'?l35ArchSvg(88,'down'):''}</div>
          <div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:252px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.9">
            📏 Равномерно — за равные времена равные пути.<br>
            🧮 S = v·t · v = S:t · t = S:v.<br>
            📈 График пути — прямая: круче = быстрее.<br>
            🔁 1 м/с = 3,6 км/ч.</div>
        </div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — велосипедист 15 км/ч и 4 часа'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}

function l83Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  const POOL=[['3','45','5'],['2','40','5'],['3','150','7'],['4','240','6'],['5','100','8'],['2','36','9'],['6','180','4'],['10','500','3']];
  switch(act){
    case 's1': st.s1=1; break; case 's2': st.s2=1; break;
    case 'n': st.i=((st.i==null?0:st.i)+1)%POOL.length; st.s1=st.s2=0; break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l83Ratio(a,b,uid){
  // «во сколько раз»: две группы значков
  const big=Math.max(a,b), small=Math.min(a,b);
  const times=big/small;
  const icon='🍎';
  return `<div style="width:300px;margin:0 auto;text-align:center;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:8px 6px">
    <div style="font-size:11px;color:#cbb89a">${big} и ${small}</div>
    <div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap">
      <div style="max-width:120px">${icon.repeat(big)}</div>
      <div style="font-size:22px;color:#ffd9a0;font-weight:bold">${big} : ${small} = ${times}</div>
      <div style="max-width:70px">${icon.repeat(small)}</div>
    </div>
    <div style="margin-top:4px;font-size:15px;color:#9fe8c0">${big} в ${times} раз${times===2?'а':''} больше, чем ${small}</div>
  </div>`;
}
function l83Table(a,priceA,b,uid){
  // табличка «штуки / цена» с ценой одной
  const unit=priceA/a;
  const ans=unit*b;
  return `<div style="width:290px;margin:0 auto;border-radius:12px;overflow:hidden;border:1px solid rgba(127,209,255,.2)">
    <div style="display:flex;background:rgba(127,209,255,.08)">
      <div style="flex:1;text-align:center;padding:4px 0;color:#cbb89a;font-size:12px">штук</div>
      <div style="flex:1;text-align:center;padding:4px 0;color:#cbb89a;font-size:12px">цена, ₽</div></div>
    <div style="display:flex">
      <div style="flex:1;text-align:center;padding:5px 0;font-size:18px;font-weight:bold;color:#fff">${a}</div>
      <div style="flex:1;text-align:center;padding:5px 0;font-size:18px;font-weight:bold;color:#fff">${priceA}</div></div>
    <div style="display:flex;background:rgba(255,255,255,.04)">
      <div style="flex:1;text-align:center;padding:5px 0;font-size:18px;font-weight:bold;color:#ffd9a0">1</div>
      <div style="flex:1;text-align:center;padding:5px 0;font-size:18px;font-weight:bold;color:#7fd1a0">${unit}</div></div>
    <div style="display:flex">
      <div style="flex:1;text-align:center;padding:5px 0;font-size:18px;font-weight:bold;color:#fff">${b}</div>
      <div style="flex:1;text-align:center;padding:5px 0;font-size:18px;font-weight:bold;color:#7fd1a0">${ans}</div></div>
  </div>`;
}
function l83Prop(a,b,c,d,uid){
  // пропорция a:b = c:d + основное свойство (крест)
  const pair=(x,y)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;font-family:Georgia,serif;font-weight:bold;color:#fff;font-size:24px;line-height:1.05"><span>${x}</span><span style="border-top:2px solid #fff;padding:0 5px">${y}</span></span>`;
  return `<div style="width:300px;margin:0 auto;text-align:center;background:rgba(255,255,255,.03);border:1px solid rgba(127,209,255,.15);border-radius:14px;padding:10px 6px">
    <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap">
      ${pair(a,b)}<span style="font-size:20px;color:#cbb89a">=</span>${pair(c,d)}
    </div>
    <div style="margin-top:8px;display:flex;justify-content:center;gap:6px;flex-wrap:wrap;font-size:12px;color:#cbb89a">
      <span style="background:rgba(224,82,61,.12);border:1px solid rgba(224,82,61,.4);border-radius:8px;padding:2px 8px">крайние: ${a} и ${d}</span>
      <span style="background:rgba(90,168,216,.12);border:1px solid rgba(90,168,216,.4);border-radius:8px;padding:2px 8px">средние: ${b} и ${c}</span>
    </div>
    <div style="margin-top:6px;font-size:15px;color:#9fe8c0">${a}·${d} = ${b}·${c} → ${a*d} = ${b*c} ✓</div>
  </div>`;
}
function visL83(el){
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
    const rowC=(inner)=>`<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${inner}</div>`;
    let h='';
    if(step===0){
      h=col(big('Лавка Архимеда'),
        `<div style="font-size:48px" class="l35-pop">🍎</div>`+
        big('2 яблока стоят 40 ₽. А 5 яблок?')+
        sml('мы уже умеем считать дроби и проценты — теперь научимся «одинаковому росту»: если яблок больше, цена тоже больше!'));
    } else if(step===1){
      h=col(big('Во сколько раз больше?'),
        l83Ratio(6,2,'a')+
        sml('6 яблок и 2 яблока. 6 : 2 = 3 — значит, 6 в 3 раза больше. деление и есть отношение!'));
    } else if(step===2){
      h=col(big('Отношение — это деление'),
        rowC(chip('6 : 2 = 3','rgba(127,209,255,.5)'),chip('10 : 5 = 2','rgba(127,184,160,.5)'),chip('8 : 4 = 2','rgba(232,160,90,.5)'))+
        `<div style="text-align:center;font-size:20px;margin:4px 0">a : b — «a относится к b»</div>`+
        sml('отношение показывает, во сколько раз первое число больше второго (или меньше, если оно маленькое)'));
    } else if(step===3){
      h=col(big('Одинаковый рост — прямая пропорция'),
        `<div style="text-align:center;font-size:20px;margin:4px 0">2 яблока → 40 ₽</div>`+
        `<div style="text-align:center;font-size:20px;margin:2px 0">4 яблока → 80 ₽ (вдвое больше яблок — вдвое больше денег!)</div>`+
        `<div style="text-align:center;font-size:20px;margin:2px 0">6 яблок → 120 ₽</div>`+
        sml('растут вместе и одинаково: во сколько раз больше яблок, во столько же раз больше цена'));
    } else if(step===4){
      h=col(big('Секрет: цена ОДНОЙ штуки'),
        l83Table(2,40,5,'t')+
        `<div style="text-align:center;font-size:20px" class="wv-pop">1 яблоко = 40 : 2 = 20 ₽</div>`+
        sml('если знаешь цену одной штуки — сможешь посчитать сколько угодно!'));
    } else if(step===5){
      h=col(big('Способ 1: через единицу'),
        `<div style="display:flex;flex-direction:column;gap:6px;align-items:center;font-size:20px">
          <div class="wv-pop">1) цена одной: 40 : 2 = 20 ₽</div>
          <div class="wv-pop" style="animation-delay:.2s">2) на 5 яблок: 20 · 5 = 100 ₽</div>
        </div>`+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">Ответ: 100 ₽</div>`+
        sml('два шага: сначала «цена одной», потом умножь. так решают почти все такие задачи!'));
    } else if(step===6){
      h=col(big('Другая запись: пропорция'),
        `<div style="text-align:center;font-size:22px;margin:4px 0">2 яблока / 40 ₽ = 5 яблок / x ₽</div>`+
        sml('запишем одинаковые отношения рядом: сколько стоит «одно яблоко» — одинаково. коротко: 2/40 = 5/x. x — неизвестная цена'));
    } else if(step===7){
      h=col(big('Главное свойство пропорции'),
        l83Prop(2,40,5,100,'p')+
        sml('если 2/40 = 5/x, то 2·x = 40·5. крайние перемножаются со средними — это закон пропорции!'));
    } else if(step===8){
      h=col(big('Почему так? Крест-накрест'),
        rowC(chip('2/40 = 5/x','rgba(127,209,255,.5)'))+
        `<div style="text-align:center;font-size:19px;margin:4px 0" class="wv-pop">умножаем «крестом»: 2 · x = 40 · 5</div>`+
        sml('две равные дроби — значит, и «верх накрест с низом» равны. так дроби «перекрёстно» проверяют друг друга'));
    } else if(step===9){
      h=col(big('Находим x'),
        `<div style="display:flex;flex-direction:column;gap:6px;align-items:center;font-size:20px">
          <div class="wv-pop">2 · x = 200</div>
          <div class="wv-pop" style="animation-delay:.2s">x = 200 : 2 = 100</div>
        </div>`+
        sml('x стоит в произведении — чтобы найти, делим на известный множитель'));
    } else if(step===10){
      h=col(big('Способ 2: через пропорцию'),
        `<div style="text-align:center;font-size:20px;margin:4px 0" class="wv-pop">2/40 = 5/x → x = 40·5 : 2 = 100</div>`+
        rowC(chip('способ 1 (через единицу): 100 ₽','rgba(127,184,160,.5)'),chip('способ 2 (пропорция): 100 ₽','rgba(127,209,255,.5)'))+
        sml('оба способа дают один ответ — выбирай, какой нравится!'));
    } else if(step===11){
      h=col(big('Ручки (как в проверке)'),
        rowC(chip('3 ручки — 45 ₽','rgba(127,184,160,.5)'),chip('5 ручек — ?','rgba(232,106,90,.5)'))+
        l83Table(3,45,5,'r')+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">45 : 3 · 5 = 75 ₽ ✓</div>`+
        sml('цена одной ручки 15 ₽, умножаем на 5 → 75'));
    } else if(step===12){
      h=col(big('Яблоки килограммами'),
        rowC(chip('3 кг — 150 ₽','rgba(127,184,160,.5)'),chip('7 кг — ?','rgba(232,106,90,.5)'))+
        l83Table(3,150,7,'y')+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">150 : 3 · 7 = 350 ₽</div>`+
        sml('килограмм стоит 50 ₽; 7 килограммов — 350 ₽. как в наших задачках!'));
    } else if(step===13){
      h=col(big('Поезд едет ровно'),
        rowC(chip('4 часа — 240 км','rgba(127,184,160,.5)'),chip('6 часов — ?','rgba(232,106,90,.5)'))+
        l83Table(4,240,6,'z')+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">240 : 4 · 6 = 360 км ✓</div>`+
        sml('скорость = путь за 1 час: 60 км/ч. за 6 часов — 360 км'));
    } else if(step===14){
      const POOL=[['3','45','5'],['2','40','5'],['3','150','7'],['4','240','6'],['5','100','8'],['2','36','9'],['6','180','4'],['10','500','3']];
      if(st.i==null) st.i=0;
      const [a,priceA,b]=POOL[st.i];
      const unit=priceA/a, ans=unit*b;
      h=col(big('Тренажёр: «сколько стоит?»'),
        `<div class="wv-row">${chip(a+' шт = '+priceA+' ₽','rgba(127,184,160,.5)')} ${chip('сколько стоят '+b+' шт?','rgba(232,106,90,.5)')}</div>`+
        (st.s1? `<div class="l35-pop" style="font-size:19px;text-align:center;color:#ffd9a0">1) цена одной: ${priceA} : ${a} = ${unit} ₽</div>`:'')+
        (st.s2? `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">${b} шт = ${unit} · ${b} = ${ans} ₽</div>`:'')+
        btns(btn('1️⃣ цена одной',`l83Act('${lk}','s1')`),btn('2️⃣ ответ',`l83Act('${lk}','s2')`),btn('🎲 другой',`l83Act('${lk}','n')`),btn('↺',`l83Act('${lk}','r')`))+
        sml('простой план: сначала «сколько за 1 штуку», потом умножь на столько, сколько нужно. можно и пропорцией!'));
    } else {
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap">
          <div style="width:88px;opacity:.95">${typeof l35ArchSvg==='function'?l35ArchSvg(88,'down'):''}</div>
          <div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:262px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.9">
            🍎 Растут одинаково — прямая пропорция.<br>
            1️⃣ Найди «цену одной» (путь за 1 час).<br>
            ✖️ Умножь на нужное количество.<br>
            ⚖️ Или пропорция: a/b = c/x → a·x = b·c.</div>
        </div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там 3 ручки и 45 ₽'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}

function l82Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  switch(act){
    case 's1': st.s1=1; break; case 's2': st.s2=1; break; case 's3': st.s3=1; break;
    case 'n': st.i=((st.i==null?0:st.i)+1)%9; st.s1=st.s2=st.s3=0; break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l82Grid100(pct,uid,col){
  let h='';
  for(let i=0;i<100;i++) h+=`<div style="width:9px;height:9px;margin:0.6px;border-radius:1.5px;background:${i<pct? col||'#e0523d':'rgba(255,255,255,.08)'}"></div>`;
  return `<div style="display:flex;flex-wrap:wrap;width:214px;margin:0 auto">${h}</div>`;
}
function l82Bar(total,pct,uid,opt){
  // полоса 100%: вся = total; pct% закрашено с подписью значения
  const o=opt||{};
  const W=o.w||300;
  const val=Math.round(total*pct/100);
  const labelTop=o.label||`${pct}% от ${total}`;
  return `<div style="width:${W}px;margin:0 auto;text-align:center">
    <div style="display:flex;gap:4px;align-items:center;font-size:11px;color:#cbb89a">${o.left||''}</div>
    <div style="position:relative;height:34px;background:rgba(255,255,255,.07);border-radius:17px;overflow:hidden;border:1px solid rgba(255,255,255,.12)">
      <div class="l35-pop" style="width:${Math.round(W*pct/100)}px;height:34px;background:linear-gradient(90deg,${o.c1||'#e0523d'},${o.c2||'#ff8a70'});border-radius:17px"></div>
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:space-between;padding:0 12px;font-size:12px;color:#fff;font-weight:bold">
        <span>${val}</span><span>${labelTop}</span>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:10px;color:#8aa08f;padding:0 6px"><span>0</span><span>100% = ${total}</span></div>
  </div>`;
}
function l82Coin(n,uid){
  // корзины монет для деления на части (процент = доля)
  const parts=[];
  return `<div style="width:300px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:4px">
    ${Array.from({length:n},(_,i)=>`<span class="l35-pop" style="animation-delay:${(i*0.05).toFixed(2)}s;display:inline-flex;width:20px;height:20px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffe9a8,#d9a52a);box-shadow:inset 0 -2px 3px rgba(0,0,0,.25);font-size:10px;align-items:center;justify-content:center;color:#7a5210">•</span>`).join('')}
  </div>`;
}
function visL82(el){
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
    const rowC=(inner)=>`<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${inner}</div>`;
    let h='';
    if(step===0){
      h=col(big('Распродажа Архимеда'),
        `<div style="font-size:50px" class="l35-pop">🏷️</div>`+
        big('скидка 20% на игрушку за 40 монет — сколько скинут?')+
        sml('проценты встречаются на каждом чеке! разберёмся, что они значат и как считать. листай ➜'));
    } else if(step===1){
      h=col(big('Процент — сотая часть'),
        l82Grid100(1,'a','#5aa8d8')+
        `<div style="text-align:center;font-size:19px" class="wv-pop">1% — это одна клетка из 100</div>`+
        sml('1% числа = число : 100. а 40% — это 40 клеток из 100'));
    } else if(step===2){
      h=col(big('Процент — это десятичная дробь'),
        `<div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap">
          ${[['1%','0,01'],['10%','0,1'],['25%','0,25'],['50%','0,5'],['75%','0,75'],['100%','1']].map(([p,d],i)=>`
            <div class="l35-pop" style="animation-delay:${(i*0.1).toFixed(2)}s;text-align:center;min-width:72px;border:1px solid rgba(127,209,255,.3);border-radius:10px;padding:6px 4px;background:rgba(127,209,255,.05)">
              <div style="font-size:17px;color:#ffd9a0;font-weight:bold">${p}</div><div style="font-size:13px;color:#a9d2ec">= ${d}</div></div>`).join('')}
        </div>`+
        sml('% = поделить на 100: 25% = 0,25 = 1/4 · 50% = 0,5 = 1/2'));
    } else if(step===3){
      h=col(big('Как найти процент от числа'),
        `<div style="font-size:23px;text-align:center;margin:4px 0">p% от N = N · p : 100</div>`+
        l82Bar(80,25,'b',{label:'25% от 80'})+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">80 · 25 : 100 = 20 ✓</div>`+
        sml('80 · 0,25 = 20 — это четверть!'));
    } else if(step===4){
      h=col(big('Удобные проценты'),
        rowC(chip('10% → : 10','rgba(127,209,255,.5)'),chip('25% → : 4','rgba(127,184,160,.5)'),chip('50% → : 2','rgba(232,160,90,.5)'),chip('20% → : 5','rgba(217,164,65,.5)'))+
        l82Bar(150,10,'c',{label:'10% от 150'})+
        `<div class="wv-ans" style="font-size:24px;color:#7fd1a0;font-weight:bold">10% от 150 = 15 · 50% от 60 = 30</div>`+
        sml('запомни «ключи»: так проценты считаются в уме за секунду'));
    } else if(step===5){
      h=col(big('Как в проверке: 20% от 40'),
        rowC(chip('20% = 1/5','rgba(232,160,90,.5)'))+
        `<div style="text-align:center;font-size:14px;color:#cbb89a;margin:2px 0">40 монет раскладываем на 5 корзин (по 8)</div>`+
        l82Coin(40,'d')+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">40 : 5 = 8 ✓</div>`+
        sml('одна корзина из пяти — это и есть 20%!'));
    } else if(step===6){
      h=col(big('Девочки в классе'),
        rowC(chip('30 учеников','rgba(127,184,160,.5)'),chip('40% — девочки','rgba(232,106,90,.5)'))+
        l82Bar(30,40,'e',{label:'40% от 30'})+
        `<div class="wv-ans" style="font-size:26px;color:#7fd1a0;font-weight:bold">30 · 40 : 100 = 12 девочек</div>`+
        sml('30 · 0,4 = 12 — как в наших задачках!'));
    } else if(step===7){
      h=col(big('Обратная задача: находим ВСЁ'),
        rowC(chip('12 девочек — это 40%','rgba(127,209,255,.5)'),chip('сколько всего?','rgba(217,164,65,.5)'))+
        `<div style="font-size:22px;text-align:center" class="wv-pop">всего = часть : p · 100 = 12 : 40 · 100 = 30</div>`+
        l82Bar(30,40,'f',{label:'40% = 12'})+
        sml('если 40 клеток = 12, то 1% = 0,3, а все 100% = 30. второй тип задач!'));
    } else if(step===8){
      h=col(big('Сколько процентов?'),
        rowC(chip('6 из 24 — это сколько %?','rgba(127,209,255,.5)'))+
        `<div style="font-size:22px;text-align:center" class="wv-pop">p = часть : целое · 100 = 6 : 24 · 100 = 25%</div>`+
        l82Bar(24,25,'g',{label:'6 из 24'})+
        sml('третий тип задач: какая часть — столько и процентов: 6 — это четверть, значит 25%'));
    } else if(step===9){
      h=col(big('Шпаргалка трёх типов'),
        `<div style="display:flex;flex-direction:column;gap:6px;align-items:center">
          ${[['1️⃣ процент от числа','N · p : 100','25% от 80 = 20'],['2️⃣ число по проценту','часть : p · 100','12 = 40% → всего 30'],['3️⃣ сколько процентов','часть : целое · 100','6 из 24 → 25%']].map(([t,f,ex],i)=>`
            <div class="l35-pop" style="animation-delay:${(i*0.15).toFixed(2)}s;width:280px;border:1px solid rgba(127,209,255,.25);border-radius:12px;padding:6px 10px;background:rgba(127,209,255,.05);text-align:center">
              <b style="color:#ffd9a0">${t}</b> · <span style="color:#a9d2ec;font-family:Georgia,serif">${f}</span>
              <div style="font-size:12px;color:#9fe8c0">${ex}</div></div>`).join('')}
        </div>`+
        sml('в углублённых курсах эти три задачи решают вместе — так видно связь!'));
    } else if(step===10){
      h=col(big('Скидка в магазине'),
        rowC(chip('товар 150 монет','rgba(232,106,90,.5)'),chip('скидка 10%','rgba(127,209,160,.5)'))+
        `<div style="text-align:center;font-size:22px">старая цена <span style="text-decoration:line-through;color:#e0a99a">150</span> → скидка 15 → <b style="color:#7fd1a0">платим 135</b></div>`+
        l82Bar(150,10,'h',{label:'−10%'})+
        sml('сначала найди процент (10% = 15), потом вычти из цены'));
    } else if(step===11){
      h=col(big('Полоса-диаграмма класса'),
        `<div style="width:300px;margin:0 auto">
          <div style="display:flex;height:38px;border-radius:19px;overflow:hidden">
            <div class="l35-pop" style="width:40%;background:#e0523d"></div>
            <div class="l35-pop" style="animation-delay:.3s;width:60%;background:#5aa8d8"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:12px;color:#f0b0a0"><span>🔴 девочки 40% (12)</span><span style="color:#a9d2ec">🔵 мальчики 60% (18)</span></div>
        </div>`+
        sml('все проценты вместе всегда дают 100% — как целый класс!'));
    } else if(step===12){
      // тренажёр: три типа задач
      const T=[
        ['процент от числа','25% от 200',200*25/100,'25% от 200 = 200·25:100 = 50'],
        ['процент от числа','40% от 30',12,'40% от 30 = 30·0,4 = 12'],
        ['процент от числа','20% от 40',8,'20% от 40 = 40:5 = 8'],
        ['процент от числа','75% от 80',60,'75% от 80 = 80·0,75 = 60'],
        ['число по проценту','?  если 25% = 50',200,'число = 50:25·100 = 200'],
        ['число по проценту','?  если 10% = 15',150,'число = 15:10·100 = 150'],
        ['сколько процентов','8 из 40 — сколько %?',20,'p = 8:40·100 = 20%'],
        ['сколько процентов','30 из 120 — сколько %?',25,'p = 30:120·100 = 25%'],
        ['процент от числа','15% от 60',9,'15% от 60 = 60·15:100 = 9']];
      if(st.i==null) st.i=0;
      const [type,q,ans,sol]=T[st.i];
      h=col(big('Тренажёр: три типа задач'),
        `<div class="wv-row">${chip(type,'rgba(127,209,255,.4)')}</div>`+
        `<div style="font-size:23px;text-align:center;margin:4px 0">${q}</div>`+
        (st.s1? `<div class="l35-pop" style="font-size:17px;text-align:center;color:#ffd9a0">1) вспомни формулу: ${type==='процент от числа'?'часть = целое · p : 100':type==='число по проценту'?'целое = часть : p · 100':'p = часть : целое · 100'}</div>`:'')+
        (st.s2? `<div class="l35-pop" style="font-size:17px;text-align:center;color:#ffd9a0">2) ${sol.split('=')[0].trim()}</div>`:'')+
        (st.s3? `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">ответ: ${ans}${type==='сколько процентов'?'%':''}</div>`:'')+
        btns(btn('1️⃣ формула',`l82Act('${lk}','s1')`),btn('2️⃣ решение',`l82Act('${lk}','s2')`),btn('3️⃣ ответ',`l82Act('${lk}','s3')`),btn('🎲 другой',`l82Act('${lk}','n')`),btn('↺',`l82Act('${lk}','r')`))+
        sml('потренируй все три типа — так проценты запомнятся навсегда!'));
    } else {
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap">
          <div style="width:88px;opacity:.95">${typeof l35ArchSvg==='function'?l35ArchSvg(88,'down'):''}</div>
          <div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:256px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.9">
            💯 % — это сотая часть: 1% = 0,01.<br>
            ✖️ % от числа: N · p : 100.<br>
            🔄 Число по проценту: часть : p · 100.<br>
            🧮 Сколько %: часть : целое · 100.</div>
        </div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там 20% от 40'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}

function l81Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  const POOL=[['2,5','+','1,75'],['3,2','+','2,85'],['5,3','-','1,8'],['9','-','3,25'],['1,8','+','0,75'],['7,4','-','2,65'],['4,05','+','1,9'],['6,5','-','4,25']];
  switch(act){
    case 's1': st.s1=1; break; case 's2': st.s2=1; break; case 's3': st.s3=1; break;
    case 'n': st.i=((st.i==null?0:st.i)+1)%POOL.length; st.s1=st.s2=st.s3=0; break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l81Parse(s){ // '2,75' -> {w:'2', f:'75'} ; целое '9' -> w:'9', f:''
  const i=s.indexOf(','); 
  if(i<0) return {w:s,f:''};
  return {w:s.slice(0,i), f:s.slice(i+1)};
}
function l81Pad(A,B){ // дописать нули до равной дробной части; вернуть {a:{w,f},b:{w,f},lenW,lenF}
  const a=l81Parse(A), b=l81Parse(B);
  const lenF=Math.max(a.f.length,b.f.length);
  a.f=(a.f+'0'.repeat(lenF)).slice(0,lenF);
  b.f=(b.f+'0'.repeat(lenF)).slice(0,lenF);
  const lenW=Math.max(a.w.length,b.w.length);
  a.w=('0'.repeat(lenW)+a.w).slice(-lenW);
  b.w=('0'.repeat(lenW)+b.w).slice(-lenW);
  return {a,b,lenW,lenF};
}
function l81Calc(A,B,op){
  const {a,b,lenW,lenF}=l81Pad(A,B);
  // работаем с целыми числами как строки цифр len = lenW+lenF; dot между ними
  const dA=(a.w+a.f).split('').map(Number);
  const dB=(b.w+b.f).split('').map(Number);
  const L=dA.length;
  const res=[], carry=[], borrow=[];
  if(op==='+'){
    let c=0;
    for(let i=L-1;i>=0;i--){ const s=dA[i]+dB[i]+c; carry[i]=Math.floor(s/10); res[i]=s%10; c=carry[i]; }
  } else {
    let rem=0;
    for(let i=L-1;i>=0;i--){ let av=dA[i]-rem; borrow[i]=av<dB[i]; if(av<dB[i]) av+=10; res[i]=av-dB[i]; rem=borrow[i]?1:0; }
  }
  // собрать результат с учётом dot
  const dotIdx=lenF===0? -1 : L-lenF; // индекс после этой цифры? dot между L-lenF-1 и L-lenF
  const lead=op==='+'? (carry[0]? res[0]: res[0]): res[0];
  return {res,carry,borrow,lenW,lenF,L,dotAfter:L-lenF-1};
}
function l81ColView(A,B,op,uid){
  const {a,b,lenW,lenF}=l81Pad(A,B);
  const m=l81Calc(A,B,op);
  const L=m.L;
  // массив ячеек слева направо: [целые... , ',', дроби...]
  const names=(i)=>{ // i от 0 (лево) .. L-1 (право), индекс внутри объединённых
    const fromRight=L-1-i; // 0 = самая правая (сотые если есть)
    if(fromRight<lenF){ const nn=['','десятые','сотые','тысячные']; return nn[lenF-fromRight]||''; }
    const wIdx=fromRight-lenF; // 0=единицы...
    const wn=['единицы','десятки','сотни','тысячи','десятки тысяч'];
    return wn[wIdx]||'';
  };
  const seqA=a.w.split('').map(Number).concat(a.f.split('').map(Number));
  const seqB=b.w.split('').map(Number).concat(b.f.split('').map(Number));
  const resDigits=m.res; // массив длины L
  const cw=52;
  const cellW=(val,kind,i)=>{
    const iL= i>=lenW? i+1: i; // смещение для запятой: целые идут слева; после lenW цифр ставим ',' затем дроби
    return `<div style="width:${cw}px;height:44px;display:flex;align-items:center;justify-content:center;font-family:Georgia,serif;font-weight:bold;font-size:28px;color:${kind==='res'?'#1a6a4a':kind==='b'?'#c96a3a':'#2a3a4a'}">${val}</div>`;
  };
  const row=(arr,kind)=>{
    let cells='';
    for(let i=0;i<L;i++){
      const isFrac=i>=lenW;
      if(!isFrac) cells+=cellW(arr[i],kind,i);
      else { if(i===lenW) cells+=`<div style="width:16px;display:flex;align-items:flex-end;justify-content:center;font-size:30px;color:#e0523d;font-weight:bold;padding-bottom:6px">,</div>`; cells+=cellW(arr[i],kind,i); }
    }
    return cells;
  };
  const rowsTop=row(seqA,'a');
  const rowsBot=row(seqB,'b');
  const rowsRes=row(resDigits,'res');
  const labels=Array.from({length:lenW+lenF},(_,i)=>{
    const w=i===lenW? 16: cw;
    return `<div style="width:${w}px;font-size:9px;color:#8aa08f;text-align:center">${i===lenW?'':names(i)}</div>`;
  }).join('');
  return `<div style="display:flex;justify-content:center;align-items:flex-start">
    <div style="display:flex;flex-direction:column;background:rgba(255,255,255,.03);border-radius:12px;padding:6px 8px">
      <div style="display:flex;justify-content:flex-end">${rowsTop}</div>
      <div style="display:flex;justify-content:flex-end;position:relative"><div style="position:absolute;left:-4px;top:8px;font-size:26px;color:#c96a3a;font-weight:bold">${op}</div>${rowsBot}</div>
      <div style="border-top:3px solid #2a3a4a;margin:2px 4px 0 0"></div>
      <div style="display:flex;justify-content:flex-end">${rowsRes}</div>
      <div style="display:flex;justify-content:flex-end;margin-top:1px">${labels}</div>
    </div>
  </div>`;
}
function l81Hundred(num,uid,col){
  // сетка 10×10 для сотых: num/100 закрашено
  let h='';
  for(let r=0;r<10;r++) for(let c=0;c<10;c++){
    const idx=r*10+c;
    h+=`<div style="width:13px;height:13px;margin:0.5px;border-radius:2px;background:${idx<num? col||'#5aa8d8' : 'rgba(255,255,255,.07)'}"></div>`;
  }
  return `<div style="display:flex;flex-wrap:wrap;width:150px;margin:0 auto">${h}</div>`;
}
function visL81(el){
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
    const rowC=(inner)=>`<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${inner}</div>`;
    let h='';
    if(step===0){
      h=col(big('Касса Архимеда'),
        `<div style="font-size:48px" class="l35-pop">🧾</div>`+
        big('2,50 + 1,75 — сколько заплатить?')+
        sml('деньги — это десятичные дроби: рубли и копейки. посчитаем по-научному! листай ➜'));
    } else if(step===1){
      h=col(big('Разряды числа 2,857'),
        `<div style="text-align:center;font-size:42px;font-family:Georgia,serif;color:#fff;font-weight:bold;letter-spacing:2px;margin:4px 0">2<span style="color:#e0523d">,</span>857</div>`+
        rowC(chip('2 — единицы','rgba(127,184,160,.5)'),chip('8 — десятые','rgba(232,160,90,.5)'),chip('5 — сотые','rgba(127,209,255,.5)'),chip('7 — тысячные','rgba(217,164,65,.5)'))+
        sml('запятая отделяет целую часть от дробной. после неё идут десятые, сотые, тысячные…'));
    } else if(step===2){
      h=col(big('Десятичная = обыкновенная'),
        `<div style="font-size:22px;text-align:center">0,1 = 1/10 · 0,25 = 25/100 · 0,857 = 857/1000</div>`+
        rowC(l81Hundred(25,'x','#5aa8d8'),`<div style="font-size:13px;color:#cbb89a;max-width:130px">25 клеток из 100 — это 25 сотых = 0,25</div>`)+
        sml('знаменатель 10, 100, 1000… — сколько нулей, столько цифр после запятой!'));
    } else if(step===3){
      h=col(big('Как читать'),
        rowC(chip('3,14 — три целых 14 сотых','rgba(127,209,255,.5)'),chip('0,05 — пять сотых','rgba(127,184,160,.5)'))+
        `<div style="text-align:center;font-size:19px;margin:4px 0">«целых …» + последний разряд после запятой</div>`+
        sml('0,5 — пять десятых · 2,7 — две целых семь десятых · 0,25 — двадцать пять сотых'));
    } else if(step===4){
      h=col(big('Сравниваем'),
        `<div style="text-align:center;font-size:24px;margin:4px 0">3,2 <b style="color:#7fd1a0">›</b> 3,19? → 3,20 › 3,19 ✓</div>`+
        `<div style="text-align:center;font-size:24px;margin:4px 0">2,5 <b style="color:#7fd1a0">=</b> 2,50</div>`+
        sml('сначала целые, потом десятые, сотые… приписывай нули справа и сравнивай поразрядно'));
    } else if(step===5){
      h=col(big('Запятая под запятой!'),
        rowC(
          `<div style="text-align:center;width:150px;border:2px solid rgba(224,82,61,.5);border-radius:12px;padding:8px;background:rgba(224,82,61,.06)"><div style="font-size:19px;font-family:Georgia,serif;line-height:1.6">2,5<br>+&nbsp;&nbsp;1,75</div><div class="wv-sml" style="font-size:10px;color:#e0a99a">запятые врозь — каша!</div></div>`+
          `<div style="text-align:center;width:150px;border:2px solid rgba(127,209,160,.55);border-radius:12px;padding:8px;background:rgba(127,209,160,.06)"><div style="font-size:19px;font-family:Georgia,serif;line-height:1.6">2,50<br>+1,75</div><div class="wv-sml" style="font-size:10px;color:#9fceb2">запятая под запятой</div></div>`)+
        sml('как в обычном столбике, только по обе стороны от запятой — свои разряды'));
    } else if(step===6){
      h=col(big('Приписываем нули'),
        rowC(chip('2,5 = 2,50 = 2,500','rgba(127,184,160,.5)'))+
        `<div style="text-align:center;font-size:22px;margin:4px 0">1 = 1,0 = 1,00 = 1,000</div>`+
        sml('нули справа ничего не меняют: 2,5 — это те же 2,50. зато удобно складывать!'));
    } else if(step===7){
      h=col(big('Складываем: 2,5 + 1,75'),
        l81ColView('2,5','1,75','+','a')+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">2,50 + 1,75 = 4,25 ✓</div>`+
        sml('сотые: 0+5=5; десятые: 5+7=12 — единица в уме; единицы: 2+1+1=4'));
    } else if(step===8){
      h=col(big('Как в проверке: 3,2 + 2,85'),
        l81ColView('3,2','2,85','+','b')+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">3,20 + 2,85 = 6,05 ✓</div>`+
        sml('сотые: 0+5=5; десятые: 2+8=10 → пишем 0, единица в уме; единицы: 3+2+1=6'));
    } else if(step===9){
      h=col(big('Вычитаем: 5,3 − 1,8'),
        l81ColView('5,3','1,8','-','c')+
        `<div class="wv-ans" style="font-size:28px;color:#1a5a8a;font-weight:bold">5,30 − 1,80 = 3,50 = 3,5</div>`+
        sml('десятых не хватает (3 < 8) — занимаем у единиц, как в обычном столбике'));
    } else if(step===10){
      h=col(big('Из целого: 9 − 3,25'),
        l81ColView('9','3,25','-','d')+
        `<div class="wv-ans" style="font-size:28px;color:#1a5a8a;font-weight:bold">9,00 − 3,25 = 5,75 ✓</div>`+
        sml('девятку пишем как 9,00 и занимаем через ноль — как в уроке про столбик!'));
    } else if(step===11){
      h=col(big('Маша в парке'),
        rowC(chip('1,8 км до парка','rgba(127,184,160,.5)'),chip('0,75 км по парку','rgba(127,209,255,.5)'))+
        l81ColView('1,8','0,75','+','e')+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">1,80 + 0,75 = 2,55 км</div>`+
        sml('всего Маша прошла 2,55 км — как в наших задачках!'));
    } else if(step===12){
      const POOL=[['2,5','+','1,75'],['3,2','+','2,85'],['5,3','-','1,8'],['9','-','3,25'],['1,8','+','0,75'],['7,4','-','2,65'],['4,05','+','1,9'],['6,5','-','4,25']];
      if(st.i==null) st.i=0;
      const [A,op,B]=POOL[st.i];
      const {a,b,lenW,lenF}=l81Pad(A,B);
      const m=l81Calc(A,B,op);
      const L=m.L;
      let resStr='';
      for(let i=0;i<L;i++){ resStr+=m.res[i]; if(i===lenW-1&&lenF>0) resStr+=','; }
      resStr=resStr.replace(/^0+(?=\d)/,'').replace(/0+$/,'').replace(/,$/,'');
      if(resStr===''||resStr==='-') resStr='0';
      const paddedA=lenF? a.w+','+a.f : a.w;
      const paddedB=lenF? b.w+','+b.f : b.w;
      h=col(big('Тренажёр: касса Архимеда'),
        `<div style="font-size:22px;text-align:center">${A} ${op} ${B} = ?</div>`+
        l81ColView(A,B,op,'t')+
        (st.s1? `<div class="l35-pop" style="font-size:17px;text-align:center;color:#ffd9a0">1) выровняли: ${paddedA} и ${paddedB} — запятая под запятой</div>`:'')+
        (st.s2? `<div class="l35-pop" style="font-size:17px;text-align:center;color:#ffd9a0">2) ${op==='+'?'сложили поразрядно (единица в уме — перенос)':'вычли поразрядно (занимали при нехватке)'}</div>`:'')+
        (st.s3? `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">${A} ${op} ${B} = ${resStr}</div>`:'')+
        btns(btn('1️⃣ выровнять',`l81Act('${lk}','s1')`),btn('2️⃣ посчитать',`l81Act('${lk}','s2')`),btn('3️⃣ ответ',`l81Act('${lk}','s3')`),btn('🎲 другой',`l81Act('${lk}','n')`),btn('↺',`l81Act('${lk}','r')`))+
        sml('по шагам: допиши нули → сложи/вычти поразрядно, держа запятую под запятой → ответ'));
    } else {
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap">
          <div style="width:88px;opacity:.95">${typeof l35ArchSvg==='function'?l35ArchSvg(88,'down'):''}</div>
          <div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:258px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.9">
            ✍️ Запятая ПОД запятой — столбиком!<br>
            0️⃣ Приписывай нули справа: 2,5 = 2,50.<br>
            ➕ 10 сотых = 1 десятая · 10 десятых = 1.<br>
            🔍 Сравнивай поразрядно, от целых к сотым.</div>
        </div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там 3,2 + 2,85'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}

function l80Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  const POOL=[[2,3,'*',3,8],[3,4,':',3,8],[2,5,'*',10],[3,5,':',2,5],[1,2,'*',2,3],[2,3,'*',3,4],[7,10,':',7,10],[4,9,'*',3,8]];
  switch(act){
    case 's1': st.s1=1; break; case 's2': st.s2=1; break; case 's3': st.s3=1; break;
    case 'n': st.i=((st.i==null?0:st.i)+1)%POOL.length; st.s1=st.s2=st.s3=0; break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l80Bar(num,den,uid){
  const cells=[];
  const W=270;
  const seg=Math.floor(W/den);
  for(let i=0;i<den;i++){
    const on=i<num;
    cells.push(`<div style="width:${Math.max(2,seg-2)}px;height:20px;margin:1px;border-radius:3px;${on?'background:#e0523d':'background:rgba(255,255,255,.08);border:1px dashed rgba(255,255,255,.25)'}"></div>`);
  }
  return `<div style="width:${W}px;margin:0 auto;display:flex;justify-content:center;padding:4px;background:rgba(255,255,255,.05);border-radius:8px">${cells.join('')}</div>`;
}
function l80Frac(a,b,opt){
  const o=opt||{};
  return `<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;font-family:Georgia,serif;font-weight:bold;color:${o.col||'#fff'};font-size:${o.fs||26}px;line-height:1.05;${o.strike?`text-decoration:line-through;opacity:.55;color:#e0523d`:''}">
    <span style="padding:0 6px">${a}</span><span style="border-top:2px solid ${o.col||'#fff'};padding:0 6px;">${b}</span></span>`;
}
function l80Grid(a,b,c,d,uid){
  // прямоугольник-сетка: b столбцов × d рядов; пересечение a×c клеток
  const W=300;
  const cols=b, rows=d;
  const colW=Math.floor((W-30)/cols);
  const rowH=Math.max(9,Math.floor(138/rows));
  const gx=Math.floor((W-30-cols*colW)/2);
  let html='';
  for(let r=0;r<rows;r++){
    let row='';
    for(let col=0;col<cols;col++){
      const x=gx+col*colW, y=14+r*rowH;
      const dark= col<a && r<c;
      const v= col<a && !(r<c);
      const h= (r<c) && !(col<a);
      const fill= dark? '#e0523d' : v? 'rgba(224,82,61,.42)' : h? 'rgba(47,143,90,.42)' : 'rgba(255,255,255,.07)';
      row+=`<div class="l35-pop" style="animation-delay:${((r*cols+col)*0.012).toFixed(3)}s;position:absolute;left:${x}px;top:${y}px;width:${colW-1}px;height:${rowH-1}px;border-radius:3px;background:${fill}"></div>`;
    }
    html+=row;
  }
  // рамка
  const frame=`<div style="position:absolute;left:${gx-2}px;top:12px;width:${cols*colW+2}px;height:${rows*rowH+2}px;border:2px solid #7fa3ba;border-radius:6px"></div>`;
  return `<div style="position:relative;width:${W}px;height:186px;margin:0 auto;text-align:center">
    ${frame}${html}
    <div style="position:absolute;bottom:2px;left:0;right:0;font-size:13px;color:#ffd9a0;font-weight:bold">${a}·${c} клеток из ${b}·${d} → ${l80Frac(a*c,b*d,{fs:20})}</div>
  </div>`;
}
function l80Cross(a,b,c,d,uid){
  // сокращение крест-накрест до умножения: показываем заменённые пары
  const gcd=(x,y)=>{x=Math.abs(x);y=Math.abs(y);while(y){const t=x%y;x=y;y=t;}return x;};
  const g1=gcd(a,d), g2=gcd(c,b);
  const na=a/g1, nd=d/g1, nc=c/g2, nb=b/g2;
  const pairLbl=(p,q,ga,naa,nqq,pad)=>{
    // p над q; зачёркиваем и пишем уменьшенные
    return `<span style="display:inline-flex;flex-direction:column;align-items:center;margin:0 ${pad||4}px;font-family:Georgia,serif;font-weight:bold;color:#fff">
      <span style="position:relative;padding:0 4px;font-size:24px">${ga>1?`<span style="opacity:.45;text-decoration:line-through;color:#e0523d">${p}</span> <span style="color:#7fd1a0">${naa}</span>`:p}</span>
      <span style="border-top:2px solid #fff;padding:0 4px;font-size:24px">${ga>1?`<span style="opacity:.45;text-decoration:line-through;color:#e0523d">${q}</span> <span style="color:#7fd1a0">${nqq}</span>`:q}</span>
    </span>`;
  };
  return `<div style="width:300px;margin:0 auto;text-align:center;background:rgba(255,255,255,.03);border:1px solid rgba(127,209,255,.14);border-radius:14px;padding:10px 4px">
    <div style="font-size:13px;color:#cbb89a;margin-bottom:6px">сокращаем «крест-накрест» ДО умножения:</div>
    <div style="display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px">
      ${pairLbl(a,d,g1,na,nd,2)}<span style="font-size:26px;color:#e0523d;font-weight:bold">×</span>
      ${pairLbl(c,b,g2,nc,nb,2)}<span style="font-size:26px;color:#cbb89a">=</span>
      ${l80Frac(na*nc,nb*nd,{fs:30,col:'#7fd1a0'})}
    </div>
    ${g1>1||g2>1?`<div style="margin-top:6px;font-size:12px;color:#8aa08f">тройки сократились, 2 и 8 — тоже. осталось ${na*nc}/${nb*nd}</div>`:''}
  </div>`;
}
function l80Mirror(a,b,uid){
  // взаимообратные: a/b и b/a, произведение 1
  const W=300;
  return `<div style="width:${W}px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap">
    ${l80Frac(a,b,{fs:30,col:'#9fe8c0'})}<span style="font-size:20px;color:#cbb89a">⇄ зеркало ⇄</span>${l80Frac(b,a,{fs:30,col:'#a9d2ec'})}
    <div style="width:100%;text-align:center;font-size:15px;color:#ffd9a0">${l80Frac(a,b,{fs:20})} · ${l80Frac(b,a,{fs:20})} = ${l80Frac(1,1,{fs:22,col:'#7fd1a0'})} = 1</div>
  </div>`;
}
function l80DivGeo(a,b,c,d,uid){
  // «сколько порций c/d помещается в a/b» — деление геометрически: a/b : c/d
  const W=300;
  const pie=(n,d2,col)=>{
    const size=54, cx=size/2, cy=size/2+2, r=size/2-3;
    const st=360/d2;
    let s='';
    for(let i=0;i<d2;i++){
      const on=i<n;
      s+=`<path d="${l79Sector(cx,cy,r,-90+i*st,-90+(i+1)*st)}" fill="${on?col:'#2b3a4a'}" stroke="#fff" stroke-width="2"/>`;
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="display:block;margin:0 auto">${s}</svg>`;
  };
  return `<div style="width:${W}px;margin:0 auto;text-align:center">
    <div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap">
      <div><div style="font-size:11px;color:#cbb89a">у нас ${l80Frac(a,b,{fs:26})} торта</div>${pie(a,b,'#f0a35a')}</div>
      <div style="font-size:22px;color:#cbb89a">:</div>
      <div><div style="font-size:11px;color:#cbb89a">порция ${l80Frac(c,d,{fs:26})}</div>${pie(c,d,'#5aa8d8')}</div>
      <div style="font-size:22px;color:#cbb89a">=</div>
      <div><div style="font-size:30px;font-weight:bold;color:#7fd1a0">${l80Frac(a*d,b*c,{fs:30,col:'#7fd1a0'})}</div><div style="font-size:12px;color:#cbb89a">порций помещается</div></div>
    </div>
  </div>`;
}
function l80Cup(uid){
  // стакан сахара 1/2 для задачи из жизни
  const W=300;
  return `<div style="width:${W}px;margin:0 auto;text-align:center">
    <div style="display:flex;align-items:flex-end;justify-content:center;gap:10px">
      <div style="position:relative;width:80px;height:120px;border:3px solid #b9c6d0;border-top:none;border-radius:0 0 12px 12px;overflow:hidden;background:rgba(255,255,255,.06)">
        <div style="position:absolute;left:0;right:0;bottom:0;height:60px;background:linear-gradient(#f6e7c0,#e8c98a)" class="l35-pop"></div>
        <div style="position:absolute;left:0;right:0;bottom:60px;height:2px;background:rgba(255,255,255,.6)"></div>
        <div style="position:absolute;top:8px;left:0;right:0;text-align:center;font-size:10px;color:#cbb89a">½ стакана</div>
      </div>
      <div style="text-align:left;font-size:14px;color:#d8ecff;max-width:180px">нужно 2/3 от 3/4 стакана сахара →<br><b style="color:#7fd1a0">2/3 · 3/4 = 6/12 = ½</b><br><span style="color:#8aa08f">ровно полстакана!</span></div>
    </div>
  </div>`;
}
function visL80(el){
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
    const rowC=(inner)=>`<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${inner}</div>`;
    let h='';
    if(step===0){
      h=col(big('Кафе Архимеда'),
        `<div style="font-size:50px" class="l35-pop">🍰</div>`+
        big('2/3 от 3/4 торта — это сколько?')+
        sml('умножение дробей — это «часть от части»! разберёмся на прямоугольнике-сетке. листай ➜'));
    } else if(step===1){
      h=col(big('Часть от части (сетка)'),
        l80Grid(2,3,3,4,'g')+
        sml('красные полосы — это 2/3 по вертикали, зелёные — 3/4 по горизонтали. пересечение 2·3 = 6 клеток из 3·4 = 12'));
    } else if(step===2){
      h=col(big('Правило умножения'),
        `<div style="text-align:center;font-size:24px">${l80Frac(2,3)} · ${l80Frac(3,4)} = ${l80Frac(6,12,{fs:34,col:'#7fd1a0'})} = ${l80Frac(1,2,{fs:34,col:'#7fd1a0'})}</div>`+
        rowC(chip('числитель × числитель','rgba(224,82,61,.5)'),chip('знаменатель × знаменатель','rgba(127,184,160,.5)'))+
        sml('перемножаем верха с верхами, низа с низами. 6/12 — это половина!'));
    } else if(step===3){
      h=col(big('Сокращай ДО умножения!'),
        l80Cross(2,3,3,8,'c')+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">2/3 · 3/8 = 1/4 ✓</div>`+
        sml('тройка с тройкой, двойка с восьмёркой — и считать почти нечего! как в нашей проверке'));
    } else if(step===4){
      h=col(big('Целое число — тоже дробь'),
        `<div style="text-align:center;font-size:24px">${l80Frac(2,5)} · 10 = ${l80Frac(2,5)} · ${l80Frac(10,1,{col:'#a9d2ec'})} = ${l80Frac(20,5,{col:'#cbb89a'})} = <b style="color:#7fd1a0">4</b></div>`+
        rowC(chip('20/5 = 4','rgba(127,209,160,.5)'))+
        sml('любое целое — это дробь со знаменателем 1: 10 = 10/1. 20/5 = 4 целых!'));
    } else if(step===5){
      h=col(big('Смешанное → неправильная'),
        `<div style="text-align:center;font-size:23px" class="wv-pop">1 1/2 · 2/3 = 3/2 · 2/3 = 1</div>`+
        rowC(chip('1 1/2 = 3/2','rgba(127,209,160,.5)'),chip('тройки и двойки сократились!','rgba(232,160,90,.5)'))+
        sml('перед умножением смешанное число переводим в неправильную дробь: целое × знаменатель + числитель'));
    } else if(step===6){
      h=col(big('Волшебное зеркало'),
        l80Mirror(3,4,'m')+
        sml('3/4 и 4/3 — взаимообратные: их произведение всегда 1. переверни дробь — и умножишь на 1!'));
    } else if(step===7){
      h=col(big('Делить — значит «сколько помещается»'),
        l80DivGeo(3,4,3,8,'d')+
        sml('в 3/4 торта помещается ровно 2 порции по 3/8. как это посчитать? умножим на перевёрнутую!'));
    } else if(step===8){
      h=col(big('Правило деления'),
        `<div style="text-align:center;font-size:22px">${l80Frac(3,4)} : ${l80Frac(3,8)} = ${l80Frac(3,4)} · ${l80Frac(8,3,{col:'#a9d2ec'})} = ${l80Frac(24,12,{col:'#cbb89a'})} = <b style="color:#7fd1a0">2</b></div>`+
        sml('деление на дробь = умножение на её «зеркало». первая дробь стоит на месте!'));
    } else if(step===9){
      h=col(big('Деление с сокращением'),
        `<div style="text-align:center;font-size:22px">${l80Frac(3,5)} : ${l80Frac(2,5)} = ${l80Frac(3,5)} · ${l80Frac(5,2,{col:'#a9d2ec'})} = ${l80Frac(15,10,{col:'#cbb89a'})} = <b style="color:#7fd1a0">3/2</b></div>`+
        sml('пятёрки сократились! 15/10 = 3/2. как в наших задачках'));
    } else if(step===10){
      h=col(big('Ловушки'),
        rowC(
          `<div style="text-align:center;width:140px;border:2px solid rgba(224,82,61,.5);border-radius:12px;padding:8px"><div style="font-size:20px">❌</div>${l80Frac(2,3)} · ${l80Frac(3,8)} ≠ ${l80Frac(5,11)}<div class="wv-sml" style="font-size:10px;color:#e0a99a">не складывай!</div></div>`+
          `<div style="text-align:center;width:140px;border:2px solid rgba(224,82,61,.5);border-radius:12px;padding:8px"><div style="font-size:20px">❌</div>${l80Frac(3,4)} : ${l80Frac(2,3)} ≠ ${l80Frac(3,2,{col:'#e0523d'})}<div class="wv-sml" style="font-size:10px;color:#e0a99a">переверни ВТОРУЮ, а не первую!</div></div>`)+
        sml('числители и знаменатели перемножаются, а при делении переворачиваем ТОЛЬКО вторую дробь'));
    } else if(step===11){
      h=col(big('Дроби в жизни'),
        l80Cup('p')+
        rowC(chip('в 3/5 пиццы порций по 2/5: 3/5:2/5 = 3/2','rgba(127,209,255,.4)'))+
        sml('умножение — «сколько от», деление — «сколько раз помещается». и то, и другое — в кухне Архимеда!'));
    } else if(step===12){
      const POOL=[[2,3,'*',3,8],[3,4,':',3,8],[2,5,'*',10],[3,5,':',2,5],[1,2,'*',2,3],[2,3,'*',3,4],[7,10,':',7,10],[4,9,'*',3,8]];
      if(st.i==null) st.i=0;
      const e=POOL[st.i];
      const [a,b,op,c,d]=e.length===5? e: [e[0],e[1],e[2],e[3],1];
      const isDiv=op===':';
      const isWhole=e.length===4;
      let prodN, prodD;
      if(isDiv){ prodN=a*d; prodD=b*c; } else if(isWhole){ prodN=a*c; prodD=b; } else { prodN=a*c; prodD=b*d; }
      const gcd=(x,y)=>{x=Math.abs(x);y=Math.abs(y);while(y){const t=x%y;x=y;y=t;}return x||1;};
      const g=gcd(prodN,prodD);
      const baseN=prodN/g, baseD=prodD/g;
      // сокращение крест-накрест (парами числитель↔чужой знаменатель)
      let rf1N, rf1D, rf2N, rf2D;
      if(isDiv){ const g1=gcd(a,c), g2=gcd(d,b); rf1N=a/g1; rf1D=b/g2; rf2N=d/g2; rf2D=c/g1; }
      else if(isWhole){ const g2=gcd(c,b); rf1N=a; rf1D=b/g2; rf2N=c/g2; rf2D=1; }
      else { const g1=gcd(a,d), g2=gcd(c,b); rf1N=a/g1; rf1D=b/g2; rf2N=c/g2; rf2D=d/g1; }
      h=col(big('Тренажёр: перемножь или подели!'),
        `<div style="font-size:24px;text-align:center">${l80Frac(a,b)} ${op} ${e.length===5? l80Frac(c,d) : c} = ?</div>`+
        (st.s1? `<div class="l35-pop" style="font-size:17px;text-align:center;color:#ffd9a0">1) ${isDiv?'деление = умножение на перевёрнутую: '+l80Frac(a,b)+' · '+l80Frac(d,c): isWhole? 'целое '+c+' записываем как '+c+'/1: '+l80Frac(a,b)+' · '+l80Frac(c,1): 'оставляем как есть: '+l80Frac(a,b)+' · '+l80Frac(c,d)}</div>`:'')+
        (st.s2? `<div class="l35-pop" style="font-size:17px;text-align:center;color:#ffd9a0">2) сокращаем крест-накрест → ${l80Frac(rf1N,rf1D)} · ${l80Frac(rf2N,rf2D)}</div>`:'')+
        (st.s3? `<div class="wv-ans" style="font-size:26px;color:#7fd1a0;font-weight:bold">ответ: ${g>1? l80Frac(baseN,baseD)+'  (сократили на '+g+')' : l80Frac(prodN,prodD)}</div>`:'')+
        btns(btn('1️⃣ записать',`l80Act('${lk}','s1')`),btn('2️⃣ сократить',`l80Act('${lk}','s2')`),btn('3️⃣ ответ',`l80Act('${lk}','s3')`),btn('🎲 другой',`l80Act('${lk}','n')`),btn('↺',`l80Act('${lk}','r')`))+
        sml('по шагам: перепиши (переверни вторую при делении) → сократи крест-накрест → перемножь'));
    } else {
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap">
          <div style="width:88px;opacity:.95">${typeof l35ArchSvg==='function'?l35ArchSvg(88,'down'):''}</div>
          <div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:258px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.9">
            ✖️ Умножение: верх × верх, низ × низ.<br>
            ✂️ Сокращай «крест-накрест» ДО умножения.<br>
            ➗ Деление: умножь на перевёрнутую вторую.<br>
            🔁 3/4 и 4/3 — взаимообратные: вместе 1.</div>
        </div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там 2/3 · 3/8'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}

function l79Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  const POOL=[[[2,7],[3,7]],[[5,8],[2,8]],[[3,8],[4,8]],[[2,3],[1,4]],[[5,6],[3,4]],[[1,4],[2,4]],[[3,10],[7,10]],[[1,6],[5,6]],[[1,3],[1,6]]];
  switch(act){
    case 'e+': st.eat=Math.min(8,(st.eat==null?0:st.eat)+1); break;
    case 'e-': st.eat=Math.max(0,(st.eat==null?0:st.eat)-1); break;
    case 's1': st.s1=1; break; case 's2': st.s2=1; break; case 's3': st.s3=1; break;
    case 'n': st.i=((st.i==null?0:st.i)+1)%POOL.length; st.s1=st.s2=st.s3=0; break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l79F(a,b){ // красивая дробь a/b
  return `<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;font-family:Georgia,serif;line-height:1.05">
    <span style="padding:0 6px;font-size:${b? 'inherit':''}">${a}</span>
    <span style="border-top:2px solid currentColor;padding:0 6px;">${b}</span>
  </span>`;
}
function l79Bar(num,den,uid,opt){
  const o=opt||{};
  const W=o.w||270, H=o.h||44;
  const seg=Math.floor(W/den);
  const cells=[];
  for(let i=0;i<den;i++){
    const on=i<num;
    cells.push(`<div class="l35-pop" style="animation-delay:${(0.06+i*0.06).toFixed(2)}s;width:${seg-2}px;height:${H-14}px;margin:1px;border-radius:4px;${on?`background:${o.col||'#e0523d'};box-shadow:0 1px 2px rgba(0,0,0,.2)`:'background:rgba(255,255,255,.09);border:1px dashed rgba(255,255,255,.25)'}"></div>`);
  }
  return `<div style="text-align:center">
    <div style="width:${W}px;margin:0 auto;background:rgba(255,255,255,.05);border-radius:10px;display:flex;justify-content:center;padding:6px 2px;border:1px solid rgba(255,255,255,.1)">${cells.join('')}</div>
    <div style="margin-top:3px;color:#d8ecff;font-size:15px">${num} из ${den} — это ${o.label||''}</div>
  </div>`;
}
function l79Sector(cx,cy,r,a0,a1){
  const rad=(d)=>d*Math.PI/180;
  const x0=cx+r*Math.cos(rad(a0)), y0=cy+r*Math.sin(rad(a0));
  const x1=cx+r*Math.cos(rad(a1)), y1=cy+r*Math.sin(rad(a1));
  const large=a1-a0>180?1:0;
  return `M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z`;
}
function l79Pizza(num,den,uid,opt){
  const o=opt||{};
  const size=o.s||170, cx=size/2, cy=size/2+8, r=size/2-16;
  const col=o.col||'#f0a35a';
  const step=360/den;
  let html='';
  for(let i=0;i<den;i++){
    const on=i<num;
    html+=`<path d="${l79Sector(cx,cy,r,-90+i*step,-90+(i+1)*step)}" fill="${on?col:'#2b3a4a'}" stroke="#fffdf6" stroke-width="2"/>`;
  }
  html+=`<circle cx="${cx}" cy="${cy}" r="${r*0.22}" fill="#e0523d" stroke="#b3543f" stroke-width="2"/>`;
  html+=`<text x="${cx}" y="${cy+4}" text-anchor="middle" font-size="13" fill="#fff" font-weight="bold">${num}/${den}</text>`;
  const marks=[];
  for(let i=0;i<den;i++){
    const a=-90+i*step+step/2;
    marks.push(`${num>i?'':'×'}`);
  }
  return `<svg width="${size}" height="${size+8}" viewBox="0 0 ${size} ${size+8}" style="display:block;margin:0 auto;overflow:visible">
    ${html}
  </svg>`;
}
function l79Conv(a,b,uid){
  // приведение к общему знаменателю НОК
  const g=(()=>{let x=a,y=b; while(y){const t=x%y;x=y;y=t;} return x;})();
  const l=a/g*b;
  return {l, k1:l/a, k2:l/b};
}
function l79Frac(a,b,big){
  return `<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;font-family:Georgia,serif;font-weight:bold;color:#fff;font-size:${big?'32':'24'}px;line-height:1.05">
    <span>${a}</span><span style="border-top:2px solid #fff;padding:0 8px;">${b}</span></span>`;
}
function visL79(el){
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
    const rowC=(inner)=>`<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${inner}</div>`;
    let h='';
    if(step===0){
      const eat=Math.max(0,Math.min(8,st.eat==null?0:st.eat));
      h=col(big('Пицца Архимеда'),
        l79Pizza(eat,8,'p0',{col:'#e0523d'})+
        btns(btn('🍕 взять кусок',`l79Act('${lk}','e+')`),btn('− кусок',`l79Act('${lk}','e-')`))+
        sml('знаменатель — на сколько кусков разрезали (8), числитель — сколько взяли ('+eat+'). бери куски и смотри!'));
    } else if(step===1){
      h=col(big('Что говорит дробь'),
        rowC(l79Pizza(3,5,'a',{s:140,col:'#5aa8d8'}),l79Pizza(4,7,'b',{s:140,col:'#8ab860'}))+
        sml('знаменатель — на сколько равных частей делим · числитель — сколько берём'));
    } else if(step===2){
      h=col(big('Когда дробь — целое'),
        rowC(chip('7/7 = 1','rgba(127,209,160,.5)'),chip('9/7 = 1 целая 2/7','rgba(127,209,255,.5)'))+
        l79Pizza(7,7,'c',{s:150,col:'#f0a35a'})+
        sml('взяли все 7 кусков — целая пицца! неправильная дробь 9/7 — это целая и ещё 2/7'));
    } else if(step===3){
      h=col(big('Складываем с одинаковым знаменателем'),
        `<div style="display:flex;gap:10px;justify-content:center;align-items:flex-end;flex-wrap:wrap">
          ${l79Frac(2,7)}<span style="font-size:24px;color:#cbb89a">+</span>${l79Frac(3,7)}<span style="font-size:24px;color:#cbb89a">=</span>${l79Frac(5,7)}</div>`+
        l79Bar(5,7,'d',{col:'#e0523d'})+
        sml('куски одного размера: 2 седьмых + 3 седьмых = 5 седьмых. складываем ТОЛЬКО числители!'));
    } else if(step===4){
      h=col(big('Вычитаем'),
        `<div style="display:flex;gap:10px;justify-content:center;align-items:flex-end;flex-wrap:wrap">
          ${l79Frac(5,8)}<span style="font-size:24px;color:#cbb89a">−</span>${l79Frac(2,8)}<span style="font-size:24px;color:#cbb89a">=</span>${l79Frac(3,8)}</div>`+
        l79Bar(5,8,'e',{col:'#5aa8d8'})+
        sml('убрали 2 восьмых из 5 — осталось 3 восьмых. знаменатель не меняется!'));
    } else if(step===5){
      h=col(big('Сокращаем: 6/8 = 3/4'),
        l79Bar(6,8,'f',{col:'#8ab860'})+
        `<div style="text-align:center;font-size:19px" class="wv-pop">6/8 → делим и верх и низ на 2 → 3/4</div>`+
        l79Bar(3,4,'g',{col:'#f0a35a'})+
        sml('куски крупнее — а пиццы одинаковые! 6 восьмых и 3 четверти — одно и то же количество'));
    } else if(step===6){
      h=col(big('Почему нельзя 2/3 + 1/4 напрямую'),
        rowC(l79Pizza(2,3,'h',{s:120,col:'#e0523d'}),`<div style="font-size:22px;color:#cbb89a">+</div>`,l79Pizza(1,4,'i',{s:120,col:'#5aa8d8'}),`<div style="font-size:22px;color:#e0523d">✗</div>`,l79Frac(3,7))+
        sml('куски РАЗНОГО размера: треть и четверть нельзя складывать как «3/7»! сначала — одинаковые дольки'));
    } else if(step===7){
      const cv=l79Conv(3,4);
      h=col(big('Общий знаменатель — НОК'),
        rowC(chip('НОК(3, 4) = 12','rgba(217,164,65,.45)'))+
        l79Bar(8,12,'j',{col:'#e0523d'})+
        l79Bar(3,12,'k',{col:'#5aa8d8'})+
        sml('2/3 = 8/12 (дорезали на 12 долек), 1/4 = 3/12. теперь куски одинаковые — можно складывать!'));
    } else if(step===8){
      h=col(big('Складываем с разными знаменателями'),
        `<div style="display:flex;gap:10px;justify-content:center;align-items:flex-end;flex-wrap:wrap">
          ${l79Frac(8,12)}<span style="font-size:22px;color:#cbb89a">+</span>${l79Frac(3,12)}<span style="font-size:22px;color:#cbb89a">=</span>${l79Frac(11,12,1)}</div>`+
        `<div class="wv-ans" style="font-size:26px;color:#7fd1a0;font-weight:bold">2/3 + 1/4 = 11/12 ✓</div>`+
        sml('три шага: НОК знаменателей → приведи каждую дробь → сложи числители'));
    } else if(step===9){
      h=col(big('Вычитаем с разными знаменателями'),
        rowC(chip('НОК(6, 4) = 12','rgba(217,164,65,.45)'))+
        `<div style="font-size:22px;text-align:center">5/6 − 3/4 = 10/12 − 9/12 = <b style="color:#7fd1a0">1/12</b></div>`+
        sml('5/6 = 10/12 (умножили на 2), 3/4 = 9/12 (на 3). 10 − 9 = 1 двенадцатая!'));
    } else if(step===10){
      h=col(big('Смешанные числа'),
        rowC(chip('1 1/4 + 1 2/4 = 2 3/4','rgba(127,209,160,.5)'))+
        `<div style="font-size:21px;text-align:center;margin:4px 0">3 1/4 − 1 3/4 = ? не хватает четверти → занимаем целое</div>`+
        `<div style="font-size:21px;text-align:center" class="wv-pop">3 1/4 = 2 5/4 → 2 5/4 − 1 3/4 = 1 2/4 = <b style="color:#7fd1a0">1 1/2</b></div>`+
        sml('целые складываем с целыми, дроби с дробями; не хватает — «размениваем» целое, как десяток в столбике!'));
    } else if(step===11){
      h=col(big('Ловушка: не складывай знаменатели!'),
        rowC(`<div style="text-align:center;opacity:.6">${l79Frac(3,8)} + ${l79Frac(4,8)} = <span style="color:#e0523d;text-decoration:line-through">${l79Frac(7,16)}</span></div>`) +
        `<div style="font-size:22px;text-align:center" class="l35-pop">правильно: <b style="color:#7fd1a0">7/8</b></div>`+
        l79Bar(7,8,'l',{col:'#e0523d'})+
        sml('кусков было 8 — и осталось 8! знаменатель не меняется: 3/8 + 4/8 = 7/8'));
    } else if(step===12){
      const POOL=[[[2,7],[3,7]],[[5,8],[2,8]],[[3,8],[4,8]],[[2,3],[1,4]],[[5,6],[3,4]],[[3,10],[7,10]],[[1,6],[5,6]],[[1,3],[1,6]]];
      if(st.i==null) st.i=2;
      const [[a1,a2],[b1,b2]]=POOL[st.i];
      const cv=l79Conv(a2,b2);
      const same=a2===b2;
      const n1=same? a1 : a1*cv.k1, d1=same?a2:cv.l;
      const n2=same? b1 : b1*cv.k2, d2=same?b2:cv.l;
      const resN=n1+n2;
      const resD=d1;
      const g=(()=>{let x=resN,y=resD;while(y){const t=x%y;x=y;y=t;}return x||1;})();
      h=col(big('Тренажёр: пиццы Архимеда'),
        `<div style="display:flex;gap:8px;justify-content:center;align-items:center;flex-wrap:wrap">
          ${l79Pizza(a1,a2,'m1',{s:110,col:'#e0523d'})}${l79Pizza(b1,b2,'m2',{s:110,col:'#5aa8d8'})}</div>`+
        `<div style="font-size:24px;text-align:center">${l79Frac(a1,a2)} + ${l79Frac(b1,b2)} = ?</div>`+
        (st.s1? `<div class="l35-pop" style="font-size:18px;text-align:center;color:#ffd9a0">1) общий знаменатель НОК(${a2}, ${b2}) = ${cv.l}${same?' (он уже есть!)':''}</div>`:'')+
        (st.s2? `<div class="l35-pop" style="font-size:18px;text-align:center;color:#ffd9a0">2) ${l79Frac(a1,a2)} = ${l79Frac(n1,d1)} ${same?'':`· ${l79Frac(b1,b2)} = ${l79Frac(n2,d2)}`}</div>`:'')+
        (st.s3? `<div class="wv-ans" style="font-size:26px;color:#7fd1a0;font-weight:bold">${n1}+${n2} = ${resN} → ${g>1&&resN%g===0&&resD%g===0?`${l79Frac(resN/g,resD/g)} (сократили на ${g})`:l79Frac(resN,resD)}</div>`:'')+
        btns(btn('1️⃣ знаменатель',`l79Act('${lk}','s1')`),btn('2️⃣ привести',`l79Act('${lk}','s2')`),btn('3️⃣ ответ',`l79Act('${lk}','s3')`),btn('🎲 другой пример',`l79Act('${lk}','n')`),btn('↺',`l79Act('${lk}','r')`))+
        sml('решай по шагам: НОК → привести → сложить числители. потом открой ответ!'));
    } else {
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap">
          <div style="width:88px;opacity:.95">${typeof l35ArchSvg==='function'?l35ArchSvg(88,'down'):''}</div>
          <div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:258px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.9">
            🍕 Одинаковые знаменатели — складывай числители.<br>
            🔢 Разные — приведи к НОК знаменателей.<br>
            ✂️ Не забудь сократить ответ, если можно.<br>
            🥧 Не хватает дробной части — займи целое!</div>
        </div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там 3/8 + 4/8'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}

function l78Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  const PAIRS=[[12,18],[6,8],[18,24],[60,48],[4,6],[14,21],[20,30],[16,24],[35,49],[9,12]];
  switch(act){
    case 'n': st.i=((st.i==null?0:st.i)+1)%PAIRS.length; break;
    case 'g': st.sho='g'; break;
    case 'l': st.sho='l'; break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l78Prime(n){
  const out=[]; let x=n;
  for(let d=2;d*d<=x;d++){ while(x%d===0){ out.push(d); x/=d; } }
  if(x>1) out.push(x);
  return out;
}
function l78Chip(t,c,delay){
  return `<span class="l35-pop" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:2px 10px;border-radius:9px;background:rgba(255,255,255,.05);border:1px solid ${c||'rgba(127,209,255,.4)'};font-size:15px;color:#d8ecff;margin:2px">${t}</span>`;
}
function l78Ladder(n,uid){
  // «лесенка» разложения: делим на простые, пока не дойдём до 1
  const steps=[]; let x=n; const d2=[]; let d=2;
  while(x>1){
    while(x%d===0){ d2.push(d); x/=d; }
    d++;
  }
  let cur=n; let html='';
  let i=0;
  for(const p of d2){
    const nx=cur/p;
    html+=`<div class="l35-pop" style="animation-delay:${(i*0.28).toFixed(2)}s;display:flex;align-items:center;justify-content:center;gap:8px;margin:2px 0">
      <span style="min-width:56px;text-align:right;font-size:22px;font-family:Georgia,serif;color:#fff;font-weight:bold">${cur}</span>
      <span style="color:#e8a05a;font-weight:bold">÷ ${p}</span>
      <span style="min-width:20px;text-align:center;color:#cbb89a">→</span>
      <span style="min-width:56px;font-size:22px;font-family:Georgia,serif;color:#7fd1a0;font-weight:bold">${nx}</span>
    </div>`;
    cur=nx; i++;
  }
  return `<div style="width:260px;margin:0 auto;background:rgba(255,255,255,.03);border:1px solid rgba(127,209,255,.14);border-radius:14px;padding:8px 6px;text-align:center">
    <div style="font-size:12px;color:#cbb89a;margin-bottom:4px">«лесенка» вниз — делим на простые, пока не останется 1</div>
    ${html}
    <div style="font-size:15px;color:#ffd9a0;margin-top:4px">${n} = ${d2.join(' · ')}</div>
  </div>`;
}
function l78PowShow(a,b,uid){
  // каноническое разложение двух чисел рядами степеней простых
  const fa={}, fb={};
  const add=(map,arr)=>{ arr.forEach(p=>map[p]=(map[p]||0)+1); };
  add(fa,l78Prime(a)); add(fb,l78Prime(b));
  const primes=Array.from(new Set([...Object.keys(fa),...Object.keys(fb)].map(Number))).sort((x,y)=>x-y);
  const powStr=(f,p)=> f[p]? (f[p]===1? p : `${p}<sup>${f[p]}</sup>`) : null;
  const row=(name,f,col)=>{
    const cells=primes.map(p=>{
      const s=powStr(f,p);
      const hit=!!s;
      return `<div style="min-width:46px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;${hit?`background:${col};color:#fff;font-weight:bold`:'background:rgba(255,255,255,.05);color:#8aa08f'}">${s||'—'}</div>`;
    }).join('');
    const cap=primes.map(p=>`<div style="min-width:46px;font-size:11px;color:#8aa08f;text-align:center">${p}</div>`).join('');
    return `<div><div style="display:flex;justify-content:center;gap:4px">${cells}</div><div style="display:flex;justify-content:center;gap:4px">${cap}</div><div style="text-align:center;font-size:12px;color:#cbb89a;margin-top:2px">${name} = ${Object.keys(f).sort((x,y)=>x-y).map(p=>powStr(f,p)).join(' · ')}</div></div>`;
  };
  return `<div style="width:290px;margin:0 auto;text-align:center">
    ${row(`${a}`,`${fa}`,'#3a6fa8')}
    <div style="height:6px"></div>
    ${row(`${b}`,`${fb}`,'#8a5a34')}
  </div>`;
}
function l78Picks(a,b,uid,kind){
  // выбрать общие в младших (НОД) или все в старших (НОК)
  const fa={}, fb={};
  const add=(map,arr)=>{ arr.forEach(p=>map[p]=(map[p]||0)+1); };
  add(fa,l78Prime(a)); add(fb,l78Prime(b));
  const primes=Array.from(new Set([...Object.keys(fa),...Object.keys(fb)].map(Number))).sort((x,y)=>x-y);
  const val = kind==='nod'? Math.min : Math.max;
  const stylePick=kind==='nod'? '#e0523d':'#2f8f5a';
  let row='';
  primes.forEach((p,idx)=>{
    const pa=fa[p]||0, pb=fb[p]||0;
    const show = kind==='nod'? (pa>0&&pb>0): true;
    const s = kind==='nod'? (show? p : '—') : powt(p, val(pa,pb));
    row+=`<div class="l35-pop" style="animation-delay:${(0.2+idx*0.22).toFixed(2)}s;display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.04);border-radius:10px;padding:4px 10px;margin:3px 0">
      <span style="width:74px;font-size:13px;color:#cbb89a">${a}: ${p}${pa>1?`<sup>${pa}</sup>`:''} · ${b}: ${p}${pb>1?`<sup>${pb}</sup>`:''}</span>
      <span style="flex:1"></span>
      <span style="font-size:19px;font-weight:bold;color:${show?stylePick:'#5b6b78'}">${show? (kind==='nod'? p : powt(p,val(pa,pb))) : '—'}</span>
      <span style="font-size:11px;color:#8aa08f;width:86px">${kind==='nod'? (show?'общий — берём':'не общий — мимо'):(pa===pb? 'в старшей — берём':`${Math.max(pa,pb)} шт — берём`)}</span>
    </div>`;
    function powt(pp,k){ return k===1? pp : `${pp}<sup>${k}</sup>`; }
  });
  return `<div style="width:300px;margin:0 auto;text-align:center">${row}</div>`;
}
function l78DivRow(n,uid){
  const divs=[]; for(let d=1;d<=n;d++) if(n%d===0) divs.push(d);
  const caps=[];
  const mark=divs.map((d,i)=>`<div class="l35-pop" style="animation-delay:${(i*0.1).toFixed(2)}s;display:inline-block;min-width:34px;text-align:center;font-size:16px;color:#d8ecff;border:1px solid rgba(127,209,255,.25);border-radius:8px;padding:3px 4px;margin:2px">${d}</div>`).join('');
  caps.push(`<div style="text-align:center;font-size:13px;color:#9fc5e8;margin-bottom:2px">делители ${n}</div><div style="text-align:center">${mark}</div>`);
  return `<div>${caps.join('')}</div>`;
}
function l78LCM(a,b,uid){
  // шкалы кратных до общего: два ряда точек; первое общее — кружок
  const L=[]; for(let k=1;;k++){ if((a*k)%b===0){ L.push(a*k); break; } }
  const lcm=L[0];
  const mk=(n,other,color)=>{
    let s='';
    let found=false;
    for(let k=1; n*k<=lcm+ n; k++){
      const v=n*k;
      const hit=v===lcm;
      if(v>lcm&&!found) break;
      if(v>lcm&&found) break;
      s+=`<span style="position:relative;display:inline-flex;align-items:center;justify-content:center;width:${v===lcm?46:34}px;height:30px;margin:2px;font-size:15px;${hit?`background:${color};color:#fff;font-weight:bold;border-radius:50%`:'color:#9fc5e8;border:1px dashed rgba(159,197,232,.3);border-radius:8px'}">${v}</span>`;
      if(hit) found=true;
    }
    return s;
  };
  return `<div style="width:300px;margin:0 auto;text-align:center">
    <div style="font-size:12px;color:#cbb89a">кратные ${a}:</div><div>${mk(a,b,'#2f8f5a')}</div>
    <div style="font-size:12px;color:#cbb89a;margin-top:4px">кратные ${b}:</div><div>${mk(b,a,'#2f6fb0')}</div>
    <div style="margin-top:6px;font-size:15px;color:#ffd9a0;font-weight:bold">первое общее — НОК(${a}, ${b}) = ${lcm}</div>
  </div>`;
}
function visL78(el){
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
    const rowC=(inner)=>`<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${inner}</div>`;
    let h='';
    if(step===0){
      h=col(big('Мастерская Архимеда'),
        `<div style="font-size:50px" class="l35-pop">🏛️</div>`+
        big('плитку 24×18 — на сколько равных квадратов? маяки 3с и 4с — когда вспыхнут вместе?')+
        sml('две загадки: «на сколько частей делим» и «когда совпадёт». их решают НОД и НОК! листай ➜'));
    } else if(step===1){
      h=col(big('Делители и кратные'),
        rowC(
          `<div style="flex:1;min-width:140px;border:1px solid rgba(224,82,61,.4);border-radius:12px;padding:8px;text-align:center"><div style="font-size:26px">➗</div><b>делитель</b><div class="wv-sml" style="font-size:10px">на него число делится без остатка</div><div style="font-size:15px;color:#f0a89a">6 | 12 · 6 | 18</div></div>`+
          `<div style="flex:1;min-width:140px;border:1px solid rgba(127,209,255,.4);border-radius:12px;padding:8px;text-align:center"><div style="font-size:26px">🔁</div><b>кратное</b><div class="wv-sml" style="font-size:10px">делится на число без остатка</div><div style="font-size:15px;color:#a9d2ec">12 = 6·2 · 18 = 6·3</div></div>`)+
        sml('делители числа — «на что делится», кратные — «что делится на него»'));
    } else if(step===2){
      h=col(big('Простые и составные'),
        rowC(chip('2, 3, 5, 7, 11, 13, 17, 19 — простые','rgba(127,184,160,.5)'))+
        `<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">${[2,3,4,5,6,7,8,9,10,11,12,13].map((n,i)=>{ const pr=l78Prime(n).length===1; return `<div class="l35-pop" style="animation-delay:${(i*0.07).toFixed(2)}s;width:44px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:19px;${pr?'background:#3a8a5a;color:#fff;font-weight:bold':'background:rgba(255,255,255,.06);color:#cbb89a'}">${n}</div>`; }).join('')}</div>`+
        sml('простое делится только на 1 и на себя. из простых «собраны» все остальные числа!'));
    } else if(step===3){
      h=col(big('Лесенка разложения'),
        rowC(chip('разложим 12','rgba(232,160,90,.5)'),chip('и 18','rgba(232,160,90,.5)'))+
        `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${l78Ladder(12,'a')}${l78Ladder(18,'b')}</div>`+
        sml('делим на простые, пока не дойдём до 1: 12 = 2·2·3, 18 = 2·3·3'));
    } else if(step===4){
      h=col(big('Канонический вид'),
        rowC(chip('12 = 2²·3','rgba(232,160,90,.5)'),chip('18 = 2·3²','rgba(232,160,90,.5)'),chip('60 = 2²·3·5','rgba(127,184,160,.5)'))+
        sml('одинаковые простые собираем в степень: маленькая цифра сверху — сколько раз взяли. так числа записывают в учебниках углублённого курса!'));
    } else if(step===5){
      h=col(big('НОД перебором'),
        `<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">${l78DivRow(12,'c')}${l78DivRow(18,'d')}</div>`+
        `<div class="wv-ans" style="font-size:26px;color:#e0523d;font-weight:bold">общие: 1, 2, 3, 6 → НОД(12, 18) = 6</div>`+
        sml('выпиши делители обоих, найди общие — самый большой и есть НОД'));
    } else if(step===6){
      h=col(big('НОД через разложение'),
        l78PowShow(12,18,'p')+
        l78Picks(12,18,'q','nod')+
        `<div class="wv-ans" style="font-size:24px;color:#e0523d;font-weight:bold">общие простые в МЛАДШЕЙ степени: 2¹·3¹ = 6</div>`+
        sml('берём только ОБЩИЕ простые и каждый в меньшей из двух степеней'));
    } else if(step===7){
      h=col(big('Большой пример'),
        l78PowShow(60,48,'r')+
        `<div class="wv-ans" style="font-size:24px;color:#e0523d;font-weight:bold">НОД(60, 48) = 2²·3 = 12</div>`+
        sml('60 = 2²·3·5, 48 = 2⁴·3: общие — 2 и 3, берём 2²·3 → 12. проверь перебором!'));
    } else if(step===8){
      h=col(big('НОК перебором'),
        l78LCM(4,6,'m')+
        sml('выписываем кратные: у 4 — 4, 8, 12…; у 6 — 6, 12… первое общее и есть НОК'));
    } else if(step===9){
      h=col(big('НОК через разложение'),
        l78PowShow(6,8,'n')+
        l78Picks(6,8,'o','lcm')+
        `<div class="wv-ans" style="font-size:24px;color:#2f8f5a;font-weight:bold">все простые в СТАРШЕЙ степени: 2³·3 = 24</div>`+
        sml('НОК(6, 8) = 24 — так и в нашей проверке! 6 = 2·3, 8 = 2³'));
    } else if(step===10){
      h=col(big('Взаимно простые'),
        rowC(chip('НОД(4, 9) = 1','rgba(127,209,160,.5)'),chip('НОК(4, 9) = 4·9 = 36','rgba(127,209,255,.5)'))+
        sml('нет общих простых — числа взаимно простые: НОД = 1, а НОК равен просто произведению!'));
    } else if(step===11){
      h=col(big('Связь НОД и НОК'),
        rowC(chip('НОД(6, 8) · НОК(6, 8) = 2 · 24 = 48 = 6·8','rgba(217,164,65,.4)'))+
        `<div style="font-size:22px;color:var(--brass);font-family:Georgia,serif">НОД · НОК = a · b</div>`+
        sml('эта формула — в углублённых учебниках: знаешь НОД — сразу найдёшь НОК!'));
    } else if(step===12){
      const PAIRS=[[12,18],[6,8],[18,24],[60,48],[4,6],[14,21],[20,30],[16,24],[35,49],[9,12]];
      if(st.i==null) st.i=0;
      const [a,b]=PAIRS[st.i];
      const g=(()=>{ let g=1; for(let d=2;d<=Math.min(a,b);d++) if(a%d===0&&b%d===0) g=d; return g; })();
      const l= a/g*b;
      let out='';
      if(st.sho){
        const isG=st.sho==='g';
        out=`<div class="l35-pop" style="margin-top:6px;font-size:18px;font-weight:bold;color:${isG?'#f0a89a':'#9fe8c0'}">${isG? `НОД(${a}, ${b}) = ${g} — общие простые в младшей степени` : `НОК(${a}, ${b}) = ${l} — все простые в старшей степени`}</div>`;
        out+=`<div style="font-size:12px;color:#cbb89a">${l78Prime(a).join('·')} и ${l78Prime(b).join('·')} → ${isG? `общие: ${(l78Prime(a).filter(p=>b%p===0)).join('·')||'—'}`:''}</div>`;
      }
      h=col(big('Тренажёр: НОД или НОК?'),
        `<div class="wv-row">${chip(a+' и '+b,'rgba(217,164,65,.35)')}</div>`+
        l78PowShow(a,b,'t')+
        out+
        btns(btn('🔴 покажи НОД',`l78Act('${lk}','g')`),btn('🟢 покажи НОК',`l78Act('${lk}','l')`),btn('🎲 другой пример',`l78Act('${lk}','n')`),btn('↺',`l78Act('${lk}','r')`))+
        sml('сначала посчитай сам: разложи на простые, НОД — общие в младшей степени, НОК — все в старшей. потом проверь!'));
    } else {
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap">
          <div style="width:88px;opacity:.95">${typeof l35ArchSvg==='function'?l35ArchSvg(88,'down'):''}</div>
          <div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:256px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.9">
            🔴 НОД — общие простые в МЛАДШЕЙ степени.<br>
            🟢 НОК — все простые в СТАРШЕЙ степени.<br>
            🤝 Взаимно простые: НОД=1, НОК = a·b.<br>
            🔁 НОД · НОК = a·b · НОД — «делим», НОК — «когда совпадёт».</div>
        </div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там НОК(6, 8)'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}

function l77Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  const POOL=[150,275,306,480,505,610,720,845,908,990,1000,124,355,268,530,795,860,244,915,100];
  switch(act){
    case 'pick2': st.ans='2'; break;
    case 'pick5': st.ans='5'; break;
    case 'pick10': st.ans='10'; break;
    case 'new': st.i=(st.i==null?0:(st.i+1))%POOL.length; st.ans=null; break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l77Big(n,uid,opt){
  // крупное число: последняя цифра в цветной рамке
  const o=opt||{};
  const s=String(n);
  const digits=s.split('').map((d,i)=>{
    const last=i===s.length-1;
    const col=o.col||(last? (o.hot?'#e0523d':'#d9a52a') : '#2a3a4a');
    return `<div style="width:${o.cw||52}px;height:${o.ch||62}px;display:flex;align-items:center;justify-content:center;font-family:Georgia,serif;font-size:${o.fs||44}px;font-weight:bold;color:${col};${last?`background:${o.hot?'rgba(224,82,61,.12)':'rgba(217,165,42,.14)'};border:3px dashed ${o.hot?'#e0523d':'#d9a52a'};border-radius:12px;`:'margin:0 1px;'}" class="${last?'l35-pop':''}">${d}</div>`;
  }).join('');
  return `<div style="display:flex;justify-content:center;align-items:center">${digits}</div>`;
}
function l77Wheel(uid){
  // кольцо последних цифр: цвет = на что делится число с такой цифрой
  const W=300,H=300, cx=150, cy=150, r=96;
  const dig=['0','1','2','3','4','5','6','7','8','9'];
  const cls=['gold','none','two','none','two','five','two','none','two','none'];
  const col={gold:'#e8b04a',two:'#7fb8d8',five:'#8ab860',none:'#9aa7b4'};
  let html='';
  dig.forEach((d,i)=>{
    const a=-90+i*36;
    const rad=a*Math.PI/180;
    const x=cx+r*Math.cos(rad), y=cy+r*Math.sin(rad);
    const c=col[cls[i]];
    html+=`<g transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><circle r="24" fill="${c}" stroke="#ffffff" stroke-width="2"/>
      <text y="7" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold">${d}</text></g>`;
  });
  html+=`<text x="${cx}" y="${cy-6}" text-anchor="middle" font-size="13" fill="#5b6b78" font-weight="bold">последняя цифра</text>
    <text x="${cx}" y="${cy+12}" text-anchor="middle" font-size="11" fill="#8aa08f">решает всё!</text>`;
  const leg=[['#e8b04a','0 → ÷10, ÷5, ÷2'],['#8ab860','5 → ÷5'],['#7fb8d8','2,4,6,8 → ÷2'],['#9aa7b4','1,3,7,9 — ни на что из трёх']];
  const legend=leg.map(([c,t])=>`<div style="display:flex;align-items:center;gap:6px;font-size:11px;color:#e8e0cc"><span style="width:14px;height:14px;border-radius:4px;background:${c};display:inline-block"></span>${t}</div>`).join('');
  return `<div style="width:${W}px;margin:0 auto;text-align:center">
    <svg width="${W}" height="${W}" viewBox="0 0 ${W} ${W}" style="display:block">${html}</svg>
    <div style="display:flex;flex-direction:column;gap:4px;align-items:flex-start;background:rgba(255,255,255,.05);border-radius:12px;padding:8px 12px;max-width:280px;margin:0 auto">${legend}</div>
  </div>`;
}
function l77Grid100(div,uid){
  // сетка 1..100, подсвечены кратные div
  const W=300;
  const cell=(n)=>{
    const hit=n%div===0;
    return `<div style="width:27px;height:22px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;${hit?'background:#e8b04a;color:#fff;font-weight:bold;box-shadow:0 0 6px rgba(232,176,74,.5)':'color:#8aa08f'}">${n}</div>`;
  };
  const rows=[];
  for(let r=0;r<10;r++){
    const cells=[];
    for(let c=1;c<=10;c++) cells.push(cell(r*10+c));
    rows.push(`<div style="display:flex;gap:2px">${cells.join('')}</div>`);
  }
  return `<div style="width:${W}px;margin:0 auto;text-align:center"><div style="display:inline-flex;flex-direction:column;gap:2px">${rows.join('')}</div>
    <div style="margin-top:4px;font-size:13px;color:#e8d9a8;font-weight:bold">кратных ${div} от 1 до 100: ровно ${100/div}</div></div>`;
}
function l77Gates(uid){
  // очередь чисел у трёх ворот (пропускной пункт)
  const gate=(n,cond,pass,lab)=>{
    return `<div style="text-align:center;flex:1;min-width:96px">
      <div style="position:relative;height:86px;display:flex;align-items:flex-end;justify-content:center">
        <div style="position:absolute;left:50%;transform:translateX(-50%);top:0;font-size:30px;font-family:Georgia,serif;font-weight:bold;color:${pass?'#7fd1a0':'#e0523d'}">${n}</div>
        <svg width="80" height="52" viewBox="0 0 80 52" style="display:block">
          <path d="M6,52 V26 A34,34 0 0 1 74,26 V52 Z" fill="${pass?'#7fd1a0':'#b05a4a'}" opacity="${pass?'.2':'.12'}"/>
          <path d="M6,52 V26 A34,34 0 0 1 74,26 V52" fill="none" stroke="${pass?'#3a9a5a':'#c96a3a'}" stroke-width="4"/>
          <text x="40" y="40" text-anchor="middle" font-size="13" fill="${pass?'#3a9a5a':'#c96a3a'}" font-weight="bold">${lab}</text>
        </svg>
      </div>
      <div style="font-size:11px;color:#cbb89a">${pass?'✅ проходит':'❌ не проходит'}</div>
    </div>`;
  };
  // число 480: проходит все трое
  const row480=`<div style="display:flex;gap:6px;justify-content:center;margin:2px 0">${gate('480',true,true,'÷2')}${gate('480',true,true,'÷5')}${gate('480',true,true,'÷10')}</div>`;
  // 125: только через ÷5
  const row125=`<div style="display:flex;gap:6px;justify-content:center;margin:2px 0">${gate('125',false,false,'÷2')}${gate('125',true,true,'÷5')}${gate('125',false,false,'÷10')}</div>`;
  return `<div style="background:rgba(255,255,255,.03);border:1px solid rgba(127,209,255,.14);border-radius:14px;padding:8px 6px;width:300px;margin:0 auto">${row480}${row125}</div>`;
}
function l77Sort(uid,N){
  // корзины: ÷2 ÷5 ÷10; при клике l77Act set ans; показываем результат
  const d2=N%2===0, d5=N%5===0, d10=N%10===0;
  const targets=[['÷2',d2,'2'],['÷5',d5,'5'],['÷10',d10,'10']];
  const ask = [d2,d5,d10].filter(Boolean).length===1 ? [true,true,true] : [d2,d5,d10];
  return `<div style="width:300px;margin:0 auto;text-align:center">
    <div style="font-size:15px;color:#cbb89a;margin-bottom:4px">куда пропустим число?</div>
    ${l77Big(N,'s',{hot:true,cw:46,ch:54,fs:38})}
    <div style="display:flex;gap:8px;justify-content:center;margin-top:10px">
      ${targets.map(([lab,ok,key])=>{
        const base=`flex:1;border-radius:14px;padding:10px 4px;font-size:16px;font-weight:bold;cursor:pointer;`;
        const style= ok? 'border:2px solid rgba(127,209,160,.6);background:rgba(127,209,160,.08);color:#9fe8c0;' : 'border:2px solid rgba(232,106,90,.45);background:rgba(232,106,90,.06);color:#e0a99a;';
        return `<button class="hint-btn" style="${base}${style}" onclick="l77Act('${N? '':'x'}','pick${key==='2'?'2':key==='5'?'5':'10'}')">${lab}</button>`;
      }).join('')}
    </div>
  </div>`;
}
function visL77(el){
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
    const rowC=(inner)=>`<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${inner}</div>`;
    const ok=c=>`<span style="display:inline-block;padding:2px 10px;border-radius:9px;font-size:14px;color:#9fe8c0;background:rgba(127,209,160,.1);border:1px solid rgba(127,209,160,.5)">${c}</span>`;
    const no=c=>`<span style="display:inline-block;padding:2px 10px;border-radius:9px;font-size:14px;color:#e0a99a;background:rgba(232,106,90,.1);border:1px solid rgba(232,106,90,.5)">${c}</span>`;
    let h='';
    if(step===0){
      h=col(big('Пропускной пункт Архимеда'),
        `<div style="font-size:52px" class="l35-pop">🏛️</div>`+
        big('стражник смотрит на ПОСЛЕДНЮЮ цифру!')+
        sml('чтобы узнать, делится ли число на 2, 5 или 10, не надо делить всё число — достаточно одной последней цифры! листай ➜'));
    } else if(step===1){
      h=col(big('Из чего состоит число'),
        l77Big(245,'a',{})+
        `<div style="font-size:17px;text-align:center;margin:4px 0">245 = 24 десятка + <b style="color:#d9a52a">5 единиц</b></div>`+
        sml('десятки всегда делятся на 10, 5 и 2. значит, всё решают единицы — последняя цифра!'));
    } else if(step===2){
      h=col(big('Делится на 10 — только …0'),
        l77Big(480,'b',{hot:true})+
        rowC(ok('480 ÷ 10 = 48'),no('473 ÷ 10 — нет'))+
        sml('на 10 делятся числа, оканчивающиеся на 0'));
    } else if(step===3){
      h=col(big('Делится на 5 — …0 или …5'),
        l77Big(125,'c',{hot:true})+
        rowC(ok('125 ÷ 5 = 25'),ok('340 ÷ 5 = 68'),no('128 ÷ 5 — нет'))+
        sml('смотрим на последнюю цифру: 0 или 5 — пропускаем!'));
    } else if(step===4){
      h=col(big('Делится на 2 — чётные'),
        l77Big(306,'d',{hot:true})+
        rowC(ok('306 ÷ 2 = 153'),ok('488 ÷ 2 = 244'),no('125 ÷ 2 — нет'))+
        sml('чётная последняя цифра: 0, 2, 4, 6 или 8'));
    } else if(step===5){
      h=col(big('Карта цифр-ключей'),
        l77Wheel('w')+
        sml('запомни кольцо: золотая 0 — проходит все ворота; зелёная 5 — ворота ÷5; синие чётные — ворота ÷2; серые — стоят в сторонке'));
    } else if(step===6){
      h=col(big('Число-всезнайка 480'),
        l77Gates('g')+
        sml('480 кончается на 0: чётное (÷2), кончается на 0 или 5 (÷5) и на 0 (÷10) — проходит все три ворота!'));
    } else if(step===7){
      h=col(big('А 125?'),
        `<div style="font-size:19px;text-align:center">125 = 12 десятков + <b style="color:#e0523d">5 единиц</b></div>`+
        rowC(no('125 ÷ 2 — нечётное'),ok('125 ÷ 5 = 25'),no('125 ÷ 10 — нет'))+
        sml('последняя цифра 5: пропуск только на ÷5. десятки тут ни при чём!'));
    } else if(step===8){
      h=col(big('Почему десятки не важны'),
        rowC(chip('10·k делится и на 10, и на 5, и на 2','rgba(127,184,160,.5)'))+
        l77Big(730,'e',{hot:true})+
        sml('730 = 73·10 + 0: десятки делятся всегда, остаётся проверить последнюю цифру 0 — всё ворота открыты!'));
    } else if(step===9){
      h=col(big('Как в проверке'),
        rowC(chip('305','rgba(232,106,90,.5)'),chip('462','rgba(232,106,90,.5)'),chip('500','rgba(127,209,160,.6)'))+
        `<div style="text-align:center">${l77Big(500,'f',{hot:true})}</div>`+
        `<div class="wv-ans" style="font-size:26px;color:#7fd1a0;font-weight:bold">500: ÷2, ÷5 и ÷10 ✓</div>`+
        sml('только у 500 последняя цифра 0 — ответ готов за секунду!'));
    } else if(step===10){
      if(st.i==null) st.i=3;
      const N=[150,275,306,480,505,610,720,845,908,990,124,355,268,530,795,860,244,915,100][st.i];
      const d2=N%2===0,d5=N%5===0,d10=N%10===0;
      const truth={2:d2,5:d5,10:d10};
      let verdict='';
      if(st.ans){
        const key=st.ans;
        const good=truth[key];
        verdict=`<div class="l35-pop" style="margin-top:6px;font-size:17px;font-weight:bold;color:${good?'#9fe8c0':'#ffb0a0'}">${good? '✅ верно! '+N+' делится на '+key : '❌ нет: '+N+' не делится на '+key}</div>`;
        if(key==='10') verdict+= `<div style="font-size:12px;color:#cbb89a">подсказка: ÷10 — только цифра 0 на конце</div>`;
        if(key==='5'&&!good) verdict+= `<div style="font-size:12px;color:#cbb89a">для ÷5 нужна цифра 0 или 5</div>`;
        if(key==='2'&&!good) verdict+= `<div style="font-size:12px;color:#cbb89a">для ÷2 нужна чётная цифра</div>`;
      }
      const corr=[d2?'2':'',d5?'5':'',d10?'10':''].filter(Boolean).join(', ');
      h=col(big('Тренажёр: к каким воротам?'),
        `<div style="width:300px;margin:0 auto;text-align:center">
          ${l77Big(N,'t',{hot:true,cw:46,ch:54,fs:40})}
          <div style="margin:8px 0;font-size:13px;color:#cbb89a">на какие ворота делится ${N}? (верно: ${corr||'ни на какие'})</div>
          <div style="display:flex;gap:8px;justify-content:center">
            ${[['÷2','2'],['÷5','5'],['÷10','10']].map(kv=>btn(kv[0],`l77Act('${lk}','pick${kv[1]}')`)).join('')}
          </div>
          ${verdict}
        </div>`+
        btns(btn('🎲 следующее число',`l77Act('${lk}','new')`),btn('↺',`l77Act('${lk}','r')`))+
        sml('ответ сразу виден по последней цифре — потом нажми «🎲» и проверь себя ещё раз!'));
    } else {
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap">
          <div style="width:88px;opacity:.95">${typeof l35ArchSvg==='function'?l35ArchSvg(88,'down'):''}</div>
          <div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:250px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.9">
            🔟 ÷10 — только …0.<br>
            5️⃣ ÷5 — …0 или …5.<br>
            2️⃣ ÷2 — чётные: 0,2,4,6,8.<br>
            👁 Смотри на последнюю цифру — и не дели столбиком!</div>
        </div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — найди число, делящееся и на 2, и на 5, и на 10'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}

function l76Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  switch(act){
    case 'next': st.pos=(st.pos==null?0:st.pos)+1; break;
    case 'full': st.pos=99; break;
    case 'ex': st.ex=((st.ex==null?0:st.ex)+1)%6; st.pos=0; break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l76Digits(n,len){
  const s=String(n); const out=[];
  for(let i=s.length-1;i>=0;i--) out.push(+s[i]);
  while(out.length<len) out.push(0);
  return out.slice(0,len);
}
function l76Add(A,B){
  const len=Math.max(String(A).length,String(B).length)+1;
  const da=l76Digits(A,len), db=l76Digits(B,len), res=[], carry=[];
  let c=0;
  for(let i=0;i<len;i++){ const s=da[i]+db[i]+c; carry[i]=Math.floor(s/10); res.push(s%10); c=carry[i]; }
  return {da,db,res,carry,len};
}
function l76Sub(A,B){
  const len=Math.max(String(A).length,String(B).length);
  const da=l76Digits(A,len), db=l76Digits(B,len), res=[], borrow=[];
  let rem=0;
  for(let i=0;i<len;i++){ let av=da[i]-rem; borrow.push(av<db[i]); if(av<db[i])av+=10; res.push(av-db[i]); rem=borrow[i]?1:0; }
  return {da,db,res,borrow,len};
}
function l76Paper(w,h,uid){
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0">
    <defs><pattern id="l76g${uid}" width="17" height="17" patternUnits="userSpaceOnUse">
      <rect width="17" height="17" fill="#fffdf2"/><path d="M17 0H0V17" fill="none" stroke="#d7e3db" stroke-width="1"/></pattern></defs>
    <rect width="${w}" height="${h}" fill="url(#l76g${uid})"/>
    <rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="none" stroke="#c3cfc8" stroke-width="2"/>
  </svg>`;
}
function l76Column(A,op,B,uid,steps){
  const m= op==='+'? l76Add(A,B): l76Sub(A,B);
  const len=m.len;
  const solved= steps==null? len : Math.max(0,Math.min(len,steps));
  const W=300, H=op==='+'?188:210;
  const cw=Math.min(64, Math.floor((W-30)/len));
  const names=['единицы','десятки','сотни','тысячи','десятки тысяч','сотни тысяч'];
  // дисплей слева направо (старший разряд первый); ведущие нули-подушки скрываем, но ширину оставляем
  const aD=m.da.slice().reverse(), bD=m.db.slice().reverse(), rD=m.res.slice().reverse();
  const fNZ=(arr)=>{ for(let i=0;i<arr.length;i++) if(arr[i]!==0) return i; return arr.length-1; };
  const a0=fNZ(aD), b0=fNZ(bD), r0=fNZ(rD);
  const topF=[];
  if(op==='-'){ for(let i=0;i<len;i++){ topF[i]= m.da[i] - (i>0&&m.borrow[i-1]?1:0) + (m.borrow[i]?10:0); } }
  const topFD=topF.slice().reverse();
  const cell=(kind,i,d)=>{
    const unitIdx=len-1-i;
    const isSol= i<solved;
    const base=`width:${cw}px;height:42px;display:flex;align-items:center;justify-content:center;font-family:Georgia,serif;font-weight:bold`;
    if(kind==='res'){
      if(i<r0) return `<div style="${base}"></div>`;
      if(steps!=null && !isSol) return `<div style="${base}"></div>`;
      return `<div class="l35-pop" style="animation-delay:${(0.08+(i-r0)*0.18).toFixed(2)}s;${base};font-size:30px;color:${op==='+'?'#1a6a4a':'#1a5a8a'}">${d}</div>`;
    }
    if(kind==='top'){
      if(i<a0 && d===0) return `<div style="${base}"></div>`;
      const show= steps==null || isSol;
      if(!show) return `<div style="${base}"></div>`;
      if(op==='-' && m.borrow[unitIdx]){
        const v=topFD[i];
        return `<div style="position:relative;${base}">
          <div style="font-size:${v>9?20:30}px;color:#2a3a4a">${v>9? v : '·'+v}</div>
          <div class="l35-pop" style="position:absolute;top:-8px;left:-4px;font-size:11px;color:#e0523d;font-weight:bold">←заняли</div>

        </div>`;
      }
      if(op==='-' && !m.borrow[unitIdx] && unitIdx>0 && m.borrow[unitIdx-1]){
        const v=topF[unitIdx];
        return `<div style="position:relative;${base}">
          <div style="font-size:30px;color:#9aa7b4;text-decoration:line-through;opacity:.8">${d}</div>
          <div class="l35-pop" style="position:absolute;top:-8px;right:0;font-size:13px;color:#e0523d;font-weight:bold">${v}</div>
        </div>`;
      }
      if(op==='+' && m.carry[unitIdx]>0 && d!==0){
        return `<div style="position:relative;${base};font-size:30px;color:#2a3a4a">${d}
          <div class="l35-pop" style="position:absolute;top:-8px;right:0;font-size:10.5px;color:#fff;background:#e0523d;border-radius:7px;padding:0 4px;font-weight:bold">+1→</div></div>`;
      }
      return `<div style="${base};font-size:30px;color:#2a3a4a">${d}</div>`;
    }
    if(kind==='bot'){
      if(i<b0 && d===0) return `<div style="${base}"></div>`;
      const show= steps==null || isSol;
      if(!show) return `<div style="${base}"></div>`;
      return `<div style="${base};font-size:30px;color:#2a3a4a">${d}</div>`;
    }
    return '';
  };
  const wrap=(inner)=>`<div style="display:flex;justify-content:center;align-items:center;position:relative">${inner}</div>`;
  const opPos=Math.min(cw*1.4, Math.round(cw*.5));
  const rowTop=wrap(aD.map((d,i)=>cell('top',i,d)).join(''));
  const rowBot=wrap(`<div style="position:absolute;left:50%;transform:translateX(calc(-50% - ${(len*cw)/2}px + ${opPos}px));top:8px;font-size:28px;color:#c96a3a;font-weight:bold">${op}</div>`+bD.map((d,i)=>cell('bot',i,d)).join(''));
  const line=`<div style="width:${Math.min(282,len*cw+26)}px;margin:2px auto 0;border-top:3px solid #2a3a4a"></div>`;
  const rowRes=wrap(rD.map((d,i)=>cell('res',i,d)).join(''));
  const labels=Array.from({length:len},(_,i)=>`<div style="width:${cw}px;font-size:9px;color:#8aa08f;text-align:center">${names[len-1-i]||''}</div>`).join('');
  const labelsRow=`<div style="display:flex;justify-content:center;margin-top:1px">${labels}</div>`;
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:14px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.18)">
    ${l76Paper(W,H,uid)}
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:6px 0">
      ${rowTop}${rowBot}${line}${rowRes}${labelsRow}
    </div>
  </div>`;
}
function l76Towers(N,uid,opts){
  const o=opts||{}; const cols=o.cols||4;
  const digs=l76Digits(N,cols);
  const names=['единицы','десятки','сотни','тысячи'];
  const colors=['#e8b04a','#5aa8d8','#8ab860','#b06ab8'];
  const unit=Math.max(7,Math.floor((o.maxH||118)/9));
  const cw=o.w? Math.round((o.w-30)/cols):64;
  let html='';
  for(let c=0;c<cols;c++){
    const d=digs[cols-1-c];
    const blocks=Array.from({length:d},(_,k)=>`<div class="l35-pop" style="animation-delay:${(0.15+k*0.05).toFixed(2)}s;width:${cw-16}px;height:${unit-2}px;border-radius:3px;background:${colors[cols-1-c]};box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)"></div>`).join('');
    html+=`<div style="display:flex;flex-direction:column;align-items:center;flex:1">
      <div style="min-height:${unit}px;display:flex;flex-direction:column-reverse;gap:1px">${blocks||`<div style="width:${cw-16}px;height:2px;background:rgba(0,0,0,.1)"></div>`}</div>
      <div style="font-size:26px;font-family:Georgia,serif;font-weight:bold;color:${colors[cols-1-c]};line-height:1.05">${d}</div>
      <div style="font-size:9px;color:#8aa08f">${names[cols-1-c]}</div>
    </div>`;
  }
  return `<div style="display:flex;gap:4px;align-items:flex-end;justify-content:center;padding:2px 6px">${html}</div>`;
}
function l76Ride(uid){
  const W=300,H=118;
  const coins=Array.from({length:10},(_,i)=>`<circle cx="${58+i*19}" cy="66" r="8.5" fill="#e8b04a" stroke="#b8860b" stroke-width="1.6"/>`).join('');
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:14px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.15)">
    ${l76Paper(W,H,uid)}
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0">
      ${coins}
      <g><animateTransform attributeName="transform" type="translate" values="0 0;-112 0" dur="1.2s" begin="0.5s" fill="freeze"/>
        <circle cx="256" cy="66" r="15" fill="#d98a3a" stroke="#a05c18" stroke-width="2"/>
        <text x="256" y="71" text-anchor="middle" font-size="14" fill="#fff" font-weight="bold">10</text>
        <text x="256" y="95" text-anchor="middle" font-size="9" fill="#8aa08f">это один десяток</text></g>
      <text x="150" y="22" text-anchor="middle" font-size="11.5" fill="#5a7a6a" font-weight="bold">10 единиц — всегда один десяток!</text>
      <text x="163" y="111" text-anchor="middle" font-size="16" fill="#8aa08f">←</text>
    </svg>
  </div>`;
}
function visL76(el){
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
    const rowC=(inner)=>`<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${inner}</div>`;
    const EXAMPLES=[['1234','+','2444'],['1268','+','1744'],['4126','+','574'],['4763','−','2412'],['561','−','284'],['5000','−','2345']];
    let h='';
    if(step===0){
      h=col(big('Казна Архимеда'),
        `<div style="font-size:56px" class="l35-pop">💰</div>`+
        big('большие числа считают по разрядам!')+
        sml('монеты — к монетам, мешочки по десять — к мешочкам. и числа так же: единицы к единицам! листай ➜'));
    } else if(step===1){
      h=col(big('Разряды — как полки'),
        l76Towers(1268,null,{})+
        sml('1268 = 1 тысяча + 2 сотни + 6 десятков + 8 единиц. каждая цифра живёт на своей «полке»!'));
    } else if(step===2){
      h=col(big('Почему столбиком?'),
        rowC(
          `<div style="text-align:center;width:140px;border:2px solid rgba(224,82,61,.5);border-radius:12px;padding:8px;background:rgba(224,82,61,.06)"><div style="font-size:22px">❌</div><div style="font-size:18px;font-family:Georgia,serif;line-height:1.5">&#8195;12<br>+345</div><div class="wv-sml" style="font-size:10px;color:#e0a99a">единицы встали под десятки!</div></div>`+
          `<div style="text-align:center;width:140px;border:2px solid rgba(127,209,160,.55);border-radius:12px;padding:8px;background:rgba(127,209,160,.06)"><div style="font-size:22px">✅</div><div style="font-size:18px;font-family:Georgia,serif;line-height:1.5">&#8195;&#8195;12<br>+&#8195;345</div><div class="wv-sml" style="font-size:10px;color:#9fceb2">столбик: разряд под разрядом</div></div>`)+
        sml('выравниваем по правому краю — единицы под единицами, десятки под десятками!'));
    } else if(step===3){
      h=col(big('Складываем без переноса'),
        l76Column(1234,'+',2444,'a',null)+
        `<div class="wv-ans" style="font-size:28px;color:#1a6a4a;font-weight:bold">1234 + 2444 = 3678</div>`+
        sml('каждую полку отдельно: 4+4=8, 3+4=7, 2+4=6, 1+2=3. переносов нет!'));
    } else if(step===4){
      h=col(big('Перенос через край'),
        l76Ride('r')+
        rowC(chip('7 + 5 = 12','rgba(224,82,61,.5)'))+
        sml('в единицах больше десяти? пишем 2, а «десяток» уезжает влево, к десяткам!'));
    } else if(step===5){
      h=col(big('Пример с переносами'),
        l76Column(1268,'+',1744,'b',null)+
        `<div class="wv-ans" style="font-size:26px;color:#1a6a4a;font-weight:bold">1268 + 1744 = 3012</div>`+
        sml('8+4=12 → перенос; 6+4+1=11 → снова; 2+7+1=10 → опять! перенос бежит дальше и не теряется'));
    } else if(step===6){
      h=col(big('Вычитаем без займа'),
        l76Column(4763,'−',2412,'c',null)+
        `<div class="wv-ans" style="font-size:28px;color:#1a5a8a;font-weight:bold">4763 − 2412 = 2351</div>`+
        sml('по полкам: 3−2=1, 6−1=5, 7−4=3, 4−2=2'));
    } else if(step===7){
      h=col(big('Занимаем десяток'),
        l76Column(561,'−',284,'d',null)+
        `<div class="wv-ans" style="font-size:26px;color:#1a5a8a;font-weight:bold">561 − 284 = 277</div>`+
        sml('в единицах 1 меньше 4 → занимаем десяток: 11−4=7. и десяткам пришлось занять у сотен!'));
    } else if(step===8){
      h=col(big('Ноль уступает дорогу'),
        l76Column(5000,'−',2345,'e',null)+
        `<div class="wv-ans" style="font-size:26px;color:#1a5a8a;font-weight:bold">5000 − 2345 = 2655</div>`+
        sml('у нуля занимать нечего — он просит у тысячи: тысяча → 10 сотен → 10 десятков → 10 единиц. цепочка размена!'));
    } else if(step===9){
      h=col(big('Проверка — обратным действием'),
        rowC(
          `<div style="text-align:center"><div style="font-size:11px;color:#8aa08f;margin-bottom:2px">вычитание</div>${l76Column(5000,'−',2345,'f',null)}</div>`+
          `<div style="font-size:22px">⇄</div>`+
          `<div style="text-align:center"><div style="font-size:11px;color:#8aa08f;margin-bottom:2px">сложение</div>${l76Column(2655,'+',2345,'g',null)}</div>`)+
        sml('2655 + 2345 = 5000 — сошлось! сложение и вычитание проверяют друг друга'));
    } else if(step===10){
      h=col(big('Решаем как в проверке'),
        rowC(chip('4126','rgba(127,184,160,.5)'),chip('+',null),chip('574','rgba(127,184,160,.5)'))+
        l76Column(4126,'+',574,'h',null)+
        `<div class="wv-ans" style="font-size:28px;color:#1a6a4a;font-weight:bold">4126 + 574 = 4700 ✓</div>`+
        sml('6+4=10 → пишем 0, единицу вперёд; 2+7+1=10 → снова перенос; 1+5+1=7; 4 списываем'));
    } else if(step===11){
      const ex=EXAMPLES[(st.ex||0)];
      const A=+ex[0], op=ex[1], B=+ex[2];
      const pos=st.pos==null?99:st.pos;
      h=col(big('Тренажёр: реши столбиком!'),
        `<div class="wv-row">${chip(A+' '+op+' '+B,'rgba(217,164,65,.35)')}</div>`+
        l76Column(A,op,B,'t', pos===99?null:pos)+
        btns(btn('🎲 другой пример',`l76Act('${lk}','ex')`),btn('▶ шаг',`l76Act('${lk}','next')`),btn('⚡ весь ответ',`l76Act('${lk}','full')`),btn('↺',`l76Act('${lk}','r')`))+
        sml('жми «▶ шаг» — ответ раскрывается по разрядам справа налево. проверь себя обратным действием!'));
    } else {
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap">
          <div style="width:88px;opacity:.95">${typeof l35ArchSvg==='function'?l35ArchSvg(88,'down'):''}</div>
          <div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:258px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.9">
            ✍️ Пиши столбиком: разряд под разрядом!<br>
            ➕ Сумма больше 9 → десяток «переезжает» влево.<br>
            ➖ Мало в разряде → занимаем десяток у соседа.<br>
            🔁 Проверяй обратным действием!</div>
        </div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там 4126 + 574'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}

function l49Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  const bump=(k,d,lo,hi)=> st[k]=Math.max(lo||1, Math.min(hi||20, (st[k]==null?1:st[k])+d));
  switch(act){
    case 'c1': st.closed=st.closed?0:1; break;
    case 'c2': st.ring=st.ring?0:1; break;
    case 'sA': st.outS='A'; break;
    case 'sB': st.outS='B'; break;
    case 'sR': st.outS=null; break;
    case 'pA': st.outP='A'; break;
    case 'pB': st.outP='B'; break;
    case 'pR': st.outP=null; break;
    case 'brn': st.brn=st.brn===2?null:2; break;
    case 'kz': st.kz=st.kz?0:1; break;
    case 'mode': st.tm=(st.tm==='par')?'ser':'par'; break;
    case '1+': bump('t1',1,1,12); break;
    case '1-': bump('t1',-1,1,12); break;
    case '2+': bump('t2',1,1,12); break;
    case '2-': bump('t2',-1,1,12); break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l49Board(W,H,uid){
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0">
    <defs><linearGradient id="l49bd${uid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1e2a44"/><stop offset="1" stop-color="#111a2b"/></linearGradient></defs>
    <rect x="0" y="0" width="${W}" height="${H}" rx="14" fill="url(#l49bd${uid})"/>
  </svg>`;
}
function l49BulbG(x,y,r,on,uid){
  return `<g transform="translate(${x},${y})">
    ${on?`<circle r="${r*1.9}" fill="rgba(255,224,120,.18)"/><circle r="${r*1.35}" fill="rgba(255,224,120,.32)"/>`:''}
    <circle r="${r}" fill="${on?'#fff6c8':'#dfe4ea'}" stroke="${on?'#d9a52a':'#97a4b1'}" stroke-width="2.2"/>
    ${on?`<path d="M${-r*.45},${-r*.15} q${r*.45},${-r*.75} ${r*.9},0" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>`:''}
    <path d="M${-r*.38},${-r*.1} q0,${r*.45} 0,${r*.55}" stroke="${on?'#8a5a10':'#6f7b88'}" stroke-width="2.4" fill="none"/>
    <path d="M${-r*.5},${r*.5} L${r*.5},${r*.5} L${r*.28},${r*1.05} L${-r*.28},${r*1.05} Z" fill="#97a4b1"/>
  </g>`;
}
function l49BatteryG(x,y,uid){
  return `<g transform="translate(${x},${y})">
    <line x1="0" y1="-11" x2="0" y2="11" stroke="#ece4c8" stroke-width="3"/>
    <line x1="0" y1="2" x2="0" y2="11" stroke="#ece4c8" stroke-width="7"/>
    <text x="13" y="3" font-size="10.5" fill="#ffd9a0" font-weight="bold">9 В</text>
  </g>`;
}
function l49Ring(on,uid){
  // одна лампочка, выключатель; замкнутый/разомкнутый контур
  const W=300,H=196, railL=52, railR=W-26, yT=60, yB=150, bx=238;
  const seg=(a1,a2,a3,a4,col,w)=>`<line x1="${a1}" y1="${a2}" x2="${a3}" y2="${a4}" stroke="${col||'#e8d9a8'}" stroke-width="${w||3.5}"/>`;
  let html='';
  html+=seg(railL,yT,bx-20,yT)+seg(bx+20,yT,railR,yT);
  html+=seg(railR,yT,railR,yB)+seg(railR,yB,railL,yB)+seg(railL,yB,railL,yT);
  const swX=Math.round((railL+railR)/2)+16;
  if(on){
    html+=`<path d="M${railL},${yB} L${railR},${yB}" stroke="#e8d9a8" stroke-width="3.5"/>
      <circle cx="${swX-6}" cy="${yB-14}" r="3" fill="#7fd1a0"/><line x1="${swX-6}" y1="${yB-11}" x2="${swX-6}" y2="${yB-3}" stroke="#7fd1a0" stroke-width="2.4"/>`;
  } else {
    html+=seg(railL,yB,swX-10,yB)+seg(swX+10,yB,railR,yB);
    html+=`<line x1="${swX-8}" y1="${yB}" x2="${swX+4}" y2="${yB-13}" stroke="#ffb04a" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="${swX}" cy="${yB}" r="5" fill="#ffb04a"/><circle cx="${swX}" cy="${yB}" r="2.2" fill="#121a2b"/>`;
  }
  const electrons= on? [0,1,2,3].map(i=>`<circle r="3.2" fill="#7fd1ff"><animateMotion dur="1.7s" begin="${(-i*.42).toFixed(2)}s" repeatCount="indefinite" path="M${railL+10},${yT} L${railR-10},${yT} L${railR-10},${yB} L${railL+10},${yB} Z"/></circle>`).join('') : '';
  html+=l49BatteryG(railL-1,97,uid);
  html+=l49BulbG(bx,yT,16,on,uid);
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:14px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.3)">
    ${l49Board(W,H,uid)}
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0">${html}${electrons}
      <text x="${W/2}" y="${H-12}" text-anchor="middle" font-size="12" fill="${on?'#7fd1a0':'#e8a05a'}" font-weight="bold">${on?'цепь замкнута — ток бежит по кругу!':'разрыв — тока нет, лампа погасла'}</text>
    </svg>
  </div>`;
}
function l49Series2(out,uid){
  // две лампы последовательно; out 'A'|'B' — выкручена
  const W=312,H=196, railL=52, railR=W-28, yT=60, yB=148;
  const bxA=Math.round(W*.4), bxB=Math.round(W*.7), r=15;
  const seg=(a,b,c,d,col,w)=>`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${col||'#e8d9a8'}" stroke-width="${w||3.5}"/>`;
  let html='';
  const lit = out===null;
  if(out==='A'){
    html+=seg(railL,yT,bxA-r-2,yT);
    html+=seg(bxA+r+2,yT,bxB-r-2,yT)+seg(bxB+r+2,yT,railR,yT);
  } else if(out==='B'){
    html+=seg(railL,yT,bxA-r-2,yT)+seg(bxA+r+2,yT,bxB-r-2,yT);
    html+=seg(bxB+r+2,yT,railR,yT);
  } else {
    html+=seg(railL,yT,bxA-r-2,yT)+seg(bxA+r+2,yT,bxB-r-2,yT)+seg(bxB+r+2,yT,railR,yT);
  }
  html+=seg(railR,yT,railR,yB)+seg(railR,yB,railL,yB)+seg(railL,yB,railL,yT);
  html+=l49BatteryG(railL-1,95,uid);
  const draw=(cx,isOut,tag)=>{
    if(isOut){
      html+=`<circle cx="${cx}" cy="${yT}" r="${r+3}" fill="none" stroke="#8fa8c0" stroke-width="2" stroke-dasharray="5 4"/>
        <path d="M${cx-8},${yT-9} L${cx+8},${yT+9} M${cx+8},${yT-9} L${cx-8},${yT+9}" stroke="#8fa8c0" stroke-width="2"/>
        <text x="${cx}" y="${yT-30}" text-anchor="middle" font-size="10.5" fill="#e8a05a">выкручена</text>`;
    } else html+=l49BulbG(cx,yT,r,lit,tag);
  };
  draw(bxA,out==='A','a'); draw(bxB,out==='B','b');
  const electrons= lit? [0,1,2].map(i=>`<circle r="3.2" fill="#7fd1ff"><animateMotion dur="1.6s" begin="${(-i*.5).toFixed(2)}s" repeatCount="indefinite" path="M${railL+10},${yT} L${railR-12},${yT} L${railR-12},${yB} L${railL+10},${yB} Z"/></circle>`).join('') : '';
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:14px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.3)">
    ${l49Board(W,H,uid)}
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0">${html}${electrons}
      <text x="${W/2}" y="${H-10}" text-anchor="middle" font-size="12" fill="${lit?'#7fd1a0':'#e8a05a'}" font-weight="bold">${lit?'ток один на всех — обе светят!':'выкручена одна — круг разорван, обе погасли!'}</text>
    </svg>
  </div>`;
}
function l49Parallel2(out,uid){
  // две ветви параллельно (лесенка с двумя перекладинами)
  const W=312,H=236, xL=58, xR=W-36, yBot=192, yTop=64;
  const rungA=98, rungB=156, bx=Math.round((xL+xR)/2)+14, r=14;
  const seg=(a,b,c,d,col,w)=>`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${col||'#e8d9a8'}" stroke-width="${w||3.5}"/>`;
  const pBat=Math.round(xL+(xR-xL)*.42);
  let html='';
  // шины
  html+=seg(xL,yBot,xL,yTop)+seg(xR,yTop,xR,yBot)+seg(xL,yBot,xR,yBot)+seg(xL,yTop,xR,yTop);
  // перекладины с лампами
  const rung=(lane)=>{
    const y=lane==='A'? rungA : rungB;
    const isOut=out===lane;
    if(isOut){
      html+=seg(xL,y,bx-r-2,y)+seg(bx+r+2,y,xR,y);
      html+=`<circle cx="${bx}" cy="${y}" r="${r+3}" fill="none" stroke="#8fa8c0" stroke-width="2" stroke-dasharray="5 4"/>
        <path d="M${bx-8},${y-8} L${bx+8},${y+8} M${bx+8},${y-8} L${bx-8},${y+8}" stroke="#8fa8c0" stroke-width="2"/>`;
    } else {
      html+=seg(xL,y,bx-r-2,y)+seg(bx+r+2,y,xR,y);
      html+=l49BulbG(bx,y,r,out===null,lane+uid);
    }
    html+=`<text x="${xR+2}" y="${y+4}" font-size="10" fill="#7fa3ba">${lane}</text>`;
  };
  rung('A'); rung('B');
  // батарея на нижней шине
  html+=`<line x1="${pBat}" y1="${yBot-12}" x2="${pBat}" y2="${yBot+12}" stroke="#ece4c8" stroke-width="4"/>
    <line x1="${pBat+15}" y1="${yBot-9}" x2="${pBat+15}" y2="${yBot+9}" stroke="#ece4c8" stroke-width="8"/>
    <text x="${pBat+7}" y="${yBot+26}" text-anchor="middle" font-size="11" fill="#ffd9a0" font-weight="bold">9 В</text>`;
  // электроны по каждой живой ветке
  const dots=(lane)=>{
    const y=lane==='A'? rungA : rungB;
    if(out===lane) return '';
    const path=`M${pBat+2},${yBot} L${xL},${yBot} L${xL},${y} L${bx-r-2},${y} L${xR},${y} L${xR},${yBot} L${pBat+13},${yBot}`;
    return [0,1].map(i=>`<circle r="3.1" fill="#7fd1ff"><animateMotion dur="2s" begin="${(-i).toFixed(1)}s" repeatCount="indefinite" path="${path}"/></circle>`).join('');
  };
  const msg= out===null? 'обе светят — у каждой своя дорожка'
    : out==='A'? 'лампу А выкрутили — B продолжает светить!'
    : 'лампу B выкрутили — А продолжает светить!';
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:14px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.3)">
    ${l49Board(W,H,uid)}
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0">${html}${dots('A')}${dots('B')}
      <text x="${(xL+xR)/2}" y="${H-6}" text-anchor="middle" font-size="11.5" fill="#9fe8c0" font-weight="bold">${msg}</text>
    </svg>
  </div>`;
}
function l49ResRow(r1,r2,par,uid){
  // ряд из двух резисторов: par=false → «сложить в линию», true → «две дорожки»
  const W=300,H=par?170:120;
  let html='';
  const midY=par? Math.round(H*.5):Math.round(H*.5);
  const boxW=W-40;
  const rX=Math.round(W*.18), r2X=Math.round(W*.58);
  const len=Math.round(boxW*.3);
  const zig=(x0,y,rval,tag)=>{
    const n=3, seg=len/(n*2);
    let d=`M${x0},${y}`;
    for(let i=0;i<n;i++){ d+=` l${seg},${-9} l${seg},${9}`; }
    d+=` l${seg},${-9} l${seg},${9}`;
    html+=`<path d="${d}" stroke="#f0a35a" stroke-width="4" fill="none" stroke-linecap="round"/>
      <text x="${x0+len/2}" y="${y-16}" text-anchor="middle" font-size="13" fill="#ffd9a0" font-weight="bold">${rval} Ом</text>`;
  };
  if(par){
    const y1=Math.round(H*.32), y2=Math.round(H*.72);
    zig(rX,y1,r1,'pa'); zig(rX,y2,r2,'pb');
    html+=`<line x1="${rX-8}" y1="${y1}" x2="24" y2="${y1}" stroke="#8fb6cf" stroke-width="2.4"/>
      <line x1="${rX-8}" y1="${y2}" x2="24" y2="${y2}" stroke="#8fb6cf" stroke-width="2.4"/>
      <line x1="24" y1="${y1}" x2="24" y2="${y2}" stroke="#8fb6cf" stroke-width="2.4"/>
      <line x1="${rX+len+6}" y1="${y1}" x2="${W-24}" y2="${y1}" stroke="#8fb6cf" stroke-width="2.4"/>
      <line x1="${rX+len+6}" y1="${y2}" x2="${W-24}" y2="${y2}" stroke="#8fb6cf" stroke-width="2.4"/>
      <line x1="${W-24}" y1="${y1}" x2="${W-24}" y2="${y2}" stroke="#8fb6cf" stroke-width="2.4"/>`;
  } else {
    zig(rX,midY,r1,'s1'); zig(r2X,midY,r2,'s2');
    html+=`<line x1="22" y1="${midY}" x2="${rX-6}" y2="${midY}" stroke="#8fb6cf" stroke-width="2.4"/>
      <line x1="${rX+len+6}" y1="${midY}" x2="${r2X-6}" y2="${midY}" stroke="#8fb6cf" stroke-width="2.4"/>`;
  }
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block">${html}</svg>`;
}
function l49Compare(brn,uid){
  // гирлянда (последовательно) vs фонари (параллельно): одна перегорела
  const mk=(mode)=>{
    const W=148,H=150, L=16,R=W-16;
    const n=3, gap=(R-L)/(n*2+1);
    let html='';
    const lit = mode==='par' || brn===null;
    const bulbs=[];
    for(let i=0;i<n;i++){
      const x=Math.round(L+gap*(i*2+1));
      bulbs.push(x);
    }
    if(mode==='ser'){
      // линия
      const burntIdx= brn===null? -1 : 1; // перегорает средняя
      if(brn!==null){
        const bx=bulbs[1];
        html+=`<line x1="${L}" y1="52" x2="${bx-11}" y2="52" stroke="#e8d9a8" stroke-width="3"/>
          <line x1="${bx+11}" y1="52" x2="${R}" y2="52" stroke="#e8d9a8" stroke-width="3"/>`;
        bulbs.forEach((x,i)=>{
          if(i===1) html+=`<circle cx="${x}" cy="52" r="12" fill="none" stroke="#7f8b96" stroke-width="2.5"/><path d="M${x-6},${52-6} L${x+6},${52+6} M${x+6},${52-6} L${x-6},${52+6}" stroke="#7f8b96" stroke-width="2"/>`;
          else html+=l49BulbG(x,52,10,false,'s'+i);
        });
      } else {
        html+=`<line x1="${L}" y1="52" x2="${R}" y2="52" stroke="#e8d9a8" stroke-width="3"/>`;
        bulbs.forEach((x,i)=> html+=l49BulbG(x,52,10,true,'s'+i));
      }
      html+=`<text x="${W/2}" y="18" text-anchor="middle" font-size="11" fill="#cbb89a">гирлянда</text>
        <text x="${W/2}" y="${H-14}" text-anchor="middle" font-size="10.5" fill="${brn!==null?'#e8a05a':'#7fd1a0'}">${brn!==null?'одна сгорела — все погасли!':'все светят'}</text>`;
    } else {
      // фонари: три столбика-ветки
      const yT=56,yB=118;
      html+=`<line x1="${L}" y1="${yB}" x2="${L}" y2="${yT}" stroke="#e8d9a8" stroke-width="3"/>
        <line x1="${R}" y1="${yB}" x2="${R}" y2="${yT}" stroke="#e8d9a8" stroke-width="3"/>
        <line x1="${L}" y1="${yB}" x2="${R}" y2="${yB}" stroke="#e8d9a8" stroke-width="3"/>`;
      const ys=[74,96,118];
      bulbs.forEach((x,i)=>{
        const y=ys[i];
        const onHere = brn===null || i!==1;
        html+=`<line x1="${L}" y1="${y}" x2="${R}" y2="${y}" stroke="#e8d9a8" stroke-width="3"/>`;
        if(!onHere) html+=`<circle cx="${x}" cy="${y}" r="10" fill="none" stroke="#7f8b96" stroke-width="2.5"/><path d="M${x-5},${y-5} L${x+5},${y+5} M${x+5},${y-5} L${x-5},${y+5}" stroke="#7f8b96" stroke-width="2"/>`;
        else html+=l49BulbG(x,y,9,true,'p'+i);
      });
      html+=`<text x="${W/2}" y="18" text-anchor="middle" font-size="11" fill="#cbb89a">фонари</text>
        <text x="${W/2}" y="${H-8}" text-anchor="middle" font-size="10" fill="${brn!==null?'#9fe8c0':'#7fd1a0'}">${brn!==null?'одна перегорела — другие горят!':'все горят'}</text>`;
    }
    return `<div style="position:relative;width:${W}px;height:${H}px;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.28)">
      ${l49Board(W,H,uid+mode)}
      <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0">${html}</svg>
    </div>`;
  };
  return `<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">${mk('ser')}${mk('par')}</div>`;
}
function l49KZ(kz,uid){
  // короткое замыкание: нормальная ветка (лампа + предохранитель) и красная «обходная»
  const W=312,H=236, xL=56, xR=W-34, yBot=190, yT=66;
  const rungY=118, bx=Math.round(xL+(xR-xL)*.55), r=15;
  const seg=(a,b,c,d,col,w)=>`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${col||'#e8d9a8'}" stroke-width="${w||3.5}"/>`;
  let html='';
  html+=seg(xL,yBot,xL,yT)+seg(xR,yT,xR,yBot)+seg(xL,yBot,xR,yBot);
  // обычная перекладина: предохранитель — лампа
  const fuseX=Math.round(xL+(xR-xL)*.3);
  html+=seg(xL,rungY,fuseX-12,rungY)+seg(fuseX+12,rungY,bx-r-2,rungY)+seg(bx+r+2,rungY,xR,rungY);
  html+=`<rect x="${fuseX-11}" y="${rungY-7}" width="22" height="14" rx="4" fill="${kz?'#b3543f':'#f0c060'}" stroke="#7a5a20" stroke-width="2"/>
    <path d="M${fuseX-7},${rungY} L${fuseX+7},${rungY}" stroke="#7a5a20" stroke-width="2"/>
    ${kz?`<path d="M${fuseX-6},${rungY-5} L${fuseX+6},${rungY+5} M${fuseX+6},${rungY-5} L${fuseX-6},${rungY+5}" stroke="#8a2f20" stroke-width="2.6"/>`:''}
    <text x="${fuseX}" y="${rungY-14}" text-anchor="middle" font-size="9.5" fill="#e8d9a8">предохранитель</text>`;
  html+=l49BulbG(bx,rungY,r,!kz,'k');
  // красная обходная перекладина (КЗ)
  if(kz){
    html+=`<path d="M${xL},${yBot-30} L${xR},${yBot-30}" stroke="#e0523d" stroke-width="6" class="l49-heat"/>
      <line x1="${xL}" y1="${yBot-30}" x2="${xL}" y2="${rungY}" stroke="#e0523d" stroke-width="6"/>
      <line x1="${xR}" y1="${yBot-30}" x2="${xR}" y2="${rungY}" stroke="#e0523d" stroke-width="6"/>
      <path d="M${xL+16},${yBot-37} q9,-10 18,0 M${xR-34},${yBot-37} q9,-10 18,0" class="l49-bolt" stroke="#ffe27a" stroke-width="3.5" fill="none"/>
      <path d="M${xL+46},${yBot-37} q8,-9 16,0 M${xR-70},${yBot-37} q8,-9 16,0" class="l49-bolt" stroke="#ffe27a" stroke-width="3" fill="none"/>`;
  } else {
    html+=`<path d="M${xL},${yBot-24} L${xR},${yBot-24}" stroke="#3c5170" stroke-width="5" stroke-dasharray="7 6"/>
      <text x="${(xL+xR)/2}" y="${yBot-34}" text-anchor="middle" font-size="10.5" fill="#7fa3ba">провода не соединены</text>`;
  }
  // батарея снизу
  const pBat=Math.round(xL+(xR-xL)*.42);
  html+=`<line x1="${pBat}" y1="${yBot-11}" x2="${pBat}" y2="${yBot+11}" stroke="#ece4c8" stroke-width="4"/>
    <line x1="${pBat+15}" y1="${yBot-8}" x2="${pBat+15}" y2="${yBot+8}" stroke="#ece4c8" stroke-width="8"/>
    <text x="${pBat+7}" y="${yBot+24}" text-anchor="middle" font-size="10.5" fill="#ffd9a0" font-weight="bold">9 В</text>`;
  const msg= kz? 'R ≈ 0 — ток огромный, провод раскаляется!' : 'ток идёт только через лампу — предохранитель цел';
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:14px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.3)">
    ${l49Board(W,H,uid)}
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0">${html}
      <text x="${(xL+xR)/2}" y="${H-14}" text-anchor="middle" font-size="11" fill="${kz?'#ffb0a0':'#9fe8c0'}" font-weight="bold">${msg}</text>
    </svg>
  </div>`;
}
function visL49(el){
  // Урок 49 «Электрические цепи»: гирлянда Архимеда, последовательно/параллельно, КЗ
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
    const rowC=(...ps)=>`<div style="display:flex;gap:12px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${ps.join('')}</div>`;
    let h='';
    if(step===0){
      const on=!!st.closed;
      h=col(big('Гирлянда Архимеда'),
        (on
          ? `<div style="font-size:46px" class="l49-on">✨🎄✨</div>`
          : `<div style="font-size:46px">🎄</div>`)+
        big(on?'лампочки загорелись!':'батарейка и лампочки — но цепь не замкнута')+
        (on
          ? sml('цепь замкнута — ток бежит, лампочки светят! а теперь вопрос: как они соединены? листай ➜')
          : sml('сейчас разомкнута. замкни цепь — и гирлянда загорится!'))+
        btns(btn(on?'🔌 разомкнуть цепь':`🔌 замкнуть цепь`, `l49Act('${lk}','c1')`)));
    } else if(step===1){
      const on=!!st.ring;
      h=col(big('Цепь — это круг'),
        l49Ring(on,'r')+
        btns(btn(on?'✂️ разомкнуть':`🔌 замкнуть`, `l49Act('${lk}','c2')`))+
        sml('ток выходит из батарейки и возвращается в неё. разорвёшь круг — всё погаснет!'));
    } else if(step===2){
      const out=st.outS||null;
      h=col(big('Последовательно: одна линия'),
        l49Series2(out,'s')+
        btns(btn('💡 выкрутить лампу А',`l49Act('${lk}','sA')`),btn('💡 выкрутить лампу B',`l49Act('${lk}','sB')`),btn('🔧 вернуть',`l49Act('${lk}','sR')`))+
        sml('лампы в одну линию — ток один на всех. выкрути одну: круг рвётся и гаснут ВСЕ!'));
    } else if(step===3){
      h=col(big('Последовательно'),
        `<div style="font-size:27px;color:var(--brass);font-family:Georgia,serif;white-space:nowrap">R = R₁ + R₂</div>`+
        rowC(chip('R₁ = 2 Ом','rgba(232,160,90,.5)'),chip('+',null),chip('R₂ = 3 Ом','rgba(232,160,90,.5)'))+
        `<div style="max-width:300px;margin:0 auto">${l49ResRow(2,3,false,'n')}</div>`+
        `<div style="font-size:20px" class="wv-pop">R = R₁ + R₂ = 2 + 3</div>`+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">R = 5 Ом</div>`+
        sml('два резистора друг за другом — как одна длинная цепочка: сопротивления складываются'));
    } else if(step===4){
      const out=st.outP||null;
      h=col(big('Параллельно: своя дорожка'),
        l49Parallel2(out,'p')+
        btns(btn('💡 выкрутить лампу А',`l49Act('${lk}','pA')`),btn('💡 выкрутить лампу B',`l49Act('${lk}','pB')`),btn('🔧 вернуть',`l49Act('${lk}','pR')`))+
        sml('у каждой лампы своя дорожка к батарейке. выкрути одну — остальные продолжат светить!'));
    } else if(step===5){
      h=col(big('Параллельно одинаковых'),
        rowC(chip('6 Ом','rgba(232,160,90,.5)'),chip('∥',null),chip('6 Ом','rgba(232,160,90,.5)'))+
        `<div style="max-width:300px;margin:0 auto">${l49ResRow(6,6,true,'q')}</div>`+
        `<div style="font-size:20px" class="wv-pop">току две дороги → вдвое легче</div>`+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">R = 6 : 2 = 3 Ом</div>`+
        sml('две одинаковые лампы по 6 Ом параллельно: общее сопротивление вдвое меньше одной'));
    } else if(step===6){
      const brn=st.brn||null;
      h=col(big('Гирлянда или фонари?'),
        l49Compare(brn,'c')+
        btns(btn('🔥 пережечь среднюю лампу',`l49Act('${lk}','brn')`))+
        sml(brn?'слева гирлянда (последовательно): одна сгорела — погасла вся! справа фонари (параллельно): остальные горят!':'слева гирлянда, справа уличные фонари. нажми — и пережги одну лампу'));
    } else if(step===7){
      const kz=!!st.kz;
      h=col(big('Короткое замыкание'),
        l49KZ(kz,'z')+
        btns(btn(kz?'✅ убрать обходной провод':`⚡ соединить провода напрямую`, `l49Act('${lk}','kz')`))+
        sml(kz?'предохранитель перегорел (это он «пожертвовал» собой)! никогда так не делай в розетке!':'мимо лампы путь короче, но там НЕТ сопротивления — не соединяй так!'));
    } else if(step===8){
      h=col(big('Разбираем задачку'),
        `<div style="font-size:22px;color:#d8ecff;white-space:nowrap">R = R₁ + R₂ = 2 + 3</div>`+
        rowC(chip('2 Ом','rgba(232,160,90,.5)'),chip('+',null),chip('3 Ом','rgba(232,160,90,.5)'),chip('последовательно','rgba(127,209,255,.5)'))+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">R = 5 Ом ✓</div>`+
        sml('такой вопрос будет дальше!'));
    } else if(step===9){
      // тренажёр
      if(st.tm==null) st.tm='ser'; if(st.t1==null) st.t1=2; if(st.t2==null) st.t2=3;
      const par=st.tm==='par';
      if(par&&st.t1!==st.t2) st.t2=st.t1;
      const R= par? Math.round(st.t1/2*10)/10 : st.t1+st.t2;
      const form= par? `R = ${st.t1} : 2` : `R = ${st.t1} + ${st.t2}`;
      h=col(big('Тренажёр: собери и посчитай'),
        `<div class="wv-row">${chip(par?'∥ параллельно':'— последовательно', par?'rgba(127,209,255,.5)':'rgba(232,160,90,.5)')}
           ${chip('R₁ = '+st.t1+' Ом','rgba(232,160,90,.5)')} ${chip('R₂ = '+st.t2+' Ом','rgba(232,160,90,.5)')}</div>`+
        `<div style="max-width:300px;margin:2px auto">${l49ResRow(st.t1,st.t2,par,'t')}</div>`+
        `<div style="font-size:18px" class="wv-pop">${form}</div>`+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">R общ = ${R} Ом</div>`+
        btns(btn(par?'переключить на последовательно':'переключить на параллельно',`l49Act('${lk}','mode')`),
          btn('R₁ +1',`l49Act('${lk}','1+')`),btn('R₁ −1',`l49Act('${lk}','1-')`),
          par?null:btn('R₂ +1',`l49Act('${lk}','2+')`), par?null:btn('R₂ −1',`l49Act('${lk}','2-')`),
          btn('↺',`l49Act('${lk}','r')`))+
        sml(par?'параллельно двух одинаковых — делим пополам!':'последовательно — складываем!'));
    } else {
      // памятка
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:320px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.8">
          🔗 <b>Последовательно</b> — одна линия: ток один на всех, R = R₁ + R₂.<br>
          🪜 <b>Параллельно</b> — своя дорожка у каждой: напряжение общее, ток делится.<br>
          🧮 Две одинаковые параллельно — сопротивление вдвое меньше.<br>
          💥 Обход без лампы — короткое замыкание: огромный ток! Не соединяй провода напрямую.</div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там 2 Ом и 3 Ом последовательно'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}

function l48Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  switch(act){
    case 'dip': st.dip=1; break;
    case 'dip2': st.dip2=1; break;
    case 'dip3': st.dip3=1; break;
    case 'w+': st.w=Math.min(9,(st.w==null?4:st.w)+1); break;
    case 'w-': st.w=Math.max(1,(st.w==null?4:st.w)-1); break;
    case 'b+': st.b=Math.min(9,(st.b==null?3:st.b)+1); break;
    case 'b-': st.b=Math.max(1,(st.b==null?3:st.b)-1); break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
let _dr=null;
function l48Crown(w){
  // золотая корона Гиерона с камнями
  const W=w||76, H=Math.round(W*.9);
  return `<svg width="${W}" height="${H}" viewBox="0 0 120 108" style="display:block">
    <defs><linearGradient id="cr${w}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe28a"/><stop offset=".5" stop-color="#e6bf4a"/><stop offset="1" stop-color="#b8860b"/></linearGradient></defs>
    <path d="M16,96 L104,96 L108,30 Q84,50 60,34 Q36,50 12,30 Z" fill="url(#cr${w})" stroke="#8a6a1a" stroke-width="2"/>
    <path d="M12,30 L28,20 L34,38 L48,16 L60,36 L74,16 L86,38 L94,22 L108,30" fill="url(#cr${w})" stroke="#8a6a1a" stroke-width="2"/>
    <circle cx="28" cy="26" r="4" fill="#ff5a5a"/><circle cx="48" cy="21" r="4" fill="#5aa0ff"/>
    <circle cx="74" cy="21" r="4" fill="#5aff8a"/><circle cx="92" cy="28" r="4" fill="#ff5a5a"/>
    <circle cx="60" cy="40" r="5" fill="#ffd94a" stroke="#b8860b"/>
    <ellipse cx="40" cy="96" rx="26" ry="6" fill="rgba(0,0,0,.25)"/>
  </svg>`;
}
function l48DStart(ev,el,lk){
  ev.preventDefault(); ev.stopPropagation();
  const host=el.closest('.l48host')||el.parentElement;
  const hr=host.getBoundingClientRect(), r=el.getBoundingClientRect();
  _dr={el,lk,offX:ev.clientX-r.left,offY:ev.clientY-r.top,hx:hr.left,hy:hr.top,ox:el.style.left,oy:el.style.top};
  el.style.transition='none'; el.style.animation='none';
  window.addEventListener('pointermove',l48DMove,{passive:false});
  window.addEventListener('pointerup',l48DEnd);
  window.addEventListener('pointercancel',l48DEnd);
}
function l48DMove(ev){
  if(!_dr) return; ev.preventDefault();
  const el=_dr.el;
  el.style.left=(ev.clientX-_dr.hx-_dr.offX)+'px';
  el.style.top=(ev.clientY-_dr.hy-_dr.offY)+'px';
}
function l48DEnd(ev){
  if(!_dr) return;
  const {el,lk}=_dr;
  window.removeEventListener('pointermove',l48DMove);
  window.removeEventListener('pointerup',l48DEnd);
  window.removeEventListener('pointercancel',l48DEnd);
  const er=el.getBoundingClientRect();
  const bath=document.getElementById('l48bath');
  const cx=er.left+er.width/2, cy=er.top+er.height*.35;
  let inside=false;
  if(bath){ const br=bath.getBoundingClientRect();
    inside = cx>br.left && cx<br.right && cy>br.top && cy<br.top+br.height*.6; }
  const ox=_dr.ox, oy=_dr.oy;
  _dr=null;
  if(inside){ l48Act(lk,'dip3'); }
  else { el.style.transition='left .45s ease, top .45s ease'; el.style.left=ox; el.style.top=oy; }
}
function l48BathFull(dropped){
  // Полная ванна Архимеда (вода ДО КРАЯ), корона — перетащить в воду → перелив + брызги.
  const W=262, H=248;
  const bx=36, bw=190, bt=92, bh=136, pad=5;   // ванна: лево/ширина/верх/высота/бортик
  const wr=3;                                   // вода: 3px ниже внутреннего края — «до края»
  const cx=bx+bw/2;                             // центр ванны (точка падения короны)
  const splash = dropped ? (()=>{
    // 1) центральный всплеск в точке падения короны
    let a='';
    for(let j=0;j<7;j++){ const s=5+(j%3)*2;
      a+=`<span class="l48-splash" style="left:${cx+(j%2?1:-1)*(3+j*6)-s/2}px;top:${bt-5}px;width:${s}px;height:${s}px;--sx:${(j%2?1:-1)*(3+j*5)}px;--sy:${-(18+j*7)}px;animation-delay:${(j*.05).toFixed(3)}s"></span>`; }
    // 2) капли вдоль всей кромки — вода выплёскивается через край
    for(let k=0;k<9;k++){ const s=4+(k%3)*2;
      a+=`<span class="l48-splash" style="left:${bx+7+k*(bw-14)/8-s/2}px;top:${bt-4}px;width:${s}px;height:${s}px;--sx:${(k%2?1:-1)*(8+k*3)}px;--sy:${-(10+((k*5)%4)*7)}px;animation-delay:${(.16+k*.05).toFixed(3)}s"></span>`; }
    return a;
  })() : '';
  const bubbles = dropped ? [0,1,2,3,4,5].map(i=>{
    const dx=[-20,-8,4,14,-14,6][i], b=[84,88,82,86,90,84][i], s=[4,5,3,5,4,3][i];
    return `<span class="l48-bub" style="left:calc(50% + ${dx}px);bottom:${b}px;width:${s}px;height:${s}px;animation-delay:${(.5+i*.14).toFixed(2)}s"></span>`;
  }).join('') : '';
  const crownStartX=cx+18-34, crownStartY=bt-118;
  const inCrown=`<div style="position:absolute;left:50%;bottom:10px;width:76px;opacity:.96;
      filter:brightness(.82) saturate(.78);animation:l48Sink .95s cubic-bezier(.55,0,.9,.4) both">${l48Crown(76)}</div>`;
  return `<div class="l48host" style="position:relative;width:${W}px;height:${H}px;margin:0 auto;border-radius:18px;overflow:hidden;
      background:linear-gradient(180deg,#cfe4f2 0%,#dbeef7 55%,#e4f2f8 100%);box-shadow:0 4px 12px rgba(0,0,0,.3)">
    <!-- кафельная плитка с затиркой -->
    <div style="position:absolute;inset:0 0 24px 0;background:
        repeating-linear-gradient(0deg,transparent 0 37px,rgba(140,180,205,.45) 37px 38px),
        repeating-linear-gradient(90deg,transparent 0 37px,rgba(140,180,205,.45) 37px 38px),
        linear-gradient(180deg,#cfe4f2,#d9ecf5)"></div>
    <!-- блики плитки -->
    <div style="position:absolute;inset:0 0 24px 0;background:
        linear-gradient(115deg,rgba(255,255,255,.0) 20%,rgba(255,255,255,.16) 34%,rgba(255,255,255,0) 48%,
        rgba(255,255,255,.08) 70%,rgba(255,255,255,0) 82%)"></div>
    <!-- пол -->
    <div style="position:absolute;left:0;right:0;bottom:0;height:24px;background:linear-gradient(180deg,#b7cbd6,#a3bac9)"></div>
    <div style="position:absolute;left:0;right:0;bottom:11px;height:2px;background:rgba(255,255,255,.35)"></div>
    <!-- тень от ванны на полу -->
    <div style="position:absolute;left:${bx+8}px;right:${W-(bx+bw)-8}px;bottom:-2px;height:9px;border-radius:50%;
      background:rgba(60,95,120,.28);filter:blur(2px)"></div>
    <!-- кран (закрыт, хромированный, труба от стены) -->
    <svg style="position:absolute;left:${bx-6}px;top:${bt-62}px;z-index:2" width="104" height="62" viewBox="-34 0 104 62">
      <defs>
        <linearGradient id="chrome48" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#dfe7ec"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="#aebcc6"/></linearGradient>
      </defs>
      <rect x="-34" y="3" width="60" height="7" rx="3.5" fill="url(#chrome48)" stroke="#8fa0ac" stroke-width="1"/>
      <circle cx="-36" cy="6.5" r="6" fill="#b7c4ce" stroke="#8fa0ac"/>
      <rect x="26" y="0" width="16" height="10" rx="3" fill="#aab8c2"/>
      <path d="M28,8 Q14,10 14,20 L23,20 Q23,15 28,15 Z" fill="url(#chrome48)" stroke="#8fa0ac" stroke-width="1"/>
      <rect x="30" y="8" width="9" height="22" rx="3" fill="url(#chrome48)" stroke="#8fa0ac" stroke-width="1"/>
      <circle cx="34.5" cy="22" r="6.5" fill="url(#chrome48)" stroke="#8fa0ac"/>
      <circle cx="34.5" cy="22" r="2.6" fill="#dde6ea"/>
      <rect x="32" y="30" width="6" height="18" rx="3" fill="url(#chrome48)" stroke="#8fa0ac" stroke-width="1"/>
      <ellipse cx="35" cy="50" rx="7" ry="2.4" fill="#aab8c2"/>
    </svg>
    <!-- ванна -->
    <div id="l48bath" style="position:absolute;left:${bx}px;top:${bt}px;width:${bw}px;height:${bh}px;z-index:1;
      border-radius:9px 9px 34px 34px;background:linear-gradient(180deg,#ffffff 0%,#f2f7fa 55%,#dbe7ee 100%);
      border:5px solid #b9cad6;overflow:hidden;box-shadow:inset 0 -10px 18px rgba(90,130,160,.12)">
      <!-- вода до края -->
      <div style="position:absolute;left:6px;right:6px;bottom:6px;top:${wr}px;
        background:linear-gradient(180deg,rgba(146,211,246,.97) 0%,rgba(92,168,226,.95) 42%,rgba(64,140,205,.95) 75%,rgba(48,112,178,.98) 100%)"></div>
      <!-- световые дорожки в воде -->
      <div style="position:absolute;left:16px;right:16px;bottom:10px;height:64%;opacity:.5;
        background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.16) 46%,transparent 60%,
        rgba(255,255,255,.07) 74%,transparent 84%)"></div>
      <!-- блик на поверхности -->
      <div style="position:absolute;left:14px;right:14px;top:${wr-1}px;height:2px;border-radius:2px;
        background:rgba(255,255,255,.85)"></div>
      <!-- корона тонет в воду -->
      ${dropped?inCrown:''}
      <!-- пузырьки от короны -->
      ${dropped?bubbles:''}
      <!-- кольцо ряби на поверхности -->
      ${dropped?`<div class="l48-rip" style="left:50%;margin-left:-23px;top:${wr-6}px;animation-delay:.12s"></div>`:''}
    </div>
    <!-- перелив-волна через передний край -->
    ${dropped?`<div class="l48-overflow" style="left:${bx+1}px;width:${bw-2}px;top:${bt-4}px;z-index:4"></div>`:''}
    ${splash}
    <!-- подпись уровня воды -->
    <div style="position:absolute;left:${bx+14}px;top:${bt+20}px;font-size:10px;color:#eaf6ff;z-index:3;font-weight:bold;
      text-shadow:0 1px 2px rgba(20,70,110,.8);letter-spacing:.2px">${dropped?'💦 перелилась!':'вода до края'}</div>
    <!-- корона (перетаскиваемая) -->
    ${dropped?''
      : `<div onpointerdown="l48DStart(event,this,LK48)" id="l48crown" class="l48-bob"
          style="position:absolute;left:${crownStartX}px;top:${crownStartY}px;width:68px;cursor:grab;touch-action:none;z-index:6;filter:drop-shadow(0 3px 5px rgba(0,0,0,.35))">
          <div style="font-size:10px;color:#6b4d10;text-align:center;background:rgba(255,250,225,.95);border:1px solid rgba(217,164,65,.5);border-radius:8px;margin-bottom:4px;padding:1px 0;font-weight:bold;box-shadow:0 1px 3px rgba(0,0,0,.15)">потяни меня ⬇</div>
          ${l48Crown(66)}
        </div>`}
  </div>`;
}

function l48Cylinder(p, bodyHtml, opts){
  // мензурка (вид сбоку): вода поднимается до уровня p (0..1), тело внутри
  const o=opts||{};
  const W=o.w||170, H=o.h||190;
  const waterH=Math.round((H-40)*Math.min(1,p));     // высота воды от дна
  const marks=[0,.25,.5,.75,1].map(f=>Math.round(f*(H-40)));
  return `<div style="position:relative;width:${W}px;height:${H}px;margin:0 auto">
    <!-- шкала -->
    <div style="position:absolute;right:4px;top:4px;bottom:8px;width:14px;border-left:1px solid rgba(207,233,248,.5)">
      ${marks.map((y,i)=>`<div style="position:absolute;left:0;top:${y-3}px;width:8px;border-top:1px solid rgba(207,233,248,.6)"></div>
      <div style="position:absolute;left:10px;top:${y-6}px;font-size:8px;color:#9fc5e8">${Math.round(i*100)}</div>`).join('')}
    </div>
    <!-- стекло -->
    <div style="position:absolute;left:10px;right:26px;top:0;bottom:8px;border-radius:4px 4px 18px 18px;
      border:4px solid #cfe9f8;background:rgba(255,255,255,.04);overflow:hidden"></div>
    <!-- вода -->
    <div style="position:absolute;left:14px;right:30px;bottom:12px;height:${waterH}px;transition:height .7s ease;
      background:linear-gradient(180deg,rgba(200,235,255,.95),rgba(80,160,230,.92));border-radius:2px 2px 14px 14px"></div>
    <div style="position:absolute;left:14px;right:30px;bottom:${12+waterH-3}px;height:3px;background:rgba(235,248,255,.95);border-radius:2px;transition:bottom .7s ease"></div>
    <!-- тело -->
    <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:${o.bottom!=null?o.bottom:(o.imm!=null?12+waterH-o.imm:18+waterH)}px;transition:bottom .7s ease;z-index:3">${bodyHtml||''}</div>
    ${o.label?`<div style="position:absolute;top:2px;left:0;right:0;text-align:center;font-size:11px;color:#ffd9a0;font-weight:bold">${o.label}</div>`:''}
    ${o.thread?(()=>{ const tH=Math.max(4, H-(o.bottom!=null?o.bottom:18+waterH)-(o.bodyH||50)-6);
      return `<div style="position:absolute;left:50%;transform:translateX(-50%);top:2px;width:2px;height:${tH}px;border-radius:1px;
        background:linear-gradient(180deg,rgba(200,215,226,.95),rgba(160,180,195,.75))"></div>
        <div style="position:absolute;left:50%;transform:translateX(-50%);top:${tH}px;width:7px;height:7px;border-radius:50%;
          background:#c8d7e2;box-shadow:0 0 0 2px rgba(200,215,226,.4)"></div>`; })():''}
  </div>`;
}

function l48CubeBody(p){
  // деревянный брусок (фронтальный вид, текстура), плавает в мензурке
  return `<svg width="38" height="38" viewBox="0 0 38 38" style="display:block;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))">
    <rect x="1" y="1" width="36" height="36" rx="5" fill="#cfa06a" stroke="#6b4522" stroke-width="2"/>
    <rect x="7" y="5" width="11" height="8" rx="2" fill="rgba(255,255,255,.3)"/>
    <rect x="23" y="27" width="9" height="6" rx="2" fill="rgba(90,55,25,.32)"/>
    <path d="M2,21 Q10,17 19,21 T36,20" stroke="rgba(120,75,35,.35)" stroke-width="2" fill="none"/>
    <path d="M8,33 Q16,29 30,33" stroke="rgba(120,75,35,.25)" stroke-width="2" fill="none"/>
  </svg>`;
}
function visL37(el){
  // Урок 37 «Энергия и работа»: сюжет «Волшебная горка», мяч катится, энергия перетекает
  try{
    const L=lessonById(LV.id); if(!L){ el.innerHTML=''; return; }
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    window.LK48=lk;
    const step=LV.step||0;
    const col=(...ps)=>`<div class="wv-col">${ps.join('')}</div>`;
    const big=(t,ex)=>`<div class="wv-big" ${ex||''}>${t}</div>`;
    const sml=(t)=>`<div class="wv-sml">${t}</div>`;
    const btns=(...bs)=>`<div class="wv-row">${bs.join('')}</div>`;
    const btn=(txt,on,extra)=>`<button class="hint-btn" onclick="${on}" ${extra||''}>${txt}</button>`;
    const chip=(t,c)=>`<span style="display:inline-block;padding:2px 10px;border-radius:9px;background:rgba(127,209,255,.07);border:1px solid ${c||'rgba(127,184,160,.5)'};font-size:15px;color:#d8ecff;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=col(big('Мяч на вершине горки'),
        l37Scene(0,false,{mark:{x:96,y:18,t:'высота h'}})+
        sml('мяч стоит — а энергия у него ЕСТЬ. толкни его на следующем шаге и смотри!'));
    } else if(step===1){
      h=col(big('Что такое энергия'),
        `<div style="font-size:44px">⚡</div>`+big('способность совершать работу')+
        sml('поднятый мяч может упасть · летящая стрела — пробить цель · сжатая пружина — распрямиться'));
    } else if(step===2){
      h=col(big('Потенциальная энергия'),
        `<div style="font-size:36px;color:var(--brass);font-family:Georgia,serif">E = m · g · h</div>`+
        l37Scene(0,false,{mark:{x:96,y:18,t:'h'}})+
        sml('масса × (g≈10) × высота. чем выше и тяжелее — тем больше энергии'));
    } else if(step===3){
      h=col(big('Разбираем на числах'),
        `<div class="wv-row">${chip('m = 2 кг','rgba(127,184,160,.5)')} ${chip('h = 10 м','rgba(127,209,255,.5)')} ${chip('g = 10','rgba(217,164,65,.5)')}</div>`+
        `<div style="font-size:19px" class="wv-pop">E = m·g·h = 2 · 10 · 10</div>`+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">E = 200 Дж</div>`+
        sml('джоуль (Дж) — единица энергии'));
    } else if(step===4){
      // интерактив: запустить мяч (анимация спуска)
      const p=st.roll?1:0;
      h=col(big('Запускаем мяч!'),
        l37Scene(p, p>0.5, {slide:!!st.roll, mark:{x:96,y:18,t:p?'низ!':'высота h'}})+
        l37Bars(p, !!st.roll)+
        (st.roll
          ? big('энергия перетекла: Ep → Ek!')+sml('мяч катится — потенциальная убывает, кинетическая растёт')
          : btn('▶ запустить мяч с горки', `l37Act('${lk}','roll')`)+sml('нажми и следи за полосками энергии!'))+
        (st.roll? btn('↺ вернуть наверх', `l37Act('${lk}','up')`) : ''));
    } else if(step===5){
      h=col(big('Внизу — вся энергия кинетическая'),
        l37Scene(1,true,{mark:{x:150,y:18,t:'Ek = 100%'}})+
        l37Bars(1)+
        big('Ep = 0 · Ek = максимум')+sml('высота ноль, зато скорость — и кинетическая энергия'));
    } else if(step===6){
      h=col(big('Мяч совершил работу!'),
        l37Scene(1,true,{mark:{x:180,y:52,t:'Бам!'}})+
        big('кегля сбита — работа совершена')+sml('кинетическая энергия мяча перешла в работу по сбиванию кегли'));
    } else if(step===7){
      h=col(big('Работа'),
        `<div style="font-size:36px;color:var(--brass);font-family:Georgia,serif">A = F · s</div>`+
        `<div class="wv-row">${chip('F = 50 Н','rgba(232,106,90,.5)')} ${chip('s = 2 м','rgba(127,209,255,.5)')}</div>`+
        `<div class="wv-ans" style="font-size:26px">A = 50 · 2 = 100 Дж</div>`+
        sml('работа = сила × путь'));
    } else if(step===8){
      h=col(big('Мощность'),
        `<div style="font-size:36px;color:var(--brass);font-family:Georgia,serif">N = A : t</div>`+
        `<div class="wv-row">${chip('A = 300 Дж','rgba(232,106,90,.5)')} ${chip('t = 10 с','rgba(127,209,255,.5)')}</div>`+
        `<div class="wv-ans" style="font-size:26px">N = 300 : 10 = 30 Вт</div>`+
        sml('мощность = работа за единицу времени (ватт)'));
    } else if(step===9){
      h=col(big('Энергия не исчезает!'),
        `<div style="display:flex;gap:6px;justify-content:center;align-items:center;font-size:30px;margin:4px 0">
          <span style="color:#7fd1a0">⬆</span><span>→</span><span style="color:#f0a35a">⚡</span><span>→</span><span>💪</span></div>`+
        big('потенциальная → кинетическая → работа')+
        sml('энергия переходит из вида в вид, но не исчезает — закон сохранения!'));
    } else if(step===10){
      h=col(big('Разбираем задачку'),
        `<div class="wv-row">${chip('m = 2 кг','rgba(127,184,160,.5)')} ${chip('h = 10 м','rgba(127,209,255,.5)')}</div>`+
        `<div style="font-size:20px" class="wv-pop">E = m·g·h = 2 · 10 · 10</div>`+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">E = 200 Дж ✓</div>`+
        sml('такой вопрос будет дальше!'));
    } else if(step===11){
      // тренажёр
      if(st.m==null) st.m=2; if(st.h==null) st.h=5;
      const E=st.m*10*st.h;
      h=col(big('Тренажёр: подними мяч'),
        `<div class="wv-row">${chip('m = '+st.m+' кг','rgba(127,184,160,.5)')} ${chip('h = '+st.h+' м','rgba(127,209,255,.5)')}</div>`+
        `<div style="position:relative;width:250px;height:160px;margin:0 auto;border-radius:14px;overflow:hidden;background:linear-gradient(180deg,#aee0f5,#d8f0fa 55%,#7fb87a 55%,#5d9c4a)">
          <div style="position:absolute;left:10px;top:${130-Math.min(120,st.h*12)}px;transition:top .5s ease">${l37Ball(16)}</div>
          <div style="position:absolute;left:2px;bottom:16px;font-size:10px;color:#fff;background:rgba(0,0,0,.4);border-radius:5px;padding:0 5px">h = ${st.h} м</div>
          <div style="position:absolute;left:0;right:0;bottom:8px;height:5px;background:#8a6f4d;border-radius:3px"></div>
        </div>`+
        `<div class="wv-ans" style="font-size:24px">E = ${st.m}·10·${st.h} = ${E} Дж</div>`+
        btns(btn('+1 кг',`l37Act('${lk}','m+')`),btn('−1 кг',`l37Act('${lk}','m-')`),btn('+1 м',`l37Act('${lk}','h+')`),btn('−1 м',`l37Act('${lk}','h-')`),btn('↺',`l37Act('${lk}','r')`))+
        sml('подними выше или возьми тяжелее — энергия растёт!'));
    } else {
      // памятка
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:320px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.7">
          ⚡ Энергия — способность делать работу.<br>
          ⬆ Потенциальная: <b>E = m·g·h</b> (высота!).<br>
          ⚡ Кинетическая растёт со скоростью.<br>
          💪 Работа <b>A = F·s</b> · мощность <b>N = A:t</b>.<br>
          🔄 Энергия не исчезает — она переходит из вида в вид!</div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там груз 2 кг на 10 м'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}
function visL35(el){
  // Урок 35 «Давление твёрдых тел»: Архимед в снегу, кирпич, нож/гвоздь, тренажёр
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
    const rowC=(...ps)=>`<div style="display:flex;gap:14px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${ps.join('')}</div>`;
    // плитка 1 м² с числом силы
    const sq=(w,n,del,col,extra)=>`<div class="l35-pop" style="animation-delay:${del||0}s;text-align:center">
      <div style="position:relative;width:${w}px;height:${w}px;border-radius:10px;background:linear-gradient(145deg,#ffffff,#d7e9f5);
        border:2px dashed ${col||'#8fb0c6'};display:flex;align-items:center;justify-content:center;font-size:${Math.round(w*.2)}px;font-weight:bold;color:${col||'#2f6a92'}">
        ${extra||''}</div>
      <div style="font-size:10px;color:#7fa3ba;margin-top:2px">1 м²</div></div>`;
    // ряд плиток с силой сверху (для разборов F:S)
    const rowTiles=(n,fn,ws)=>{ let r=''; for(let i=0;i<n;i++){ const f=fn(i); const w=ws||58;
      r+=`<div class="l35-pop" style="animation-delay:${(0.25+i*.22).toFixed(2)}s;text-align:center">
        <div class="l35-press" style="font-size:14px;color:#e0523d;font-weight:bold;line-height:1.3">${f} Н</div>
        ${sq(w,1,0)}</div>`; } return r; };
    let h='';
    if(step===0){
      h=col(big('Архимед провалился в снег!'),
        l35Duel()+
        sml('вес одинаковый — а в ботинках провалился по колено, на лыжах — скользит. Почему? разгадка в площади! листай ➜'));
    } else if(step===1){
      h=col(big('Всё дело в площади'),
        l35FootPanels()+
        rowC(chip('сила (вес) — та же','rgba(232,106,90,.5)'), chip('площадь — разная','rgba(127,184,160,.5)'))+
        sml('на лыжах вес «размазан» по большой площади → на каждый м² давит мало. в ботинке весь вес на крошечной подошве → давит сильно!'));
    } else if(step===2){
      h=col(big('Что такое давление'),
        `<div style="font-size:42px;color:var(--brass);font-family:Georgia,serif;position:relative;display:inline-block;overflow:hidden;border-radius:8px">p = F : S<span class="l35-shine"></span></div>`+
        rowC(
          `<div style="text-align:center;min-width:92px;border:1px solid rgba(232,106,90,.35);border-radius:12px;padding:6px 8px;background:rgba(232,106,90,.05)"><div class="l35-press" style="font-size:24px">⬇</div><b style="font-size:13px">сила F</b><div style="font-size:10px;color:#cbb89a">давит на снег</div></div>`+
          `<div style="text-align:center;min-width:92px;border:1px solid rgba(127,209,255,.35);border-radius:12px;padding:6px 8px;background:rgba(127,209,255,.05)"><div style="font-size:24px">▦</div><b style="font-size:13px">площадь S</b><div style="font-size:10px;color:#cbb89a">на ней стоит вес</div></div>`+
          `<div style="text-align:center;min-width:92px;border:1px solid rgba(127,209,160,.4);border-radius:12px;padding:6px 8px;background:rgba(127,209,160,.05)"><div class="l35-pop" style="font-size:24px">⚖️</div><b style="font-size:13px">давление p</b><div style="font-size:10px;color:#cbb89a">на каждый м²</div></div>`)+
        sml('давление — какая сила приходится на ОДИН квадратный метр. та же сила, меньше площадь → давление больше'));
    } else if(step===3){
      // кирпич на снегу: узкая/широкая грань (интерактив)
      const o=st.orient||'wide';
      const F=60, S=o==='narrow'?0.5:2, p=Math.round(F/S);
      h=col(big('Опыт: кирпич на снегу'),
        l35BrickScene(o,F,true)+
        `<div class="wv-row">${chip('сила F = '+F+' Н','rgba(232,106,90,.5)')} ${chip('площадь S = '+S+' м²','rgba(127,184,160,.5)')}</div>`+
        `<div class="wv-ans" style="font-size:24px;color:#7fd1a0;font-weight:bold">p = ${F} : ${S} = ${p} Па</div>`+
        btns(btn('🟥 широкой гранью',`l35Act('${lk}','wide')`),btn('🟥 на торце',`l35Act('${lk}','narrow')`))+
        sml(p>100?'узкий торец — маленькая площадь: снег продавлен глубоко!':'широкая грань — площадь большая: снег почти не продавлен'));
    } else if(step===4){
      h=col(big('Единица — паскаль'),
        `<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin:4px 0">
          <div style="text-align:center">${l35UnitTile(96)}
            <div style="font-size:11px;color:#7fa3ba;margin-top:2px">1 Н на 1 м² = 1 Па</div></div>
        </div>`+
        `<div style="font-size:22px" class="wv-pop">1 Па = 1 Н/м²</div>`+
        sml('названа в честь Блеза Паскаля — учёного, изучавшего давление жидкостей и газов'));
    } else if(step===5){
      h=col(big('Разбираем на числах'),
        `<div class="wv-row">${chip('F = 100 Н','rgba(232,106,90,.5)')} ${chip('S = 2 м²','rgba(127,184,160,.5)')}</div>`+
        `<div style="display:flex;gap:10px;justify-content:center;align-items:flex-end;flex-wrap:wrap;margin:2px 0">${rowTiles(2,(i)=>50,62)}</div>`+
        `<div style="font-size:19px" class="wv-pop">p = F : S = 100 : 2</div>`+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">p = 50 Па</div>`+
        sml('100 Н разложили на 2 м² — на каждый метр по 50 Н. меньше площадь — больше давление!'));
    } else if(step===6){
      // правила в жизни: нож, гвоздь, лыжи/гусеницы
      h=col(big('Правило в жизни'),
        `<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:2px 0">
          <div style="width:150px;border:1px solid rgba(232,106,90,.4);border-radius:14px;padding:6px;background:rgba(232,106,90,.05);text-align:center">
            <b style="font-size:13px">🔪 нож</b>
            <div style="position:relative;width:132px;height:86px;margin:4px auto;border-radius:10px;overflow:hidden;background:linear-gradient(180deg,#f6e9d8,#e9d3ae)">
              <div class="l35-knife" style="position:absolute;left:50%;transform:translateX(-50%);top:-6px;z-index:3;font-size:34px;line-height:1">🔪</div>
              <div class="l35-halve" style="position:absolute;left:36px;top:52px;width:30px;height:24px;border-radius:50% 50% 8px 8px;background:linear-gradient(180deg,#e04b3a,#a5281f)"></div>
              <div class="l35-halve" style="position:absolute;left:66px;top:52px;width:30px;height:24px;border-radius:50% 50% 8px 8px;background:linear-gradient(180deg,#e04b3a,#a5281f)"></div>
              <div style="position:absolute;left:36px;top:50px;width:60px;height:4px;background:rgba(0,0,0,.25);border-radius:50%;bottom:2px"></div>
            </div>
            <div style="font-size:10px;color:#e0a99a">тонкое лезвие режет легко</div>
          </div>
          <div style="width:150px;border:1px solid rgba(127,184,160,.4);border-radius:14px;padding:6px;background:rgba(127,184,160,.05);text-align:center">
            <b style="font-size:13px">🔨 гвоздь</b>
            <div style="position:relative;width:132px;height:86px;margin:4px auto;border-radius:10px;overflow:hidden;background:linear-gradient(180deg,#fdf6e6,#f0e0bc)">
              <div class="l35-hammer" style="position:absolute;right:14px;top:-2px;font-size:26px;z-index:3">🔨</div>
              <div class="l35-nail" style="position:absolute;left:50%;transform:translateX(-50%);top:14px;font-size:15px;z-index:2">🔩</div>
              <div style="position:absolute;left:8px;right:8px;bottom:0;height:16px;border-radius:4px;background:linear-gradient(180deg,#c99a63,#8a5a2e)"></div>
              <div style="position:absolute;left:8px;right:8px;bottom:14px;height:2px;background:rgba(0,0,0,.25)"></div>
            </div>
            <div style="font-size:10px;color:#9fceb2">остриё входит в доску</div>
          </div>
          <div style="width:150px;border:1px solid rgba(127,209,255,.4);border-radius:14px;padding:6px;background:rgba(127,209,255,.05);text-align:center">
            <b style="font-size:13px">🚜 гусеницы</b>
            <div style="position:relative;width:132px;height:86px;margin:4px auto;border-radius:10px;overflow:hidden;background:linear-gradient(180deg,#e8f4fb,#ffffff)">
              <div style="position:absolute;left:14px;right:14px;bottom:8px;height:30px;border-radius:8px;background:linear-gradient(180deg,#3c5a48,#27402f)"></div>
              <div class="l35-tread" style="position:absolute;left:16px;right:16px;bottom:12px;height:8px;border-radius:4px;
                background:repeating-linear-gradient(90deg,#8fb09a 0 5px,#5d7a64 5px 9px,#8fb09a 9px 14px)"></div>
              <div style="position:absolute;left:26px;right:26px;bottom:20px;height:12px;border-radius:5px;background:#9db3a6"></div>
              <div style="position:absolute;left:10px;right:10px;top:10px;font-size:13px;color:#1a4a6a;font-weight:bold">широкая лента →</div>
              <div style="position:absolute;left:10px;right:10px;top:24px;font-size:10px;color:#3a6a8a">не тонет в снегу</div>
            </div>
            <div style="font-size:10px;color:#a9d2ec">площадь огромная — давление малое</div>
          </div>
        </div>`+
        sml('гвоздь острый, нож острят — уменьшают площадь. лыжи и гусеницы — увеличивают. одно правило на всё!'));
    } else if(step===7){
      h=col(big('Находим силу'),
        `<div class="wv-row">${chip('p = 40 Па','rgba(127,209,255,.5)')} ${chip('S = 3 м²','rgba(127,184,160,.5)')}</div>`+
        `<div style="display:flex;gap:8px;justify-content:center;align-items:flex-end;flex-wrap:wrap;margin:2px 0">${rowTiles(3,(i)=>40,54)}</div>`+
        `<div style="font-size:20px" class="wv-pop">F = p · S = 40 · 3</div>`+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">F = 120 Н</div>`+
        sml('три метра — по 40 Н на каждом. сила = давление × площадь'));
    } else if(step===8){
      h=col(big('Находим площадь'),
        `<div class="wv-row">${chip('F = 100 Н','rgba(232,106,90,.5)')} ${chip('p = 20 Па','rgba(127,209,255,.5)')}</div>`+
        `<div style="display:flex;gap:8px;justify-content:center;align-items:center;flex-wrap:wrap;margin:2px 0">${rowTiles(5,(i)=>20,42)}</div>`+
        `<div style="font-size:20px" class="wv-pop">S = F : p = 100 : 20</div>`+
        `<div class="wv-ans" style="font-size:28px;color:#7fd1a0;font-weight:bold">S = 5 м²</div>`+
        sml('100 Н уложились по 20 Н на метр — понадобилось 5 метров'));
    } else if(step===9){
      h=col(big('Разбираем задачку'),
        `<div class="wv-row">${chip('F = 60 Н','rgba(232,106,90,.5)')} ${chip('S = 2 м²','rgba(127,184,160,.5)')}</div>`+
        `<div style="display:flex;gap:10px;justify-content:center;align-items:flex-end;flex-wrap:wrap;margin:2px 0">${rowTiles(2,(i)=>30,62)}</div>`+
        `<div style="font-size:20px" class="wv-pop">p = F : S = 60 : 2</div>`+
        `<div class="wv-ans" style="font-size:30px;color:#7fd1a0;font-weight:bold">p = 30 Па ✓</div>`+
        sml('такой вопрос будет дальше!'));
    } else if(step===10){
      // тренажёр: сила и площадь → глубина продавливания снега
      if(st.F==null) st.F=60; if(st.S==null) st.S=2;
      const p=Math.round(st.F/st.S);
      const bw=Math.min(190, 58+st.S*26);
      const snowH=Math.max(12, Math.min(56, 60-p*0.3));
      const brickTop=196-snowH-40;
      h=col(big('Тренажёр: продави снег!'),
        `<div class="wv-row">${chip('F = '+st.F+' Н','rgba(232,106,90,.5)')} ${chip('S = '+st.S+' м²','rgba(127,184,160,.5)')}</div>`+
        `<div style="position:relative;width:300px;height:196px;margin:2px auto;border-radius:16px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.25)">
          ${l35WinterBg(300,196,snowH-6)}
          ${l35Flakes(7,196,false)}
          <div style="position:absolute;left:0;right:0;bottom:0;height:${snowH}px;background:linear-gradient(180deg,#ffffff,#d3e5f0);box-shadow:inset 0 -6px 10px rgba(140,180,205,.25)"></div>
          <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:${snowH-3}px;width:${bw+20}px;height:7px;background:rgba(90,120,150,.35);border-radius:50%;filter:blur(3px)"></div>
          <div class="l35-brickdrop" style="position:absolute;left:50%;transform:translateX(-50%);top:${brickTop}px;width:${bw}px;z-index:3">${l35Brick(bw,40)}</div>
          <div class="l35-ring" style="left:50%;margin-left:${-bw/2-10}px;bottom:${snowH-2}px;width:${bw+20}px;height:11px;z-index:4"></div>
          <div class="l35-spark" style="left:${6+(p*7)%80}%;bottom:${snowH+14}px;width:5px;height:5px;animation-delay:${(p%10)*.2}s"></div>
          <div style="position:absolute;top:4px;left:8px;font-size:10px;color:#5a7a8a">снег</div>
        </div>`+
        `<div class="wv-ans" style="font-size:24px;color:#7fd1a0;font-weight:bold">p = ${st.F} : ${st.S} = ${p} Па</div>`+
        btns(btn('+20 Н',`l35Act('${lk}','F+')`),btn('−20 Н',`l35Act('${lk}','F-')`),btn('+1 м²',`l35Act('${lk}','S+')`),btn('−1 м²',`l35Act('${lk}','S-')`),btn('↺',`l35Act('${lk}','r')`))+
        sml(p>120?'снег сжат сильно — глубокий след!':'снег почти не продавлен — площадь держит!'));
    } else {
      // памятка
      h=col(`<div style="font-size:50px">📜</div>`+big('Совет Архимеда')+
        `<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap">
          <div style="width:92px;opacity:.95">${l35ArchSvg(92,'down')}</div>
          <div style="background:rgba(217,164,65,.08);border:1px solid rgba(217,164,65,.35);border-radius:12px;padding:10px 14px;max-width:250px;text-align:left;font-size:14px;color:#e8dcc8;line-height:1.7">
            🧱 <b>p = F : S</b> — давление = сила : площадь.<br>
            🔪 Уменьши площадь — давление больше (нож!).<br>
            🎿 Увеличь площадь — давление меньше (лыжи!).<br>
            📏 1 Па = 1 Н/м² · F = p·S · S = F:p.</div>
        </div>`+
        btn('⟲ вернуться к тренажёру', `lvStep(-1)`)+
        sml('готов? жми «Понял! Проверю себя» — там 60 Н и 2 м²'));
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}
function visL33(el){
  // Урок 33 «Плотность»: сюжет «Ванна Архимеда», векторные сцены
  try{
    const L=lessonById(LV.id); if(!L){ el.innerHTML=''; return; }
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    window.LK48=lk;
    const step=LV.step||0;
    const col=(...ps)=>`<div class="wv-col">${ps.join('')}</div>`;
    const big=(t,ex)=>`<div class="wv-big" ${ex||''}>${t}</div>`;
    const sml=(t)=>`<div class="wv-sml">${t}</div>`;
    const btns=(...bs)=>`<div class="wv-row">${bs.join('')}</div>`;
    const btn=(txt,on,extra)=>`<button class="hint-btn" onclick="${on}" ${extra||''}>${txt}</button>`;
    const chip=(t,c)=>`<span style="display:inline-block;padding:2px 10px;border-radius:9px;background:rgba(127,209,255,.07);border:1px solid ${c||'rgba(127,184,160,.5)'};font-size:15px;color:#d8ecff;margin:2px">${t}</span>`;
    const rowC=(...ps)=>`<div style="display:flex;gap:14px;justify-content:center;align-items:flex-end;flex-wrap:wrap;margin:2px 0">${ps.join('')}</div>`;
    const item=(mat,rho,w,extra)=>`<div style="text-align:center">${l33CubeSvg(mat,w||52,rho)}${extra||''}</div>`;
    let h='';
    if(step===0){
      // ванна + игрушки: сначала угадай, потом брось!
      const dropped=!!st.drop;
      h = dropped ? col(big('Плюх-плюх! Вот что вышло'),
        l33Bath([
          {mat:'железо',swim:false,x:'50%',delay:.1,size:56},
          {mat:'дерево',swim:true,x:'24%',delay:.5,size:50},
          {mat:'лёд',swim:true,x:'40%',delay:.7,size:46},
          {mat:'пробка',swim:true,x:'74%',delay:.9,size:44}
        ],{h:160,w:250})+
        big('железо — на дно, остальные плывут!')+
        sml('ты угадал? почему так — узнаем дальше ➜'))
        : col(big('Ванна Архимеда: что утонет?'),
        l33Bath([],{h:160,w:250}),
        `<div style="margin-top:4px">${rowC(
          `<div style="text-align:center;width:80px">${l33CubeSvg('железо',42)}<div style="font-size:11px;color:#cbb89a">железо</div></div>`+
          `<div style="text-align:center;width:80px">${l33CubeSvg('дерево',42)}<div style="font-size:11px;color:#cbb89a">дерево</div></div>`+
          `<div style="text-align:center;width:80px">${l33CubeSvg('лёд',42)}<div style="font-size:11px;color:#cbb89a">лёд</div></div>`)}</div>`+
        btn('💦 бросить игрушки в воду', `l33Act('${lk}','drop')`)+
        sml('сначала угадай, потом нажми и проверь!'));
    } else if(step===1){
      h=col(big('Бульк! Железо — на дно'),
        l33Bath([
          {mat:'железо',swim:false,x:'50%',delay:.2,size:58},
          {mat:'пробка',swim:true,x:'20%',delay:.5,size:50},
          {mat:'лёд',swim:true,x:'36%',delay:.7,size:46},
          {mat:'дерево',swim:true,x:'70%',delay:.9,size:52}
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
      const cubes=[['пробка','0,2 г'],['дерево','0,6 г'],['лёд','0,9 г'],['железо','7,8 г']];
      h=col(big('Кубики ровно 1 см³'),
        `<div style="display:flex;gap:5px;justify-content:center;margin:2px 0">
          ${cubes.map(([m,w])=>`<div style="text-align:center;flex:0 0 76px">${l33CubeSvg(m,37)}<div style="font-size:10.5px;color:#7fa88f">${m}</div><div style="font-size:13px;color:#ffd9a0">${w}</div></div>`).join('')}</div>`+
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
      // стальной корабль плывёт по воде (внутри ванны)
      const H2=150, WT=Math.round(H2*.42);
      h=col(big('А корабль-то плавает!'),
        `<div style="position:relative;width:250px;height:${H2}px;margin:0 auto;border-radius:10px 10px 24px 24px;border:3px solid #55463a;background:linear-gradient(180deg,#f6efe2,#e8ddc9);overflow:hidden">
          <div style="position:absolute;left:6px;right:6px;bottom:6px;height:${H2-WT-6}px;background:linear-gradient(180deg,rgba(122,190,235,.92),rgba(40,110,180,.97))"></div>
          <div style="position:absolute;left:2px;right:2px;top:${WT}px;height:4px;background:rgba(210,240,255,.85);border-radius:50%"></div>
          <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:${H2-WT-22}px;z-index:3">
            <div class="l33-bob2" style="display:inline-block">${l33BoatSvg(130)}</div>
          </div>
          <div class="wv-sml" style="position:absolute;top:2px;left:0;right:0;text-align:center;font-size:10px;color:#8a6f4d">вода · воздух внутри</div>
        </div>`+
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
function l34Act(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  const bump=(k,d,lo)=> st[k]=Math.max(lo||1, Math.round(((st[k]==null?1:st[k])+d)*10)/10);
  switch(act){
    case 'm+': bump('m',1); break; case 'm-': bump('m',-1); break;
    case 'earth': st.place='Земля'; break;
    case 'moon': st.place='Луна'; break;
    case 'drop': st.fall=(st.fall||0)+1; break;
    case 'r': CHS[lk]={}; break;
  }
  chRender(0);
}
function l34Apple(w){
  // векторное яблоко
  const W=w||44;
  return `<svg width="${W}" height="${Math.round(W*1.08)}" viewBox="0 0 100 108" style="display:block">
    <ellipse cx="50" cy="62" rx="40" ry="40" fill="#e23b2e"/>
    <ellipse cx="50" cy="62" rx="40" ry="40" fill="url(#none)" opacity="0"/>
    <path d="M50,28 Q30,10 12,18 Q18,38 40,36" fill="#3f8f3f"/>
    <path d="M50,28 Q70,10 88,18 Q82,38 60,36" fill="#4aa24a"/>
    <path d="M50,26 Q50,6 62,2" stroke="#7a4a1a" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="40" rx="13" ry="9" fill="rgba(255,255,255,.35)"/>
    <ellipse cx="66" cy="84" rx="10" ry="7" fill="rgba(120,10,5,.4)"/>
  </svg>`;
}
function l34AppleSVG(w){
  const W=w||44, H=Math.round(W*1.1);
  return `<svg width="${W}" height="${H}" viewBox="0 0 120 132">
    <path d="M60,120 C20,120 6,96 10,70 C14,44 30,30 54,28 L60,26 L66,28 C90,30 106,44 110,70 C114,96 100,120 60,120 Z" fill="#d92f22"/>
    <path d="M60,120 C34,120 22,104 22,84 C22,64 32,48 50,40 C36,52 30,66 32,84 C34,104 46,116 60,118 Z" fill="#a81f14"/>
    <ellipse cx="42" cy="56" rx="16" ry="11" fill="rgba(255,255,255,.4)"/>
    <path d="M60,32 Q56,10 78,4" stroke="#7a4a20" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M74,14 Q92,4 100,12 Q98,26 80,28 Z" fill="#4a9a3a"/>
    <path d="M72,22 L90,10" stroke="#3c7a2e" stroke-width="2"/>
  </svg>`;
}
function l34Earth(w){
  const W=w||56, H=W;
  return `<svg width="${W}" height="${H}" viewBox="0 0 120 120">
    <defs><radialGradient id="e${w}" cx=".35" cy=".3" r="1"><stop offset="0" stop-color="#7fd4ff"/><stop offset="1" stop-color="#1a5fae"/></radialGradient></defs>
    <circle cx="60" cy="60" r="54" fill="url(#e${w})"/>
    <path d="M24,52 Q38,40 52,46 Q60,30 74,34 Q88,38 92,50 Q100,58 92,66 Q80,72 70,66 Q56,72 44,64 Q30,64 24,52 Z" fill="#3f9a4a"/>
    <path d="M30,80 Q44,88 60,84 Q78,90 92,82" fill="none" stroke="#3f9a4a" stroke-width="7"/>
    <path d="M40,40 Q46,34 54,38" stroke="#bfe8ff" stroke-width="5" fill="none" opacity=".7"/>
    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
  </svg>`;
}
function l34Moon(w){
  const W=w||56, H=W;
  const craters=[[38,40,9],[80,56,12],[60,86,8],[22,70,6],[92,24,5]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(0,0,0,.12)"/><circle cx="${x-r*.3}" cy="${y-r*.3}" r="${r*.35}" fill="rgba(255,255,255,.25)"/>`).join('');
  return `<svg width="${W}" height="${H}" viewBox="0 0 120 120">
    <defs><radialGradient id="m${w}" cx=".4" cy=".35" r="1"><stop offset="0" stop-color="#e8e8e8"/><stop offset="1" stop-color="#9a9a9a"/></radialGradient></defs>
    <circle cx="60" cy="60" r="54" fill="url(#m${w})"/>
    ${craters}
    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
  </svg>`;
}
function l34Dyn(F,m,place,w,maxF){
  // Динамометр: пружина растягивается пропорционально F, шкала честная (0..maxF).
  const W=w||100, H=Math.round(W*1.9);
  const cx=W*.58;
  if(maxF==null) maxF=Math.max(60, Math.ceil(F*1.25/50)*50);
  const frac=Math.min(1, F/maxF);
  const topY=Math.round(H*.10), botY=Math.round(H*.74);
  const range=botY-topY-8;
  const sprTop=topY+6;
  const endY=sprTop+frac*range;
  const turns=9; const seg=(Math.max(12,endY-sprTop-4))/turns;
  let d=`M${cx},${sprTop}`;
  for(let i=0;i<turns;i++){ const y=sprTop+3+i*seg; d+=` L${cx-7},${y} L${cx+7},${y+seg*.5}`; }
  d+=` L${cx},${Math.min(endY+6,botY-2)}`;
  const loadY=Math.min(H-16, endY+12);
  const G=Math.round(F*10)/10;
  const half=Math.round(maxF/2);
  const scaleMax=Math.round(maxF);
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block">
    <defs><linearGradient id="dy${place}${w}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e4edf2"/><stop offset=".5" stop-color="#aeb9c2"/><stop offset="1" stop-color="#7d8890"/></linearGradient></defs>
    <rect x="${cx-15}" y="${topY}" width="30" height="${H*.52}" rx="6" fill="url(#dy${place}${w})" stroke="#333" stroke-width="1.6"/>
    <rect x="${cx-11}" y="${topY+4}" width="22" height="${H*.52-8}" rx="4" fill="rgba(255,255,255,.15)"/>
    <circle cx="${cx}" cy="${topY-7}" r="7" fill="none" stroke="#8b98a2" stroke-width="5"/>
    <path d="${d}" stroke="#9fb0b8" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <line x1="${cx}" y1="${Math.min(endY+4,botY)}" x2="${cx}" y2="${loadY}" stroke="#667" stroke-width="3"/>
    <rect x="${cx-20}" y="${loadY+2}" width="40" height="${Math.min(20,H*.09)}" rx="7" fill="#d9a441" stroke="#8a6a1a" stroke-width="1.6"/>
    <text x="${cx}" y="${loadY+16}" text-anchor="middle" font-size="12" font-weight="bold" fill="#4a3608">${m} кг</text>
    <g font-size="${Math.max(11,Math.round(W*.115))}" fill="#e8e0cc" text-anchor="middle">
      <text x="${cx-34}" y="${topY+12}">0</text>
      <line x1="${cx-37}" y1="${topY+7}" x2="${cx-16}" y2="${topY+7}" stroke="#cbb89a" stroke-width="1.4"/>
      <text x="${cx-34}" y="${topY+14+range*.5}">${half}</text>
      <line x1="${cx-37}" y1="${topY+9+range*.5}" x2="${cx-16}" y2="${topY+9+range*.5}" stroke="#cbb89a" stroke-width="1.4"/>
      <text x="${cx-34}" y="${topY+18+range}">${scaleMax}</text>
      <line x1="${cx-37}" y1="${topY+13+range}" x2="${cx-16}" y2="${topY+13+range}" stroke="#cbb89a" stroke-width="1.4"/>
    </g>
    <path d="M${cx-38},${topY+9+frac*range} l8,-2.5 l0,5 Z" fill="#ff5a3c" stroke="rgba(0,0,0,.5)" stroke-width=".8"/>
    <text x="${cx}" y="${H-2}" text-anchor="middle" font-size="${Math.round(W*.13)}" fill="#ffd9a0" font-weight="bold">${G} Н</text>
  </svg>`;
}

function visL10(el){
  // Урок 10 «Средняя скорость»: полный пошаговый разбор с анимацией
  try{
    const L=lessonById(LV.id); if(!L){ el.innerHTML=''; return; }
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    window.LK48=lk;
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
  else if(id===34) visL34(el);
  else if(id===35) visL35(el);
  else if(id===36) visL36(el);
  else if(id===37) visL37(el);
  else if(id===48) visL48(el);
  else if(id===49) visL49(el);
  else if(id===50) visL50(el);
  else if(id===76) visL76(el);
  else if(id===77) visL77(el);
  else if(id===78) visL78(el);
  else if(id===79) visL79(el);
  else if(id===80) visL80(el);
  else if(id===81) visL81(el);
  else if(id===82) visL82(el);
  else if(id===83) visL83(el);
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
