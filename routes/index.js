import express from "express";
import contactsRouter from "./contacts.js";
import usersRouter from "./users.js";
import { validateToken } from "../helpers/validateToken.js";

const router = express.Router();

router.use("/contacts", validateToken, contactsRouter);
router.use("/users", validateToken, usersRouter);
export default router;
