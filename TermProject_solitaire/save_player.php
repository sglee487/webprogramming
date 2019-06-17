<?php

$player = $_REQUEST["player"];
$score = $_REQUEST["score"];

$myfile_w = fopen("data/player_score.txt","w");
fwrite($myfile_w, $player . "|" . $score);
fclose($myfile_w);

echo $player;

?>