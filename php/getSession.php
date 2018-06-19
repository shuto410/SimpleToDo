<?php
session_start();
  

//ini_set('display_errors', 1);
//error_reporting(E_ALL);


function getSession(){
    $result = array('id' => null, 'is_succeeded' => false, 'sessionId' => null);
    $result['sessionId'] = session_id();
    if(isset($_SESSION['id'])){
        $result['id'] =  $_SESSION['id'];
        $result['is_succeeded'] = true;
    }
    return json_encode($result);
}

echo getSession();

?>