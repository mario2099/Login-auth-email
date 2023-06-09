//Select DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", loadTodos);
todoButton.addEventListener("click", addTodo);
//todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//Functions
//getTodos() is replaced by loadTodos() | getTodos is for localstorage and loadTodos is for sql db
async function loadTodos(){
  const request = await fetch('api/todolist',{
    method:'GET',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const todos = await request.json();

  //Sort todos by id asc
  const sortedTodos = todos.sort((a, b) => a.id - b.id);

  //Iterate every element in the request
  for(let i=0; i<sortedTodos.length; i++) {
    const todoText = todos[i].todo;
    const todoId = todos[i].id;
    const todoCompleted = todos[i].completed;
    console.log(todos[i]);
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    if (todoCompleted===true){todoDiv.classList.add("completed")}; //check if its already completed

    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todoText;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    completedButton.onclick = function (){completeTodo(event, todoId)};
    todoDiv.appendChild(completedButton);

    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    trashButton.onclick = function (){deleteTodo(event, todoId)};
    todoDiv.appendChild(trashButton);

    //attach final Todo
    todoList.appendChild(todoDiv);
  }

}
async function addTodo(e) {

  //Prevent natural behaviour
  e.preventDefault();
  //POST request to API
  let data = {};
  data.todo = todoInput.value;
  data.completed = false;

  //console.log(JSON.stringify(data));
  const request = await fetch('api/todolist', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await request;
  const todoId = result.id;

  //Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  completedButton.onclick = function (){completeTodo(event, todoId)};
  todoDiv.appendChild(completedButton);

  //Create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  trashButton.onclick = function (){deleteTodo(event, todoId)};
  todoDiv.appendChild(trashButton);

  todoInput.value = ""; //clean input

  //attach final Todo
  todoList.appendChild(todoDiv);

}

async function deleteTodo(event, id) {
  const item = event.target;
  console.log("id: "+id+" |class: "+item.classList+ " |function: deleteTodo()");

  const todo = item.parentElement;
  todo.classList.add("fall");
  todo.addEventListener("transitionend", event => {todo.remove()}  );

  //DELETE request
  const request = await fetch('api/todolist/delete/'+id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const result = await request;
};
async function completeTodo(event, id) {

  const item = event.target;
  //console.log("id: "+id+" |class: "+item.classList+ " |function: completeTodo()");
  const todo = item.parentElement;
  console.log("item.parentElement: "+todo);
  if (todo.classList[1] === "completed"){
    todo.classList.remove("completed")
    console.log("funciono el if")
  }else{todo.classList.add("completed");};

  //PUT request
  const request = await fetch('api/todolist/complete/'+id, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const result = await request;
};

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}
