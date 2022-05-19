class Tetris {
    //ES6
    constructor() {
    }

}

function startGame() {
    const board = new Board();
    board.updateCurrentBoard()
    board.draw()
    board.drawLevel3()
    // board.playGame()
    // board.playgameV2()

    board.levelUp(board.score)
    // requestAnimationFrame(startGame)
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
                if (board.levelUp(board.score) == 3) {
                    board.speedMoveDownLevel3()
                    break
                }
                board.speedMoveDown()
                break
            case 13:
                if (board.levelUp(board.score) == 1)
                    board.changeBlock()
                else
                    break
        }
    })
}

$(document).ready(startGame)

$('#re_game').click(function () {
    const board = new Board()
    board.restartGame()
})

