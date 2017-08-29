// Encapsulate JavaScript with IIFE wrapper
var NoughtsAndCrosses = (function(){

	/////////////////////// START/NEW GAME SCREEN  ///////////////////////
	///////////////////////////////////////////////////////////////////// 

	// Append start and finish screens to the body and immediately hide 
	$('body').append(`<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>`);
	$('body').append(`<div class="screen screen-win" id="finish"> <header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" class="button">New game</a></header></div>`);
	$('#start, #finish').hide();

	// First show the start screen on page load
	(function() {
		$('#start').show();

		// When start/new game button is clicked...
		$('.button').on('click', function(){

			
			$(".box").each(function () {
				//Reset the board from previous game
				this.style.backgroundImage = "none";
				$(this).removeClass("box-filled-1");
				$(this).removeClass("box-filled-2");
				$("#finish").removeClass("screen-win-one");
				$("#finish").removeClass("screen-win-two");
				$("#finish").removeClass("screen-win-tie");

			// Hide start/new game screen and show the game board 
			$('#start').hide();
			$('#finish').hide();
			$('#board').show();

			// Remove active classes from previous game
			$('li.players').removeClass('active');

			// Randomly assign first go to a player
			$('.players').eq(Math.floor(Math.random() * 2)).addClass("active");

			// Call startGame function to start the game
			takeTurn();

			});	
		});
	}());


	///////////////////////////// GAMEPLAY  /////////////////////////////
	///////////////////////////////////////////////////////////////////// 

	function takeTurn() {

		$('.box').each(function(){

			// When empty squares are moused over...    
			$(this).mouseenter(function(){

				// highlight square with active player's symbol 
				if ( $('#player1').is(".active")){
					this.style.backgroundImage = "url('img/o.svg')";
				} else {
					this.style.backgroundImage = "url('img/x.svg')";
				};
			});

			// When mouse leaves empty square...
			$(this).mouseleave(function(){ 

				// unhighlight square with active player's symbol 
				this.style.backgroundImage = "none";
			});
		});


		// On plyaer move...
		$('.box').click(function(){ 

			// Get ID of active player and store in activePlayer variable
			var activePlayer = $(".active").attr('id');

			// Check square has not already been played...
			if (!$(this).is(".box-filled-1, .box-filled-2")) { 

				// add correct 'box-filled' class to indicate square has been played by active player...
				if (activePlayer === "player1") {
					$(this).addClass('box-filled-1');
				} else {
					$(this).addClass('box-filled-2');
				};

				// change background image active player's symbol
				if (activePlayer === "player1") {
					this.style.backgroundImage = "url('img/o.svg')";
				} else {
					this.style.backgroundImage = "url('img/x.svg')";
				};

				// and remove previously-attached mouse enter/leave event handler 
				$(this).unbind('mouseenter mouseleave');

				// Before progressing to next move, check for win state
				checkForWin();

				// Then progress to next player's go
				if (activePlayer === "player1") {
					 $('#player1').removeClass("active");
					 $('#player2').addClass("active");
				} else {
					 $('#player2').removeClass("active");
					 $('#player1').addClass("active");
				};	
			};
		});	
	};

	///////////////////////// CHECK FOR WINNER  /////////////////////////
	///////////////////////////////////////////////////////////////////// 

	// Function to check if game has been won (to be called inbetween each move)
	function checkForWin () {

		// Variable to store ID of winner
		var winner = "";	

		// Empty array to store played square info
		var playedSquares = [];	

		$('.box').each(function(){	

			//when a square is played push player ID to playedSquares array
			if ($(this).is( ".box-filled-1")) {
				playedSquares.push("player1");

			} else if ($(this).is( ".box-filled-2")) {
				playedSquares.push("player2");	

			// else push default value of "null"			
			} else {
				playedSquares.push("null");
			};
		});

		//Check for all possible winning played square combinations
		if ((playedSquares[0] !== "null") && playedSquares[0] === playedSquares[1] && playedSquares[1] === playedSquares[2]) {
			// If game is won, assign correct player ID to winner variable
			winner = playedSquares[0];

		} else if (playedSquares[0] !== "null" && playedSquares[0] === playedSquares[3] && playedSquares[3] === playedSquares[6]) {
			winner = playedSquares[0];

		} else if (playedSquares[0] !== "null" && playedSquares[0] === playedSquares[4] && playedSquares[4] === playedSquares[8]) {
			winner = playedSquares[0];

		} else if (playedSquares[1] !== "null" && playedSquares[1] === playedSquares[4] && playedSquares[4] === playedSquares[7]) {
			winner = playedSquares[1];

		} else if (playedSquares[3] !== "null" && playedSquares[3] === playedSquares[4] && playedSquares[4] === playedSquares[5]) {
			winner = playedSquares[3];

		} else if (playedSquares[8] !== "null" && playedSquares[8] === playedSquares[5] && playedSquares[5] === playedSquares[2]) {
			winner = playedSquares[8];

		} else if (playedSquares[8] !== "null" && playedSquares[8] === playedSquares[7] && playedSquares[7] === playedSquares[6]) {
			winner = playedSquares[8];

		} else if (playedSquares[2] !== "null" && playedSquares[2] === playedSquares[4] && playedSquares[4] === playedSquares[6]) {
			winner = playedSquares[2];
		};

		// If Player 1 is winner
		if (winner === "player1") {
			// Display "screen-win-one" finish screen
			$("#finish").addClass("screen-win-one");
			$(".message").html("PLAYER 1 WINS");	
			$("#board").hide();
			$("#finish").show();
			
		// If Player 2 is winner
		} else if (winner === "player2") {
			// Display "screen-win-two" finish screen
			$("#finish").addClass("screen-win-two");
			$(".message").html("PLAYER 2 WINS");
			$("#board").hide();
			$("#finish").show();

		// If game has not been won but ther are no "null" values left in playedSquares array, it must be a draw	
		} else if (jQuery.inArray("null", playedSquares) === -1) {
			// Therefore, display tie game screen
			$("#finish").addClass("screen-win-tie");
			$(".message").html("DRAW");
			$("#board").hide();
			$("#finish").show();
		};
	};

}());



	