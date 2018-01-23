<html><head><title>Setting up database</title></head><body>

<h3>Setting up...</h3>

<?php
include_once 'functions.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

createTable('users',
            'mail VARCHAR(50),
            pass VARCHAR(255),
            name VARCHAR(50),
            id INT UNSIGNED NOT NULL AUTO_INCREMENT KEY,
            INDEX(id)');

createTable('task_tabs',
            'name VARCHAR(50),
            user_id INT UNSIGNED,
            id INT UNSIGNED NOT NULL AUTO_INCREMENT KEY');

createTable('tasks',
            'name VARCHAR(50),
            tab_id INT');

?>

<br />...done.
</body></html>
