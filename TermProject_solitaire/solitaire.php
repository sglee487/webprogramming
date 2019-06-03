<!DOCTYPE html>
<html lang="kr">
    <head>
        <title>웹 텀. 솔리테어.</title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="solitaire.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src="solitaire.js"></script>
        <!-- php에 관한 scrpit 처리는 밑에서 -->
        <script>
            $(document).ready(function(){
                process1 = $("#process1");
                process1.text("Hello world!");
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
                <tbody >
                    <tr class="card_normal">
                        <td id="process1">a</td>
                        <td id="process2">b</td>
                        <td id="process3">c</td>
                        <td id="process4">d</td>
                        <td id="process5">e</td>
                        <td id="process6">f</td>
                        <td id="process7">g</td>
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
        

    </body>
</html>