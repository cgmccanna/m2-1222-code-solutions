const fs = require('fs');
const allNotes = require('./data.json');

const lastCommand = process.argv[process.argv.length - 1];
const secondCommand = process.argv[process.argv.length - 2];
const thirdCommand = process.argv[process.argv.length - 3];

if (lastCommand === 'read') {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    for (const id in allNotes.notes) {
      console.log(`${id}: ${allNotes.notes[id]}`);
    }
  });
}

if (secondCommand === 'create') {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    allNotes.notes[`${allNotes.nextId}`] = lastCommand;
    allNotes.nextId++;
    fs.writeFile('data.json', JSON.stringify(allNotes, null, 2), err => {
      if (err) throw err;
    });
  });
}

if (secondCommand === 'delete') {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    delete allNotes.notes[lastCommand];
    fs.writeFile('data.json', JSON.stringify(allNotes, null, 2), err => {
      if (err) throw err;
    });
  });
}

if (thirdCommand === 'update') {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    allNotes.notes[secondCommand] = lastCommand;
    fs.writeFile('data.json', JSON.stringify(allNotes, null, 2), err => {
      if (err) throw err;
    });
  });
}
