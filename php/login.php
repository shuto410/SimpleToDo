<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include_once 'functions.php';


function login(){
    //結果用配列
    $result = array('isSuccess' => false);
    $mail = "null";
    $pass = "null";

    if (isset($_GET['mail']) AND isset($_GET['pass'])){
        //入力値サニタイズ
        $mail = sanitizeString($_GET['mail']);
        $pass = sanitizeString($_GET['pass']);

        //メールアドレスの一致したユーザーのパスワード抽出
        $resultUsers = queryMysql("SELECT * FROM users WHERE mail='$mail'");
        $dbHashedPwd = getDatabaseMatch($resultUsers, 'pass');
  

        if (mysqli_num_rows($resultUsers)){
            if(password_verify($pass, $dbHashedPwd)){
                $result['idSuccess'] = true; 
            }
            else{
                $result['isSuccess'] = false;
            }
        }
        else{
            $result['isSuccess'] = false;
        }
    }

    return json_encode($result);
}


echo login();

?>
