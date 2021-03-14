const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = Schema({
  name: String,
  image: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("Product", productSchema);
