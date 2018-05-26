<?php
include_once 'functions.php';

//ini_set('display_errors', 1);
//error_reporting(E_ALL);

//引数のユーザIDのタブ名を配列で取得する
function fetchTab(){
    $result = array('is_succeeded' => false, 'tabs' => array());

    if(isset($_POST['user_id'])){
        $user_id = sanitizeString($_POST['user_id']);
        $queryResponse = queryMysql("SELECT * FROM task_tabs WHERE user_id = $user_id");
        $size = mysqli_num_rows($queryResponse);
        if($size >= 0){
            $result['is_succeeded'] = true;
            for($i = 0; $i < $size; $i++){
                $row = mysqli_fetch_array($queryResponse, MYSQLI_ASSOC);
                $result['tabs'] += array($row['id'] => $row['name']);
            }
        }
    }

    return json_encode($result);
}

echo fetchTab();

?>