<?php
// echo $_POST['name'];
// echo $_POST['word'];

// echo $name
// echo $word
// echo $name;
// echo $word;
// echo "jklfkjlfkjdfsklfdskl";

$myfile = fopen("./data.txt","a");

class FileInfo {
    // $myfile = fopen("./data.txt","a");
    function FileInfo() {
        $this->myfile = fopen("./data.txt","a");
        $this->name = $_POST['name'];
        $this->word = $_POST['word'];
    }
    function saveInfo() {
        fwrite($this->myfile,$this->name . "<br>");
        // fwrite($this->myfile,"\n");
        fwrite($this->myfile,$this->word . "<br>");
        // fwrite($this->myfile,"\n");
        fclose($this->myfile);
        echo "저장되었습니다.";
    }
}

$fileinfo = new FileInfo();
$fileinfo->saveInfo();


?>