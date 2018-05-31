class SceneTitle {
    constructor(game) {
        this.game = game
        game.registerAction(' ', function(){
            var s = new Scene(game)
            game.replaceScene(s)
        })

        this.init()
    }

    init() {
        let r = document.getElementsByClassName('score')
        log('r.length', r.length)
        for (let tr of r) {
            tr.remove()
        }
        for (var i = 0; i < r.length; i++) {
            log('remove')
            r[i].remove()
        }
        window.ranks.sort(function(a, b){return b-a})
        log('length', window.ranks.length)
        let table = document.querySelector('#id-table')
        for (var i = 0; i < window.ranks.length; i++) {
            let r = window.ranks[i]
            let tr = document.createElement('tr')
            tr.className = 'score'
            let td = document.createElement('td')
            td.innerHTML = (i + 1)
            tr.appendChild(td)
            td = document.createElement('td')
            td.innerHTML = window.ranks[i]
            tr.appendChild(td)
            table.appendChild(tr)
        }
    }

    update() {

    }

    draw() {
        this.game.context.fillStyle = 'black'
        this.game.context.font = '17px consolas'
        this.game.context.fillText('Press space to start', 80, 200)
    }
}
