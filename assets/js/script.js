// Waits for the DOM to load before initailising game.

document.addEventListener("DOMContentLoaded", function() {
    // Selects all board slots (where X's and O's can be placed)
    const boardSlots = document.getElementsByClassName('board-slot');
    // Establishes first player when game loads
    let playerX = 'x';
    let playerO = 'o';
    let currentPlayer = playerX; // Sets X as initial player.


    // Add click event to each board slot
    for (const slot of boardSlots) {
        
        // Checks if the box is occupied by an 'x' or 'o'
        slot.addEventListener('click', function occupiedCheck() {
            if (!slot.classList.contains('x') && !slot.classList.contains('o')) {
                // If unoccupied, add current player's character to the chosen slot.
                slot.classList.add(currentPlayer);

                if (winResult(currentPlayer)){
                    displayWinMessage(currentPlayer); // Display win message if combo was achieved.
                } else if (drawResult()) {
                    displayDrawMessage(); // Display draw message if no combo is achieved or the board is full.
                } else { // Player swap if neither win or draw
                    currentPlayer === playerX ? playerX : playerO;
                    console.log(`Next player:${currentPlayer}`); // Player logging for debugging.
                }
            }
        });
    } 
});

/**
 * Checks for win one of the winning combinations.
 */
function winResult(player) {
    const boardSlots = document.getElementsByClassName('board-slot'); // Selects all board slots
    const winningCombos = [ // Winning combinations (based on article form stack overflow)
        [0, 1, 2],[3, 4, 5],[6, 7, 8], // rows
        [0, 3, 6],[1, 4, 7],[2, 5, 8], // columns
        [0, 4, 8],[2, 4, 6]            // diagonals
    ];
    
    const result = winningCombos.some(combo => { // Checks for winning combos on the game board.
        const isWinningCombo = combo.every(index=> { //Checks if relevant indices/slots for a pattern are occupied by the current player.
            return boardSlots[index].classList.contains(player); // Checks for player characters in relevant indices/slots. 
        });
        console.log(`Checking combination ${combo} for ${player}: ${isWinningCombo}`); // Log pattern check. Checks for win for current player.
        return isWinningCombo; //Returns boolean value to confirm if a combo is found or not.
    })
    console.log(`${player} win status: ${result}`)
    return result; //Returns result of win check.
}

/**
 * Checks for a draw if no combo is found.
 */
function drawResult() {
    const boardSlots = document.getElementsByClassName('board-slot');
    // Check if all board slots are occupied. 
    for (const slot of boardSlots) {
        if (!slot.classList.contains('x') && !slot.classList.contains('o')) {
            return false; //If a slot is free, no draw.
        }
    }
}



/**
 * Displays hidden winner message.
 */
function displayWinMessage(player) {
    const winMessage = document.getElementById('win-message');
    winMessage.querySelector('[data-win-message] h3').textContent = `${player} Wins!`
}

//Checks for lossResult

/**
 * Displays hidden draw message.
 */
function displayDrawMessage() {
    const drawMessage = document.getElementById('draw-message');
}

//Next round (Board reset only. Tally is kept.)

//New game (Tally & board reset.)