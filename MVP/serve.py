#!/usr/bin/env python3
"""Static server + Python physics API. HTML/JS — no-store, картинки можно кэшировать."""
import json
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse, unquote

ROOT = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(ROOT, 'sim'))
from physics import handle  # noqa: E402


def cache_for(path):
    low = unquote(path.split('?', 1)[0]).lower()
    base = os.path.basename(low)
    if low.endswith(('.html', '.htm')) or base == 'sw.js' or low.endswith('.webmanifest') or low.endswith(('.js', '.css', '.json', '.mjs')):
        return {
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    if low.endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.svg', '.woff2', '.woff')):
        return {'Cache-Control': 'public, max-age=604800'}
    return {'Cache-Control': 'no-cache, max-age=0'}


class NoCache(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        for k, v in cache_for(self.path).items():
            self.send_header(k, v)
        super().end_headers()

    def log_message(self, fmt, *args):
        pass

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path.startswith('/api/sim/'):
            kind = parsed.path.rstrip('/').split('/')[-1]
            q = {k: v[0] for k, v in parse_qs(parsed.query).items()}
            try:
                body = json.dumps(handle(kind, q), ensure_ascii=False).encode('utf-8')
            except Exception as e:
                body = json.dumps({'error': str(e)}).encode('utf-8')
                self.send_response(400)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        return super().do_GET()


if __name__ == '__main__':
    os.chdir(ROOT)
    httpd = ThreadingHTTPServer(('0.0.0.0', 8080), NoCache)
    httpd.serve_forever()
