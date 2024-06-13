import User from "../models/User.model.js";

const loginHandle = (req, res, next) => {};

const registerHandle = (req, res, next) => {
  const isUserExist = User.findOne({ email: req.body.email });

  if (isUserExist) {
    res.json().send({ message: isUserExist });
  }
  next();
};

export { registerHandle };
