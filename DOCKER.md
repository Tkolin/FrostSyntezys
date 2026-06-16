# Запуск проекта в Docker

Полное окружение в одном `docker compose up`: база данных, бэкенд (Laravel + GraphQL),
фронтенд (React) и админка БД. Все зависимости (composer / npm / PHP-расширения)
ставятся **внутри образов** — на хосте ничего, кроме Docker, не нужно.

## Старт

```bash
docker compose up --build
```

Первый запуск дольше (сборка образов + установка зависимостей). При старте бэкенд сам:
дождётся БД → создаст `.env` → сгенерирует `APP_KEY` → выполнит миграции → заведёт
пользователя для входа.

## Адреса после запуска

| Сервис              | URL                                      |
|---------------------|------------------------------------------|
| Фронтенд (React)    | http://localhost:3000                    |
| GraphQL API         | http://localhost:8000/graphql            |
| GraphQL Playground  | http://localhost:8000/graphql-playground |
| phpMyAdmin (БД)     | http://localhost:8080                    |
| MySQL (напрямую)    | localhost:3306                           |

**Вход в приложение:** `admin` / `password` (а также `operator`, `engineer` — все с паролем `password`).
**Вход в phpMyAdmin:** пользователь `root`, пароль `root` (поле `DB_PASSWORD` в `.env`) —
авторизация подставляется автоматически.

> В `.env` по умолчанию `DB_SEED=true` — при старте БД наполняется демо-данными
> (термокосы, объекты с координатами, замеры температур, уведомления). После первого
> запуска поставьте `DB_SEED=false`, чтобы изменения в БД сохранялись между перезапусками.

## Настройка

Все параметры — в корневом файле [`.env`](.env): порты, пароль БД, данные админ-пользователя.

> ⚠️ `BACKEND_PORT` лучше не менять: фронтенд жёстко обращается к `http://localhost:8000/graphql`
> (см. [ApolloProvider.jsx](frontend/src/providers/ApolloProvider.jsx)).

### Демо-данные

Управляется флагом `DB_SEED` в `.env`. Пересеять вручную в работающем контейнере:

```bash
docker compose exec backend php artisan db:seed --force
```

Сидер ([DatabaseSeeder.php](backend/database/seeders/DatabaseSeeder.php)) каждый раз
очищает доменные таблицы и заполняет их связными данными.

## Полезные команды

```bash
docker compose up -d --build      # запустить в фоне
docker compose logs -f backend    # логи бэкенда
docker compose exec backend php artisan migrate:fresh --seed   # пересоздать БД
docker compose down               # остановить
docker compose down -v            # остановить и удалить данные БД (том db_data)
```
