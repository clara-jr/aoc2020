const { Console } = require("console");
const readInput = require("../utils/readInput")

const prepareInput = (rawInput) => rawInput.split('\n')

const input = prepareInput(readInput())
// 189
const goA = (input) => {
  const [right, down] = [3, 1];
  let x = 0;
  let result = 0;
  input.forEach((line, index) => {
    if (index % down === 0) {
      if (line[x] === '#') result++;
      x += right;
      if (x >= line.length) x -= line.length
    }
  });
  return result;
}

// 1718180100
const goB = (input) => {
  const steps = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
  let result = 1;
  steps.forEach(step => {
    const [right, down] = step;
    let x = 0;
    let resultStep = 0;
    input.forEach((line, index) => {
      if (index % down === 0) {
        if (line[x] === '#') resultStep++;
        x += right;
        if (x >= line.length) x -= line.length
      }
    });
    result *= resultStep;
  })
  return result;
}

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
