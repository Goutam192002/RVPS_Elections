<?php
phpinfo();
include "dbconnect.php";
$query = "SELECT * FROM contestant_details";
$result = $conn->query($query);
$result_array = [];
for ($i = 0; $i < $result->num_rows; $i++) {
    $result_array[] = $result->fetch_assoc();
}
echo json_encode($result_array);