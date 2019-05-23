//Imports
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

//Inicializa app
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var tasks = new Array();

var readFile = function () {
	return JSON.parse(fs.readFileSync('tasks.txt'));
};

var writeFile = function(tasks) {
	fs.writeFile('tasks.txt', JSON.stringify(tasks), function (err) {
  		if (err) throw err;
  		//console.log('Saved!');
	}); 
};

var getTasks = function (req, res){
	tasks = readFile();
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.send(tasks);
};

var addTask = function (req, res){
	var task = {
		"desc": req.body.desc,
		"resp": req.body.resp,
		"prazo": req.body.prazo,
		"done": req.body.done
	};
	tasks = readFile();
	//console.log(tasks);
	tasks.push(task);
	writeFile(tasks);
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.send(tasks);
};

var alterTask = function (req, res){
	tasks = readFile();
	var _task = tasks[parseInt(req.body.id)];
	tasks.splice(parseInt(req.body.id),1);

	if (req.body.task.desc != null)
		_task['desc'] = req.body.task.desc;

	if (req.body.task.resp != null)
		_task['resp'] = req.body.task.resp;

	if (req.body.task.prazo != null)
		_task['prazo'] = req.body.task.prazo;

	if (req.body.task.done != null)
		_task['done'] = req.body.task.done;

	tasks.push(_task);
	writeFile(tasks);
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.send(tasks);
};

var deleteTask = function (req, res){
	tasks = readFile();
	tasks.splice(parseInt(req.body.id),1);
	writeFile(tasks);
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.send(tasks);
};


//defini rotas
app.get('/task', getTasks);
app.post('/task', addTask);
app.put('/task', alterTask);
app.delete('/task', deleteTask);


//definindo porta 
app.listen(5000, function (){
	console.log('Alive listening on port 5000!');
});
