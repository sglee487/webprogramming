
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
  // getDay() 는 월요일은 1, 화요일은 2, 수요일은 3, 목요일 4, 금요일 5, 토요일 6, 일요일은 0 반납.
  // 그래서 1을 더해줬다. cell_2 가 월요일이니까. 일요일 시작달은 cell_1 부터 시작하니 이게 맞다.
   var start_cell = new Date(yyyy+'-'+mm+'-'+'01').getDay()+1;
   // 1을 안빼주면 중복해서 더해지게 됨. 그러니까 만약 1일인 경우, start_cell도 1, dd도 1이라서 today_cell이 2가 됨. 이를 막기 위해 -1.
   // 첫번째 cell_1 을 0부터 시작 안하고 1부터 시작해서 생기는 부작용인듯.. 그래도 그냥 가자.
   var today_cell = start_cell + dd - 1;
   var now = new Date();
var firstDate, lastDate;

firstDate = new Date(now.getYear(), now.getMonth(),1).getDate();
lastDate = new Date(now.getYear(), now.getMonth()+1,0).getDate();

//alert(firstDate + "/" + lastDate);
    // alert(start_cell-2);
  // alert(typeof(start_cell));

 // var cell_today = document.getElementById("cell_" + (today_cell));
 // // today = document.getElementById("cell_" + 5 + "");
 // var cell_yesterday = document.getElementById("cell_" + (today_cell-1));
 // // yesterday = document.getElementById("cell_" + (today_cell-1));
 // var cell_yesterday_and_before = document.getElementById("cell_" + (today_cell-2));
 // var cell_tommrow = document.getElementById("cell_" + (today_cell+1));
 // var cell_tommorow_and_after = document.getElementById("cell_" + (today_cell+2));
 //
 // cell_today.innerHTML="todayyyyyyyyy" + day + "  " + dd;
 // cell_yesterday.innerHTML="yesterdayddd ";
 // cell_yesterday_and_before.innerHTML="and before";
 // cell_tommrow.innerHTML="tommrow";
 // cell_tommorow_and_after.innerHTML="and after";
 //test.innerHTML=d;

var end_day = cal_end_day();
 var days = new Array();
 for (var i=0;i < end_day;i++) {
   days[i] = document.getElementById("cell_" + (start_cell+i));
   days[i].innerHTML=i+1;
   if ((i+1) < dd) {
     days[i].style.backgroundColor = "#e3e4ea";
   } else if ((i+1) == dd) {
     days[i].style.backgroundColor = "#96e3ff";
   } else {
     days[i].style.backgroundColor = "#d9e8ce";
   }
 }

}

function cal_end_day() {
  return new Date(now.getYear(), now.getMonth()+1,0).getDate();
}
