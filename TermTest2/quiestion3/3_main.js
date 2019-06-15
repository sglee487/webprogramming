function save() {
    var inputTitle = $("#title").val();
    var inputContent = $("#content").val();

    $.post("3_save.php", 
    {
        title : inputTitle,
        content : inputContent
    })

      
}