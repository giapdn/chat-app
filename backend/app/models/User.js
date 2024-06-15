import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  token: String,
  created_at: String,
  updated_at: String,
});

const User = mongoose.model("User", userSchema);

export default User;
