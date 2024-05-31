<?php
include 'config.php';

$sql = "SELECT documents.id, users.username, documents.filename, documents.upload_time, documents.status, documents.file_path FROM documents JOIN users ON documents.user_id = users.id";
$result = $conn->query($sql);

$documents = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $documents[] = $row;
    }
}

echo json_encode($documents);
?>
