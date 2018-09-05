<?php
include "dbconnect.php";
$query = "SELECT DISTINCT student_class,student_section FROM voting_details";
$result = $conn->query($query);
$reultarray = [];
for ($i = 0; $i < $result->num_rows; $i++) {
    $reultarray[] = $result->fetch_assoc();
}
$reultarray['no_of_students'] = $result->num_rows;
echo json_encode($reultarray);
