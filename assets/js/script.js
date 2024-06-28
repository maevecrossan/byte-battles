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

            }
        })
    } 

})

//Checks for winResult

//Show winner message

//Checks for lossResult

//Checks for drawResult

//Show draw message

//Next round (board reset)

//New game (tally & board reset)