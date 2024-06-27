// Let DOM load before starting the game
// Add event listeners

document.addEventListener("DOMContentLoaded" , function() {
    // Connect inputs to DOM

    const board = document.getElementById('board');
    
    let boardSlot = document.querySelectorAll('data-slot');
    
    boardSlot.addEventListener('click', slotClick, {once:true});

    let nextRound = document.getElementById('next-round');
    let newGame = document.getElementById('new-game');
}
)

/** 
 * Registers clicks on game board slots
 */

function slotClick(event) {
    console.log('clicked');
}