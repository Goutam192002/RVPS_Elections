<?php
$student_house = $_POST['student_house'];
include "dbconnect.php";
$query = "SELECT contestant_name,contestant_picture,contestant_id FROM contestant_details WHERE election_type IN(CONCAT('$student_house','CN'),CONCAT('$student_house','VC'),'SLCN','SVCN')";
$result = $conn->query($query);
$response = [];
for ($i = 0; $i < $result->num_rows; $i++) {
    $response[] = json_encode($result->fetch_assoc());
}
print_r($response);