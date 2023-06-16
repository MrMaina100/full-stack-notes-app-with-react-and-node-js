import mongoose from "mongoose";

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

export default mongoose.model("Note", NoteScema);
