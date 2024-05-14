import express from "express";
import authRouter from "./auth.js";
import contactsRouter from "./contacts.js";
import { validateToken } from "../helpers/validateToken.js";

const router = express.Router();

router.use("/users", authRouter);
router.use("/api/contacts", validateToken, contactsRouter);

export default router;
