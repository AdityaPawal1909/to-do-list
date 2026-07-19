// ================================
// VARIABLES
// ================================
let tasks = [];
let currentFilter = "all";
// ================================
// LOAD DATA FROM LOCAL STORAGE
// ================================
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}
// ================================
// SELECT ELEMENTS
// ================================
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");
// ================================
// BUTTON EVENTS
// ================================
addBtn.addEventListener("click", addTask);
// Press Enter to Add Task
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
// ================================
// ADD TASK
// ================================
function addTask() {
    let text = taskInput.value.trim();
    if (text === "") {
        alert("Please enter a task.");
        return;
    }
    const newTask = {
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString()
    };
    tasks.push(newTask);
    saveTasks();
    displayTasks();
    taskInput.value = "";
}
// ================================
// DISPLAY TASKS
// ================================
function displayTasks() {
    taskList.innerHTML = "";
    let filteredTasks = tasks;
    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }
    else if (currentFilter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }
    filteredTasks.forEach((task) => {
        const originalIndex = tasks.indexOf(task);
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `
        <div class="task-info">
            <span class="task-title ${task.completed ? "completed" : ""}">
                ${task.text}
            </span>
            <span class="task-date">
                ${task.createdAt}
            </span>
        </div>
        <div class="task-buttons">
            <button
                class="completeBtn"
                onclick="toggleComplete(${originalIndex})">
                ${task.completed ? "Undo" : "Done"}
            </button>
            <button
                class="editBtn"
                onclick="editTask(${originalIndex})">
                Edit
            </button>
            <button
                class="deleteBtn"
                onclick="deleteTask(${originalIndex})">
                Delete
            </button>
        </div>
        `;
        taskList.appendChild(li);
    });
    updateCounter();
}
// ================================
// UPDATE COUNTERS
// ================================
function updateCounter() {
    let total = tasks.length;
    let completed = tasks.filter(task => task.completed).length;
    let pending = total - completed;
    totalCount.textContent = total;
    completedCount.textContent = completed;
    pendingCount.textContent = pending;
}
// ================================
// SAVE TO LOCAL STORAGE
// ================================
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// ================================
// INITIAL DISPLAY
// ================================
displayTasks();
// ================================
// COMPLETE / UNDO TASK
// ================================
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}
// ================================
// EDIT TASK
// ================================
function editTask(index) {
    let updatedTask = prompt("Edit your task:", tasks[index].text);
    if (updatedTask === null) {
        return;
    }
    updatedTask = updatedTask.trim();
    if (updatedTask === "") {
        alert("Task cannot be empty.");
        return;
    }
    tasks[index].text = updatedTask;
    saveTasks();
    displayTasks();
}
// ================================
// DELETE TASK
// ================================
function deleteTask(index) {
    if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    }
}
// ================================
// SEARCH TASK
// ================================
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", function () {
    const searchText = searchInput.value.toLowerCase();
    const listItems = document.querySelectorAll("#taskList li");
    listItems.forEach(function (item) {
        const title = item.querySelector(".task-title")
            .textContent
            .toLowerCase();
        if (title.includes(searchText)) {
            item.style.display = "flex";
        }
        else {
            item.style.display = "none";
        }
    });
});
// ================================
// FILTER BUTTONS
// ================================
const filterButtons = document.querySelectorAll(".filterBtn");
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;
        displayTasks();
    });
});
// ================================
// DARK MODE
// ================================
const themeBtn = document.getElementById("themeBtn");
// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.textContent = "☀️ Light Mode";
}
// Toggle Theme
themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️ Light Mode";
    }
    else {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙 Dark Mode";
    }
});