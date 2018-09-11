<?php
$username = $_POST['username'];
include "dbconnect.php";
$result = $conn->query("SELECT * FROM admin_table where admin_username='$username'");
if ($result->num_rows == 0)
    echo json_encode("username available");
else
    echo json_encode("username already taken");
