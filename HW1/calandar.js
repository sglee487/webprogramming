
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


var html_body = document.getElementsByTagName('body');

function make_backgroundcolor_gray() {
  html_body[0].style.backgroundColor = '#b0b0b0';
  for (var i=0;i < end_day;i++) {
    if ((i+1) < dd) {
      days[i].style.backgroundColor = "#9e9ea3";
    } else if ((i+1) == dd) {
      days[i].style.backgroundColor = "#689eb0";
    } else {
      days[i].style.backgroundColor = "#97a18f";
    }
  }
}
make_backgroundcolor_gray();

function make_backgroundcolor_original() {
  html_body[0].style.backgroundColor = '#ffffff';
  for (var i=0;i < end_day;i++) {
    if ((i+1) < dd) {
      days[i].style.backgroundColor = "#e3e4ea";
    } else if ((i+1) == dd) {
      days[i].style.backgroundColor = "#96e3ff";
    } else {
      days[i].style.backgroundColor = "#d9e8ce";
    }

  }
}

make_backgroundcolor_original();

var testp = document.getElementById("day_add");
testp.style.backgroundColor = "white";
testp.style.display = "none";


var testdiv = document.getElementById("test_div");
testdiv.style.color = "red";

testdiv.insertAdjacentHTML('beforeend','<div id="tow">tow</div>');

// 각 날마다 4 크기 배열을 가지는 빈 박스 object 만들고,
// for문을 돌려 안에 내용이 없으면 none, 있으면 표시 하게 하는게 나을것 같다.
// 왜냐하면 나중에 자동 순서 배치도 있어야 하고, 순서도 바꿀수 있어야 하기 때문.
// 근데 지금 너무 졸리다 아 자고실다 아ㅣ지너라ㅏㅣ런ㅇㄹㅇ너ㅏㅣㅣ 질꺼야 말리지마 
function schedulebox(var day) {
  this.date = new Date(now.getYear(), now.getMonth(), day);
  this.priority;
}
