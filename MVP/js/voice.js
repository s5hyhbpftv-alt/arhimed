/* АРХИМЕД MVP · voice.js — голос помощника: SpeechKit (основной) + тихий системный запасной */
'use strict';
const VOICE = (function(){
  let synth = null, voice = null, speaking = false, utt = null;
  let rec = null, listening = false, lastText = '';
  let skStatus = '';              // '' неизвестно | 'ok' | 'nok'
  let nokToastShown = false;
  const listeners = { onSpeak:null, onListen:null };
  function fire(name,v){ const f=listeners[name]; if(f){ try{ f(v); }catch(e){} } }

  function prefs(){ const p=DB.profile; return p&&p.voice? p.voice : {on:true, rate:1}; }
  function setPrefs(o){ if(DB.profile){ DB.profile.voice=Object.assign(prefs(),o); save(); } }
  function skVoiceName(){ return (prefs().skVoice)||'alena'; }

  function init(){
    try{ synth = window.speechSynthesis||null; }catch(e){ synth=null; }
    if(synth){
      const pick=()=>{ const vs=synth.getVoices();
        voice = vs.find(v=>/ru/i.test(v.lang)) || null; };
      pick(); synth.onvoiceschanged = pick;
    }
  }
  function showFab(){ /* UI строит assistant.js */ }
  function refreshVoices(){
    try{ synth = synth || window.speechSynthesis || null; }catch(e){ synth=null; }
    if(synth){ try{ const vs=synth.getVoices(); if(vs.length) voice=vs.find(v=>/ru/i.test(v.lang))||null; }catch(e){} }
  }
  function voiceName(){ refreshVoices(); if(!synth) return 'недоступен'; return voice? voice.name+' · '+voice.lang : 'системный (русский)'; }
  function canMic(){
    try{ return !!(window.SpeechRecognition||window.webkitSpeechRecognition); }catch(e){ return false; }
  }

  /* ---------- SpeechKit (единственный источник) ---------- */
  function fallbackHost(){ return (typeof location!=='undefined'&&location.hostname)||'127.0.0.1'; }
  function skUrls(text){
    const enc=encodeURIComponent(text), v=skVoiceName();
    return [ '/sk?text='+enc+'&voice='+v, 'http://'+fallbackHost()+':8124/sk?text='+enc+'&voice='+v,
             'http://127.0.0.1:8124/sk?text='+enc+'&voice='+v ];
  }
  function retryOnClick(blobUrl){
    try{
      const once=()=>{ document.removeEventListener('pointerdown', once);
        const a=new Audio(blobUrl);
        a.onended=()=>{ URL.revokeObjectURL(blobUrl); };
        a.play().catch(()=>URL.revokeObjectURL(blobUrl)); };
      document.addEventListener('pointerdown', once);
      setTimeout(()=>document.removeEventListener('pointerdown', once), 8000);
    }catch(e){}
  }
  async function playSk(text, announce){
    for(const u of skUrls(text)){
      try{
        const r=await fetch(u);
        if(!r.ok){
          let code='http-'+r.status;
          try{ const j=await r.json(); code=j&&j.error?j.error:code; lastTextMsg=(j&&j.hint)||code; }catch(e){}
          if(r.status===503||r.status===502) return {ok:false, code};
          continue;
        }
        const b=await r.blob();
        const blobUrl=URL.createObjectURL(b);
        const a=new Audio(blobUrl);
        const done=()=>{ URL.revokeObjectURL(blobUrl); speaking=false; fire('onSpeak',false); };
        a.onended=done; a.onerror=()=>{ done(); };
        lastText=String(text);
        speaking=true; fire('onSpeak',true); fire('onText',lastText);
        try{ await a.play(); return {ok:true, code:'ok'}; }
        catch(e){ done();
          if(announce){ toast('🔊 Браузер ждёт разрешения: кликни в любом месте — и я повторю'); retryOnClick(blobUrl); }
          return {ok:false, code:'autoplay'}; }
      }catch(e){ /* сеть недоступна — пробуем следующий адрес */ }
    }
    return {ok:false, code:'net'};
  }
  /* ---------- системный запасной (только страховка, не «источник») ---------- */
  function sysSpeak(text){
    refreshVoices();
    if(!synth){ return; }
    try{
      utt=new SpeechSynthesisUtterance(String(text));
      utt.lang='ru-RU';
      if(voice) utt.voice=voice;
      utt.rate=prefs().rate||1; utt.pitch=1;
      lastText=String(text);
      speaking=true; fire('onSpeak',true); fire('onText',lastText);
      utt.onend=()=>{ speaking=false; fire('onSpeak',false); };
      utt.onerror=()=>{ speaking=false; fire('onSpeak',false); };
      synth.speak(utt);
    }catch(e){ speaking=false; fire('onSpeak',false); }
  }
  /* ---------- главный say ---------- */
  async function skSpeakWrap(text, announce){
    const res=await playSk(text, announce);
    if(res.ok){ skStatus='ok'; return; }
    if(res.code==='no-key'||res.code==='http-401'||res.code==='http-403'||res.code==='http-502'||res.code==='http-503'){
      skStatus='nok';
      if(!nokToastShown){ nokToastShown=true;
        toast('☁ SpeechKit не настроен: вставьте API-ключ в файл «ключ_яндекса.txt» у сервера (см. README). Пока — системный голос.'); }
    } else if(res.code==='http-429'||res.code==='http-400'||res.code==='http-403'){
      skStatus='nok';
      if(!nokToastShown){ nokToastShown=true; toast('☁ SpeechKit: '+String(res.code)+'. Проверьте ключ и биллинг. Пока — системный голос.'); }
    } else {
      if(announce) toast('☁ SpeechKit недоступен — использую системный голос (запустите tts_server.py).');
    }
    sysSpeak(lastTextMsg&&skStatus==='nok'? lastTextMsg : lastText);
    lastTextMsg='';
  }
  let lastTextMsg='';
  function canFallback(){ try{ return location.protocol.startsWith('http'); }catch(e){ return false; } }
  function say(text, opts){
    opts=opts||{};
    stop();
    if(!prefs().on){ if(text) fire('onText', String(text)); return; }
    if(!text) return;
    lastText=String(text);
    if(canFallback() && skStatus!=='nok'){ skSpeakWrap(text, !!(opts&&opts.announce)); }
    else sysSpeak(text);
  }
  function testKey(){
    skStatus=''; nokToastShown=false;
    toast('☁ Проверяю SpeechKit…');
    say('Это голос из облачного сервиса СпичКит Яндекса.', {announce:true});
  }
  function skState(){
    return { status: skStatus, voice: skVoiceName(), fallbackOn: skStatus==='nok' };
  }
  function stop(){ try{ if(synth) synth.cancel(); }catch(e){} speaking=false; fire('onSpeak',false); }
  function toggle(){ const p=prefs(); p.on=!p.on; setPrefs({on:p.on});
    if(!p.on) stop(); toast(p.on?'🔊 Звук включён':'🔇 Звук выключен'); return p.on; }
  function faster(){ const r=Math.min(1.6,(prefs().rate||1)+0.15); setPrefs({rate:r}); toast('Темп: '+r.toFixed(2)+'x'); }
  function slower(){ const r=Math.max(0.5,(prefs().rate||1)-0.15); setPrefs({rate:r}); toast('Темп: '+r.toFixed(2)+'x'); }
  function on(name,fn){ listeners[name]=fn; }

  /* ---------- тексты ---------- */
  function taskText(t){ return `Задача «${t.title}». ${t.story} Вопрос: ${t.q}`; }
  function hintText(t,i){ return (t.hints&&t.hints[i])||''; }
  function solText(t){ return `Решение Архимеда. ${t.sol}`; }
  function lessonStepText(){ const L=lessonById(LV.id); if(!L) return ''; return `Шаг ${LV.step+1}. ${L.explain[LV.step]}`; }
  function greeting(){ return 'Привет! Я Архимед. Скажи: объясни задачу, подсказка, дальше, назад или решение.'; }

  /* ---------- распознавание (голосовой агент) ---------- */
  function toggleMic(){
    if(!canMic()){ toast('🎙 Распознавание речи не поддерживается (нужен Chrome/Edge)'); return; }
    if(listening){ try{ rec.stop(); }catch(e){} setListening(false); return; }
    startMic();
  }
  function startMic(){
    try{
      const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
      rec=new SR(); rec.lang='ru-RU'; rec.interimResults=false; rec.maxAlternatives=1;
      rec.onstart=()=>{ setListening(true); toast('🎙 Слушаю…'); };
      rec.onresult=(ev)=>{
        const txt=(ev.results[0][0].transcript||'').toLowerCase();
        setListening(false); toast('Вы сказали: '+txt);
        dispatch(txt);
      };
      rec.onend=()=>setListening(false);
      rec.onerror=(ev)=>{ setListening(false);
        if(ev.error!=='aborted'&&ev.error!=='no-speech') toast('🎙 Ошибка: '+ev.error); };
      rec.start();
    }catch(e){ setListening(false); toast('🎙 Микрофон недоступен'); }
  }
  function setListening(v){ listening=v; fire('onListen', v); }
  function ctxKind(){ const inLesson=!!document.querySelector('.sdot');
    return inLesson?'lesson':(document.querySelector('.q')?'task':''); }
  function dispatch(txt){
    if(/привет|здравствуй|архимед/.test(txt)){ say(greeting()); return; }
    if(/объясни|прочитай|расскажи|задач/.test(txt)){
      const k=ctxKind();
      if(k==='task'&&typeof CUR!=='undefined'&&CUR){ say(taskText(CUR.task)); }
      else if(k==='lesson'&&typeof LV!=='undefined'&&LV){ say(lessonStepText()); }
      else say('Сейчас нет задачи или урока — открой их в Пути или Книге знаний.');
      return; }
    if(/решение|как решить|разбор/.test(txt)){
      if(ctxKind()==='task'&&typeof CUR!=='undefined'&&CUR){
        if(DB.tasks[CUR.task.id]&&DB.tasks[CUR.task.id].done) say(solText(CUR.task));
        else say('Сначала реши задачу — потом я объясню решение вслух.');
        return; } }
    if(/подсказк/.test(txt)){
      const n=/2|два|втор/.test(txt)?1:/3|три|трет/.test(txt)?2:0;
      if(typeof LV!=='undefined'&&LV&&LV.phase==='tasks'&&typeof lvHint==='function'){ lvHint(n);
        const L=lessonById(LV.id); if(L&&L.tasks[LV.task]) say(hintText(L.tasks[LV.task],n)); }
      else if(typeof CUR!=='undefined'&&CUR&&CUR.task&&typeof useHint==='function'){ useHint(n);
        say(hintText(CUR.task,n)); }
      return; }
    if(/дальше|вперед|следующ/.test(txt)){
      if(typeof LV!=='undefined'&&LV&&LV.id&&LV.phase==='explain'){ lvStep(1); }
      else if(typeof LV!=='undefined'&&LV&&LV.phase==='tasks'&&LV.task<lessonById(LV.id).tasks.length-1){ lvNextTask(); }
      else if(typeof CUR!=='undefined'&&CUR&&CUR.task&&typeof afterRow==='function'){ afterRow(CUR.task); }
      return; }
    if(/назад/.test(txt)){ if(typeof LV!=='undefined'&&LV&&LV.id) lvStep(-1); return; }
    if(/стоп|пауза|тихо|замолчи/.test(txt)){ stop(); return; }
    if(/звук (вкл|выкл)|заткнись|выключи звук/.test(txt)){ toggle(); return; }
    if(/темп|быстрее/.test(txt)){ faster(); return; }
    if(/медленнее|помедленней/.test(txt)){ slower(); return; }
    if(/голос|спич|спичкит|кто говорит/.test(txt)){ say('Сейчас я говорю голосом СпичКит Яндекса. Проверка: '+(skState().voice)); return; }
    const ans=(typeof AGENT!=='undefined'&&AGENT.answer)?AGENT.answer(txt):'';
    say(ans || 'Я не понял. Скажи: объясни задачу, подсказка или дальше.');
  }
  function cleanup(){ stop(); if(rec) try{rec.abort();}catch(e){} }

  return { init, say, stop, toggle, faster, slower, on, canMic, toggleMic, testKey, skState,
           taskText, hintText, solText, lessonStepText, greeting,
           speaking:()=>speaking, listening:()=>listening, last:()=>lastText,
           voiceName, refreshVoices, setSkVoice:v=>setPrefs({skVoice:v}),
           srcIs:()=> 'speechkit', setSource:()=> 'speechkit', showFab };
})();

/* глобальные хоткеи и виджеты озвучки */
function vSayTask(){ if(typeof CUR!=='undefined'&&CUR&&CUR.task) VOICE.say(VOICE.taskText(CUR.task)); }
function vSaySol(){ if(typeof CUR!=='undefined'&&CUR&&CUR.task) VOICE.say(VOICE.solText(CUR.task)); }
function vSayLesson(){ if(typeof LV!=='undefined'&&LV&&LV.id) VOICE.say(VOICE.lessonStepText()); }
function vToggle(){ VOICE.toggle(); }
