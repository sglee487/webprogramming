<?php
// clearstatcache()
//xhttp.open("GET", "hw2_work_save.php?userName=" + userName + "&category="+category + "&memo=" + memo + "&date_start=" + date_start + "&date_end=" + date_end, true);

if ($_GET["func"] == "save") {
    $contentWord = $_GET["contentWord"];

    $myfile = fopen("drag1.txt","a");
    fwrite($myfile,$contentWord . "|");
    
    fclose($myfile);
    echo "<script>alert(\"Data: 저장되었습니다.\nStatus: success\");</script>";
}


?>