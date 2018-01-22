<?php
    session_start();
    
    $result = array('mail' => "null");

    if(isset($_SESSION['mail'])){
        result['mail'] =  $_SESSION['mail'];
    }

    echo json_encode($result);
?>