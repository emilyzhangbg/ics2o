var difficulty = localStorage.getItem("difficulty"); //difficulty of the game from the local storage since the user chose it on the splash screen
var startSound;

function greeting() {
  //if the text inside the button is 'Start'
  if (document.getElementById("start").innerHTML == "Start") {
	//play starting sound effect
	startSound = document.getElementById("win");
	startSound.play();
	//hide the alert and start the timer
	document.getElementById("welcomeAlertTable").style.visibility = "hidden";
	startTimer();
	//enables every button on the keyboard
    for(z = 1; z <= 26; z++){
	  var enableid = String.fromCharCode(z+64);
	  document.getElementById(enableid).disabled = false;
    }
	
  //else get the user's name and change the message in the alert
  } else {
	//play sound effect
	var buttonSound = document.getElementById("correctLetter");
	buttonSound.play();
	var userName = document.getElementById("userName").value;
	document.getElementById("start").innerHTML = "Start";
	document.getElementById("welcomeMessage").innerHTML = "Hi " + userName + ",<br> You have chosen the difficulty: " + difficulty + "<br>Are you ready to start the game?";
  }
}

var wins = 0;
var totalGames = 0;
var swLength; //length of the secret word
var secretWord;

//loads most components needed for the game
function loadPage() {
  //creates a random number 0-19 and uses the word in the array "wordArray" at that index as the secret word
  var ranNum = Math.floor(24*Math.random());

  //chooses from the word arrays of three difficulties depending on which difficulty the user chooses
  var wordArray;
  if (difficulty  == "EASY"){
	wordArray = ["LOVE", "SHOE", "MUSIC", "PHONE", "FENCE", "CAR", "COUCH", "PLANT", "COAT", "GRASS", "GIRL", "WATER", "SHELL", "TRUCK", "STAND", "COACH", "LIGHT", "DARK", "BLUE", "BIRD", "TAPE", "CLAY", "HOME", "FIRE", "SPRING"];
  } else if (difficulty == "MEDIUM") {
	wordArray = ["ANIMALS", "PAVEMENT", "CARDINAL", "CARNIVAL", "LANTERN", "LIGHTHOUSE", "TENNIS", "HIGHLIGHTER", "PROTRACTOR", "HYPER", "AUTOMOBILE", "GARAGE", "SILKY", "CLARINET", "LAPTOP", "FEBRUARY", "CHRISTMAS", "GRANDMOTHER", "JAZZY", "BORDER", "INDEPENDANT", "MISSION", "PALACE", "SPECIES", "UNIVERSITY"]
  } else {
	wordArray = ["AWKWARD", "ABYSS", "BANJO", "BANDWAGON", "DWARVES", "ESPIONAGE", "GALAXY", "INJURY", "JIGSAW", "LUXURY", "NYMPH", "RHUBARB", "SCRATCH", "UNKNOWN", "WALKWAY", "YOUTHFUL", "ZODIAC", "ZOMBIE", "TWELFTH", "PNEUMONIA", "JOKING", "AVENUE", "ASKEW", "BEEKEEPER", "ABSURDLY",]
  }
  secretWord = wordArray[ranNum];
  swLength = secretWord.length;

  //creates a table called "myTable" where the secret word will be displayed
  var table = document.createElement("TABLE");
  var blanks = document.getElementById("blanks");
  table.setAttribute("id", "myTable");
  //attaches the table to the div "blanks"
  blanks.appendChild(table);

  //creates a row for the secret word to be displayed called "wordTr" and attaches it to "myTable"
  var row1 = document.createElement("TR");
  row1.setAttribute("id", "wordTr");
  document.getElementById("myTable").appendChild(row1);

  //creates a row for the dashed lines under the secret word to be displayed called "blankTr" and attaches it to "myTable"
  var row2 = document.createElement("TR");
  row2.setAttribute("id", "blankTr");
  document.getElementById("myTable").appendChild(row2);

  //creates the same number of columns in "myTable" as the letters in the secret word, one for every letter
  for (k = 0; k < swLength; k++) {
	//creates a column
	var col = document.createElement("TD");
	col.style.width = "45px";
	col.align = "center";
	//creates a text node for the letter at index k in the secret word
	var t = document.createTextNode(secretWord.charAt(k));
	//creates a p tag for every letter in the secret word with the class name "sw" and the id as their index in the secret word
	var p = document.createElement("P");
	p.className = "sw";
	p.id = k;
	//the text node is appended to the p tag and the p tag is appended to the column which they correspond to
	p.appendChild(t);
	col.appendChild(p);
	//the column is appended to the row "wordTr"
	document.getElementById("wordTr").appendChild(col);
  }

  //creates the same number of columns as the letters in the secret word, one for every line that corresponds to the letters
  for (l = 0; l < swLength; l++) {
	//creates a column and the a horizontal line
	var col1 = document.createElement("TD");
	var hr = document.createElement("HR");
	//attaches the line to the column
	col1.appendChild(hr);
	//attaches the column to the row "blankTr"
	document.getElementById("blankTr").appendChild(col1);
  }
}


//creates they keyboard
function createKeyboard(){
  //this creates the 26 buttons for the keyboard
  for(x = 1; x <= 26; x++){
	//use the createElement function to create a button and a newline
    var btn = document.createElement("button");
	var newLine = document.createElement("br");
	
	//gets the letter in the alphabet corresponding to the code
    var letter = String.fromCharCode(x+64);
	//attaches 'letter' to a text node
    var t1 = document.createTextNode(letter);
	//appends the text node 't1' to the button
    btn.appendChild(t1);
	//give the btn an id and class name to make it easy to access later
    btn.id = letter;
	btn.className = "keyBtn";
	//this is how to add an event to the button -- name the event and 
	//onclick, the function checkLetter will be performed
    btn.addEventListener("click", checkLetter);
	btn.disabled = true;

    //add the btn to the div "keyboard"
	var keyboard = document.getElementById("keyboard");
	keyboard.appendChild(btn);
	
	//add a line break 'newLine' after 9 buttons
	if (x%9 == 0) {
	  keyboard.appendChild(newLine);
	}
  }
}


function startTimer () {
  //gets the number of milliseconds since midnight 1970/01/01 plus two minutes
  var endTime = new Date().getTime() + 2*60*1000;
  
  //call function 'myTimer' every second
  var timer = setInterval(myTimer, 1000);

  function myTimer() {
  //gets the number of milliseconds since midnight 1970/01/01
  var now = new Date().getTime();
  
  //finds the distance between 'endTime' and 'now' and changes the unit into seconds
  //'remaining' is the number of seconds remaining on the clock
  var remaining = Math.round((endTime - now)/1000);
  
  //'min' calculates the number of minutes remaining on the clock
  var min = String(Math.floor(remaining / 60));
  //'sec' calculates the number of seconds remaining on the clock
  var sec = String(Math.round(remaining % 60));
  
  //if the seconds remaining are in the single digits then pad a zero infront of it
  if (sec.length == 1) {
	sec =  "0" + sec;
  }
  
  //sets these variable as the timer
  document.getElementById("time").innerHTML = "time: " + min + ":" + sec;

  //when there's 10 seconds remaining play ticking sound
  var tickingSound = document.getElementById("tick");
  if (remaining == 10) {
	tickingSound.play();
  }
  
  //if zero milliseconds remain
  if (remaining <= 0) {
	//pause the ticking sound when the time is up
	tickingSound.pause();
    document.getElementById("time").innerHTML = "time: 0:00";
	
	//call function 'endGame' with parameters 'time' meaning the game ended because time's up
	endGame("time");
	
	//stop the timer
	clearInterval(timer);
  }
}
}


var clickedBtn; //the clicked button

function checkLetter(){		
  //disables the clicked button
  document.getElementById(this.id).disabled = true;
  clickedBtn = document.getElementById(this.id);
	
  //assumes that the letter clicked is not in the secret word
  var wrong = true;
	
  //checks if the clicked letter is in the secret word
  for (i = 0; i < swLength; i++) {
	//'wordLetter' is the letter in the string 'secretWord' at index 'i'
	var wordLetter = secretWord.charAt(i);
	
	//if the clicked letter (this.id) is equalled to 'wordLetter' (a letter in the string 'secretWord')
	if (this.id == wordLetter){
	  //the index the clicked letter has in the secret word
	  var appearIndex = i;
	  //the letter clicked is in the string 'secretWord'
	  wrong = false;
	  //calls function 'rightGuess' (everytime a letter is found the same as the clicked letter, this function will be called)
	  rightGuess(appearIndex);
	} 
  }
  
  //if the clicked letter does not match with any of the letters in the secret word
  if (wrong == true) {
	//call function 'wrongGuess'
	wrongGuess();
  }
}


var j = 2; //the number for the image of the hangman picture shown
function wrongGuess(){
  //plays wrong sound when the letter is not in the secret word
  var wrongLetterSound = document.getElementById("wrongLetter");
  wrongLetterSound.play();
  //change the background colour of the clicked button to red
  clickedBtn.style.backgroundColor = "red";
  
  //displays the number of tries remaining for the player
  document.getElementById("tries").innerHTML = 7 - j + 1;
  
  //change the hangman image to the next image
  document.getElementById("image").src = "../images/Hangman" + String(j) + ".png";
	
  //if the hangman image is the last one "Hangman8.png", then the player loses this game
  if(j == 8) {
	//calls function 'endGame' with parameter 'lose'
	endGame("lose");
  }
  j++;
}


var solved = 0; //how many letters did the player solved in the secret word

function rightGuess(index){
  //plays correct sound when the letter is in the secret word
  var correctLetterSound = document.getElementById("correctLetter");
  correctLetterSound.play();
  //change the button background colour to green
  clickedBtn.style.backgroundColor = "green";	
  //get the element with the id "index" (the letter(s) corresponding to the clicked letter in the secret word) and make it visible
  document.getElementById(index).style.visibility = "visible";
	
  //increase the number of letters they got right by one
  solved++
	
  //if the number of letters they got right is equalled to the length of the secret word, the player wins
  if(solved == swLength) {	  
    //calls function 'endGame' with parameter 'wins'
	endGame("wins");
  }
}

var bestScore = 0;

function endGame(a) {

  //disable all the buttons
  for(y = 1;y <= 26;y++){
	var enableid = String.fromCharCode(y+64);
	document.getElementById(enableid).disabled = true;
  }

  //shows all the letters in the word
  for (m = 0; m < swLength; m++) {
	document.getElementById(m).style.visibility = "visible";
  } 

  //if the player guessed the word  
  if (a == "wins") {
	//plays win sound
	var soundWin = document.getElementById("win");
	soundWin.play();
	//set the message of the alert as 'Solved!' and show the alert after one second
	document.getElementById("message").innerHTML = "Solved!<br> The word is: " + secretWord;
	setTimeout(function(){document.getElementById("alertTable").style.visibility = "visible";}, 1000);
	//increase the number of games won and the number of total games by one
	wins++
	totalGames++
	document.getElementById("winPara").innerHTML = wins;
	document.getElementById("totalPara").innerHTML = totalGames;
	
	//if the number of 'wins' is greater than the 'bestScore' then add one to 'bestScore'
	if (wins > bestScore) {
	  bestScore++;
	  document.getElementById("bestScore").innerHTML = "Best: " + bestScore;
	}
  
  //if the player didn't guess the word
  } else if (a=="lose"){
	//plays game lost sound
	var soundLose = document.getElementById("lose");
	soundLose.play();
	//set the message of the alert as 'Try Again.' and show the alert after one second
	document.getElementById("message").innerHTML = "Try Again.<br> The word is: " + secretWord;
	setTimeout(function(){document.getElementById("alertTable").style.visibility = "visible"; }, 1000);
	//increase the number of total games by one
	totalGames++;
	document.getElementById("totalPara").innerHTML = totalGames;
	
  //if the timer is up
  } else {
	//displays the accuracy and score of the player in an alert and changes the text on the button from 'Next Game' to 'Replay'
	var accuracy = Math.round(wins/totalGames*100);
	document.getElementById("nextGame").innerHTML = "Replay";
	document.getElementById("message").innerHTML = "time's up <br>score: " + wins + "/" + totalGames + "<br>accuracy: " + accuracy + "%";
	//displays after one second
	setTimeout(function(){document.getElementById("alertTable").style.visibility = "visible"; }, 1000);
  }
}


function replayBtn () {
  //hide the alert
  document.getElementById("alertTable").style.visibility = "hidden";
  
  //enable every button on the keyboard and change their background color to white
  for(y = 1; y <= 26; y++){
	var enableid = String.fromCharCode(y+64);
	document.getElementById(enableid).disabled = false;
	document.getElementById(enableid).style.backgroundColor = "white";
  }

  //remove the table containing the secret word
  var child = document.getElementById("myTable");
  child.remove();
	
  //call function 'loadPage'
  loadPage();

  //resets the variables for a new game
  document.getElementById("image").src = "../images/Hangman1.png";
  j = 2;
  solved = 0;
  document.getElementById("tries").innerHTML = 7;
  
  //if the text inside the button is 'Replay' and not 'Next Game', it means that the timer ran out and the game is going to completely restart
  if (document.getElementById("nextGame").innerHTML == "Replay") {
	//plays start game sound
	startSound.play();
	
	//changes the text on the button to 'Next Game'
	document.getElementById("nextGame").innerHTML = "Next Game";
	//reset the number of wins and total games played
	wins = 0;
	totalGames = 0;
	document.getElementById("winPara").innerHTML = wins;
	document.getElementById("totalPara").innerHTML = totalGames;
	
	//set the timer to 2 minutes and start the timer
	document.getElementById("time").innerHTML = "time: 2:00";
	startTimer();
  }
}
