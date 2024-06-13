import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const now = new Date();
  const created_at = now.toISOString();
  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
    token: "",
    created_at: created_at,
    updated_at: "",
  });
  try {
    await newUser.save();
    res.send({ message: "ok" });
  } catch (error) {
    res.status(400).send({ message: "failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) return res.send({ message: "Not found" });
  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.send({ message: "password invalid" });

  const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1m",
  });

  return res
    .status(200)
    .cookie("token", token, { maxAge: 60000 })
    .send({ token });
};
