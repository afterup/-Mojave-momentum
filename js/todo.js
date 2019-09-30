const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

const TODOS_LOC = "toDos";

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    console.log(toDos);
    saveTodos();
}

function saveTodos(){
    localStorage.setItem(TODOS_LOC,JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerHTML = "X";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;

    todoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveTodos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    if(toDos.length >= 5){
        alert('Nope');
    }else{
        paintToDo(currentValue);
    }
    todoInput.value = "";
}

function loadToDos() {
    const loadedTodo = localStorage.getItem(TODOS_LOC);
    if(loadedTodo !== null){
        const parsedTodos = JSON.parse(loadedTodo);
        parsedTodos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    todoForm.addEventListener("submit",handleSubmit);
}

init();