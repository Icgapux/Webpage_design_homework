class Game {
    constructor(fps, images, runCallback) {
        this.fps = fps
        this.pathImages = images
        this.images = {}
        this.runCallback = runCallback

        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.score = 0
        this.canvas = document.querySelector('#canvas')
        this.context = this.canvas.getContext('2d')

        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })
        this.init()
    }

    drawImage(image) {
        this.context.drawImage(image.image, image.x, image.y)
    }

    update() {
        this.scene.update()
    }

    draw() {
        this.scene.draw()
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    runloop() {
        // log('start run')
        var actions = Object.keys(this.actions)
        for (var i = 0; i < actions.length; i++) {
            let key = actions[i]
            if (this.keydowns[key]) {
                this.actions[key]()
            }
        }
        // var self = this
        this.update()

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.draw()

        var self = this
        setTimeout(function(){
            self.runloop()
        }, 1000/self.fps)
    }

    imageByName(name) {
        var img = this.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    drawCircle(x, y, r) {
        this.context.beginPath()
        this.context.arc(x + r, y + r, r, 0, 2 * Math.PI)
        this.context.fillStyle = 'white'
        this.context.fill()
    }

    runWithScene(scene) {
        var self = this
        this.scene = scene
        setTimeout(function(){
            self.runloop()
        }, 1000/self.fps)
    }

    replaceScene(scene) {
        this.scene = scene
    }

    __start() {
        this.runCallback(this)
    }

    init() {
        var countImages = 0;
        var names = Object.keys(this.pathImages)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            let path = this.pathImages[name]
            let img = new Image()
            img.src = path
            var self = this
            img.onload = function() {
                // log(this.images)
                self.images[name] = img
                countImages++
                if (countImages == names.length) {
                    self.__start()
                }
            }
        }
    }
}
