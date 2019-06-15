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
var flipBackCards_id = [];

var resultCardCount = 0;

// 게임 시작할 때 해야 할 것들.
// 카드들을 배열에 넣고, 섞고, 배치하고 등등...
function gameInit() {
    cardsInit();
    setCardBackgroundProperty(); // 빈 프로세스1 위에 K 카드 오게 할 수 있다던가 등등..
    suffleCards(allCards_id);
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
    console.log("card_number before insert flip cards : " + card_number);
    // 카드 나머지들.. id = back_card에 넣어야 함.
    while (card_number < 52) {
        flipBackCards_id.push(allCards_id[card_number]);
        card_number++;
    }
    // console.log("allCards_id.length : " + allCards_id.length + ", flipBackCards_id.length : " + flipBackCards_id.length);
    // console.log("allCards_id.length + flipBackCards_id.length : " + allCards_id.length + flipBackCards_id.length);
    // 처음 back_card id에 붙이는 카드.
    document.getElementById("back_card").appendChild($("<div class='card' id=" + flipBackCards_id[0] + " value = 3></div>")[0]);
    for (var index = 1; index < flipBackCards_id.length; index++) {
        document.getElementById(flipBackCards_id[(index-1)]).appendChild($("<div class='card' id=" + flipBackCards_id[index] + " value = 3></div>")[0]);
        $("#" + flipBackCards_id[index]).css("background-image","url(data/0_0.jpg)");
        $("#" + flipBackCards_id[index]).attr("draggable","false");
        $("#" + flipBackCards_id[index]).attr("ondragstart","");
        $("#" + flipBackCards_id[index]).attr("ondrop","");
        $("#" + flipBackCards_id[index]).attr("ondragover","");

        $("#" + flipBackCards_id[index]).attr("onclick","flipCard(" + flipBackCards_id[index] + ")");
        // $("#" + flipBackCards_id[index]).attr("ondragstart","drag(event)");
        // $("#" + flipBackCards_id[index]).attr("ondrop","drop(event)");
        // $("#" + flipBackCards_id[index]).attr("ondragover","allowDrop(event)");
        // $("<div class='card' id=" + flipBackCards_id[index] + " value = 3></div>").appendTo("#back_card");
        // $("#" + flipBackCards_id[index]).css("background-image","url(data/0_0.jpg)");
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

    } else if (movedCard_value == 2) {
        if (isSameSort(pn.id,data)) {
            if (isDiffOne(pn.id,data)) {
            // result에 있는 A 위에 2가 올 때..
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
        console.log(oldClickedCardParent.id);
        var dataElement = document.getElementById(data);
        dataElement.setAttribute('value','2');
        dataElement.setAttribute("draggable","false");
        dataElement.setAttribute("ondrop","drop(event)");
        pn.appendChild(dataElement);
        console.log("oldClickedCardParent : " + oldClickedCardParent);
        revealLastCardInProcessId(oldClickedCardParent);
        isWinCardCount()
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

function isSameSort(card1_id,card2_id) {
    console.log("card1_id[0] : " + card1_id[0] + ", card2_id[0] : " + card2_id[0]);
    if (card1_id[0] == card2_id[0]) {
        return true;
    } else {
        return false;
    }
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
    if (lastCardInThisLine != null) {
        console.log("lastCardInThisLine : " + lastCardInThisLine);
        console.log("lastCardInThisLine.getAttribute('value') : " + lastCardInThisLine.getAttribute("value"));
        if (lastCardInThisLine.getAttribute("value") == 0) {
            lastCardInThisLine.setAttribute("draggable","true");
            lastCardInThisLine.setAttribute("ondragstart","drag(event)");
            lastCardInThisLine.setAttribute("ondrop","drop(event)");
            lastCardInThisLine.setAttribute("ondragover","allowDrop(event)");
            lastCardInThisLine.setAttribute("value","1");
            lastCardInThisLine.style.backgroundImage = "url(data/" + lastCardInThisLine.getAttribute('id') + ".jpg)";
        }
    
    }
}

function setCardBackgroundProperty() {
    setResultBackground();
    setProcessBackground();

}

function setResultBackground() {
    var resultElement;
    for (var resultId_index = 1; resultId_index <= 4; resultId_index++) {
        // console.log("resultId_index : " + resultId_index);
        resultElement = document.getElementById("result" + resultId_index);
        resultElement.setAttribute("ondrop","dropACardToResult(event," + resultId_index + ")");
        resultElement.setAttribute("ondragover","allowDrop(event)");
    }
}

function setProcessBackground() {
    // process id 들 설정
    var processElement;
    for (var processId_index = 1; processId_index <= 7; processId_index++) {
        processElement = document.getElementById("process" + processId_index);
        processElement.setAttribute("ondrop","dropOnlyWantNumberCard(event,13)");
        processElement.setAttribute("ondragover","allowDrop(event)");
    }
}

function dropOnlyWantNumberCard(ev,thisNumberOnly) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("frontcard");
    var pn = ev.target;
    console.log(data); // 내가 마우스 클릭한 곳의 id string

    if (getCardNumberInIdString(data) == thisNumberOnly) {
        pn.appendChild(document.getElementById(data));
    }

}

function getCardNumberInIdString(id_string) {
    var cardNumber;
    if (id_string[3] == null) {
        // 십의 자리 수가 아니면
        cardNumber = id_string[2];
    } else {
        cardNumber = id_string[2] + id_string[3];    
    }

    return cardNumber;
}

function dropACardToResult(ev,sortNumber) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("frontcard");
    var pn = ev.target;
    console.log(data); // 내가 마우스 클릭한 곳의 id string

    if (getCardNumberInIdString(data) == 1 && sortNumber == data[0]) {
        var oldClickedCardParent = document.getElementById(data).parentNode;
        var dataElement = document.getElementById(data);
        pn.appendChild(dataElement);
        // 이제 A 카드 위에 drop 되는 것들은 이 A 카드의 자식이 되어야 함. 그 자식들도 마찬가지..
        // changeToMakeChildDrop(document.getElementById(data));
        // dataElement.setAttribute('value','2');
        dataElement.setAttribute("draggable","false");
        // dataElement.setAttribute("ondragstart","drag(event)");
        dataElement.setAttribute("ondrop","drop(event)");
        // dataElement.setAttribute("ondragover","allowDrop(event)");
        dataElement.setAttribute("value","2");
        // dataElement.style.backgroundImage = "url(data/" + lastCardInThisLine.getAttribute('id') + ".jpg)";
        // console.log("oldClickedCardParent : " + oldClickedCardParent);
        // console.log("oldClickedCardParent.id : " + oldClickedCardParent.id);

        isWinCardCount()

        revealLastCardInProcessId(oldClickedCardParent);
    }
}

function changeToMakeChildDrop(ev) {
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

function isWinCardCount() {
    resultCardCount++;
    console.log("resultCardCount : " + resultCardCount);
}