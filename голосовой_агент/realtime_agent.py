#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""АРХИМЕД · Голосовой агент Яндекса (Realtime API, речь->LLM->речь).
Запуск: python3 realtime_agent.py  — говорите в микрофон, агент отвечает голосом. Выход: Ctrl+C.
Зависимости: pip install aiohttp yandex_ai_studio_sdk
Настройки (ваши): каталог, ключ (из ключ_яндекса.txt), модель, PROMPT_ID агента.
"""
from __future__ import annotations
import asyncio, base64, json, logging, sys, os
import aiohttp

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.py-libs'))
try:
    from yandex_ai_studio_sdk._experimental.audio.microphone import AsyncMicrophone
    from yandex_ai_studio_sdk._experimental.audio.out import AsyncAudioOut
except Exception as e:
    print("Нужен SDK:  pip install yandex_ai_studio_sdk  (", e, ")")
    sys.exit(1)

FOLDER = "b1gls27f7g5coiunr5mt"
MODEL = "speech-realtime-260528/latest"
PROMPT_ID = "aipsdas460c1epis87m1"
KEY = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'ключ_яндекса.txt')).read().strip()

WSS = f"wss://ai.api.cloud.yandex.net/v1/realtime?model=gpt://{FOLDER}/{MODEL}"
HEADERS = {"Authorization": "Api-Key " + KEY}
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s", datefmt="%H:%M:%S")
logger = logging.getLogger("agent")

def b64e(b: bytes) -> str: return base64.b64encode(b).decode("ascii")
def b64d(s: str) -> bytes: return base64.b64decode(s)

def fn_output(item: dict) -> dict:
    return {"type": "conversation.item.create", "item": {"type": "function_call_output",
        "call_id": item.get("call_id"), "output": json.dumps({"ok": True}, ensure_ascii=False)}}

async def downlink(ws, audio_out):
    play_epoch = 0; cur_epoch = None
    async for msg in ws:
        if msg.type != aiohttp.WSMsgType.TEXT: continue
        m = json.loads(msg.data); t = m.get("type")
        if t == "session.created": logger.info("сессия %s", (m.get("session") or {}).get("id"))
        elif t == "session.updated": logger.info("промпт агента применён")
        elif t == "conversation.item.input_audio_transcription.completed":
            if m.get("transcript"): logger.info("вы сказали: %r", m["transcript"])
        elif t == "response.output_text.delta":
            if m.get("delta"): logger.info("агент (текст): %r", m["delta"])
        elif t == "input_audio_buffer.speech_started":
            play_epoch += 1; cur_epoch = None; await audio_out.clear()
        elif t == "response.created": cur_epoch = play_epoch
        elif t == "response.output_audio.delta":
            if cur_epoch == play_epoch and m.get("delta"):
                await audio_out.write(b64d(m["delta"]))
        elif t == "response.output_item.done":
            item = m.get("item") or {}
            if item.get("type") != "function_call": continue
            await ws.send_json(fn_output(item)); await ws.send_json({"type": "response.create"})
        elif t == "error": logger.error("сервер: %s", json.dumps(m, ensure_ascii=False)[:300])

async def uplink(ws):
    mic = AsyncMicrophone(samplerate=44100)
    async for pcm in mic:
        try: await ws.send_json({"type": "input_audio_buffer.append", "audio": b64e(pcm)})
        except aiohttp.ClientConnectionResetError: return

async def main():
    print("Голосовой агент АРХИМЕД (Яндекс Realtime). Говорите. Выход: Ctrl+C.")
    try:
        async with aiohttp.ClientSession() as s:
            async with s.ws_connect(WSS, headers=HEADERS, heartbeat=20.0) as ws:
                await ws.send_json({"type": "session.update", "session": {"prompt": {"id": PROMPT_ID}}})
                async with AsyncAudioOut(samplerate=44100) as out:
                    await asyncio.gather(uplink(ws), downlink(ws, out))
    except (KeyboardInterrupt, asyncio.CancelledError): pass
    finally: print("Выход.")

if __name__ == "__main__":
    asyncio.run(main())
