<?php
$tarefas = null;

echo "PHP running\n";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
echo "PHP GET request OK\n";
        $tarefas = fopen("tarefas.json","r") or die("unable to open file!");
        echo "PHP file opened to read\n";
        while(!feof($tarefas)) {
            echo fgets($tarefas) . "<br>";
        }
        fclose($tarefas);
        echo "PHP file closed\n";
}
else {
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
echo "PHP POST request OK\n";
    if(!empty($_POST['tarefas'])) {
        $addtarefas = $_POST['tarefas'];
        echo "PHP tarefas=".$addtarefas."\n";
        $tarefas = fopen("tarefas.json","w+") or die("unable to open file!");
        echo "PHP file opened to write\n";
        fwrite($tarefas, $addtarefas);
        fclose($tarefas);
        echo "PHP file closed\n";
    } else
        echo "Valores a adicionar estão vazios. Nada a inserir!";
}}
?>
