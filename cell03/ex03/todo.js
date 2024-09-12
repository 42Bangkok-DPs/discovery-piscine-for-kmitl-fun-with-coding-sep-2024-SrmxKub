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
            if (confirm('Remove this TO DO?')) {
                todo.remove();
                saveTodos();
            }
        });
        ftList.insertBefore(todo, ftList.firstChild);
    }

    function saveTodos() {
        const todos = [];
        const tasks = document.querySelectorAll('.tasks');
        tasks.forEach(task => {
            todos.push(task.textContent);
        });
        document.cookie = `todos=${JSON.stringify(todos)};path=/`;
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