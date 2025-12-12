import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ GET /tasks — получить список задач
app.get("/tasks", (req, res) => {
  const data = fs.readFileSync("./tasks.json", "utf-8");
  const tasks = JSON.parse(data);
  res.json(tasks);
});

// ✅ POST /tasks — добавить новую задачу
app.post("/tasks", (req, res) => {
  const data = fs.readFileSync("./tasks.json", "utf-8");
  const tasks = JSON.parse(data);

  const newTask = {
    id: Date.now(),
    title: req.body.title,
    status: "сделать"
  };

  tasks.push(newTask);
  fs.writeFileSync("./tasks.json", JSON.stringify(tasks, null, 2));

  res.json(newTask);
});

// ✅ PUT /tasks/:id/status — сменить статус задачи
app.put("/tasks/:id/status", (req, res) => {
  const data = fs.readFileSync("./tasks.json", "utf-8");
  let tasks = JSON.parse(data);

  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Задача не найдена" });
  }

  // 🔁 переключение статуса
  if (task.status === "сделать") task.status = "в процессе";
  else if (task.status === "в процессе") task.status = "сделано";
  else task.status = "сделать";

  fs.writeFileSync("./tasks.json", JSON.stringify(tasks, null, 2));
  res.json(task);
});

// ✅ DELETE /tasks/:id — удалить задачу
app.delete("/tasks/:id", (req, res) => {
  const data = fs.readFileSync("./tasks.json", "utf-8");
  let tasks = JSON.parse(data);

  const taskId = parseInt(req.params.id, 10);
  tasks = tasks.filter((t) => t.id !== taskId);

  fs.writeFileSync("./tasks.json", JSON.stringify(tasks, null, 2));
  res.json({ success: true });
});

// ✅ запуск сервера
app.listen(3002, () => {
  console.log("Сервер запущен на http://localhost:3002");
});

export default app;
