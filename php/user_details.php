<?php
session_start();
include 'config.php';

$user_id = $_SESSION['user_id'];
$sql = "SELECT username, email FROM users WHERE id='$user_id'";
$result = $conn->query($sql);

$user_details = [];

if ($result->num_rows > 0) {
    $user_details = $result->fetch_assoc();
}

echo json_encode($user_details);
?>
