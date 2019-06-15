function save() {
    var inputTitle = $("#title").val();
    var inputContent = $("#content").val();

        // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (xhttp.readyState == 4 && xhttp.status == 200) {
    //     xhttp.responseText // return from your php;
    //     }
    // };
    // xhttp.open("GET", "3_save.php?title=" + inputTitle + "&content=" + inputContent + "&_=" + new Date(), true);
    // xhttp.send();
    
    $.post("3_save.php", 
    {
        title : inputTitle,
        content : inputContent
    },
    function(data,status) {
        alert("Data: 저장되었습니다.\nStatus: " + status);
    });
    alert();

      
}

function showHint(str) {
    // var Hint = $("#unorderlist").val();
    // $.post("3_getHint.php", 
    // {
    //     hint : Hint
    // });

    if (str.length == 0) { 
        document.getElementById("unorderlist").innerHTML = "";
        return;
      }
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("unorderlist").innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", "3_getHint.php?hint="+str, true);
      xhttp.send();

    
}

function findContent(str) {
    if (str.length == 0) { 
        // document.getElementById(str).innerHTML = "";
        return;
      }
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        //   document.getElementById(str).innerHTML = this.responseText;
        var pElement = document.createElement("p");
        var tNode = document.createTextNode(this.responseText);

        pElement.appendChild(tNode);
        // console.log(str);
        // console.log(document.getElementById(str));
        document.getElementById(str).appendChild(pElement);

        }
      };
      xhttp.open("GET", "3_getContent.php?hint="+str, true);
      xhttp.send();
}