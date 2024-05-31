<?php
// Set the admin password
$admin_password = "admin_password";

// Hash the admin password
$hashed_admin_password = password_hash($admin_password, PASSWORD_DEFAULT);

// Output the hashed password
echo "Hashed admin password: " . $hashed_admin_password;
?>
