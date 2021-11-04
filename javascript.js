var taskBtn = document.getElementById("my-button");
var taskInput = document.getElementById("task");
var list = document.getElementById("list");
var deletes = document.getElementsByClassName("delete");
var deleteAllBtn = document.getElementById("ultimateDelete");
var deleteCheckedBtn = document.getElementById("clearCompleted");
var todoCounter = document.getElementById("todoCounter");
var buttonDiv = document.getElementById("buttons");

loadFromLocalStorage();

function createTodo() {
  if(taskInput.value != ""){
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value));

    li.addEventListener("click", checkTodo);
    
    let btn = document.createElement("button");
    btn.appendChild(document.createTextNode("x"));
    btn.className = "delete";
    btn.addEventListener("click", deleteTodo);
    
    li.appendChild(btn);
    list.appendChild(li);
    
    taskInput.value = "";
    taskInput.focus();

    buttonDiv.style.display = "inline-block";

    saveToLocalStorage();
    counter()
  } else {
    alert("Please type something in the 'Write task' box first!")
  }
}

function deleteTodo() {
  parent = this.parentElement;
  list.removeChild(parent)

  if(list.children.length == 0){
    buttonDiv.style.display = "none";
  }
  saveToLocalStorage();
  counter()
};

function deleteAllTodo() {
  list.innerHTML = "";

  buttonDiv.style.display = "none";
  saveToLocalStorage();
  counter()
}

function deleteChecked() {
  let checked = document.getElementsByClassName("checked");
  let checkedLength = checked.length;
  if(checkedLength != 0) {
    for(i = 0; i < checkedLength; i++) {
      list.removeChild(checked[0])
    }
  }
}

function checkTodo() {
  if(this.className == "checked") {
    this.className = "";
  } else {
    this.className = "checked"
  }
  saveToLocalStorage();
  counter()
};

function counter() {
  let amountChecked = document.getElementsByClassName("checked").length;
  todoCounter.innerHTML = (list.children.length - amountChecked);
}

taskBtn.addEventListener("click", createTodo);
deleteAllBtn.addEventListener("click", deleteAllTodo);
deleteCheckedBtn.addEventListener("click", deleteChecked)

document.getElementsByTagName("form")[0].addEventListener( "submit", function(event) { event.preventDefault(); } );

function saveToLocalStorage() {
  let todoList = [];
  for(i = 0; i < list.children.length; i++) {
    let todo = {
      text: list.children[i].childNodes[0].nodeValue,
      class: list.children[i].className
    }
    todoList.push(todo);    
  }
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function loadFromLocalStorage() {
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  if(todoList != null) {
    for(i = 0; i < todoList.length; i++) {
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(todoList[i].text));
      li.className = todoList[i].class;

      li.addEventListener("click", checkTodo);
      
      let btn = document.createElement("button");
      btn.appendChild(document.createTextNode("x"));
      btn.className = "delete";
      btn.addEventListener("click", deleteTodo);
      
      li.appendChild(btn);
      list.appendChild(li);
    }
    buttonDiv.style.display = "inline-block";
  }
  counter()
}