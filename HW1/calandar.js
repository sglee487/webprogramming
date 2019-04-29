
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
     days[i].setAttribute('ondblclick', 'show_add_schedule(' + (i+1) + ')');
   } else {
     days[i].style.backgroundColor = "#d9e8ce";
     days[i].setAttribute('ondblclick', 'show_add_schedule(' + (i+1) + ')');
     // days[i].setAttribute('onclick', show_add_schedule());
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

// 각 날마다 4 크기 배열을 가지는 빈 박스 object 만들고,
// for문을 돌려 안에 내용이 없으면 none, 있으면 표시 하게 하는게 나을것 같다.
// 왜냐하면 나중에 자동 순서 배치도 있어야 하고, 순서도 바꿀수 있어야 하기 때문.
// 근데 지금 너무 졸리다 아 자고실다 아ㅣ지너라ㅏㅣ런ㅇㄹㅇ너ㅏㅣㅣ 질꺼야 말리지마
// function schedulebox(var day) {
//   this.date = new Date(now.getYear(), now.getMonth(), day);
//   this.priority;
// }

// Object 만들라 했는데 굳이 그럴 필요 없대
// 0426 실습에 배운 자바스크립트로 element 추가를 통해 만들어보자

// 일단 날짜 추가받는 window 창을 띄워서 변수 입력받는 함수부터 만들자.

// var add_schedule_window = document.getElementById("add_schedule_window");
var add_schedule_window = document.getElementsByClassName("add_schedule_window");
var sth_day_input = document.getElementById("sth_day_input");
// var add_schedule_window_original_html = add_schedule_window.innerHTML;
var add_schedule_window_original_html = add_schedule_window[0].innerHTML;

var temp_day_for_add;
function show_add_schedule(day) {
  make_backgroundcolor_gray();
  // add_schedule_window.style.display = "block";
  // add_schedule_window.innerHTML = day + add_schedule_window.innerHTML;

  sth_day_input.innerHTML = day + "일 일정추가";
  add_schedule_window[0].style.display = "block";
  // add_schedule_window[0].innerHTML = day + add_schedule_window[0].innerHTML;
  // add_schedule_window[0].innerHTML = "day + add_schedule_window[0].innerHTML";
  // alert(day);
  temp_day_for_add = day;

}

// ok 버튼을 누르든 Cancel 버튼을 누르든 둘 다 적용해야 하는 함수.
function hide_add_schedule() {
  make_backgroundcolor_original();
  add_schedule_window[0].style.display = "none";
  // add_schedule_window.innerHTML = add_schedule_window_original_html;
  document.getElementById("form")[0].value = "";
}

function input_add_schedule() {
  var input_add_value = document.getElementById("form")[0].value;
  // alert(input_add_value);
  return input_add_value;
}

function input_add_OK() {
  var form_parent = document.createElement("form");
  var parent_1 = document.createElement("input");
  // var child_node_1 = document.createTextNode(input_add_schedule());
  var parent_2 = document.createElement("span");
  var child_node_2 = document.createTextNode("X");

  parent_1.setAttribute('value', input_add_schedule());
  parent_1.setAttribute('color', '#000000' );
  parent_1.setAttribute('size','7');

  // alert(input_add_schedule());
  // parent_1.appendChild(child_node_1);
  form_parent.appendChild(parent_1);
  parent_2.appendChild(child_node_2);
  form_parent.appendChild(parent_2);

  days[(temp_day_for_add-1)].appendChild(form_parent);
  // parent_2.appendChild(child_node_2);
  // days[(temp_day_for_add-1)].appendChild(parent_2);


  hide_add_schedule();
  make_backgroundcolor_original();
}

function input_add_Cancel() {
  hide_add_schedule();
  make_backgroundcolor_original();
}
