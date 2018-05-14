<?php
include_once 'functions.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

$result = array('isSuccess' => false, 'size' => 0, 'tab_list' => array());

if(isset($_POST['user_id'])){
    $user_id = sanitizeString($_POST['user_id']);
    $queryResponse = queryMysql("SELECT name FROM task_tabs WHERE user_id = $user_id");
    $result['size'] = mysqli_num_rows($queryResponse);
}

echo json_encode($result);

?>