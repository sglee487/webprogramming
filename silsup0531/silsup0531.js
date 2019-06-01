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
                AddImageTag.setAttribute('id','img' + i);
                AddImageTag.setAttribute('draggable','true');
                AddImageTag.setAttribute('ondragstart','drag(event)');
                pic_upload.appendChild(AddImageTag);
            }
        }
    }
}

function drag(ev) {
    ev.dataTransfer.setData("img",ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("img");
    ev.target.appendChild(document.getElementById(data));
}

function allowDrop(ev) {
    ev.preventDefault();
}