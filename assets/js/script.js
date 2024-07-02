// Waits for the DOM to load before initailising game.
document.addEventListener("DOMContentLoaded", function() {
    // Selects all board slots (where X's and O's can be placed)
    const boardSlots = document.getElementsByClassName('board-slot');
    const board = document.getElementById('game-board');
    // Establishes first player when game loads
    let playerX ='X';
    let playerO = 'O';
    let currentPlayer = 'X'; // Sets X as initial player.

    displayWelcomeMessage();
    hideWelcomeMessage();
    // Add click event to each board slot
    for (const slot of boardSlots) {
        /**
         * Determines slot occupancy and determines next function.
         */
        slot.addEventListener('click', function occupiedCheck() {
            if (!slot.classList.contains('X') && !slot.classList.contains('O')) {
                // If unoccupied, add current player's character to the chosen slot.
                slot.classList.add(currentPlayer);

                // Check if win or draw conditions are met.
                if (winResult(currentPlayer)){
                    addWinPoint(currentPlayer); 
                    addLossPoint(currentPlayer);
                    displayWinMessage(currentPlayer);
                } else if (drawResult()) {
                    addDrawPoint();
                    displayDrawMessage();
                } else { // Player swap if neither win or draw
                    currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
                    board.classList.toggle(playerX);
                    board.classList.toggle(playerO);
                    console.log(`Next player: ${currentPlayer}`); // Player logging for debugging.
                }
            } else {
                console.log("slot already occupied.");
            }
        });
    }
});

nextRound();
newGame();
resetNo();
resetYes();

function displayWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.classList.remove('hidden');
}

function hideWelcomeMessage() {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', function() {
        console.log('Start button clicked. Hiding welcome message.');
        const welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.classList.add('hidden');
    });
}

/**
 * Checks for one of the winning combinations.
 */
function winResult(player) {
    const boardSlots = document.getElementsByClassName('board-slot'); // Selects all board slots
    const winningCombos = [ // Winning combinations (based on article form stack overflow)
        [0, 1, 2],[3, 4, 5],[6, 7, 8], // rows
        [0, 3, 6],[1, 4, 7],[2, 5, 8], // columns
        [0, 4, 8],[2, 4, 6]            // diagonals
    ];
    
    const result = winningCombos.some(combo => { // Checks for winning combos on the game board.
        return combo.every(index=> boardSlots[index].classList.contains(player)) // Checks for player characters in relevant indices/slots. 
        });
    console.log(`${player} win status: ${result}`);
    return result; //Returns result of win check.
}

/** 
 * Adds a point to the respective player tally.
 * Runs in tandem with addLossPoint function.
*/
function addWinPoint(currentPlayer) {
    if (currentPlayer === 'X') {
        let xWins = parseInt(document.getElementById('p-x-wins').innerHTML);
        document.getElementById('p-x-wins').innerHTML = ++xWins;
    } else if (currentPlayer === 'O') {
        let oWins = parseInt(document.getElementById('p-o-wins').innerHTML);
        document.getElementById('p-o-wins').innerHTML = ++oWins;
    }
    displayWinMessage(currentPlayer); //Calls winMessage function.
}

/**
 * Displays hidden winner message.
 */
function displayWinMessage(player) {
    const winMessage = document.getElementById('win-message');
    winMessage.querySelector('[data-win-message] h3').textContent = `${player} Wins!`;
    winMessage.classList.remove('hidden');
}

/**
 * Checks for a draw if no combo is found.
 */
function drawResult() {
    const boardSlots = document.getElementsByClassName('board-slot');
    const occupied = [...boardSlots].every(slot => slot.classList.contains('X') || slot.classList.contains('O'));
    console.log(`Draw Result: ${occupied}`);
    return occupied;
}

/** 
 * Adds a point to the both player tallys.
*/
function addDrawPoint() {
    if (drawResult() === true) {
            let xDraws = parseInt(document.getElementById('p-x-draws').innerHTML);
            document.getElementById('p-x-draws').innerHTML = ++xDraws;

            let oDraws = parseInt(document.getElementById('p-o-draws').innerHTML);
            document.getElementById('p-o-draws').innerHTML = ++oDraws;
    }
}

/**
 * Displays hidden draw message.
 */
function displayDrawMessage() {
    const drawMessage = document.getElementById('draw-message');
    drawMessage.querySelector('[data-draw-message] h3').textContent = `Draw!`;
    drawMessage.classList.remove('hidden');
}

/** 
 * Adds a point to the respective player tally.
 * Runs in tandem with addWinPoint function,
 * so does not have lossResult function.
*/
function addLossPoint(currentPlayer) {
    if (currentPlayer === 'O') {
        let xLoss = parseInt(document.getElementById('p-x-losses').innerHTML);
        document.getElementById('p-x-losses').innerHTML = ++xLoss;

    } else if (currentPlayer === 'X') {
        let oLoss = parseInt(document.getElementById('p-o-losses').innerHTML);
        document.getElementById('p-o-losses').innerHTML = ++oLoss;
    }
}

/**
 * Triggers next round and hides message. 
 * Board reset only. 
 * Tally is kept.
 */
function nextRound() {
    let nextRoundButtons = document.getElementsByClassName('next-round-button');
    
    for (const button of nextRoundButtons) {
    
        button.addEventListener('click', function() {
            console.log('A new round has been started. Emptying slots...')
            const boardSlots = document.getElementsByClassName('board-slot');
            for (const slot of boardSlots) {
                slot.classList.remove('X', 'O');
            }
            
            const winMessage = document.getElementById('win-message');
            const drawMessage = document.getElementById('draw-message');
            
            winMessage.classList.add('hidden');
            drawMessage.classList.add('hidden');

            currentPlayer = 'X';
        });
    }
}

/**
 * Triggers warning dialogue box to confirm player's choice.
 */
function newGame() {
    const newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', function() {
        console.log('New Game button clicked. Displaying warning message.');
        const warningMessage = document.getElementById('warning-message');
        warningMessage.classList.remove('hidden');
    });
}

/**
 * Player does not want to start a new game.
 * Returns player to previous screen with board and tally untouched.
 */
function resetNo () {
    let noButton = document.getElementById('no-button');
    noButton.addEventListener('click', function() {
        console.log('Player confirmed "no".');

        const warningMessage = document.getElementById('warning-message');
        warningMessage.classList.add('hidden');
    });
}

/**
 * Player confirms they want to start a new game.
 * Resets tally and board.
 */
function resetYes () {
    let yesButton = document.getElementById('yes-button');
    yesButton.addEventListener('click', function() {
        console.log('Player confirmed "yes". Resetting board and tally...');

        const boardSlots = document.getElementsByClassName('board-slot');
        for (const slot of boardSlots) {
            slot.classList.remove('X', 'O');
            console.log('Board has successfully reset.');
            // Reset Win Scores
            let xWins = parseInt(document.getElementById('p-x-wins').innerHTML);
            document.getElementById('p-x-wins').innerHTML = 0;
            let oWins = parseInt(document.getElementById('p-o-wins').innerHTML);
            document.getElementById('p-o-wins').innerHTML = 0;
            //Reset Loss Scores
            let xLoss = parseInt(document.getElementById('p-x-losses').innerHTML);
            document.getElementById('p-x-losses').innerHTML = 0;
            let oLoss = parseInt(document.getElementById('p-o-losses').innerHTML);
            document.getElementById('p-o-losses').innerHTML = 0;
            // Reset Draw Scores
            let xDraws = parseInt(document.getElementById('p-x-draws').innerHTML);
            document.getElementById('p-x-draws').innerHTML = 0;
            let oDraws = parseInt(document.getElementById('p-o-draws').innerHTML);
            document.getElementById('p-o-draws').innerHTML = 0;
        }
        const warningMessage = document.getElementById('warning-message');
        warningMessage.classList.add('hidden');
        console.log('Game reset successful.')

        currentPlayer = 'X';
    });
}