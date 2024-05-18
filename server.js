import mongoose from "mongoose";
import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb);
connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, (err) => {
      if (err) {
        console.log("Server was not run because of err", err);
        process.exit(1);
      }

      console.log(`Server was started at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Database not running. Error message: ${err.message}`);
    process.exit(1);
  });
