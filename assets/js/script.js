// Let DOM load before starting the game
// Add event listeners

document.addEventListener("DOMContentLoaded" , function() {
    // Connect inputs to DOM
    const board = document.getElementById('board');

    let playerX = 'X';
    let playerO = 'O';
    let currentPlayer = playerX;
    let boardSlots = document.getElementsByClassName('board-slot')
    for (const slot of boardSlots) {
        slot.addEventListener('click', slotClick);
    }
})

/**
 * Registers clicking events on game board slots.
 */
function slotClick(event) {
    const slot = event.target;
    slot.classList.add(currentPlayer);
    // place character
// check win
// check loss
// swap player
}


 