/* не даём visMathNew перехватывать уроки волн B–E */
(function(){
  const orig=window.visIsMath;
  window.visIsMath=function(){
    try{
      const id=window.LV&&LV.id;
      if(id!=null && ((window.WAVE_D&&WAVE_D[id])||(window.WAVE_C&&WAVE_C[id])||(window.WAVE_B&&WAVE_B[id])||(window.WAVE_E&&WAVE_E[id])||(window.VISKW&&VISKW[id]))) return false;
    }catch(e){}
    return orig?orig.apply(this,arguments):false;
  };
})();
