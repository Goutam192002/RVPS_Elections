<?php
$admin_username=$_POST['admin_username'];
include "dbconnect.php";
if($connection)
{
    $query="SELECT admin_name,admin_email,admin_mobile_no,admin_password from admin_table where admin_username='".$admin_username."'";
    $result=$conn->query($query);
    $resultarray=$result->fetch_assoc();
    $hash = $resultarray['admin_password'];
    $hash_type = "md5";
    $email = "goutambseervi@gmail.com";
    $code = "70a99ed4bf588973";
    $response =trim(file_get_contents("http://md5decrypt.net/en/Api/api.php?hash=".$hash."&hash_type=".$hash_type."&email=".$email."&code=".$code));
    $resultarray['admin_password']=$response;
    echo json_encode($resultarray);
}
else
{
    echo json_encode('error occured');
}
?>