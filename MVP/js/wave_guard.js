/* не даём visMathNew перехватывать уроки волн B–E;
   кнопки и ползунки не должны сносить виджет при каждом клике */
(function(){
  const origMath=window.visIsMath;
  function lessonId(){
    try{ if(typeof LV!=='undefined' && LV && LV.id!=null) return LV.id; }catch(e){}
    try{ if(window.LV && window.LV.id!=null) return window.LV.id; }catch(e){}
    return null;
  }

  window.visIsMath=function(){
    try{
      const id=lessonId();
      if(id!=null && ((window.WAVE_D&&WAVE_D[id])||(window.WAVE_C&&WAVE_C[id])||(window.WAVE_B&&WAVE_B[id])||(window.WAVE_E&&WAVE_E[id])||(window.VISKW&&VISKW[id]))) return false;
    }catch(e){}
    return origMath?origMath.apply(this,arguments):false;
  };

  function waveFn(){
    const id=lessonId();
    if(id==null) return null;
    if(window.VISKW&&VISKW[id]) return VISKW[id];
    if(window.WAVE_D&&WAVE_D[id]) return WAVE_D[id];
    if(window.WAVE_C&&WAVE_C[id]) return WAVE_C[id];
    if(window.WAVE_B&&WAVE_B[id]) return WAVE_B[id];
    if(window.WAVE_E&&WAVE_E[id]) return WAVE_E[id];
    return null;
  }

  const origVis=window.renderLessonVis;
  window.renderLessonVis=function(){
    const el=document.getElementById('lvis');
    const fn=waveFn();
    if(el&&fn){
      try{ fn(el); }catch(e){ try{ el.innerHTML=''; }catch(_){ } }
      return;
    }
    if(origVis) return origVis.apply(this, arguments);
  };

  const orig=window.chRender;

  window.waveLive=function(){
    const el=document.getElementById('lvis');
    const fn=waveFn();
    if(!el||!fn){ if(typeof orig==='function') orig(0); return; }
    const tmp=document.createElement('div');
    try{ fn(tmp); }catch(e){ try{ fn(el); }catch(_){ } return; }
    const nsvg=tmp.querySelector('svg');
    const osvg=el.querySelector('svg');
    if(nsvg&&osvg) osvg.replaceWith(nsvg);
    const nAns=tmp.querySelectorAll('.wv-ans, .wv-sml, .wv-big');
    const oAns=el.querySelectorAll('.wv-ans, .wv-sml, .wv-big');
    nAns.forEach(function(n,i){ if(oAns[i]) oAns[i].innerHTML=n.innerHTML; });
    el.querySelectorAll('input[type=range]').forEach(function(inp){
      const b=inp.parentElement && inp.parentElement.querySelector('b');
      if(b) b.textContent=inp.value;
    });
  };

  window.chRender=function(lid){
    const el=document.getElementById('lvis');
    const fn=waveFn();
    if(el&&fn){
      const a=document.activeElement;
      if(a && a.type==='range' && el.contains(a)){ window.waveLive(); return; }
      try{ fn(el); }catch(e){ try{ el.innerHTML=''; }catch(_){ } }
      return;
    }
    if(orig) return orig.apply(this, arguments);
  };
})();
