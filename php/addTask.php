<?php
include_once "functions.php";


ini_set('display_errors', 1);
error_reporting(E_ALL);

function addTask(){
    global $dblink;
    $result = array('isSuccess' => false, 'id' => null);

    if(isset($_POST['title']) AND isset($_POST['description']) AND isset($_POST['tab_id']) AND isset($_POST['user_id'])){
        //入力値のサニタイズ
        $title       = sanitizeString($_POST['title']);
        $description = sanitizeString($_POST['description']);
        $tab_id      = sanitizeString($_POST['tab_id']);
        $user_id     = sanitizeString($_POST['user_id']);

        if(empty($title) OR empty($tab_id) OR empty($user_id)) return;
    
        $queryResult = queryMysql("INSERT INTO tasks(title, description, user_id, tab_id) VALUES('$title', '$description', $user_id, $tab_id)");
        if($queryResult == true){
            $result['isSuccess'] = true;
            $result['id'] = mysqli_insert_id($dblink);
        }
    }
    else{
        $result['isSuccess'] = "unset";
    }

    return json_encode($result);
}

echo addTask();

?>