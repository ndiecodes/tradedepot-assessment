const User = require("../models/user");
const Product = require("../models/product");
const Comment = require("../models/Comment");
const Reply = require("../models/Reply");
const Storage = require("../utils/storage");

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

exports.getAll = async (user) => {
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
  const comment = new Comment();
  comment.body = input.body;
  comment.product = params.productId;

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
  const reply = new Reply();
  reply.body = input.body;
  reply.comment = params.commentId;

  reply.user = user.id;

  await reply.save();

  return reply;
};

exports.getProductCommentReplies = async (params, input, user) => {
  const comments = await Reply.find({ comment: params.commentId }).populate(
    "user"
  );
  return comments;
};
