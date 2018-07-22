// 1st Jan 1970 00:00:00 am
const moment = require('moment')

// const date = new Date()
// console.log(date.getMonth()) // prints 0-11 for current month

const date = moment()
console.log(date.format('Do MMM YYYY'))
console.log(date.format('h:mm a'))
console.log(date.format('H:mm'))