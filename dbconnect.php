<?php
$servername="localhost";
$server_username="root";
$dbName="election_database";
$connection=true;
$conn=new mysqli($servername,$server_username,"",$dbName);
if($conn->connect_errno)
{
    $connection=false;
}
else
{
    $connection=true;
}
?>