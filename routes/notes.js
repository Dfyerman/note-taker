const notes = require('express').Router();
const { readFromFile, readAndAppend, deleteFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/notes.json');
    res.json(`note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

notes.delete('/:id', (req, res) => {
  const { id } = req.params;

  readFromFile('./db/notes.json')
    .then((data) => {
      const notesData = JSON.parse(data);
      const updatedNotes = notesData.filter((note) => note.id !== id);

      deleteFromFile(updatedNotes, './db/notes.json')
        .then(() => {
          res.json({ message: 'Note deleted successfully' });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = notes;