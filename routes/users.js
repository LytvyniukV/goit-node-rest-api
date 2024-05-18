import {
  optimizeAvatarMiddleware,
  uploadAvatarMiddleware,
} from "../helpers/avatar.js";
import {
  getAvatar,
  updSubscription,
  updateAvatar,
  current,
  login,
  logout,
  register,
} from "../controllers/users.js";
import express from "express";

import validateBody from "../helpers/validateBody.js";
import { authSchema } from "../schemas/users.js";
import { validateToken } from "../helpers/validateToken.js";

const usersRouter = express.Router();
usersRouter.post("/register", validateBody(authSchema), register);
usersRouter.post("/login", validateBody(authSchema), login);
usersRouter.post("/logout", logout);
usersRouter.get("/current", current);

usersRouter.get("/avatars", getAvatar);
usersRouter.patch("/", updSubscription);
usersRouter.patch(
  "/avatars",
  uploadAvatarMiddleware.single("avatar"),
  optimizeAvatarMiddleware,
  updateAvatar
);
export default usersRouter;
