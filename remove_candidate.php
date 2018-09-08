<?php
$candidate_id = $_POST['candidate_id'];
include "dbconnect.php";
$query = "DELETE FROM contestant_details WHERE contestant_id='$candidate_id'";
$result = $conn->query($query);
echo json_encode("OK");