<?php

$q = $_GET["hint"];

$hint = "";

$myfile_r = fopen("data.txt","r");
while (!feof($myfile_r)) {
    $line = fgets($myfile_r);
    $token = strtok($line,"|");
    $token = strtok("|");
    // echo $token;

    $a[] = $token;
    $token = strtok("|");
    $b[] = $token;
    // $title = str_split("|");
    // $a[] = $title[1];
    // echo $title[1];
    
}
fclose($myfile_r);


$index = 0;
    foreach($a as $title) {
        // echo substr($title, 0, $len);
        if (stristr($q, $title)) {
            $content = $b[$index];
            
        }
        $index++;
    }


echo $content;

// foreach($hint_a as $onehint) {
//     echo $onehint === "" ? "no suggestion" : "<li id = " . $onehint . " onclick = findContent(". $onehint . ")> " . $onehint . "</li>";
// }
// echo $hint === "" ? "no suggestion" : "<li> " . $hint . "</li>";
// echo $hint;
// echo $q;


?>