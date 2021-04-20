const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req, res) => {
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  console.log(notes);
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  // Read current db file and add new note to it
  const notesdb = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  notesdb.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notesdb));
  console.log(notesdb);
  res.json(notesdb);
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));