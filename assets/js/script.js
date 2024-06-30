// Waits for the DOM to load before initailising game.
document.addEventListener("DOMContentLoaded", function() {
    // Selects all board slots (where X's and O's can be placed)
    const boardSlots = document.getElementsByClassName('board-slot');
    // Establishes first player when game loads
    let playerX ='x';
    let playerO = 'o';
    let currentPlayer = 'x'; // Sets X as initial player.

    // Add click event to each board slot
    for (const slot of boardSlots) {
        /**
         * Determines slot occupancy and determines next function.
         */
        slot.addEventListener('click', function occupiedCheck() {
            if (!slot.classList.contains('x') && !slot.classList.contains('o')) {
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
                    console.log(`Next player: ${currentPlayer}`); // Player logging for debugging.
                }
            } else {
                console.log("slot already occupied.");
            }
        });
    } 
    nextRound(); // Triggers the next round once button is clicked.
});


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
    if (currentPlayer === 'x') {
        let xWins = parseInt(document.getElementById('p-x-wins').innerHTML);
        document.getElementById('p-x-wins').innerHTML = ++xWins;
    } else if (currentPlayer === 'o') {
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
    const occupied = [...boardSlots].every(slot => slot.classList.contains('x') || slot.classList.contains('o'));
    console.log(`Draw Result: ${occupied}`);
    return occupied;
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
 * Adds a point to the both player tallys.
*/
function addDrawPoint() {
    if (drawResult = true) {
            let xDraws = parseInt(document.getElementById('p-x-draws').innerHTML);
            document.getElementById('p-x-draws').innerHTML = ++xDraws;

            let oDraws = parseInt(document.getElementById('p-o-wins').innerHTML);
            document.getElementById('p-o-draws').innerHTML = ++oDraws;
        }
    }


/** 
 * Adds a point to the respective player tally.
 * Runs in tandem with addWinPoint function,
 * so does not have lossResult function.
*/
function addLossPoint(currentPlayer) {
    if (currentPlayer === 'o') {
        let xLoss = parseInt(document.getElementById('p-x-losses').innerHTML);
        document.getElementById('p-x-losses').innerHTML = ++xLoss;

    } else if (currentPlayer === 'x') {
        let oLoss = parseInt(document.getElementById('p-o-losses').innerHTML);
        document.getElementById('p-o-losses').innerHTML = ++oLoss;
    }
}

/**
 * Triggers next round. 
 * Board reset only. 
 * Tally is kept.
 * Hides message.
 */
function nextRound() {
    let nextRoundButtons = document.getElementsByClassName('next-round-button');
    
    for (const button of nextRoundButtons) {
    
        button.addEventListener('click', function() {
            console.log('A new round has been started. Emptying slots...')
            const boardSlots = document.getElementsByClassName('board-slot');
            for (const slot of boardSlots) {
                slot.classList.remove('x', 'o');
            }
            
            const winMessage = document.getElementById('win-message');
            const drawMessage = document.getElementById('draw-message');
            
            winMessage.classList.add('hidden');
            drawMessage.classList.add('hidden');

            currentPlayer = 'x';
        });
    }
}

function resetYes () {

}

function resetNo () {

}

function newGame() {
    let newGameButton = document.getElementById('')
}