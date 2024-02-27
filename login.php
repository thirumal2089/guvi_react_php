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

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $sessionToken = bin2hex(random_bytes(16));
    $redis = new Redis();
    $redis->connect('127.0.0.1', 6379);
    $redis->set($email, $sessionToken);
    $response = ['status' => 'success'];
} else {
    $response = ['status' => 'fail', 'message' => 'Invalid email or password'];
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
