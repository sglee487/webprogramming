<!DOCTYPE html>
<html lang="kr">
    <head>
        <title>웹 텀. 솔리테어.</title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="solitaire.css">
        <link rel="stylesheet" type="text/css" href="cards.css">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script type="text/javascript" src="solitaire.js"></script>
        <!-- php에 관한 scrpit 처리는 밑에서 -->
        <script>
            $(document).ready(function(){
                // process1 = $("#process1");
                // process1.text("Hello world!");
            });
            // process1 = $("#process1");
            // process1.text("Hello world!");
        </script>

    </head>
    <body>
        <div class="maintainBoard">
            <table id="table1">
                <!-- 카드보드 위에 부분. -->
                <thead> 
                    <tr>
                        <td class="card_normal" id="back_card"></td>
                        <td class="card_normal" id="front_card"></td>
                        <td class="card_empty"></td>
                        <td class="card_results" id="result1"></td>
                        <td class="card_results" id="result2"></td>
                        <td class="card_results" id="result3"></td>
                        <td class="card_results" id="result4"></td>
                    </tr>
                </thead>
                <!-- 카드 메인 부분 -->
                <tbody>
                    <tr class="card_normal">
                        <td id="process1"></td>
                        <td id="process2"></td>
                        <td id="process3"></td>
                        <td id="process4"></td>
                        <td id="process5"></td>
                        <td id="process6"></td>
                        <td id="process7"></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div id="time_and_score_show">

        </div>

        <div id="other_scores">
            <?php

            ?>
        </div>
        
        <div id="win_window">
        <!-- 클리어시간, 점수 등을 표시 -->
        <?php

        ?>
        </div>

            <div id="showCurrentTime">
            </div>
            <div id="showCurrentScore">
            </div>
    </body>
</html>