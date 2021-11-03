var taskBtn = document.getElementById("my-button");
var taskInput = document.getElementById("task");
var list = document.getElementById("list");
var deletes = document.getElementsByClassName("delete");
var deleteAllBtn = document.getElementById("ultimateDelete")

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

    deleteAllBtn.style.display = "inline-block";
  } else {
    alert("Please type something in the 'Write task' box first!")
  }
}

function deleteTodo() {
  parent = this.parentElement;
  list.removeChild(parent)

  if(list.children.length == 0){
    deleteAllBtn.style.display = "none";
  }
};


function deleteAllTodo() {
  list.innerHTML = "";

  deleteAllBtn.style.display = "none";
}

taskBtn.addEventListener("click", createTodo);
deleteAllBtn.addEventListener("click", deleteAllTodo);

document.getElementsByTagName("form")[0].addEventListener( "submit", function(event) { event.preventDefault(); } );