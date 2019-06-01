<?php

$inputUserId = $_POST["UserId"];
$inputUserPassword = $_POST["UserPassword"];

$myfile_r = fopen("./data/person.txt","r");

$NOT_EXIST_ID = 0;
$NOT_RIGHT_PASSWORD = 1;
$LOGIN_SUCCESS = 2;
$loginFlag = $NOT_EXIST_ID;
while(!feof($myfile_r)) {
    $tempReadId = trim(fgets($myfile_r));
    echo "읽은 \$tempReadId 값은 : " . $tempReadId . "타입은 : " . gettype($tempReadId) . "<br>";
    if($tempReadId == NULL) {
        echo "if(\$tempReadId == NULL) 안으로 들어왔다. <br>";
        $loginFlag = $NOT_EXIST_ID;
        break;
    }

    echo "읽은 \$inputUserId 값은 : " . $inputUserId . "타입은 : " . gettype($inputUserId) . "<br>";
    if ($inputUserId == $tempReadId) {
        // echo "if(\$inputUserId == \$tempReadId) 안으로 들어왔다. <br>";

        $tempReadPassword = trim(fgets($myfile_r));
        if ($inputUserPassword == $tempReadPassword) {
            // 로그인 성공
            $loginFlag = $LOGIN_SUCCESS;
            
            break;
        } else {
            // 아이디는 맞지만 비밀번호 잘못 입력
            $loginFlag = $NOT_RIGHT_PASSWORD;
            break;
        }
    }
    fgets($myfile_r);
}
fclose($myfile_r);

if ($loginFlag == 0) {
    echo "존재하지 않는 아이디 입니다.";
} else if ($loginFlag == 1){
    echo "패스워드가 틀립니다.";
} else {
    // 스케쥴 창을 띄워야 함.
    echo "로그인 성공";
    header("Location:hw2_sche.php?name=$inputUserId");
    // exit();
}




?>