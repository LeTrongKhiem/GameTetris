class Shapes {
    constructor(row, col, angle = 0) {//angle = 0, 1, 2, 3 tuong ung 0, 90, 180, 270
        if (this.constructor === Shapes) {
            throw new Error('This is a abstract class')
        }
        this.row = row
        this.col = col
        this.angle = angle
    }
    get shape() {
        return this.constructor.shapes[this.angle]
    }
    get width() {
        return this.shape[0].length
    }
    get height() {
        return this.shape.length
    }
    fall() {//di chuyen xuong
        this.row += 1
    }
    rotate() {//xoay
        if (this.angle < 3) {
            this.angle += 1
        } else {
            this.angle = 0
        }
    }
    move(direction) {
        if (direction === 'left') {
            this.col -= 1
        } else if (direction === 'right') {
            this.col += 1
        }
    }
}