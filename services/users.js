import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import gravatar from "gravatar";
import path from "node:path";
import fs from "node:fs/promises";

const register = async (body) => {
  const { email, password } = body;
  const oldUser = await User.findOne({ email });
  if (oldUser) throw HttpError(409, "Email in use");

  const passwordHash = await bcrypt.hash(password, 10);
  const avatar = gravatar.url(email, { protocol: "https", size: 250 });
  const user = await User.create({
    email,
    password: passwordHash,
    avatarURL: avatar,
  });
  return user;
};

const login = async (body) => {
  const { email, password } = body;
  const findUser = await User.findOne({ email });

  if (!findUser) throw HttpError(401, "Email or password is incorrect");

  const passwordIsMatch = await bcrypt.compare(password, findUser.password);

  if (passwordIsMatch === false)
    throw HttpError(401, "Email or password is incorrect");

  const token = jwt.sign({ id: findUser._id }, process.env.SECRET_KEY, {
    expiresIn: "3h",
  });

  const user = await User.findByIdAndUpdate(
    findUser._id,
    { token },
    { new: true }
  );
  return user;
};

const logout = async (id) => {
  const user = await User.findByIdAndUpdate(id, { token: null }, { new: true });
  return user;
};

const updSubscription = async (id, body) => {
  const user = await User.findByIdAndUpdate(id, body, {
    new: true,
  });
  return user;
};

const updateAvatar = async (id, avatarFile) => {
  await fs.rename(
    avatarFile.path,
    path.resolve("public/avatars", avatarFile.filename)
  );
  const user = await User.findByIdAndUpdate(
    id,
    { avatarURL: avatarFile.filename },
    {
      new: true,
    }
  );
  return user;
};
export default { register, login, logout, updSubscription, updateAvatar };
