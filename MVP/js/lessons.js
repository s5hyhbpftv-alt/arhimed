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
    const card=(inner)=>`<div style="display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center">${inner}</div>`;
    const big=(t)=>`<div style="font-size:19px;color:var(--amber);font-family:Georgia,serif">${t}</div>`;
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
    el.innerHTML=`<div style="background:rgba(16,31,24,.75);border:1px solid #3d5c49;border-radius:12px;padding:10px;margin-top:10px">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}


var CHS={};
function chRender(lid){ const el=document.getElementById('lvis'); if(!el) return; if(visIsChem()) visChemNew(el); else if(visIsPhys()) visPhysNew(el); else if(visIsMath()) visMathNew(el); }
function visChemNew(el){
  try{
    const L=lessonById(LV.id); if(!L){ el.innerHTML=''; return; }
    if(!CHS[lidKey(LV.id)]) CHS[lidKey(LV.id)]={};
    const st=CHS[lidKey(LV.id)];
    const all=((L.explain||[]).join(' ')+' '+(L.check&&L.check.q||'')+' '+L.title).toLowerCase();
    const raw=(L.check&&L.check.q||'');
    const nums=(raw.match(/\d+(?:[.,]\d+)?/g)||[]).map(x=>parseFloat(x.replace(',','.')));
    const has=(...ws)=>ws.some(w=>all.includes(w));
    const card=(inner)=>`<div style="display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center">${inner}</div>`;
    const big=(t)=>`<div style="font-size:19px;color:var(--amber);font-family:Georgia,serif">${t}</div>`;
    const btn=(txt,on)=>{ const k=lidKey(LV.id)+'_b'; const n=((st._b)||0)+1; st._b=n; return `<button class="hint-btn" onclick="chBtn('${lidKey(LV.id)}','${txt}')">${txt}</button>`; };
    const lk=lidKey(LV.id);
    const TARGET=12;
    let h='';
    if(has('титрован')||(has('кислот')&&has('основан'))||has('лакмус')||has('индикатор')){
      const d=st.drops||0; const done=d>=TARGET;
      const color = d===0?'#f7f0e0':(done?'#ff9fb0':'#e8dff0');
      st.drops=d;
      h=card(
        `<div style="display:flex;align-items:flex-end;gap:14px">
          <div style="position:relative;width:46px;height:120px;border:3px solid #33291e;border-top:none;border-radius:0 0 16px 16px;background:linear-gradient(#fff, #dde8ff);overflow:hidden">
            <div style="position:absolute;bottom:0;left:0;right:0;height:${8+d*3}px;background:#9fc5f5;transition:.2s"></div>
            <div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);font-size:16px">🫗</div>
          </div>
          <div style="width:52px;height:70px;border:3px solid #33291e;border-radius:0 0 14px 14px;background:${color};display:flex;align-items:flex-end;justify-content:center;padding-bottom:6px;font-size:12px;color:#33291e;transition:.2s">${done?'розовый!':'кислота'}</div>
        </div>`+
        big(`капель щёлочи: ${Math.min(d,TARGET)}`)+
        `<div style="display:flex;gap:8px;justify-content:center">
          <button class="hint-btn" onclick="chTitr('${lk}',1)" ${done?'disabled':''}>💧 капля</button>
          <button class="hint-btn" onclick="chTitr('${lk}',0)">↺ сброс</button></div>`+
        `<div class="small" style="color:#cbb89a">${done?'Щёлочь добавили достаточно — индикатор стал розовым (нейтрализация).':'Добавляй щёлочь по капле — следи за цветом индикатора.'}</div>`);
    }
    else if(has('валентн')){
      const sel=st.sel||'H'; const cards=[['H',1,'#7fb8a0'],['O',2,'#c96f4a'],['C',4,'#8a5c33'],['N',3,'#7c9b4f'],['Cl',1,'#8fc7f5']];
      st.sel=sel;
      h=card(`<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">${cards.map(([nm,v,col])=>`<div onclick="chVal('${lk}','${nm}')" style="cursor:pointer;width:64px;padding:6px;border:2px solid ${sel===nm?'var(--brass)':'#3d5c49'};border-radius:10px;background:rgba(255,255,255,.05);text-align:center"><div style="font-size:24px;font-weight:bold;color:${col}">${nm}</div><div class="small" style="font-size:10.5px;color:#cbb89a">валентность ${v}</div></div>`).join('')}</div>`+
        `<div class="small" style="color:#cbb89a">нажми на элемент — увидишь его валентность. Водород H = 1, кислород O = 2 — постоянны.</div>`);
    }
    else if(has('молярная масса')||has('mr(')||has('относительн')||has('молекулярн. масс')){
      const M=st.M||0; const parts=st.parts||[];
      const add=(nm,val)=>{ parts.push([nm,val]); st.parts=parts; st.M=M+val; chRender(LV.id); };
      h=card(`<div style="display:flex;align-items:center;gap:12px">
        <div style="font-size:40px">⚖️</div>
        <div style="min-width:120px;text-align:left">
          <div class="small" style="color:#cbb89a">атомы в формуле:</div>
          ${parts.length?parts.map(([nm,v])=>`<span style="display:inline-block;margin:1px;padding:0 6px;background:#13251c;border:1px solid #3d5c49;border-radius:8px;font-size:13px">${nm}(${v})</span>`).join(' '):'<span class="small">—</span>'}
        </div></div>`+big(`Mr = ${M||0}`)+
        `<div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap">
          <button class="hint-btn" onclick="chMr('${lk}','H',1)">+H(1)</button>
          <button class="hint-btn" onclick="chMr('${lk}','O',16)">+O(16)</button>
          <button class="hint-btn" onclick="chMr('${lk}','C',12)">+C(12)</button>
          <button class="hint-btn" onclick="chMr('${lk}','N',14)">+N(14)</button>
          <button class="hint-btn" onclick="chMr('${lk}','Na',23)">+Na(23)</button>
          <button class="hint-btn" onclick="chMr('${lk}','Cl',35)">+Cl(35)</button>
          <button class="hint-btn" onclick="chMr('${lk}','')">↺</button></div>`);
    }
    else if(has('моль')){ const n=st.n||0;
      h=card(`<div style="font-size:42px">🧂</div>`+big(`${n} моль`)+`<div class="small" style="color:#cbb89a">1 моль — это 6·10²³ частиц (число Авогадро)</div>`+
        `<div style="display:flex;gap:8px;justify-content:center"><button class="hint-btn" onclick="chMol('${lk}',1)">+1 моль</button><button class="hint-btn" onclick="chMol('${lk}',0)">↺</button></div>`);
    }
    else if(has('раствор')||has('массовая доля')){
      const salt=(st.salt==null?10:st.salt), water=st.water==null?90:st.water; st.salt=salt; st.water=water;
      const tot=salt+water, pct=Math.round(salt/tot*100);
      h=card(`<div style="position:relative;width:90px;height:130px;border:3px solid #33291e;border-radius:0 0 18px 18px;background:linear-gradient(#bcd9f2,#7fb8d8);overflow:hidden">
        <div style="position:absolute;bottom:0;left:0;right:0;height:${Math.round(salt/tot*100)}%;background:#f4f4ee;display:flex;align-items:center;justify-content:center;font-size:11px;color:#8a94ad">соль</div>
        <div style="position:absolute;top:4px;left:0;right:0;text-align:center;font-size:11px;color:#2a3b52">${water} г воды</div></div>`+
        big(`${salt} г соли + ${water} г воды`)+
        `<div style="display:flex;gap:6px;justify-content:center"><button class="hint-btn" onclick="chSalt('${lk}',10)">+10 г соли</button><button class="hint-btn" onclick="chSalt('${lk}',-10)">−10 г</button><button class="hint-btn" onclick="chSalt('${lk}',0)">↺</button></div>`+
        `<div class="small" style="color:#cbb89a">массовая доля соли: ${pct}% (соль/всё·100)</div>`);
    }
    else if(has('горен')){ const on=st.fire==null?1:st.fire; st.fire=on;
      const need=on===1?'горючее, кислород и тепло — огонь горит':'убрали условие — огонь погас';
      h=card(`<div style="font-size:52px">${on?'🔥':'💨'}</div>`+big(on?'горит':'погас')+
        `<div style="display:flex;gap:6px;justify-content:center"><button class="hint-btn" onclick="chFire('${lk}',1)">🔥 зажечь</button><button class="hint-btn" onclick="chFire('${lk}',0)">🧯 потушить</button></div>`+
        `<div class="small" style="color:#cbb89a">${need}</div>`);
    }
    else if(has('кислот')&&has('металл')){
      const nz=st.zn||0;
      h=card(`<div style="display:flex;gap:10px;align-items:center;justify-content:center">
        <div style="font-size:44px">🧪</div><div style="font-size:44px">+</div><div style="font-size:44px">${nz?'🫧':'⚙️'}</div></div>`+
        big(`Zn + 2HCl → ZnCl₂ + H₂`)+
        `<div style="display:flex;gap:8px;justify-content:center"><button class="hint-btn" onclick="chZn('${lk}',1)">добавить цинк</button><button class="hint-btn" onclick="chZn('${lk}',0)">↺</button></div>`+
        `<div class="small" style="color:#cbb89a">${nz?'выделяется газ водород — пузырьки!':'брось кусочек цинка в кислоту'}</div>`);
    }
    else if(has('металл')||has('неметалл')){
      h=card(`<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <div style="padding:8px;border:2px solid #3d5c49;border-radius:10px;background:#13251c;width:110px"><div style="font-size:28px">🔩</div><b>Железо, медь</b><div class="small" style="color:#cbb89a">блестят, проводят ток</div></div>
        <div style="padding:8px;border:2px solid #3d5c49;border-radius:10px;background:#13251c;width:110px"><div style="font-size:28px">🎈</div><b>Кислород, сера</b><div class="small" style="color:#cbb89a">не блестят, не проводят</div></div></div>`);
    }
    else if(has('молекул')||has('атом')||has('формул')||has('символ')){
      const m=st.mol||0; st.mol=m;
      h=card(`<div style="display:flex;gap:4px;align-items:center;justify-content:center;font-size:30px">${Array.from({length:Math.min(m+1,6)},()=>'🧪').join('')}</div>`+big(`${m}${m===1?' молекула':' молекул'}`)+
        `<div style="display:flex;gap:8px;justify-content:center"><button class="hint-btn" onclick="chMol2('${lk}',1)">+молекула</button><button class="hint-btn" onclick="chMol2('${lk}',0)">↺</button></div>`+
        `<div class="small" style="color:#cbb89a">считаем молекулы — как и частицы в формулах</div>`);
    }
    else {
      h=card(`<div style="font-size:36px">🧪</div>`+big(L.title||'')+`<div class="small" style="color:#cbb89a;max-width:300px">${esc(((L.explain&&L.explain[0])||'')).slice(0,150)}…</div>`);
    }
    el.innerHTML=`<div style="background:rgba(16,31,24,.75);border:1px solid #3d5c49;border-radius:12px;padding:10px;margin-top:10px">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}
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


function visPhysNew(el){
  try{
    const L=lessonById(LV.id); if(!L){ el.innerHTML=''; return; }
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const all=((L.explain||[]).join(' ')+' '+(L.check&&L.check.q||'')+' '+L.title).toLowerCase();
    const raw=(L.check&&L.check.q||'');
    const nums=(raw.match(/\d+(?:[.,]\d+)?/g)||[]).map(x=>parseFloat(x.replace(',','.')));
    const has=(...ws)=>ws.some(w=>all.includes(w));
    const card=(inner)=>`<div style="display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center">${inner}</div>`;
    const big=(t)=>`<div style="font-size:19px;color:var(--amber);font-family:Georgia,serif">${t}</div>`;
    const small=(t)=>`<div class="small" style="color:#cbb89a">${t}</div>`;
    const btns=(...bs)=>`<div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap">${bs.map(b=>`<button class="hint-btn" onclick="phAct('${lk}','${b[0]}')">${b[1]}</button>`).join('')}</div>`;
    let h='';
    if(has('скорост','движен')){
      if(st.v==null) st.v=Math.max(nums[0]||5,1); if(st.t==null) st.t=Math.max(nums[1]||2,1);
      const S=st.v*st.t;
      h=card(`<div style="width:250px;height:26px;border:2px solid #3d5c49;border-radius:6px;position:relative;background:#101f18">
        <div style="position:absolute;top:2px;left:2px;width:${Math.min(240, S*4)}px;height:18px;background:linear-gradient(90deg,#7fd1ff,var(--brass));border-radius:4px;display:flex;align-items:center;justify-content:flex-end;padding-right:4px;font-size:11px">🚗</div></div>`
        + big(`v=${st.v} км/ч · t=${st.t} ч`)
        + big(`S = v·t = ${S} км`)
        + btns(['v+','🚗 быстрее +5'],['v-','медленнее −5'],['t+','⏱ +1 ч'],['t-','⏱ −1 ч'],['r','↺']));
    }
    else if(has('плотност')){
      if(st.m==null) st.m=Math.max(nums[0]||6,1); if(st.V==null) st.V=Math.max(nums[1]||2,1);
      const ro=st.m/st.V; const swim=ro<=1;
      h=card(`<div style="display:flex;gap:10px;align-items:center;justify-content:center">
        <div style="font-size:52px">${swim?'🛟':'🪨'}</div>
        <div style="width:110px;height:120px;border:3px solid #33291e;border-radius:0 0 16px 16px;background:linear-gradient(#9fc5f5,#6aa8dc);position:relative;overflow:hidden">
          <div style="position:absolute;bottom:0;left:0;right:0;height:${Math.min(100,st.V*22)}px;background:#a06a3a;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px">${st.m} г / ${st.V} см³</div></div></div>`
        + big(`ρ = ${st.m} : ${st.V} = ${ro} г/см³`)
        + btns(['m+','+1 г'],['m-','−1 г'],['V+','+1 см³'],['V-','−1 см³'],['r','↺'])
        + small(swim?'ρ ≤ 1 — тело плавает в воде':'ρ > 1 — тело тонет'));
    }
    else if(has('сила тяжест','вес','тяжести')){
      if(st.m==null) st.m=Math.max(nums[0]||3,1);
      const F=st.m*10;
      h=card(`<div style="display:flex;gap:14px;align-items:flex-end;justify-content:center">
        <div style="width:60px;height:${Math.min(130,40+F*6)}px;background:linear-gradient(#f0c75e,#c96f4a);border:2px solid #33291e;border-radius:6px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:4px;font-size:12px;color:#33291e;transition:.2s">${st.m} кг</div>
        <div style="width:46px;height:140px;border:3px solid #33291e;border-radius:10px;position:relative;background:#fff">
          <div style="position:absolute;bottom:6px;left:6px;right:6px;height:${Math.min(120,F*4)}px;background:#7fd1ff;border-radius:4px"></div>
          <div style="position:absolute;top:4px;left:0;right:0;text-align:center;font-size:11px;color:#33291e">${F} Н</div></div></div>`
        + big(`F = m·g = ${st.m}·10 = ${F} Н`)
        + btns(['m+','+1 кг'],['m-','−1 кг'],['r','↺']));
    }
    else if(has('давление твёрдых')){
      if(st.F==null) st.F=Math.max(nums[0]||60,1); if(st.S==null) st.S=Math.max(nums[1]||3,1);
      const p=st.F/st.S;
      h=card(`<div style="display:flex;align-items:flex-end;gap:10px;justify-content:center">
        <div style="font-size:44px">🧱</div>
        <div style="width:${Math.min(150,40+st.S*14)}px;height:26px;background:#8a94ad;border:2px solid #33291e;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff">S = ${st.S} м²</div></div>`
        + big(`p = F : S = ${st.F} : ${st.S} = ${p} Па`)
        + btns(['F+','+10 Н'],['F-','−10 Н'],['S+','+1 м²'],['S-','−1 м²'],['r','↺']));
    }
    else if(has('архимед','выталкива')){
      if(st.d==null) st.d=1;
      const F=1000*10*(st.d*0.1); // глубина 0.1..? объём погружённой части
      h=card(`<div style="position:relative;width:150px;height:130px;border:3px solid #33291e;border-radius:0 0 16px 16px;background:linear-gradient(#9fc5f5,#6aa8dc);overflow:hidden">
        <div style="position:absolute;bottom:6px;left:50%;transform:translateX(-50%);width:44px;height:${st.d*14}px;background:#a06a3a;border:2px solid #33291e;border-radius:4px"></div>
        <div style="position:absolute;top:2px;left:0;right:0;text-align:center;font-size:11px;color:#123">F = ${F.toFixed(0)} Н</div></div>`
        + big(`погружение: ${st.d*10}%`)
        + btns(['d+','⬇ глубже'],['d-','⬆ выше'],['r','↺'])
        + small('F = ρ·g·V погружённой части'));
    }
    else if(has('паскал','давление жидкости')){
      if(st.h==null) st.h=Math.max(nums[1]||2,1);
      const p=1000*10*st.h;
      h=card(`<div style="position:relative;width:110px;height:150px;border:3px solid #33291e;border-radius:0 0 14px 14px;background:linear-gradient(#cfe8fb,#9fc5f5);overflow:hidden">
        <div style="position:absolute;top:2px;left:0;right:0;text-align:center;font-size:12px;color:#123">h = ${st.h} м</div></div>`
        + big(`p = ρ·g·h = 1000·10·${st.h} = ${p} Па = ${p/1000} кПа`)
        + btns(['h+','⬆ глубже'],['h-','⬆ выше'],['r','↺']));
    }
    else if(has('ом','напряжен','сопротивлен','сила тока')){
      if(st.U==null) st.U=Math.max(nums[0]||6,1); if(st.R==null) st.R=Math.max(nums[1]||2,1);
      const I=st.U/st.R;
      h=card(`<div style="display:flex;align-items:center;gap:12px;justify-content:center">
        <div style="font-size:40px">💡</div>
        <div style="text-align:left">
          <div style="font-size:15px;color:#cbb89a">батарея: ${st.U} В</div>
          <div style="font-size:15px;color:#cbb89a">сопротивление: ${st.R} Ом</div></div></div>`
        + big(`I = U : R = ${st.U} : ${st.R} = ${I.toFixed(1)} А`)
        + btns(['U+','+3 В'],['U-','−3 В'],['R+','+1 Ом'],['R-','−1 Ом'],['r','↺'])
        + small(I>=1?'лампочка яркая 🔆':'лампочка тусклая 🔅'));
    }
    else if(has('энерг','кинетическ','потенциальн','высо')){
      const kin=has('кинетическ');
      if(st.a==null) st.a=Math.max(nums[0]||(kin?3:2),1); if(st.b==null) st.b=Math.max(nums[1]||(kin?2:5),1);
      const E=kin? (st.a*st.b*st.b/2) : (st.a*10*st.b);
      h=card(`<div style="font-size:44px">${kin?'⚡':'🚀'}</div>`
        + (kin? big(`E = m·v²/2 = ${st.a}·${st.b}²/2 = ${E} Дж`) : big(`E = m·g·h = ${st.a}·10·${st.b} = ${E} Дж`))
        + btns(['a+',kin?'+1 кг':'+1 кг'],['a-',kin?'−1 кг':'−1 кг'],['b+',kin?'+1 м/с':'+1 м'],['b-',kin?'−1 м/с':'−1 м'],['r','↺']));
    }
    else if(has('работ','мощност')){
      if(st.a==null) st.a=Math.max(nums[0]||10,1); if(st.b==null) st.b=Math.max(nums[1]||5,1);
      const A=st.a*st.b;
      h=card(`<div style="font-size:44px">🏋️</div>`+big(`A = F·s = ${st.a}·${st.b} = ${A} Дж`)
        + btns(['a+','+5 Н'],['a-','−5 Н'],['b+','+1 м'],['b-','−1 м'],['r','↺']));
    }
    else if(has('тепл','нагрев','температур','калор')){
      if(st.dt==null) st.dt=Math.max(nums[1]||1,1); if(st.m==null) st.m=Math.max(nums[0]||1,1);
      const Q=st.m*st.dt; // в калориях (1 кал = 1г·1°)
      h=card(`<div style="font-size:44px">♨️</div>`+big(`Q = m·Δt = ${st.m}·${st.dt} = ${Q} кал`)
        + btns(['m+','+1 г'],['m-','−1 г'],['dt+','+1°'],['dt-','−1°'],['r','↺'])
        + small('чтобы нагреть 1 г воды на 1°, нужно 1 кал'));
    }
    else if(has('звук')){
      if(st.t==null) st.t=Math.max(nums[0]||3,1);
      const S=340*st.t;
      h=card(`<div style="font-size:40px">📢</div>`+big(`S = v·t = 340·${st.t} = ${S} м`)
        + btns(['t+','+1 с'],['t-','−1 с'],['r','↺'])
        + small('скорость звука в воздухе ≈ 340 м/с'));
    }
    else if(has('измерен','метр','килограмм','единиц')){
      if(st.v==null) st.v=Math.max(nums[0]||3,1);
      h=card(`<div style="font-size:40px">📏</div>`+big(`${st.v} м = ${st.v*100} см`)
        + btns(['v+','+1'],['v-','−1'],['r','↺'])
        + small('1 м = 100 см; 1 кг = 1000 г'));
    }
    else if(has('трен')){
      if(st.f==null) st.f=2; const srf=st.srf||'шершавый';
      h=card(`<div style="font-size:44px">🧊</div>`+big(`тянуть по ${srf}: ${st.f} Н`)
        + btns(['smooth','гладкий лёд'],['rough','шершавый асфальт'])
        + small('трение больше на шершавой поверхности'));
    }
    else {
      h=card(`<div style="font-size:36px">🔭</div>`+big(L.title||'')+`<div class="small" style="color:#cbb89a;max-width:300px">${esc(((L.explain&&L.explain[0])||'')).slice(0,150)}…</div>`);
    }
    el.innerHTML=`<div style="background:rgba(16,31,24,.75);border:1px solid #3d5c49;border-radius:12px;padding:10px;margin-top:10px">${h}</div>`;
  }catch(e){ try{ el.innerHTML=''; }catch(_){} }
}
function phAct(lk,act){
  const st=CHS[lk]||(CHS[lk]={});
  const bump=(k,d,min)=> st[k]=Math.max(min||1, Math.round(((st[k]==null?1:st[k])+d)*10)/10);
  switch(act){
    case 'v+': bump('v',5); break; case 'v-': bump('v',-5); break;
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
