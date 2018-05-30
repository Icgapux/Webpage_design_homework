class Scene {
    constructor(game) {
        this.game = game
        this.game.score = 0
        this.angle = Math.PI * 1.5
        this.angleStep = Math.PI * 0.005
        this.balls = new Balls(game, this.angle)
        this.blocks = new Blocks(game, 1)

        game.registerAction('f', () => {
            if (!this.balls.fired) {
                this.balls.fire()
            }
        })

        game.registerAction('a', () => {
            if (!this.balls.fired && this.angle - this.angleStep > Math.PI * 1.1) {
                this.angle -= this.angleStep
                this.balls.initAngle = this.angle
            }
        })
        game.registerAction('d', () => {
            if (!this.balls.fired && this.angle + this.angleStep < Math.PI * 1.9) {
                this.angle += this.angleStep
                this.balls.initAngle = this.angle
            }
        })
    }

    update() {
        // log(this.blocks.number)
        if (this.balls.fired) {
            this.balls.update()
            if (this.balls.numberOfDied == this.balls.number) {
                this.blocks.moveUp()
                this.blocks.addBlock(this.balls.number)
                this.balls.initNotFired()
            }
        }

        if (this.blocks.upToTop()) {
            var end = new SceneEnd(this.game, this.game.score)
            this.game.replaceScene(end)
        }

        // TODO: collide testing
        let addedBall = 0
        for (var j = 0; j < this.blocks.blocks.length; j++) {
            var block = this.blocks.blocks[j]
            if (block.hp <= 0) {
                continue
            }
            for (var i = 0; i < this.balls.numberOfFired; i++) {
                var ball = this.balls.balls[i]
                if (ball.alive) {
                    addedBall += ball.collide(block)
                }
            }
        }
        this.balls.nextTurnNumber += addedBall
    }

    draw() {
        // log('angle', this.angle)
        if (!this.balls.fired) {
            this.drawTarget()
        }
        this.balls.draw()
        this.blocks.draw()
        this.game.context.font = '25px consolas'
        this.game.context.fillStyle = 'black'
        this.game.context.fillText('Your score: ' + this.game.score, 20, 50)
    }

    drawTarget() {
        let numOfDots = 10
        let x = this.game.canvas.width / 2
        let y = 10
        let r = 3
        for (let i = 0; i < numOfDots; i++) {
            [x, y] = moveByTarget(x, y, r * 4, this.angle)
            this.game.drawCircle(x, y, r)
        }
    }
}
