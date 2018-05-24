class SceneTitle {
    constructor(game) {
        this.game = game
        game.registerAction('k', function(){
            var s = new Scene(game)
            game.replaceScene(s)
        })
    }

    update() {

    }

    draw() {
        this.game.context.fillStyle = 'black'
        this.game.context.font = '17px consolas'
        this.game.context.fillText('Press key k to start', 80, 200)
    }
}
