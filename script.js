// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask(timeOfDay) {
    const input = document.getElementById(`${timeOfDay}-input`);
    const taskText = input.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const list = document.getElementById(`${timeOfDay}-list`);
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;
    list.appendChild(li);

    // Save to localStorage
    saveTask(timeOfDay, taskText);

    // Clear input
    input.value = '';

    // Show color-based notification ✨
    showNotification(timeOfDay, "Yey, kegiatan anda berhasil ditambahkan!");
}

function deleteTask(button) {
    const li = button.parentElement;
    const list = li.parentElement;
    const timeOfDay = list.id.replace('-list', '');
    const taskText = li.querySelector('span').textContent;

    li.remove();
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
        const list = document.getElementById(`${timeOfDay}-list`);
        
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

// Fungsi notifikasi berwarna sesuai waktu
function showNotification(timeOfDay, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${timeOfDay}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Muncul pelan
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Hilang setelah 2,5 detik
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}
