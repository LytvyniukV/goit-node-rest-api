import {
  optimizeAvatarMiddleware,
  uploadAvatarMiddleware,
} from "../middlewares/avatar.js";
import controllers from "../controllers/users.js";
import express from "express";
import wrapper from "../helpers/wrapper.js";
import validator from "../middlewares/validation.js";
import {
  authSchema,
  emailVerifySchema,
  updateUserSubscriptionSchema,
} from "../schemas/users.js";
import { validateToken } from "../middlewares/validateToken.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validator.body(authSchema),
  wrapper(controllers.register)
);

usersRouter.post(
  "/login",
  validator.body(authSchema),
  wrapper(controllers.login)
);

usersRouter.post("/logout", validateToken, wrapper(controllers.logout));

usersRouter.get("/current", validateToken, wrapper(controllers.current));

usersRouter.get("/avatars", validateToken, wrapper(controllers.getAvatar));

usersRouter.patch(
  "/",
  validateToken,
  validator.body(updateUserSubscriptionSchema),
  wrapper(controllers.updSubscription)
);

usersRouter.patch(
  "/avatars",
  uploadAvatarMiddleware.single("avatar"),
  optimizeAvatarMiddleware,
  validateToken,
  wrapper(controllers.updateAvatar)
);

usersRouter.get("/verify/:verificationToken", wrapper(controllers.verify));
usersRouter.post(
  "/verify",
  validator.body(emailVerifySchema),
  wrapper(controllers.extraVerify)
);
export default usersRouter;
