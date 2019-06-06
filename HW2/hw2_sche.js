$box_add = $("#box_add");
$box_search = $("#box_search");
// var userId = $("#for_get_name").innerText;
var userName = document.getElementById("for_get_name").innerText;
// alert('<?php echo "Testing";?>');

var savefilename = "./testfile.txt";
// var category = $("#choose_work").innerText;
// alert(userName);

categoryList = ["family","school","trip","exercise"];
categoryContentList = ["family_content","school_content","trip_content","exercise_content"];

    function show_window_add() {
        box_add.style.display = "block";
    }

    function show_window_search() {
        box_search.style.display = "block";
    }

    function submit() {
        submit_c();
        setTimeout(readTextFile,200);
    }
    function submit_c(){
        var category = $("#choose_work").val();
        var memo = $("#memo").val();
        var date_start = $("#date_start").val();
        var date_end = $("#date_end").val();

        // alert(category);
        // alert(memo);
        // alert(date_start);
        // alert(date_end);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
            xhttp.responseText // return from your php;
            }
        };
        // alert(userName + category + memo + date_start + date_end);
        xhttp.open("GET", "hw2_work_save.php?userName=" + userName + "&category="+category + "&memo=" + memo + "&date_start=" + date_start + "&date_end=" + date_end, true);
        xhttp.send();

    }

    function Close() {
        // readTextFile(userName);
        box_add.style.display = "none";
        box_search.style.display = "none";
    }

    function search() {
        var memo = $("#search_memo").val();
        var date_start = $("#search_date_start").val();
        var date_end = $("#search_date_end").val();
        $("#third_window").text("");

        categoryList.forEach(element => {
            var xhttp = new XMLHttpRequest();
            file = "data/" + userName + "_" + element + ".txt";
            // alert(element);
            xhttp.open("GET", file, true);
            
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var strArrayLine = this.responseText.split("\n");
                for (var i=0;i < strArrayLine.length-1;i++) {
                    var strArrayword = strArrayLine[i].split("|");
                    findInform(strArrayword[0],strArrayword[1],strArrayword[2]);
                }
            }
        };
        xhttp.send(null);
        });

        Close();
    }

    function findInform(argument1, argument2, argument3) {
        var memo = $("#search_memo").val();
        var date_start = $("#search_date_start").val();
        var date_end = $("#search_date_end").val();

        // alert(memo);
        // alert(date_start);
        // alert(date_end);

        // alert("argument1 : " + argument1 + ", memo : " + memo + ", (argument1.indexOf(memo) !== -1) : " + (argument1.indexOf(memo) !== -1));
        // 여기에서 입력값이 있을때랑 없을때로 나눠보자.
        if (memo == "") {
            if ((argument2.indexOf(date_start) !== -1) && (argument3.indexOf(date_end) !== -1)) {
                document.getElementById("third_window").innerHTML += argument1 + " ( " + argument2 + " ~ " + argument3 + " )";
                document.getElementById("third_window").innerHTML += "<br>";
            } else if (argument2.indexOf(date_start) !== -1 && (date_end == "")) {
                document.getElementById("third_window").innerHTML += argument1 + " ( " + argument2 + " ~ " + argument3 + " )";
                document.getElementById("third_window").innerHTML += "<br>";
            }
            else if (argument3.indexOf(date_end) !== -1 && (date_start == "")) {
                document.getElementById("third_window").innerHTML += argument1 + " ( " + argument2 + " ~ " + argument3 + " )";
                document.getElementById("third_window").innerHTML += "<br>";
            }
        }

        else if (date_start == "") {
            // alert((argument1.indexOf(memo)));
            // alert(typeof((argument1.indexOf(memo))));
            // alert(typeof(memo));
            if ((argument1.indexOf(memo) !== -1) && (argument3.indexOf(date_end) !== -1)) {
                document.getElementById("third_window").innerHTML += argument1 + " ( " + argument2 + " ~ " + argument3 + " )";
                document.getElementById("third_window").innerHTML += "<br>";
            } else if ((argument1.indexOf(memo) !== -1) && (date_end == "")) {
                document.getElementById("third_window").innerHTML += argument1 + " ( " + argument2 + " ~ " + argument3 + " )";
                document.getElementById("third_window").innerHTML += "<br>";
            }
            else if (argument3.indexOf(date_end) !== -1 && (memo == "")) {
                document.getElementById("third_window").innerHTML += argument1 + " ( " + argument2 + " ~ " + argument3 + " )";
                document.getElementById("third_window").innerHTML += "<br>";
            } 

        } else if (date_end == "") {
            if ((argument2.indexOf(date_start) !== -1) && (argument1.indexOf(memo) !== -1)) {
                document.getElementById("third_window").innerHTML += argument1 + " ( " + argument2 + " ~ " + argument3 + " )";
                document.getElementById("third_window").innerHTML += "<br>";
            } else if ((argument2.indexOf(date_start) !== -1) && (memo == "")) {
                document.getElementById("third_window").innerHTML += argument1 + " ( " + argument2 + " ~ " + argument3 + " )";
                document.getElementById("third_window").innerHTML += "<br>";
            }
            else if ((argument1.indexOf(memo) !== -1) && (date_end == "")) {
                document.getElementById("third_window").innerHTML += argument1 + " ( " + argument2 + " ~ " + argument3 + " )";
                document.getElementById("third_window").innerHTML += "<br>";
            }

        } else {
            if (argument2.indexOf(date_start) !== -1
            && (argument1.indexOf(memo) !== -1)
            && (argument3.indexOf(date_end) !== -1)) {
                document.getElementById("third_window").innerHTML += argument1 + " ( " + argument2 + " ~ " + argument3 + " )";
                document.getElementById("third_window").innerHTML += "<br>";
            }
        }
    }

    var work_list_save = [[],[],[],[]]; // [0][]은 family, [1][]은 trip [2][0]은 exercise [3][0]은 school ...

    function readTextFile()
    {
        cache_reset();

    work_list_save = [[],[],[],[]];
        var work_id = 0;
        // 빈공간으로 초기화
        categoryList.forEach(element => {
            document.getElementById(element + "_content").innerHTML = "";
        });
        var work_sort = 0;
        for (let W = 0; W < categoryList.length; W++) {
            var xhttp = new XMLHttpRequest();
            file = "data/" + userName + "_" + categoryList[W] + ".txt";
            // alert(element);
            // alert("W : " + W + " , categoryList[W] : " + categoryList[W]);
            xhttp.open("GET", file, true);
            // alert(categoryList[W]);
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var strArrayLine = this.responseText.split("\n");

                for (var i=0;i < strArrayLine.length-1;i++) {
                    // alert("W : " + W + " , categoryList[W] : " + categoryList[W]);
                    // W가 막 랜덤으로 나오고 work_sort는 정직하게 나옴.
                    // W로 따라가자..
                    // alert("work_sort : " + work_sort);
                    work_list_save[W][i] = strArrayLine[i];
                    var strArrayword = strArrayLine[i].split("|");
                    // alert(categoryList[W]);
                    document.getElementById(categoryList[W] + "_content").innerHTML += "<p id=work_" + W + "_" + i + " draggable='true' ondragstart='drag(event)'>" + strArrayword[0] + " ( " + strArrayword[1] + " ~ " + strArrayword[2] + " ) <i class='fa fa-close' style='font-size:18px' onclick=deleteAndMakeNew(" + W + "," + i + ")></i></p>" ;
                    // document.getElementById(element + "_content").innerHTML += "<br>";
                }
                work_sort++;
            }
        };
        xhttp.send(null);

        }

    }

    function drag(ev) {
        ev.dataTransfer.setData("work",ev.target.id);
    }
    
    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("work");

        ev.target.appendChild(document.getElementById(data));
    
    }
    
    function allowDrop(ev) {
        ev.preventDefault();
    }
    
    function deleteAndMakeNew(edit_sort_number,edit_what_number) {
        // cache_reset();
        deleteAndMakeNew_c(edit_sort_number,edit_what_number);
        // cache_reset();
        setTimeout(readTextFile,700);
        // setTimeout(readTextFile,100);
    }
    var edit_sort_number;
    function deleteAndMakeNew_c(edit_sort_number,edit_what_number) {
        // edit_sort_number로 어떤 파일을 수정해야 하는지..
        // [0][]은 family, [1][]은 school [2][0]은 trip [3][0]은 exercise ...

        // alert(edit_sort_number);
        // alert(edit_what_number);
        
        if (edit_sort_number == 0) {
            category = "family";
        } else if (edit_sort_number == 1) {
            category = "school";
        } else if (edit_sort_number == 2) {
            category = "trip";
        } else if (edit_sort_number == 3) {
            category = "exercise";
        }

        // var xhttp = new XMLHttpRequest();

        // 파일 리셋
        fileReset(userName,category);

        // 파일 라인별로 저장
        // fileLineSave(userName,category,edit_sort_number)
        setTimeout(fileLineSave,20,userName,category,edit_sort_number,edit_what_number);
       
        // xhttp.send(null);

    };
    
    

    function fileReset(userName,category) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
            xhttp.responseText // return from your php;
            }
        };
        // alert(userName + category + memo + date_start + date_end);
        xhttp.open("GET", "hw2_work_reset_file.php?user=" + userName + "&category=" + category, true);
        xhttp.send(null);
        
    }

    function fileLineSave(userName,category,edit_sort_number,edit_what_number) {
        for (var i = 0; i < work_list_save[edit_sort_number].length;i++) {
            fileLineSaveDelay(userName,category,edit_sort_number,edit_what_number,i);
            // setTimeout(fileLineSaveDelay,10,userName,category,edit_sort_number,edit_what_number,i);
        }
    }

    function fileLineSaveDelay(userName,category,edit_sort_number,edit_what_number,i) {
        var xhttp = new XMLHttpRequest();
            // 여기 밑에 실행시간을 늦춰야 한다..
            // alert(work_list_save[edit_sort_number].length);
            if (i != edit_what_number) {
            // fwrite($myfile,work_list_save[edit_sort_number][i]);
            // fwrite($myfile,"\n");
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                xhttp.responseText // return from your php;
                }
            };
            // alert(userName + category + memo + date_start + date_end);
            xhttp.open("GET", "hw2_work_edit.php?user=" + userName + "&category=" + category + "&Line=" + work_list_save[edit_sort_number][i], true);
            xhttp.send();
            }
    }

    var add_number;
    function addFileLine() {

    }


    function test(second) {
        test_c();
        setTimeout(alertse,800,second);
    }
    function test_c() {

    }
    function alertse(second) {
        alert(second);
    }

function cache_reset() {
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
            xhttp.responseText // return from your php;
            }
        };
        // alert(userName + category + memo + date_start + date_end);
        xhttp.open("GET", "hw2_work_cacheReset.php", true);
        xhttp.send();
}