// http://www.berryjam.eu/solitaire/

// 카드 크기 100 x 125

// process2 = $("#process2");
// process2.text("hellop2");
$(document).ready(function(){
    process2 = $("#process2");
    process2.text("hellop2");

    gameInit();
});

var allCards = [];
var allCards_id = [];

// 게임 시작할 때 해야 할 것들.
// 카드들을 배열에 넣고, 섞고, 배치하고 등등...
function gameInit() {
    cardsInit();
    // suffleCards(allCards);
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
    for (var row = 1; row <= 7; row++) {

        for (var col = 0; col < row; col++) {
            // $("<div class='card'> hHHeeloo</div>").appendTo("#process"+row);
            child = $("#process"+row).append("<div class='card'> hHHeeloo</div>");
            $(child).append("<div class='card'> hHHeeloo</div>");

        }
    }

}