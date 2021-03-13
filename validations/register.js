const Joi = require("joi");

const User = require("../models/user");

// custom helper to check if email is unique
function uniqueEmail(value, helpers) {
  const user = User.findOne({ email: value });
  if (!user) {
    return true;
  }
  return helpers.message('"email" already exists!');
}

validateRegister = (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().custom(uniqueEmail).required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    return [true, error.details[0].message];
  }

  return [false, null];
};

module.exports = validateRegister;
