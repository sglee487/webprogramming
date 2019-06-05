<!DOCTYPE>
<html>
	<head>
        <title> 2019 웹프로그래밍 HW2 </title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="hw2_sche.css">
	</head>
	<body>

    <input type="button" value="추가" onclick="show_window_add()"> <input type="button" value="검색" onclick="show_window_search()">
    <br><br>
    <div id="for_get_name" name="<?php echo $_GET["name"];?>" ><?php echo $_GET["name"];?></div>
    <table>
        <tr>
            <td id="family">가족</td><td id="school">학교</td>
        </tr>
        <tr>
            <td id="family_content">
                <?php 
                echo $_GET["name"]; 
                ?></td> <td id="school_content"></td>
        </tr>
        <tr>
            <td id="trip">여행</td><td id="exercise">운동</td>
        </tr>
        <tr>
            <td id="trip_content"></td><td id="exercise_content"></td>
        </tr>
    

        <div id="box_add">
            할 일 분류: 
            <select id="choose_work">
                <option value="family">가족</option>
                <option value="school">학교</option>
                <option value="trip">여행</option>
                <option value="exercise">운동</option>
            </select>
            <br>
            메모:
            <input type="text" name="memo" id="memo">
            <br>
            시작 날짜: 
            <input type="date" name="date_start" id="date_start">
            <br>
            끝나는 날짜: 
            <input type="date" name="date_end" id="date_end">
            <br>
            <input type="button" value="Submit" onclick="submit()">
            <input type="button" value="Close" onclick="cancel()">
            

        </div>

        <div id="box_search">
        메모 키워드 :
            <input type="text" name="memo" id="memo">
            <br>
            시작 날짜: 
            <input type="date" name="date_start" id="date_start">
            <br>
            끝나는 날짜: 
            <input type="date" name="date_end" id="date_end">
            <br>
            정렬 기준: 
            <select id="choose_sort">
                <option value="start_date">시작 날짜</option>
                <option value="end_date">끝나는 날짜</option>
            </select>
            <br>
            <input type="radio" name="sort_way" id="down_order" value="내림차순" checked> 내림차순
            <input type="radio" name="sort_way" id="up_order" value="오름차순"> 오름차순 
            <input type="button" value="Submit" onclick="search()">
        </div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js">

</script>
<!-- <script src="hw2_sche.js"></script> -->
<script>
$box_add = $("#box_add");
$box_search = $("#box_search");
// var userId = $("#for_get_name").innerText;
var userId = document.getElementById("for_get_name").innerText;
// alert('<?php echo "Testing";?>');

var savefilename = "./testfile.txt";
// var category = $("#choose_work").innerText;
// alert(userId);
    function show_window_add() {
        box_add.style.display = "block";
    }

    function show_window_search() {
        box_search.style.display = "block";
    }

    function submit(){
        var category = $("#choose_work").val();
        var memo = $("#memo").val();
        var date_start = $("#date_start").val();
        var date_end = $("#date_end").val();

        // alert(category);
        alert(memo);
        // alert(date_start);
        // alert(date_end);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
            xhttp.responseText // return from your php;
            }
        };
        xhttp.open("GET", "hw2_work_save.php?category="+category + "&memo=" + memo + "&date_start=" + date_start + "&date_end=" + date_end, true);
        xhttp.send();
    }

    function cancel() {

        box_add.style.display = "none";
        box_search.style.display = "none";
    }

    function search() {
        
    }

 function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      xhttp.responseText // return from your php;
    }
  };
  xhttp.open("GET", "hw2_work_save.php?work="+thisjob, true);
  xhttp.send();
}
loadDoc();

</script>

</body>
</html>
