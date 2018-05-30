class Blocks {
    constructor(game, numberOfBalls) {
        this.game = game
        this.blocks = []
        this.number = 0
        this.addBlock(numberOfBalls)
    }

    addBlock(numberOfBalls) {
        this.number++
        var block = new Block(this.game, numberOfBalls)
        this.blocks.push(block)
    }

    moveUp() {
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].moveUp()
        }
    }

    upToTop() {
        // log('length', this.blocks.length)
        for (var i = 0; i < this.blocks.length; i++) {
            // log(this.blocks[i].y)
            // log('block.alive', this.blocks[i].alive)
            if (this.blocks[i].hp > 0 && this.blocks[i].y <= 0) {
                return true
            }
        }
        return false
    }

    update() {
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].update()
        }
    }

    draw() {
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].draw()
        }
    }
}
