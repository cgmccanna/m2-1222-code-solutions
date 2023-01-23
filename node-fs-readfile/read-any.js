const fs = require('fs');

fs.readFile((process.argv[process.argv.length - 1]), 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
