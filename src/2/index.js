const readInput = require("../utils/readInput")

const prepareInput = (rawInput) => rawInput.split('\n')

const input = prepareInput(readInput())
// 586
const goA = (input) => {
  let result = 0;
  input.forEach((line) => {
    const [policy, password] = line.split(': ');
    const [numbers, letter] = policy.split(' ');
    const [min, max] = numbers.split('-');
    const timesLetterInPassword = password.split('').filter(char => char == letter).length;
    if (Number(min) <= timesLetterInPassword && timesLetterInPassword <= Number(max)) result++;
  });
  return result;
}

// 352
const goB = (input) => {
  let result = 0;
  input.forEach((line) => {
    const [policy, password] = line.split(': ');
    const [numbers, letter] = policy.split(' ');
    const [position1, position2] = numbers.split('-');
    const rule1 = password[position1 - 1] === letter;
    const rule2 = password[position2 - 1] === letter;
    if ((rule1 && !rule2) || (rule2 && !rule1)) result++;
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
