const log = console.log.bind(console)

const getRandomNumber = (start, end) => {
    return start + Math.random() * (end - start)
}

const getRandomInteger = (start, end) => {
    return Math.floor(getRandomNumber(start, end) + 0.5)
}

const addScore = (score) => {
    log('add score')
    window.ranks.push(score)
}
