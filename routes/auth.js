import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authSchema } from "../schemas/users.js";
import {
  current,
  login,
  logout,
  register,
  updSubscription,
} from "../controllers/auth.js";
import { validateToken } from "../helpers/validateToken.js";
const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), register);
authRouter.post("/login", validateBody(authSchema), login);
authRouter.post("/logout", validateToken, logout);
authRouter.post("/current", validateToken, current);
authRouter.patch("/", validateToken, updSubscription);

export default authRouter;
