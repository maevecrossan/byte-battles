// Waits for the DOM to load before initailising game.

document.addEventListener("DOMContentLoaded" , function() {
    // Selects all board slots (where X's and O's can be placed)
    const boardSlots = document.getElementsByClassName('board-slot')
    // Establishes first player when game loads
    let currentPlayer = 'x';
    // Add click event to each board slot
    for (const slot of boardSlots) {


        // checks if box is occupied by an 'x' or 'o'
        slot.addEventListener('click', function occupiedCheck() {
            if (!slot.classList.contains('x') && !slot.classList.contains('o')) {
                // if unoccupied, add current player's 
                // character to the chosen slot.
                slot.classList.add(currentPlayer);

                if (winResult(currentPlayer)){
                    displayWinMessage(currentPlayer);
                } else if (drawResult()) {
                    displayDrawMessage();
                } else {
                    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
                }
            }
        })
    } 

})

/**
 * Checks for win one of the winning combinations.
 */
function winResult(player) {
    // Winning combinations (sourced form stack overflow)
    const winningCombos = [
        [1, 2, 3],[4, 5, 6],[7, 8, 9], // rows
        [1, 4, 7],[2, 5, 8],[3, 6, 9], // columns
        [1, 5, 9],[3, 5, 7]            // diagonals
    ];
    
    const result = winningCombos.some(combo => { // checks for winning combos on the game board.
        const isWinningCombo = combo.every(index=> { //checks if relevant indeces/slots for a pattern are occupied by the current player.
            return boardSlots[index].classList.contains(player); //checks for player characters in relevant indeces/slots. 
        });
        console.log(`Checking combination ${combo} for ${player}: ${isWinningCombo}`); // log pattern check. Checks for win for current player.
        return isWinningPattern; //stops function. Returns boolean value to confirm if a combo is found or not.
    }) // 
}

/**
 * Displays hidden winner message.
 */
function displayWinMessage() {

}

//Checks for lossResult

/**
 * Checks for a draw result.
 */
function displayDrawMessage() {

}

//Show draw message

//Next round (board reset)

//New game (tally & board reset)