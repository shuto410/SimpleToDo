<?php
include_once 'functions.php';

//結果jsonの定義
$result = array('isMailAddress' => FALSE,    //メールアドレスかどうか
                'isUsed'        => FALSE,    //使用済みかどうか
                'error'         => FALSE     //メールアドレスnull
               );

if(isset($_POST['mail'])){
    $mail = sanitizeString($_POST['mail']);
    
    if(isMailAddress($mail) == TRUE){
        $result['isMailAddress'] = TRUE;
        if(mysqli_num_rows(queryMysql("SELECT * FROM users
        WHERE mail='$mail'"))){
            $result['isUsed'] = TRUE;
        }
    }
    
}
else{
    $result['error'] = TRUE;
}

//結果の吐き出し
echo json_encode($result);
?>