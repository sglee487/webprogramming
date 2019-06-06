<?php

// clearstatcache()
$user = $_GET["user"];
$category = $_GET["category"];
$Line = $_GET["Line"];


$myfile = fopen("data/" . $user . "_" . $category . ".txt","a");
fwrite($myfile,$Line . "\n");
// fwrite($myfile,"\n");
fclose($myfile);

?>