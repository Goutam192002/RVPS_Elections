<?php
$contestant_name = $_POST['contestant-name'];
$contestant_election_type = $_POST['contestant-election-type'];
$image_tmp_name = $_FILES['contestant-picture']['tmp_name'];
$contestant_id = "RVPS2018";
$temp = explode(" ", $contestant_name);
foreach ($temp as $t) {
    $contestant_id .= $t[0];
}
$contestant_id .= $contestant_election_type;
$image_directory = "assets/" . $contestant_id . ".jpg";
include "dbconnect.php";
if ($_POST['type-of-form'] == "new-candidate") {
    $query1 = "SELECT * FROM contestant_details where contestant_name='$contestant_name'";
    $query2 = "SELECT * FROM contestant_details where contestant_id='$contestant_id'";
    $result = $conn->query($query1);
    $result1 = $conn->query($query2);
    $response = "";
    if ($result->num_rows == 0 && $result1->num_rows == 0) {
        move_uploaded_file($image_tmp_name, $image_directory);
        $query = "INSERT into contestant_details (contestant_name,contestant_picture,contestant_id,election_type) VALUES('$contestant_name','$image_directory','$contestant_id','$contestant_election_type')";
        $result2 = $conn->query($query);
        $response = "OK";
        /*else
        {
            $response="Error Occured..Please try again";
        }*/
    } else
        $response = "Error Occured....Candidate name has already been registered";
} else {
    $old_candidate_id = $_POST['old-candidate-id'];
    move_uploaded_file($image_tmp_name, $image_directory);
    $query = "UPDATE contestant_details SET  contestant_name='$contestant_name',contestant_picture='$image_directory',contestant_id='$contestant_id',election_type='$contestant_election_type' WHERE contestant_id='$old_candidate_id'";
    $result = $conn->query($query);
    $result != null ? $response = "OK" : $response = "Error Occured";
}
echo json_encode($response);