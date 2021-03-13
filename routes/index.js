var express = require("express");
var router = express.Router();

/* Import Controllers*/
const controllers = require("../controllers");

/* Define all your routes*/

router.post("/register", controllers.auth.register);
// router.post("/login", controllers.auth.login);

/*Export your routes*/
module.exports = router;
