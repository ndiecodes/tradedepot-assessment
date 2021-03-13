const Joi = require("joi");

validateLogin = (body) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    return [true, error.details[0].message];
  }

  return [false, null];
};

module.exports = validateLogin;
