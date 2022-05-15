
class Board {
    constructor() {
        this.boardWidth = 10;
        this.boardHeight = 23;
        this.boardCurrent = new Array(this.boardHeight).fill(0).map(() => new Array((this.boardWidth)).fill(0));//trang thai hien tai
        this.boardLand = new Array(this.boardHeight).fill(0).map(() => new Array((this.boardWidth)).fill(0));//luu trang thai cac khoi da ha canh
        this.score = 0;
        //boardcurrent = boardland + currentTetromino
        this.canvas = document.getElementById('tetris_canvas')
        this.ctx = this.canvas.getContext('2d');

        this.currentBlock = this.randomBlock()

    }
    //lay context cua canvas

    draw (blockSize = 32, padding = 4) {
        this.ctx.clearRect(0, 0 , this.canvas.width, this.canvas.height);//xoa trang canvas sau moi khi chay draw
        this.ctx.lineWidth = 1;
        this.ctx.lineHeight = 3;
        this.ctx.rect(padding + 120,  padding + 30, blockSize * this.boardWidth + (padding * this.boardWidth + 5), (blockSize * this.boardHeight - 102) + (padding * this.boardHeight - 3 + 1));

        //
        this.ctx.stroke();
        /* Lặp qua các phần tử của mảng board và vẽ các block tại đúng vị trí */
        for (let i = 3; i < this.boardHeight; i++) {//bo 3 o dau
            for (let j = 0; j < this.boardWidth; j++) {
                if (this.boardCurrent[i][j] !== 0) {
                    this.ctx.fillStyle = 'rgb(0,0,0)'
                } else {
                    this.ctx.fillStyle = 'rgb(218,210,210)'
                }
                this.ctx.fillRect(padding * 2 + j * (blockSize + padding) + 120,
                padding * 2 + (i - 3) * (blockSize + padding) + 30, blockSize, blockSize)
                //tinh toan vi tri o nho
            }
        }
        this.ctx.fillStyle = 'rgb(0,0,0)'
        this.ctx.font = '28px serif'
        this.ctx.fontWeight = '600'
        this.ctx.fillText('Tiếp theo', 500, 80)
        this.ctx.fillText('Điểm số', 500, 300)
        this.ctx.fillText(this.score.toString(), 500, 350)
    }
    playGame() {
        setInterval(() => {
            this.dropDown()
            this.updateCurrentBoard()
            this.draw()
        }, 800)
    }
    dropDown() {
        // this.currentBlock.fall()
        let nextBlock = new this.currentBlock.constructor(this.currentBlock.row + 1, this.currentBlock.col, this.currentBlock.angle)
        if (!this.checkBottom(nextBlock) && !this.checkLandBlock(nextBlock)) {
            this.currentBlock.fall()
        } else {
            this.mergeCurrentBlock()
            this.currentBlock = this.randomBlock()
        }
    }
    //kt duong bien co vuot qua game hay chua
    checkBottom(block) {
        if (block.row + block.height > this.boardHeight) {
            return true
        } else {
            return false
        }
    }
    //kt duong biên voi block da roi xuong
    checkLandBlock(block) {
        for (let i = 0; i < block.height; i++) {
            for (let j = 0; j < block.width; j++) {
                if (block.shape[i][j] > 0 && this.boardLand[block.row + i][block.col + j] > 0) {
                    return true
                }
            }
        }
        return false
    }
    //gan block vao nhung o da ha canh
    mergeCurrentBlock() {
        for (let i = 0; i < this.currentBlock.height; i++) {
            for (let j = 0; j < this.currentBlock.width; j++) {
                if (this.currentBlock.shape[i][j] > 0) {
                    this.boardLand[this.currentBlock.row + i][this.currentBlock.col + j] = this.currentBlock.shape[i][j]
                }
            }
        }
    }
    speedMoveDown() {
        this.dropDown()
        this.updateCurrentBoard()
        this.draw()
    }

    randomBlock() {
        const randomNumber = Math.floor(Math.random() * Math.floor(7))
        switch (randomNumber) {
            case 0:
                return new LShape(1, 4)
            case 1:
                return new JShape(1, 4)
            case 2:
                return new OShape(2, 4)
            case 3:
                return new TShape(2, 4)
            case 4:
                return new SShape(2, 4)
            case 5:
                return new ZShape(2, 4)
            case 6:
                return new IShape(0, 4)
        }
    }
    updateCurrentBoard() {
        for (let i = 0; i < this.boardHeight; i++) {
            for (let j = 0; j < this.boardWidth; j++) {
                this.boardCurrent[i][j] = this.boardLand[i][j]
            }
        }

        for (let i = 0; i < this.currentBlock.height; i++) {
            for (let j = 0; j < this.currentBlock.width; j++) {
                if (this.currentBlock.shape[i][j] > 0) {
                    this.boardCurrent[this.currentBlock.row + i][this.currentBlock.col + j] = this.currentBlock.shape[i][j]
                }
            }
        }
    }
    //

}