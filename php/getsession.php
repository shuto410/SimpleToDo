<?php
    //session_start();
    
    $result = array('id' => null);

    if(isset($_SESSION['id'])){
        $result['id'] =  $_SESSION['id'];
    }


    echo json_encode($result);
?>