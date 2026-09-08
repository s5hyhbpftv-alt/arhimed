#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Тест подключения к Yandex Realtime API (голосовой агент) — без микрофона.
Проверяет: ключ, каталог, модель и prompt.id.  Запуск: python3 connect_test.py
"""
import asyncio, json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.py-libs'))
import aiohttp

FOLDER = "b1gls27f7g5coiunr5mt"
MODEL = "speech-realtime-260528/latest"
PROMPT = "aipsdas460c1epis87m1"
KEY = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'ключ_яндекса.txt')).read().strip()

WSS = f"wss://ai.api.cloud.yandex.net/v1/realtime?model=gpt://{FOLDER}/{MODEL}"
HEADERS = {"Authorization": "Api-Key " + KEY}

async def main():
    print("Подключение к:", WSS)
    try:
        async with aiohttp.ClientSession() as s:
            async with s.ws_connect(WSS, headers=HEADERS, heartbeat=15.0, timeout=20.0) as ws:
                print("WS открыт. Шлю session.update с prompt.id =", PROMPT)
                await ws.send_json({"type": "session.update",
                                    "session": {"prompt": {"id": PROMPT}}})
                end = asyncio.get_event_loop().time() + 10
                while asyncio.get_event_loop().time() < end:
                    msg = await asyncio.wait_for(ws.receive(), timeout=6)
                    if msg.type == aiohttp.WSMsgType.TEXT:
                        m = json.loads(msg.data)
                        t = m.get("type")
                        if t in ("session.created", "session.updated"):
                            print("  ✔", t, "| session.id =", (m.get("session") or {}).get("id"))
                        elif t == "error":
                            print("  ✘ error:", json.dumps(m, ensure_ascii=False)[:400])
                        else:
                            print("  ·", t, str(m)[:120])
                    elif msg.type in (aiohttp.WSMsgType.CLOSED, aiohttp.WSMsgType.ERROR):
                        print("  закрыто:", msg.type); break
                print("Тест завершён (10 c).")
    except Exception as e:
        print("ОШИБКА:", type(e).__name__, str(e)[:300])

if __name__ == "__main__":
    asyncio.run(main())
