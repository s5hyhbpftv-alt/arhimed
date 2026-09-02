#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""АРХИМЕД · сервер живого голосового агента (браузер <-> Yandex Realtime).
Запуск: python3 агент_сервер.py  →  ws://127.0.0.1:8125/agent?name=…
При подключении агент здоровается по имени (вставляем текстовую реплику с именем ребёнка).
"""
import asyncio, base64, json, os, sys
from aiohttp import web, ClientSession, WSMsgType

FOLDER = "b1gls27f7g5coiunr5mt"
MODEL = "speech-realtime-260528/latest"
PROMPT = "aipsdas460c1epis87m1"
KEY = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ключ_яндекса.txt')).read().strip()
WSS = f"wss://ai.api.cloud.yandex.net/v1/realtime?model=gpt://{FOLDER}/{MODEL}"
HEADERS = {"Authorization": "Api-Key " + KEY}

async def relay(request):
    name = (request.query.get('name') or 'друг')[:24]
    browser = web.WebSocketResponse(heartbeat=20)
    await browser.prepare(request)
    try:
        async with ClientSession() as sess:
            async with sess.ws_connect(WSS, headers=HEADERS, heartbeat=20.0) as ya:
                greeted = {'v': False}
                async def ya_to_browser():
                    async for msg in ya:
                        if msg.type == WSMsgType.TEXT:
                            m = json.loads(msg.data)
                            t = m.get('type')
                            if t == 'session.created':
                                await browser.send_json({'type':'note','text':f'Сессия агента открыта (id { (m.get("session") or {}).get("id") })'})
                            elif t == 'session.updated' and not greeted['v']:
                                greeted['v'] = True
                                # просим агента поздороваться по имени (текстовая реплика)
                                await ya.send_json({'type':'conversation.item.create','item':{
                                    'type':'message','role':'user','content':[{'type':'input_text',
                                    'text':f'Привет! Меня зовут {name}. Поздоровайся со мной по имени и коротко предложи решить олимпиадную задачку.'}]}})
                                await ya.send_json({'type':'response.create'})
                                await browser.send_json({'type':'note','text':f'Архимед здоровается с {name}…'})
                            elif t == 'conversation.item.input_audio_transcription.completed':
                                if m.get('transcript'): await browser.send_json({'type':'note','text':'Вы: '+m['transcript']})
                            elif t == 'response.output_text.delta' and m.get('delta'):
                                await browser.send_json({'type':'note','text':'Архимед: '+m['delta']})
                            await browser.send_str(msg.data)
                        elif msg.type in (WSMsgType.CLOSE, WSMsgType.CLOSED, WSMsgType.ERROR):
                            break
                async def browser_to_ya():
                    async for msg in browser:
                        if msg.type == WSMsgType.TEXT:
                            try:
                                m = json.loads(msg.data)
                                if m.get('type') == 'context':
                                    # контекст экрана (урок/задача) — добавляем как реплику-контекст
                                    txt = 'Важно для тебя: ' + str(m.get('text', ''))
                                    await ya.send_json({'type': 'conversation.item.create', 'item': {
                                        'type': 'message', 'role': 'user',
                                        'content': [{'type': 'input_text', 'text': txt}]}})
                                    continue
                                if m.get('type') == 'ask':
                                    # команда приложения (прочитай/подсказка/решение) — просим агента ответить голосом
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
                await ya.send_json({'type':'session.update','session':{'prompt':{'id':PROMPT}}})
                await asyncio.gather(ya_to_browser(), browser_to_ya())
    except Exception as e:
        try:
            await browser.send_json({'type':'error','text':f'Ошибка: {type(e).__name__}: {str(e)[:200]}'})
        except Exception:
            pass
    finally:
        try: await browser.close()
        except Exception: pass
    return browser

app = web.Application()
app.router.add_get('/agent', relay)

if __name__ == '__main__':
    print('Агент-сервер: ws://127.0.0.1:8125/agent  (голосовой агент Яндекса, prompt', PROMPT + ')')
    web.run_app(app, host='127.0.0.1', port=8125)
