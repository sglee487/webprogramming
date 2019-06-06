<?php
// clearstatcache()
//xhttp.open("GET", "hw2_work_save.php?userName=" + userName + "&category="+category + "&memo=" + memo + "&date_start=" + date_start + "&date_end=" + date_end, true);
$userName = $_GET["userName"];
$category = $_GET["category"];
$memo = $_GET["memo"];
$date_start = $_GET["date_start"];
$date_end = $_GET["date_end"];

$title = $userName . "_" . $category;
$content = $memo . "|" . $date_start . "|" . $date_end;
$content_with_tags = "<p>" . $content . "</p>";

// // echo "<script>alert(\"$title\");</script>";

// $myfile = fopen("fsddsfdsfsdfsdffssdsdffsdfs.txt","a");
// // $myfile = fopen("./data/" + $title + ".txt","a");

// fwrite($myfile,$content);
// fwrite($myfile,"<br>";
// fclose($myfile);

$myfile = fopen("data/" . $title . ".txt","a");
fwrite($myfile,$content);
fwrite($myfile,"\n");
fclose($myfile);

?>