<html><head><title>Setting up database</title></head><body>

<h3>Setting up...</h3>

<?php
include_once 'functions.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

createTable('members',
            'mail VARCHAR(50),
            pass VARCHAR(255),
            INDEX(mail(10))');

createTable('task_theme',
            'name VARCHAR(50),
            id INT UNSIGNED NOT NULL AUTO_INCREMENT KEY');

createTable('tasks',
            'name VARCHAR(50),
            id INT');

?>

<br />...done.
</body></html>
