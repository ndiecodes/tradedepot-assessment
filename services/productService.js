const User = require("../models/user");
const Product = require("../models/product");
const Comment = require("../models/Comment");
const Reply = require("../models/Reply");
const Storage = require("../utils/storage");
const Exception = require("../utils/exception");

const Mail = require("node-mail-helper");
const path = require("path");

const maxDistance = 10 * 1609.344; // 10 mile radius

exports.create = async (input, files, user) => {
  const product = new Product();
  product.name = input.name;
  product.image = await Storage.streamUpload(files.image.data);
  product.user = user._id;
  product.location = user.location;

  await product.save();

  return product;
};

exports.getAllByLocation = async (user) => {
  const coordinates = user.location.coordinates;
  const products = Product.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: coordinates,
        },
        $maxDistance: maxDistance,
      },
    },
  });

  return products;
};

exports.createProductComment = async (params, input, user) => {
  const product = await Product.findOne({ _id: params.productId });
  if (!product) {
    throw new Exception("Product Not found", 404);
  }
  const comment = new Comment();
  comment.body = input.body;
  comment.product = product._id;

  comment.user = user.id;

  await comment.save();

  return comment;
};

exports.getProductComments = async (params) => {
  const comments = await Comment.find({ product: params.productId }).populate(
    "user"
  );
  return comments;
};

exports.createProductReply = async (params, input, user) => {
  const product = await Product.findOne({ _id: params.productId });
  if (!product) {
    throw new Exception("Product Not found", 404);
  }
  const comment = await Comment.findOne({ product: product._id }).populate(
    "user"
  );
  if (!comment) {
    throw new Exception("Comment Not found", 404);
  }

  const reply = new Reply();
  reply.body = input.body;
  reply.comment = comment._id;

  reply.user = user.id;

  await reply.save();

  const mailData = {
    name: user.name,
  };

  const templatePath = path.join(__dirname, "../emails/reply.ejs");

  const mail = new Mail();
  await mail
    .to(comment.user.email)
    .template(templatePath)
    .subject(`You have a new reply`)
    .data(mailData)
    .send();

  return reply;
};

exports.getProductCommentReplies = async (params, input, user) => {
  const comments = await Reply.find({ comment: params.commentId }).populate(
    "user"
  );
  return comments;
};
