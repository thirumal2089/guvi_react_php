<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guvi";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$email = $_POST['email'];
$password = $_POST['password'];

if ($redis->exists($email)) {
    echo "User with this email already exists!";
    exit;
}

$sql_check = "SELECT * FROM users WHERE email='$email'";
$result_check = $conn->query($sql_check);

if ($result_check->num_rows > 0) {
    echo "User with this email already exists";
    exit;
} 

$sql = "INSERT INTO users (email, password) VALUES ('$email', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$redis->set($email, $password);

$conn->close();
?>
