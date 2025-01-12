# Laravel Project with GraphQL Integration

## **Описание проекта**

Этот проект создан на основе Laravel и интегрирован с GraphQL с использованием пакета Lighthouse. Он предоставляет возможность автоматической генерации GraphQL-схем и CRUD-операций на основе Eloquent-моделей.

---

## **Установка**

1. Склонируйте репозиторий проекта:

    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```

2. Установите зависимости:

    ```bash
    composer install
    npm install
    ```

3. Скопируйте файл `.env.example` в `.env` и настройте параметры подключения к базе данных:

    ```bash
    cp .env.example .env
    ```

4. Генерируйте ключ приложения:

    ```bash
    php artisan key:generate
    ```

5. Настройте базу данных в `.env`:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ```

6. Запустите миграции:

    ```bash
    php artisan migrate
    ```

7. Запустите сервер разработки:
    ```bash
    php artisan serve
    ```

---

## **Основные команды**

### 1. **Генерация моделей**

Для автоматической генерации моделей на основе таблиц базы данных используйте:

```bash
php artisan code:models
```

Сгенерированные модели будут находиться в папке `app/Models`.

### 2. **Генерация GraphQL-схем**

Для генерации GraphQL-схем на основе моделей выполните:

```bash
php artisan graphql:generate-schemas
```

Схемы будут сохранены в папке `graphql/schemas`.

### 3. **Запуск сервера GraphQL**

Проверьте, что ваш GraphQL-эндпоинт доступен по адресу:

```
http://localhost:8000/graphql
```

### 4. **Доступ к GraphQL Playground**

Для удобного тестирования запросов и просмотра документации используйте GraphQL Playground, доступный по адресу:

```
http://localhost:8000/graphql-playground
```

---

## **Использование GraphQL**

### Примеры запросов и мутаций

#### 1. **Получение всех записей**

```graphql
query {
    Users {
        id
        name
        email
    }
}
```

#### 2. **Получение записей с пагинацией**

```graphql
query GetUsersPaginated {
    UserPaginated(first: 10, page: 1) {
        data {
            id
            name
            email
        }
        paginatorInfo {
            currentPage
            total
        }
    }
}
```

#### 3. **Создание записи**

```graphql
mutation {
    createUser(name: "John Doe", email: "john@example.com") {
        id
        name
        email
    }
}
```

#### 4. **Обновление записи**

```graphql
mutation {
    updateUser(id: 1, name: "Jane Doe", email: "jane@example.com") {
        id
        name
        email
    }
}
```

#### 5. **Удаление записи**

```graphql
mutation {
    deleteUser(id: 1) {
        id
    }
}
```

---

## **Синхронизация с базой данных**

### Шаги для синхронизации:

1. **Обновите таблицы в базе данных.**
   Убедитесь, что ваши таблицы базы данных соответствуют моделям Laravel.

2. **Обновите `fillable` поля в моделях.**
   Если были добавлены или удалены поля в таблицах, обновите массив `fillable` в соответствующих моделях.

3. **Перегенерируйте модели (если нужно):**

    ```bash
    php artisan code:models
    ```

4. **Перегенерируйте GraphQL-схемы:**

    ```bash
    php artisan graphql:generate-schemas
    ```

5. **Проверьте изменения в `/graphql`.**

---

## **Пагинация**

Количество записей, возвращаемых при пагинации, можно настроить:

1. **На уровне запросов:**
   Укажите аргумент `first` в GraphQL-запросе:

    ```graphql
    query {
        UserPaginated(first: 10, page: 1) {
            data {
                id
                name
            }
            paginatorInfo {
                total
            }
        }
    }
    ```

2. **Значение по умолчанию:**
   Измените глобальную настройку в `config/lighthouse.php`:
    ```php
    'paginate_default_count' => 10,
    ```

---

## **Тестирование**

1. Убедитесь, что GraphQL-эндпоинт доступен:

    ```bash
    curl -X POST -H "Content-Type: application/json" \
    -d '{"query":"{ Users { id name email } }"}' \
    http://localhost:8000/graphql
    ```

2. Используйте GraphQL Playground, Insomnia или Postman для отправки запросов.

---

## **Структура проекта**

-   `app/Models` — сгенерированные модели Eloquent.
-   `graphql/schemas` — автоматически сгенерированные GraphQL-схемы.
-   `routes/graphql.php` — маршрут для GraphQL.
-   `config/lighthouse.php` — конфигурация Lighthouse.

---

## **Дополнительно**

1. **Документация Lighthouse:**
   [Lighthouse Documentation](https://lighthouse-php.com/)

2. **GraphQL Code Generator (опционально):**
   Используйте [GraphQL Code Generator](https://www.graphql-code-generator.com/) для автоматической генерации хуков React.

---

## **Контакты**

Если у вас есть вопросы, пожалуйста, свяжитесь с [ваша контактная информация].
