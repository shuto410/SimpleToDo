<?php
include_once 'functions.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

function addTab(){
    $result = array('isSuccess' => false);

    if(isset($_POST['name']) AND isset($_POST['user_id'])){
        $name = sanitizeString($_POST['name']);
        $user_id = sanitizeString($_POST['user_id']);
        $queryResponse = queryMysql("INSERT INTO task_tabs(name, user_id) VALUES('$name', $user_id)");
        if($queryResponse == true){
            $result['isSuccess'] = true;
        }
    }

    return json_encode($result);

}

echo addTab();

?>