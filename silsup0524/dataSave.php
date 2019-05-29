<?php
// echo $_POST['name'];
// echo $_POST['word'];

// echo $name
// echo $word
// echo $name;
// echo $word;
echo "jklfkjlfkjdfsklfdskl";

$myfile = fopen("./data.txt","a");

class FileInfo {
    // $myfile = fopen("./data.txt","a");
    function FileInfo() {
        $this->name = $_POST['name'];
        $this->word = $_POST['word'];
    }
    // function saveInfo(Str $_name,Str $_word) {
    //     fwrite($myfile,$_name);
    //     fwrite($myfile,$_word);
    //     fclose($myfile);
    //     echo "저장되었습니다.";
    // }
}

// $fileinfo = new FileInfo();
// $fileinfo->saveInfo($_POST['name'],$_POST['word']);


?>