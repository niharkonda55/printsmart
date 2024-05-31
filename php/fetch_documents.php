<?php
session_start();
include 'config.php';

$user_id = $_SESSION['user_id'];
$sql = "SELECT id, filename, upload_time, status, file_path FROM documents WHERE user_id='$user_id'";
$result = $conn->query($sql);

$documents = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $documents[] = $row;
    }
}

echo json_encode($documents);
?>
