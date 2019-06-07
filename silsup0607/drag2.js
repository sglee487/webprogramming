$(document).ready(function() {

    var pic_upload = $("#pic_upload");
    
    var box1_number = $("#box1_number");
    var box2_number = $("#box2_number");
    
});


function drag(ev) {
    ev.dataTransfer.setData("img",ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("img");
    ev.target.appendChild(document.getElementById(data));

    changeNumbers();
    // alert(ev.target.id);

    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
            xhttp.responseText // return from your php;
            }
        };
        // alert(userName + category + memo + date_start + date_end);
        xhttp.open("GET", "drag2.php?contentWord=" + ev.target.id + "&func=save", true);
        xhttp.send(null);

        alert("Data: 저장되었습니다.\nStatus: success");

        
}

function allowDrop(ev) {
    ev.preventDefault();
}

function changeNumbers() {
    box1_number.innerText = box1.childElementCount;
    box2_number.innerText = box2.childElementCount;
}

function read_image() {
    var xhttp = new XMLHttpRequest();
    var response;
    file = "drag1.txt";
    // alert(element);
    xhttp.open("GET", "drag3.php", true);
    
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // alert(this.responseText);
        response = this.responseText;
        // alert(response);

        img_add = response.split("|");
        // alert(img_add);
        // alert(img_add.length);
        // alert(img_add[0]);
        // alert(img_add[1]);
        // alert(img_add[2]);
        // alert(img_add[3]);
        // alert(img_add[4]);
        // alert(img_add[5]);
        // alert(img_add[6]);
        for (var i=0;i<img_add.length-1;i++) {
            // alert(img_add[i]);
            // document.getElementById(img_add[i]).appendChild(document.getElementById("img1"));
            $("#img1").clone().appendTo("#" + img_add[i]);
        }
        
    }
``
};
xhttp.send(null);

}