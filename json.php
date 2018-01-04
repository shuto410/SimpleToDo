<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include_once 'functions.php';

$result = array('result' => FALSE);

$mail = "null";
$pass = "null";

//echo $_POST['mail'];

if (isset($_POST['mail']) AND isset($_POST['pass'])){
    $mail = sanitizeString($_POST['mail']);
    $pass = sanitizeString($_POST['pass']);
  
    if($mail == 'skill' AND $pass == "9314"){
        $result = array('result' => TRUE);
    }
}



//$arr = array('name' => 'kizuna ai', 'age' => 14);

echo json_encode($result);
//echo "{\"result\": ". $mail ."}";

//echo "unko";

?>
