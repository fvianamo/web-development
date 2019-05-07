var app = new function(){
		//Initicializa as variaveis
		this.tasks = [];
		
		//função que inicializa as primeiras tasks, ao abrir a página
		this.initialize = function(){
			var task = {};
			task = {
				id: 1,
				desc: "A Fazer",
				resp: "Ze Junior",
				prazo: "01-01-2019",
				status: 1
			} ;
			tasks.push(task);
			task = {
				id: 2,
				desc: "Fazendo",
				resp: "Ze Junior",
				prazo: "01-01-2019",
				status: 2
			} ;
			tasks.push(task);
			task = {
				id: 3,
				desc: "Feito",
				resp: "Ze Junior",
				prazo: "01-01-2019",
				status: 3
			} ;
			tasks.push(task);
		}

		//Função que gera o HTML das listas
		this.list_all = function(){

		}

		//função que adiciona uma task na lista, sempre inicia como A Fazer
		this.add = funtion(_task){
			this.tasks.push(_task);
		}

		//função que edita task da lista
		this.edit = function(){

		}

		//função que move a task para o próximo estado
		this.foward = function(){

		}

		//função que remove a task da lista
		this.remove = function(){

		}
	}