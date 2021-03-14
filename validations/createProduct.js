const Joi = require("joi");

validateCreateProduct = (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    return [true, error.details[0].message];
  }

  return [false, null];
};

module.exports = validateCreateProduct;
