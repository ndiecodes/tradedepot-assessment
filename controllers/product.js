const productService = require("../services/productService");
const { Response, ErrResponse } = require("../utils/response");

exports.create = async (req, res) => {
  try {
    const data = await productService.create(req.body, req.files, req.user);
    return Response({ res, data });
  } catch (error) {
    console.log(error);
    return ErrResponse({ res, error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await productService.getAll();
    return Response({ res, data });
  } catch (error) {
    console.log(error);
    return ErrResponse({ res, error });
  }
};
