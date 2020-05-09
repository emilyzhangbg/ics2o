//moves the progress bar
function progressBar() {
  var progress = document.getElementById("insideBar");
  var width = 1;
  //every 10 milliseconds call the function 'moving'
  var move = setInterval(moving, 10);

  function moving() {
	//if the width of the moving bar is greater or equal to 100%
    if (width >= 100) {
	  //stop the increasing
      clearInterval(move);
	  //remove the progress bar and make a button under visible
	  var page = document.getElementById("page");
	  page.remove();
	  document.getElementById("nav").style.visibility = "visible";
	  
	//if the width of the moving bar is less than 100%
    } else {
	  //increase the width by 1%
      width++;
      progress.style.width = width + "%";
    }
  }
}

//set easy as the automatic chosen level
var difficulty = "EASY";
function onLoad() {
	document.getElementById("EASY").style.backgroundColor = "black";
	document.getElementById("EASY").style.color = "white";
}


//changing the difficulty
function selectDifficulty (x) {
	var element = document.getElementById(difficulty);
	element.style.backgroundColor = "white";
	element.style.color = "black";
	difficulty = x;
	element = document.getElementById(difficulty);
	element.style.backgroundColor = "black";
	element.style.color = "white";
	var buttonSound = document.getElementById("buttonClick");
	buttonSound.play();
}

//stores the difficulty in local storage
function store() {
	localStorage.setItem("difficulty", difficulty);
}