const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');

const calculate = (x, operation, y) => {
  x = Number(process.argv[process.argv.length - 3]);
  y = Number(process.argv[process.argv.length - 1]);
  operation = process.argv[process.argv.length - 2];
  if (operation === 'plus') {
    console.log('result:', add(x, y));
  }
  if (operation === 'minus') {
    console.log('result:', subtract(x, y));
  }
  if (operation === 'times') {
    console.log('result:', multiply(x, y));
  }
  if (operation === 'over') {
    console.log('result:', divide(x, y));
  }
};

calculate();
