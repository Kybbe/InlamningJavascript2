var taskBtn = document.getElementById("my-button");
var taskInput = document.getElementById("task");
var list = document.getElementById("list");
var deletes = document.getElementsByClassName("delete");

taskBtn.addEventListener("click", function() {
  if(taskInput.value != ""){
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value));

    let btn = document.createElement("button");
    btn.appendChild(document.createTextNode("x"))
    btn.className = "delete";
    btn.addEventListener("click", deleteFunction)

    li.appendChild(btn);
    list.appendChild(li)

    taskInput.value = "";
    taskInput.focus();
  }
});

function deleteFunction() {
  parent = this.parentElement;
  list.removeChild(parent)
}