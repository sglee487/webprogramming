// http://www.berryjam.eu/solitaire/

// 카드 크기 100 x 125

// process2 = $("#process2");
// process2.text("hellop2");
$(document).ready(function(){
    // process2 = $("#process2");
    // process2.text("hellop2");

    gameInit();

    // document.getElementById("1_1").setAttribute("draggable","true");
    // $("#1_1").css("draggable","true");
});

var allCards = [];
var allCards_id = [];

// 게임 시작할 때 해야 할 것들.
// 카드들을 배열에 넣고, 섞고, 배치하고 등등...
function gameInit() {
    cardsInit();
    // suffleCards(allCards_id);
    putCardsInit();
}

// 총 52개의 카드가 있으므로, 52개를 담을 수 있는 배열을 만든다.
function cardsInit() {
    var cardSort, cardNumber;
    for (var i=1; i <= 52; i++) {
        allCards.push(i);
        // 이제 allCards엔 [1,2,3,4,...] 이 들어있다. 1부터 해야 안헷갈림
        cardSort = getCardSort(i);
        cardNumber = getCardNumber(i);
        allCards_id.push(cardSort + "_" + cardNumber);
        // 이제 allCards_id엔 [1_1,1_2,1_3,...] 이 들어있다.
    }
}

function getCardSort(i) {
    return Math.floor((i-1) / 13) + 1;
}

function getCardNumber(i) {
    return ((i-1) % 13) + 1;
}

// 위의 allCards가 랜덤 배열로 되어야 섞어서 넣을때도 랜덤으로 됨.
// 서로 자리를 바꾸는 형식으로 하면 중복될 일이 없다.
function suffleCards(array) {
    var temp, randomNumber;
    for (var i=0;i < array.length; i++) {
        randomNumber = Math.floor(Math.random() * (array.length));
        temp = array[randomNumber];
        array[randomNumber] = array[i];
        array[i] = temp;
    }
    return array;
}

// 처음 게임을 시작했을 때 카드를 계단 형식으로 놓도록 함..
function putCardsInit(){
    var rest;
    var card_number = 0;
    for (var row = 1; row <= 7; row++) {

        for (var col = 0; col < row; col++) {
            // $("<div class='card'> hHHeeloo</div>").appendTo("#process"+row);
            // child = $("#process"+row).append("<div class='card'> hHHeeloo</div>");

            $("<div class='card' id=" + allCards_id[card_number] + " ></div>").appendTo("#process"+row);
            $("#" + allCards_id[card_number]).css("background-image","url(data/0_0.jpg)");
            if ((row - col) == 1) {
                // console.log("hi");
                // document.getElementById(allCards_id[card_number]).setAttribute("color","blue");
                // $("#" + allCards_id[card_number]).css("draggable","true");
                // $("#" + allCards_id[card_number]).css("ondragstart","drag(event)");
                // $("#" + allCards_id[card_number]).css("ondragover","");
                $("#" + allCards_id[card_number]).css("background-image","url(data/" + allCards_id[card_number] + ".jpg)");
                // $("#" + allCards_id[card_number]).css("color","blue");

                document.getElementById(allCards_id[card_number]).setAttribute("draggable","true");
                document.getElementById(allCards_id[card_number]).setAttribute("ondragstart","drag(event)");
                document.getElementById(allCards_id[card_number]).setAttribute("ondrop","drop(event)");
                document.getElementById(allCards_id[card_number]).setAttribute("ondragover","allowDrop(event)");
                
                
            }
            card_number++;

        }
    }

}

function allowDrop(ev) {
    ev.preventDefault();
}
  
  function drag(ev) {
    ev.dataTransfer.setData("frontcard", ev.target.id);
}

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("frontcard");
    // ev.target.appendChild(document.getElementById(data));
    var pn = ev.target;
    // // console.log(ev.path[0]);
    // // console.log(ev.dataTransfer);
    console.log(data); // 내가 마우스 클릭한 곳의 id string
    // console.log(typeof(data));
    // // console.log(pn); // 대상의 object
    // // console.log(typeof(pn));
    console.log(pn.id);
    // console.log(typeof(pn.id)); // 내가 마우스 놓는 곳의 id string
    // console.log(pn.parentElement);

    var childindex = getChildIndex(document.getElementById(data));
    console.log(childindex); // index가 0,1,2,... 로 시작
    console.log(document.getElementById(data).parentNode.childElementCount); // 1개 , 2개, 3개 ... 로 시작
    // console.log(document.getElementById(data).parentNode.children[1]);
    appendAllDownChild(document.getElementById(data),pn.id);
    // pn.parentElement.appendChild(document.getElementById(data));
}

function appendAllDownChild(movedChild,str_TargetId) {
    var target_Object = document.getElementById(str_TargetId);
    var target_Object_Parent = target_Object.parentElement;
    var movedparent = movedChild.parentNode;
    var movedChildren = movedparent.children;
    // var i = children.length - 1;
    var foundStartIndex = 0;
    for (foundStartIndex; foundStartIndex < movedChildren.length - 1; foundStartIndex++){
        if (movedChild == movedChildren[foundStartIndex]){
            break;
        }
    }

    console.log("foundStartIndex : " + foundStartIndex);
    console.log("movedChildren.length : " + movedChildren.length);
    
    if (foundStartIndex == movedChildren.length) {
        // 못 찾았 단 뜻
        console.log("not found");
    } else {
        console.log("found");
        var iteratorCount = movedChildren.length - foundStartIndex;
        for ( ;iteratorCount >0;iteratorCount--) {
            console.log("foundStartIndex: " + foundStartIndex);
            target_Object_Parent.appendChild(movedChildren[foundStartIndex]);
        }
        // for (foundStartIndex; foundStartIndex < movedChildren.length; foundStartIndex++) {
        //     console.log("foundStartIndex: " + foundStartIndex);
        //     // console.log("target_Object_Parent: " + target_Object_Parent);
        //     // console.log("children[foundStartIndex] : " + movedChildren[foundStartIndex]);
        //     target_Object_Parent.appendChild(movedChildren[foundStartIndex]);
        // }
    }
    
}

function getChildIndex(child) {
    var parent = child.parentNode;
    var children = parent.children;
    var i = children.length - 1;
    for (; i >= 0; i--){
        if (child == children[i]){
            break;
        }
    }
    return i;
}