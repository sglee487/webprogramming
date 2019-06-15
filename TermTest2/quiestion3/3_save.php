<?php

$inputTitle = $_POST["title"];
$inputContent = $_POST["content"];

// echo "TEst";
// echo $inputTitle;
// echo $inputContent;

$number = 0;
$myfile_r = fopen("data.txt","r");
while (!feof($myfile_r)) {
    fgets($myfile_r);
    $number = $number + 1;
}
fclose($myfile_r);

$myfile_a = fopen("data.txt","a");
fwrite($myfile_a,$number ."|");
fwrite($myfile_a,$inputTitle . "|" . $inputContent . "\n");
// fwrite($myfile_a,$inputTitle . "|" + $inputContent . "\n");
fclose($myfile_a);


?>