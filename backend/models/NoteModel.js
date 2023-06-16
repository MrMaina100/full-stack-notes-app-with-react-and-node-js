const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteScema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", NoteScema);
