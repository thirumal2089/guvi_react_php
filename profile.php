<?php

require 'vendor/autoload.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$token = $_GET['token'];

$email = $redis->get($token);

$mongoClient = new MongoDB\Client("mongodb://localhost:27017");
$database = $mongoClient->selectDatabase('guvi');
$collection = $database->users;


if ($email) {
    $user = $collection->findOne(['email' => $email]);

    if ($user) {
        $name = $user->name;
        $dob = $user->dob;
        $contactNumber = $user->contactNumber;
    } else {
        $name = '';
        $dob = '';
        $contactNumber = '';
    }

    echo json_encode([
        'name' => $name,
        'dob' => $dob,
        'contactNumber' => $contactNumber,
        'email' => $email
    ]);
} else {
    echo "No session token found";
}
?>
