<?php
include_once 'functions.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

//引数のユーザIDのタブ名を配列で取得する
function getTask(){
    $result = array('isSuccess' => false, 'tasks' => []);

    if(isset($_GET['user_id'])){
        $user_id = sanitizeString($_GET['user_id']);
        $queryResponse = queryMysql("SELECT * FROM tasks WHERE user_id = $user_id");
        $size = mysqli_num_rows($queryResponse);
        if($size >= 0){
            $result['isSuccess'] = true;
            for($i = 0; $i < $size; $i++){
                $row = mysqli_fetch_array($queryResponse, MYSQLI_ASSOC);
                if(!array_key_exists($row['tab_id'], $result['tasks'])){
                    $result['tasks'][$row['tab_id']] = array(array( 'title' => $row['title'], 'description' => $row['description'], 'id' => $row['id']));
                }
                else{
                    array_push($result['tasks'][$row['tab_id']], array( 'title' => $row['title'], 'description' => $row['description'], 'id' => $row['id']));
                }
            }
        }
    }

    return json_encode($result, JSON_PRETTY_PRINT);
}

echo getTask();

?>