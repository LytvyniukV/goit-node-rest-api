import HttpError from "../helpers/HttpError.js";
import path from "node:path";
import services from "../services/users.js";
const register = async (req, res) => {
  const user = await services.register(req.body);

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
      avatar: user.avatar,
    },
  });
};

const login = async (req, res) => {
  const user = await services.login(req.body);

  res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  await services.logout(req.user.id);
  res.status(204).end();
};

const current = async (req, res) => {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
    avatar: req.user.avatarURL,
  });
};

const updSubscription = async (req, res) => {
  const user = services.updSubscription(req.user.id, req.body);
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const getAvatar = async (req, res) => {
  if (!req.user.avatarURL) throw HttpError(404, "Avatar not found");

  res.sendFile(path.resolve("public/avatars", req.user.avatarURL));
};

const updateAvatar = async (req, res) => {
  const user = await services.updateAvatar(req.user.id, req.file);

  res.status(200).json({
    user: {
      email: user.email,
      subscription: user.subscription,
      avatar: user.avatarURL,
    },
  });
};

const verify = async (req, res) => {
  await services.verify(req.params.verificationToken);

  res.status(200).send({ message: "Verification successfully" });
};

const extraVerify = async (req, res) => {
  await services.extraVerify(req.body);

  res.status(200).send({ message: "Verification email sent" });
};
export default {
  register,
  login,
  logout,
  current,
  updSubscription,
  getAvatar,
  updateAvatar,
  verify,
  extraVerify,
};
