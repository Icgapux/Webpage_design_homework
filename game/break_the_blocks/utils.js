const log = console.log.bind(console)

const getRandomNumber = (start, end) => {
    return start + Math.random() * (end - start)
}

const getRandomInteger = (start, end) => {
    return Math.floor(getRandomNumber(start, end) + 0.5)
}

const rectIntersect = (x1, w1, y1, h1, x2, w2, y2, h2) => {
    return !(x1 + w1 <= x2 || x2 + w2 <= x1 ||
             y1 + h1 <= y2 || y2 + h2 <= y1)
}

const addScore = (score) => {
    log('add score')
    window.ranks.push(score)
}
