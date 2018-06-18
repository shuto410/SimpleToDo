<?php
include_once 'functions.php';

//ini_set('display_errors', 1);
//error_reporting(E_ALL);

function addTab(){
    global $dblink;
    $result = array('is_succeeded' => false, 'id' => null);

    if(isset($_POST['name']) AND isset($_POST['user_id'])){
        $name = sanitizeString($_POST['name']);
        $user_id = sanitizeString($_POST['user_id']);
        $queryResponse = queryMysql("INSERT INTO task_tabs(name, user_id) VALUES('$name', $user_id)");
        if($queryResponse == true){
            $result['is_succeeded'] = true;
            $result['id'] = mysqli_insert_id($dblink);
        }
    }

    return json_encode($result);

}

echo addTab();

?>