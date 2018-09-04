<?php
/*$admin_username=$_POST['admin_username'];
$admin_password = $_POST['admin_password'];*/
include 'dbconnect.php';
$admin_username="root";
$admin_password ="RVPS2018";
if($connection)
{
    $query="SELECT * FROM admin_table where admin_username='$admin_username' and admin_password='$admin_password'";
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