<?php
include_once "functions.php";


//ini_set('display_errors', 1);
//error_reporting(E_ALL);

function updateTaskCheckStatus(){
    global $dblink;
    $result = array('is_succeeded' => false);

    if(isset($_POST['is_checked']) AND isset($_POST['task_id'])){
        //入力値のサニタイズ
        $is_checked = sanitizeString($_POST['is_checked']);
        $task_id = sanitizeString($_POST['task_id']);

        if(empty($is_checked)) return;
    
        $queryResult = queryMysql("UPDATE tasks SET is_checked = $is_checked WHERE id = $task_id");
        if($queryResult == true){
            $result['is_succeeded'] = true;
        }
    }
    else{
        $result['is_succeeded'] = "unset";
    }

    return json_encode($result);
}

echo updateTaskCheckStatus();

?>