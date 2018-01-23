<?php
include_once "functions.php";


ini_set('display_errors', 1);
error_reporting(E_ALL);

function addAccount(){
    $result = array('result' => false, 'id' => 0);

    if(isset($_POST['mail']) AND isset($_POST['pass']) AND isset($_POST['name'])){
        //入力値のサニタイズ
        $mail = sanitizeString($_POST['mail']);
        $pass = sanitizeString($_POST['pass']);
        $name = sanitizeString($_POST['name']);
        //パスワードのハッシュ化
        $hashpass = password_hash($pass, PASSWORD_DEFAULT);
    
        $queryResult = queryMysql("INSERT INTO users(mail, pass, name) VALUES('$mail', '$hashpass', '$name')");
        if($queryResult == true){
            $result['result'] = true;
            $queryResult = queryMysql("SELECT * from users WHERE mail = '$mail'");
            if(queryResult == FALSE){
                $result['result'] = false;
            }
            else{
                $row = mysqli_fetch_assoc($queryResult):
                $result['id'] = $row['id'];
            }
        }
    }

    return json_encode($result);
}

echo addAccount();

?>