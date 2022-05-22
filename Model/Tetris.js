class Tetris {
    //ES6
    constructor() {
    }

}

function startGame() {
    const board = new Board();
    board.updateCurrentBoard()
    // board.draw()
    // board.drawLevel3()
    board.drawLevel4()
    // board.playGame()

    board.levelUp(board.score)
    // requestAnimationFrame(startGame)
    // board.levelUpV2(board.boardLand.length)
    $(window).on('keydown', (event) => {
        switch (event.keyCode) {
            case 37:
                if (board.levelUp(board.score) <= 2) {
                    board.moveLeft()
                    break
                }
                board.moveRight()
                break
            case 38:
                board.rotating()
                break
            case 39:
                if (board.levelUp(board.score) <= 2) {
                    board.moveRight()
                    break
                }
                board.moveLeft()
                break
            case 40:
                if (board.levelUp(board.score) == 3) {
                    board.speedMoveDownLevel3()
                    break
                } else if (board.levelUp(board.score) == 4) {
                    board.speedMoveDownLevel4()
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

// $("<audio></audio>").attr({
//     'src':'Audio/tetris-gameboy-01.mp3',
//     'autoplay':'autoplay'
// }).prop("volume", 0.2) .appendTo("body");

