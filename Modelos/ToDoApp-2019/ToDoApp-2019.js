//arquivo JS para o TodoApp-2019(-responsive).html
//adaptado de https://codepen.io/franklynroth/pen/ZYeaBd
var taskInput = document.getElementById("tarefa");
var respInput = document.getElementById("responsavel");
var addButton = document.getElementById("addbtn");
var taskHolder = document.getElementById("incomplete-tasks");//lista de tarefas a fazer

var createNewTaskElement = function (taskString) {
	var listItem = document.createElement("li");
	var label = document.createElement("label");//label
	var deleteButton = document.createElement("button");//delete button   
	label.innerText = taskString;
    deleteButton.innerHTML = "X";
	deleteButton.className = "delete";
	listItem.appendChild(label);
	listItem.appendChild(deleteButton);
	return listItem;
};

var addTask = function () {
	console.log("Add Task...");
	var tarefaResponsavel = taskInput.value + ", " + respInput.value;
	var listItem = createNewTaskElement(tarefaResponsavel);
    taskHolder.appendChild(listItem);
	bindTaskEvents(listItem);
};
var deleteTask = function () {
    console.log("Delete Task...");
    var listItem = this.parentNode;
    var ul=listItem.parentNode;
    //remove o nó pai da lista.
    ul.removeChild(listItem);
};

var bindTaskEvents = function (taskListItem) {
	console.log("bind list item events");
	var deleteButton = taskListItem.querySelector("button.delete");
    deleteButton.onclick = deleteTask;
};

//informa a click handler para a função addTask.
addButton.addEventListener("click",addTask);
