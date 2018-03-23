<?php
session_start();
    
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