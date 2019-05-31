<?php

$inputUserId = $_POST["UserId"];
$inputUserPassword = $_POST["UserPassword"];
// echo $inputUserId . " " . $inputUserPassword . "<br>";
if ($inputUserId == "" || $inputUserPassword == "") {
    echo "아이디 또는 패스워드를 입력해 주세요.";
} else {
    $myfile = fopen("./data/person.txt","a");

}



?>