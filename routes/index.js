import express from "express";
import contactsRouter from "./contacts.js";
import usersRouter from "./users.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = express.Router();

router.use("/contacts", validateToken, contactsRouter);
router.use("/users", usersRouter);
export default router;
