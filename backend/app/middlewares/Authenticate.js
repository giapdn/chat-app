import User from "../models/User.js";


const tokenCheck = (req, res, next) => {
  const token = req.headers.authorization;


  next();
};

export { tokenCheck };
