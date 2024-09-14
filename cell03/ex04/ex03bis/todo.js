$(document).ready(function() {
    const $ftList = $('#ft_list');
    const $btn = $('#btn');
    loadTodos();

    $btn.on('click', function() {
        const todoText = prompt('Enter a new TO DO:');
        if (todoText && todoText.trim() !== '') {
            addTodo(todoText);
            saveTodos();
        }
    });

    function addTodo(text) {
        const $todo = $('<div></div>', {
            class: 'tasks',
            text: text,
            click: function() {
                if (confirm('Delete this TO DO?')) {
                    $todo.remove();
                    saveTodos();
                }
            }
        });
        $ftList.prepend($todo);
    }

    function saveTodos() {
        const todos = [];
        $('.tasks').each(function(){
            todos.push($(this).text());
        });
        const expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + (7 * 24 * 60 * 60 * 1000));
        const expires = `expires=${expireDate.toUTCString()}`;
        // document.cookie = `todos=${JSON.stringify(todos)};${expires};path=/`;
        document.cookie = `todos=${encodeURIComponent(JSON.stringify(todos))};${expires};path=/`;

    }

    function loadTodos() {
        const cookies = document.cookie.split('; ');
        const todoCookie = cookies.find(row => row.startsWith('todos='));
        if (todoCookie) {
            // const todos = JSON.parse(todoCookie.split('=')[1]);
            const todos = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
            todos.reverse().forEach(todo => {
                addTodo(todo);
            });
        }
    }
});