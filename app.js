import express from "express";
import logger from "morgan";
import cors from "cors";

import router from "./src/routes/index.js";
import path from "node:path";
import { swaggerDocs } from "./src/middlewares/swaggerDocs.js";

const app = express();
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/avatars", express.static(path.resolve("public/avatars")));
app.use("/api-docs", swaggerDocs());
app.use("/", router);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
  next();
});

export { app };
