class Blocks {
    constructor(game, level) {
        this.game = game
        this.image = this.game.images['block']

        this.level = level
        this.elements = []
        this.init()
    }

    init() {
        this.elements = levels[this.level]
    }

    update() {

    }

    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            let b = this.elements[i]
            this.game.context.drawImage(this.image, b[0], b[1])
        }
    }
}
