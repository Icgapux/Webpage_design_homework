var __main = function() {
    var images = {
        ball: 'img/ball.png',
        background: 'img/background.png',
    }
    var game = new Game(30, images, function(g){
        // log('callback runs', images)
        var s = new Scene(g)
        g.runWithScene(s)
    })
}

__main()
