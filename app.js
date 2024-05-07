import express from "express";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import contactsRouter from "./routes/contacts.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;
const app = express();
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
  next();
});

const connection = mongoose.connect(uriDb);
connection
  .then(() => {
    app.listen(PORT, function () {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
