const Note = require("../models/NoteModel");

// get all notes
// GET request
async function getNotes(req, res) {
  try {
    const notes = await Note.find({ email: req.user.email });
    res.json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// create new note
// POST request
const addNote = async (req, res) => {
  const { title, note } = req.body;
  console.log({ title, note });
  try {
    const newNote = await Note.create({
      email: req.user.email,
      title,
      note,
    });
    res.send(newNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a note from the database
// DELETE request
const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete({ _id: id });
    res.send({ message: `Deleted ${deletedNote}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// udpate a note in the database
// PATCH request
const updateNote = (req, res) => {
  const { id } = req.params;
  const { newNote } = req.body;
  try {
    const update = findAndUpdate(
      { id },
      {
        $set: {
          note: newNote,
        },
      },
      { new: true }
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getNotes, addNote, deleteNote, updateNote };
