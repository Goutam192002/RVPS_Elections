<?php
$admin_name = $_POST['admin_name'];
$admin_username = $_POST['admin_username'];
$admin_mobile_no = $_POST['admin_mobile_no'];
$admin_email = $_POST['admin_email'];
$admin_password = $_POST['admin_password'];
include "dbconnect.php";
$query = "INSERT INTO admin_table (admin_username,admin_password,admin_mobile_no,admin_email,admin_name) VALUES('$admin_username','$admin_password','$admin_password','$admin_email','$admin_name')";
$result = $conn->query($query);
if (!$result) {
    echo json_encode("error occured");
} else {
    echo json_encode("OK");
}