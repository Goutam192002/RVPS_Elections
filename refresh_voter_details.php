<?php
include "dbconnect.php";
$query = "SELECT DISTINCT student_class,student_section FROM voting_details";
$result = $conn->query($query);
$reultarray = [];
for ($i = 0; $i < $result->num_rows; $i++) {
    $resultarray[] = $result->fetch_assoc();
}
$i = 0;
foreach ($resultarray as $temp) {
    $temp_class = $temp['student_class'];
    $temp_section = $temp['student_section'];
    $query = "SELECT * FROM voting_details WHERE student_class='$temp_class' and student_section='$temp_section'";
    $temp_result = $conn->query($query);
    $resultarray[$i]['no_of_students'] = $temp_result->num_rows;
    $i++;
}
echo json_encode($resultarray);
