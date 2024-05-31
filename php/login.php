<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT id, password, role FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            session_start();
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['role'] = $row['role'];
            if ($row['role'] == 'admin') {
                header("Location: ../admin_dashboard.html");
            } else {
                header("Location: ../user_dashboard.html");
            }
        } else {
            header("Location: ../login.html?error=invalid_credentials");
            exit();
        }
    } else {
        header("Location: ../login.html?error=invalid_credentials");
        exit();
    }
}
?>
