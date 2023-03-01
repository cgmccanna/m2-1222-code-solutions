const express = require('express');
const app = express();
const all = require('./data.json');
const nextId = all.nextId;
const fs = require('fs');

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');
});

app.get('/api/notes', (req, res) => {
  const notesOnly = all.notes;
  const notesArray = [];
  for (const id in notesOnly) {
    notesArray.push(notesOnly[id]);
  }
  res.json(notesArray);
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const notesOnly = all.notes;
  if (id < 1 || isNaN(id) === true || id % 1 !== 0) {
    res.status(400).send({ error: 'id must be a positive integer' });
  } else {
    if (id in notesOnly) {
      for (const noteId in notesOnly) {
        if (noteId === id) {
          res.status(200).send(notesOnly[noteId]);
        }
      }
    } else {
      res.status(400).send({ error: `cannot find note with id ${id}` });
    }
  }
});

const json = express.json();

app.use(json);

app.post('/api/notes', (req, res) => {
  const content = req.body;
  if (Object.keys(content).length === 0) {
    res.status(400).send({ error: 'content is a required field' });
  } else if (Object.keys(content).length !== 0) {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) throw err;
      all.notes[`${nextId}`] = content;
      all.notes[`${nextId}`].id = nextId;
      all.nextId++;
      fs.writeFile('data.json', JSON.stringify(all, null, 2), err => {
        if (err) {
          console.error(err);
          res.status(500).send({ error: 'An unexpected error occurred.' });
        }
        res.status(200).send(content);
      });
    });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  if (id < 1 || isNaN(id) === true || id % 1 !== 0) {
    res.status(400).send({ error: 'id must be a positive integer' });
  } else if (id in all.notes !== true) {
    res.status(400).send({ error: `cannot find note with id ${id}` });
  } else {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) throw err;
      delete all.notes[id];
      fs.writeFile('data.json', JSON.stringify(all, null, 2), err => {
        if (err) {
          console.error(err);
          res.status(500).send({ error: 'An unexpected error occurred.' });
        }
        res.sendStatus(204);
      });
    });
  }
});

app.post('/api/notes/:id', (req, res) => {
  const content = req.body;
  const id = req.params.id;
  if (id < 1 || isNaN(id) === true || id % 1 !== 0) {
    res.status(400).send({ error: 'id must be a positive integer' });
  } else if (Object.keys(content).length === 0) {
    res.status(400).send({ error: 'content is a required field' });
  } else if (id in all.notes !== true) {
    res.status(400).send({ error: `cannot find note with id ${id}` });
  } else {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) throw err;
      all.notes[id].content = content.content;
      fs.writeFile('data.json', JSON.stringify(all, null, 2), err => {
        if (err) {
          console.error(err);
          res.status(500).send({ error: 'An unexpected error occurred.' });
        }
        res.status(200).send(all.notes[id]);
      });
    });
  }
});
