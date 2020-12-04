const readInput = require("../utils/readInput")

const prepareInput = (rawInput) => rawInput.split('\n\n')

const input = prepareInput(readInput())
const requireFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const rules = {
  byr: {
    length: 4,
    min: 1920,
    max: 2002
  },
  iyr: {
    length: 4,
    min: 2010,
    max: 2020
  },
  eyr: {
    length: 4,
    min: 2020,
    max: 2030
  },
  hgt: {
    endsWith: ['cm', 'in'],
    cm: {
      min: 150,
      max: 193
    },
    in: {
      min: 59,
      max: 76
    }
  },
  hcl: {
    hexadecimal: '^#[a-f0-9]{6}$'
  },
  ecl: {
    values: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
  },
  pid: {
    length: 9
  }
}

// 256
const goA = (input) => {
  let result = 0;
  input.forEach(passport => {
    let valid = true
    passport = passport.split('\n').join(' ').split(' ')
    const fields = passport.map(field => field.split(':')[0])
    requireFields.forEach(requireField => {
      if (!fields.includes(requireField)) valid = false
    })
    if (valid) result++
  });
  return result;
}

// 198
const goB = (input) => {
  let result = 0;
  input.forEach(passport => {
    let valid = true
    let strictValid = true
    passport = passport.split('\n').join(' ').split(' ')
    const fields = passport.map(field => field.split(':')[0])
    const values = passport.map(field => field.split(':')[1])
    requireFields.forEach(requireField => {
      if (!fields.includes(requireField)) valid = false
    })
    if (valid) {
      fields.forEach((field, index) => {
        const value = values[index]
        const rulesField = rules[field]
        for (let rule in rulesField) {
          const ruleValue = rulesField[rule]
          switch(rule) {
            case 'length':
              if (value.length !== ruleValue) strictValid = false
              break
            case 'values':
              if (!ruleValue.includes(value)) strictValid = false
              break
            case 'min':
              if (value < ruleValue) strictValid = false
              break
            case 'max':
              if (value > ruleValue) strictValid = false
              break
            case 'hexadecimal':
              if (!(/^#[a-f0-9]{6}$/).test(value)) strictValid = false
              break
            case 'endsWith':
              if (!ruleValue.some(suffix => value.endsWith(suffix))) strictValid = false
              else {
                const ending = ruleValue.find(suffix => value.endsWith(suffix))
                const number = Number(value.slice(0, - ending.length))
                if (number < rulesField[ending].min || number > rulesField[ending].max) strictValid = false
              }
              break
            default:
              break
          }
        }
      })
      if (strictValid) result++
    }
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
