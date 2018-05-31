class Ball {
    constructor(game, paddle) {
        this.game = game
        this.paddle = paddle
        this.image = this.game.images['ball']
        this.width = this.image.width
        this.height = this.image.height


        this.fired = false
        this.speedX = 5
        this.speedY = -5
        this.x = this.paddle.x + this.paddle.image.width / 2
        this.y = 322
        this.width = this.image.width
        this.height = this.image.height
    }

    fire() {
        this.fired = true
    }

    collidePaddle() {
        // log('paddle.y', this.paddle.y)
        // log('ball.y', this.y)
        if (!(this.paddle.x + this.paddle.width <= this.x ||
              this.x + this.width <= this.paddle.x)) {
            if (this.y + this.height >= this.paddle.y) {
                if (this.paddle.y <= this.y) {
                    // make the ball fall if it is below the paddle
                    this.speedY = Math.abs(this.speedY)
                } else {
                    this.speedY *= -1
                    this.y += this.speedY
                }
            }
        }
    }

    collideBlocks(blocks) {
        for (var i = 0; i < blocks.elements.length; i++) {
            let b = blocks.elements[i]
            let hp = blocks.hps[i]
            if (hp > 0) {
                if (rectIntersect(b[0], blocks.width, b[1], blocks.height, this.x, this.width, this.y, this.height)) {
                    blocks.hps[i]--
                    this.speedY *= -1
                    this.game.score += 10
                }
                if (blocks.hps[i] == 0) {
                    blocks.numberOfAlive--
                }
            }
        }
    }

    update() {
        if (this.fired) {
            this.x += this.speedX
            this.y += this.speedY
            if (this.x <= 0 || this.x + this.width >= this.game.canvas.width) {
                this.speedX *= -1
            }
            if (this.y <= 0) {
                this.speedY *= -1
            }
            if (this.y >= this.game.canvas.height) {
                // game over
                addScore(this.game.score)
                let s = new SceneEnd(this.game, this.game.score)
                this.game.replaceScene(s)
            }
            this.collidePaddle()
        } else {
            this.x = this.paddle.x + this.paddle.image.width / 2
        }
    }

    draw() {
        this.game.context.drawImage(this.image, this.x, this.y)
    }
}
