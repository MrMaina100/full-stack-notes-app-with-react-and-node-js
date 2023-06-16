import express from "express";
import {
  addNote,
  deleteNote,
  updateNote,
  getNotes,
} from "../controllers/NoteController.js";

import Authentication from "../middleware/Authentication.js";

const router = express.Router();

router.post("/", Authentication, addNote);
router.get("/", Authentication, getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
