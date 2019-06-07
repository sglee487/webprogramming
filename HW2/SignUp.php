<?php

$inputUserId = $_POST["UserId"];
$inputUserPassword = $_POST["UserPassword"];
// echo $inputUserId . " " . $inputUserPassword . "<br>";
if ($inputUserId == "" || $inputUserPassword == "") {
    echo "아이디 또는 패스워드를 입력해 주세요.";
} else {
    $myfile_r = fopen("./data/person.txt","r");

    $noDuplId = TRUE;
    while(!feof($myfile_r)) {
        $tempReadId = trim(fgets($myfile_r));
        // echo "읽은 \$tempReadId 값은 : " . $tempReadId . "타입은 : " . gettype($tempReadId) . "<br>";
        if($tempReadId == NULL) {
            // echo "if(\$tempReadId == NULL) 안으로 들어왔다. <br>";
            break;
        }
        // echo "읽은 \$inputUserId 값은 : " . $inputUserId . "타입은 : " . gettype($inputUserId) . "<br>";
        if ($inputUserId == $tempReadId) {
            // echo "if(\$inputUserId == \$tempReadId) 안으로 들어왔다. <br>";
            $noDuplId = FALSE;
            break;
        }
        // fgets($myfile_r);
        // echo "읽은 password 값: " . fgets($myfile_r) . "<br>";
    }
    fclose($myfile_r);

    if (!$noDuplId) {
        echo "이미 존재하는 아이디가 있습니다.";
    } else {
        $myfile_a = fopen("./data/person.txt","a");
        fwrite($myfile_a, $inputUserId . "\n");
        fwrite($myfile_a, $inputUserPassword . "\n");
        fclose($myfile_a);
        echo "성공적으로 저장되었습니다.";
    }
}



?>