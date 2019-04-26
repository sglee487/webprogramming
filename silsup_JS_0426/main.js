function add_list() {
  var site_name = prompt("Enter item name:");
  if (site_name == null || site_name=="") {
    alert("Are you leaving?");
  } else {
    var site_url = prompt("Enter url");
    if (site_url == null || site_url == "") {
      alert("Are you really going to leave?");
    } else {
      var ol_list = document.getElementById("ol_list");
      var para = document.createElement("li");

      var a_para = document.createElement("a");

      var node = document.createTextNode(site_name);

      a_para.setAttribute('href',site_url);
      a_para.setAttribute('target','_blank');

      a_para.appendChild(node);
      para.appendChild(a_para);
      ol_list.appendChild(para);
    }
  }
}
