class Paddle {
    constructor(game) {
        this.game = game
        this.image = this.game.images['paddle']

        this.x = 150
        this.y = 330
        this.speed = 5
    }

    move(target) {
        this.x += this.speed * target
        if (this.x < 0) {
            this.x = 0
        } else if (this.x + this.image.width > this.game.canvas.width) {
            this.x = this.game.canvas.width - this.image.width
        }
    }

    update() {

    }

    draw() {
        // log('draw paddle')
        this.game.context.drawImage(this.image, this.x, this.y)
    }
}
