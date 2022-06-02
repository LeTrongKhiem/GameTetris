class Board {
    //#region Constructor
    constructor() {
        this.boardWidth = 10;
        this.boardHeight = 23;
        this.boardCurrent = new Array(this.boardHeight)
            .fill(0)
            .map(() => new Array(this.boardWidth).fill(0)); //trang thai hien tai
        this.boardFalled = new Array(this.boardHeight)
            .fill(0)
            .map(() => new Array(this.boardWidth).fill(0)); //luu trang thai cac khoi da ha canh
        this.score = 0;
        //boardcurrent = boardFalled + currentTetromino
        this.canvas = document.getElementById("tetris_canvas");
        this.ctx = this.canvas.getContext("2d");
        this.gameLoad = null;
        this.end = false;
        this.currentBag = null;
        this.currentBlock = this.randomBlockV2();
        this.nextBlock = this.getNextBlock();
        //   this.levelUp(this.score) >= 2 && this.checkBoom() <= 3
        //     ? this.randomBlockLevel4()
        //     : this.randomBlock();
        this.level = 1;
        this.nextRandom = -1;

        this.displayBlock = document.querySelectorAll(".next-block div");
        this.displayIndex = 0;
        this.selectGame = document.getElementById("select-level").value
    }
    selectGameV() {
       if (this.selectGame == 1) {
           this.score = 1
           alert('level1')
       } else
       if (this.selectGame == 2) {
           this.score += 10
           alert('level2')
       }
       return this.score
    }
    //#endregion
    //use random 7bag
    mix(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    genBlock() {
        const newBlock = [
            new LShape(1, 4),
            new JShape(1, 4),
            new OShape(2, 4),
            new TShape(2, 4),
            new SShape(2, 4),
            new ZShape(2, 4),
            new IShape(0, 4),
        ];
        return this.mix(newBlock);
    }
    genBlockLevel4() {
        const newBlock = [
            new LShape(1, 4),
            new JShape(1, 4),
            new OShape(2, 4),
            new TShape(2, 4),
            new SShape(2, 4),
            new ZShape(2, 4),
            new IShape(0, 4),
            new Barrier1(0, 4),
            new Barrier3(1,4)
        ];
        return this.mix(newBlock);
    }


    getNextBlock() {
        return this.currentBag[0];
    }
    //#region ShowTetrisBlockNext
    displayShape() {
        const displayBlock = document.querySelectorAll(".next-block div");
        const displayIndex = 0;
        const displayW = 4;
        const showBlock = [
            [1, displayW + 1, displayW * 2 + 1, 10], //lTetromino
            [2, displayW + 2, 9, displayW * 2 + 2], //j
            [5, 6, displayW + 5, displayW + 6], //oTetromino
            [2, displayW + 1, displayW + 2, displayW + 3], //tTetromino
            [7, 6, 10, 9], //s
            [5, 6, 10, 11], //zTetromino
            [1, displayW + 1, displayW * 2 + 1, displayW * 3 + 1], //iTetromino
        ];
        //remove any trace of a tetromino form the entire grid
        displayBlock.forEach((square) => {
            square.classList.remove("block");
            square.style.backgroundColor = "";
        });
        showBlock[this.nextBlock.shape[0][0] - 1].forEach((index) => {
            displayBlock[displayIndex + index].classList.add("block");
            displayBlock[displayIndex + index].style.backgroundColor =
                this.changeColor(this.nextBlock.shape[0][0]);
        });
    }

    //#endregion
    randomBlock() {
        this.nextRandom = Math.floor(Math.random() * Math.floor(7));

        // this.nextRandom = 6;
        switch (this.nextRandom) {
            case 0:
                return new LShape(1, 4);
            case 1:
                return new JShape(1, 4);
            case 2:
                return new OShape(2, 4);
            case 3:
                return new TShape(2, 4);
            case 4:
                return new SShape(2, 4);
            case 5:
                return new ZShape(2, 4);
            case 6:
                return new IShape(0, 4);
            // case 7:
            //     return new Barrier1(2,4)
        }
    }

    randomBlockV2() {
        if (this.currentBag === null) {
            if (this.levelUp(this.score) >= 5) {
                this.currentBag = this.genBlockLevel4();
            }
            else {
                this.currentBag = this.genBlock();
            }

        }
        const block = this.currentBag.shift();
        if (this.currentBag.length === 0) {
            if (this.levelUp(this.score) >= 5) {
                this.currentBag = this.genBlockLevel4();
            }
            else {
                this.currentBag = this.genBlock();
            }
        }
        this.nextBlock = this.getNextBlock();
        return block;
    }

    randomBlockLevel4() {
        if (true) {

        }
    }

    //#region do mau cho cac block
    changeColor(block) {
        switch (block) {
            case 1:
                return LShape.color;
            case 2:
                return JShape.color;
            case 3:
                return OShape.color;
            case 4:
                return TShape.color;
            case 5:
                return SShape.color;
            case 6:
                return ZShape.color;
            case 7:
                return IShape.color;
            case 8:
                return Barrier1.color;
            case 9:
                return Barrier2.color;
            case 10:
                return Barrier3.color;
            case 11:
                return Barrier4.color;
        }
    }

    //#endregion
    playGame() {
        this.gameLoad = setInterval(() => {
            this.dropDown();
            this.updateCurrentBoard();
            this.draw();
            // console.log(this.levelUp(this.score))
            console.log(this.score);
            //level 2
            if (this.levelUp(this.score) <= 2) {
                clearInterval(this.gameLoad);
                this.gameLoad = setInterval(() => {
                    this.dropDown();
                    this.updateCurrentBoard();
                    this.draw();
                    this.displayShape();
                    console.log(this.levelUp(this.score));
                    //level 3
                    if (this.levelUp(this.score) == 3) {
                        clearInterval(this.gameLoad);
                        this.gameLoad = setInterval(() => {
                            this.dropDown();
                            this.updateCurrentBoard();
                            this.drawLevel3();
                            console.log(this.levelUp(this.score));
                            if (this.levelUp(this.score) == 4) {
                                clearInterval(this.gameLoad);
                                this.gameLoad = setInterval(() => {
                                    this.dropDown();
                                    this.updateCurrentBoard();
                                    this.drawLevel4();
                                    console.log(this.levelUp(this.score));
                                    if (this.levelUp(this.score) == 5) {
                                        clearInterval(this.gameLoad);
                                        this.gameLoad = setInterval(() => {
                                            this.dropDown();
                                            this.updateCurrentBoard();
                                            this.drawLevel4();
                                            console.log(this.levelUp(this.score));
                                            if (this.levelUp(this.score) == 6) {
                                                clearInterval(this.gameLoad);
                                                this.gameLoad = setInterval(() => {
                                                    this.dropDown();
                                                    this.updateCurrentBoard();
                                                    this.drawLevel4();
                                                    this.canvas.style = 'transform: rotate(90deg)'
                                                    console.log(this.levelUp(this.score));
                                                }, 400);
                                            }
                                        }, 600);
                                    }
                                }, 700);
                            }
                        }, 800);
                    }
                }, 850);
            }
        }, 1000);
    }

    levelUp(score) {
        if (score < 10) {
            this.level = 1;
        } else if (this.score >= 10 && this.score <= 25) {
            this.level = 2;
        } else if (this.score > 25 && this.score <= 40) {
            this.level = 3;
        } else if (this.score > 40 && this.score <= 60) {
            this.level = 4;
        } else if (this.score > 60 && this.score <= 80) {
            this.level = 5;
        } else if (this.score > 80) {
            this.level = 6;
        }
        return this.level;
        console.log(this.score);
    }

    //#region Draw
    draw(blockSize = 32, padding = 4) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //xoa trang canvas sau moi khi chay draw
        this.ctx.lineWidth = 1;
        this.ctx.lineHeight = 3;
        this.ctx.rect(
            padding + 120,
            padding + 30,
            blockSize * this.boardWidth + (padding * this.boardWidth + 5),
            blockSize * this.boardHeight - 102 + (padding * this.boardHeight - 3 + 1)
        );

        //
        this.ctx.stroke();
        /* Lặp qua các phần tử của mảng board và vẽ các block tại đúng vị trí */
        for (let i = 3; i < this.boardHeight; i++) {
            //bo 3 o dau
            for (let j = 0; j < this.boardWidth; j++) {
                if (this.boardCurrent[i][j] !== 0) {
                    this.ctx.fillStyle = this.changeColor(this.boardCurrent[i][j]);
                } else {
                    this.ctx.fillStyle = "rgb(218,210,210)";
                }
                this.ctx.fillRect(
                    padding * 2 + j * (blockSize + padding) + 120,
                    padding * 2 + (i - 3) * (blockSize + padding) + 30,
                    blockSize,
                    blockSize
                );
                //tinh toan vi tri o nho
            }
        }
        this.ctx.fillStyle = "rgb(0,0,0)";
        this.ctx.font = "28px serif";
        this.ctx.fontWeight = "600";
        this.ctx.fillText("Tiếp theo", 500, 80);
        this.ctx.fillText("Điểm số", 500, 300);
        this.ctx.fillText("Level", 500, 400);
        this.ctx.fillText(this.score.toString(), 500, 350);
        this.ctx.fillText(this.levelUp(this.score).toString(), 500, 450);
    }

    //#endregion
    drawLevel2(blockSize = 32, padding = 4) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //xoa trang canvas sau moi khi chay draw
        this.ctx.lineWidth = 1;
        this.ctx.lineHeight = 3;
        this.ctx.rect(
            padding + 120,
            padding + 30,
            blockSize * this.boardWidth + (padding * this.boardWidth + 5),
            blockSize * this.boardHeight - 280 + (padding * this.boardHeight - 3 + 1)
        );

        //
        this.ctx.stroke();
        /* Lặp qua các phần tử của mảng board và vẽ các block tại đúng vị trí */
        for (let i = 8; i < this.boardHeight; i++) {
            //bo 3 o dau
            for (let j = 0; j < this.boardWidth; j++) {
                if (this.boardCurrent[i][j] !== 0) {
                    this.ctx.fillStyle = this.changeColor(this.boardCurrent[i][j]);
                } else {
                    this.ctx.fillStyle = "rgb(218,210,210)";
                }
                this.ctx.fillRect(
                    padding * 2 + j * (blockSize + padding) + 120,
                    padding * 2 + (i - 3) * (blockSize + padding) - 150,
                    blockSize,
                    blockSize
                );
                //tinh toan vi tri o nho
            }
        }
        this.ctx.fillStyle = "rgb(0,0,0)";
        this.ctx.font = "28px serif";
        this.ctx.fontWeight = "600";
        this.ctx.fillText("Tiếp theo", 500, 80);
        this.ctx.fillText("Điểm số", 500, 300);
        this.ctx.fillText("Level", 500, 400);
        this.ctx.fillText(this.score.toString(), 500, 350);
        this.ctx.fillText(this.levelUp(this.score).toString(), 500, 450);
        // this.ctx.fillText(this.levelUpV2(this.boardCurrent.length).toString(), 500, 450)
    }

    drawLevel3(blockSize = 32, padding = 4) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //xoa trang canvas sau moi khi chay draw
        this.ctx.lineWidth = 1;
        this.ctx.lineHeight = 3;
        this.ctx.rect(
            padding + 120,
            padding + 30,
            blockSize * this.boardWidth + (padding * this.boardWidth + 5),
            blockSize * this.boardHeight - 102 + (padding * this.boardHeight - 3 + 1)
        );

        this.ctx.stroke();
        /* Lặp qua các phần tử của mảng board và vẽ các block tại đúng vị trí */
        for (let i = 3; i < this.boardHeight; i++) {
            //bo 3 o dau
            for (let j = 0; j < this.boardWidth; j++) {
                if (this.boardCurrent[i][j] !== 0) {
                    this.ctx.fillStyle = this.changeColor(this.boardCurrent[i][j]);
                } else {
                    this.ctx.fillStyle = "rgb(255,255,255)";
                }
                this.ctx.fillRect(
                    padding * 2 + j * (blockSize + padding) + 120,
                    padding * 2 + (i - 3) * (blockSize + padding) + 30,
                    blockSize,
                    blockSize
                );
                //tinh toan vi tri o nho
            }
        }
        this.ctx.fillStyle = "rgb(0,0,0)";
        this.ctx.font = "28px serif";
        this.ctx.fontWeight = "600";
        this.ctx.fillText("Tiếp theo", 500, 80);
        this.ctx.fillText("Điểm số", 500, 300);
        this.ctx.fillText("Level", 500, 400);
        this.ctx.fillText(this.score.toString(), 500, 350);
        this.ctx.fillText(this.levelUp(this.score).toString(), 500, 450);
        // this.ctx.fillText(this.levelUpV2(this.boardCurrent.length).toString(), 500, 450)
    }

    drawLevel4(blockSize = 32, padding = 4) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //xoa trang canvas sau moi khi chay draw
        this.ctx.lineWidth = 1;
        this.ctx.lineHeight = 3;
        this.ctx.rect(
            padding + 120,
            padding + 30,
            blockSize * this.boardWidth + (padding * this.boardWidth + 5),
            blockSize * this.boardHeight - 102 + (padding * this.boardHeight - 3 + 1)
        );

        this.ctx.stroke();
        // this.ctx.rect(200, 400, blockSize + 100, blockSize + 100);
        /* Lặp qua các phần tử của mảng board và vẽ các block tại đúng vị trí */
        for (let i = 3; i < this.boardHeight; i++) {
            //bo 3 o dau
            for (let j = 0; j < this.boardWidth; j++) {
                if (this.boardCurrent[i][j] !== 0) {
                    this.ctx.fillStyle = this.changeColor(this.boardCurrent[i][j]);
                } else {
                    this.ctx.fillStyle = "rgb(255,255,255)";
                    // this.ctx.fillRect(200, 60, blockSize, blockSize).fillStyle = 'rgb(85,154,113)'
                }
                this.ctx.fillRect(
                    padding * 2 + j * (blockSize + padding) + 120,
                    padding * 2 + (i - 3) * (blockSize + padding) + 30,
                    blockSize,
                    blockSize
                );

                //tinh toan vi tri o nho
            }
        }
        this.ctx.fillStyle = "rgb(0,0,0)";
        this.ctx.font = "28px serif";
        this.ctx.fontWeight = "600";
        this.ctx.fillText("Tiếp theo", 500, 80);
        this.ctx.fillText("Điểm số", 500, 300);
        this.ctx.fillText("Level", 500, 400);
        this.ctx.fillText(this.score.toString(), 500, 350);
        this.ctx.fillText(this.levelUp(this.score).toString(), 500, 450);
        // this.ctx.fillText(this.levelUpV2(this.boardCurrent.length).toString(), 500, 450)
    }
    drawLevel6(blockSize = 32, padding = 4) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //xoa trang canvas sau moi khi chay draw
        this.ctx.lineWidth = 1;
        this.ctx.lineHeight = 3;
        this.ctx.rect(
            padding + 120,
            padding + 30,
            blockSize * this.boardWidth + (padding * this.boardWidth + 5),
            blockSize * this.boardHeight - 102 + (padding * this.boardHeight - 3 + 1)
        );

        this.ctx.stroke();
        // this.ctx.rect(200, 400, blockSize + 100, blockSize + 100);
        /* Lặp qua các phần tử của mảng board và vẽ các block tại đúng vị trí */
        for (let i = 3; i < this.boardHeight; i++) {
            //bo 3 o dau
            for (let j = 0; j < this.boardWidth; j++) {
                if (this.boardCurrent[i][j] !== 0) {
                    this.ctx.fillStyle = this.changeColor(this.boardCurrent[i][j]);
                } else {
                    this.ctx.fillStyle = "rgb(255,255,255)";
                    // this.ctx.fillRect(200, 60, blockSize, blockSize).fillStyle = 'rgb(85,154,113)'
                }
                this.ctx.fillRect(
                    padding * 2 + j * (blockSize + padding) + 120,
                    padding * 2 + (i - 3) * (blockSize + padding) + 30,
                    blockSize,
                    blockSize
                );

                //tinh toan vi tri o nho
            }
        }
        this.ctx.fillStyle = "rgb(0,0,0)";
        this.ctx.font = "28px serif";
        this.ctx.fontWeight = "600";
        this.ctx.fillText("Tiếp theo", 500, 80);
        this.ctx.fillText("Điểm số", 500, 300);
        this.ctx.fillText("Level", 500, 400);
        this.ctx.fillText(this.score.toString(), 500, 350);
        this.ctx.fillText(this.levelUp(this.score).toString(), 500, 450);
        // this.ctx.fillText(this.levelUpV2(this.boardCurrent.length).toString(), 500, 450)
    }
    //#region restartGame
    restartGame() {
        clearInterval(this.playGame());
        location.reload();
        this.levelUp() === 1;
    }

    //#endregion
    //#region progress
    dropDown() {
        // this.currentBlock.fall()
        let nextBlock = new this.currentBlock.constructor(
            this.currentBlock.row + 1,
            this.currentBlock.col,
            this.currentBlock.angle
        );
        if (!this.checkBottom(nextBlock) && !this.checkLandBlock(nextBlock)) {
            this.currentBlock.fall();
        } else {
            this.mergeCurrentBlock();
            const rows = this.inMatrixRow();
            this.deleteRow(rows);
            this.score += this.totalScore(rows.length);
            // this.score = this.selectGameV()
            if (this.endGame()) {
                clearInterval(this.gameLoad);
                this.end = true;
                // alert("Game Over")
                this.restartGame();
            }
            this.currentBlock = this.randomBlockV2();
            // this.levelUp(this.score) >= 2
            //   ? this.randomBlockLevel4()
            //   : this.randomBlock();
            // alert(this.checkBoom())
        }
    }

    //#endregion
    //boom delete
    checkBoom() {
        var count = 0;
        this.boardFalled.forEach((row, index) => {
            if (row.every((tile) => tile > 0)) {
                count++;
                // return tile.count()
                return 3;
            }
        });
        // return 3
    }

    //kt duong bien co vuot qua game hay chua
    checkBottom(block) {
        if (block.row + block.height > this.boardHeight) {
            return true;
        } else {
            return false;
        }
    }

    //kt duong biên voi block da roi xuong
    checkLandBlock(block) {
        for (let i = 0; i < block.height; i++) {
            for (let j = 0; j < block.width; j++) {
                if (
                    block.shape[i][j] > 0 &&
                    this.boardFalled[block.row + i][block.col + j] > 0
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    //gan block vao nhung o da ha canh
    mergeCurrentBlock() {
        for (let i = 0; i < this.currentBlock.height; i++) {
            for (let j = 0; j < this.currentBlock.width; j++) {
                if (this.currentBlock.shape[i][j] > 0) {
                    this.boardFalled[this.currentBlock.row + i][this.currentBlock.col + j] =
                        this.currentBlock.shape[i][j];
                }
            }
        }
    }

    //xoa hang co the clear
    deleteRow(rows) {
        for (let i = this.boardFalled.length - 1; i >= 0; i--) {
            for (let j = 0; j < rows.length; j++) {
                if (rows[j] === i) {
                    this.boardFalled.splice(rows[j], 1);
                }
            }
        }
        for (let i = 0; i < rows.length; i++) {
            this.boardFalled.unshift(new Array(this.boardWidth).fill(0));
        }
    }

    speedMoveDown() {
        if (this.end) return;
        this.dropDown();
        this.updateCurrentBoard();
        this.draw();
    }

    //speed move level 3
    speedMoveDownLevel3() {
        if (this.end) return;
        this.dropDown();
        this.updateCurrentBoard();
        this.drawLevel3();
    }

    speedMoveDownLevel4() {
        if (this.end) return;
        this.dropDown();
        this.updateCurrentBoard();
        this.drawLevel4();
    }

    //xu li sang trai phai
    //trai
    checkLeft(block) {
        if (block.col < 0) {
            return true;
        }
        return false;
    }

    checkRight(block) {
        if (block.col + block.width > this.boardWidth) {
            return true;
        }
        return false;
    }

    //di chuyen khoi
    moveLeft() {
        if (this.end) return;
        const blockMove = new this.currentBlock.constructor(
            this.currentBlock.row,
            this.currentBlock.col - 1,
            this.currentBlock.angle
        );
        if (!this.checkLeft(blockMove) && !this.checkLandBlock(blockMove)) {
            this.currentBlock.col -= 1;
            this.updateCurrentBoard();
            this.draw();
        }
    }

    moveRight() {
        if (this.end) return;
        const blockMove = new this.currentBlock.constructor(
            this.currentBlock.row,
            this.currentBlock.col + 1,
            this.currentBlock.angle
        );
        if (!this.checkRight(blockMove) && !this.checkLandBlock(blockMove)) {
            this.currentBlock.col += 1;
            this.updateCurrentBoard();
            this.draw();
        }
    }

    moveLeft3() {
        if (this.end) return;
        const blockMove = new this.currentBlock.constructor(
            this.currentBlock.row,
            this.currentBlock.col - 1,
            this.currentBlock.angle
        );
        if (!this.checkLeft(blockMove) && !this.checkLandBlock(blockMove)) {
            this.currentBlock.col -= 1;
            this.updateCurrentBoard();
            this.drawLevel3();
        }
    }

    moveRight3() {
        if (this.end) return;
        const blockMove = new this.currentBlock.constructor(
            this.currentBlock.row,
            this.currentBlock.col + 1,
            this.currentBlock.angle
        );
        if (!this.checkRight(blockMove) && !this.checkLandBlock(blockMove)) {
            this.currentBlock.col += 1;
            this.updateCurrentBoard();
            this.drawLevel3();
        }
    }

    //xoay block
    rotating() {
        if (this.end) return;
        const blockMove = new this.currentBlock.constructor(
            this.currentBlock.row + 1,
            this.currentBlock.col,
            this.currentBlock.angle
        );
        blockMove.rotate();
        if (
            !this.checkRight(blockMove) &&
            !this.checkLandBlock(blockMove) &&
            !this.checkBottom(blockMove)
        ) {
            this.currentBlock.rotate();
            this.updateCurrentBoard();
            this.draw();
        }
    }

    changeBlock() {
        if (this.end) return;
        this.currentBlock = this.randomBlock();
    }

    updateCurrentBoard() {
        for (let i = 0; i < this.boardHeight; i++) {
            for (let j = 0; j < this.boardWidth; j++) {
                this.boardCurrent[i][j] = this.boardFalled[i][j];
            }
        }

        for (let i = 0; i < this.currentBlock.height; i++) {
            for (let j = 0; j < this.currentBlock.width; j++) {
                if (this.currentBlock.shape[i][j] > 0) {
                    this.boardCurrent[this.currentBlock.row + i][
                    this.currentBlock.col + j
                        ] = this.currentBlock.shape[i][j];
                }
            }
        }
    }

    //tim va xóa trong cung ma tran
    inMatrixRow() {
        const listClear = [];
        this.boardFalled.forEach((row, index) => {
            if (row.every((tile) => tile > 0 && tile <= 7)) {
                listClear.push(index);
            }
        });
        return listClear;
    }

    //tinh diem
    totalScore(rows) {
        return (rows * (rows + 1)) / 2;
    }

    //check end game
    endGame() {
        for (let i = 0; i < this.boardWidth; i++) {
            if (this.boardFalled[2][i] > 0) {
                return true;
            }
        }
        return false;
    }
}
