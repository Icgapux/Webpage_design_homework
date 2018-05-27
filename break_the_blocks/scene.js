class Scene {
    constructor(game) {
        this.game = game
        this.game.score = 0
        this.game.level = 0

        this.init()

        this.paddle = new Paddle(game)
        this.blocks = new Blocks(game, this.game.level)
        this.ball = new Ball(game, this.paddle)
    }

    init() {
        this.game.registerAction('a', () => {
            this.paddle.move(-1)
        })
        this.game.registerAction('d', () => {
            this.paddle.move(1)
        })
        this.game.registerAction('f', () => {
            this.ball.fire()
        })
    }

    update() {
        this.ball.update()
        this.ball.collideBlocks(this.blocks)
        this.blocks.update()
    }

    draw() {
        this.paddle.draw()
        this.blocks.draw()
        this.ball.draw()
        // draw score
        let context = this.game.context
        context.fillStyle = 'black'
        context.font = '15px consolas'
        context.fillText('Your score:' + this.game.score, 480, 20)
        context.fillText('level ' + (this.game.level + 1), 10, 20)
    }
}
