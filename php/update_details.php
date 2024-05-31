<?php
session_start();
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_SESSION['user_id'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "UPDATE users SET username='$username', email='$email'";
    if (!empty($password)) {
        $password_hashed = password_hash($password, PASSWORD_BCRYPT);
        $sql .= ", password='$password_hashed'";
    }
    $sql .= " WHERE id='$user_id'";

    if ($conn->query($sql) === TRUE) {
        echo "Details updated successfully";
        header("Location: ../user_dashboard.html");
    } else {
        echo "Error updating record: " . $conn->error;
    }
}
?>
