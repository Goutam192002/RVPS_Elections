<?php
include "dbconnect.php";
$query = "SELECT * FROM admin_table";
$result = $conn->query($query);
for ($i = 0; $i < $result->num_rows; $i++) {
    $result_array[] = $result->fetch_assoc();
}
echo json_encode($result_array);