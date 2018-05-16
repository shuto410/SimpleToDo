<?php
session_start();
  

ini_set('display_errors', 1);
error_reporting(E_ALL);


function getSession(){
    $result = array('id' => null, 'isSuccess' => false, 'sessionId' => null);
    $result['sessionId'] = session_id();
    if(isset($_SESSION['id'])){
        $result['id'] =  $_SESSION['id'];
        $result['isSuccess'] = true;
    }
    return json_encode($result);
}

echo getSession();

?>