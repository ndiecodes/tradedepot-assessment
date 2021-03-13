var express = require("express");
var router = express.Router();

/* Import Controllers && Middleware*/
const controllers = require("../controllers");

const middleware = require("../middleware");

/* Define all your routes*/

router.post(
  "/register",
  middleware.validateRegisterRequest,
  controllers.auth.register
);

router.post("/login", middleware.validateLoginRequest, controllers.auth.login);

/*Export your routes*/
module.exports = router;
