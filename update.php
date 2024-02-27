<?php
require 'vendor/autoload.php';

// Redis connection
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$token = $_GET['token'];
$email = $redis->get($token);


if ($email) {
    $mongoClient = new MongoDB\Client("mongodb://localhost:27017");
$database = $mongoClient->selectDatabase('guvi');
$collection = $database->users;
    $name = $_POST['name'];
    $dob = $_POST['dob'];
    $contactNumber = $_POST['contactNumber'];

    $result = $collection->updateOne(
        ['email' => $email],
        ['$set' => ['name' => $name, 'dob' => $dob, 'contactNumber' => $contactNumber]],['upsert' => true]
    );

    if ($result->getModifiedCount() > 0) {
        echo "Profile updated successfully";
    } else {
        echo "No changes made or user not found";
    }
} else {
    echo "No session token found";
}
?>
