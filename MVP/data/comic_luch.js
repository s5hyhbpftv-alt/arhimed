/* ============ ЛИСТ 257 · «ТРОПИНКА ЧИСЕЛ» · живой комикс для 1–2 класса ======

   Тема плана 1 класса: «Числовой отрезок, выражения, уравнения „часть–целое“».
   В приложении числового отрезка не было вовсе: выражения закрывает лист 302,
   уравнения — лист 303, а сам луч, по которому двигаются при сложении и
   вычитании, не показан нигде.

   СЮЖЕТ И ГЛАВНОЕ РЕШЕНИЕ. Пых идёт по тропинке к дому. Через каждые десять
   шагов на тропинке лежит камень с числом, а тропинка не кончается — она уходит
   в туман, и это и есть смысл луча: у чисел нет последнего. Прыжок вперёд —
   сложение, прыжок назад — вычитание. Ребёнок не решает «5 + 3 = ?» на бумаге,
   он ПРЫГАЕТ и видит, куда попал: пример становится расстоянием, а ответ —
   местом на тропинке. Дальше тропинка начинает спрашивать сама: где окажешься,
   сколько прыжков до дома, какой камень пропущен.

   КАРТИНКА. Тропинка нарисована вечерним лесом: небо с градиентом, тёплые
   камни-числа со свечением, светлячки, слои елей в глубине и туман на дальнем
   конце луча. Камни горят ярче там, где стоит Пых, — взгляд сам находит ответ.
   Прыжок анимирован: фигурка едет по тропинке с плавным замедлением, а не
   перескакивает мгновенно, поэтому «шаг вправо» читается как движение.

   Интерактив у каждого кадра свой: пройти по камням и увидеть, что конца нет;
   прыгнуть на три вперёд; прыгнуть на два назад; прыгать по три, считая
   тройками; найти пропущенный камень; прыгнуть в неизвестное и назвать его;
   дойти до дома ровно. Восемь кадров, восемь разных действий.
*/
(function(){
  const ID = 257;
  const ДОМ = 'v257';
  const ШАГ = 44;        /* ширина одной ступени тропинки */
  const КАМНЕЙ = 12;     /* сколько камней помещается в кадр */

  /* ─────────── состояние ─────────── */
  function память(){
    if (typeof CHS === 'undefined') window.CHS = {};
    if (!CHS[ДОМ]) CHS[ДОМ] = {};
    return CHS[ДОМ];
  }
  function шаг(){
    const изLV = (typeof LV !== 'undefined' && typeof LV.step === 'number') ? LV.step : 0;
    return Math.max(0, Math.min(КАДРЫ.length - 1, изLV));
  }
  function сост(i){
    const п = память();
    if (!п[i]) п[i] = { где: 0, прыжков: 0, ответы: {}, тройками: [] };
    return п[i];
  }
  const перерисовать = () => { if (typeof chRender === 'function') chRender(0); };

  /* ─────────── герой ─────────── */
  function пых(настроение){
    const глаз = настроение === 'рад'
      ? '<path d="M27 29 q5 -5 10 0 M47 29 q5 -5 10 0" stroke="#2b2118" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      : '<circle cx="32" cy="29" r="3.2" fill="#2b2118"/><circle cx="52" cy="29" r="3.2" fill="#2b2118"/>';
    const рот = настроение === 'рад'
      ? '<path d="M30 42 q12 10 24 0" stroke="#2b2118" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
      : '<path d="M32 44 q10 4 20 0" stroke="#2b2118" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    /* Пых — картинка владельца (MVP/img/pykh.png); прежний вектор остаётся
       под ней запасным вариантом. */
    return `<span class="пых-лицо">
      <img src="img/pykh.png" alt="" onerror="this.style.display='none'">
      <span class="пых-запас"><g>
      <ellipse cx="42" cy="66" rx="22" ry="3.6" fill="rgba(0,0,0,.28)"/>
      <path d="M42 6 L68 34 C68 50 56 60 42 60 C28 60 16 50 16 34 Z" fill="#b08155" stroke="#3a2a1c" stroke-width="2.4"/>
      <path d="M42 10 L42 58 M29 16 L48 54 M55 16 L36 54 M22 26 L62 26" stroke="#8f6640" stroke-width="1.6" opacity=".55"/>
      <circle cx="42" cy="38" r="17" fill="#f2cda8" stroke="#3a2a1c" stroke-width="2.2"/>
      <path d="M28 31 q7 -5 14 -2 M42 29 q7 -3 14 2" stroke="#3a2a1c" stroke-width="2" fill="none" stroke-linecap="round"/>
      ${глаз}
      <ellipse cx="42" cy="37" rx="5" ry="4.2" fill="#3a2c20"/>
      <circle cx="40.4" cy="35.4" r="1.4" fill="#fff"/>
      ${рот}
    </g>`;
  }

  /* ─────────── тропинка: вечерний лес и камни-числа ─────────── */
  /* Тропинка — это луч: камни идут через равные шаги, а справа она уходит
     в туман, потому что у чисел нет последнего. Пых стоит на своём камне,
     прыжок анимируется переходом transform. */
  function тропа(где, opts){
    const о = opts || {};
    const глубина = о.глубина == null ? 0 : о.глубина;
    /* КАМЕРА. Двенадцать камней по 44 не влезают в кадр 360: первая версия
       рисовала камни 0…11 по абсолютным координатам, и половина уезжала за
       правый край вместе с фигуркой Пыха — на снимке тропинка обрывалась на
       седьмом камне, а героя не было видно вовсе. Теперь камера едет за Пыхом:
       он стоит на пятой позиции окна, а окно показывает камни вокруг. */
    const окно = 8;
    const первый = Math.max(0, Math.min(где - 4, КАМНЕЙ - окно));
    let камни = '';
    for (let i = 0; i < КАМНЕЙ; i++){
      if (i < первый || i >= первый + окно) continue;
      const x = 34 + (i - первый) * ШАГ;
      const тут = i === где;
      const цель = глубина && i === где + глубина;
      const туман = (i - первый) / (окно - 1);
      камни += `<g class="камень ${тут ? 'тут' : ''} ${цель ? 'цель' : ''}">
        ${тут ? `<ellipse class="сияние" cx="${x}" cy="150" rx="26" ry="12" fill="#ffd76a" opacity=".45"/>` : ''}
        <ellipse cx="${x}" cy="152" rx="17" ry="9" fill="#6f6656" stroke="#3f3a30" stroke-width="2"
          opacity="${(1 - туман * 0.35).toFixed(2)}"/>
        <ellipse cx="${x}" cy="148" rx="15" ry="7.5" fill="${тут ? '#f0d9a0' : '#cfc4ad'}"
          stroke="#7c715c" stroke-width="1.6" opacity="${(1 - туман * 0.3).toFixed(2)}"/>
        <text x="${x}" y="164" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="bold"
          fill="${тут ? '#fff3cc' : '#f0e6cc'}" stroke="#2b2318" stroke-width="3.2" paint-order="stroke"
          stroke-linejoin="round" opacity="${(1 - туман * 0.35).toFixed(2)}">${i + (о.сдвиг || 0)}</text>
      </g>`;
    }
    let свет = '';
    for (let i = 0; i < 12; i++){
      const x = 16 + ((i * 61) % 330), y = 52 + ((i * 47) % 76);
      свет += `<circle class="светл" cx="${x}" cy="${y}" r="${(1.5 + (i % 3) * 0.6).toFixed(1)}" fill="#ffe9a8"
        style="animation-delay:${(i % 5) * 0.6}s"/>`;
    }
    const xПыха = 34 + (где - первый) * ШАГ;
    return `<svg viewBox="0 0 360 200" class="тропа" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Тропинка чисел, Пых на камне ${где}">
      <defs>
        <linearGradient id="tlНебо" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2b3a63"/><stop offset="0.55" stop-color="#6d5f86"/>
          <stop offset="1" stop-color="#c98f6a"/></linearGradient>
        <linearGradient id="tlЛуг" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#4a6b4a"/><stop offset="1" stop-color="#2f4630"/></linearGradient>
        <radialGradient id="tlСвет" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="#ffd76a" stop-opacity=".6"/><stop offset="1" stop-color="#ffd76a" stop-opacity="0"/></radialGradient>
        <linearGradient id="tlТуман" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#e8e0cc" stop-opacity="0"/><stop offset="1" stop-color="#e8e0cc" stop-opacity=".5"/></linearGradient>
      </defs>
      <rect x="0" y="0" width="360" height="132" fill="url(#tlНебо)"/>
      <circle cx="296" cy="32" r="15" fill="#ffeec2" opacity=".92"/>
      <circle cx="296" cy="32" r="30" fill="url(#tlСвет)"/>
      <g opacity=".5" fill="#22331f">
        <path d="M14 122 L30 76 L46 122 Z M58 122 L72 84 L86 122 Z M118 122 L134 72 L150 122 Z
                 M184 122 L198 82 L212 122 Z M248 122 L264 74 L280 122 Z M310 122 L324 86 L338 122 Z"/>
      </g>
      <rect x="0" y="118" width="360" height="82" fill="url(#tlЛуг)"/>
      <path d="M0 170 L360 162 L360 188 L0 198 Z" fill="#6f7a52" opacity=".9"/>
      <path d="M0 178 L360 172" stroke="#8a9566" stroke-width="2" opacity=".7"/>
      ${камни}
      <!-- дальний конец: тропинка уходит в туман, у чисел нет последнего -->
      <rect x="292" y="118" width="68" height="82" fill="url(#tlТуман)"/>
      <text x="326" y="136" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#f4ecd8" opacity=".8">дальше…</text>
      ${свет}
      <!-- Пых на своём камне: камера держит его в окне, прыжок анимирован -->
      <g class="пых" style="transform:translate(${xПыха}px,0)">
        <g transform="translate(-19,92) scale(0.55)">${пых(о.рад ? 'рад' : 'думает')}</g>
      </g>
    </svg></span>
    </span>`;
  }

  /* ─────────── кнопки прыжка ─────────── */
  function прыжокКнопки(i, назад, вперёд, до){
    return `<div class="прыжки">
      <button class="шаг-кнопка" onclick="В257.прыгнуть(${i},-1)" ${назад ? '' : 'disabled'}>← шаг назад</button>
      <button class="шаг-кнопка вперёд" onclick="В257.прыгнуть(${i},1)" ${вперёд ? '' : 'disabled'}>шаг вперёд →</button>
    </div>`;
  }

  /* ─────────── кадры ─────────── */
  const КАДРЫ = [
    /* 0 · что такое тропинка чисел */
    {
      t: 'Тропинка, у которой нет конца',
      say: 'Я иду домой по тропинке. Через каждые десять шагов — камень с числом. Пройди вперёд и посмотри, где она кончается.',
      делать: 'Нажимай «шаг вперёд» и смотри на камни.',
      готов: st => st.где >= 5,
      рисуй(i, st){
        return `<div class="сцена">
          ${тропа(st.где, { сдвиг: 0 })}
          ${прыжокКнопки(i, st.где > 0, st.где < КАМНЕЙ - 1)}
          <p class="живой">Стою на камне ${st.где}. Прошёл ${st.где} шагов от начала тропинки.</p>
          ${st.где >= 5 ? `<p class="вывод">Камни не кончаются: за последним видимым — туман, а за туманом тропинка идёт дальше. У чисел нет последнего числа — это и называют лучом.</p>` : ''}
        </div>`;
      }
    },
    /* 1 · прыжок вперёд — сложение */
    {
      t: 'Прыжок вперёд — это сложение',
      say: 'Я стою на камне 5. До дома три шага вперёд. Прыгни три раза и скажи, где я окажусь.',
      делать: 'Прыгни вперёд три раза.',
      готов: st => st.где === 8,
      рисуй(i, st){
        const осталось = 8 - st.где;
        return `<div class="сцена">
          ${тропа(st.где, { рад: st.где === 8, глубина: осталось > 0 ? 1 : 0 })}
          ${прыжокКнопки(i, st.где > 5, st.где < 8)}
          <div class="пример-живой">5 ${осталось > 0 ? '+ ?' : '+ 3'} = <b>${st.где}</b></div>
          ${st.где === 8 ? `<p class="вывод">Пять и три прыжка — восемь. Прыжок вперёд по тропинке и есть сложение: 5 + 3 = 8.</p>`
            : `<p class="живой">Осталось шагов: ${осталось}.</p>`}
        </div>`;
      }
    },
    /* 2 · прыжок назад — вычитание */
    {
      t: 'Прыжок назад — это вычитание',
      say: 'Я на камне 8, но вспомнил: у дома надо быть на камне 6. Прыгай назад.',
      делать: 'Прыгни назад два раза.',
      готов: st => st.где === 6,
      рисуй(i, st){
        const назад = st.где - 6;
        return `<div class="сцена">
          ${тропа(st.где, { рад: st.где === 6 })}
          ${прыжокКнопки(i, st.где > 6, st.где < 6)}
          <div class="пример-живой">8 − ${назад > 0 ? '?' : '2'} = <b>${st.где}</b></div>
          ${st.где === 6 ? `<p class="вывод">Прыжок назад — это вычитание: 8 − 2 = 6. Влево по тропинке числа становятся меньше.</p>`
            : `<p class="живой">Осталось прыжков назад: ${назад}.</p>`}
        </div>`;
      }
    },
    /* 3 · прыжки по три: счёт тройками */
    {
      t: 'Прыгаю по три',
      say: 'Я умею прыгать через два камня — сразу на три вперёд. Считай вместе со мной.',
      делать: 'Прыгни по три вперёд три раза.',
      готов: st => (st.тройками || []).length >= 3,
      рисуй(i, st){
        const где = st.где;
        return `<div class="сцена">
          ${тропа(где, {})}
          <div class="тройки">${(st.тройками || []).map(n => `<span class="тройка">${n}</span>`).join('') || '<span class="живой">0, 3, 6, …</span>'}</div>
          <div class="прыжки">
            <button class="шаг-кнопка вперёд" onclick="В257.шагТри(${i})" ${где + 3 < КАМНЕЙ ? '' : 'disabled'}>прыгнуть на 3 →</button>
          </div>
          ${(st.тройками || []).length >= 3 ? `<p class="вывод">Получилось 0, 3, 6, 9 — это счёт тройками. Так же считают пятёрками и десятками, когда числа большие.</p>` : ''}
        </div>`;
      }
    },
    /* 4 · пропущенный камень */
    {
      t: 'Один камень потерялся',
      say: 'Смотри: на тропинке стёрлось число. Догадайся, какой камень пропущен.',
      делать: 'Выбери пропущенное число.',
      готов: st => st.ответы[4] != null,
      рисуй(i, st){
        const выбор = st.ответы[4];
        const ряд = [2, 3, 4, 5, 7];
        return `<div class="сцена">
          <div class="ряд-камней">${ряд.map(н => `<span class="число-камень ${н === 4 && выбор == null ? 'стёрт' : ''}">${н === 4 && выбор == null ? '?' : н}</span>`).join('')}</div>
          <p class="живой">Камень стоит между 3 и 5. Какое число пропущено?</p>
          <div class="знаки">${[2, 4, 6].map(н => `<button class="ответ ${выбор == null ? '' : (н === 4 ? 'верно' : (н === выбор ? 'мимо' : ''))}"
            onclick="В257.ответить(4,${н})" ${выбор != null ? 'disabled' : ''}>${н}</button>`).join('')}</div>
          ${выбор != null ? `<p class="вывод">${выбор === 4 ? 'Верно: 2, 3, 4, 5, 6, 7. Камень между тройкой и пятёркой — четвёрка.' : 'Посчитай по порядку: 2, 3, …, 5. Между ними стоит 4.'}</p>` : ''}
        </div>`;
      }
    },
    /* 5 · неизвестное на тропинке */
    {
      t: 'Сколько шагов до дома?',
      say: 'Дом на камне 9, а я на камне 4. Сколько шагов мне прыгнуть — я не знаю. Посчитай по тропинке.',
      делать: 'Прыгай вперёд и считай шаги, пока не дойдёшь до 9.',
      готов: st => st.где === 9,
      рисуй(i, st){
        const прошёл = st.где - 4;
        return `<div class="сцена">
          ${тропа(st.где, { сдвиг: 0, рад: st.где === 9, глубина: st.где < 9 ? 1 : 0 })}
          ${прыжокКнопки(i, st.где > 4, st.где < 9)}
          <div class="пример-живой">4 + <b>${прошёл}</b> = ${st.где}</div>
          ${st.где === 9 ? `<p class="вывод">Понадобилось 5 прыжков, и на камне 9 вышло 4 + 5 = 9. Неизвестное слагаемое нашли, считая шаги по тропинке.</p>`
            : `<p class="живой">Прошёл шагов: ${прошёл}.</p>`}
        </div>`;
      }
    },
    /* 6 · дойти ровно, не перепрыгнув */
    {
      t: 'Дойди ровно до дома',
      say: 'Дом на камне 7. Прыгай так, чтобы не перепрыгнуть: влево и вправо можно.',
      делать: 'Встань на камень 7.',
      готов: st => st.где === 7,
      рисуй(i, st){
        const разница = 7 - st.где;
        return `<div class="сцена">
          ${тропа(st.где, { рад: st.где === 7, глубина: разница !== 0 ? (разница > 0 ? 1 : -1) : 0 })}
          ${прыжокКнопки(i, st.где > 0, st.где < КАМНЕЙ - 1)}
          <p class="живой">${разница === 0 ? 'Дома!' : (разница > 0 ? `До дома ${разница} шагов вперёд.` : `Ты перепрыгнул: вернись на ${-разница} шагов назад.`)}</p>
          ${st.где === 7 ? `<p class="вывод">Дошёл ровно. Если перепрыгнул — шаг назад: на тропинке всегда можно вернуться и проверить себя.</p>` : ''}
        </div>`;
      }
    },
    /* 7 · итог */
    {
      t: 'Что запомнить про тропинку',
      say: 'Тропинка чисел помогла мне дойти домой. Запомни: вперёд — прибавляем, назад — вычитаем.',
      делать: '',
      готов: () => true,
      рисуй(){
        return `<div class="сцена">
          <div class="памятка">
            <div class="строка"><b>5 + 3 = 8</b><span>три прыжка вперёд</span></div>
            <div class="строка"><b>8 − 2 = 6</b><span>два прыжка назад</span></div>
            <div class="строка"><b>0, 3, 6, 9</b><span>прыжки по три — счёт тройками</span></div>
            <div class="строка"><b>4 + ? = 9</b><span>неизвестное — это шаги по тропинке</span></div>
          </div>
          <p class="вывод">У тропинки нет конца — она уходит в туман. Поэтому и говорят «числовой луч»: у чисел нет последнего числа.</p>
        </div>`;
      }
    }
  ];

  /* ─────────── взаимодействие ─────────── */
  window.В257 = {
    прыгнуть(i, д){ const st = сост(i);
      st.где = Math.max(0, Math.min(КАМНЕЙ - 1, st.где + д));
      st.прыжков = (st.прыжков || 0) + 1; перерисовать(); },
    шагТри(i){ const st = сост(i);
      if (st.где + 3 > КАМНЕЙ - 1) return;
      st.где += 3;
      st.тройками = (st.тройками || []); st.тройками.push(st.где);
      перерисовать(); },
    ответить(i, n){ const st = сост(i); if (st.ответы[i] == null) st.ответы[i] = n; перерисовать(); }
  };

  /* ─────────── стиль ─────────── */
  function стиль(){
    if (document.getElementById('s257')) return;
    const с = document.createElement('style');
    с.id = 's257';
    с.textContent = `
      .${ДОМ}{ display:flex; flex-direction:column; gap:12px; }
      /* Пых: картинка сверху, вектор под ней как запасной вариант */
      .${ДОМ} .пых-лицо{ position:relative; display:inline-block; width:62px; height:78px; flex:none; }
      .${ДОМ} .пых-лицо img{ position:absolute; inset:0; width:100%; height:100%; object-fit:contain; z-index:2; }
      .${ДОМ} .пых-запас{ position:absolute; inset:0; display:block; z-index:1; }
      .${ДОМ} .пых-запас svg{ width:100%; height:100%; }
      .${ДОМ} .реплика{ display:flex; gap:10px; align-items:flex-start; }
      .${ДОМ} .реплика p{ margin:0; font-size:17px; line-height:1.5; }
      .${ДОМ} .сцена{ display:flex; flex-direction:column; gap:10px; align-items:center; }
      .${ДОМ} .тропа{ width:100%; max-width:360px; height:auto; display:block; border-radius:12px; }
      .${ДОМ} .пых{ transition:transform .55s cubic-bezier(.22,1.2,.36,1); }
      .${ДОМ} .светл{ animation:в257мерц 2.6s ease-in-out infinite; }
      @keyframes в257мерц{ 0%,100%{ opacity:.25; } 50%{ opacity:.95; } }
      .${ДОМ} .камень.тут text{ font-size:19px; }
      .${ДОМ} .камень.цель ellipse{ stroke:#ffd76a; stroke-width:2.4; }
      .${ДОМ} .прыжки{ display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }
      .${ДОМ} .шаг-кнопка{ min-height:46px; padding:9px 16px; font-size:16px; font-family:Georgia,serif;
        border:2px solid #6b4a2a; border-radius:10px; background:#fdf6e0; color:#2b2118; cursor:pointer; }
      .${ДОМ} .шаг-кнопка.вперёд{ background:#e6f2dc; border-color:#5f9a6a; }
      .${ДОМ} .шаг-кнопка[disabled]{ opacity:.45; cursor:default; }
      .${ДОМ} .пример-живой{ font-family:Georgia,serif; font-size:24px; color:#e8e0cc; }
      .${ДОМ} .пример-живой b{ color:#ffd76a; }
      .${ДОМ} .живой{ margin:0; font-size:16px; color:#e8e0cc; text-align:center; }
      .${ДОМ} .вывод{ margin:0; font-size:16px; line-height:1.5; color:#2b2118; background:rgba(217,164,65,.16);
        border-left:4px solid #d9a441; border-radius:8px; padding:9px 12px; width:100%; }
      .${ДОМ} .тройки{ display:flex; gap:8px; }
      .${ДОМ} .тройка{ font-family:Georgia,serif; font-size:22px; color:#ffd76a; }
      .${ДОМ} .ряд-камней{ display:flex; gap:10px; }
      .${ДОМ} .число-камень{ width:46px; height:46px; display:flex; align-items:center; justify-content:center;
        background:#cfc4ad; border:2px solid #7c715c; border-radius:50%; font-family:Georgia,serif;
        font-size:20px; font-weight:bold; color:#2b2118; }
      .${ДОМ} .число-камень.стёрт{ background:#3a4d3f; border-color:#5f7a68; color:#8fa08f; }
      .${ДОМ} .знаки{ display:flex; gap:12px; }
      .${ДОМ} .ответ{ width:60px; height:54px; font-size:24px; font-weight:bold; font-family:Georgia,serif;
        border:2px solid #6b4a2a; border-radius:12px; background:#fdf6e0; color:#2b2118; cursor:pointer; }
      .${ДОМ} .ответ.верно{ background:#dff0d8; border-color:#5f9a6a; }
      .${ДОМ} .ответ.мимо{ background:#f7dcd8; border-color:#c9433a; }
      .${ДОМ} .памятка{ display:flex; flex-direction:column; gap:8px; width:100%; max-width:330px; }
      .${ДОМ} .строка{ display:flex; justify-content:space-between; align-items:baseline; gap:12px;
        background:#fdf6e0; border:2px solid #d9c9a8; border-radius:12px; padding:9px 14px; }
      .${ДОМ} .строка b{ font-size:22px; font-family:Georgia,serif; color:#2b2118; }
      .${ДОМ} .строка span{ font-size:14px; color:#4a3a26; text-align:right; }
      @media (max-width:360px){
        .${ДОМ} .реплика p{ font-size:16px; }
        .${ДОМ} .ответ{ width:52px; } .${ДОМ} .число-камень{ width:40px; height:40px; font-size:18px; }
      }
      @media (prefers-reduced-motion:reduce){
        .${ДОМ} .пых{ transition:none; } .${ДОМ} .светл{ animation:none; opacity:.7; }
      }
    `;
    document.head.appendChild(с);
  }

  /* ─────────── отрисовка ─────────── */
  function рисовать(el){
    стиль();
    const i = шаг(), к = КАДРЫ[i], st = сост(i);
    const готов = к.готов(st);
    el.innerHTML = `<div class="${ДОМ}">
      <div class="реплика">${пых(готов ? 'рад' : 'думает')}<p>${к.say}</p></div>
      ${к.рисуй(i, st)}
      ${готов || !к.делать ? '' : `<p class="живой">${к.делать}</p>`}
    </div>`;
  }

  /* ─────────── регистрация ─────────── */
  window.WAVE_B = window.WAVE_B || {};
  window.WAVE_B[ID] = function(el){
    try { рисовать(el); }
    catch(e){ el.innerHTML = ''; try{ console.error('лист ' + ID + ':', e); }catch(_){} }
  };

  if (window.ARH_LESSONS && !window.ARH_LESSONS.some(x => x.id === ID)){
    window.ARH_LESSONS.push({
      id: ID, title: 'Тропинка чисел: луч, сложение и вычитание', ico: '🪨',
      src: 'Начальная школа · 1 класс · Числовой луч: сложение и вычитание',
      subj: 'jun',
      explain: КАДРЫ.map((к, i) => (i + 1) + '. ' + к.t),
      check: {
        q: 'Пых стоит на камне 4, дом на камне 9. Сколько шагов вперёд ему прыгнуть?',
        choices: ['3', '4', '5', '6'],
        ans: 2,
        exp: 'Считаем шаги по тропинке: 4 → 5 → 6 → 7 → 8 → 9. Получается 5 шагов, потому что 4 + 5 = 9.'
      },
      tasks: [
        {q:'Пых на камне 6. Он прыгнул 3 раза вперёд. Где он?', kind:'unit', ans:9, tol:0,
         hints:['Прыжок вперёд — это прибавление.','6 + 3 = 9.'], sol:'9'},
        {q:'Пых на камне 8, прыгнул 2 раза назад. Где он?', kind:'unit', ans:6, tol:0,
         hints:['Прыжок назад — это вычитание.','8 − 2 = 6.'], sol:'6'},
        {q:'Пых прыгает по три: 0, 3, 6, … Какое число следующее?', kind:'choice',
         choices:['7','8','9','10'], ans:2, tol:0,
         hints:['Каждый раз прибавляем три.','6 + 3 = 9.'], sol:'9'}
      ]
    });
  }
})();
