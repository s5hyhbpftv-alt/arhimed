/* АРХИМЕД MVP · agentlive.js — голос Архимеда В ФОНЕ (без окон).
Кнопка «Я Архимед — говори со мной» включает разговор: микрофон+WS+голос в фоне,
внизу — маленький статус-индикатор. Повторное нажатие/клик по полоске — выключение.
*/
'use strict';
const AGENTLIVE = (function(){
  let ws=null, ctx=null, srcNode=null, procNode=null, stream=null;
  let running=false, nextTime=0;
  let ctxWatch=null, lastCtx='';
  let actNodes=[], speakTimer=null, respActive=false, tipSilence=null;
  let muted=false, suppress=false;   // muted: глушим остаток отменяемого ответа; suppress: не озвучивать, пока пользователь не заговорит снова
  let pill=null, pillTxt=null;
  const listeners={};

  function host(){ return (location.hostname||'127.0.0.1'); }
  /* Адрес живого агента: 
     - страница открыта по HTTPS (VPS с доменом, туннель) → тот же origin: wss://хост/agent
     - локальный шлюз на порту 8130 → тот же origin: ws://хост/agent
     - локальная разработка (8123) → прямой агент-сервер: ws://хост:8125/agent */
  function agentUrl(name){
    const proto = location.protocol==='https:' ? 'wss://' : 'ws://';
    const sameOrigin = location.protocol==='https:' || location.port==='8130';
    const base = sameOrigin ? (location.host||location.hostname) : host()+':8125';
    return proto+base+'/agent?name='+encodeURIComponent(name);
  }
  function whoAmI(){ return (typeof DB!=='undefined'&&DB.profile&&DB.profile.name)||'друг'; }
  function screenContext(){
    const head='Ты — Архимед, мудрый учитель из приложения АРХИМЕД. Ученика зовут '+whoAmI()+'. Говори всегда обычными словами и цифрами, без звёздочек и специальных символов. ';
    const inLesson=!!document.querySelector('.sdot');
    const inTask=!!document.querySelector('.q')&&!inLesson;
    if(inLesson&&typeof LV!=='undefined'&&LV&&LV.id&&typeof lessonById==='function'){
      try{
        const L=lessonById(LV.id); if(!L) return head+'На экране урок из Книги знаний.';
        const steps=(L.explain||[]).map((s,i)=>'Шаг '+(i+1)+': '+s);
        return head+'Урок «'+L.title+'» из Книги знаний (источник: '+L.src+'). Полные шаги объяснения: '+steps.join(' | ')+
          '. Обучай по этим шагам по одному. В НАЧАЛЕ объяснения каждого шага обязательно произнеси «Шаг N», где N — номер шага (1, 2, 3…). Приложение само покажет этот шаг на экране. Задай наводящий вопрос, не выдавай ответы на контрольные вопросы — подведи ученика к ним.';
      }catch(e){}
    }
    if(inTask&&typeof CUR!=='undefined'&&CUR&&CUR.task){
      const t=CUR.task;
      return head+'На экране олимпиадная задача «'+t.title+'» ('+t.island+', тема: '+t.theme+'). Условие: '+t.story+
        ' Вопрос: '+t.q+'. Веди ученика по лестнице подсказок: помоги понять условие и дай идею, но ответ не говори — пусть решит сам.';
    }
    return head+'Ученик на карте островов приложения (математика, физика, химия, информатика) и в Книге знаний есть уроки ВсОШ. Предложи выбрать урок или задачу и начни учить.';
  }

  function taskData(){ try{ return (typeof CUR!=='undefined'&&CUR&&CUR.task&&document.querySelector('.q'))?CUR.task:null; }catch(e){ return null; } }
  function lessonData(){ try{ if(typeof LV==='undefined'||!LV||!LV.id||!document.querySelector('.sdot')) return null; return lessonById(LV.id); }catch(e){ return null; } }
  function cleanForSpeech(s){
    try{
      let t=String(s==null?'':s);
      const map={'×':' умножить на ','÷':' разделить на ','−':' минус ','·':', ','⌈':' ','⌉':' ','→':', ','➡':', ','←':', ','⬅':', ','⇒':', ','—':' ','–':' ','…':'...','%':' процентов ','$':'','€':'','£':''};
      for(const k in map){ t=t.split(k).join(map[k]); }
      t=t.replace(/[*#@&_~^`\{}[\]|<>+=/\\]/g,' ');   // служебные символы
      t=t.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{2300}-\u{23FF}\u{2190}-\u{21FF}\u{00A0}-\u{00BF}\u{2000}-\u{206F}]/gu,' '); // эмодзи и спецсимволы
      t=t.replace(/\s{2,}/g,' ').trim();
      return t;
    }catch(e){ return String(s||''); }
  }
  const NO_SYMS=' Отвечай только обычными словами и цифрами. Никогда не используй звёздочки, решётки, подчёркивания и другие специальные символы — их нельзя произносить.';
  function askAgent(ins){ try{ if(ws&&ws.readyState===1){
      let s=cleanForSpeech(ins);
      if(s.indexOf('звёздочк')<0) s+=' Отвечай обычным текстом, без звёздочек и специальных символов.';
      suppress=false; muted=false;              // команда приложения: ждём голосовой ответ
      ws.send(JSON.stringify({type:'ask',text:s})); return true; } }catch(e){} return false; }
  function handleCmd(raw){
    const t=String(raw||'').toLowerCase().replace(/ё/g,'е');
    const T=taskData(), L=lessonData();
    if(/(^|[\s.,!?])(пока|выключись|выключи|закончим|заверши|завершить|достаточно|останови разговор|выключи разговор)([\s.,!?]|$)/.test(t)){
      setPill(true,'Выключаюсь…'); setTimeout(stop,300); return true; }
    if(/(^|[\s.,!?])(стоп|остановись|останови|замолчи|тихо|пауза|хватит|перестань|молчать)([\s.,!?]|$)/.test(t)||/^стоп/.test(t)){
      stopSpeaking(); return true; }
    if(L&&/(расскажи|объясни|пройди|проведи|начни|покажи)\s*(весь\s*)?урок|урок\s+по\s+шагам|по\s+шагам/.test(t)){
      startNarration(typeof LV!=='undefined'?LV.step:0); return true; }
    if(/прочитай|прочти|читай/.test(t)){
      let body='';
      if(/шаг|урок|книг/.test(t)&&L){ body='Шаг '+(LV.step+1)+' из '+L.explain.length+'. '+L.explain[LV.step]; }
      else if(T){ body='Задача «'+T.title+'». '+T.story+' Вопрос: '+T.q; }
      else if(L){ body='Урок «'+L.title+'». '+L.explain[0]; }
      else body='Я Архимед, очень умный. Ты можешь со мной говорить.';
      const ok=askAgent('Прочитай дословно, только обычными словами, ничего не добавляя и не заменяя символы: «'+body+'»');
      setPill(ok,'📖 Читаю…');
      return true; }
    if(/подсказк/.test(t)){
      const n=/2|два|втор/.test(t)?1:(/3|три|трет/.test(t)?2:0);
      const hint = T&&T.hints ? (T.hints[n]||T.hints[0]) : (L&&LV&&LV.phase==='tasks'&&L.tasks&&L.tasks[LV.task]&&L.tasks[LV.task].hints ? (L.tasks[LV.task].hints[n]||L.tasks[LV.task].hints[0]) : '');
      if(hint){
        try{ if(typeof useHint==='function'&&T) useHint(n); }catch(e){}
        const ok=askAgent('Дай ученику подсказку '+(n+1)+' (вот её текст: «'+hint+'»), объясни своими словами, но не выдавай полное решение.');
        setPill(ok,'💡 Подсказка…');
      } else { askAgent('Ученик просит подсказку. Подскажи мягко, не выдавая ответ.'); setPill(true,'💡 Подсказка…'); }
      return true; }
    if(/дальше|следующ|вперед/.test(t)){
      try{
        if(L&&LV){
          if(LV.phase==='explain'&&LV.step<L.explain.length-1) lvStep(1);
          else if(LV.phase==='tasks'&&typeof lvNextTask==='function'&&LV.task<L.tasks.length-1) lvNextTask();
        } else if(T&&typeof afterRow==='function'){ afterRow(T); }
      }catch(e){}
      setPill(true,'Дальше →'); return true; }
    if(/назад/.test(t)){
      try{ if(L&&LV&&LV.phase==='explain') lvStep(-1); }catch(e){}
      setPill(true,'← Назад'); return true; }
    if(/решение|как решить|разбор/.test(t)){
      if(T&&typeof DB!=='undefined'&&DB.tasks&&DB.tasks[T.id]&&DB.tasks[T.id].done){
        const ok=askAgent('Объясни решение задачи «'+T.title+'»: '+T.sol);
        setPill(ok,'📜 Решение…');
      } else if(T){ askAgent('Не рассказывай решение задачи «'+T.title+'» — она ещё не решена. Дай наводящий вопрос и направь ученика.'); setPill(true,'💡 Наводящий вопрос…'); }
      return true; }
    if(/легенд|кто ты|откуда ты|твоя история/.test(t)){
      const ok=askAgent('Ученик спрашивает про легенду. Расскажи коротко и увлекательно: ты Архимед, после падения Сиракуз море превратило тебя в живую мысль — хранителя Внутреннего моря. По морю разбросаны Острова Познания: Сиракузы (математика), Ньютон (физика), Лавуазье (химия) и новый остров Цитадель Информатики (код, алгоритмы, логика). Ты выбираешь Исследователей и учишь их приёмам олимпиад. Три твоих правила: точка опоры, эврика, не трогай мои круги.');
      setPill(ok,'📜 Рассказываю легенду…');
      return true; }
    return false;
  }
  function sendContext(force){
    try{
      const txt=screenContext();
      if(!force&&txt===lastCtx) return;
      lastCtx=txt;
      if(ws&&ws.readyState===1){ ws.send(JSON.stringify({type:'context',text:cleanForSpeech(txt)})); }
    }catch(e){}
  }
  function toast(m){ try{ const el=document.getElementById('toast'); if(el){ el.textContent=m; el.classList.add('show');
      clearTimeout(toast._t); toast._t=setTimeout(()=>el.classList.remove('show'),2600); } }catch(e){} }

  function ensure(){
    if(pill) return;
    const st=document.createElement('style');
    st.textContent=`.al-pill{position:fixed;left:50%;bottom:86px;transform:translateX(-50%);z-index:96;
      display:flex;align-items:center;gap:8px;max-width:min(560px,calc(100vw-24px));
      background:#12241b;border:1px solid #d9a441;border-radius:999px;
      padding:8px 16px;font-size:12.5px;color:#e8e0cc;box-shadow:0 8px 26px rgba(0,0,0,.55);
      cursor:pointer;}
      .al-dot{width:10px;height:10px;border-radius:50%;background:#e86a5a;flex-shrink:0;
        animation:aldot 1s ease-in-out infinite;}
      @keyframes aldot{0%,100%{opacity:1}50%{opacity:.25}}`;
    document.head.appendChild(st);
    pill=document.createElement('div');
    pill.className='al-pill'; pill.id='alPill';
    pill.innerHTML='<span class="al-dot"></span><span id="alPillTxt">🎙 Архимед слушает… говорите</span>';
    pill.style.display='none';
    pill.addEventListener('click',()=>stop());
    document.body.appendChild(pill);
    pillTxt=document.getElementById('alPillTxt');
  }
  function setPill(show,txt){
    ensure();
    pill.style.display=show?'flex':'none';
    if(txt&&pillTxt) pillTxt.textContent=txt;
    fire('state', running);
  }
  function on(n,f){ listeners[n]=f; }
  function fire(n,v){ const f=listeners[n]; if(f){ try{ f(v); }catch(e){} } }

  function open(){ toggle(); }

  async function start(){
    ensure();
    const name=(DB.profile&&DB.profile.name)||'друг';
    setPill(true,'🗣 Проверяю микрофон…');
    const micTimeout=new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),7000));
    try{
      stream = await Promise.race([
        navigator.mediaDevices.getUserMedia({audio:{channelCount:1}}), micTimeout ]);
    }catch(e){ setPill(false); toast('❌ Нет микрофона ('+((e&&e.name)||'отказ')+'). Разрешите микрофон и нажмите снова.'); return; }
    try{
      ctx = new (window.AudioContext||window.webkitAudioContext)({sampleRate:44100});
      if(ctx.state==='suspended') await ctx.resume();
    }catch(e){ ctx=null; }
    if(!ctx){ setPill(false); stopTracks(); toast('❌ Аудио недоступно'); return; }
    srcNode = ctx.createMediaStreamSource(stream);
    procNode = ctx.createScriptProcessor(2048,1,1);
    procNode.onaudioprocess=(e)=>{
      const d=e.inputBuffer.getChannelData(0);
      const pcm=new Int16Array(d.length);
      for(let i=0;i<d.length;i++){ const s=Math.max(-1,Math.min(1,d[i])); pcm[i]=s<0?s*0x8000:s*0x7FFF; }
      if(ws&&ws.readyState===1){ try{ ws.send(JSON.stringify({type:'input_audio_buffer.append',audio:b64(pcm)})); }catch(err){} }
    };
    srcNode.connect(procNode); procNode.connect(ctx.destination);
    setPill(true,'Я здесь — соединяюсь…');
    try{ ws=new WebSocket(agentUrl(name)); }
    catch(e){ setPill(false); stopTracks(); toast('❌ Нет связи со мной. Запустите шлюз (шлюз_сервер.py) или агент_сервер.py'); return; }
    ws.onopen=()=>{
      running=true;
      setPill(true,'🗣 Я Архимед — слушаю, говори (стоп — клик по полоске)');
      sendContext(true);
      ctxWatch=setInterval(()=>sendContext(false),1500);
    };
    ws.onmessage=(ev)=>{
      try{
        const m=JSON.parse(ev.data);
        if(m.type==='note'&&m.text){
          if(m.text.indexOf('Вы:')===0){
            const u=m.text.slice(3).trim();
            const handled=handleCmd(u);
            // обычная речь (не команда) — снова разрешаем голос Яндекса
            if(!handled){ suppress=false; muted=false; }
          }
          else navStepFrom(m.text);
          setPill(true, m.text.length>90? m.text.slice(0,90)+'…' : m.text);
        }
        if(m.type==='input_audio_buffer.speech_started'){
          // barge-in: пользователь начал говорить поверх ответа — глушим остаток и отменяем ответ у Яндекса
          suppress=false;                       // новая реплика — команды «молчать» больше не действуют
          pauseAudio(); AUTO.sent=false;
          if(respActive&&ws&&ws.readyState===1){
            respActive=false; muted=true;
            try{ ws.send(JSON.stringify({type:'response.cancel'})); }catch(e){}
          } else { muted=true; }
        }
        else if(m.type==='response.created'){ respActive=true; if(!suppress) muted=false; }
        else if(m.type==='response.output_audio_transcript.done'){ navStepFrom(m.transcript||m.item&&m.item.text||''); }
        else if(m.type==='response.output_text.done'){ navStepFrom(m.transcript||(m.item&&(m.item.text||''))||''); }
        else if(m.type==='response.output_audio.delta'){
          if(muted||suppress){ respActive=false; return; }
          respActive=true; if(m.delta) playPcm(m.delta);
        }
        else if(m.type==='response.output_audio.done'||m.type==='response.done'||m.type==='response.output_text.done'){
          respActive=false; muted=false;
          if(m.type==='response.done'&&AUTO.on&&AUTO.sent) advanceAuto();
        }
        else if(m.type==='error'){ toast('⚠ '+(m.text||'ошибка')); }
      }catch(e){}
    };
    ws.onclose=()=>{
      if(!running) return;
      running=false; respActive=false;
      setPill(false);
      if(!ws.userStopped){
        releaseAudio();
        toast('Связь с агентом закрылась. Повторяю подключение…');
        setTimeout(()=>{ ws=null; start(); },1200);
      }
    };
    ws.onerror=()=>{ if(!running){ setPill(false); toast('⚠ Потерял связь — проверьте агент_сервер.py'); } };
    running=true;
  }
  function b64(buf){ let s=''; const b=new Uint8Array(buf.buffer);
    for(let i=0;i<b.length;i+=0x8000) s+=String.fromCharCode.apply(null,b.subarray(i,i+0x8000));
    return btoa(s); }
  function playPcm(b64s){
    try{
      const raw=atob(b64s); const n=raw.length>>1;
      const pcm=new Int16Array(n);
      for(let i=0;i<n;i++) pcm[i]=(raw.charCodeAt(i*2))|(raw.charCodeAt(i*2+1)<<8);
      const f=new Float32Array(n);
      for(let i=0;i<n;i++) f[i]=pcm[i]/32768;
      const buf=ctx.createBuffer(1,n,ctx.sampleRate||44100);
      buf.copyToChannel(f,0);
      const sn=ctx.createBufferSource(); sn.buffer=buf;
      if(!nextTime||nextTime<ctx.currentTime) nextTime=ctx.currentTime+0.02;
      sn.connect(ctx.destination); sn.start(nextTime);
      actNodes.push(sn);
      sn.onended=()=>{ const i=actNodes.indexOf(sn); if(i>=0) actNodes.splice(i,1); };
      nextTime+=buf.duration;
    }catch(e){}
  }
  function navStepFrom(text){
    try{
      const mm=String(text||'').match(/шаг\s*(\d+)/i);
      if(!mm) return false;
      if(!document.querySelector('.sdot')) return false;      // урок не открыт
      if(typeof LV==='undefined'||!LV||!LV.id||!LV.phase||LV.phase!=='explain') return false;
      const L=lessonById(LV.id); if(!L) return false;
      const want=parseInt(mm[1],10)-1;
      if(want<0||want>=L.explain.length) return false;
      if(want!==LV.step&&typeof lvStep==='function'){ lvStep(want-LV.step); return true; }
    }catch(e){}
    return false;
  }
  const AUTO={on:false, step:0, sent:false};
  function startNarration(from){
    try{
      if(!running||!ws||ws.readyState!==1) return false;
      if(!document.querySelector('.sdot')||typeof LV==='undefined'||!LV||!LV.id) return false;
      const L=lessonById(LV.id); if(!L||LV.phase!=='explain') return false;
      AUTO.on=true; AUTO.sent=false;
      narrateStep((from!=null&&from>=0)?from:Math.max(0,LV.step||0));
      return true;
    }catch(e){ return false; }
  }
  function narrateStep(i){
    if(!AUTO.on) return;
    try{
      const L=lessonById(LV.id); if(!L||LV.phase!=='explain'){ AUTO.on=false; return; }
      const want=Math.max(0,Math.min(i,L.explain.length-1));
      if(want!==LV.step&&typeof lvStep==='function') lvStep(want-LV.step);
      AUTO.step=want; AUTO.sent=true;
      setPill(true,'Шаг '+(want+1)+' — объясняю…');
      const txt=L.explain[want];
      const ok=askAgent('Объясни шаг '+(want+1)+' из '+L.explain.length+' урока «'+L.title+'» кратко и по-доброму. Вот содержание шага: «'+txt+'». После объяснения остановись и спроси, понятно ли.');
      if(!ok){ AUTO.on=false; }
    }catch(e){ AUTO.on=false; }
  }
  function advanceAuto(){
    if(!AUTO.on||!AUTO.sent) return;
    try{
      if(!document.querySelector('.sdot')||typeof LV==='undefined'||!LV){ AUTO.on=false; return; }
      const L=lessonById(LV.id); if(!L||LV.phase!=='explain'){ AUTO.on=false; return; }
      const nxt=AUTO.step+1;
      if(nxt>=L.explain.length){
        AUTO.on=false; AUTO.sent=false;
        setPill(true,'Урок разобран по шагам ✓');
        askAgent('Мы закончили разбор урока «'+L.title+'». Поздравь ученика и предложи проверить себя или задать вопрос.');
      } else {
        setTimeout(()=>{ if(AUTO.on&&AUTO.sent) narrateStep(nxt); },1300);
      }
    }catch(e){ AUTO.on=false; }
  }
  function stopAuto(){ AUTO.on=false; AUTO.sent=false; }
  function pauseAudio(){
    try{ actNodes.forEach(n=>{ try{ n.stop(); }catch(e){} }); actNodes=[]; nextTime=0; }catch(e){}
  }
  function stopSpeaking(){ stopAuto();
    suppress=true;          // не озвучивать ответы, пока пользователь не заговорит снова
    try{
      actNodes.forEach(n=>{ try{ n.stop(); }catch(e){} });
      actNodes=[]; nextTime=0;
      // отменяем текущий ответ, ТОЛЬКО если он действительно идёт (иначе Яндекс может закрыть сессию)
      if(respActive&&ws&&ws.readyState===1){
        respActive=false; muted=true;
        try{ ws.send(JSON.stringify({type:'response.cancel'})); }catch(e){}
      }
      setPill(true,'Молчу — слушаю дальше. Скажи, что делаем.');
      if(tipSilence){ clearTimeout(tipSilence); }
      tipSilence=setTimeout(()=>{ if(running) setPill(true,'🗣 Слушаю… говори'); },3500);
    }catch(e){}
    return true;
  }
  function releaseAudio(){
    actNodes.forEach(n=>{ try{ n.stop(); }catch(e){} }); actNodes=[];
    stopTracks();
    if(procNode){ try{ procNode.disconnect(); }catch(e){} procNode=null; }
    if(srcNode){ try{ srcNode.disconnect(); }catch(e){} srcNode=null; }
    if(ctx){ try{ ctx.close(); }catch(e){} ctx=null; }
    nextTime=0;
  }
  function stopTracks(){ if(stream){ stream.getTracks().forEach(t=>t.stop()); stream=null; } }
  function stop(){
    stopAuto();
    running=false; respActive=false; muted=false; suppress=false;
    if(ws) ws.userStopped=true;
    actNodes.forEach(n=>{ try{ n.stop(); }catch(e){} }); actNodes=[];
    if(ctxWatch){ clearInterval(ctxWatch); ctxWatch=null; }
    if(ws){ try{ ws.close(); }catch(e){} ws=null; }
    releaseAudio();
    setPill(false);
  }
  function toggle(){ running?stop():start(); }
  try{ if(typeof ASSIST!=='undefined'&&ASSIST.syncAlBtn){ on('state', v=>ASSIST.syncAlBtn(v)); } }catch(e){}
  return { open, toggle, start, stop, on, state:()=>running, context:()=>screenContext(), cmd:(t)=>handleCmd(t), tell:(ins)=>(running&&ws&&ws.readyState===1)?askAgent(ins):false, clean:(t)=>cleanForSpeech(t), stepFrom:(t)=>navStepFrom(t), narrate:()=>{ try{ return startNarration(typeof LV!=='undefined'?LV.step:0); }catch(e){ return false; } } };
})();
