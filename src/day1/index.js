const readInput = require("../utils/readInput")

const prepareInput = (rawInput) => rawInput.replace( /\n/g, ' ' ).split( ' ' )
.map((input) => Number(input));

const input = prepareInput(readInput())
// 1005459
const goA = (input) => {
  let result;
  input.forEach((i) => {
    input.forEach((j) => {
      if (i + j === 2020) result = i * j;
    });
  });
  return result;
}

// 92643264
const goB = (input) => {
  let result;
  input.forEach((i) => {
    input.forEach((j) => {
      input.forEach((k) => {
        if (i + j + k === 2020) result = i * j * k;
      });
    });
  });
  return result;
}

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
