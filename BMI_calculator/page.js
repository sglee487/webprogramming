function BMI_func() {
  var height;
  var weight;
  var BMI;

  var BMI_result;
  var message;

  height = document.getElementById("height").value;
  weight = document.getElementById("weight").value;
  BMI = Math.round(weight / (height * height / 10000));

  BMI_result = document.getElementById("p_BMI_b");
  BMI_result.innerHTML="";
  BMI_result.innerHTML=BMI;

  message = document.getElementById("p_result_b");
  message.innerHTML="";

  try {
    if (BMI < 18.5) throw "underweight";
    if (BMI >= 18.5 && BMI < 23) throw "normal";
    if (BMI >= 23 && BMI < 25) throw "overweight";
    if (BMI >= 25 && BMI < 30) throw "obesity";
    if (BMI > 30) throw "overweight";
  }
  catch (err){
    message.innerHTML=err;
  }

}
