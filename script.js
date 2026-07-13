let tasks = [];

// Load tasks from Local Storage
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}

// Add button event
document.getElementById("addBtn").addEventListener("click", addTask);

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    // Prevent empty task
    if (task === "") {
        alert("Task cannot be empty!");
        return;
    }
    tasks.push(task);
    saveTasks();
    displayTasks();
    input.value = "";
}

displayTasks();
function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(function (task, index) {
        let li = document.createElement("li");
        li.className = "list-group-item";

        li.innerHTML = `
           
        ${task}
            <button class="deleteBtn" onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

// Save tasks in Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}