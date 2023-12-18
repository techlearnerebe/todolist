document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        var li = document.createElement("li");
        li.innerHTML = `<span>${taskInput.value}</span>
                        <button onclick="toggleTaskCompletion(this)">Done</button>
                        <button onclick="removeTask(this)">Remove</button>`;
        taskList.appendChild(li);
        saveTask(taskInput.value);
        taskInput.value = "";
    }
}

function removeTask(button) {
    var li = button.parentNode;
    var taskText = li.firstChild.textContent;
    var taskList = li.parentNode;
    taskList.removeChild(li);
    removeTaskFromStorage(taskText);
}

function toggleTaskCompletion(button) {
    var li = button.parentNode;
    li.classList.toggle("completed");
    var taskText = li.firstChild.textContent;
    saveTaskCompletionToStorage(taskText);
}

function saveTask(task) {
    var tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromStorage(task) {
    var tasks = getTasksFromStorage();
    var index = tasks.indexOf(task);
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function getTasksFromStorage() {
    var tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    var tasks = getTasksFromStorage();
    var taskList = document.getElementById("taskList");

    tasks.forEach(function (task) {
        var li = document.createElement("li");
        li.innerHTML = `<span>${task}</span>
                        <button onclick="toggleTaskCompletion(this)">Done</button>
                        <button onclick="removeTask(this)">Remove</button>`;
        taskList.appendChild(li);
    });
}

function clearTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
}

function filterTasks() {
    var filter = document.getElementById("filter").value;
    var taskList = document.getElementById("taskList");
    var tasks = taskList.getElementsByTagName("li");

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var completed = task.classList.contains("completed");

        if (filter === "all" || (filter === "active" && !completed) || (filter === "completed" && completed)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    }
}

function saveTaskCompletionToStorage(task) {
    var completedTasks = getCompletedTasksFromStorage();
    if (!completedTasks.includes(task)) {
        completedTasks.push(task);
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    } else {
        removeTaskCompletionFromStorage(task);
    }
}

function removeTaskCompletionFromStorage(task) {
    var completedTasks = getCompletedTasksFromStorage();
    var index = completedTasks.indexOf(task);
    if (index !== -1) {
        completedTasks.splice(index, 1);
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }
}

function getCompletedTasksFromStorage() {
    var completedTasks = localStorage.getItem("completedTasks");
    return completedTasks ? JSON.parse(completedTasks) : [];
}
