<?php
    session_start();

    $result = array('result' => "null");
    $mail = $_POST['mail'];

    try{
        $_SESSION['user_id'] = $mail;
        $result['result'] =  "success";
    }
    catch(e){
        $result['result']  = "failed";
    }

    echo json_encode($result);
?>