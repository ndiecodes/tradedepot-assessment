const JWT = require("jsonwebtoken");
const User = require("../models/user");

const { ErrResponse } = require("../utils/response");
const Exception = require("../utils/exception");

const jwtSecret = process.env.JWT_SECRET;

auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Exception("Unauthenticated", 401);
    }
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = JWT.verify(token, jwtSecret);
    let user = await User.findById(decodedToken.userId);
    if (!user) throw new Exception("Unauthenticated", 401);
    req.user = user;
    next();
  } catch (error) {
    return ErrResponse({ res, error });
  }
};

module.exports = auth;
