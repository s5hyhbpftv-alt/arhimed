/* АРХИМЕД MVP · assistant.js — всплывающий аватар-помощник «Архимед» (правый нижний угол) */
'use strict';
(function(){
  let open=false, caption='', talking=false, lastAt=0;

  /* ---------- нарисованный аватар (SVG) ---------- */
  function leaves(cx,cy,r,a0,a1){
    // оливковый венок по дуге над головой
    let s='';
    const n=11;
    for(let i=0;i<=n;i++){
      const a=a0+(a1-a0)*i/n;
      const x=cx+r*Math.cos(a), y=cy+r*Math.sin(a);
      const ang=a*180/Math.PI+90;
      s+=`<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${ang.toFixed(0)})">
        <ellipse rx="6.2" ry="2.6" fill="${i%3===0?'#5F7A3A':'#7fa356'}" stroke="#46602e" stroke-width=".5"/>
        ${i%2===0?`<circle cy="-3.4" r="1.15" fill="#d9a441"/>`:''}</g>`;
    }
    return s;
  }
  function avatarSVG(){
    return `<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="aglow" cx=".5" cy=".35" r=".75">
        <stop offset="0" stop-color="#fff6e0" stop-opacity=".55"/><stop offset="1" stop-color="#fff6e0" stop-opacity="0"/></radialGradient></defs>
      <circle cx="48" cy="52" r="46" fill="url(#aglow)"/>
      <!-- хитон (плечи) -->
      <path d="M6 96 C8 74 20 66 48 66 C76 66 88 74 90 96 Z" fill="#2c3e6b" stroke="#1d2a4d" stroke-width="1.5"/>
      <path d="M26 96 C30 74 38 68 48 68 C58 68 66 74 70 96 Z" fill="#38527f"/>
      <path d="M40 74 L56 74" stroke="#d9a441" stroke-width="1.4"/>
      <!-- шея -->
      <rect x="42" y="60" width="12" height="9" rx="3" fill="#e6b98c"/>
      <!-- голова -->
      <circle cx="48" cy="40" r="24" fill="#eec39b" stroke="#c08a5e" stroke-width="1.2"/>
      <!-- уши -->
      <circle cx="23.6" cy="43" r="4.4" fill="#eec39b" stroke="#c08a5e" stroke-width="1"/>
      <circle cx="72.4" cy="43" r="4.4" fill="#eec39b" stroke="#c08a5e" stroke-width="1"/>
      <!-- брови -->
      <path d="M33 32 Q38 28.6 43.4 30" stroke="#6b4a33" stroke-width="1.7" fill="none" stroke-linecap="round"/>
      <path d="M52.6 30 Q58 28.6 63 32" stroke="#6b4a33" stroke-width="1.7" fill="none" stroke-linecap="round"/>
      <!-- глаза -->
      <circle cx="38.2" cy="37.5" r="4.6" fill="#fffdf5"/><circle cx="57.8" cy="37.5" r="4.6" fill="#fffdf5"/>
      <circle cx="39.2" cy="38" r="2.2" fill="#33291e"/><circle cx="58.8" cy="38" r="2.2" fill="#33291e"/>
      <circle cx="40" cy="36.8" r=".7" fill="#fff"/><circle cx="59.6" cy="36.8" r=".7" fill="#fff"/>
      <!-- нос -->
      <path d="M48 39 Q46.6 43.5 48.4 45.6" stroke="#d09a6a" stroke-width="1.7" fill="none" stroke-linecap="round"/>
      <!-- борода -->
      <path d="M28 47 C27 62 34 74 48 74.5 C62 74 69 62 68 47 C62 52 34 52 28 47 Z" fill="#f6f1e6" stroke="#ddd2bc" stroke-width="1"/>
      <path d="M30.5 49 C36 56 60 56 65.5 49 C60 60.5 36 60.5 30.5 49 Z" fill="#f1ead9" opacity=".85"/>
      <!-- усы -->
      <path d="M37 49.5 Q48 45.5 59 49.5" stroke="#e4dcc8" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <!-- рот (анимируется при говорении) -->
      <ellipse id="amouth" cx="48" cy="57.5" rx="4.6" ry="2.4" fill="#7c4a33"/>
      <!-- венок -->
      ${leaves(48,15,21,Math.PI*0.94,Math.PI*2.06)}
    </svg>`;
  }

  /* ---------- DOM ---------- */
  function el(html){ const d=document.createElement('div'); d.innerHTML=html.trim(); return d.firstChild; }

  function build(){
    const wrap=el(`<div class="asst" id="asst">
      <div class="abubble" id="asstBub"></div>
      <div class="avatar" id="asstAvatar" title="Архимед — голосовой помощник">${avatarSVG()}</div>
    </div>`);
    document.body.appendChild(wrap);
    // панель
    const panel=el(`<div class="apanel" id="asstPanel">
      <div class="ap-head"><b>◈ Архимед</b><span class="ap-sub">очень умный — говори со мной</span>
        <button class="ap-x" onclick="ASSIST.close()">✕</button></div>
      <div class="ap-cap" id="apCap">Я Архимед, очень умный. Ты можешь со мной говорить: я отвечаю голосом и помню твоё имя.</div>
      <button class="btn ok2" id="alBtn" style="width:100%;margin:8px 0;font-size:15px" onclick="AGENTLIVE.toggle()">🗣 Я Архимед — говори со мной</button>
      <div class="ap-hint" id="asstWhere" style="color:var(--glass)">Сейчас на экране: —</div>
      <div class="ap-chips" id="asstChips"></div>
      <div class="ap-hint">💡 Кнопки меню подстраиваются под экран; голосовые — работают, когда разговор включён.</div>
      <div style="display:flex;gap:8px;align-items:center;margin-top:8px">
        <span class="ap-hint" id="asstVer" style="margin:0">сборка v143</span>
        <button class="asmall" style="width:auto;padding:0 10px" onclick="ASSIST.hardReload()" title="Сбросить кэш и обновить">🔄 Обновить</button>
      </div>
    </div>`)
    document.body.appendChild(panel);
    wrap.querySelector('#asstAvatar').addEventListener('click', toggle);
    return wrap;
  }

  /* ---------- состояние ---------- */
  let wrapEl=null, bubEl=null, panEl=null;
  function ensure(){ if(!wrapEl){ wrapEl=build(); bubEl=document.getElementById('asstBub'); panEl=document.getElementById('asstPanel'); }
    watchMenu(); tipLoop(); }
  function sayBub(t,holdMs){ caption=t||''; if(!bubEl) return;
    if(t){ bubEl.innerHTML=esc(t); bubEl.classList.add('show'); lastAt=Date.now(); }
    else if(holdMs){ setTimeout(()=>{ if(Date.now()-lastAt>holdMs-200) bubEl.classList.remove('show'); }, holdMs); }
    else bubEl.classList.remove('show');
  }
  function toggle(){ open=!open; panEl.classList.toggle('open',open);
    if(open){ ctxMenu(); watchMenu(); }
    if(open&&!caption){ sayBub('Привет! Я Архимед. Нажми 🎙 и скажи «объясни задачу» — или просто ткни «🗣 Прочитай контекст».',4200); }
  }
  function setTalking(v){ talking=v;
    wrapEl.classList.toggle('talking',v);
    wrapEl.classList.toggle('idle',!v);
    if(!v) sayBub(null, 2600);
  }

  /* ---------- контекст ---------- */
  function ctx(){
    const inLesson=!!document.querySelector('.sdot');
    const inTask=!!document.querySelector('.q') && !inLesson;
    if(inTask && typeof CUR!=='undefined'&&CUR&&CUR.task) return {kind:'task', text:()=>VOICE.taskText(CUR.task)};
    if(inLesson && typeof LV!=='undefined'&&LV&&LV.id) return {kind:'lesson', text:()=>VOICE.lessonStepText()};
    return null; }
  function act(what){
    const c=ctx();
    if(what==='read'){ if(c){ VOICE.say(c.text()); } else VOICE.say(VOICE.greeting()); }
    else if(what==='hint'){
      if(typeof LV!=='undefined'&&LV&&LV.phase==='tasks'){ lvHint(0); const L=lessonById(LV.id); if(L&&L.tasks[LV.task]) VOICE.say(VOICE.hintText(L.tasks[LV.task],0)); }
      else if(c&&c.kind==='task'){ useHint(0); VOICE.say(VOICE.hintText(CUR.task,0)); }
      else VOICE.say('Сейчас нет активной задачи. Открой любую задачу — и я подскажу.');
    }
    else if(what==='next'){
      if(typeof LV!=='undefined'&&LV&&LV.id&&LV.phase==='explain'){ lvStep(1); setTimeout(()=>VOICE.say(VOICE.lessonStepText()),120); }
      else if(typeof LV!=='undefined'&&LV&&LV.phase==='tasks'&&LV.task<lessonById(LV.id).tasks.length-1){ lvNextTask(); }
      else if(c&&c.kind==='task'&&window.afterRow){ afterRow(CUR.task); }
      else VOICE.say('Дальше некуда — задачи пока нет. Выбери задачу на острове.');
    }
    else if(what==='sol'){
      if(c&&c.kind==='task'){ if(!(DB.tasks[CUR.task.id]&&DB.tasks[CUR.task.id].done)) VOICE.say('Сначала реши задачу — потом я объясню решение вслух.'); else VOICE.say(VOICE.solText(CUR.task)); }
      else VOICE.say('Решение показывается после верного ответа на задачу.');
    }
    else VOICE.say(VOICE.greeting());
  }
  function mic(){ VOICE.toggleMic(); }
  const SK_NAMES={alena:'Алёна',filipp:'Филипп',jane:'Джейн',omazh:'Омаж'};
  function test(){
    const muted=DB.profile&&DB.profile.voice&&DB.profile.voice.on===false;
    if(muted){ toast('🔇 Звук выключен — включите кнопкой 🔈'); return; }
    VOICE.testKey();
    sayBub('Проверяю голос ☁ SpeechKit…', 6000);
    setTimeout(syncSound, 3000);   // подпись обновится по итогу проверки
  }
  function skVoice(v){ VOICE.setSkVoice(v); syncSound(); toast('☁ Голос SpeechKit: '+SK_NAMES[v]); VOICE.testKey(); }
  function syncAlBtn(v){ const b=document.getElementById('alBtn');
    if(b) b.textContent = v? '⏹ Замолчать Архимеда' : '🗣 Я Архимед — говори со мной'; }
  function hardReload(){
    const jobs=[];
    if('caches' in window){ jobs.push(caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k))))); }
    if('serviceWorker' in navigator){ jobs.push(navigator.serviceWorker.getRegistrations().then(rs=>Promise.all(rs.map(r=>r.unregister())))); }
    Promise.all(jobs).then(()=>{ location.href=location.href.split('?')[0]+'?fresh='+Date.now(); });
  }

  /* ---------- контекстное меню ---------- */
  function actTab(){ const a=document.querySelector('#navBar button.active'); return a?a.dataset.tab:''; }
  function chip(t,f){ const b=document.createElement('button'); b.className='achip'; b.textContent=t;
    b.onclick=()=>{ try{ f(); }catch(e){} }; return b; }
  function vchip(t,text){ return chip(t,()=>{
      const ok=(typeof AGENTLIVE!=='undefined')&&AGENTLIVE.tell&&AGENTLIVE.tell(text);
      if(!ok) toast('Сначала включи разговор — «🗣 Я Архимед, говори со мной»'); }); }
  function ctxMenu(){
    const where=document.getElementById('asstWhere'); const box=document.getElementById('asstChips');
    if(!where||!box) return;
    const lesson=!!document.querySelector('.sdot');
    const task=!!document.querySelector('.q')&&!lesson;
    const tab=actTab(); const out=[];
    let label='—';
    if(lesson&&typeof LV!=='undefined'&&LV){
      try{ const L=lessonById(LV.id); label=(L?'Урок: '+(L.title):'Урок'); }catch(e){ label='Урок'; }
      if(LV.phase==='tasks'){
        out.push(chip('💡 Подсказка',()=>{ try{ if(typeof lvHint==='function')lvHint(0); }catch(e){} }));
        out.push(chip('➡ Дальше',()=>{ try{ if(typeof lvNextTask==='function'&&LV.task<(lessonById(LV.id).tasks||[]).length-1) lvNextTask(); }catch(e){} }));
      } else {
        out.push(chip('▶ Расскажи урок по шагам',()=>{
          try{
            const on=typeof AGENTLIVE!=='undefined'&&AGENTLIVE.state&&AGENTLIVE.state();
            if(!on){ toast('Сначала включи разговор — «🗣 Я Архимед, говори со мной»'); return; }
            AGENTLIVE.narrate();
          }catch(e){}
        }));
        out.push(vchip('🔊 Читай шаг','Прочитай дословно текущий шаг урока: «'+(lessonById(LV.id).explain[LV.step]||'')+'»'));
        out.push(chip('➡ Дальше',()=>{ try{ lvStep(1); }catch(e){} }));
        out.push(chip('⬅ Назад',()=>{ try{ lvStep(-1); }catch(e){} }));
        out.push(chip('❓ Проверь меня',()=>{ try{ lvToCheck(); }catch(e){} }));
      }
      out.push(chip('📖 К урокам',()=>go('book')));
    } else if(task&&typeof CUR!=='undefined'&&CUR){
      const t=CUR.task; label='Задача: '+t.title;
      const done=!!(DB.tasks&&DB.tasks[t.id]&&DB.tasks[t.id].done);
      out.push(vchip('🔊 Читай условие','Прочитай дословно задачу «'+t.title+'»: '+t.story+' Вопрос: '+t.q));
      out.push(vchip('🗣 Помоги идеей','Дай наводящую идею по задаче «'+t.title+'», не выдавая ответ'));
      out.push(chip('💡 Подсказка',()=>{ try{ if(typeof useHint==='function')useHint(0); }catch(e){} }));
      if(done) out.push(vchip('📜 Объясни решение','Объясни решение задачи «'+t.title+'»: '+t.sol));
      else out.push(vchip('🔍 Проверь меня','Задай ученику наводящий вопрос по задаче «'+t.title+'», чтобы он понял идею'));
    } else if(tab==='book'){ label='Книга знаний';
      out.push(chip('📖 К урокам',()=>go('book')));
      out.push(vchip('🗣 Как готовиться к ВсОШ?','Расскажи ученику, как готовиться к ВсОШ по математике в 6–7 классах, коротко.'));
    } else if(tab==='tour'){ label='Олимпиадный тур';
      out.push(chip('🏁 Начать тур',()=>{ try{ startTour(); }catch(e){} }));
      out.push(vchip('🗣 Правила тура','Объясни правила олимпиадного тура: 8 задач, таймер, без подсказок.'));
    } else if(tab==='parent'){ label='Кабинет родителя';
      out.push(vchip('📊 Прогноз ребёнка','Расскажи родителю прогноз готовности к ВсОШ по данным прогресса, кратко.'));
      out.push(vchip('💡 Что подтянуть','Посоветуй, какие темы стоит подтянуть ребёнку (по его прогрессу).'));
    } else if(tab==='library'){ label='Банк задач';
      out.push(vchip('🗣 Посоветуй задачу','Посоветуй ученику хорошую задачу для разминки.'));
    } else if(document.querySelector('.legend-hero')){ label='Легенда об Архимеде';
      out.push(chip('➡ Дальше',()=>{ try{ lgStep(1); }catch(e){} }));
      out.push(chip('⬅ Назад',()=>{ try{ lgStep(-1); }catch(e){} }));
      out.push(vchip('🗣 Расскажи легенду','Расскажи коротко легенду об Архимеде: Внутреннее море, острова Познания и почему ты учишь ребят.'));
      out.push(chip('📖 К урокам',()=>go('book')));
    } else { label='Путь / карта островов';
      const nxt=window.ARH_TASKS.find(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done);
      if(nxt) out.push(chip('🎯 Продолжить: '+nxt.title,()=>go('task-'+nxt.id)));
      out.push(chip('📖 Книга знаний',()=>go('book')));
      out.push(vchip('🗣 Что мне делать?','Ученик на карте островов. Посоветуй, что делать дальше, чтобы готовиться к олимпиаде.'));
    }
    where.textContent='Сейчас на экране: '+label;
    box.innerHTML=''; out.forEach(b=>box.appendChild(b));
  }

  /* ---------- всплывающие подсказки по контексту ---------- */
  const TIPS={
    path:['Нажми «🎯 Продолжить» — решим следующую задачу','Загляни в «📖 Книга знаний» — там уроки по задачам ВсОШ','Новый остров — 💻 Информатика: код, алгоритмы и логика','Открой «📜 Легенду об Архимеде» — узнай, кто я и откуда острова','Спроси меня: «Что такое инвариант?» — объясню','Можешь поговорить со мной голосом: «🗣 Я Архимед — говори со мной»'],
    task:['Застрял? Скажи «Подсказка» или нажми её в моём меню','Сначала перескажи условие своими словами','Ищи, что не меняется: чётность, инвариант, остаток','Ответ найди сам — я подведу к идее, но не решу за тебя'],
    taskDone:['Отлично! Нажми «Дальше» — идём дальше','Хочешь, объясню решение ещё раз? Нажми в меню «📜 Объясни решение»'],
    lesson:['Жми «➡ Дальше», чтобы читать шаги по порядку','Понял шаг? Жми «❓ Проверь меня»','Попроси меня голосом: «Прочитай шаг» — объясню'],
    lessonT:['Реши сам — я подскажу, если попросишь','Правильный ответ даст ⭐ и «Решение Архимеда»'],
    book:['Здесь уроки по типам задач ВсОШ: сначала объяснение, потом задачи','Открой урок — например, «Числа-перевёртыши»','Есть и информатика: «Двоичная система», «Логика: И, ИЛИ, НЕ»'],
    tour:['Тур как на олимпиаде: 8 задач на время','Не застревай — пропускай сложное и возвращайся'],
    parent:['Смотрите прогресс и слабые темы ребёнка','Можно поставить лимит времени на день'],
    library:['Выбирай задачи по темам — от простых к сложным'],
    legend:['Листай главы легенды — их семь, как шагов к титулу Стратега','Полная легенда — в файле ЛЕГЕНДА_АРХИМЕДА.md'] };
  function tipKind(){
    const lesson=!!document.querySelector('.sdot');
    const task=!!document.querySelector('.q')&&!lesson;
    const tab=actTab();
    if(lesson){ try{ if(typeof LV!=='undefined'&&LV&&LV.phase==='tasks') return 'lessonT'; }catch(e){} return 'lesson'; }
    if(task&&typeof CUR!=='undefined'&&CUR){ const t=CUR.task; return (DB.tasks&&DB.tasks[t.id]&&DB.tasks[t.id].done)?'taskDone':'task'; }
    if(document.querySelector('.legend-hero')) return 'legend';
    if(tab) return tab;
    return 'path';
  }
  let tipTimer=null, tipIdx=0, tipCtxKey='';
  function tipLoop(){
    if(tipTimer) return;
    tipTimer=setInterval(()=>{ try{ tickTip(false); }catch(e){} },8000);
    setTimeout(()=>{ try{ tickTip(true); }catch(e){} },3500);
  }
  function tickTip(forceNew){
    if(typeof AGENTLIVE!=='undefined'&&AGENTLIVE.state&&AGENTLIVE.state()) return; // не мешать разговору
    const k=tipKind();
    if(k!==tipCtxKey){ tipCtxKey=k; tipIdx=0; }
    const pool=TIPS[k]||TIPS.path;
    if(!pool.length) return;
    const t=pool[tipIdx%pool.length]; tipIdx++;
    bubEl.innerHTML=esc(t); bubEl.classList.add('show');
    clearTimeout(tipTimer._h);
    tipTimer._h=setTimeout(()=>{ bubEl.classList.remove('show'); },4300);
  }
  let menuTimer=null;
  function watchMenu(){
    if(menuTimer) return;
    menuTimer=setInterval(()=>{ if(panEl&&panEl.classList.contains('open')) ctxMenu(); },900);
    try{
      const obs=new MutationObserver(()=>{ if(panEl&&panEl.classList.contains('open')) setTimeout(ctxMenu,350); });
      const sc=document.getElementById('screen'); if(sc) obs.observe(sc,{childList:true,subtree:false});
    }catch(e){}
  }
  function sound(){ VOICE.toggle(); syncSound(); }
  function syncSound(){ VOICE.refreshVoices(); const el=document.getElementById('asstSound'); if(!el) return;
    const on=!(DB.profile&&DB.profile.voice&&DB.profile.voice.on===false);
    el.textContent=on?'🔈':'🔇'; el.classList.toggle('off',!on);
    const v=document.getElementById('asstVoice');
    const st=VOICE.skState(); const vn=SK_NAMES[st.voice]||'Алёна';
    if(v) v.textContent = !on ? '☁ SpeechKit «'+vn+'» · звук выключен'
      : st.status==='nok' ? '☁ SpeechKit «'+vn+'» не настроен — запасной системный голос'
      : 'голос: ☁ SpeechKit «'+vn+'»'+(st.status==='ok'?'':' (проверка…)');
    const sv=document.getElementById('skVoice');
    if(sv) sv.value=(DB.profile&&DB.profile.voice&&DB.profile.voice.skVoice)||'alena'; }

  /* ---------- события VOICE ---------- */
  VOICE.on('onSpeak', v=>setTalking(v));
  VOICE.on('onText', t=>{ if(t) sayBub(t); });
  VOICE.on('onListen', v=>{ sayBub(v?'🎙 Слушаю… скажи команду':'', v?0:1800); });

  /* глобальный доступ */
  window.ASSIST={ toggle, close:()=>{open=false; if(panEl)panEl.classList.remove('open');}, act, mic, sound, test, skVoice, syncSound, syncAlBtn, hardReload,
    state:()=>({open,talking,caption}) };

  try{ AGENTLIVE.on('state', v=>{ if(window.ASSIST) window.ASSIST.syncAlBtn(v); }); }catch(e){}
  document.addEventListener('DOMContentLoaded', ()=>{ ensure(); syncSound(); });
  // если DOM уже готов (скрипты в конце body) — собрать сразу
  if(document.readyState!=='loading'){ ensure(); syncSound(); }
})();
