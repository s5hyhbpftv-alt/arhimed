/* ================= Иллюстрации 615 — сверены с демовариантом =================
   Источник: school1517.ru/adt/20260910.pdf (демовариант олимпиады школы № 1517).
   Локальная копия и вырезы: deploy/615/. Что именно сверено:
   · задание 2 — столбчатая диаграмма отметок: поле 10,4 клетки, столбцы 1,48
     клетки шириной, шаг 2,5 клетки, ось 0…9 с сеткой через 1;
   · задание 3 — столбчатая диаграмма температуры: ось −16…18 с подписью 18
     сверху, сетка через 2, подписи через 4, значения столбцов прочитаны с
     растра (−6, −13, −4, 6, 10, 14, 16, 15, 13, 5, −3, −10);
   · задание 4 — координатная прямая: семь делений, подписаны только 0 и 1;
   · задание 5 — карта часовых поясов ДФО и часы Коли на 19:50;
   · задание 8 — карта Москвы: контуры 12 округов векторизованы из растра;
   · задание 9 — таблица тарифов со сноской про условия «90 минут»;
   · задание 10 — треугольный коврик: c и d наклонены как в файле, прямые
     выходят за треугольник.
   Карты — настоящие очертания из файла, а не упрощённый силуэт. */
(function(){
  const F="Georgia,'Times New Roman',serif";
  const INK='#2a2118', MUT='#6b5b45', GRIDC='rgba(42,33,24,.18)', LINE='rgba(42,33,24,.8)';
  const BLUE='#2f7fb8', ICE='#c3e2f2', GOLD='#8a6a1f';
  const sv=(inner,h)=>`<svg viewBox="0 0 360 ${h}" width="100%" style="display:block;max-width:100%">${inner}</svg>`;
  const tx=(x,y,s,size,fill,anchor,rot)=>`<text x="${x}" y="${y}"${rot?' transform="rotate(-90 '+x+' '+y+')"':''} text-anchor="${anchor||'middle'}" font-family="${F}" font-size="${size||11}" fill="${fill||MUT}">${s}</text>`;

/*__MAP_DATA__*/

  const MCOL={'1':'#a7cd5e','2':'#e39b60','3':'#42a2b9','4':'#cf6859','5':'#e8a3bf',
    '6':'#e9ae72','7':'#7dccd3','8':'#7b6b98','9':'#f8dbb3','10':'#8cb360',
    '11':'#e9c881','12':'#54a294'};
  const ZCOL={'МСК+5':'#f7a8d8','МСК+6':'#00d2a0','МСК+7':'#f09022','МСК+8':'#a8d830','МСК+9':'#0f9ecb'};

  /* ---- задание 2: отметки за контрольную ---- */
  function marksChart(){
    const v=[3,6,8,5], X0=70, Y0=246, T=22, PW=229;
    const y=n=>Y0-n*T;
    let s='';
    for(let n=0;n<=9;n++){
      s+=`<line x1="${X0}" y1="${y(n)}" x2="${X0+PW}" y2="${y(n)}" stroke="${GRIDC}" stroke-width=".8"/>`;
      s+=tx(X0-8, y(n)+4, n, 10, MUT, 'end');
    }
    s+=`<line x1="${X0}" y1="${y(0)}" x2="${X0+PW}" y2="${y(0)}" stroke="${INK}" stroke-width="1.1"/>`;
    s+=`<line x1="${X0}" y1="${y(0)}" x2="${X0}" y2="${y(9)}" stroke="${INK}" stroke-width="1.1"/>`;
    v.forEach((n,i)=>{ const bw=32, x=X0+T+i*55;
      s+=`<rect x="${x}" y="${y(n)}" width="${bw}" height="${n*T}" fill="${BLUE}"/>`;
      s+=tx(x+bw/2, y(0)+20, '×'+(i+2), 11, MUT); });
    s+=tx(18, (y(0)+y(9))/2, 'Число учеников', 10, MUT, 'middle', true);
    s+=tx(X0+PW/2, y(0)+42, 'Отметка', 11, MUT);
    return sv(s,300);
  }

  /* ---- задание 3: температура по месяцам ---- */
  function tempChart(){
    const v=[-6,-13,-4,6,10,14,16,15,13,5,-3,-10];
    const X0=54, Y0=165, T=5.2, PW=252;
    const y=c=>Y0-c*T;
    let s='';
    for(let c=-16;c<=18;c+=2)
      s+=`<line x1="${X0}" y1="${y(c)}" x2="${X0+PW}" y2="${y(c)}" stroke="${GRIDC}" stroke-width=".7"/>`;
    [18,16,12,8,4,0,-4,-8,-12,-16].forEach(c=>{ s+=tx(X0-7, y(c)+3.4, c, 9, MUT, 'end'); });
    s+=`<line x1="${X0-5}" y1="${y(0)}" x2="${X0+PW}" y2="${y(0)}" stroke="${INK}" stroke-width="1.1"/>`;
    s+=`<line x1="${X0}" y1="${y(18)}" x2="${X0}" y2="${y(-16)}" stroke="${INK}" stroke-width="1.1"/>`;
    const months=['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];
    v.forEach((c,i)=>{ const bw=15, x=X0+6+i*21, top=c>=0?y(c):y(0), hh=Math.abs(c)*T;
      s+=`<rect x="${x}" y="${top}" width="${bw}" height="${hh}" fill="${ICE}" stroke="rgba(42,33,24,.4)" stroke-width=".6"/>`;
      s+=tx(x+bw/2, y(-16)+16, months[i], 9, MUT); });
    s+=tx(16, (y(18)+y(-16))/2, 'Температура, °C', 9.5, MUT, 'middle', true);
    return sv(s,276);
  }

  /* ---- задание 4: координатная прямая ---- */
  function coordLine(){
    const S=40, X0=60, X=u=>X0+u*S, Y=76;
    let s='';
    for(let u=0;u<=6;u++)
      s+=`<line x1="${X(u)}" y1="${Y-9}" x2="${X(u)}" y2="${Y+9}" stroke="${LINE}" stroke-width="1.3"/>`;
    s+=`<line x1="${X(0)-S}" y1="${Y}" x2="${X(6)+S}" y2="${Y}" stroke="${LINE}" stroke-width="1.3"/>`;
    s+=tx(X(0), Y+26, '0', 12, INK)+tx(X(1), Y+26, '1', 12, INK);
    [['A',1.5],['B',2.105],['C',3.5]].forEach(([n,u])=>{
      s+=`<circle cx="${X(u)}" cy="${Y}" r="5" fill="${INK}"/>`+tx(X(u), Y-18, n, 13, INK);
    });
    s+=tx(180, Y+54, '0,67 · 1,5 · 2,105 · 2,9 · 3,5', 11, MUT);
    return sv(s,168);
  }

  /* ---- задание 5: часы Коли и карта часовых поясов ---- */
  function clock(cx,cy,r){
    let s=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fffdf7" stroke="${INK}" stroke-width="1.4"/>`;
    for(let h=0;h<12;h++){ const a=(h*30-90)*Math.PI/180;
      s+=`<line x1="${(cx+Math.cos(a)*(r-4)).toFixed(1)}" y1="${(cy+Math.sin(a)*(r-4)).toFixed(1)}" x2="${(cx+Math.cos(a)*r).toFixed(1)}" y2="${(cy+Math.sin(a)*r).toFixed(1)}" stroke="${INK}" stroke-width=".9"/>`; }
    const hA=(7.83*30-90)*Math.PI/180, mA=(50*6-90)*Math.PI/180;
    s+=`<line x1="${cx}" y1="${cy}" x2="${(cx+Math.cos(hA)*r*0.52).toFixed(1)}" y2="${(cy+Math.sin(hA)*r*0.52).toFixed(1)}" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`;
    s+=`<line x1="${cx}" y1="${cy}" x2="${(cx+Math.cos(mA)*r*0.78).toFixed(1)}" y2="${(cy+Math.sin(mA)*r*0.78).toFixed(1)}" stroke="${GOLD}" stroke-width="1.8" stroke-linecap="round"/>`;
    s+=`<circle cx="${cx}" cy="${cy}" r="1.8" fill="${INK}"/>`;
    return s;
  }
  function zones(){
    let s=tx(170,20,'Дальневосточный федеральный округ России',11,INK);
    Object.keys(ZONES).forEach(k=>{
      s+=`<path d="${ZONES[k].join(' ')}" fill="${ZCOL[k]}" opacity=".88" stroke="rgba(42,33,24,.5)" stroke-width=".6"/>`;
    });
    ZONES_LABEL.forEach(([t,x,y])=>{ s+=tx(x,y,t,10,INK); });
    ZONES_CITY.forEach(([t,x,y])=>{
      if(t==='Петропавловск-Камчатский'){
        s+=tx(x,y,'Петропавловск-',9,INK)+tx(x,y+11,'Камчатский',9,INK);
      } else s+=tx(x,y,t,9,INK);
    });
    s+=clock(326,42,26);
    s+=tx(326,80,'19:50 по Якутску',9,MUT);
    return sv(s,ZONES_H);
  }

  /* ---- задание 8: карта Москвы ---- */
  function moscowMap(){
    let s='';
    Object.keys(MOSCOW).forEach(k=>{
      s+=`<path d="${MOSCOW[k].join(' ')}" fill="${MCOL[k]}" opacity=".92" stroke="rgba(42,33,24,.55)" stroke-width=".7"/>`;
    });
    MOSCOW_NAME.forEach(([t,x,y])=>{ s+=tx(x,y,t,8.5,INK); });
    Object.keys(MOSCOW_LABEL).forEach(k=>{ const p=MOSCOW_LABEL[k]; s+=tx(p[0],p[1]+4,k,11,INK); });
    const cx=299, cy=377, R=34;
    const pt=(a,r)=>[(cx+Math.cos(a*Math.PI/180)*r).toFixed(1),(cy+Math.sin(a*Math.PI/180)*r).toFixed(1)];
    let star=[], inner=[];
    for(let k=0;k<8;k++){
      const a=-90+k*45, len=(k%2===0)?R:R*0.42;
      star.push(pt(a,len).join(','));
      star.push(pt(a+22.5,R*0.16).join(','));
      inner.push(pt(a+22.5,(k%2===0)?R*0.5:R*0.2).join(','));
      inner.push(pt(a+45,R*0.1).join(','));
    }
    s+=`<polygon points="${star.join(' ')}" fill="${INK}"/>`;
    s+=`<polygon points="${inner.join(' ')}" fill="#fdf6e0"/>`;
    s+=`<circle cx="${cx}" cy="${cy}" r="2.6" fill="#fdf6e0"/>`;
    s+=tx(cx,cy-R-8,'С',11,INK)+tx(cx,cy+R+16,'Ю',11,INK);
    s+=tx(cx-R-12,cy+4,'З',11,INK)+tx(cx+R+12,cy+4,'В',11,INK);
    s+=tx(10,MOSCOW_H-8,'Москва · 12 административных округов',10,MUT,'start');
    return sv(s,MOSCOW_H);
  }

  /* ---- задание 9: таблица тарифов ---- */
  function fares(){
    const BX=8, BW=344, BY=6, BH=118;
    const V1=126, V2=214, V3=278;
    const cA=148, cM=192, cB=246, cBio=315;
    let t=`<rect x="${BX}" y="${BY}" width="${BW}" height="${BH}" rx="8" fill="rgba(255,253,247,.92)" stroke="rgba(42,33,24,.35)"/>`;
    [38,66,94].forEach(y=>{ t+=`<line x1="${BX}" y1="${y}" x2="${BX+BW}" y2="${y}" stroke="rgba(42,33,24,.45)" stroke-width="${y===38?1:.8}"/>`; });
    [V1,V2,V3].forEach(x=>{ t+=`<line x1="${x}" y1="${BY}" x2="${x}" y2="${BY+BH}" stroke="rgba(42,33,24,.3)"/>`; });
    t+=tx(64,26,'Способы оплаты',10.5);
    t+=tx(170,26,'Карта «Тройка»',10.5);
    t+=tx(cB,22,'Банковская',8.5); t+=tx(cB,33,'карта',8.5);
    t+=tx(cBio,22,'Оплата',8.5);   t+=tx(cBio,33,'по биометрии',8.5);
    t+=tx(cA,56,'1 поездка',9);    t+=tx(cM,56,'«90 минут»*',9);
    t+=tx(14,80,'Метрополитен',10,INK,'start');
    t+=tx(14,110,'Наземный транспорт',10,INK,'start');
    t+=tx(cA,80,'57',11.5,INK)+tx(cM,80,'85',11.5,INK)+tx(cB,80,'64',11.5,INK)+tx(cBio,80,'53',11.5,INK);
    t+=tx(cA,110,'57',11.5,INK)+tx(cM,110,'85',11.5,INK)+tx(cB,110,'64',11.5,INK)+tx(cBio,110,'—',11.5,INK);
    t+=tx(180,146,'цена указана в рублях',10.5,MUT);
    t+=tx(10,170,'* По условиям тарифа «90 минут» пассажиру даётся одна поездка на метро,',8.5,MUT,'start');
    t+=tx(10,182,'монорельсе, МЦК или МЦД и сколько угодно поездок на автобусе,',8.5,MUT,'start');
    t+=tx(10,194,'электробусе и трамвае в течение 90 минут.',8.5,MUT,'start');
    return sv(t,208);
  }

  /* ---- задание 10: треугольный коврик ---- */
  function carpet(){
    let s=`<polygon points="180,40 118,202 242,204" fill="#a8d8ea" opacity=".9" stroke="#2f7fb8" stroke-width="1.3"/>`;
    s+=`<line x1="180" y1="10" x2="180" y2="230" stroke="${LINE}" stroke-width="1.1"/>`;
    s+=`<line x1="88" y1="121" x2="272" y2="121" stroke="${LINE}" stroke-width="1"/>`;
    s+=`<line x1="96" y1="103" x2="268" y2="224" stroke="${LINE}" stroke-width="1"/>`;
    s+=`<line x1="94" y1="224" x2="264" y2="104" stroke="${LINE}" stroke-width="1"/>`;
    s+=tx(186,16,'b',12,INK,'start');
    s+=tx(86,96,'c',12,INK);
    s+=tx(262,96,'d',12,INK);
    s+=tx(280,125,'a',12,INK,'start');
    s+=tx(180,252,'какая прямая — ось симметрии?',10.5,MUT);
    return sv(s,264);
  }

  /* ---- задание 3 демоварианта: сколько мест в зале ---- */
  function theatre(){
    const cols=12, rows=3, sold=8;
    let s=tx(180,18,'Зал театра',11,INK);
    s+=`<rect x="86" y="28" width="188" height="14" rx="7" fill="rgba(138,106,31,.20)" stroke="rgba(42,33,24,.35)"/>`;
    s+=tx(180,39,'сцена',9,MUT);
    for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
      const x=30+c*25, y=58+r*26, isSold=c<sold;
      s+=`<rect x="${x}" y="${y}" width="19" height="17" rx="5" fill="${isSold?'#e8c26a':'#fffdf7'}" stroke="rgba(42,33,24,${isSold?'.6':'.45'})" stroke-width="${isSold?'.9':'.8'}"/>`;
      s+=`<path d="M${x+4} ${y+10} h11" stroke="rgba(42,33,24,.4)" stroke-width=".9"/>`;
    }
    s+=tx(180,154,'жёлтые кресла — продано 210 билетов, это две трети зала',9.5,INK);
    s+=tx(180,172,'белые кресла — оставшаяся треть',9.5,MUT);
    return sv(s,188);
  }

  /* ---- задание 8.3 демоварианта: тариф «Комфорт» ---- */
  function taxi(){
    function car(x,y,col,title,badge,sub){
      let s=`<g transform="translate(${x},${y})">`;
      s+=`<rect x="0" y="16" width="120" height="30" rx="10" fill="${col}" stroke="rgba(42,33,24,.55)"/>`;
      s+=`<path d="M24 16 L38 -1 L84 -1 L98 16 Z" fill="${col}" stroke="rgba(42,33,24,.55)"/>`;
      s+=`<rect x="40" y="3" width="19" height="11" rx="3" fill="#fffdf7" stroke="rgba(42,33,24,.35)"/>`;
      s+=`<rect x="63" y="3" width="19" height="11" rx="3" fill="#fffdf7" stroke="rgba(42,33,24,.35)"/>`;
      s+=`<circle cx="28" cy="47" r="9" fill="${INK}"/><circle cx="28" cy="47" r="3.4" fill="#fffdf7"/>`;
      s+=`<circle cx="92" cy="47" r="9" fill="${INK}"/><circle cx="92" cy="47" r="3.4" fill="#fffdf7"/>`;
      s+=`<rect x="46" y="25" width="28" height="8" rx="3" fill="#fffdf7" opacity=".85"/>`;
      s+=`</g>`;
      s+=tx(x+60, y-24, title, 11, INK);
      s+=tx(x+60, y-9, badge, 12.5, GOLD);
      s+=tx(x+60, y+74, sub, 10, MUT);
      return s;
    }
    let s=tx(180,20,'Такси: «Эконом» и «Комфорт»',11,INK);
    s+=car(30,70,'#d8e2ea','«Эконом»','680 ₽','цена поездки');
    s+=car(200,70,'#f0d9a8','«Комфорт»','+ 5 %','дороже на 5 %');
    s+=tx(180,186,'сколько рублей стоит поездка в «Комфорте»?',10.5,MUT);
    return sv(s,200);
  }

  /* ---- задание 1: корзины с орехами (рисунок по решению владельца) ---- */
  function basket(x,nuts,count){
    const W=17, H=42;
    let s=`<defs>
      <linearGradient id="wick615" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#e0b070"/><stop offset=".5" stop-color="#c08a44"/><stop offset="1" stop-color="#8f5f2a"/></linearGradient>
      <linearGradient id="rim615" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f0d59c"/><stop offset="1" stop-color="#b98a4a"/></linearGradient>
      <radialGradient id="nut615" cx=".35" cy=".3" r=".9">
        <stop offset="0" stop-color="#e8c187"/><stop offset="1" stop-color="#9c6528"/></radialGradient>
    </defs>`;
    s+=`<ellipse cx="${x}" cy="${132+H*0.86}" rx="${W+8}" ry="6" fill="rgba(42,33,24,.22)"/>`;
    s+=`<path d="M${x-W} 132 L${x+W} 132 L${x+W-6} ${132+H} L${x-W+6} ${132+H} Z" fill="url(#wick615)" stroke="rgba(60,40,15,.5)" stroke-width=".8"/>`;
    for(let i=1;i<5;i++){ const yy=132+i*(H/5); const w=W-i*1.2;
      s+=`<path d="M${x-w} ${yy} Q${x} ${yy+3} ${x+w} ${yy}" stroke="rgba(70,45,15,.42)" fill="none" stroke-width="1.1"/>`; }
    for(let i=-2;i<=2;i++){ const xx=x+i*6;
      s+=`<path d="M${xx} 133 Q${xx+(i*0.6)} ${133+H/2} ${xx} ${131+H}" stroke="rgba(70,45,15,.28)" fill="none" stroke-width=".9"/>`; }
    s+=`<ellipse cx="${x}" cy="132" rx="${W}" ry="6.5" fill="url(#rim615)" stroke="rgba(60,40,15,.5)" stroke-width=".8"/>`;
    s+=`<path d="M${x-W+3} 130 Q${x} ${132-30} ${x+W-3} 130" stroke="url(#rim615)" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
    for(let i=0;i<nuts;i++){ const a=-1.1+i*(2.2/Math.max(1,nuts-1)), nx=x+Math.sin(a)*(W-4), ny=126+Math.cos(a)*3;
      s+=`<ellipse cx="${nx.toFixed(1)}" cy="${(ny-i%2*4).toFixed(1)}" rx="4.4" ry="3.6" fill="url(#nut615)" stroke="rgba(60,40,15,.45)" stroke-width=".6"/>`;
      s+=`<ellipse cx="${(nx-1.2).toFixed(1)}" cy="${(ny-1.6-i%2*4).toFixed(1)}" rx="1.2" ry=".9" fill="rgba(255,240,210,.75)"/>`; }
    s+=tx(x,188,String(count),12.5,INK);
    return s;
  }
  function orehi(){
    const DATA=[[44,4,81],[110,5,34],[176,6,17],[242,5,23],[308,6,75]];
    let s=DATA.map(([x,n,c])=>basket(x,n,c)).join('');
    s+=`<line x1="20" y1="196" x2="340" y2="196" stroke="rgba(42,33,24,.25)"/>`;
    s+=tx(180,212,'поровну на пять корзинок',11.5,INK);
    return sv(s,224);
  }

  /* ---- задания 6 и 7: семья и клумба (рисунки по решению владельца) ---- */
  function kid(x,base,skin,hair,shirt,pants,scale,long){
    return `<g transform="translate(${x},${base}) scale(${scale})">
      <ellipse cx="0" cy="2" rx="20" ry="5" fill="rgba(42,33,24,.22)"/>
      ${long?`<path d="M-13 -34 q13 -14 26 0 q3 10 -2 14 q-11 -7 -22 0 q-5 -5 -2 -14 z" fill="${hair}"/>`:''}
      <circle cx="0" cy="-40" r="13" fill="url(#skinG615)"/>
      <path d="M-13 -44 q13 -13 26 0 q1 -9 -13 -12 q-14 3 -13 12 z" fill="${hair}"/>
      <circle cx="-4.5" cy="-41" r="1.7" fill="${INK}"/><circle cx="4.5" cy="-41" r="1.7" fill="${INK}"/>
      <path d="M-4 -35 q4 4 8 0" stroke="${INK}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <path d="M-11 -27 q11 -5 22 0 l3 22 q-14 4 -28 0 z" fill="${shirt}"/>
      <path d="M-11 -27 q-7 4 -9 12 q3 3 6 1 q2 -7 5 -9 z" fill="${shirt}" opacity=".9"/>
      <path d="M11 -27 q7 4 9 12 q-3 3 -6 1 q-2 -7 -5 -9 z" fill="${shirt}" opacity=".9"/>
      <path d="M-9 -5 l-2 20 h7 l3 -20 z" fill="${pants}"/><path d="M9 -5 l2 20 h-7 l-3 -20 z" fill="${pants}"/>
      <rect x="-13" y="14" width="11" height="5" rx="2.5" fill="${INK}"/><rect x="2" y="14" width="11" height="5" rx="2.5" fill="${INK}"/>
    </g>`;
  }
  function family(){
    let s=`<defs>
      <radialGradient id="skinG615" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#f6d9bd"/><stop offset="1" stop-color="#d9a97f"/></radialGradient>
      <linearGradient id="shirtB615" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fa3dd"/><stop offset="1" stop-color="#3d6fae"/></linearGradient>
      <linearGradient id="shirtP615" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0a0bc"/><stop offset="1" stop-color="#c9678c"/></linearGradient>
      <linearGradient id="pantsG615" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4f63"/><stop offset="1" stop-color="#2c3040"/></linearGradient>
      <linearGradient id="floor615" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(42,33,24,.10)"/><stop offset="1" stop-color="rgba(42,33,24,0)"/></linearGradient>
    </defs>`;
    s+=`<rect x="18" y="176" width="324" height="34" fill="url(#floor615)" rx="8"/>`;
    s+=kid(96,178,'','#6b4a2a','url(#shirtB615)','url(#pantsG615)',1.02,false);
    s+=kid(152,178,'','#3d2a18','url(#shirtB615)','url(#pantsG615)',1.06,false);
    s+=kid(210,178,'','#7a5230','url(#shirtB615)','url(#pantsG615)',0.98,false);
    s+=kid(262,176,'','#8a5a2a','url(#shirtP615)','url(#pantsG615)',0.96,true);
    s+=kid(310,174,'','#c98b3a','url(#shirtP615)','url(#pantsG615)',0.94,true);
    s+=tx(180,214,'трое мальчиков и две девочки — пятеро детей',12,INK);
    return sv(s,228);
  }
  function flower(){
    let s=`<defs>
      <radialGradient id="soil615" cx=".38" cy=".32" r=".9"><stop offset="0" stop-color="#8a6242"/><stop offset="1" stop-color="#553a26"/></radialGradient>
      <radialGradient id="grass615" cx=".5" cy=".4" r=".9"><stop offset="0" stop-color="#7fae62"/><stop offset="1" stop-color="#4d7a3c"/></radialGradient>
      <linearGradient id="picket615" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8d6ac"/><stop offset="1" stop-color="#b99a63"/></linearGradient>
      <radialGradient id="petal615" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fff0f3"/><stop offset="1" stop-color="#e0768f"/></radialGradient>
      <radialGradient id="petal615b" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fff6e0"/><stop offset="1" stop-color="#e8b23f"/></radialGradient>
    </defs>`;
    s+=`<ellipse cx="180" cy="126" rx="118" ry="66" fill="url(#grass615)" opacity=".55"/>`;
    s+=`<ellipse cx="180" cy="120" rx="96" ry="52" fill="url(#soil615)"/>`;
    for(let i=0;i<26;i++){ const a=((i*137.5)%360)*Math.PI/180, r=Math.sqrt((i%9)/9)*40;
      s+=`<circle cx="${(180+Math.cos(a)*r*1.7).toFixed(1)}" cy="${(120+Math.sin(a)*r).toFixed(1)}" r="${(0.8+(i%5)*0.35).toFixed(1)}" fill="rgba(255,235,200,.22)"/>`; }
    const fl=(x,y,sc,p)=>`<g transform="translate(${x},${y}) scale(${sc})">
        ${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-7" rx="3.4" ry="7" fill="url(#${p})" transform="rotate(${a})" opacity=".95"/>`).join('')}
        <circle r="3.2" fill="#c9761f"/></g>`;
    [[140,104,1.15,'petal615'],[176,94,1.3,'petal615b'],[214,102,1.1,'petal615'],[158,126,1.25,'petal615b'],
     [196,128,1.15,'petal615'],[180,112,1.4,'petal615'],[126,124,1.0,'petal615b'],[232,120,1.0,'petal615b']]
      .forEach(([x,y,sc,p])=>{ s+=`<path d="M${x} ${y+6} q-4 16 2 24" stroke="#3f6b33" stroke-width="2" fill="none"/>`+fl(x,y,sc,p); });
    for(let i=0;i<16;i++){ const a=i*22.5*Math.PI/180; const x=180+Math.cos(a)*92, y=126+Math.sin(a)*50;
      s+=`<rect x="${(x-2.6).toFixed(1)}" y="${(y-16).toFixed(1)}" width="5.2" height="22" rx="2" fill="url(#picket615)" stroke="rgba(42,33,24,.35)" stroke-width=".6" transform="rotate(${(a*180/Math.PI+90).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }
    s+=`<line x1="180" y1="120" x2="180" y2="76" stroke="${INK}" stroke-width="1" stroke-dasharray="4 3"/>`;
    s+=tx(188,74,'R',12,INK);
    s+=tx(180,196,'заборчик по границе клумбы: 18,84 м',12,INK);
    s+=tx(180,212,'π = 3,14',11,MUT);
    return sv(s,224);
  }

  if(window.RU615 && window.RU615.art){
    window.RU615.art.orehi=orehi;   window.RU615.art.chart=marksChart;
    window.RU615.art.temp=tempChart; window.RU615.art.line=coordLine;
    window.RU615.art.zones=zones;   window.RU615.art.map=moscowMap;
    window.RU615.art.fares=fares;   window.RU615.art.carpet=carpet;
    window.RU615.art.family=family; window.RU615.art.flower=flower;
    window.RU615.art.theatre=theatre; window.RU615.art.taxi=taxi;
  }
})();
