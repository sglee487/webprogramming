$(document).ready(function() {

    var pic_upload = $("#pic_upload");
});

function showImage() {
    var x = document.getElementById("myFile");
    
    if ('files' in x) {
        for (var i=0;i<x.files.length;i++) {
            var file = x.files[i];
            if ('name' in file) {
                // alert(pic_upload);
                // alert(file.name);
                var AddImageTag = document.createElement("img");
                AddImageTag.setAttribute('src','./' + file.name);
                pic_upload.appendChild(AddImageTag);
            }
        }
    }
}