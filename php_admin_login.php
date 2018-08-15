<?php
$admin_username=$_POST['admin_username'];
$admin_password=md5($_POST['admin_password']);
include 'dbconnect.php';
if($connection)
{
    $query="SELECT * FROM admin_table where admin_name='$admin_username' and admin_password='$admin_password'";
    $result=$conn->query($query);
    if($result->num_rows==1)
    {
        echo json_encode("OK");
    }
    else
    {
        echo json_encode("error occured");
    }
}
?>