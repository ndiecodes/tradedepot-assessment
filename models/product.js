const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = Schema({
  name: String,
  image: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: "2dsphere",
      default: [],
    },
  },
});

productSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Product", productSchema);
