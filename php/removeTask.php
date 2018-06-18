<?php
include_once 'functions.php';

//ini_set('display_errors', 1);
//error_reporting(E_ALL);


function removeTask(){
    $result = array('is_succeeded' => false);

    if(isset($_POST['task_id'])){
        $task_id = sanitizeString($_POST['task_id']);
        $queryResponse = queryMysql("DELETE FROM tasks WHERE id = '$task_id'");
        if($queryResponse == true){
            $result['is_succeeded'] = true;
        }
    }

    return json_encode($result);
}

echo removeTask();

?>