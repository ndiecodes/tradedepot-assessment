const Joi = require("joi");

createCommentReply = (body) => {
  const schema = Joi.object({
    body: Joi.string().required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    return [true, error.details[0].message];
  }

  return [false, null];
};

module.exports = createCommentReply;
