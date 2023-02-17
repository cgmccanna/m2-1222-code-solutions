const takeAChance = require('./take-a-chance');

var promise = takeAChance('Charlie');

promise.then(value => {
  console.log(value);
});

promise.catch(error => {
  console.log(error.message);
});
