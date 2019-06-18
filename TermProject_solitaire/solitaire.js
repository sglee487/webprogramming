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
    processCardsPositioning()
    recordStartTime();
    startTime();

    readOtherScore();
    // winFunction();
    // setTimeout(winFunction,2000);
    // document.getElementById("1_1").setAttribute("draggable","true");
    // $("#1_1").css("draggable","true");
});

var start_today; 
var start_h;
var start_m;
var start_s;

var end_today;
var end_h;
var end_m;
var end_s;

var score = 10000;
var winScore;

var allCards = [];
var allCards_id = [];
var flipBackCards_id = [];
var flipFrontCards_id = [];

var resultCardCount = 0;

// 게임 시작할 때 해야 할 것들.
// 카드들을 배열에 넣고, 섞고, 배치하고 등등...
function gameInit() {
    cardsInit(); // 카드들을 배열에 저장한다.
    setCardBackgroundProperty(); // 빈 프로세스1 위에 K 카드 오게 할 수 있다던가 등등을 설정한다.
    suffleCards(allCards_id); // 배열에 저장한 카드들을 기반으로 하여 무작위로 섞는다.
    putCardsInit(); // 배열에서 무작위로 섞인 카드들을 계단 형식으로 배치하고, 여유부분에도 넣는다.
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

// 처음 게임을 시작했을 때 카드를 계단 형식으로 놓도록 함
function putCardsInit(){
    var card_number = 0;
    // 7줄이 있다.
    for (var row = 1; row <= 7; row++) {

        for (var col = 0; col < row; col++) {
            // $("<div class='card'> hHHeeloo</div>").appendTo("#process"+row);
            // child = $("#process"+row).append("<div class='card'> hHHeeloo</div>");

            $("<div class='card' id=" + allCards_id[card_number] + " value = 0></div>").appendTo("#process"+row); // process 의 자식으로 붙이게끔 설정
            $("#" + allCards_id[card_number]).css("background-image","url(data/0_0.jpg)"); // 카드의 뒷면을 이미지로 함
            // 계단 배열 중 맨 마지막 카드의 경우
            if ((row - col) == 1) {
                // console.log("hi");
                // document.getElementById(allCards_id[card_number]).setAttribute("color","blue");
                // $("#" + allCards_id[card_number]).css("draggable","true");
                // $("#" + allCards_id[card_number]).css("ondragstart","drag(event)");
                // $("#" + allCards_id[card_number]).css("ondragover","");
                
                // 마지막 카드이므로 무슨 카드인지 드러나게 해당 카드의 이미지를 배경으로 바꾼다.
                $("#" + allCards_id[card_number]).css("background-image","url(data/" + allCards_id[card_number] + ".jpg)");
                // $("#" + allCards_id[card_number]).css("color","blue");

                // 드러난 카드가 가질 수 있는 기능.
                document.getElementById(allCards_id[card_number]).setAttribute("draggable","true");
                document.getElementById(allCards_id[card_number]).setAttribute("ondragstart","drag(event)");
                document.getElementById(allCards_id[card_number]).setAttribute("ondrop","drop(event)");
                document.getElementById(allCards_id[card_number]).setAttribute("ondragover","allowDrop(event)");

                // 카드의 value는 매우 중요한 역할을 하는데, 여유분에서 온건지, process 진행부분에서 온건지, 활성화가 되어있는 카드인지 결정한다.
                // 비활성화는 0, 밑에 process에 있는 카드는 1, 결과분에 있는 카드는 2, 여유분에 있는 카드는 3, process는 4를 가진다.
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
    // document.getElementById("back_card").appendChild($("<div class='card' id=" + flipBackCards_id[0] + " value = 3></div>")[0]);
    refillCards();
    // $("#" + flipBackCards_id[23]).attr("onclick","flipCard('" + flipBackCards_id[23] + "')");
}

// 여유분의 카드에서 뒷면을 누르면 차례로 카드가 드러나게 한다.
function flipCard(cardId_str) {
    // isBackCardsEmpty();
    console.log("cardId_str : " + cardId_str);
    $("#" + cardId_str).appendTo("#front_card");
    // $("#front_card")[0].appendChild($("#" + cardId_str)[0]);
    $("#" + cardId_str).css("top","23px");
    $("#" + cardId_str).css("background-image","url(data/" + cardId_str + ".jpg)");

    $("#" + cardId_str).attr("draggable","true");
    $("#" + cardId_str).attr("ondragstart","drag(event)");
    $("#" + cardId_str).attr("ondrop","drop(event)");
    $("#" + cardId_str).attr("ondragover","allowDrop(event)");
    $("#" + cardId_str).attr("value","3");

    // $("#" + flipBackCards_id[index]).attr("onclick","flipCard('" + flipBackCards_id[index] + "')");
    $("#" + cardId_str).removeAttr("onclick");


    // 모든 여유분 카드를 다 봤을 경우, 해당 위치를 마우스를 클릭하면 다시 채워지는 함수가 활성화 되게끔 한다.
    isBackCardsEmpty();
    
}

// 여유분 카드를 채우도록 하는 함수를 활성화 한다.
// 여유분의 카드는 배열로 관리한다.
function isBackCardsEmpty() {
    if($("#back_card")[0].childElementCount == 0) {
        console.log('$("#back_card")[0].childElementCount == 0 : is true');
        // setBackCard();
        // 바로 기능을 활성화하면 같이 눌리는 버그가 있어 약간의 시간을 두엇다.
        setTimeout(setBackCard,400);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}
  
  function drag(ev) {
    ev.dataTransfer.setData("frontcard", ev.target.id);
}

// 카드에서 손을 땠을 떼
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

    var clickedCard_value = $("#" + data).attr("value");
    console.log("내가 마우스 클릭한 곳의 id : " + data + ", value: " + clickedCard_value);
    var movedCard_value = $("#" + pn.id).attr("value");
    // console.log(pn.id);
    console.log("내가 마우스 놓는 곳의 id : " + pn.id + ", value: " + movedCard_value);

    // 3번은 여유분에서 왓을 때
    if (clickedCard_value == 3) {
        // 여유분에서 밑의 일반 카드들로 왔을 때
        if (movedCard_value == 1) {
            if (isDiffSortCard(data,pn.id)) { // 다른 종류인지 확인
                if (isDiffOne(data,pn.id)) { // 1의 차이가 나는 카드인지 확인
                    console.log("SD");
                    // position과 top 속성도 삭제해야 함.
                    // 먼저 삭제하고 붙어야 없앤 상태로 적용이 되는 듯.
                    $("#" + data).css("position","");
                    $("#" + data).css("top","");

                    // 해당 카드가 있는 process의 자식으로 넘긴다.
                    $("#" + pn.id)[0].parentElement.appendChild($("#" + data)[0]);
                    $("#" + data).attr("value","1"); // 진행부분에 왔으므로 value를 1로 설정

                    // 여유분의 카드에서 왔으므로 여유분의 카드를 관리해주는 배열에서 이 카드를 뺀다.
                    removeElementInArray(flipBackCards_id,data);

                    processCardsPositioning();
                }
                    
            }
        } else if (movedCard_value == 2) { // 여유분의 카드가 바로 결과부분으로 갔을 때
            if (isSameSort(pn.id,data)) { // 같은 종류인지 확인
                if (isDiffOne(pn.id,data)) { // 1의 차이가 나느지 확인
                    console.log("DD");
// position과 top 속성도 삭제해야 함.
            // 먼저 삭제하고 붙어야 없앤 상태로 적용이 되는 듯.
            $("#" + data).removeAttr("onclick",""); // 결과분에 있는 카드는 아무것도 하면 안되므로 기능을 제거함
            $("#" + data).css("position","");
            $("#" + data).css("top","");

            var dataElement = document.getElementById(data);
            dataElement.setAttribute('value','2'); // 결과분에 왔으므로 value를 2로 설정
            // dataElement.setAttribute("draggable","false");
            dataElement.removeAttribute("draggable"); // 결과분에 있는 카드는 아무것도 하면 안되므로 기능을 제거함
            dataElement.setAttribute("ondrop","drop(event)"); // 이 위에 카드가 올 수 있도록 ondrop은 설정함
            pn.appendChild(dataElement);
            pn.removeAttribute("ondrop");
            pn.removeAttribute("ondragover");
            
            console.log("oldClickedCardParent : " + oldClickedCardParent);

            removeElementInArray(flipBackCards_id,data);

            isWinCardCount()

            processCardsPositioning();
                }
                
            
            }
            
    
        } else if (movedCard_value == 4) { // process에 바로 올라오는 카드
            if (isIt13card(data)) { // process 위에 바로 올라오는 카드는 K 밖에 없다.
                console.log("V4");
                    // position과 top 속성도 삭제해야 함.
                    // 먼저 삭제하고 붙어야 없앤 상태로 적용이 되는 듯.
                    $("#" + data).css("position","");
                    $("#" + data).css("top","");

                    $("#" + pn.id)[0].appendChild($("#" + data)[0]);
                    $("#" + data).attr("value","1");
                    
                    console.log("V4 4 to 1")


                    removeElementInArray(flipBackCards_id,data);

                    processCardsPositioning();
            }
            
        }


        
        
    }
    else if (movedCard_value == 0) {

    }
    else if (movedCard_value == 1) {
        if (isDiffSortCard(data,pn.id)) {
            if (isDiffOne(data,pn.id)) {
                // console.log("DD");

                var oldClickedCardParent = document.getElementById(data).parentNode;
                // console.log(oldClickedCardParent.id);
                appendAllDownChild(document.getElementById(data),pn.id);
                // console.log(oldClickedCardParent.id);
                revealLastCardInProcessId(oldClickedCardParent);

                processCardsPositioning();
            }

        }

    } else if (movedCard_value == 2) {
        if (isSameSort(pn.id,data)) {
            if (isDiffOne(pn.id,data)) {
                console.log("SD");
        $("#" + data).removeAttr("onclick","");
        $("#" + data).css("position","");
        $("#" + data).css("top","0px");

        var oldClickedCardParent = document.getElementById(data).parentNode;
        console.log(oldClickedCardParent.id);
        var dataElement = document.getElementById(data);
        dataElement.setAttribute('value','2');
        dataElement.setAttribute("draggable","false");
        dataElement.setAttribute("ondrop","drop(event)");
        pn.appendChild(dataElement);

        pn.removeAttribute("ondrop");
        pn.removeAttribute("ondragover");

        console.log("oldClickedCardParent : " + oldClickedCardParent);
        revealLastCardInProcessId(oldClickedCardParent);

        isWinCardCount();

        processCardsPositioning();

        }
        }
        

    } else if (movedCard_value == 4) {
        if (isIt13card(data)) {
            console.log("V4");

            var oldClickedCardParent = document.getElementById(data).parentNode;
            // console.log(oldClickedCardParent.id);
            appendAllDownChild(document.getElementById(data),pn.id);
            // console.log(oldClickedCardParent.id);
            revealLastCardInProcessId(oldClickedCardParent);

            processCardsPositioning();
        }
        
    }

    // processCardsPositioning();
}

// 카드가 K인지 아닌지 확인
function isIt13card(data_id) {
    var Card_number;
    if (data_id[3] == null) {
        // 십의 자리 수가 아니면
        Card_number = data_id[2];
    } else {
        Card_number = data_id[2] + data_id[3];    
    }

    if (Card_number == 13) {
        return true;
    } else {
        return false;
    }
}

// 배열에서 특정 element를 제거
function removeElementInArray(array,data) {
    var index = array.indexOf(data);
        if (index > -1) {
            array.splice(index, 1);
        }
}

// process에서 맨 위에있는 카드를 옮길 경우 밑의 나머지 카드들도 옮겨져야 한다.
function appendAllDownChild(movedChild,str_TargetId) {
    var target_Object = document.getElementById(str_TargetId);
    // K가 빈 곳으로 넘어가면 생기는 버그 때문에 조금 바꾸자..
    if (target_Object.parentElement.id.indexOf("process") >= 0){
        var target_Object_Parent = target_Object.parentElement;
    } else {
        target_Object_Parent = target_Object;
    }
    // var target_Object_Parent = target_Object.parentElement;
    var movedparent = movedChild.parentNode;
    var movedChildren = movedparent.children;
    // var i = children.length - 1;
    // 옮겨지는 카드가 process에서 몇 번째 index 자식인지 확인. 이 index자식 이후의 카드들을 찾아 모두 옮겨지게 한다.
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
        // 찾은 index 밑의 카드들을 모두 옮긴다.
        console.log("found");
        var iteratorCount = movedChildren.length - foundStartIndex;
        for ( ;iteratorCount >0;iteratorCount--) {
            // console.log("foundStartIndex: " + foundStartIndex);
            // console.log("movedChildren.length : " + movedChildren.length);
            target_Object_Parent.appendChild(movedChildren[foundStartIndex]);
        }
    }
    
}

// 다른 종류의 카드인지 확인.
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

// 같은 종류의 카드인지 확인
function isSameSort(card1_id,card2_id) {
    console.log("card1_id[0] : " + card1_id[0] + ", card2_id[0] : " + card2_id[0]);
    if (card1_id[0] == card2_id[0]) {
        return true;
    } else {
        return false;
    }
}

// 1의 차이가 나는지 확인
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
    console.log("(movedCard_number - targetCard_number) : " + (movedCard_number - targetCard_number));
    if ((movedCard_number - targetCard_number) == 1) {
        console.log("DiffOne true");
        return true;
    } else {
        console.log("DiffOne false");
        return false;
    }

}

// process에서 맨 마지막 카드가 옮겨져 뒷면 카드가 마지막인 경우 그 카드를 앞면으로 드러낸다.
function revealLastCardInProcessId(oldClickedCardParent) {
    var lastCardInThisLine = oldClickedCardParent.children[oldClickedCardParent.childElementCount-1];
    if (lastCardInThisLine != null) {
        console.log("lastCardInThisLine : " + lastCardInThisLine);
        console.log("lastCardInThisLine.getAttribute('value') : " + lastCardInThisLine.getAttribute("value"));
        console.log("lastCardInThisLine.getAttribute('id') : " + lastCardInThisLine.getAttribute("id"));
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
    // setProcessBackground();

}

// 여유부분에서 카드를 리필하도록 한다.
function setBackCard() {
    $("#back_card").attr("onclick","refillCards()");
    // $("#back_card").attr("ondblclick","refillCards()");
}

// 여유분의 카드는 배열에서 관리하므로, 하나하나 꺼내서 다시 다 집어넣는다.
function refillCards() {
    console.log("refill cards");
    $("#front_card").empty();
    for (var index = 0; index < flipBackCards_id.length; index++) {
        $("<div class='card' id=" + flipBackCards_id[index] + " value = 3></div>").appendTo("#back_card");
        $("#" + flipBackCards_id[index]).css("background-image","url(data/0_0.jpg)");
        
        $("#" + flipBackCards_id[index]).removeAttr("draggable");
        $("#" + flipBackCards_id[index]).removeAttr("ondragstart");
        $("#" + flipBackCards_id[index]).removeAttr("ondrop");
        $("#" + flipBackCards_id[index]).removeAttr("ondragover");
        
        $("#" + flipBackCards_id[index]).css("position","absolute");
        $("#" + flipBackCards_id[index]).css("top","23px");

        $("#" + flipBackCards_id[index]).attr("onclick","flipCard('" + flipBackCards_id[index] + "')");
    }

    $("#back_card").removeAttr("onclick");
}

// 결과부분 판에 처음에 A가 올수 있도록 설정. 그 다음부터는 카드의 drop 함수에서 알아서 차례대로 쌓을 수 있도록 했다.
function setResultBackground() {
    var resultElement;
    for (var resultId_index = 1; resultId_index <= 4; resultId_index++) {
        // console.log("resultId_index : " + resultId_index);
        resultElement = document.getElementById("result" + resultId_index);
        resultElement.setAttribute("ondrop","dropACardToResult(event," + resultId_index + ")");
        resultElement.setAttribute("ondragover","allowDrop(event)");
    }
}

// function setProcessBackground() {
//     // process id 들 설정
//     var processElement;
//     for (var processId_index = 1; processId_index <= 7; processId_index++) {
//         processElement = document.getElementById("process" + processId_index);
//         processElement.setAttribute("ondrop","dropOnlyWantNumberCard(event,13)");
//         processElement.setAttribute("ondragover","allowDrop(event)");
//     }
// }

// function dropOnlyWantNumberCard(ev,thisNumberOnly) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("frontcard");
//     var pn = ev.target;
//     console.log(data); // 내가 마우스 클릭한 곳의 id string
//     console.log("pn.id : " + pn.id);

//     if (getCardNumberInIdString(data) == thisNumberOnly) {
//         var oldClickedCardParent = document.getElementById(data).parentNode;
//         // appendAllDownChild(document.getElementById(data),pn.id);
//         //         // console.log(oldClickedCardParent.id);
//         //         revealLastCardInProcessId(oldClickedCardParent);
//         // process 다른 곳에서 K가 나와서 빈 공간으로 갔을 경우, 카드를 뒤집어야 됨.

//         // appendAllDownChild(document.getElementById(data),pn.id);
//         //         // console.log(oldClickedCardParent.id);
//         //         revealLastCardInProcessId(oldClickedCardParent);


//         if (document.getElementById(data).getAttribute("value") == 1) {
//             appendAllDownChild(document.getElementById(data),pn.id);
//             // console.log(oldClickedCardParent.id);
//             revealLastCardInProcessId(oldClickedCardParent);
//         }

//         document.getElementById(data).style.top = "0px";
//         document.getElementById(data).setAttribute("value","1");

//         // if (pn.id.indexOf("process")) {
//         //     // var oldClickedCardParent = document.getElementById(data).parentNode;
//         //         // console.log(oldClickedCardParent.id);
//         //         appendAllDownChild(document.getElementById(data),pn.children[0]);
//         //         // console.log(oldClickedCardParent.id);
//         //         revealLastCardInProcessId(oldClickedCardParent);
//         //     // revealLastCardInProcessId(pn);
//         // }
        
//     }

// }

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

// 결과부분에 처음에 A 카드를 넣을 수 있도록 설정.
function dropACardToResult(ev,sortNumber) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("frontcard");
    var pn = ev.target;
    console.log(data); // 내가 마우스 클릭한 곳의 id string

    if (getCardNumberInIdString(data) == 1 && sortNumber == data[0]) {
        var oldClickedCardParent = document.getElementById(data).parentNode;
        var dataElement = document.getElementById(data);

        console.log("dataElement : " + dataElement);
        console.log("dataElement.value : " + dataElement.getAttribute("value"));
        if (dataElement.getAttribute("value") == "3") {
            removeElementInArray(flipBackCards_id,data);
        }

        pn.appendChild(dataElement);
        // 이제 A 카드 위에 drop 되는 것들은 이 A 카드의 자식이 되어야 함. 그 자식들도 마찬가지..
        // changeToMakeChildDrop(document.getElementById(data));
        // dataElement.setAttribute('value','2');
        dataElement.setAttribute("draggable","false");
        // dataElement.setAttribute("ondragstart","drag(event)");
        dataElement.setAttribute("ondrop","drop(event)");
        // dataElement.setAttribute("ondragover","allowDrop(event)");
        dataElement.setAttribute("value","2");
        dataElement.style.position = "";
        dataElement.style.top ="";
        // dataElement.style.backgroundImage = "url(data/" + lastCardInThisLine.getAttribute('id') + ".jpg)";
        // console.log("oldClickedCardParent : " + oldClickedCardParent);
        // console.log("oldClickedCardParent.id : " + oldClickedCardParent.id);


        isWinCardCount()

        revealLastCardInProcessId(oldClickedCardParent);
    }
}

// 자식을 놓을 수 있도록 설정
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

                var oldClickedCardParent = document.getElementById(data).parentNode;
                // console.log(oldClickedCardParent.id);
                appendAllDownChild(document.getElementById(data),pn.id);
                // console.log(oldClickedCardParent.id);
                revealLastCardInProcessId(oldClickedCardParent);
            // appendAllDownChild(document.getElementById(data),pn.id);
            }

        }

    }
}

// 결과부분에 모든 카드가 들어있는지 체크
function isWinCardCount() {
    resultCardCount++;
    console.log("resultCardCount : " + resultCardCount);
    if (resultCardCount >= 52) {
        winFunction();
    }
}

// 시간을 잰다.
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('showCurrentTime').innerHTML =
    "Time " + h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
    document.getElementById('showCurrentScore').innerHTML =
    "점수 : " + (score - changeToSeconds(h-start_h,m-start_m,s-start_s));
  }
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

  function changeToSeconds(h,m,s) {
    //   var r = (h*3600) + (m*60) + (s);
    //   console.log(r);
    //   console.log(typeof(r));
    return (h*3600) + (m*60) + (s);
  }

function recordStartTime() {
    start_today = new Date();
    start_h = start_today.getHours();
    start_m = start_today.getMinutes();
    start_s = start_today.getSeconds();

}

// 이겼을 때 하는 행동.
function winFunction() {
    recordEndTime();
    $("#win_window").css("display","block");
    winScore = (score - changeToSeconds(end_h-start_h,end_m-start_m,end_s-start_s));


    var sumAllNewSeconds = end_h*3600 + end_m*60 + end_s;
    var sumAlloldSeconds = start_h*3600 + start_m*60 + start_s;

    var diffAllTwoSeconds = sumAllNewSeconds- sumAlloldSeconds;
    var diff_h,diff_m,diff_s;

    diff_h = Math.floor(diffAllTwoSeconds / 3600);
    diff_m =  Math.floor(diffAllTwoSeconds / 60);
    diff_s = diffAllTwoSeconds % 60;

    $("#howLongToBeat").text("깨는데 걸린 시간: " + (diff_h) + "시간 " + (diff_m) + "분 " + (diff_s) + "초");
    $("#finalScore").text("최종 점수 : " + winScore);

}
// 시간 기록
function recordEndTime() {
    end_today = new Date();
    end_h = end_today.getHours();
    end_m = end_today.getMinutes();
    end_s = end_today.getSeconds();
}

function recordWinner() {
    var player = $("#clear_name").val();

    $.post("save_player.php",
    {
        player : player,
        score : winScore
    },
    function(data,status){
        alert("Data: " + data + "\nStatus: " + status);
    });


}

function readOtherScore() {

    var loadLineStr;
    $.post("load_player.php",{},function(data,status) {
        console.log("data : " + data + ", status : " + status);
        loadLineStr = data;
        console.log("loadLineStr : " + loadLineStr);
        // loadLineStr = data;
        loadLineStr = loadLineStr.split("|");

        $("#other_scores").text(loadLineStr[0] + " : " + loadLineStr[1]);
    });

    // console.log("loadLineStr : " + loadLineStr);
    // $("#other_scores").text(loadLineStr);
    
}


// process 에 있는 모든 카드들을 겹쳐서 놓게끔 만들려고 한다..
function processCardsPositioning() {
    for (var processIndex = 1; processIndex <= 7; processIndex++) {
        var tempProcess = $("#process"+processIndex)[0];
        // console.log('$("#process"+processIndex)[0].childElementCount : ' + $("#process"+processIndex)[0].childElementCount);
        for (var childIndex = 0; childIndex < $("#process"+processIndex)[0].childElementCount; childIndex++) {
            // console.log("tempProcess.children[childIndex] : " + tempProcess.children[childIndex]);
            tempProcess.children[childIndex].style.position = "absolute";
            tempProcess.children[childIndex].style.top = (childIndex*40) + "px";
            // console.log("loop?");
            
            // 여기에서 중간 카드에 drop 하는 것도 해결하자.
            if (childIndex != $("#process"+processIndex)[0].childElementCount-1) {
                tempProcess.children[childIndex].removeAttribute("ondragover");
                tempProcess.children[childIndex].removeAttribute("ondrop");
            } else {
                tempProcess.children[childIndex].setAttribute("ondragover","allowDrop(event)");
                tempProcess.children[childIndex].setAttribute("ondrop","drop(event)");
            }
        }

        // 여기에서 process가 카드를 가지고 있지 않을 경우 Wanted 함수를 가지게 하고, 그렇지 않으면 없애자.
        // 개발 중 want 함수는 필요 없어지게 되어서 주석처리함.
        if (tempProcess.childElementCount == 0) {
            tempProcess.setAttribute("ondrop","drop(event)");
            tempProcess.setAttribute("ondragover","allowDrop(event)");
        } else {
            tempProcess.removeAttribute("ondragover");
            tempProcess.removeAttribute("ondrop");
        }
    }
}