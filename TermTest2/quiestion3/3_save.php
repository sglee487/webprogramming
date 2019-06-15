<?php

$inputTitle = $_POST["title"];
$inputContent = $_POST["content"];

// echo "TEst";
// echo $inputTitle;
// echo $inputContent;

$myfile_r = fopen("data.txt","a");
fwrite($myfile_r,$inputTitle);
fwrite($myfile_r,$inputContent);
fclose($myfile_r);


?>