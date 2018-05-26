class Paddle {
    constructor(game) {
        this.game = game

        this.x = 150
        this.y = 330
        this.speed = 5
    }

    move(target) {
        this.x += this.speed * target
    }

    update() {

    }

    draw() {
        // log('draw paddle')
        this.game.context.drawImage(this.game.images['paddle'], this.x, this.y)
    }
}
