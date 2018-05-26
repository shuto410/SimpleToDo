<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include_once 'functions.php';


function fetchUserName(){
    $result = array('isSuccess' => false, 'name' => "");
    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $resultUsers = queryMysql("SELECT * FROM users WHERE id='$id'");
        $userName = getDatabaseMatch($resultUsers, 'name');
        $result['name'] = $userName;
        $result['isSuccess'] = true;   
        return json_encode($result);
    }
}

echo fetchUserName();

?>