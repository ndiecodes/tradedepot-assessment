const validateCommentReply = require("../validations/createCommentReply");

validateCommentReplyRequest = (req, res, next) => {
  const [err, message] = validateCommentReply(req.body);

  if (err) {
    const errorData = {
      message: message,
      status: "error",
      data: null,
    };

    return res.status(422).json(errorData);
  }

  return next();
};

module.exports = validateCommentReplyRequest;
