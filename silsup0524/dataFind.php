<?php
    $myfile = fopen("./data.txt","r");

    $given_name = $_POST["name"];
    $given_word = $_POST["word"];

    $infoArray = array();
    while(!feof($myfile)) {
        $temp_str = fgets($myfile);
        if ($temp_str != NULL) {
            $infoArray[$temp_str] = fgets($myfile);
        }
    }

    if ($given_name == "" && $given_word == "") {
        echo "Enter the keywords of lis that you want to search.";
    } else{
        foreach($infoArray as $key => $key_value) {
            // echo "key: " . $key . " value: " . $key_value . "<br>";
            findInform($key,$key_value);
        }
    } 

    fclose($myfile);
    
    error_reporting(0);
    function findInform($argument1, $argument2) {
        $given_name = $_POST["name"];
        $given_word = $_POST["word"];

        // 여기에서 입력값이 있을때랑 없을때로 나눠보자.
        if ($given_name == "") {
            if (strpos($argument2,$given_word) === 0 || strpos($argument2,$given_word) != NULL) {
                // echo "case 1";
                echo $argument1 . "<br>" . $argument2 . "<br>";
            }
        } else if ($given_word == "") {
            if (strpos($argument1,$given_name) === 0 || strpos($argument1,$given_name) != FALSE) {
                // echo "case 2 : " . strpos($argument1,$given_name);
                echo $argument1 . "<br>" . $argument2 . "<br>";
            }
        } else {
            if ((strpos($argument2,$given_word) === 0 || strpos($argument2,$given_word) != NULL)
            && (strpos($argument1,$given_name) === 0 || strpos($argument1,$given_name) != NULL)) {
                // echo "case 3";
                echo $argument1 . "<br>" . $argument2 . "<br>";
            }
        }
    }


?>