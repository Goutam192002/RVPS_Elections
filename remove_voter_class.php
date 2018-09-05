<?php
$voter_class = $_POST['voter_class'];
$voter_section = $_POST['voter_section'];
include "dbconnect.php";
$query = "DELETE FROM voting_details WHERE student_class='$voter_class' AND student_section='$voter_section'";
$result = $conn->query($query);
echo json_encode("OK");