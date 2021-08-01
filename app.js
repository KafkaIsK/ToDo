// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

let ifCompleted;
let todoTask;
let todoObjectArray = [];

// Functions
function TodoObject(task, isCompleted) {
    this.task = task;
    this.isCompleted = isCompleted;
}

function addTodo(e) {
    // Prevent Submitting
    e.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.append(newTodo);

    todoTask = todoInput.value;
    const taskUndefined = new TodoObject(todoTask, false);
    todoObjectArray.push(taskUndefined);

    // Save to local storage
    // saveLocalTodos(todoInput.value);
    saveLocalTodos(taskUndefined);
    
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // Delete
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        // removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();

            let previousTodos = JSON.parse(localStorage.getItem("todoObjectsArray"));
            todoObjectArray = previousTodos;
            todoObjectArray.forEach(todoObject => {
                const index = todoObjectArray.indexOf(todoObject);
                if (todoObject.task === item.parentNode.firstChild.innerText) {
                    todoObjectArray.splice(index, 1);
                    // Update the Local Storage after deleting a Todo:
                    localStorage.setItem("todoObjectsArray", JSON.stringify(todoObjectArray));
                }
            });
        });
    }
    // Checkmark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');

        var n = todo.classList.contains("completed");
        const todoIndex = item.parentNode.firstChild.innerText;
        let previousTodos = JSON.parse(localStorage.getItem("todoObjectsArray"));
        todoObjectArray = previousTodos;
        todoObjectArray.forEach(arrayItem => {
            if (n === true && todoIndex === arrayItem.task) {
                arrayItem.isCompleted = true;
            } else if (n === false && todoIndex === arrayItem.task) {
                arrayItem.isCompleted = false;
            }
        })
        localStorage.setItem("todoObjectsArray", JSON.stringify(todoObjectArray));
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        const mStyle =todo.style;
        if (mStyle != undefined && mStyle != null) {
            switch(e.target.value) {
                case "all":
                    mStyle.display = 'flex';
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = 'none'
                    }
                    break;
                case "uncompleted": 
                    if (!todo.classList.contains('completed')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = 'none'
                    }
                    break;
            }
        }  
    });
}

function saveLocalTodos(todo) {
    // Check if any todos
    // let todos;
    // if (localStorage.getItem('todos') === null) {
    //     todos = [];
    // } else {
    //     todos = JSON.parse(localStorage.getItem('todos'));
    // }

    // todos.push(todo);
    // localStorage.setItem('todos', JSON.stringify(todos));

    let previousTodos = JSON.parse(localStorage.getItem("todoObjectsArray"));
    if (previousTodos === null) {
        previousTodos = [];
    }
    previousTodos.push(todo);
    localStorage.setItem("todoObjectsArray", JSON.stringify(previousTodos));
}

function getTodos() {
    // let todos;
    // if (localStorage.getItem('todos') === null) {
    //     todos = [];
    // } else {
    //     todos = JSON.parse(localStorage.getItem('todos'));
    // }
    // todos.forEach(todo => {
    //     const todoDiv = document.createElement('div');
    //     todoDiv.classList.add('todo');
    //     const newTodo = document.createElement('li');
    //     newTodo.innerText = todo;
    //     newTodo.classList.add('todo-item');
    //     todoDiv.append(newTodo);

    //     const completedButton = document.createElement('button');
    //     completedButton.innerHTML = '<i class="fas fa-check"></i>';
    //     completedButton.classList.add('complete-btn');
    //     todoDiv.appendChild(completedButton);

    //     const trashButton = document.createElement('button');
    //     trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    //     trashButton.classList.add('trash-btn');
    //     todoDiv.appendChild(trashButton);

    //     todoList.appendChild(todoDiv);
    // });

    localData = JSON.parse(localStorage.getItem("todoObjectsArray"));
    if (localData !== null) {
        localData.forEach(todoObject => {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
            const newTodo = document.createElement("li");
            newTodo.innerText = todoObject.task;

            if (todoObject.isCompleted === true) {
                todoDiv.classList.add("completed");
            }
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo);

            const completedButton = document.createElement("button");
            completedButton.innerHTML = "<i class='fas fa-check'> </i> "
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);

            const trashButton = document.createElement("button");
            trashButton.innerHTML = "<i class='fas fa-trash'> </i> "
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);

            todoList.appendChild(todoDiv);
        })
    }
}

function removeLocalTodos(todo) {
    // Check if any todos
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}