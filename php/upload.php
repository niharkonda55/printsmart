<!--?php
session_start();
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['document'])) {
    $user_id = $_SESSION['user_id'];
    $file = $_FILES['document'];
    $filename = $file['name'];
    $destination = '../uploads/' . $filename;

    if (move_uploaded_file($file['tmp_name'], $destination)) {
        $sql = "INSERT INTO documents (user_id, filename) VALUES ('$user_id', '$filename')";

        if ($conn->query($sql) === TRUE) {
            header("Location: ../user_dashboard.html");
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Failed to upload file.";
    }
}
?-->
<?php
session_start();
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['document'])) {
    $user_id = $_SESSION['user_id'];
    $file = $_FILES['document'];
    $filename = $file['name'];
    $destination = '../uploads/' . $filename;

    if (move_uploaded_file($file['tmp_name'], $destination)) {
        $file_path = $filename; // Define the file path

        $sql = "INSERT INTO documents (user_id, filename, file_path) VALUES ('$user_id', '$filename', '$file_path')";

        if ($conn->query($sql) === TRUE) {
            header("Location: ../user_dashboard.html");
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Failed to upload file.";
    }
}
?>

