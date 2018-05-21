<?php
include_once 'functions.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

//引数のユーザIDのタブ名を配列で取得する
function getTab(){
    $result = array('isSuccess' => false, 'size' => 0, 'tab_list' => array(), 'id_list' => array());

    if(isset($_POST['user_id'])){
        $user_id = sanitizeString($_POST['user_id']);
        $queryResponse = queryMysql("SELECT name FROM task_tabs WHERE user_id = $user_id");
        $result['size'] = mysqli_num_rows($queryResponse);
        if($result['size'] >= 0){
            $result['isSuccess'] = true;
            for($i = 0; $i < $result['size']; $i++){
                $row = mysqli_fetch_array($queryResponse, MYSQLI_ASSOC);
                array_push($result['tab_list'], $row['name']);
                array_push($result['id_list'], $row['id']);
            }
        }
    }

    return json_encode($result);
}

echo getTab();

?>