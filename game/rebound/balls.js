class Balls {
    constructor(game, angle) {
        this.game = game
        this.balls = []
        this.number = 0
        this.nextTurnNumber = 0
        this.intervalBetweenBalls = 20
        this.initAngle = angle
        this.addBall()
        this.nextTurnNumber = this.number
        this.initNotFired()
    }

    initNotFired() {
        while (this.number < this.nextTurnNumber) {
            // this.number++
            log('number', this.number)
            log('next number', this.nextTurnNumber)
            this.addBall()
        }
        // this.number = this.numberOfDied
        this.numberOfFired = 0
        this.numberOfDied = 0
        this.fired = false
        this.countTime = 20
    }

    addBall() {
        this.number++
        // this.nextTurnNumber++
        var ball = new Ball(this.game, this.initAngle)
        this.balls.push(ball)
    }

    addFiredBall() {
        this.balls[this.numberOfFired].init(this.initAngle)
        this.numberOfFired++
    }

    fire() {
        this.fired = true
    }

    fireFinished() {
        return this.numberOfFired == this.number
    }

    update() {
        if (!this.fireFinished()) {
            // log(this.countTime)
            if (this.countTime == this.intervalBetweenBalls) {
                this.countTime = 0
                this.addFiredBall()
            }
            this.countTime++
        }
        for (var i = 0; i < this.numberOfFired; i++) {
            let ball = this.balls[i]
            if (ball.alive) {
                ball.update()
                if (!ball.alive) {
                    this.numberOfDied++
                }
            }
        }
    }

    draw() {
        for (var i = 0; i < this.numberOfFired; i++) {
            let ball = this.balls[i]
            if (ball.alive) {
                this.game.drawImage(ball.image)
            }
        }
    }
}
