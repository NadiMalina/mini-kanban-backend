# Mini Kanban — Backend API

Этот backend — часть проекта Mini Kanban, простой системы управления задачами.  
API реализован на Node.js + Express, хранит данные в `tasks.json` и покрыт тестами на Jest + Supertest.

---

## Возможности API

- Получение списка задач  
- Создание новой задачи  
- Обновление задачи (title и status)  
- Удаление задачи  
- Валидация входных данных  
- Обработка ошибок  
- Полное покрытие тестами

---

## Установка

```bash
npm install
```

---

## Запуск сервера

```bash
npm run dev
```

Сервер будет доступен по адресу:

```
http://localhost:3002
```

---

## Запуск тестов

```bash
npm test
```

---

## Структура проекта

```
mini-kanban-backend/
│
├── server.js
├── tasks.json
├── package.json
├── README.md
│
└── tests/
    └── tasks.test.js
```

---

## Формат задачи

```json
{
  "id": 1734060000000,
  "title": "Название задачи",
  "status": "todo"
}
```

### Возможные статусы

- `todo`
- `in-progress`
- `done`

---

# API Маршруты

## GET /tasks  
Получить список всех задач.

**Ответ:**

```json
[]
```

---

## POST /tasks  
Создать новую задачу.

### Тело запроса:

```json
{
  "title": "Новая задача"
}
```

### Ответ:

```json
{
  "id": 1734060000000,
  "title": "Новая задача",
  "status": "todo"
}
```

### Ошибки:

| Причина | Статус | Сообщение |
|--------|--------|-----------|
| title отсутствует | 400 | Title is required |
| title не строка | 400 | Title must be a string |
| title пустой | 400 | Title is required |
| title > 100 символов | 400 | Title is too long |

---

## PUT /tasks/:id  
Обновить title и/или status.

### Тело запроса:

```json
{
  "title": "Новое название",
  "status": "done"
}
```

### Ответ:

```json
{
  "id": 1734060000000,
  "title": "Новое название",
  "status": "done"
}
```

### Ошибки:

| Причина | Статус | Сообщение |
|--------|--------|-----------|
| задача не найдена | 404 | Task not found |
| неверный статус | 400 | Invalid status |
| пустой title | 400 | Title is required |
| title не строка | 400 | Title must be a string |
| title > 100 символов | 400 | Title is too long |

---

## DELETE /tasks/:id  
Удалить задачу.

### Ответ:

```json
{
  "message": "Task deleted"
}
```

---

## Покрытие тестами

Backend покрыт 11 тестами, включая:

- успешные сценарии  
- ошибки  
- валидацию  
- несуществующие ID  
- неверные типы данных  

Тесты находятся в:

```
tests/tasks.test.js
```

---

## Лицензия

MIT
