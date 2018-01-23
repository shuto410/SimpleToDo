<?php
include_once "functions.php";


ini_set('display_errors', 1);
error_reporting(E_ALL);

$result = array('result' => false);

if(isset($_POST['mail']) AND isset($_POST['pass']) AND isset($_POST['name'])){
    //入力値のサニタイズ
    $mail = sanitizeString($_POST['mail']);
    $pass = sanitizeString($_POST['pass']);
    $name = sanitizeString($_POST['name']);
    //パスワードのハッシュ化
    $hashpass = password_hash($pass, PASSWORD_DEFAULT);

    
    $queryResponse = queryMysql("INSERT INTO users(mail, pass, name) VALUES('$mail', '$hashpass', '$name')");
    if($queryResponse == true){
        $result['result'] = true;
    }
}

echo json_encode($result);


?>