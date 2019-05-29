<?php
    $myfile = fopen("./data.txt","r");

    $infoArray = array();
    // echo fgets($myfile);  
    while(!feof($myfile)) {
        // echo fgets($myfile) . fgets($myfile);
        $temp_str = fgets($myfile);
        if ($temp_str != NULL) {
            $infoArray[$temp_str] = fgets($myfile);
        }
        // echo $infoArray['aaa'];
    }
    foreach($infoArray as $key => $key_value) {
        echo $key . "<br>" . $key_value . "<br>";
    }
    fclose($myfile);

?>