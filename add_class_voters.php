<?php
/*$voters_class = $_POST['voters-class'];
$voters_section = $_POST['voters-section'];
$no_of_students = $_POST['no-of-students'];*/
$response = "";
$no_of_students = 28;
include "dbconnect.php";
$query = "SELECT * FROM voting_details WHERE student_class='10' AND student_section='A'";
$no_of_rows = $conn->query($query)->num_rows;
if ($no_of_rows == 0) {
    for ($i = 1; $i <= $no_of_students; $i++) {
        $result = $conn->query("INSERT INTO voting_details (student_roll_no,student_class,student_section) VALUES ('$i' , '10' , 'A')");
        if ($result)
            $response = "OK";
        else
            $response = "Error";
    }
} else
    $response = "Class has already been added..Please check and try again";
echo json_encode($response);