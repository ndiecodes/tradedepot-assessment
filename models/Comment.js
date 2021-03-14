const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
