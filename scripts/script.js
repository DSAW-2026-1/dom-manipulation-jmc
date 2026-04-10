const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const taskCounter = document.getElementById("taskCounter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateEmptyMessage() {
  emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}

function updateCounter() {
  const completedTasks = tasks.filter(task => task.completed).length;
  taskCounter.textContent = `Tareas totales: ${tasks.length} | Completadas: ${completedTasks}`;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const taskLeft = document.createElement("div");
    taskLeft.classList.add("task-left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Marcar tarea como completada");

    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute("aria-label", "Eliminar tarea");

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskLeft.appendChild(checkbox);
    taskLeft.appendChild(span);

    li.appendChild(taskLeft);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  updateEmptyMessage();
  updateCounter();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTask = taskInput.value.trim();

  if (newTask === "") {
    return;
  }

  tasks.push({
    text: newTask,
    completed: false
  });

  saveTasks();
  renderTasks();
  taskForm.reset();
  taskInput.focus();
});

renderTasks();
