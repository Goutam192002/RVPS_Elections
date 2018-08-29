<?php
$new_password = $_POST['new_password'];
$admin_username = $_COOKIE['admin_username'];
include "dbconnect.php";
$query = "UPDATE admin_table SET admin_password='$new_password'WHERE admin_username='$admin_username'";
if ($conn->query($query)) {
    echo json_encode("OK");
}