<?php
include_once "functions.php";


ini_set('display_errors', 1);
error_reporting(E_ALL);

$result = array('result' => false);

if(isset($_POST['mail'] AND isset($_POST['pass'])){
    $mail = $_POST['mail'];
    $pass = $_POST['pass'];
    

    
    $queryResponse = queryMysql("INSERT INTO members VALUES('$mail', '$pass')");
    if($queryResponse == true){
        $result['result'] = true;
    }
}

echo json_encode($result);


?>