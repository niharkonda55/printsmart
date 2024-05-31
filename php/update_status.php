<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $document_id = $_POST['document_id'];
    $status = $_POST['status'];

    $sql = "UPDATE documents SET status='$status' WHERE id='$document_id'";

    if ($conn->query($sql) === TRUE) {
        echo "Status updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>
