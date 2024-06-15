import User from "../../app/models/User.js";

const index = async () => {
  try {
    return await User.find();
  } catch (error) {
    console.error(error);
    throw new Error("Err when fetching data");
  }
};

const show = async (id) => {
  try {
    const user = await User.findById(id);
    if (user != null) {
      return user;
    } else {
      return "Not Found";
    }
  } catch (error) {
    return error;
  }
};

const store = async (user) => {
  const now = new Date();
  const created_time = now.toISOString();
  const newUser = new User({
    ...user,
    token: "",
    created_at: created_time,
    updated_at: "",
  });

  try {
    await newUser.save();
  } catch (error) {
    throw new Error("Err !");
  }
};

export { index, show, store };
