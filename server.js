const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
  if (res.statusCode === '400') return;
  res.status(200).sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  if (res.statusCode === '404') return;
  res.status(200).json(db);
});

app.post('/api/notes', (req, res) => {
  let newNote = { id: uuidv4(), ...req.body };
  // let notes = fs.readFileSync('./db/db.json');
  // let notesJson = JSON.parse(notes);
  db.push(newNote);
  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(db));
  res.status(200).json(db);
});

app.delete;

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
