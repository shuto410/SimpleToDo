<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include_once 'functions.php';

//結果用配列
$result = array('result' => "null");

$mail = "null";
$pass = "null";

if (isset($_GET['mail']) AND isset($_GET['pass'])){
    //入力値サニタイズ
    $mail = sanitizeString($_GET['mail']);
    $pass = sanitizeString($_GET['pass']);

    //メールアドレスの一致したユーザーのパスワード抽出
    $resultMembers = queryMysql("SELECT * FROM members WHERE mail='$mail'");
    $dbHashedPwd = getDatabaseMatch($resultMembers, 'pass');
  

    if (mysqli_num_rows($resultMembers)){
        if(password_verify($pass, $dbHashedPwd)){
            $result['result'] = "passaccept"; 
        }
        else{
            $result['result'] = "passreject";
        }
    }
    else{
        $result['result'] = "nomailaddress";
    }

    
}



//$arr = array('name' => 'kizuna ai', 'age' => 14);

echo json_encode($result);
//echo "{\"result\": ". $mail ."}";

//echo "unko";

?>
