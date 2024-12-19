import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  // salt a random value

  req.body.password = await hashPassword(req.body.password);

  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user"; // first acc. always user

  const user = await User.create(req.body); // validation layer will be added on the top
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");
  // jwt
  const token = createJWT({ userId: user._id, role: user.role });

  // http coookie
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //const oneDay = 1000 * 60 * 60 * 24;

    secure: process.env.NODE_ENV === "production",
  });

  res.json({ token });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
