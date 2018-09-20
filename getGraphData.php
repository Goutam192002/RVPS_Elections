<?php
$election_type = $_POST['election_type'];
include "dbconnect.php";
$query = "SELECT contestant_name,contestant_id FROM contestant_details WHERE election_type='$election_type'";
$result = $conn->query($query);
//$length=$result->num_rows;
for ($j = 0; $j < $result->num_rows; $j++) {
    $resultTemp = $result->fetch_assoc();
    $temp = $resultTemp['contestant_id'];
    $final_query = "SELECT COUNT(*) FROM voting_details where school_captain_vote='$temp' OR school_vice_captain_vote='$temp' OR house_captain_vote='$temp' OR house_vice_captain_vote='$temp'";
    $final_result = $conn->query($final_query)->fetch_assoc();
    $candidate_array = ['candidate_id' => $temp,
        'candidate_name' => $resultTemp['contestant_name']];
    $response[] = ['candidate_info' => $candidate_array,
        'count_of_votes' => $final_result['COUNT(*)']];
}
echo json_encode($response);