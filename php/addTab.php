<?php
include_once 'functions.php';

//ini_set('display_errors', 1);
//error_reporting(E_ALL);

function addTab(){
    global $dblink;
    $result = array('is_succeeded' => false, 'tab_id' => null);

    if(isset($_POST['tab_name']) AND isset($_POST['user_id'])){
        $tab_name = sanitizeString($_POST['tab_name']);
        $user_id = sanitizeString($_POST['user_id']);
        $queryResponse = queryMysql("INSERT INTO task_tabs(name, user_id) VALUES('$tab_name', $user_id)");
        if($queryResponse == true){
            $result['is_succeeded'] = true;
            $result['tab_id'] = mysqli_insert_id($dblink);
        }
    }

    return json_encode($result);

}

echo addTab();

?>