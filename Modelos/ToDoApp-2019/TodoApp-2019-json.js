
function ajaxLoadRequest() {
    var taskRequest = new XMLHttpRequest();
    taskRequest.open('GET', 'tarefas.json');
    taskRequest.onload = function () {
        if (taskRequest.status >= 200 && taskRequest.status < 400) {
            var taskListJson = taskRequest.responseText;
            localStorage.setItem('taskList',taskListJson);
        } else {
            console.log("Servidor ativo, mas ocorreu um erro!");
        }
    };
    taskRequest.onerror = function() {
        console.log("Erro de conexão");
    }
    taskRequest.send();  
}

var ajaxAddRequest = function () {
    console.log("entrando add...");
    var novaTarefa  = document.getElementById("tarefa").value,
        novoResponsavel = document.getElementById("responsavel").value,
        tasks = localStorage.getItem('taskList'),
        taskListObj = JSON.parse(tasks),
        toAdd = {"tarefa":novaTarefa , "responsavel":novoResponsavel}; 
    taskListObj.push(toAdd);
    //grava nova lista de tarefas com Ajax
    var taskRequest = new XMLHttpRequest();
    taskRequest.open('POST', 'tarefas-json.php',true);
    taskRequest.onload = function() {
        if (taskRequest.status >= 200 && taskRequest.status < 400) {
            console.log("Sucesso em ajaxAddRequest\n" + taskRequest.responseText);
            renderHTML(taskListObj);
        } else {
            console.log("Servidor ativo, mas ocorreu um erro!");
        }
    };
    taskRequest.onerror = function() {
        console.log("Erro de conexão");
    }
    taskRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var taskListJson = JSON.stringify(taskListObj),
        queryString = "tarefas=" + taskListJson;
    localStorage.setItem('taskList',taskListJson);
    taskRequest.send(queryString);  
}

var ajaxDelRequest = function () {
    /* implementar o código aqui como exercício  */
    console.log("ajaxDelRequest");
}

function renderHTML(data) {
    var taskContainer = document.getElementById("incomplete-tasks"),
        htmlString = "";
    for (i=0; i < data.length; i++) {
        htmlString += "<li>" + data[i].tarefa + ", " + data[i].responsavel + "</li>";
    }
    taskContainer.innerHTML = htmlString;
}

// PRINCIPAL
var addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", ajaxAddRequest);
ajaxLoadRequest();
var tasks = localStorage.getItem('taskList');
var taskListObj = JSON.parse(tasks);
renderHTML(taskListObj);




