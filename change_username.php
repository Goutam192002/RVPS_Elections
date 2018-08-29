<?php
$new_username=$_POST['new_username'];
$current_username=$_COOKIE['admin_username'];
include "dbconnect.php";
$query="SELECT * FROM admin_table where admin_username='$new_username'";
$result=$conn->query($query);
if($result->num_rows==0)
{
    echo json_encode("username available");
    $query="UPDATE  admin_table set admin_username='$new_username' where admin_username='$current_username'";
    $conn->query($query);
}
else
{
    echo json_encode("Username has already been taken");
}
