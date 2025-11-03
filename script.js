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
// login sistem 
let currentUser = 
localStorage.getItem('currentUser');
null;
function toggleMenu() {
    const menu = document.getElementById('menu-panel');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === '' || password === '') {
        alert('Isi username dan password!');
        return;
    }
    const savedUsers = JSON.parse(localStorage.getItem('users')) || {};
    if (!savedUsers[username]) {savedUsers[username] = {password};
        localStorage.setItem('users', JSON.stringify(savedUsers));                          
}
// validasi login
if (savedUsers[username].password !== password) {
    alert('Password salah!');
    return;
}
// simpan user yg login
currentUser = username;
localStorage.setItem('currentUser', username);
showLoggedInState(username);
loadTasks();
toggleMenu();
}
function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    showLoggedOutState();
    toggleMenu();
}
function showLoggedInState(username) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('logout-section').style.display = 'block';
    document.getElementById('welcome-message').textContent = `Selamat datang, ${username}!`;
    document.querySelector('header p').textContent = `Halo, ${username}! Berikut adalah daftar tugas harian Anda.`;
}
function showLoggedOutState() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('logout-section').style.display = 'none';
    document.querySelector('header p').textContent = 'Silakan masuk untuk mengelola tugas harian Anda.';
}                   
function saveTask(timeOfDay, taskText) {
    if (!currentUser) {
        alert('Silakan login terlebih dahulu untuk menyimpan tugas.');
    return; 
    }
    let userTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || {};
    if (!userTasks[timeOfDay]) userTasks[timeOfDay] = [];
    userTasks[timeOfDay].push(taskText);
    localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(userTasks));
}
function removeTask(timeOfDay, taskText) {
    if (!currentUser) return;
    let userTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || {};
    if (userTasks[timeOfDay]) {
        userTasks[timeOfDay] = userTasks[timeOfDay].filter(task => task !== taskText);
        localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(userTasks));
    }
}
function loadTasks() {
    ['morning', 'afternoon', 'evening'].forEach(timeOfDay => {
        const list = document.getElementById(`${timeOfDay}-list`);
        list.innerHTML = '';
        if (currentUser) return;
        const userTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || {};
        const tasks = userTasks[timeOfDay] || [];
        tasks.forEach(taskText => {
            const li = document.createElement('li');
            li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn
" onclick="deleteTask(this)">Delete</button>
`;
list.appendChild(li);
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    if (currentUser) {
        showLoggedInState(currentUser);
    } else {
        showLoggedOutState();
    }
});
