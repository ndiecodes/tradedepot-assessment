const validateLogin = require("../validations/login");

validateLoginRequest = (req, res, next) => {
  const [err, message] = validateLogin(req.body);

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

module.exports = validateLoginRequest;
