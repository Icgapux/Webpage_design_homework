class Scene {
    constructor(game) {
        this.game = game
        this.countScoreDelay = game.fps / 6
        this.nowDelay = this.countScoreDelay
        this.game.score = 0
        this.game.speed = 6

        this.player = new Player(game)
        this.horizon = new Horizon(game)
        this.cloud = new Cloud(game)
        this.obstacle = new Obstacle(game)

        this.init()
    }

    init() {
        this.game.registerAction(' ', () => {
            this.player.jump()
        })
    }

    update() {
        this.player.update()
        this.horizon.update()
        this.cloud.update()
        this.obstacle.update()
        if (this.player.collide(this.obstacle)) {
            addScore(this.game.score)
            let s = new SceneEnd(this.game, this.game.score)
            this.game.replaceScene(s)
        }
        this.nowDelay--
        if (this.nowDelay == 0) {
            this.game.score++
            this.nowDelay = this.countScoreDelay
        }
        // acceleration per 100 points
        if (this.score % 100 == 0) {
            this.speed += 0.5
        }
    }

    draw() {
        this.player.draw()
        this.horizon.draw()
        this.cloud.draw()
        this.obstacle.draw()
        var context = this.game.context
        context.fillStyle = 'black'
        context.font = '15px consolas'
        context.fillText('Your score:' + this.game.score, 470, 20)
    }
}
