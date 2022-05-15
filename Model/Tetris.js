class Tetris {
    //ES6
    constructor() {
    }

}
$(document).ready(function() {
    const board = new Board();
    board.updateCurrentBoard()
    board.draw()
    board.playGame()
    $(window).on('keydown', (event) => {
        switch (event.keyCode) {
            case 37:
                break
            case 38:
                break
            case 39:
                break
            case 40:
                board.speedMoveDown()
                break
        }
    })
})

