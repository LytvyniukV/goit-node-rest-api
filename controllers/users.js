import HttpError from "../helpers/HttpError.js";
import { User } from "../models/user.js";
import path from "node:path";
import fs from "node:fs/promises";
const updSubscription = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const getAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.avatarURL) throw HttpError(404, "Avatar not found");

    res.sendFile(path.resolve("public/avatars", user.avatarURL));
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    await fs.rename(
      req.file.path,
      path.resolve("public/avatars", req.file.filename)
    );

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: req.file.filename },
      { new: true }
    );
    if (!user) throw HttpError(404);

    res.json({
      avatar: user.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    await fs.rename(
      req.file.path,
      path.resolve("public/avatars", req.file.filename)
    );
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: req.file.filename },
      {
        new: true,
      }
    );
    res.status(200).json({
      user: {
        email: user.email,
        subscription: user.subscription,
        avatar: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};
export { updSubscription, getAvatar, uploadAvatar, updateAvatar };
