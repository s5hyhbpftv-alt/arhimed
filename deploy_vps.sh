#!/usr/bin/env bash
# =============================================================================
# АРХИМЕД · автоустановка на VPS (Ubuntu 22.04/24.04, Debian 11/12)
# Запуск от root:  bash deploy_vps.sh  <ваш-домен>  <ключ_яндекса>
# Пример:          bash deploy_vps.sh  arhimed.ru   ВАШ_КЛЮЧ_ЯНДЕКСА
# =============================================================================
set -euo pipefail

DOMAIN="${1:-}"
KEY="${2:-}"
if [ -z "$DOMAIN" ]; then
  echo "Ошибка: укажите домен. Пример: bash deploy_vps.sh arhimed.ru AQVN..."
  exit 1
fi
if [ -z "$KEY" ]; then
  echo "Ошибка: укажите API-ключ Яндекса вторым аргументом."
  exit 1
fi

APP_DIR=/opt/arhimed
PORT=8130

echo "==> [1/7] Обновление системы и пакетов"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y python3 python3-venv python3-pip git nginx certbot python3-certbot-nginx curl

echo "==> [2/7] Клонирование проекта"
rm -rf "$APP_DIR"
git clone --depth 1 https://github.com/s5hyhbpftv-alt/arhimed.git "$APP_DIR"

echo "==> [3/7] Ключ Яндекса (хранится только на сервере)"
printf '%s\n' "$KEY" > "$APP_DIR/ключ_яндекса.txt"
chmod 600 "$APP_DIR/ключ_яндекса.txt"

echo "==> [4/7] Python-окружение"
python3 -m venv "$APP_DIR/venv"
"$APP_DIR/venv/bin/pip" install --upgrade pip -q
"$APP_DIR/venv/bin/pip" install aiohttp -q

echo "==> [5/7] systemd-сервис (шлюз: приложение + голосовой агент)"
cat > /etc/systemd/system/arhimed.service <<EOF
[Unit]
Description=Arhimed gateway (app + voice agent)
After=network.target

[Service]
Type=simple
WorkingDirectory=$APP_DIR
ExecStart=$APP_DIR/venv/bin/python3 $APP_DIR/шлюз_сервер.py $PORT
Restart=always
RestartSec=3
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable arhimed
systemctl restart arhimed
sleep 2
systemctl --no-pager status arhimed | head -5 || true

echo "==> [6/7] nginx (прокси с WebSocket)"
cat > /etc/nginx/sites-available/arhimed <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
        client_max_body_size 20m;
    }
}
EOF
ln -sf /etc/nginx/sites-available/arhimed /etc/nginx/sites-enabled/arhimed
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

echo "==> [7/7] HTTPS-сертификат (Let's Encrypt)"
certbot --nginx -d "$DOMAIN" --redirect --non-interactive --agree-tos \
  --register-unsafely-without-email --no-eff-email || echo "ВНИМАНИЕ: certbot не смог выпустить сертификат — проверьте, что DNS A-запись $DOMAIN указывает на этот сервер."

echo ""
echo "=========================================================="
echo "ГОТОВО! Приложение:  https://$DOMAIN/MVP/"
echo "Кнопка «Я Архимед — говори со мной» подключится к агенту"
echo "автоматически (wss://$DOMAIN/agent)."
echo "=========================================================="
