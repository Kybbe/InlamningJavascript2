var taskBtn = document.getElementById("my-button");
var taskInput = document.getElementById("task");
var list = document.getElementById("list");
var deletes = document.getElementsByClassName("delete");
var ultimateDeleteBtn = document.getElementById("ultimateDelete")

function createTodo() {
  if(taskInput.value != ""){
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value));
    
    let btn = document.createElement("button");
    btn.appendChild(document.createTextNode("x"))
    btn.className = "delete";
    btn.addEventListener("click", deleteTodo)
    
    li.appendChild(btn);
    list.appendChild(li)
    
    taskInput.value = "";
    taskInput.focus();

    ultimateDeleteBtn.style.display = "inline-block";
  }
}

function deleteTodo() {
  parent = this.parentElement;
  list.removeChild(parent)
};


function deleteAllTodo() {
  list.innerHTML = "";

  ultimateDeleteBtn.style.display = "none";
}

taskBtn.addEventListener("click", createTodo);
ultimateDeleteBtn.addEventListener("click", deleteAllTodo);

document.getElementsByTagName("form")[0].addEventListener( "submit", function(event) { event.preventDefault(); } );