<!DOCTYPE>
<html>
	<head>
        <title> 2019 웹프로그래밍 HW2 </title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="hw2_sche.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
            <td id="family_content" ondrop="drop(event)" ondragover="allowDrop(event)">
                </td> <td id="school_content" ondrop="drop(event)" ondragover="allowDrop(event)"></td>
        </tr>
        <tr>
            <td id="trip">여행</td><td id="exercise">운동</td>
        </tr>
        <tr>
            <td id="trip_content" ondrop="drop(event)" ondragover="allowDrop(event)"></td><td id="exercise_content" ondrop="drop(event)" ondragover="allowDrop(event)"></td>
        </tr>
</table>
<div id="third_window"></div>

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
            <input type="button" value="Close" onclick="Close()">
            

        </div>

        <div id="box_search">
        메모 키워드 :
            <input type="text" name="search_memo" id="search_memo">
            <br>
            시작 날짜: 
            <input type="date" name="search_date_start" id="search_date_start">
            <br>
            끝나는 날짜: 
            <input type="date" name="search_date_end" id="search_date_end">
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

        <div id="wait_window">
        서버에 적용 중...
            <div id="wait_second"></div>
        </div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js">

</script>
<script src="hw2_sche.js"></script>

</body>
</html>
