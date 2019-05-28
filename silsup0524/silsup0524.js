var infoArray = [];

var test = 3;

function dictionary(_name,_content) {
  this.name = _name;
  this.content = _content;
}
// document.getElementById("bb").children[0].childElementCount
var tbody = document.getElementById("bb").children[0];
for (var i = 0; i < tbody.childElementCount;i++) {
  infoArray[i] = new dictionary(tbody.children[i].children[0].innerText,tbody.children[0].children[1].innerText);

}
