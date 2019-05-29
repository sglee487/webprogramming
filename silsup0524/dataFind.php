<?php
    $myfile = fopen("./data.txt","r");

    $given_name = $_POST["name"];
    $given_word = $_POST["word"];

    $infoArray = array();
    // echo fgets($myfile);  
    while(!feof($myfile)) {
        // echo fgets($myfile) . fgets($myfile);
        $temp_str = fgets($myfile);
        if ($temp_str != NULL) {
            $infoArray[$temp_str] = fgets($myfile);
        }
        // $infoArray[fgets($myfile)] = fgets($myfile);
        // echo $infoArray['aaa'];
    }
    // $infoArray = array_pop($infoArray);
    foreach($infoArray as $key => $key_value) {
        findInform($key,$key_value);
        // echo $key;
        // echo gettype($key);
        // echo $key_value;
        // echo gettype($key_value);
    }


    fclose($myfile);
    
    error_reporting(0);
    function findInform($argument) {
        echo gettype($given_name);
        if ($given_name == "" && $given_word == "") {
            echo "Enter the keywords of lis that you want to search.";
        } else if($given_name == "") {
            if (!((strpos($argument[1],$given_word) == -1))) {
                echo $argument[0] . "<br>" . $argument[1];
            }
        } else if($given_word == "") {
            if (!(strpos($given_name,$given_name) == -1)) {
                echo $argument[0] . "<br>" . $argument[1];
            }
        } else {
            if (!(strpos($argument[0],$given_name) == -1) || !(strpos($argument[1],$given_word) == -1)) {
                echo $argument[0] . "<br>" . $argument[1];
            }
        }
    }


?>