<?php
include_once 'functions.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);


function removeTab(){
    $result = array('is_succeeded' => false);

    if(isset($_POST['user_id']) AND isset($_POST['tab_id'])){
        $user_id = sanitizeString($_POST['user_id']);
        $tab_id = sanitizeString($_POST['tab_id']);
        $queryResponse = queryMysql("DELETE FROM task_tabs WHERE user_id = $user_id AND id = '$tab_id'");
        if($queryResponse == true){
            $result['is_succeeded'] = true;
        }
    }

    return json_encode($result);
}

echo removeTab();

?>