const ValidateRegister = require("../validations/register");

validateRegisterRequest = (req, res, next) => {
  const [err, message] = ValidateRegister(req.body);

  if (err) {
    const errorData = {
      message: message,
      status: "error",
      data: null,
    };

    return res.status(400).json(errorData);
  }

  return next();
};

module.exports = validateRegisterRequest;
