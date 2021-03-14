const { Error } = require("mongoose");
const User = require("../models/user");
const Exception = require("../utils/exception");

exports.register = async (input) => {
  const user = new User();
  user.name = input.name;
  user.email = input.email;
  user.password = input.password;
  await user.save();

  const token = user.getJWT();

  return { user, token };
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

