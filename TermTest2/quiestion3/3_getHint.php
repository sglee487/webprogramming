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
    // $title = str_split("|");
    // $a[] = $title[1];
    // echo $title[1];
    
}
fclose($myfile_r);

if ($q !== "") {
    $q = strtolower($q);
    $len = strlen($q);
    foreach($a as $title) {
        // echo substr($title, 0, $len);
        if (stristr($q, substr($title, 0, $len))) {
            if ($hint === "") {
                $hint = $title;
            } else {
                // $hint .= $title . "\n";
                $hint .= "$title";
                $hint_a[] = $title;
            }
            
        }
        
    }

}

foreach($hint_a as $onehint) {
    echo $onehint === "" ? "no suggestion" : "<li> " . $onehint . "</li>";
}
// echo $hint === "" ? "no suggestion" : "<li> " . $hint . "</li>";
// echo $hint;
// echo $q;


?>