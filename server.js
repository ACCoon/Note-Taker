const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

app.get('/api/notes', (req, res) => {
  let notes = fs.readFileSync('./db/db.json');
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  // Read current db file and add new note to it
  const notesdb = fs.readFileSync('./db/db.json');
  notesdb.push(newNote);
  fs.writeFileSync('./db/db.json', notesdb);

  res.json(newNote);
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));