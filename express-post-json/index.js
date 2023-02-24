const express = require('express');
const app = express();
let nextId = 1;

const grades = {
};

app.listen(3000, () => {
});

app.get('/api/grades', (req, res) => {
  const gradesArray = [];
  for (const id in grades) {
    gradesArray.push(grades[id]);
  }
  res.json(gradesArray);
});

const json = express.json();

app.use(json);

app.post('/api/grades', (req, res) => {
  const newEntry = req.body;
  newEntry.id = nextId;
  nextId++;
  grades[nextId] = newEntry;
  res.status(201).send(newEntry);
});
