var num1 = 0;
var num2 = 0;
var signChoice = "";
var noEqualNum = 0;
var numPI = 0;
 
function addNum(num){
 document.getElementById("screen").value = document.getElementById("screen").value + num;
 }
function addDecimal() {
 document.getElementById("screen").value = document.getElementById("screen").value + ".";
 document.getElementById('bDec').disabled = true; 
}
function addNegative() {
 document.getElementById("screen").value = -1*document.getElementById("screen").value;
}
function addPI() {
 numPI = document.getElementById("screen").value;
 if (document.getElementById("screen").value == "") {
	addNum(Math.PI);
 } else {
	document.getElementById("screen").value = Math.PI*numPI;
 }
 numPI = 0;
}
function setSign(sign){
 signChoice = sign;
 num1 = document.getElementById("screen").value;
 document.getElementById("screen").value ="";
 document.getElementById('bDec').disabled = false;  
 }
function equalPressed() {
 num2= document.getElementById("screen").value;
 if (signChoice =="+") {
 document.getElementById("screen").value = Number(num1) + Number(num2);
 } else if (signChoice =="-") {
 document.getElementById("screen").value = Number(num1)- Number(num2);
 } else if (signChoice =="/") {
 document.getElementById("screen").value = Number(num1)/ Number(num2);
 } else if (signChoice =="*") {
 document.getElementById("screen").value = Number(num1)* Number(num2);
 } else if (signChoice == "^") {
 document.getElementById("screen").value = Number(num1)** Number(num2);
 } 
  num1 = 0;
  num2 = 0;
}
function noEqualOperation(oper) {
 noEqualNum = document.getElementById("screen").value;
 if (oper == "1/x") {
	document.getElementById("screen").value = 1/Number(noEqualNum);
 } else if (oper == "R"){
	document.getElementById("screen").value = Math.sqrt(Number(noEqualNum));
 } else if (oper == "%") {
	document.getElementById("screen").value = Number(noEqualNum)/100;
 } else if (oper == "sin") {
	document.getElementById("screen").value = Math.sin(Number(noEqualNum)*Math.PI/180);
 } else if (oper == "cos") {
	document.getElementById("screen").value = Math.cos(Number(noEqualNum)*Math.PI/180);
 } else if (oper == "tan") {
	document.getElementById("screen").value = Math.tan(Number(noEqualNum));
 } else if (oper == "log") {
	document.getElementById("screen").value = Math.log(Number(noEqualNum));
 } 
 document.getElementById('bDec').disabled = false; 
  noEqualNum = 0;
  num1 = 0;
  num2 = 0;
}
function setClear() {
  document.getElementById("screen").value = "";
  num1 = 0;
  num2 = 0;
  document.getElementById('bDec').disabled = false; 
}