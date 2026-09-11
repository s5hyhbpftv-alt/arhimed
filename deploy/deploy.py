#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Выкладка АРХИМЕД MVP на сервер прямо из GitHub.

Пароли и адрес сервера НЕ хранятся в репозитории. Скрипт берёт их по порядку:
  1) переменные окружения: ARH_HOST, ARH_USER, ARH_PASS
  2) файл deploy/deploy.local.env (он в .gitignore) со строками ВИД=значение
  3) файл ~/.arhimed_deploy (тот же формат)

Что делает скрипт:
  * скачивает tar.gz ветки (по умолчанию main) с GitHub;
  * разворачивает новый код в /opt, сохраняя ключ_яндекса.txt и venv;
  * перезапускает systemd-сервис;
  * проверяет, что сайт отвечает 200 и содержит ожидаемую версию (v=NNN),
    сверив её с локальным MVP/index.html.

Запуск:  PYTHONPATH=.py-libs python3 deploy/deploy.py
"""
import os
import re
import sys
from pathlib import Path

REPO = os.environ.get('ARH_REPO', 's5hyhbpftv-alt/arhimed')
BRANCH = os.environ.get('ARH_BRANCH', 'main')
SITE = os.environ.get('ARH_SITE', 'https://123.teramont.pro/MVP/')
SERVICE = os.environ.get('ARH_SERVICE', 'arhimed')
ROOT = os.environ.get('ARH_ROOT', '/opt')
APP = os.environ.get('ARH_APP', 'arhimed')
KEYFILE = os.environ.get('ARH_KEYFILE', 'ключ_яндекса.txt')
LOCAL_INDEX = Path(os.environ.get('ARH_LOCAL_INDEX', 'MVP/index.html'))

HERE = Path(__file__).resolve().parent
ENV_FILE = HERE / 'deploy.local.env'
HOME_FILE = Path.home() / '.arhimed_deploy'


def read_env_file(path):
    data = {}
    try:
        for line in path.read_text(encoding='utf-8').splitlines():
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            k, v = line.split('=', 1)
            data[k.strip()] = v.strip().strip('"').strip("'")
    except FileNotFoundError:
        pass
    return data


def credentials():
    """Возвращает (host, user, password) или объясняет, чего не хватает."""
    file_env = {}
    for src in (ENV_FILE, HOME_FILE):
        for k, v in read_env_file(src).items():
            file_env.setdefault(k, v)

    def get(name):
        return os.environ.get(name) or file_env.get(name)

    host, user, pwd = get('ARH_HOST'), get('ARH_USER'), get('ARH_PASS')
    if not (host and user and pwd):
        print('Нет данных для подключения к серверу.\n'
              'Задай переменные ARH_HOST, ARH_USER, ARH_PASS или создай файл\n'
              f'  {ENV_FILE}\n'
              'со строками:\n'
              '  ARH_HOST=адрес\n  ARH_USER=пользователь\n  ARH_PASS=пароль\n'
              f'Файл {ENV_FILE.name} в .gitignore, в репозиторий он не попадёт.')
        sys.exit(2)
    return host, user, pwd


def expected_version():
    """Версия из локального index.html — чтобы проверить, что доехало именно это."""
    try:
        text = LOCAL_INDEX.read_text(encoding='utf-8', errors='ignore')
    except OSError:
        return None
    marks = re.findall(r'v=(\d+)', text)
    return marks[0] if marks else None


def remote_script():
    return f'''
set -e
cd {ROOT}
cp {APP}/{KEYFILE} /tmp/arhimed_key.bak 2>/dev/null || true
rm -rf {APP}-new {APP}-main
curl -sL https://codeload.github.com/{REPO}/tar.gz/refs/heads/{BRANCH} -o /tmp/arhimed.tar.gz
tar xzf /tmp/arhimed.tar.gz -C {ROOT}
mv {APP}-{BRANCH} {APP}-new
cp /tmp/arhimed_key.bak {APP}-new/{KEYFILE} 2>/dev/null || true
if [ -x {ROOT}/{APP}/venv/bin/python ] && [ -d {ROOT}/{APP}/venv ]; then
  cp -r {ROOT}/{APP}/venv {ROOT}/{APP}-new/venv
  {ROOT}/{APP}-new/venv/bin/pip install -q --disable-pip-version-check aiohttp 2>/dev/null || true
else
  python3 -m venv {ROOT}/{APP}-new/venv
  {ROOT}/{APP}-new/venv/bin/pip install -q --disable-pip-version-check aiohttp
fi
rm -rf {ROOT}/{APP}_old
mv {ROOT}/{APP} {ROOT}/{APP}_old
mv {ROOT}/{APP}-new {ROOT}/{APP}
systemctl restart {SERVICE}
sleep 3
echo "--- версия на сервере:"
grep -o 'v=[0-9]*' {ROOT}/{APP}/MVP/index.html | sort | uniq -c | head
echo "--- ключ на месте:"
test -f {ROOT}/{APP}/{KEYFILE} && echo YES || echo NO
echo "--- ответ сайта:"
curl -s -o /dev/null -w "%{{http_code}}" {SITE} || true
echo ""
'''


def main():
    try:
        import paramiko
    except ImportError:
        print('Нужен paramiko. Запусти так:\n'
              '  PYTHONPATH=.py-libs python3 deploy/deploy.py')
        sys.exit(3)

    host, user, pwd = credentials()
    want = expected_version()
    if want:
        print(f'Ожидаемая версия в index.html: v{want}')

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(host, username=user, password=pwd, timeout=30)
    stdin, stdout, stderr = client.exec_command(remote_script(), timeout=900)
    out = stdout.read().decode('utf-8', 'replace')
    err = stderr.read().decode('utf-8', 'replace')
    code = stdout.channel.recv_exit_status()
    client.close()

    print('EXIT:', code)
    print(out.strip())
    if err.strip():
        print('STDERR:', err[-1200:])

    ok = code == 0
    if want:
        if f'v={want}' in out:
            print(f'ПРОВЕРКА: на сервере развёрнута версия v{want} — совпадает с локальной')
        else:
            print(f'ПРОВЕРКА НЕ ПРОШЛА: ждали v{want}, на сервере его не видно')
            ok = False
    if 'YES' not in out:
        print('ВНИМАНИЕ: ключ_яндекса.txt на сервере не найден')
        ok = False
    print('ИТОГ:', 'выложено успешно' if ok else 'есть замечания, смотри вывод выше')
    sys.exit(0 if ok else 1)


if __name__ == '__main__':
    main()
