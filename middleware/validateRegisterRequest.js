const ValidateRegister = require("../validations/register");

validateRegisterRequest = async (req, res, next) => {
  const [err, message] = await ValidateRegister(req.body);

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
