<?php
session_start();

function setSession(){    
    $result = array('isSuccess' => false, 'sessionId' => null);
    if(isset($_POST['id'])){
        $id = $_POST['id'];
        //try{
        $_SESSION['id'] = $id;
        session_write_close();
        $result['isSuccess'] = true;
        $result['sessionId'] = session_id();
        //}
        //catch(e){
        //    $result['isSuccess'] = false;
        //}
    }
    return json_encode($result);
}

echo setSession();
?>