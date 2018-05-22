<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include_once 'functions.php';


function login(){
    //結果用配列
    $result = array('isSuccess' => false, 'id' => 0);
    $mail = "null";
    $pass = "null";

    if (isset($_POST['mail']) AND isset($_POST['pass'])){
        //入力値サニタイズ
        $mail = sanitizeString($_POST['mail']);
        $pass = sanitizeString($_POST['pass']);

        //メールアドレスの一致したユーザーのパスワード抽出
        $resultUsers = queryMysql("SELECT * FROM users WHERE mail='$mail'");
        $dbHashedPwd = getDatabaseMatch($resultUsers, 'pass');
        $resultUsers = queryMysql("SELECT * FROM users WHERE mail='$mail'");
        $dbId = getDatabaseMatch($resultUsers, 'id');
            
        if (mysqli_num_rows($resultUsers)){
            if(password_verify($pass, $dbHashedPwd)){
                $result['isSuccess'] = true; 
                //TODO: ログインしたユーザのidを取得して返すようにする。
                $result['id'] = $dbId;
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
