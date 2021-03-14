const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let replySchema = Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
  },
});

module.exports = mongoose.model("Reply", replySchema);
