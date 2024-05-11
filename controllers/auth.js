import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    console.log(oldUser);
    if (oldUser) throw HttpError(409, "Email in use");

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: passwordHash,
    });
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(201).json({
      status: "created",
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw HttpError(401, "Email or password is incorrect");
    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (passwordIsMatch === false)
      throw HttpError(401, "Email or password is incorrect");

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });

    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      status: "success",
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updSubscription = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
export { register, login, logout, current, updSubscription };
