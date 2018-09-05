<?php
$candidate_id = $_POST['candidate_id'];
include "dbconnect.php";
$query = "DELETE FROM contestant_details WHERE contestant_id='$candidate_id'";
echo json_encode("OK");