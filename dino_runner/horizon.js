class Horizon {
    constructor(game) {
        this.game = game

        this.width = 1200
        this.height = 12
        this.x = 0
        this.y = 127
        this.sourceX = 2
        this.sourceY = 54

        this.speed = 5
    }

    update() {
        this.x -= this.speed
        // log('ground.x', this.x)
        if (this.x == -this.width) {
            this.x = 0
        }
    }

    draw() {
        this.game.context.drawImage(
            this.game.images['sprite'],
            this.sourceX, this.sourceY,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
        )
        this.game.context.drawImage(
            this.game.images['sprite'],
            this.sourceX, this.sourceY,
            this.width, this.height,
            this.x + this.width, this.y,
            this.width, this.height
        )
    }
}
