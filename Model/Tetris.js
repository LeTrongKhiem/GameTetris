class Tetris {
    //ES6
    constructor() {
    }

}

function startGame() {
    const board = new Board();
    board.updateCurrentBoard()
    if (board.levelUp() == 1)
        board.draw()
    board.drawLevel3()
    board.playGame()
    // board.levelUp(board.score)
    // board.levelUpV2(board.boardLand.length)
    $(window).on('keydown', (event) => {
        switch (event.keyCode) {
            case 37:
                board.moveLeft()
                break
            case 38:
                board.rotating()
                break
            case 39:
                board.moveRight()
                break
            case 40:
                board.speedMoveDown()
                break
            case 13:
                if (board.levelUp() == 1)
                    board.changeBlock()
                break
        }
    })
}

$(document).ready(startGame)

$('#re_game').click(function () {
    const board = new Board()
    board.restartGame()
})

