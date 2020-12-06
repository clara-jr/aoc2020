const readInput = require("../utils/readInput")

const prepareInput = (rawInput) => rawInput.split('\n')

const input = prepareInput(readInput())

const ROW_COUNT = 127
const COL_COUNT = 7

const searchSeat = (line, up, down, top) => {
  let min = 0
  let max = top
  line.forEach(char => {
    const half = parseInt((min + max) / 2)
    if (char === up)
      max = half
    else if (char === down)
      min = half + 1
  })
  return min
}

// 894
const goA = (input) => {
  let result = 0
  input.forEach(line => {
    const row = searchSeat(line.slice(0, 7).split(''), 'F', 'B', ROW_COUNT)
    const col = searchSeat(line.slice(7, line.length).split(''), 'L', 'R', COL_COUNT)
    const seatId = row * 8 + col
    if (seatId > result) result = seatId
  })
  return result
}

// 579
const goB = (input) => {
  let result = 0
  let seatIds = []
  input.forEach(line => {
    const row = searchSeat(line.slice(0, 7).split(''), 'F', 'B', ROW_COUNT)
    const col = searchSeat(line.slice(7, line.length).split(''), 'L', 'R', COL_COUNT)
    const seatId = row * 8 + col
    seatIds.push(parseInt(seatId))
  })
  seatIds = seatIds.sort((a, b) => a - b)
  let prev = seatIds[0]
  seatIds.forEach(seatId => {
    if (parseInt(seatId) !== 0) {
      if (prev !== seatId - 1) {
        result = prev + 1
      }
      prev += 1
    }
  })
  return result
}

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
