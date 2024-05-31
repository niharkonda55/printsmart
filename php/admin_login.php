<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT id, password FROM users WHERE username='$username' AND role='admin'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Compare passwords without hashing
        if ($password === $row['password']) {
            session_start();
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['role'] = 'admin'; // Set role directly as 'admin'
            header("Location: ../admin_dashboard.html");
            exit();
        } else {
            // Redirect to admin login page with error message for invalid credentials
            header("Location: ../admin_login.html?error=invalid_credentials");
            exit();
        }
    } else {
        // Redirect to admin login page with error message for invalid credentials
        header("Location: ../admin_login.html?error=invalid_credentials");
        exit();
    }
}
?>