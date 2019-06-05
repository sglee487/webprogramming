<?php

// xhttp.open("GET", "hw2_work_save.php?category="+category + "&memo=" + memo + "&date_start=" + date_start + "&date_end=" + date_end, true);
$category = $_GET["category"];
$memo = $_GET["memo"];
$date_start = $_GET["date_start"];
$date_end = $_GET["date_end"];

$all = $category . $memo . $date_start . $date_end;
$myfile = fopen("./data/testtxtfile.txt","a");
fwrite($myfile,$all);
fclose($myfile);

?>