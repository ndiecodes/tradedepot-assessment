const validateCreateProduct = require("../validations/createProduct");

validateCreateProductRequest = (req, res, next) => {
  let [err, message] = validateCreateProduct(req.body);

  if (err) {
    const errorData = {
      message,
      status: "error",
      data: null,
    };

    return res.status(422).json(errorData);
  }

  // Validate Files
  if (!req.files || !req.files.image) {
    message = '"image" is required';
    const errorData = {
      message: message,
      status: "error",
      data: null,
    };

    return res.status(422).json(errorData);
  }
  return next();
};

module.exports = validateCreateProductRequest;
