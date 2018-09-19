<?php
$school_captain_vote = $_POST['school_captain_vote'];
$school_vice_captain_vote = $_POST['school_vice_captain_vote'];
$house_captain_vote = $_POST['house_captain_vote'];
$house_vice_captain_vote = $_POST['house_vice_captain_vote'];
$voter_class = $_POST['voter_class'];
$voter_section = $_POST['voter_section'];
$voter_roll_no = $_POST['voter_roll_no'];
//$voter_house=$_POST['voter_house'];
include "dbconnect.php";
$query = "UPDATE voting_details SET school_captain_vote='$school_captain_vote',school_vice_captain_vote='$school_vice_captain_vote',house_captain_vote='$house_captain_vote',house_vice_captain_vote='$house_vice_captain_vote'  WHERE student_roll_no='$voter_roll_no' AND student_class='$voter_class' AND student_section='$voter_section'";
$result = $conn->query($query);
if ($result)
    echo json_encode("OK");
else
    echo json_encode("Error occured");
