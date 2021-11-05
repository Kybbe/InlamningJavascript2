var taskBtn = document.getElementById("my-button");
var taskInput = document.getElementById("task");
var list = document.getElementById("list");
var deletes = document.getElementsByClassName("delete");
var deleteAllBtn = document.getElementById("ultimateDelete");
var deleteCheckedBtn = document.getElementById("clearCompleted");
var todoCounter = document.getElementById("todoCounter");
var buttonDiv = document.getElementById("buttons");

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

  li.addEventListener("click", checkTodo);

  let btn = document.createElement("button");
  btn.appendChild(document.createTextNode("x"));
  btn.className = "delete";
  btn.addEventListener("click", deleteTodo);

  li.appendChild(btn);
  list.appendChild(li);

  buttonDiv.style.display = "inline-block";

  saveAndCount();
}

function deleteTodo() {
  parent = this.parentElement;
  list.removeChild(parent)

  if(list.children.length == 0){
    buttonDiv.style.display = "none";
  }
  saveAndCount();
};

function deleteAllTodo() {
  list.innerHTML = "";

  buttonDiv.style.display = "none";
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
  if(this.className == "checked") {
    this.className = "";
  } else {
    this.className = "checked"
  }
  saveAndCount();
};

function counter() {
  let amountChecked = document.getElementsByClassName("checked").length;
  todoCounter.innerHTML = (list.children.length - amountChecked);
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
  if(todoList != null) {
    for(let i = 0; i < todoList.length; i++) {
      createTodo(todoList[i].text, todoList[i].class);
    }
  }
  counter()
}

function saveAndCount() {
  saveToLocalStorage();
  counter();
}


taskBtn.addEventListener("click", createTodo);
deleteAllBtn.addEventListener("click", deleteAllTodo);
deleteCheckedBtn.addEventListener("click", deleteChecked)

document.getElementsByTagName("form")[0].addEventListener( "submit", function(event) { event.preventDefault(); } );
