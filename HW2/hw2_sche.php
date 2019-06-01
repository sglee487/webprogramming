<!DOCTYPE>
<html>
	<head>
        <title> 2019 웹프로그래밍 HW2 </title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="hw2_sche.css">
	</head>
	<body>

    <input type="button" value="추가"> <input type="button" value="검색">
    <br><br>

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
    
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<!-- <script src="hw2_schedule.js"></script> -->
</body>
</html>
