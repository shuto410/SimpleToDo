<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$dbhost  = 'localhost';
$dbname  = 'task_manager';
$dbuser  = 'tatami';
$dbpass  = 'pass';
$appname = "sample_game";


$dblink = mysqli_connect($dbhost, $dbuser, $dbpass);


mysqli_set_charset($dblink, 'utf8');

if(!$dblink) die("Unable to connect to MySQL: ".mysqli_connect_error());
mysqli_select_db($dblink, $dbname) or die("Unable to select MySQL: ".mysqli_error($dblink));

function sanitizeString($var){
    global $dblink;
    $var = strip_tags($var);
    $var = htmlentities($var);
    $var = stripslashes($var);
    return mysqli_real_escape_string($dblink, $var);
}

function createTable($name, $query){
    queryMysql("CREATE TABLE IF NOT EXISTS $name($query)");
    echo "Table '$name' created or already exists.<br />";
}

function deleteTable($name){
    queryMysql("DROP TABLE $name");
    echo "Table '$name' delete or don't exists.<br />";
}

function queryMysql($query){
    global $dblink;
    $result = mysqli_query($dblink, $query) or die(mysqli_error($dblink));
	return $result;
}

function isMailAddress($text) {
    if (preg_match("/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/", $text)) {
            return TRUE;
        } else {
            return FALSE;
        }
}


function getDatabaseMatch($result, $key){
    while ($row = mysqli_fetch_assoc($result)) {
         // パスワード(暗号化済み）の取り出し
         return $row[$key];
    }
}


?>