<?php
// clearstatcache()
$user = $_GET["user"];
$category = $_GET["category"];


$myfile = fopen("data/" . $user . "_" . $category . ".txt","w");

fclose($myfile);

?>