<?php
    $myfile = fopen("./data.txt","r");

    $infoArray = array();
    // echo fgets($myfile);  
    while(!feof($myfile)) {
        // echo fgets($myfile) . fgets($myfile);
        $infoArray[fgets($myfile)] = fgets($myfile);
        // echo $infoArray['aaa'];
    }
    foreach($infoArray as $key => $key_value) {
        echo $key . "<br>" . $key_value;
        echo "<br>";
    }
    fclose($myfile);

?>