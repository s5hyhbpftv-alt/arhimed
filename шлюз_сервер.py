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
import asyncio, base64, json, os, sys
from aiohttp import web, ClientSession, WSMsgType

ROOT = os.path.dirname(os.path.abspath(__file__))
FOLDER = "b1gls27f7g5coiunr5mt"
MODEL = "speech-realtime-260528/latest"
PROMPT = "aipsdas460c1epis87m1"


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


async def index(request):
    resp = web.FileResponse(os.path.join(ROOT, 'index.html'))
    resp.headers['Cache-Control'] = 'no-cache'
    return resp


def make_app():
    app = web.Application()
    app.router.add_get('/agent', agent_relay)
    # статика из корня проекта (MVP/, прототипы, документы)
    app.router.add_get('/{tail:.*}', static_handler)
    return app


async def static_handler(request):
    rel = request.match_info['tail'] or ''
    if not rel:
        resp = web.FileResponse(os.path.join(ROOT, 'index.html'))
        resp.headers['Cache-Control'] = 'no-cache'
        return resp
    path = os.path.normpath(os.path.join(ROOT, rel))
    if not path.startswith(ROOT):
        raise web.HTTPForbidden()
    if os.path.isdir(path):
        candidate = os.path.join(path, 'index.html')
        if os.path.isfile(candidate):
            return web.FileResponse(candidate)
        # листинг папки
        items = sorted(os.listdir(path))
        links = ''.join(f'<div><a href="{rel.rstrip("/")}/{x}">{x}</a></div>' for x in items if not x.startswith('.'))
        return web.Response(text=f'<meta charset="utf-8"><body style="font-family:Georgia;background:#0b1712;color:#e8e0cc;padding:20px"><h2>АРХИМЕД</h2>{links}</body>', content_type='text/html')
    if os.path.isfile(path):
        resp = web.FileResponse(path)
        # HTML и service worker всегда перепроверяются (чтобы обновления доходили сразу)
        low = path.lower()
        if low.endswith(('.html', '.htm')) or low.endswith('sw.js') or low.endswith('manifest.webmanifest'):
            resp.headers['Cache-Control'] = 'no-cache'
        return resp
    raise web.HTTPNotFound()


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8130
    print(f'АРХИМЕД-шлюз: http://0.0.0.0:{port}/  →  приложение http://127.0.0.1:{port}/MVP/')
    print(f'Живой агент (WS): ws://<хост>:{port}/agent  (ключ: {"есть" if load_key() else "НЕТ — положите в ключ_яндекса.txt"})')
    web.run_app(make_app(), host='0.0.0.0', port=port)
