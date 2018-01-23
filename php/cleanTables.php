<html><head><title>Clean up database</title></head><body>

<h3>Setting up...</h3>

<?php
include_once 'functions.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

deleteTable('users');
deleteTable('task_tabs');
deleteTable('tasks');
/**/
?>

<br />...done.
</body></html>
