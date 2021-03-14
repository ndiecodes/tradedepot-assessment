const { Error } = require("mongoose");
const User = require("../models/user");
const Exception = require("../utils/exception");

exports.register = async (input) => {
  try {
    const user = new User();
    user.name = input.name;
    user.email = input.email;
    user.password = input.password;

    (user.location = {
      type: "Point",
      coordinates: [Number(input.longitute), Number(input.latitude)],
    }),
      await user.save();

    const token = user.getJWT();

    return { user, token };
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      field = Object.keys(err.keyValue)[0];
      let message = ` "${field}" already exists!`;

      throw new Exception(message, 422);
    }

    throw err;
  }
};

exports.login = async (input) => {
  const user = await User.findOne({ email: input.email });

  if (!user) throw new Exception("Invalid Email or Password", 401);

  if (!user.validPassword(input.password)) {
    throw new Exception("Invalid Email or Password", 401);
  }

  const token = user.getJWT();

  return { user, token };
};
