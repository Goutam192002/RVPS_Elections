<?php
$admin_username=$_POST['admin_username'];
include "dbconnect.php";
if($connection)
{
    $query="SELECT admin_name,admin_username,admin_email,admin_mobile_no,admin_password from admin_table where admin_username='".$admin_username."'";
    $result=$conn->query($query);
    $resultarray=$result->fetch_assoc();
    echo json_encode($resultarray);
}
else
{
    echo json_encode('error occured');
}
?>