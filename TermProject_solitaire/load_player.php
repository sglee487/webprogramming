<?php

$myfile_r = fopen("data/player_score.txt","r");

$line_data;
while (!feof($myfile_r)) {
    $line_data = fgets($myfile_r);
}
echo $line_data;
?>