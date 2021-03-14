const User = require("../models/user");
const Product = require("../models/product");

const Storage = require("../utils/storage");

exports.create = async (input, files, user) => {
  const product = new Product();
  product.name = input.name;
  product.image = await Storage.streamUpload(files.image.data);
  product.user = user._id;

  await product.save();

  return product;
};

exports.getAll = async (input, files, user) => {
  const products = Product.find({});

  return products;
};
