var __main = function() {
    var images = {
        sprite : 'img/sprite.png'
    }
    var game = new Game(60, images, function(g){
        // log('callback runs', images)
        var s = new Scene(g)
        g.runWithScene(s)
    })
}

__main()
