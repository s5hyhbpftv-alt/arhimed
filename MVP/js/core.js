/* АРХИМЕД MVP · core.js — слой данных и утилиты */
'use strict';
const KEY = 'arhimed_mvp_v1';
const COLORS = ['#d9a441','#7fb8a0','#c96f4a','#6fb4f0','#b06fd0','#e8e0cc'];
const RANKS = [[0,'Стажёр'],[10,'Исследователь'],[24,'Стратег'],[40,'Хранитель'],[55,'Мастер Вселенной']];

function emptyState(){
  return { profile:null,
    tasks:{},            // taskId -> {done:1, tries:n, hints:n, wrong:n, ts}
    points:0, streak:0, best:0,
    history:[],          // {ts, id, ok}
    today:{ date:null, minutes:0 },
    sessionStart: Date.now() };
}
let DB = emptyState();
try{ const s = JSON.parse(localStorage.getItem(KEY));
  if(s && s.profile){ DB = Object.assign(emptyState(), s); if(!DB.today || DB.today.date!==todayStr()) DB.today={date:todayStr(),minutes:0}; }
}catch(e){}

function todayStr(){ const d=new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
function save(){ DB.today.minutes = Math.max(DB.today.minutes, Math.round((Date.now()-DB.sessionStart)/60000));
  try{ localStorage.setItem(KEY, JSON.stringify(DB)); }catch(e){} }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function rankName(){ const n=Object.keys(DB.tasks).filter(id=>DB.tasks[id].done).length;
  let r=RANKS[0][1]; for(const [t,x] of RANKS) if(n>=t) r=x; return r; }
function islandOf(t){ return t.island; }
function themeOf(t){ return (t.theme||'').replace(/^Гл\.\d+\s*·\s*/,''); }
function tasksBy(sel){ return window.ARH_TASKS.filter(sel||(()=>true)); }
function solvedCount(){ return Object.keys(DB.tasks).filter(id=>DB.tasks[id].done).length; }

/* --- конверсия единиц (как в тренажёрах) --- */
const UNITS = {'м/с':1,'км/ч':0.2778,'см':0.01,'км':1000,'м':1,'см/с²':0.01,'мин':60,'кН':1000,
  'Н/м':1,'кН/м':1000,'Н':1,'м/с²':1,'раз':1,'%':1,'кДж':1000,'Дж':1,'г/моль':1,'г':1,'молекул':1,'л':1,'М':1,'кг/м³':1,'Ом':1,'Па':1,'Вт':1,'ч':1,'с':1,'голубя':1,'плиток':1,'монет':1,'амфор':1,'хлебов':1,'градусов':1,'дней':1,'воинов':1,'кубиков':1,'чисел':1,'способов':1,'дорог':1,'комбинаций':1,'взвешиваний':1,'монет':1};
function unitOpts(u){ const map={'км/ч':['км/ч','м/с'],'с':['с','мин'],'м/с':['м/с','км/ч'],'м':['м','км','см'],
  'Н':['Н','кН'],'м/с²':['м/с²','см/с²'],'Н/м':['Н/м','кН/м'],'кДж':['кДж','Дж'],'Дж':['Дж','кДж'],
  'г':['г','кг'],'л':['л'],'М':['М'],'%':['%'],'ч':['ч'],'г/моль':['г/моль']};
  return map[u]||[u]; }
function convert(v,u){ return v*(UNITS[u]||1); }
