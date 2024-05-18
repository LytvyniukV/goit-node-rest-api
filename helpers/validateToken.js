import jwt from "jsonwebtoken";
import HttpError from "./HttpError.js";
import { User } from "../models/user.js";

export const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw HttpError(401);

  const [bearer, token] = authHeader.split(" ", 2);
  if (bearer !== "Bearer") throw HttpError(401);

  jwt.verify(token, process.env.SECRET_KEY, verifyCallback);

  async function verifyCallback(err, decode) {
    if (err) next(HttpError(401));

    try {
      const user = await User.findById(decode.id);
      if (!user || user.token !== token) throw HttpError(401);

      req.user = {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      };
      next();
    } catch (error) {
      next(error);
    }
  }
};
