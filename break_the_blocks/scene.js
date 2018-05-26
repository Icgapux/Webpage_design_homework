class Scene {
    constructor(game) {
        this.game = game
        this.game.score = 0

        this.init()

        this.paddle = new Paddle(game)
        this.blocks = new Blocks(game, 2)
    }

    init() {
        this.game.registerAction('a', () => {
            this.paddle.move(-1)
        })
        this.game.registerAction('d', () => {
            this.paddle.move(1)
        })
    }

    update() {

    }

    draw() {
        this.paddle.draw()
        this.blocks.draw()
        // draw score
        var context = this.game.context
        context.fillStyle = 'black'
        context.font = '15px consolas'
        context.fillText('Your score:' + this.game.score, 470, 20)
    }
}
