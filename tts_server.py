#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""АРХИМЕД · сервер озвучки (Piper, русский нейроголос «Ирина»).
Запуск:  python3 tts_server.py   → http://127.0.0.1:8124/
- раздаёт проект (MVP/…), как обычный http.server;
- /tts?text=Привет → WAV с синтезом голоса (для теста голоса помощника).
"""
import http.server, socketserver, urllib.parse, os, io, wave, threading, urllib.request, urllib.error, json
from piper import PiperVoice

ROOT = os.path.dirname(os.path.abspath(__file__))
VOICE_PATH = os.path.join(ROOT, 'голоса', 'ru_voice.onnx')
CONFIG_PATH = VOICE_PATH + '.json'

def sk_key():
    k = os.environ.get('YANDEX_API_KEY', '').strip()
    if k: return k
    try:
        p = os.path.join(ROOT, 'ключ_яндекса.txt')
        with open(p, encoding='utf-8') as f:
            return f.readline().strip()
    except Exception:
        return ''

def sk_tts(text, voice='alena'):
    key = sk_key()
    if not key:
        return None, 'no-key'
    body = 'text=' + urllib.parse.quote(text) + '&lang=ru-RU&voice=' + voice + '&format=oggopus'
    req = urllib.request.Request('https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize',
        data=body.encode('utf-8'),
        headers={'Authorization': 'Api-Key ' + key, 'Content-Type': 'application/x-www-form-urlencoded'})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.read(), None
    except urllib.error.HTTPError as e:
        return None, 'http-' + str(e.code)
    except Exception as e:
        return None, 'err'
voice = None
lock = threading.Lock()

def synth(text):
    global voice
    with lock:
        if voice is None:
            voice = PiperVoice.load(VOICE_PATH, config_path=CONFIG_PATH)
        buf = io.BytesIO()
        wf = wave.open(buf, 'wb')
        voice.synthesize_wav(text, wf)
        wf.close()
        return buf.getvalue()

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)
    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
    def do_OPTIONS(self):
        self.send_response(200); self._cors(); self.end_headers()
    def do_GET(self):
        if self.path.startswith('/tts'):
            q = urllib.parse.urlparse(self.path)
            p = urllib.parse.parse_qs(q.query)
            text = (p.get('text', [''])[0] or '').strip()
            if not text:
                self.send_error(400, 'text required'); return
            try:
                data = synth(text)
                self.send_response(200)
                self._cors()
                self.send_header('Content-Type', 'audio/wav')
                self.send_header('Content-Length', str(len(data)))
                self.send_header('Cache-Control', 'max-age=3600')
                self.end_headers()
                self.wfile.write(data)
            except Exception as e:
                self.send_error(500, str(e))
            return
        if self.path.startswith('/sk'):
            q = urllib.parse.urlparse(self.path)
            p = urllib.parse.parse_qs(q.query)
            text = (p.get('text', [''])[0] or '').strip()
            voice = (p.get('voice', ['alena'])[0] or 'alena').strip()
            if not text:
                self.send_error(400, 'text required'); return
            data, err = sk_tts(text, voice)
            if err == 'no-key':
                self.send_response(503); self._cors(); self.send_header('Content-Type', 'application/json')
                msg = 'SpeechKit не настроен: положите API-ключ в файл ключ_яндекса.txt или в переменную YANDEX_API_KEY'
                self.end_headers(); self.wfile.write(json.dumps({'error':'no-key','hint':msg}, ensure_ascii=False).encode('utf-8')); return
            if data is None:
                hint = ('Ключ SpeechKit недействителен (401). Проверьте ключ (полностью, включая знак равенства в конце), '
                        'роль сервисного аккаунта ai.speechkit-tts.user и биллинг.') if (err or '').startswith('http-401') else ('Ошибка SpeechKit: ' + (err or 'fail'))
                self.send_response(502); self._cors(); self.send_header('Content-Type', 'application/json')
                self.end_headers(); self.wfile.write(json.dumps({'error':(err or 'fail'),'hint':hint}, ensure_ascii=False).encode('utf-8')); return
            self.send_response(200)
            self._cors()
            self.send_header('Content-Type', 'audio/ogg')
            self.send_header('Content-Length', str(len(data)))
            self.send_header('Cache-Control', 'max-age=3600')
            self.end_headers()
            self.wfile.write(data)
            return
        return super().do_GET()
    def log_message(self, *a): pass

if __name__ == '__main__':
    port = 8124
    with socketserver.ThreadingTCPServer(('127.0.0.1', port), Handler) as srv:
        print(f'АРХИМЕД-озвучка: http://127.0.0.1:{port}/  (/tts?text=Привет)')
        srv.serve_forever()
