<?php
include_once 'functions.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);


function deleteTab(){
    $result = array('isSuccess' => false);

    if(isset($_POST['user_id']) AND isset($_POST['name'])){
        $user_id = sanitizeString($_POST['user_id']);
        $tab_name = sanitizeString($_POST['name']);
        $queryResponse = queryMysql("DELETE FROM task_tabs WHERE user_id = $user_id AND name = '$tab_name'");
        if($queryResponse == true){
            $result['isSuccess'] = true;
        }
    }

    return json_encode($result);
}

echo deleteTab();

?>