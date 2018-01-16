<?php
include_once "functions.php";


ini_set('display_errors', 1);
error_reporting(E_ALL);

$result = array('result' => false);

if(isset($_POST['mail']) AND isset($_POST['pass'])  ){
    //入力値のサニタイズ
    $mail = sanitizeString($_POST['mail']);
    $pass = sanitizeString($_POST['pass']);
    //パスワードのハッシュ化
    $hashpass = password_hash($pass, PASSWORD_DEFAULT);

    
    $queryResponse = queryMysql("INSERT INTO members VALUES('$mail', '$hashpass')");
    if($queryResponse == true){
        $result['result'] = true;
    }
}

echo json_encode($result);


?>