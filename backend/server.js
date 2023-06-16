import dotenv from "dotenv"
dotenv.config()
import express from"express";
import cors from"cors";
import NotesRoutes from "./routes/NotesRoutes.js"
import connectDB from"./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT;

app.use("/notes", NotesRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
