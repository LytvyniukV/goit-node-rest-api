import uploadMiddleware from "../helpers/upload.js";
import {
  getAvatar,
  updSubscription,
  uploadAvatar,
} from "../controllers/users.js";
import express from "express";
const usersRouter = express.Router();
usersRouter.get("/avatars", getAvatar);
usersRouter.patch("/avatars", uploadMiddleware.single("avatar"), uploadAvatar);
usersRouter.patch("/", updSubscription);

export default usersRouter;
