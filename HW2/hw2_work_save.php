<?php

$work = $_GET["work"]; 
$myfile = fopen("testtxtfile.txt","a");
fwrite($myfile,$work);
fclose($myfile);

?>