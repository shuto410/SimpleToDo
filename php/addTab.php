<?php
include_once 'functions.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

$result = array('isSuccess' => false);

if(isset($_POST['name'])){
    $name = sanitizeString($_POST['name']);
    $queryResponse = queryMysql("INSERT INTO task_tabs(name) VALUES('$name')");
    if($queryResponse == true){
        $result['isSuccess'] = true;
    }
}

echo json_encode($result);

?>