const userService = require("../services/userService");
const { Response, ErrResponse } = require("../utils/response");
exports.register = async (req, res) => {
  try {
    const data = await userService.register(req.body);
    return Response({ res, code: 201, data });
  } catch (error) {
    return ErrResponse({ res, error });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await userService.login(req.body);
    return Response({ res, data });
  } catch (error) {
    return ErrResponse({ res, error });
  }
};
