const Joi = require("joi");
const { Error } = require("mongoose");

const User = require("../models/user");

// custom helper to check if email is unique

// const uniqueEmail = async (value, helpers) => {
//   const user = await User.findOne({ email: value });
//   console.log(helpers);
//   if (user != null) {
//     throw new Error("email already exists");
//   }
// };

validateRegister = async (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    address: Joi.string().required(),
    longitute: Joi.string().required(),
    latitude: Joi.string().required(),
  });

  const { error } = await schema.validateAsync(body);

  if (error) {
    return [true, error.details[0].message];
  }

  return [false, null];
};

module.exports = validateRegister;
