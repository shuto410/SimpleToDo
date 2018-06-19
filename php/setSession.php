<?php
session_start();

function setSession(){    
    $result = array('is_succeeded' => false, 'sessionId' => null);
    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $_SESSION['id'] = $id;
        session_write_close();
        $result['is_succeeded'] = true;
        $result['sessionId'] = session_id();
    }
    return json_encode($result);
}

echo setSession();
?>