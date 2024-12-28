let tasks = [];
// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];
// Set the min attribute of the date input to today's date
document.getElementById('dateInput').setAttribute('min', today);

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');

    const task = taskInput.value.trim();
    const date = dateInput.value;

    if (task && date && !isNaN(Date.parse(date))) {
        tasks.push({ task: task, date: date, completed: false });
        taskInput.value = "";
        dateInput.value = "";
        updateTaskList();
        saveTasks();
    } else {
        alert('Please enter a valid task and date.');
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
};

const deleteTask = (index) => {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        updateTaskList();
    }
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    taskInput.value = tasks[index].task;
    dateInput.value = tasks[index].date;
    tasks.splice(index, 1);
    updateTaskList();
};

const updateTaskList = () => {
    const tasklist = document.getElementById('taskList');
    tasklist.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                <div class="taskDetails">
                    <h3>${task.task}</h3>
                    <p class="taskDate">${task.date}</p>
                </div>
            </div>
            <div class="operation">
                <i class="fa-solid fa-pen-to-square" onclick="editTask(${index})"></i>
                <i class="fa-solid fa-trash" onclick="deleteTask(${index})"></i>
            </div>
        </div>`;
        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
        tasklist.append(listItem);
    });
    saveTasks();
};

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        updateTaskList();
    }
};

document.getElementById("addButton").addEventListener("click", addTask);
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

window.onload = loadTasks;
