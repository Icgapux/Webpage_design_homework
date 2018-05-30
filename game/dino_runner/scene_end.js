class SceneEnd {
    constructor(game, score) {
        this.game = game
        this.score = score
        log('score', score)
        game.registerAction('r', function(){
            var s = new Scene(game)
            game.replaceScene(s)
        })
    }

    update() {

    }

    draw() {
        var context = this.game.context
        context.fillStyle = 'black'
        context.font = '17px consolas'
        context.fillText('Game over, press key r to restart', 140, 60)
        context.fillText('Your score:' + this.score, 220, 90)
    }
}
