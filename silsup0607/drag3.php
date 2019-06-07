<?php
$myfile = fopen("drag1.txt","r");
$line = fgets($myfile);
echo $line;
fclose($myfile);

?>