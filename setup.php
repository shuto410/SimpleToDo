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
?>

<br />...done.
</body></html>
