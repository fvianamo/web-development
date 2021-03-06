var app = new function(){
		//Initicializa as variaveis
		this.tasks = [];
		
		//função que inicializa as primeiras tasks, ao abrir a página
		this.initialize = function(){
			var task = {};
			task = {
				desc: "Tarefa 1",
				resp: "Ze Junior",
				prazo: "2019-01-01",
				done: false
			} ;
			this.tasks.push(task);
			task = {
				desc: "Tarefa 2",
				resp: "Ze Junior",
				prazo: "2019-01-01",
				done: false
			} ;
			this.tasks.push(task);
			task = {
				desc: "Tarefa 3",
				resp: "Ze Junior",
				prazo: "2019-01-01",
				done: false
			} ;
			this.tasks.push(task);
			this.list_all();
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
					+ '</td><td><button onclick="app.done()" value="' + i + '">feito</button></td><td><button onclick="app.edit()" value="' + i + '">edit</button></td><td><button onclick="app.delete()" value="' + i + '">deletar</button></td></tr>';
				}
				else{
					document.getElementById('todo-list').innerHTML += '<tr><td><strike>' + this.tasks[i].desc 
					+ '</strike></td><td><strike>' + this.tasks[i].resp 
					+ '</strike></td><td><strike>' + this.tasks[i].prazo 
					+ '</strike></td><td><button onclick="app.done()" value="' + i + '">feito</button></td><td><button onclick="app.edit()" value="' + i + '">edit</button></td><td><button onclick="app.delete()" value="' + i + '">deletar</button></td></tr>';
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
			this.tasks.push(_task);

			document.getElementById('desc').value = '';
			document.getElementById('resp').value = '';
			document.getElementById('prazo').value = '';

			this.list_all();
		}

		//função que edita task da lista
		this.edit = function(){
			//limpa formulário antes de preencher para modificar
			document.getElementById('desc').value = '';
			document.getElementById('resp').value = '';
			document.getElementById('prazo').value = '';
			
			var _task = this.tasks[parseInt(event.srcElement.value)];
			this.tasks.splice(parseInt(event.srcElement.value),1);

			document.getElementById('desc').value = _task.desc;
			document.getElementById('resp').value = _task.resp;
			document.getElementById('prazo').value = _task.prazo;

			this.list_all();
		}

		//função que move a task para o próximo estado
		this.done = function(){
			//console.log(event.srcElement.value);
			var _task = this.tasks[parseInt(event.srcElement.value)];
			_task.done = true;
			this.tasks.splice(parseInt(event.srcElement.value),1);
			this.tasks.push(_task);
			this.list_all();
		}

		//função que remove a task da lista
		this.delete = function(){
			//console.log(event.srcElement.value);
			this.tasks.splice(parseInt(event.srcElement.value),1);
			this.list_all();
		}
	}
app.initialize();

