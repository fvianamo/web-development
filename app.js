var app = new function(){
		//Initicializa as variaveis
		this.tasks = new Array;
		
		//função que inicializa as primeiras tasks, ao abrir a página
		this.initialize = function(){
			var task = {};
			task = {
				id: 1,
				desc: "A Fazer",
				resp: "Ze Junior",
				prazo: "01-01-2019",
				done: true
			} ;
			this.tasks.push(task);
			task = {
				id: 2,
				desc: "Fazendo",
				resp: "Ze Junior",
				prazo: "01-01-2019",
				done: false
			} ;
			this.tasks.push(task);
			task = {
				id: 3,
				desc: "Feito",
				resp: "Ze Junior",
				prazo: "01-01-2019",
				done: false
			} ;
			this.tasks.push(task);
			this.list_all();
		}

		//Função que gera o HTML das listas
		this.list_all = function(){

			var table = document.getElementById('todo-list');

			//Inserting tasks
			for (var i =0; i < this.tasks.length; i++){
				row = table.insertRow(i);
				
				descCell = row.insertCell(0);
				respCell = row.insertCell(1);
				prazoCell = row.insertCell(2);

				if (!this.tasks[i].done) {
					descCell.innerHTML = '<strike>'+this.tasks[i].desc+'</strike>';
					respCell.innerHTML = '<strike>'+this.tasks[i].resp+'</strike>';
					prazoCell.innerHTML = '<strike>'+this.tasks[i].prazo+'</strike>';
				}
				else{
					descCell.innerHTML = this.tasks[i].desc;
					respCell.innerHTML = this.tasks[i].resp;
					prazoCell.innerHTML = this.tasks[i].prazo;
				}

			}
		}

		//função que adiciona uma task na lista, sempre inicia como A Fazer
		this.add = function(){
			var _task = {
				id: 4,
				desc: "testando",
				resp: "Vou dizer?",
				prazo: "31-12-2018",
				done: false
			};
			this.tasks.push(_task);
			this.list_all();
		}

		//função que edita task da lista
		this.edit = function(){
			//code goes here
		}

		//função que move a task para o próximo estado
		this.foward = function(){
			//code goes here
		}

		//função que remove a task da lista
		this.remove = function(){
			//code goes here
		}
	}
app.add();
app.initialize();
