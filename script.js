// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask(timeOfDay) {
    const input = document.getElementById('${timeOfDay}-input');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const list = document.getElementById('${timeOfDay}-list');
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;
    list.appendChild(li);
    
    // Save to localStorage
    saveTask(timeOfDay, taskText);
    
    input.value = '';
}

function deleteTask(button) {
    const li = button.parentElement;
    const list = li.parentElement;
    const timeOfDay = list.id.replace('-list', '');
    const taskText = li.querySelector('span').textContent;
    
    li.remove();
    
    // Remove from localStorage
    removeTask(timeOfDay, taskText);
}

function saveTask(timeOfDay, taskText) {
    let tasks = JSON.parse(localStorage.getItem(timeOfDay)) || [];
    tasks.push(taskText);
    localStorage.setItem(timeOfDay, JSON.stringify(tasks));
}

function removeTask(timeOfDay, taskText) {
    let tasks = JSON.parse(localStorage.getItem(timeOfDay)) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem(timeOfDay, JSON.stringify(tasks));
}

function loadTasks() {
    ['morning', 'afternoon', 'evening'].forEach(timeOfDay => {
        const tasks = JSON.parse(localStorage.getItem(timeOfDay)) || [];
        const list = document.getElementById('${timeOfDay}-list');
        
        tasks.forEach(taskText => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${taskText}</span>
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
            `;
            list.appendChild(li);
        });
    });
}
