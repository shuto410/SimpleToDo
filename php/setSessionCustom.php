<?php
session_start();

function setSession(){    
    $result = array('is_succeeded' => false, 'sessionId' => null);
    //if(isset($_POST['id'])){
        $id = "custom";
        //try{
        $_SESSION['id'] = $id;
        $result['is_succeeded'] = true;
        $result['sessionId'] = session_id();
        //}
        //catch(e){
        //    $result['is_succeeded'] = false;
        //}
    //}
    return json_encode($result);
}

echo setSession();
?>