class Obstacle {
    constructor(game) {
        this.game = game

        this.speed = this.game.speed
        this.minGap = 60
        this.maxGap = 180
        this.gap = getRandomInteger(this.minGap, this.maxGap)
        this.nowGap = this.gap

        this.init()
        this.obstacles = []
    }

    init() {
        this.types = [
            {
                width: 17,
                height: 35,
                y: 105,
                sourceX: 228,
                sourceY: 2,
            }, {
                width: 25,
                height: 50,
                y: 90,
                sourceX: 332,
                sourceY: 2,
            }
        ]
    }

    addObstacle() {
        log('add obstacle')
        let cactus = {
            x: this.game.canvas.width,
            number: getRandomInteger(1, 3),
            type :getRandomInteger(0, 1),
        }
        cactus.startIndex = getRandomInteger(0, 6 - cactus.number)
        let type = this.types[cactus.type]
        cactus.width = type.width * cactus.number
        cactus.height = type.height
        cactus.sourceX = type.sourceX + type.startIndex * cactus.width
        cactus.sourceY = type.sourceY
        cactus.y = type.y
        this.obstacles.push(cactus)
    }

    delObstacle() {
        while (this.obstacles.length > 0 && this.obstacles[0].x + this.types[this.obstacles[0].type].width < 0) {
            this.obstacles.splice(0, 1)
        }
    }

    update() {
        this.nowGap--
        if (this.nowGap == 0) {
            this.gap = getRandomInteger(this.minGap, this.maxGap)
            log(this.gap)
            this.nowGap = this.gap
            this.addObstacle()
            this.delObstacle()
        }
        for (var i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].x -= this.speed
        }
    }

    draw() {
        // log('draw', this.obstacles.length)
        for (var i = 0; i < this.obstacles.length; i++) {
            let o = this.obstacles[i]
            let type = this.types[o.type]
            // let w = this.types[o.type].width
            // let h = this.types[o.type].height
            this.game.context.drawImage(
                this.game.images['sprite'],
                type.sourceX + type.width * o.startIndex, type.sourceY,
                type.width * o.number, type.height,
                o.x, type.y,
                type.width * o.number, type.height
            )
        }
    }
}
