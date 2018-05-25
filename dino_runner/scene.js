class Scene {
    constructor(game) {
        this.game = game
        this.game.score = 0

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
    }

    draw() {
        this.player.draw()
        this.horizon.draw()
        this.cloud.draw()
        this.obstacle.draw()
    }
}
