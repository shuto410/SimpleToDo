<?php
    session_start();

    $result = array('result' => "null");
    $mail = $_POST['id'];

    try{
        $_SESSION['id'] = $mail;
        $result['isSuccess'] = true;
    }
    catch(e){
        $result['isSuccess'] = false;
    }

    echo json_encode($result);
?>