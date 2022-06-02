class Tetris {
  //ES6
  constructor() {
  }

}
function startGame() {
  const board = new Board();
  board.updateCurrentBoard();
  // board.displayShape()
  board.draw();
  board.playGame();
  // console.log(board.levelUp(board.score))
  board.levelUp(board.score);
  $(window).on("keydown", (event) => {
    switch (event.keyCode) {
      case 37:
        if (board.levelUp(board.score) == 4 || board.levelUp(board.score) == 6) {
          board.moveRight();
          break;
        }
        board.moveLeft();
        break;
      case 38:
        board.rotating();
        break;
      case 39:
        if (board.levelUp(board.score) == 4 || board.levelUp(board.score) == 6) {
          board.moveLeft();
          break;
        }
        board.moveRight();
        break;
      case 40:
        if (board.levelUp(board.score) == 4) {
          board.speedMoveDownLevel3();
          break;
        } else if (board.levelUp(board.score) == 5) {
          board.speedMoveDownLevel4();
          break;
        }
        board.speedMoveDown();
        break;
      case 13:
        if (board.levelUp(board.score) == 1) board.changeBlock();
        else break;
    }
  });
}

$(document).ready(startGame);
$("#re_game").click(function () {
  const board = new Board();
  board.restartGame();
});
  // $("#select-level").change(function () {
  //   const board = new Board();
  //   if ($(this).val() == 1) {
  //     alert("level 1");
  //     return 1
  //   }
  //   if ($(this).val() == 2) {
  //     alert("level 2");
  //     return 20
  //   }
  // });

$("#pause_game").click(function () {
  var gameBrightness = 10;
  var pause = confirm("Bạn tạm dừng game. Bấm Ok để tiếp tục");

  if (pause == false) {
    //Didn't click on OK
    var options = confirm(
      "Chọn Ok để restart game"
    );

    if (options == true) {
      //Clicked on OK
      ReDopause();
      return;
    } else {
      //Didn't click on OK
      brightness = Math.floor(Math.random() * 20);
      document.getElementById("brightness").innerHTML = brightness;
      ReDopause();
      return;
    }
  }
});
// $("<audio></audio>").attr({
//   'src':'Audio/tetris-gameboy-01.mp3',
//   'autoplay':'autoplay'
// }).prop("volume", 0.2) .appendTo("body");