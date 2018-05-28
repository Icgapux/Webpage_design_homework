class Ball {
    constructor(game) {
        this.game = game
        this.image = game.imageByName('ball')
        this.alive = false
        this.upGravity = 0.4
        this.downGravity = 0.08
        this.init()
    }

    init(angle) {
        this.image.x = this.game.canvas.width / 2
        this.image.y = 10
        this.alive = true
        this.speed = Math.sqrt(2) * 8
        this.angle = angle || Math.PI * 1.5
        this.speedX = this.speed * Math.cos(this.angle)
        this.speedY = -this.speed * Math.sin(this.angle)
    }

    kill() {
        this.alive = false
    }

    collide(block) {
        // log('block', block)

        let circle = {
            radius: this.image.w / 2,
            center: {
                x: this.image.x + this.image.w / 2,
                y: this.image.y + this.image.h / 2,
            },
        }
        // log('width', this.image.width)
        // log('circle', circle)

        if (block.type != 2) {
            for (let i = 1; i < block.offsetXs.length; i++) {
                let line = {
                    p1: {
                        x: block.offsetXs[i] + block.x,
                        y: block.offsetYs[i] + block.y,
                    },
                    p2: {
                        x: block.offsetXs[i - 1] + block.x,
                        y: block.offsetYs[i - 1] + block.y,
                    },
                }
                // log('line', line)
                // log('circle', circle)
                if (inteceptCircleLineSeg(circle, line)) {
                    // log('collide')
                    let x = line.p1.x - line.p2.x
                    let y = line.p1.y - line.p2.y
                    let angleOfLine = Math.atan2(-y, x)
                    this.respond(angleOfLine)
                    block.kill()
                }
            }
        } else {
            let x1 = this.image.x + this.image.w / 2
            let x2 = block.x + block.size / 2
            let y1 = this.image.y + this.image.h / 2
            let y2 = block.y + block.size / 2
            let d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
            if (d <= this.image.w / 2 + block.size / 2) {
                let x = x1 - x2
                let y = y1 - y2
                let angleOfConnection = Math.atan2(-y, x)
                let angleOfLine = angleOfConnection - Math.PI / 2
                this.respond(angleOfLine)
                block.kill()
            }
        }
    }

    respond(angleOfLine) {
        this.game.score++
        if (Math.abs(angleOfLine) >= Math.PI / 2) {
            if (angleOfLine > 0) {
                angleOfLine -= Math.PI
            } else {
                angleOfLine += Math.PI
            }
        }

        log('angle before', this.angle / Math.PI * 180)
        log('angle of line', angleOfLine / Math.PI * 180)
        this.angle = Math.PI * 2 - this.angle + angleOfLine * 2
        if (this.angle > Math.PI * 2) {
            this.angle -= Math.PI * 2
        } else if (this.angle < 0) {
            this.angle += Math.PI * 2
        }

        if (this.angle < 0) {
            this.angle += Math.PI * 2
        }
        log('angle after', this.angle / Math.PI * 180)
        this.adjustSpeedByAngle()
    }

    adjustSpeedByAngle() {
        this.speed = geometricMean(this.speedX, this.speedY)
        this.speedX = this.speed * Math.cos(this.angle)
        this.speedY = -this.speed * Math.sin(this.angle)
    }

    adjustAngleBySpeed() {
        this.speed = geometricMean(this.speedX, this.speedY)
        this.angle = Math.atan2(-this.speedY, this.speedX)
        if (this.angle < 0) {
            this.angle += Math.PI * 2
        }
    }

    update() {
        this.move()

        if (this.image.x > this.game.canvas.width || this.image.x < 0) {
            this.angle = Math.PI * 3 - this.angle
        }
        if (this.image.y < 0) {
            this.angle = Math.PI * 2 - this.angle
        } else if (this.image.y > this.game.canvas.height) {
            this.kill()
        }
        this.adjustSpeedByAngle()

        // gravity
        // log('speedX, speedY', this.speedX, this.speedY)
        if (this.speedY > 0) {
            this.downGravity = Math.min(1 / this.speedY, this.upGravity)
            this.downGravity = Math.max(this.downGravity, this.downGravity / 4)
            this.speedY += this.downGravity
        } else {
            this.speedY += this.upGravity
        }

        this.adjustAngleBySpeed()
    }

    move() {
        let [x, y] = moveByTarget(this.image.x, this.image.y, this.speed, this.angle)
        this.image.x = x
        this.image.y = y
    }
}
