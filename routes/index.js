var express = require("express");
var router = express.Router();

/* Import Controllers && Middleware*/
const controllers = require("../controllers");

const middleware = require("../middleware");

/* Define all your routes*/

//Auth Routes
router.post(
  "/register",
  middleware.validateRegisterRequest,
  controllers.auth.register
);

router.post("/login", middleware.validateLoginRequest, controllers.auth.login);

//Product Routes
router.post(
  "/products",
  middleware.auth,
  middleware.validateCreateProductRequest,
  controllers.product.create
);

router.get("/products", middleware.auth, controllers.product.getAll);

router.post(
  "/products/:productId/comments",
  middleware.auth,
  middleware.validateCommentReplyRequest,
  controllers.product.createProductComment
);

router.get(
  "/products/:productId/comments",
  middleware.auth,
  controllers.product.getProductComments
);

router.post(
  "/products/:productId/comments/:commentId/replies",
  middleware.auth,
  middleware.validateCommentReplyRequest,
  controllers.product.createProductReply
);

router.get(
  "/products/:productId/comments/:commentId/replies",
  middleware.auth,
  middleware.validateCommentReplyRequest,
  controllers.product.getProductCommentReplies
);

/*Export your routes*/
module.exports = router;
