#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""АРХИМЕД · единый шлюз для работы с телефона (статика + живой голосовой агент).
Запуск:  python3 шлюз_сервер.py   →  http://0.0.0.0:8130/MVP/  (агент: ws://хост:8130/agent)

Один порт раздаёт:
  - всё приложение (MVP/, прототипы, документы) — как http.server;
  - WS /agent — ретранслятор к Yandex Realtime (голосовой агент, ключ из ключ_яндекса.txt).

Благодаря одному порту работает и в локальной сети (http://IP:8130/MVP/),
и через публичный туннель (cloudflared/ngrok) со звуком и агентом.
"""
import asyncio, base64, hashlib, json, os, re, secrets, sys, time
from aiohttp import web, ClientSession, WSMsgType

ROOT = os.path.dirname(os.path.abspath(__file__))
FOLDER = "b1gls27f7g5coiunr5mt"
MODEL = "speech-realtime-260528/latest"
PROMPT = "aipsdas460c1epis87m1"

# ==================== код ребёнка и кабинет родителя ====================
# Данные лежат ВНЕ каталога приложения: выкладка меняет /opt/arhimed целиком,
# и всё, что записано внутрь, при обновлении теряется.
ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'      # без похожих букв и цифр
CODE_RE = re.compile(r'^ARH-[A-Z0-9]{4}-[A-Z0-9]{2}$')
MAX_BODY = 400 * 1024                              # снимок прогресса не больше 400 КБ
MAX_NOTES = 40
_tlock = asyncio.Lock()


def data_dir():
    d = (os.environ.get('ARH_DATA') or '').strip()
    if not d:
        d = '/opt/arhimed-data' if (os.path.isdir('/opt') and os.access('/opt', os.W_OK)) \
            else os.path.join(ROOT, 'данные_родителей')
    try:
        os.makedirs(os.path.join(d, 'kids'), exist_ok=True)
    except Exception:
        pass
    return d


def kid_file(code):
    return os.path.join(data_dir(), 'kids', code + '.json')


def new_code():
    return 'ARH-' + ''.join(secrets.choice(ALPHABET) for _ in range(4)) + '-' \
                  + ''.join(secrets.choice(ALPHABET) for _ in range(2))


def pin_hash(salt, pin):
    return hashlib.sha256((salt + ':' + str(pin)).encode('utf-8')).hexdigest()


def load_kid(code):
    try:
        with open(kid_file(code), encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return None


def save_kid(rec):
    path = kid_file(rec['code'])
    tmp = path + '.tmp'
    try:
        with open(tmp, 'w', encoding='utf-8') as f:
            json.dump(rec, f, ensure_ascii=False, separators=(',', ':'))
        os.replace(tmp, path)
    except Exception:
        try:
            os.remove(tmp)
        except Exception:
            pass
        return False
    return True


def norm_rec(rec):
    """Старые записи (до разделения PIN) приводим к новому виду."""
    if rec.get('pin') and not rec.get('ppin'):
        rec['ppin'] = rec.pop('pin')
        rec['psalt'] = rec.get('salt') or secrets.token_hex(8)
    rec.setdefault('ppin', None)
    rec.setdefault('psalt', rec.get('salt') or secrets.token_hex(8))
    rec.setdefault('dpin', None)
    rec.setdefault('salt', secrets.token_hex(8))
    rec.setdefault('token', '')
    rec.setdefault('linked', 1 if rec.get('token') else 0)
    rec.setdefault('unlinked', 0)
    rec.setdefault('fails_d', 0); rec.setdefault('fails_p', 0)
    rec.setdefault('blocked_d_until', 0); rec.setdefault('blocked_p_until', 0)
    rec.setdefault('limits', {'minutes': 0}); rec.setdefault('notes', [])
    return rec


def public_rec(rec):
    """То, что уходит родителю: снимок прогресса, лимит и заметки."""
    return {'ok': True,
            'code': rec['code'],
            'child': (rec.get('data') or {}).get('profile') or {},
            'data': rec.get('data'),
            'limits': rec.get('limits') or {},
            'notes': rec.get('notes') or [],
            'updated': rec.get('updated') or 0,
            'pinSet': bool(rec.get('ppin')),
            'linked': int(rec.get('linked') or 0),
            'childPin': bool(rec.get('dpin')),
            'unlinked': rec.get('unlinked') or 0}


async def kid_api(request):
    """Одно окно для всех действий: так проще проверять и меньше адресов."""
    if request.method == 'GET':
        return web.json_response({'ok': True, 'service': 'arhimed-kid', 'dir': os.path.basename(data_dir())},
                                 headers={'Cache-Control': 'no-store'})
    try:
        body = await request.json()
    except Exception:
        body = {}
    if not isinstance(body, dict):
        body = {}
    act = str(body.get('act') or '')
    code = str(body.get('code') or '').strip().upper()
    no_store = {'Cache-Control': 'no-store'}

    def bad(err, **kw):
        return web.json_response(dict({'ok': False, 'err': err}, **kw), headers=no_store)

    # --- создать нового ребёнка: код + ключ устройства ---
    if act == 'new':
        async with _tlock:
            for _ in range(6):
                c = new_code()
                if not os.path.exists(kid_file(c)):
                    break
            rec = {'code': c, 'token': secrets.token_hex(16), 'salt': secrets.token_hex(8),
                   'dpin': None, 'ppin': None, 'psalt': secrets.token_hex(8),
                   'linked': 0, 'unlinked': 0,
                   'fails_d': 0, 'fails_p': 0, 'blocked_d_until': 0, 'blocked_p_until': 0,
                   'created': int(time.time() * 1000), 'updated': 0,
                   'data': None, 'limits': {'minutes': 0}, 'notes': []}
            if not save_kid(rec):
                return bad('storage')
        return web.json_response({'ok': True, 'code': rec['code'], 'token': rec['token']}, headers=no_store)

    if not CODE_RE.match(code):
        return bad('code')

    rec = load_kid(code)
    if not rec:
        return bad('notfound')
    rec = norm_rec(rec)

    # --- что известно про код: нужен ли PIN родителя, привязано ли устройство ---
    if act == 'probe':
        return web.json_response({'ok': True, 'code': code,
                                  'pinSet': bool(rec.get('ppin')),
                                  'childPin': bool(rec.get('dpin')),
                                  'linked': int(rec.get('linked') or 0),
                                  'unlinked': rec.get('unlinked') or 0}, headers=no_store)

    def check_pin(which, pin):
        """Проверка PIN: у ребёнка свой, у родителя свой; с блокировкой после 8 промахов."""
        field = 'dpin' if which == 'd' else 'ppin'
        salt = rec.get('salt') if which == 'd' else rec.get('psalt')
        fails = 'fails_d' if which == 'd' else 'fails_p'
        until = 'blocked_d_until' if which == 'd' else 'blocked_p_until'
        now = time.time()
        if rec.get(until, 0) > now:
            return ('blocked', int(rec[until] - now))
        if not re.match(r'^\d{4}$', pin):
            return ('pin4', None)
        if not rec.get(field):
            return ('nopin', None)
        if pin_hash(salt or '', pin) != rec[field]:
            rec[fails] = int(rec.get(fails) or 0) + 1
            if rec[fails] >= 8:
                rec[until] = now + 600
                rec[fails] = 0
            return ('pin', rec[fails])
        rec[fails] = 0
        rec[until] = 0
        return (None, None)

    # --- устройство ребёнка: первый вход, свой PIN ---
    if act == 'device':
        if rec.get('unlinked'):
            return bad('unlinked')
        if str(body.get('token') or '') != rec.get('token'):
            return bad('token')
        pin = str(body.get('pin') or '').strip()
        if not re.match(r'^\d{4}$', pin):
            return bad('pin4')
        if rec.get('dpin'):
            return bad('pinset')
        rec['dpin'] = pin_hash(rec['salt'], pin)
        rec['linked'] = 1
        rec['unlinked'] = 0
        async with _tlock:
            save_kid(rec)
        return web.json_response({'ok': True, 'code': rec['code'], 'linked': 1}, headers=no_store)

    # --- вход ребёнка: только свой PIN (устройство уже привязано) ---
    if act == 'enter':
        if rec.get('unlinked') or not rec.get('linked'):
            return bad('unlinked')
        err, extra = check_pin('d', str(body.get('pin') or '').strip())
        if err:
            if err == 'pin':
                async with _tlock:
                    save_kid(rec)
            return bad(err, **({'fails': extra} if extra is not None else {}))
        async with _tlock:
            save_kid(rec)
        return web.json_response({'ok': True, 'code': rec['code'], 'limits': rec.get('limits') or {},
                                  'notes': rec.get('notes') or [], 'updated': rec.get('updated') or 0},
                                 headers=no_store)

    # --- привязка заново (родитель отвязал устройство, ребёнок вводит свой PIN) ---
    if act == 'rebind':
        err, extra = check_pin('d', str(body.get('pin') or '').strip())
        if err:
            if err == 'pin':
                async with _tlock:
                    save_kid(rec)
            return bad(err, **({'fails': extra} if extra is not None else {}))
        rec['token'] = secrets.token_hex(16)
        rec['linked'] = 1
        rec['unlinked'] = 0
        async with _tlock:
            save_kid(rec)
        return web.json_response({'ok': True, 'code': rec['code'], 'token': rec['token']}, headers=no_store)

    # --- ребёнок присылает прогресс ---
    if act == 'sync':
        if not rec.get('linked') or rec.get('unlinked'):
            return bad('unlinked')
        if str(body.get('token') or '') != rec.get('token'):
            return bad('token')
        data = body.get('data')
        if not isinstance(data, dict):
            return bad('data')
        try:
            if len(json.dumps(data, ensure_ascii=False)) > MAX_BODY:
                return bad('big')
        except Exception:
            return bad('data')
        rec['data'] = data
        rec['updated'] = int(time.time() * 1000)
        async with _tlock:
            save_kid(rec)
        return web.json_response({'ok': True, 'limits': rec.get('limits') or {},
                                  'notes': rec.get('notes') or [], 'updated': rec['updated']},
                                 headers=no_store)

    # --- ребёнок забирает лимит и заметки ---
    if act == 'take':
        if not rec.get('linked') or rec.get('unlinked'):
            return bad('unlinked')
        if str(body.get('token') or '') != rec.get('token'):
            return bad('token')
        return web.json_response({'ok': True, 'limits': rec.get('limits') or {},
                                  'notes': rec.get('notes') or [],
                                  'updated': rec.get('updated') or 0}, headers=no_store)

    # --- родитель: первый вход задаёт свой PIN, дальше только проверка ---
    if act in ('claim', 'get', 'set', 'unlink', 'delparent'):
        pin = str(body.get('pin') or '').strip()
        now = time.time()
        if rec.get('blocked_p_until', 0) > now:
            return bad('blocked', wait=int(rec['blocked_p_until'] - now))
        if not re.match(r'^\d{4}$', pin):
            return bad('pin4')
        if not rec.get('ppin'):
            if act != 'claim':
                return bad('nopin')
            rec['ppin'] = pin_hash(rec['psalt'], pin)
            first = True
        else:
            if pin_hash(rec['psalt'], pin) != rec['ppin']:
                rec['fails_p'] = int(rec.get('fails_p') or 0) + 1
                if rec['fails_p'] >= 8:
                    rec['blocked_p_until'] = now + 600
                    rec['fails_p'] = 0
                async with _tlock:
                    save_kid(rec)
                return bad('pin', fails=rec['fails_p'])
            first = False
        rec['fails_p'] = 0
        rec['blocked_p_until'] = 0

        if act == 'unlink':
            rec['token'] = ''            # старое устройство больше не пустят
            rec['linked'] = 0
            rec['unlinked'] = int(time.time() * 1000)
            async with _tlock:
                save_kid(rec)
            return web.json_response({'ok': True, 'linked': 0}, headers=no_store)

        if act == 'delparent':
            # удаляем всё, что принадлежит родителю: PIN, лимит, заметки, отчёт
            rec['ppin'] = None
            rec['psalt'] = secrets.token_hex(8)
            rec['notes'] = []
            rec['limits'] = {'minutes': 0}
            rec['data'] = None
            rec['updated'] = 0
            rec['token'] = ''
            rec['linked'] = 0
            rec['unlinked'] = int(time.time() * 1000)
            async with _tlock:
                save_kid(rec)
            return web.json_response({'ok': True, 'deleted': 1}, headers=no_store)

        if act == 'set':
            lim = body.get('limits')
            if isinstance(lim, dict):
                try:
                    m = int(lim.get('minutes') or 0)
                except Exception:
                    m = 0
                rec['limits'] = {'minutes': max(0, min(600, m))}
            note = str(body.get('note') or '').strip()[:400]
            if note:
                notes = rec.get('notes') or []
                notes.append({'ts': int(time.time() * 1000), 'text': note})
                rec['notes'] = notes[-MAX_NOTES:]

        async with _tlock:
            save_kid(rec)
        out = public_rec(rec)
        out['first'] = first
        return web.json_response(out, headers=no_store)

    return bad('act')


def load_key():
    k = os.environ.get('YANDEX_API_KEY', '').strip()
    if k:
        return k
    try:
        with open(os.path.join(ROOT, 'ключ_яндекса.txt'), encoding='utf-8') as f:
            return f.readline().strip()
    except Exception:
        return ''


async def agent_relay(request):
    """WS-мост: браузер <-> Yandex Realtime (копия логики агент_сервер.py)."""
    name = (request.query.get('name') or 'друг')[:24]
    key = load_key()
    if not key:
        return web.json_response({'error': 'no-key',
                                  'hint': 'Положите API-ключ в ключ_яндекса.txt рядом с сервером'}, status=503)
    browser = web.WebSocketResponse(heartbeat=20)
    await browser.prepare(request)
    try:
        async with ClientSession() as sess:
            wss = f"wss://ai.api.cloud.yandex.net/v1/realtime?model=gpt://{FOLDER}/{MODEL}"
            headers = {"Authorization": "Api-Key " + key}
            async with sess.ws_connect(wss, headers=headers, heartbeat=20.0) as ya:
                greeted = {'v': False}

                async def ya_to_browser():
                    async for msg in ya:
                        if msg.type == WSMsgType.TEXT:
                            m = json.loads(msg.data)
                            t = m.get('type')
                            if t == 'session.created':
                                await browser.send_json({'type': 'note',
                                    'text': f'Сессия агента открыта (id {(m.get("session") or {}).get("id")})'})
                            elif t == 'session.updated' and not greeted['v']:
                                greeted['v'] = True
                                await ya.send_json({'type': 'conversation.item.create', 'item': {
                                    'type': 'message', 'role': 'user',
                                    'content': [{'type': 'input_text',
                                                 'text': f'Привет! Меня зовут {name}. Поздоровайся со мной по имени и коротко предложи решить олимпиадную задачку.'}]}})
                                await ya.send_json({'type': 'response.create'})
                                await browser.send_json({'type': 'note', 'text': f'Архимед здоровается с {name}…'})
                            elif t == 'conversation.item.input_audio_transcription.completed':
                                if m.get('transcript'):
                                    await browser.send_json({'type': 'note', 'text': 'Вы: ' + m['transcript']})
                            elif t == 'response.output_text.delta' and m.get('delta'):
                                await browser.send_json({'type': 'note', 'text': 'Архимед: ' + m['delta']})
                            await browser.send_str(msg.data)
                        elif msg.type in (WSMsgType.CLOSE, WSMsgType.CLOSED, WSMsgType.ERROR):
                            break

                async def browser_to_ya():
                    async for msg in browser:
                        if msg.type == WSMsgType.TEXT:
                            try:
                                m = json.loads(msg.data)
                                if m.get('type') == 'context':
                                    txt = 'Важно для тебя: ' + str(m.get('text', ''))
                                    await ya.send_json({'type': 'conversation.item.create', 'item': {
                                        'type': 'message', 'role': 'user',
                                        'content': [{'type': 'input_text', 'text': txt}]}})
                                    continue
                                if m.get('type') == 'ask':
                                    txt = str(m.get('text', ''))
                                    await ya.send_json({'type': 'conversation.item.create', 'item': {
                                        'type': 'message', 'role': 'user',
                                        'content': [{'type': 'input_text', 'text': txt}]}})
                                    await ya.send_json({'type': 'response.create'})
                                    continue
                            except Exception:
                                pass
                            try:
                                await ya.send_str(msg.data)
                            except Exception:
                                break
                        elif msg.type in (WSMsgType.CLOSE, WSMsgType.CLOSED):
                            break

                await ya.send_json({'type': 'session.update', 'session': {'prompt': {'id': PROMPT}}})
                await asyncio.gather(ya_to_browser(), browser_to_ya())
    except Exception as e:
        try:
            await browser.send_json({'type': 'error', 'text': f'Ошибка: {type(e).__name__}: {str(e)[:200]}'})
        except Exception:
            pass
    finally:
        try:
            await browser.close()
        except Exception:
            pass
    return browser


def apply_cache(resp, path):
    """HTML/JS/SW — не кэшировать. Картинки — можно."""
    low = str(path).lower()
    base = os.path.basename(low)
    if low.endswith(('.html', '.htm')) or base == 'sw.js' or low.endswith('.webmanifest'):
        resp.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
        resp.headers['Pragma'] = 'no-cache'
        resp.headers['Expires'] = '0'
    elif low.endswith(('.js', '.css', '.json', '.mjs', '.map')):
        resp.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
        resp.headers['Pragma'] = 'no-cache'
        resp.headers['Expires'] = '0'
    elif low.endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.svg', '.woff2', '.woff')):
        resp.headers['Cache-Control'] = 'public, max-age=604800'
    else:
        resp.headers['Cache-Control'] = 'no-cache, max-age=0'
    return resp


async def index(request):
    resp = web.FileResponse(os.path.join(ROOT, 'index.html'))
    return apply_cache(resp, 'index.html')


def make_app():
    app = web.Application(client_max_size=MAX_BODY + 64 * 1024)
    # код ребёнка и кабинет родителя — до раздачи статики, иначе перехватит catch-all
    app.router.add_get('/api/kid', kid_api)
    app.router.add_post('/api/kid', kid_api)
    app.router.add_get('/MVP/api/kid', kid_api)
    app.router.add_post('/MVP/api/kid', kid_api)
    app.router.add_get('/agent', agent_relay)
    # статика из корня проекта (MVP/, прототипы, документы)
    app.router.add_get('/{tail:.*}', static_handler)
    return app


async def static_handler(request):
    rel = request.match_info['tail'] or ''
    if not rel:
        resp = web.FileResponse(os.path.join(ROOT, 'index.html'))
        return apply_cache(resp, 'index.html')
    path = os.path.normpath(os.path.join(ROOT, rel))
    if not path.startswith(ROOT):
        raise web.HTTPForbidden()
    if os.path.isdir(path):
        candidate = os.path.join(path, 'index.html')
        if os.path.isfile(candidate):
            resp = web.FileResponse(candidate)
            return apply_cache(resp, candidate)
        # листинг папки
        items = sorted(os.listdir(path))
        links = ''.join(f'<div><a href="{rel.rstrip("/")}/{x}">{x}</a></div>' for x in items if not x.startswith('.'))
        resp = web.Response(text=f'<meta charset="utf-8"><body style="font-family:Georgia;background:#0b1712;color:#e8e0cc;padding:20px"><h2>АРХИМЕД</h2>{links}</body>', content_type='text/html')
        return apply_cache(resp, 'index.html')
    if os.path.isfile(path):
        resp = web.FileResponse(path)
        return apply_cache(resp, path)
    raise web.HTTPNotFound()


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8130
    print(f'АРХИМЕД-шлюз: http://0.0.0.0:{port}/  →  приложение http://127.0.0.1:{port}/MVP/')
    print(f'Живой агент (WS): ws://<хост>:{port}/agent  (ключ: {"есть" if load_key() else "НЕТ — положите в ключ_яндекса.txt"})')
    web.run_app(make_app(), host='0.0.0.0', port=port)
