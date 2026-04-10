const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateEmptyMessage() {
  emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("tarea");

    const infoTarea = document.createElement("div");
    infoTarea.classList.add("info-tarea");

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
    span.classList.add("texto-tarea");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completada");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.classList.add("btn-eliminar");
    deleteBtn.setAttribute("aria-label", "Eliminar tarea");

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    infoTarea.appendChild(checkbox);
    infoTarea.appendChild(span);

    li.appendChild(infoTarea);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  updateEmptyMessage();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTask = taskInput.value.trim();

  if (newTask === "") return;

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
