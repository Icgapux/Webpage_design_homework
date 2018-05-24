class Cloud {
    constructor(game) {
        this.game = game

        this.width = 46
        this.height = 14
        this.sourceX = 86
        this.sourceY = 2

        this.speed = 1
        this.minY = 30
        this.maxY = 71
        this.maxGap = 400
        this.minGap = 100
        this.clouds = []

        this.gap = getRandomNumber(this.minGap, this.maxGap)
        this.nowGap = this.gap
    }

    addCloud() {
        // log('add cloud')
        let cloud = {
            x: this.game.canvas.width,
            y: getRandomNumber(this.minY, this.maxY)
        }
        this.clouds.push(cloud)
    }

    delCloud() {
        while (this.clouds.length > 0 && this.clouds[0].x + this.width < 0) {
            this.clouds.splice(0, 1)
        }
    }

    update() {
        // log(this.nowGap)
        this.nowGap--
        // log('length', this.clouds.length)
        if (this.nowGap <= 0) {
            this.addCloud()
            this.gap = getRandomNumber(this.minGap, this.maxGap)
            // log(this.gap)
            this.nowGap = this.gap
            this.delCloud()
        }
        for (var i = 0; i < this.clouds.length; i++) {
            let cloud = this.clouds[i]
            cloud.x -= this.speed
        }
    }

    draw() {
        for (var i = 0; i < this.clouds.length; i++) {
            let cloud = this.clouds[i]
            // log('cloud.y', cloud.y)
            this.game.context.drawImage(
                this.game.images['sprite'],
                this.sourceX, this.sourceY,
                this.width, this.height,
                cloud.x, cloud.y,
                this.width, this.height
            )
        }
    }
}
