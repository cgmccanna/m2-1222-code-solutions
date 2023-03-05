const pg = require('pg');

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

const express = require('express');
const app = express();

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');
});

const json = express.json();

app.use(json);

app.get('/api/grades', (req, res, next) => {
  const sql = `
    select "gradeId",
           "name",
           "course",
           "score",
           "createdAt"
      from "grades"
 `;
  db.query(sql)
    .then(result => {
      const grades = result.rows;
      res.json(grades);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occured.'
      });
    });
});

app.post('/api/grades', (req, res, next) => {
  const inputs = req.body;
  const name = inputs.name;
  const course = inputs.course;
  const score = inputs.score;
  if (!Number.isInteger(score) || !name || !course || !score) {
    res.status(400).json({
      error: 'missing or invalid input field'
    });
    return;
  }
  const sql = `
    insert into "grades"(name, course, score)
    values($1, $2, $3)
    returning *
 `;
  const values = [name, course, score];
  db.query(sql, values)
    .then(result => {
      const newGrade = result.rows[0];
      res.status(201).json(newGrade);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occured.'
      });
    });
});

app.put('/api/grades/:gradeId', (req, res, next) => {
  const gradeId = Number(req.params.gradeId);
  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    res.status(400).json({
      error: 'gradeId must be a positive integer'
    });
    return;
  }
  const inputs = req.body;
  const name = inputs.name;
  const course = inputs.course;
  const score = inputs.score;
  if (!Number.isInteger(score) || !name || !course || !score) {
    res.status(400).json({
      error: 'missing or invalid input field'
    });
    return;
  }
  const sql = `
    update "grades"
    set "name"      = $1,
        "course"    = $2,
        "score"     = $3
    where "gradeId" = $4
    returning *
 `;
  const values = [name, course, score, gradeId];
  db.query(sql, values)
    .then(result => {
      const updatedGrade = result.rows[0];
      if (!updatedGrade) {
        res.status(404).json({
          error: `Cannot find grade with gradeId ${gradeId}`
        });
      } else {
        res.json(updatedGrade);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occured.'
      });
    });
});

app.delete('/api/grades/:gradeId', (req, res, next) => {
  const gradeId = Number(req.params.gradeId);
  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    res.status(400).json({
      error: 'gradeId must be a positive integer'
    });
    return;
  }
  const sql = `
    delete
      from "grades"
      where "gradeId" = $1
      returning *
 `;
  const values = [gradeId];
  db.query(sql, values)
    .then(result => {
      const deletedGrade = result.rows[0];
      if (!deletedGrade) {
        res.status(404).json({
          error: `Cannot find grade with gradeId ${gradeId}`
        });
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occured.'
      });
    });
});
