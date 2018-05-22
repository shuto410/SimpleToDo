<?php
include_once 'functions.php';

//ini_set('display_errors', 1);
//error_reporting(E_ALL);

//引数のユーザIDのタブ名を配列で取得する
function getTab(){
    $result = array('isSuccess' => false, 'tabs' => []);

    if(isset($_POST['user_id'])){
        $user_id = sanitizeString($_POST['user_id']);
        $queryResponse = queryMysql("SELECT * FROM task_tabs WHERE user_id = $user_id");
        $size = mysqli_num_rows($queryResponse);
        if($size >= 0){
            $result['isSuccess'] = true;
            for($i = 0; $i < $size; $i++){
                $row = mysqli_fetch_array($queryResponse, MYSQLI_ASSOC);
                $result['tabs'][$i] = array( "name" => $row['name'], "id" => $row['id']);
            }
        }
    }

    return json_encode($result);
}

echo getTab();

?>