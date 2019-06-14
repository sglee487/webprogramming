// http://www.berryjam.eu/solitaire/

// 카드 크기 100 x 125

// 카드 div 태그에 붙어있는
// value = 0 은 뒤집어져 있는 카드
// value = 1 은 process에서 앞면인 카드
// value = 2는 result에 박혀서 안나오게 해야하는 카드


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

            $("<div class='card' id=" + allCards_id[card_number] + " value = 0></div>").appendTo("#process"+row);
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
                document.getElementById(allCards_id[card_number]).setAttribute("value","1");
                
                
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

    var movedCard_value = $("#" + pn.id).attr("value");
    console.log(pn.id);
    console.log("내가 마우스 놓는 곳의 value: " + movedCard_value);
    if (movedCard_value == 0) {

    }
    else if (movedCard_value == 1) {
        if (isDiffSortCard(data,pn.id)) {
            if (isDiffOne(pn.id,data)) {
                // console.log("내가 마우스 놓는 곳의 value: " + document.getElementById(pn.id).getAttribute('value'));
                // console.log(typeof(pn.id)); // 내가 마우스 놓는 곳의 id string
                // console.log(pn.parentElement);

                // var childindex = getChildIndex(document.getElementById(data));
                // console.log(childindex); // index가 0,1,2,... 로 시작
                // console.log(document.getElementById(data).parentNode.childElementCount); // 1개 , 2개, 3개 ... 로 시작
                // console.log(document.getElementById(data).parentNode.children[1]);

                // var oldMovedCardParent = pn.id.parentNode;

                // appendAllDownChild(document.getElementById(data),pn.id);
                // console.log(oldMovedCardParent.childElementCount);
                // pn.parentElement.appendChild(document.getElementById(data));
            }
            var oldClickedCardParent = document.getElementById(data).parentNode;
                // console.log(oldClickedCardParent.id);
                appendAllDownChild(document.getElementById(data),pn.id);
                // console.log(oldClickedCardParent.id);
                revealLastCardInProcessId(oldClickedCardParent);
            // appendAllDownChild(document.getElementById(data),pn.id);
        }

    }

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

    // console.log("foundStartIndex : " + foundStartIndex);
    // console.log("movedChildren.length : " + movedChildren.length);
    
    if (foundStartIndex == movedChildren.length) {
        // 못 찾았 단 뜻
        console.log("not found");
    } else {
        console.log("found");
        var iteratorCount = movedChildren.length - foundStartIndex;
        for ( ;iteratorCount >0;iteratorCount--) {
            // console.log("foundStartIndex: " + foundStartIndex);
            // console.log("movedChildren.length : " + movedChildren.length);
            target_Object_Parent.appendChild(movedChildren[foundStartIndex]);
        }
    }
    
}

// function getChildIndex(child) {
//     var parent = child.parentNode;
//     var children = parent.children;
//     var i = children.length - 1;
//     for (; i >= 0; i--){
//         if (child == children[i]){
//             break;
//         }
//     }
//     return i;
// }

function isDiffSortCard(card1_id,card2_id) {
    console.log("card1_id[0] : " + card1_id[0] + ", card2_id[0] : " + card2_id[0]);
    if ((card1_id[0] == 1 && card2_id[0] == 3)
    || (card1_id[0] == 2 && card2_id[0] == 3)
    || (card1_id[0] == 1 && card2_id[0] == 4)
    || (card1_id[0] == 2 && card2_id[0] == 4)
    || (card1_id[0] == 3 && card2_id[0] == 1)
    || (card1_id[0] == 4 && card2_id[0] == 1)
    || (card1_id[0] == 3 && card2_id[0] == 2)
    || (card1_id[0] == 4 && card2_id[0] == 2)) {
        return true;
    }
    return false;
}

function isDiffOne(targetCard_id,movedCard_id) {
    var targetCard_number;
    var movedCard_number;
    if (targetCard_id[3] == null) {
        // 십의 자리 수가 아니면
        targetCard_number = targetCard_id[2];
    } else {
        targetCard_number = targetCard_id[2] + targetCard_id[3];    
    }
    if (movedCard_id[3] == null) {
        // 십의 자리 수가 아니면
        movedCard_number = movedCard_id[2];
    } else {
        movedCard_number = movedCard_id[2] + movedCard_id[3];    
    }

    console.log("targetCard_number : " + targetCard_number);
    console.log("movedCard_number : " + movedCard_number);
    console.log("(targetCard_number - movedCard_number) : " + (targetCard_number - movedCard_number));
    if ((targetCard_number - movedCard_number) == 1) {
        return true;
    } else {
        return false;
    }

}

function revealLastCardInProcessId(oldClickedCardParent) {
    var lastCardInThisLine = oldClickedCardParent.children[oldClickedCardParent.childElementCount-1];
    console.log(lastCardInThisLine);
}