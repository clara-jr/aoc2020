const readInput = require("../utils/readInput")

const prepareInput = (rawInput) => rawInput.split('\n\n')

const input = prepareInput(readInput())

// 6726
const goA = (input) => {
  let result = 0
  input.forEach(group => {
    let yesAnswers = new Set()
    group.split('\n').forEach(person => {
      person.split('').forEach(answer => {
        yesAnswers.add(answer)
      })
    })
    result += yesAnswers.size
  })
  return result
}

// 3316
const goB = (input) => {
  let result = 0
  input.forEach(group => {
    const firstPerson = group.split('\n')[0]
    let yesAnswers = firstPerson.split('')
    let yesAnswers_ = [...yesAnswers]
    group.split('\n').forEach(person => {
      yesAnswers.forEach(answer => {
        if (!person.includes(answer) && yesAnswers_.includes(answer)) {
          yesAnswers_.splice(yesAnswers_.indexOf(answer), 1)
        }
      })
    })
    result += yesAnswers_.length
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
