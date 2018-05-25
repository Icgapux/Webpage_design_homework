class Player {
    constructor(game) {
        this.game = game
        this.canvas = this.game.canvas
        this.context = this.game.context

        this.width = 44
        this.height = 47
        this.sourceX = 677
        this.sourceY = 2
        this.x = 40
        this.y = 91

        this.gravity = 0.57
        this.initJumpSpeed = -10
        this.jumpHeight = 40
        this.speed = 0
        this.jumped = false
        this.yOnGround = 91

        this.delayCount = 3
        this.delay = 3
        this.numberOfFrames = 4
        this.nowFrame = 0
    }

    jump() {
        if (!this.jumped) {
            log('jump')
            this.jumped = true
            this.speed = this.initJumpSpeed
        }
    }

    collide(obstacle) {
        let obstacles = obstacle.obstacles
        for (var i = 0; i < obstacles.length; i++) {
            let o = obstacles[i]
            if (!(this.x > o.x + o.width || this.x + this.width < o.x ||
                  this.y > o.y + o.height || this.y + this.height < o.y)) {
                return true
            }
        }
        return false
    }

    update() {
        this.delayCount--
        if (this.delayCount == 0) {
            this.delayCount = this.delay
            this.nowFrame = (this.nowFrame + 1) % this.numberOfFrames
        }
        this.y += this.speed
        if (this.jumped) {
            this.speed += this.gravity
        }
        if (this.y >= this.yOnGround && this.jumped) {
            this.jumped = false
            this.speed = 0
            this.y = this.yOnGround
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.drawImage(
            this.game.images['sprite'],
            this.sourceX + this.width * this.nowFrame, this.sourceY,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height)
    }
}
