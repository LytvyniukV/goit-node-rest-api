import {
  optimizeAvatarMiddleware,
  uploadAvatarMiddleware,
} from "../helpers/avatar.js";
import {
  getAvatar,
  updSubscription,
  updateAvatar,
  uploadAvatar,
} from "../controllers/users.js";
import express from "express";
const usersRouter = express.Router();
usersRouter.get("/avatars", getAvatar);
usersRouter.patch("/", updSubscription);
usersRouter.patch(
  "/avatars",
  uploadAvatarMiddleware.single("avatar"),
  optimizeAvatarMiddleware,
  updateAvatar
);
export default usersRouter;
