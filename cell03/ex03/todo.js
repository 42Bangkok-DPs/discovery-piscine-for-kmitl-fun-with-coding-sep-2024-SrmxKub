document.addEventListener('DOMContentLoaded', () => {
    const ftList = document.getElementById('ft_list');
    const btn = document.getElementById('btn');
    loadTodos();

    btn.addEventListener('click', () => {
        const todoText = prompt('Enter a new TO DO:');
        if (todoText && todoText.trim() !== '') {
            addTodo(todoText);
            saveTodos();
        }
    });

    function addTodo(text) {
        const todo = document.createElement('div');
        todo.className = 'tasks';
        todo.textContent = text;
        todo.addEventListener('click', () => {
            if (confirm('Delete this TO DO?')) {
                todo.remove();
                saveTodos();
            }
        });
        ftList.prepend(todo);
    }

    function saveTodos() {
        const todos = [];
        const tasks = document.querySelectorAll('.tasks');
        tasks.forEach(task => {
            todos.push(task.textContent);
        });
        const expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + (7 * 24 * 60 * 60 * 1000));
        const expires = `expires=${expireDate.toUTCString()}`;
        document.cookie = `todos=${JSON.stringify(todos)};${expires};path=/`;
    }

    function loadTodos() {
        const cookies = document.cookie.split('; ');
        const todoCookie = cookies.find(row => row.startsWith('todos='));
        if (todoCookie) {
            const todos = JSON.parse(todoCookie.split('=')[1]);
            todos.forEach(todo => {
                addTodo(todo);
            });
        }
    }
});