<?php
include "dbconnect.php";
$query = "SELECT * FROM voting_details";
$result = $conn->query($query)->num_rows;
echo json_encode($result);