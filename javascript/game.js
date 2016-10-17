// define variables
var theWordArray = ["afro","booger","breakup","clueless","contempt","cool","creepy","dentist","bff","geeky","happy","hotty","indifferent","kissing","love","mummy","narcissist","nipples","old","patience","rock","shit","sleeping","sunburn","tipsy","unibrow","wutang"]
var incorrectGuessedLetters = [];			// s,w,c,r
var correctGuessedLetters = []
var heartIndex = 0;
var correct = 0;
var winz = 0
var lozz = 0

// ============= Put stuff on screen =====================


generateRandomWord();

function generateRandomWord(){

	var randomNum = Math.floor(Math.random() * theWordArray.length);
	theWord = theWordArray[randomNum];


	console.log(theWord)


	displayEmjoi(theWord)
}

function displayEmjoi(theWord){
	// display on screen
	var img = document.createElement("img");
	img.setAttribute("src", "images/" + theWord + ".png")
	img.setAttribute("width", "150px")
	document.getElementById("image").appendChild(img)

	displayBlankWord();
}

function displayBlankWord(){
	for (var i = 0; i < theWord.length; i++){
		 $("#emptyBox").append("<div class=block id=box" + i + "> _ </div>");
	}

	displayHearts()
}

function displayHearts(){
	for (var i = 0; i < 5; i++){
		$("#emptyHeart").append("<img src=images/heart.png class='hearts' id=heart" + i +">");
	}
}


// ============= User Input =====================

document.onkeyup = function(event){
	var myKey = String.fromCharCode(event.keyCode).toLowerCase();
	doSomeLogic(myKey);
}


// ============= Correct vs Incorrect =====================


function doSomeLogic(myKey){
	// if correct --> listed in theWord and NOT listed in the correctGuessedLetters
	if(theWord.indexOf(myKey) >= 0 && correctGuessedLetters.indexOf(myKey) < 0){
		
		// add letter to correctGuessedLetters
		correctGuessedLetters.push(myKey);
		
		for (var i = 0; i < theWord.length; i++){
			if (theWord.charAt(i) === myKey) { 
				// change replace with the letter
				document.getElementById("box" + i).innerHTML = myKey;
				correct = correct + 1;

				// add correctGuessedLetters to array
			}	
		}
	}



	// if !correct 
	if(theWord.indexOf(myKey) < 0){

		//check if myKey is in repeated in incorrectGuessedLetters array
		if(incorrectGuessedLetters.indexOf(myKey) >= 0) {
			// it's repeated. do nothing
		} else {
		// display !correct letter
		incorrectGuessedLetters.push(myKey);
		document.getElementById("emptyGuess").innerHTML = incorrectGuessedLetters;
		
		// remove one heart
		$("#heart" + heartIndex).replaceWith(" ");
		heartIndex = heartIndex + 1;
		}
	}


	// now check if user won or lost
	winLose(heartIndex);

} // doSomeLogic






// ============= Win Vs Lose =====================

function winLose(heartIndex){
	// Lose
	if (heartIndex === 5){ 
		//5 incorrect guesses
		lozz = lozz + 1;
		resetGame();
	}

	if (correct === theWord.length){
		// Win
		winz = winz + 1;
		resetGame();
	}
}

// ============= New Game =====================

function resetGame(){
		// updates wins and losses
		document.getElementById("win").innerHTML = "wins: " + winz;
		document.getElementById("loss").innerHTML = "losses: " + lozz;

		// resets numbers & arrays		
		theWordArray = ["afro","booger","breakup","clueless","contempt","cool","creepy","dentist","bff","geeky","happy","hotty","indifferent","kissing","love","mummy","narcissist","nipples","old","patience","rock","shit","sleeping","sunburn","tipsy","unibrow","wutang"]
		correctGuessedLetters = [];
		incorrectGuessedLetters = [];		
		heartIndex = 0;
		correct = 0;

		// resets text & images
		document.getElementById("image").innerHTML = "";
		document.getElementById("emptyBox").innerHTML = "";
		document.getElementById("emptyGuess").innerHTML = ".";
		document.getElementById("emptyHeart").innerHTML = "";


		// display previous answer
		document.getElementById("previousAnswerTxt").innerHTML = "previous answer:";
		document.getElementById("theWord").innerHTML = theWord;		
		document.getElementById("theImage").innerHTML = "<img src=images/" + theWord + ".png  style=width:50px>";


		generateRandomWord();
} // resetGame()













