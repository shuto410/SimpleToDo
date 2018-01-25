<?php
session_start();

function setSession(){    
    $result = array('isSuccess' => false);
    if(isset($_POST['id'])){
        $id = $_POST['id'];
        //try{
        $_SESSION['id'] = $id;
        $result['isSuccess'] = true;
        //}
        //catch(e){
        //    $result['isSuccess'] = false;
        //}
    }
    return json_encode($result);
}

echo setSession();
?>