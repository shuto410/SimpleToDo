<?php
include_once "functions.php";


//ini_set('display_errors', 1);
//error_reporting(E_ALL);

function addTask(){
    global $dblink;
    $result = array('is_succeeded' => false, 'id' => null);

    if(isset($_POST['name']) AND isset($_POST['description']) AND isset($_POST['tab_id']) AND isset($_POST['user_id'])){
        //入力値のサニタイズ
        $name       = sanitizeString($_POST['name']);
        $description = sanitizeString($_POST['description']);
        $tab_id      = sanitizeString($_POST['tab_id']);
        $user_id     = sanitizeString($_POST['user_id']);

        if(empty($name) OR empty($tab_id) OR empty($user_id)) return;
    
        $queryResult = queryMysql("INSERT INTO tasks(title, description, is_checked, user_id, tab_id) VALUES('$name', '$description', false, $user_id, $tab_id)");
        if($queryResult == true){
            $result['is_succeeded'] = true;
            $result['id'] = mysqli_insert_id($dblink);
        }
    }
    else{
        $result['is_succeeded'] = "unset";
    }

    return json_encode($result);
}

echo addTask();

?>