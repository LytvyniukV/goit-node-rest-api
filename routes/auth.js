import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authSchema } from "../schemas/users.js";
import { current, login, logout, register } from "../controllers/auth.js";
import { validateToken } from "../helpers/validateToken.js";
const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), register);
authRouter.post("/login", validateBody(authSchema), login);
authRouter.post("/logout", validateToken, logout);
authRouter.get("/current", validateToken, current);

export default authRouter;
