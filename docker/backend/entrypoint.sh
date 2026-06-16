#!/usr/bin/env bash
set -e

cd /var/www/html

# --- .env ---
if [ ! -f .env ]; then
    cp .env.example .env
fi

set_env () {
    local key="$1"
    local val="$2"
    if grep -qE "^${key}=" .env; then
        sed -i "s|^${key}=.*|${key}=${val}|" .env
    else
        echo "${key}=${val}" >> .env
    fi
}

set_env APP_ENV      "${APP_ENV:-local}"
set_env APP_DEBUG    "${APP_DEBUG:-true}"
set_env APP_URL      "${APP_URL:-http://localhost:8000}"
set_env DB_CONNECTION "${DB_CONNECTION:-mysql}"
set_env DB_HOST      "${DB_HOST:-db}"
set_env DB_PORT      "${DB_PORT:-3306}"
set_env DB_DATABASE  "${DB_DATABASE:-backend}"
set_env DB_USERNAME  "${DB_USERNAME:-root}"
set_env DB_PASSWORD  "${DB_PASSWORD:-root}"

# --- Ключ приложения ---
if ! grep -qE "^APP_KEY=base64:" .env; then
    php artisan key:generate --force
fi

# --- Права на запись ---
chmod -R 775 storage bootstrap/cache 2>/dev/null || true

# --- Ожидание базы данных ---
echo "Ожидание базы данных ${DB_HOST}:${DB_PORT} ..."
until php -r "try { new PDO('mysql:host=${DB_HOST};port=${DB_PORT}', '${DB_USERNAME}', '${DB_PASSWORD}'); } catch (Throwable \$e) { exit(1); }"; do
    sleep 2
done
echo "База данных доступна."

# Сбрасываем возможный кеш конфигурации, чтобы подхватились env из контейнера
php artisan config:clear || true

# --- Миграции ---
php artisan migrate --force

# --- Опциональный полный сидинг демо-данными ---
if [ "${DB_SEED}" = "true" ]; then
    php artisan db:seed --force || true
fi

# --- Гарантируем наличие пользователя для входа (логин выполняется по полю name) ---
php artisan tinker --execute "App\Models\User::firstOrCreate(['name' => getenv('ADMIN_NAME') ?: 'admin'], ['email' => getenv('ADMIN_EMAIL') ?: 'admin@example.com', 'password' => Illuminate\Support\Facades\Hash::make(getenv('ADMIN_PASSWORD') ?: 'password')]);" || true

echo "Бэкенд готов. GraphQL: http://localhost:8000/graphql | Playground: http://localhost:8000/graphql-playground"

exec php artisan serve --host=0.0.0.0 --port=8000
