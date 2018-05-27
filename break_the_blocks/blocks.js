class Blocks {
    constructor(game, level) {
        this.game = game
        this.image = this.game.images['block']
        this.width = this.image.width
        this.height = this.image.height

        this.level = level
        this.elements = []
        this.hps = []
        this.init()
    }

    init() {
        this.elements = levels[this.level]
        this.hps = BlockHpOfLevels[this.level].slice()
        this.numberOfAlive = this.elements.length
    }

    update() {
        if (this.numberOfAlive == 0) {
            this.level++
            this.game.level++
            this.init()
        }
    }

    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            let b = this.elements[i]
            if (this.hps[i]) {
                this.game.context.drawImage(this.image, b[0], b[1])
            }
        }
    }
}
