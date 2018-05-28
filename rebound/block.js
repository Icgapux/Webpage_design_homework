class Block {
    constructor(game, numberOfBalls) {
        this.game = game
        // this.height = 20
        // this.width = 20
        this.size = 60
        this.speed = this.size * 1.8
        this.colors = ['blue', 'red', 'green', 'yellow', 'pink']
        this.color = this.colors[Math.floor(Math.random() * 5)]
        this.init(numberOfBalls)
        this.initShape()
    }

    init(numberOfBalls) {
        var canvas = this.game.canvas
        this.x = Math.random() * 0.9 * canvas.width + 10
        this.y = canvas.height - this.size
        // this.type = Math.random() * 3
        log('number of balls', numberOfBalls)
        this.hp = Math.floor(Math.random() * numberOfBalls * 5 + 3)
        log('hp', this.hp)
        this.color = this.colors[Math.floor(Math.random() * 5)]
    }

    initShape() {
        this.type = Math.floor(Math.random() * 3)
        // this.offsetX = 0
        // this.offsetY = 0
        // this.edges = []
        let s = this.size
        if (this.type == 0) {
            // rectangular
            this.offsetXs = [0, s, s, 0, 0]
            this.offsetYs = [0, 0, s, s, 0]
        } else if (this.type == 1) {
            // triangle
            this.offsetXs = [s / 2, s, 0, s / 2]
            this.offsetYs = [0, s * Math.sqrt(3) / 2, s * Math.sqrt(3) / 2, 0]
        } else {
            // circle
            this.offsetXs = [s / 2]
            this.offsetYs = [s / 2]
        }
    }

    kill() {
        // this.alive = false
        this.hp--
    }

    moveUp() {
        this.y -= this.speed
    }

    update() {
        // this.kill()
    }

    draw() {
        // log('draw')
        if (this.hp <= 0) {
            return
        }
        let context = this.game.context
        // log('context', context)
        let rand = Math.floor(Math.random() * 5)
        context.fillStyle = this.color
        context.beginPath()
        if (this.type == 0) {
            // log('rectangular')
            context.moveTo(this.x, this.y)
            // log('length', this.offsetXs.length)
            for (var i = 0; i < this.offsetXs.length; i++) {
                // this.offsetXs[i]
                let ox = this.offsetXs[i]
                let oy = this.offsetYs[i]
                context.lineTo(this.x + ox, this.y + oy)
            }
            context.fill()
            //
            context.font = '25px consolas'
            // log(this.hp)
            context.fillStyle = 'black'
            context.fillText(this.hp, this.x + this.size / 2 - 5, this.y + this.size / 2 + 5)
        } else if (this.type == 1) {
            context.moveTo(this.x + this.offsetXs[0], this.y + this.offsetYs[0])
            for (var i = 1; i < this.offsetXs.length; i++) {
                let ox = this.offsetXs[i]
                let oy = this.offsetYs[i]
                // log('x, y', this.x + ox, this.y + oy)
                context.lineTo(this.x + ox, this.y + oy)
            }
            context.fill()
            //
            context.font = '25px consolas'
            // log(this.hp)
            context.fillStyle = 'black'
            context.fillText(this.hp, this.x + this.size / 2 - 5, this.y + this.size / 2 + 5)
        } else {
            let circleX = this.x + this.offsetXs[0]
            let circleY = this.y + this.offsetYs[0]
            context.arc(circleX, circleY, this.size / 2, 0, Math.PI * 2)
            context.fill()
            //
            context.font = '25px consolas'
            // log(this.hp)
            context.fillStyle = 'black'
            context.fillText(this.hp, this.x + this.size / 2 - 5, this.y + this.size / 2 + 5)
        }
    }
}
