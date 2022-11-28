const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".form");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", getLocalStorage);
todoForm.addEventListener("submit", addTodo);
todoList.addEventListener("dblclick", deleteTask);

function addTodo(e) {
    e.preventDefault();
    
    if (todoInput.value.trim() != '') {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerHTML = todoInput.value;
        newTodo.classList.add("todo-item");

        todoDiv.appendChild(newTodo);

        // add task to localStorage
        saveLocalStorage(todoInput.value);

        todoList.appendChild(todoDiv);

        todoInput.value = "";
    }
}

function deleteTask(e) {
    const item = e.target;

    if (item.classList[0] === 'todo-item') {
        const todo = item.parentElement;
        removeLocalStorage(todo);
        todo.remove();
    }
}

function saveLocalStorage(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalStorage() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerHTML = todo;
        newTodo.classList.add("todo-item");

        todoDiv.appendChild(newTodo);

        todoList.appendChild(todoDiv);
    })
}

function removeLocalStorage(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos))
}