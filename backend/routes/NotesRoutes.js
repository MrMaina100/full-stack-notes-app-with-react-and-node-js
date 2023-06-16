const express = require("express");
const {
  addNote,
  deleteNote,
  updateNote,
  getNotes,
} = require("../controllers/NoteController");

const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.post("/",Authentication, addNote);
router.get("/",Authentication, getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
