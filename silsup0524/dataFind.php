<?php
    $myfile = fopen("./data.txt","r");

    $given_name = $_POST["name"];
    $given_word = $_POST["word"];

    $infoArray = array();
    // echo fgets($myfile);  
    while(!feof($myfile)) {
        // echo fgets($myfile) . fgets($myfile);
        $infoArray[fgets($myfile)] = fgets($myfile);
        // echo $infoArray['aaa'];
    }
    foreach($infoArray as $key => $key_value) {
        findInform($key,$key_value);
    }


    fclose($myfile);

    function findInform(Str $arrayName, Str $arrayWord) {
        if ($arrayName == NULL && $arrayWord == NULL) {
            echo "Enter the keywords of lis that you want to search.";
        } else if($arrayName == NULL) {
            if (!((strpos($arrayWord,$given_word) == -1))) {
                echo $arrayName . "<br>" . $arrayWord;
            }
        } else if($_word == NULL) {
            if (!(strpos($arrayName,$given_name) == -1)) {
                echo $arrayName . "<br>" . $arrayWord;
            }
        } else {
            if (!(strpos($arrayName,$given_name) == -1) || !(strpos($arrayWord,$given_word) == -1)) {
                echo $arrayName . "<br>" . $arrayWord;
            }
        }
    }


?>