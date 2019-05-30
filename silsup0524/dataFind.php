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

    if ($given_name == "" && $given_word == "") {
        echo "Enter the keywords of lis that you want to search.";
    } else{
        foreach($infoArray as $key => $key_value) {
            echo "key: " . $key . " value: " . $key_value . "<br>";
            findInform($key,$key_value);
        }
    } 
    // else if($given_word == "") {
    //     if (!(strpos($given_name,$given_name) == -1)) {
    //         echo $argument[0] . "<br>" . $argument[1];
    //     }
    // } else {
    //     if (!(strpos($argument[0],$given_name) == -1) || !(strpos($argument[1],$given_word) == -1)) {
    //         echo $argument[0] . "<br>" . $argument[1];
    //     }
    // }


    fclose($myfile);
    
    error_reporting(0);
    function findInform($argument1, $argument2) {
        $given_name = $_POST["name"];
        $given_word = $_POST["word"];
        // echo "given_name: " . $given_name . " given_word: " . $given_word . "<br>";
        // echo "argument1 : " . $argument1 . " argument2: " . $argument2 . "<br>";

        // 여기에서 입력값이 있을때랑 없을때로 나눠보자.
        if ($given_name == "") {
            if (strpos($argument2,$given_word) === 0 || strpos($argument2,$given_word) != NULL) {
                // echo "case 1";
                echo "<br>" . $argument1 . "<br>" . $argument2 . "<br>";
            }
        } else if ($given_word == "") {
            if (strpos($argument1,$given_name) === 0 || strpos($argument1,$given_name) != FALSE) {
                // echo "case 2 : " . strpos($argument1,$given_name);
                echo "<br>" . $argument1 . "<br>" . $argument2 . "<br>";
            }
        } else {
            if (strpos($argument2,$given_word) === 0 || strpos($argument2,$given_word) != NULL
            || strpos($argument1,$given_name) === 0 || strpos($argument1,$given_name) != NULL) {
                // echo "case 3";
                echo "<br>" . $argument1 . "<br>" . $argument2 . "<br>";
            }
        }

        // if($given_name == "") {
        //     if ((strpos($argument[1],$given_word) == -1)) {
        //         echo $argument[0] . "<br>" . $argument[1];
        //     }
        // } else if($given_word == "") {
        //     if (!(strpos($given_name,$given_name) == -1)) {
        //         echo $argument[0] . "<br>" . $argument[1];
        //     }
        // } else {
        //     if (!(strpos($argument[0],$given_name) == -1) || !(strpos($argument[1],$given_word) == -1)) {
        //         echo $argument[0] . "<br>" . $argument[1];
        //     }
        // }
    }


?>