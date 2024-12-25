
document.addEventListener('DOMContentLoaded', loadTasks);

const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let editingTaskId = null;

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        return;
    }

    if (editingTaskId !== null) {
        const tasks = getTasksFromLocalStorage();
        const taskIndex = tasks.findIndex(task => task.id === editingTaskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].text = taskText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            editingTaskId = null; 
        }
    } else {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        addTaskToLocalStorage(task);
    }

    displayTasks();
    taskInput.value = ''; 
});

function displayTasks() {
    taskList.innerHTML = '';
    const tasks = getTasksFromLocalStorage();

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.style.textDecoration = 'line-through';
        }

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editTask(task.id, task.text));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(taskText);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function addTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function deleteTask(id) {
    const tasks = getTasksFromLocalStorage().filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function editTask(id, text) {
    taskInput.value = text; 
    editingTaskId = id; 
}

function loadTasks() {
    displayTasks();
}

