const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task.text;
    li.appendChild(span);

    if (task.completed) {
      li.classList.add('completed');
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    span.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks(); // Save tasks after toggle
    });

    deleteBtn.addEventListener('click', () => {
      li.remove();
      saveTasks(); // Save tasks after deletion
    });
  });
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  const taskItems = taskList.querySelectorAll('li');

  taskItems.forEach(item => {
    const text = item.querySelector('span').textContent;
    const completed = item.classList.contains('completed');
    tasks.push({ text, completed });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    taskInput.value = '';

    span.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks(); // Save tasks after toggle
    });

    deleteBtn.addEventListener('click', () => {
      li.remove();
      saveTasks(); // Save tasks after deletion
    });

    saveTasks(); // Save tasks immediately after adding a new one
  }
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask(); // Trigger the addTask function when Enter is pressed
  }
});

// Load tasks when the page is loaded
window.addEventListener('load', loadTasks);
