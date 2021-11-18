var taskBtn = document.getElementById("my-button");
var taskInput = document.getElementById("task");
var list = document.getElementById("list");
var deletes = document.getElementsByClassName("delete");
var deleteAllBtn = document.getElementById("ultimateDelete");
var deleteCheckedBtn = document.getElementById("clearCompleted");
var todoCounter = document.getElementById("todoCounter");
var buttonDiv = document.getElementById("buttons");

taskBtn.addEventListener("click", createTodo);
deleteAllBtn.addEventListener("click", deleteAllTodo);
deleteCheckedBtn.addEventListener("click", deleteChecked)

document.getElementsByTagName("form")[0].addEventListener( "submit", function(event) { event.preventDefault(); } );

loadFromLocalStorage();

function createTodo(name, checked) {
  let li = document.createElement("li");
  if(typeof(name) == "string") {
    li.appendChild(document.createTextNode(name));
  } else if(taskInput.value != "") {
    li.appendChild(document.createTextNode(taskInput.value));
    
    taskInput.value = "";
    taskInput.focus();
  } else {
    return;
  }
  
  if(checked) {
    li.className = "checked";
  }
  
  li.addEventListener("dblclick", editTodo);
  li.addEventListener("click", checkTodo);
  
  let btn = document.createElement("button");
  btn.appendChild(document.createTextNode("x"));
  btn.className = "delete";
  btn.addEventListener("click", deleteTodo);
  
  li.appendChild(btn);
  list.appendChild(li);
  
  saveAndCount();
}

function deleteTodo() {
  parent = this.parentElement;
  list.removeChild(parent)
  
  saveAndCount();
};

function deleteAllTodo() {
  list.innerHTML = "";
  
  saveAndCount();
}

function deleteChecked() {
  let checked = document.getElementsByClassName("checked");
  let checkedLength = checked.length;
  if(checkedLength != 0) {
    for(i = 0; i < checkedLength; i++) {
      list.removeChild(checked[0])
    }
    saveAndCount();
  }
}

function checkTodo() {
  if(this.firstChild.nodeType == 3) {
    this.classList.toggle("checked");
  }
  saveAndCount();
};

function editTodo() {
  if(this.firstChild.nodeType != 3) { return; }
  
  let text = this.firstChild.nodeValue;
  let input = document.createElement("input");
  input.type = "text";
  input.value = text;
  this.firstChild.nodeValue = "";
  this.prepend(input);
  input.focus();
  input.addEventListener("mouseleave", function() { saveEdit(this) });
  input.addEventListener("keypress", function(event) {
    if(event.key == "Enter") {
      saveEdit(this);
    }
  })
};

function saveEdit(inputObject) {  
  let text = inputObject.value;
  let parent = inputObject.parentElement;
  let textNode = document.createTextNode(text);
  parent.replaceChild(textNode, inputObject);
  saveAndCount();
}

function counter() {
  let amountChecked = document.getElementsByClassName("checked").length;
  todoCounter.innerHTML = (list.children.length - amountChecked);
  
  if(list.children.length == 0){
    buttonDiv.style.display = "none";

    taskInput.style.borderRadius = "10px 0px 0px 10px";
    taskBtn.style.borderRadius = "0px 10px 10px 0px";
  } else {
    buttonDiv.style.display = "inline-block";

    taskInput.style.borderRadius = null;
    taskBtn.style.borderRadius = null;
  }
}

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

  for(let i = 0; i < todoList.length; i++) {
    createTodo(todoList[i].text, todoList[i].class);
  }
  counter()
}

function saveAndCount() {
  saveToLocalStorage();
  counter();
}

function changeTheme() {
  let body = document.getElementsByTagName("body")[0];
  if(body.className == "light") {
    body.className = "dark";
  } else {
    body.className = "light";
  }
}