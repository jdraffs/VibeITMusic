<?php
// db.php

$host = 'localhost';
$db = 'vibeit';   // Your database name
$user = 'root';      // Your MySQL username
$pass = '';          // Your MySQL password

try {
    // Create a PDO instance and set attributes
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
