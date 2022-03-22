const _ = require('lodash')

const a = [1,2,3,4,5,6]
const b = [2,4,5,6]

const diff = _.difference(a, b)
console.log(diff)
