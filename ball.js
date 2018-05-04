class Ball {
    constructor(game) {
        this.game = game
        this.image = game.imageByName('ball')
        this.alive = false
        this.inBlock = false
        this.lastBlock = null
        this.gravity = 0.1
        this.init()
    }

    init(angle) {
        this.image.x = this.game.canvas.width / 2
        this.image.y = 10
        this.alive = true
        this.speed = Math.sqrt(2) * 8
        // this.speedX = 5
        // this.speedY = 5
        this.angle = angle || Math.PI * 1.5
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
                    if (!this.inBlock) {
                        let x = line.p1.x - line.p2.x
                        let y = line.p1.y - line.p2.y
                        let angleOfLine = Math.atan2(x, y)
                        this.respond(angleOfLine)
                        block.kill()
                        this.inBlock = true
                        this.lastBlock = block
                    }
                    // break
                } else {
                    if (this.lastBlock == block) {
                        this.inBlock = false
                    }
                }
            }
        } else {
            let x1 = this.image.x + this.image.w / 2
            let x2 = block.x + block.size / 2
            let y1 = this.image.y + this.image.h / 2
            let y2 = block.y + block.size / 2
            let d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
            if (d <= this.image.w / 2 + block.size / 2) {
                if (!this.inBlock) {
                    let x = x1 - x2
                    let y = y1 - y2
                    let angleOfConnection = Math.atan2(x, y)
                    let angleOfLine = angleOfConnection - Math.PI / 2
                    this.respond(angleOfLine)
                    block.kill()
                    this.inBlock = true
                    this.lastBlock = block
                }                
            } else {
                if (this.lastBlock == block) {
                    this.inBlock = false
                }
            }
        }
    }

    respond(angleOfLine) {
        log('angle of ball', this.angle)
        this.game.score++
        if (angleOfLine < 0) {
            angleOfLine += Math.PI * 2
        }
        this.angle = Math.PI * 2 - this.angle + angleOfLine * 2
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

        // gravity 
        let speedX = this.speed * Math.cos(this.angle)
        let speedY = -this.speed * Math.sin(this.angle)
        speedY += this.gravity
        // log('speedx speedy', -speedY, speedX)
        this.angle = Math.atan2(-speedY, speedX)
        log(this.angle)

        // log(this.lastBlock)
        if (this.lastBlock != null && this.lastBlock.hp <= 0) {
            this.lastBlock = null
            this.inBlock = false
        }
    }

    move() {
        let [x, y] = moveByTarget(this.image.x, this.image.y, this.speed, this.angle)
        this.image.x = x
        this.image.y = y
    }
}
