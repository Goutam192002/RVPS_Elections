<?php
$voters_class = $_POST['voters-class'];
$voters_section = $_POST['voters-section'];
$no_of_students = $_POST['no-of-students'];
$response = "";
include "dbconnect.php";
$query = "SELECT * FROM voting_details WHERE student_class='$voters_class' AND student_section='$voters_section'";
if ($conn->query($query)->num_rows == 0) {
    for ($i = 1; $i < $no_of_students; $i++) {
        $query = "INSERT INTO voting_details(student_roll_no,student_class,student_section,) VALUES ('$i','$voters_class','$voters_section')";
        $conn->query($query);
    }
    $response = "OK";
} else
    $response = "Class has already been added..Please check and try again";