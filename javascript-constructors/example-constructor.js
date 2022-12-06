function ExampleConstructor() {}

console.log('value of ExampleConstructor prototype:', ExampleConstructor.prototype);
console.log('typeof ExampleConstructor prototype:', typeof ExampleConstructor.prototype);

var newVar = new ExampleConstructor();

console.log('new variable:', newVar);

var isInstance = newVar instanceof ExampleConstructor;

console.log(isInstance);
