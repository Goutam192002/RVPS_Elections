<?php
$student_class = $_POST['student_class'];
$student_section=$_POST['student_section'];
$roll_no=$_POST['roll_no'];
$student_house = $_POST['student_house'];
include "dbconnect.php";
$response = "";
$query = "SELECT * FROM voting_details WHERE student_class='$student_class' AND student_section='$student_section' AND student_roll_no='$roll_no'";
if ($conn->query($query)->num_rows != 1) {
    $response = "Invalid details entered ...Please try again";
} else {
    $query = "SELECT school_captain_vote FROM voting_details WHERE student_class='$student_class' AND student_section='$student_section' AND student_roll_no='$roll_no'";
    $result = $conn->query($query)->fetch_assoc();
    foreach ($result as $value) {
        $value == "" ? $response = "OK" : $response = "Vote has already been casted";
    }
}
echo json_encode($response);
