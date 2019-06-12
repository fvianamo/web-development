var app = new function(){
	//Initicializa as variaveis
	this.tasks = [];

	this.CORSRequest = function createCORSRequest(method, url) {
		var xhr = new XMLHttpRequest();
	  	if ("withCredentials" in xhr) {
	    	// XHR for Chrome/Firefox/Opera/Safari.
	    	xhr.open(method, url, true);
	  	} else if (typeof XDomainRequest != "undefined") {
	    	// XDomainRequest for IE.
	    	xhr = new XDomainRequest();
	    	xhr.open(method, url);
	  	} else {
	    	// CORS not supported.
	    	xhr = null;
	  	}
	  	return xhr;
	}
	
	//função que inicializa as primeiras tasks, ao abrir a página
	this.initialize = function(){
		var ajax = new XMLHttpRequest();

		ajax.open('GET', 'http://localhost:5000/task', true);
		
		ajax.send();

		ajax.onreadystatechange = function() {
			if(ajax.readyState == 4 && ajax.status == 200){
				var data = JSON.parse(ajax.responseText);
				app.tasks = data;
				app.list_all();
			}
		};			
	}

	//Função que gera o HTML das listas
	this.list_all = function(){
		//Cleaning table element
		document.getElementById('todo-list').innerHTML = "";
		//Escreve a lista!
		for (var i = 0; i < this.tasks.length; i++){
			if (this.tasks[i].done==false) {
				document.getElementById('todo-list').innerHTML += '<tr><td>' + this.tasks[i].desc 
				+ '</td><td>' + this.tasks[i].resp 
				+ '</td><td>' + this.tasks[i].prazo 
				+ '</td><td><div class="btn-group" role="group"><button class="btn btn-success" onclick="app.done()" value="' + i + '">feito</button><button class="btn btn-warning" onclick="app.edit()" value="' + i + '">edit</button><button class="btn btn-danger" onclick="app.delete()" value="' + i + '">deletar</button></div></td></tr>';
			}
			else{
				document.getElementById('todo-list').innerHTML += '<tr><td><strike>' + this.tasks[i].desc 
				+ '</strike></td><td><strike>' + this.tasks[i].resp 
				+ '</strike></td><td><strike>' + this.tasks[i].prazo 
				+ '</strike></td><td><div class="btn-group" role="group"><button class="btn btn-success" onclick="app.done()" value="' + i + '">feito</button><button class="btn btn-warning" onclick="app.edit()" value="' + i + '">edit</button><button class="btn btn-danger" onclick="app.delete()" value="' + i + '">deletar</button></div></td></tr>';
			}
		}
	}

	//função que adiciona uma task na lista, sempre inicia como A Fazer
	this.add = function(){
		var _desc = document.getElementById('desc').value;
		var _resp = document.getElementById('resp').value;
		var _prazo = document.getElementById('prazo').value;

		var _task = {
			desc: _desc,
			resp: _resp,
			prazo: _prazo,
			done: false
		};
		
		var ajax = this.CORSRequest('POST', 'http://localhost:5000/task');

		ajax.setRequestHeader("Content-Type", "application/json");
		ajax.send(JSON.stringify(_task));

		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200) {
				var data = JSON.parse(ajax.responseText);
				app.tasks = data;
				app.list_all();
			}
		}

		document.getElementById('desc').value = '';
		document.getElementById('resp').value = '';
		document.getElementById('prazo').value = '';
	}

	//função que edita task da lista
	this.edit = function(){
		//limpa formulário antes de preencher para modificar
		document.getElementById('desc').value = '';
		document.getElementById('resp').value = '';
		document.getElementById('prazo').value = '';
		
		var _task = this.tasks[parseInt(event.srcElement.value)];

		var requ = {
			"id": parseInt(event.srcElement.value)
		}

		var ajax = this.CORSRequest('DELETE', 'http://localhost:5000/task');

		ajax.setRequestHeader("Content-Type", "application/json");
		ajax.send(JSON.stringify(requ));

		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200) {
				var data = JSON.parse(ajax.responseText);
				app.tasks = data;
				app.list_all();
			}
		}

		document.getElementById('desc').value = _task.desc;
		document.getElementById('resp').value = _task.resp;
		document.getElementById('prazo').value = _task.prazo;
	}

	//função que move a task para o próximo estado
	this.done = function(){
		var _task = this.tasks[parseInt(event.srcElement.value)];
		_task.done = true;
		
		var requ = {
			"id": parseInt(event.srcElement.value),
			"task": _task
		};

		var ajax = this.CORSRequest('PUT', 'http://localhost:5000/task');

		ajax.setRequestHeader("Content-Type", "application/json");
		ajax.send(JSON.stringify(requ));

		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200) {
				var data = JSON.parse(ajax.responseText);
				app.tasks = data;
				app.list_all();
			}
		}
		
	}

	//função que remove a task da lista
	this.delete = function(){
		var requ = {
			"id": parseInt(event.srcElement.value)
		}

		var ajax = this.CORSRequest('DELETE', 'http://localhost:5000/task');

		ajax.send(JSON.stringify(requ));

		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200) {
				var data = JSON.parse(ajax.responseText);
				app.tasks = data;
				app.list_all();
			}
		}
	}
}
app.initialize();

