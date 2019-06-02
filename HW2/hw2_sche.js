$box_add = $("#box_add");
$box_search = $("#box_search");
// var userId = $("#for_get_name").innerText;
var userId = document.getElementById("for_get_name").innerText;
alert(<?php echo "Testing";?>);
sdfdsf
$saveLoc = "./data/" + userId + "_";

// alert(userId);
    function show_window_add() {
        box_add.style.display = "block";
    }

    function show_window_search() {
        box_search.style.display = "block";
    }

    function submit(){
        
    }

    function cancel() {

        box_add.style.display = "none";
        box_search.style.display = "none";
    }

    function search() {
        
    }