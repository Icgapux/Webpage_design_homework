class SceneEnd {
    constructor(game, score) {
        this.game = game
        this.score = score
        log('score', score)

        this.init()
    }

    init() {
        this.game.registerAction('r', () => {
            var s = new Scene(this.game)
            this.game.replaceScene(s)
        })

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
        var context = this.game.context
        context.fillStyle = 'white'
        context.font = '17px consolas'
        context.fillText('Game over, press key r to restart', 150, 190)
        context.fillText('Your score:' + this.score, 235, 220)
    }
}
