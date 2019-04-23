
// 맨 위에 날짜 표시
{
var today = new Date();
var day = today.getDay();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
}

if(mm<10) {
    mm='0'+mm
}

today = yyyy +" 년 " + mm + " 월 " + dd + " 일";

var table_caption;
table_caption = document.getElementById("table_caption");
table_caption.innerHTML=today;

}
// 달력 안 내용 채우기
{
   var start_cell = new Date(yyyy+'-'+mm+'-'+'01').getDay() + dd;
   var now = new Date();
var firstDate, lastDate;

firstDate = new Date(now.getYear(), now.getMonth(),1).getDate();
lastDate = new Date(now.getYear(), now.getMonth()+1,0).getDate();

alert(firstDate + "/" + lastDate);
    // alert(start_cell-2);
  // alert(typeof(start_cell));

 var cell_today = document.getElementById("cell_" + (start_cell));
 // today = document.getElementById("cell_" + 5 + "");
 var cell_yesterday = document.getElementById("cell_" + (start_cell-1));
 // yesterday = document.getElementById("cell_" + (start_cell-1));
 var cell_yesterday_and_before = document.getElementById("cell_" + (start_cell-2));
 var cell_tommrow = document.getElementById("cell_" + (start_cell+1));
 var cell_tommorow_and_after = document.getElementById("cell_" + (start_cell+2));

 cell_today.innerHTML="todayyyyyyyyy" + day + "  " + dd;
 cell_yesterday.innerHTML="yesterdayddd ";
 cell_yesterday_and_before.innerHTML="and before";
 cell_tommrow.innerHTML="tommrow";
 cell_tommorow_and_after.innerHTML="and after";
 //test.innerHTML=d;
}

function cal_end_day() {
  return new Date(now.getYear(), now.getMonth()+1,0).getDate();
}
