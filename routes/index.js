import express from "express";
import authRouter from "./auth.js";
import contactsRouter from "./contacts.js";
import usersRouter from "./users.js";
import { validateToken } from "../helpers/validateToken.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/api/contacts", validateToken, contactsRouter);
router.use("/users", validateToken, usersRouter);
export default router;
