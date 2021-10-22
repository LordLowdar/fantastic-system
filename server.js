const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// app.get('/notes', (req, res) => {
//   if (res.statusCode === '400') return;
//   res.status(200).sendFile(path.join(__dirname, 'public/notes.html'));
// });

app.get('/api/notes', (req, res) => {
  if (res.statusCode === '404') return;
  res.status(200).json(db);
});

app.post('/api/notes', (req, res) => {
  let newNote = req.body;
  let notes = fs.readFileSync('./db/db.json');
  let notesJson = JSON.parse(notes);
  notesJson.push(newNote);
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
