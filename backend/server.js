require("dotenv").config();
const express = require("express");
const cors = require("cors");
const NoteRoutes = require("./routes/NotesRoutes");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT;

app.use("/notes", NoteRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
