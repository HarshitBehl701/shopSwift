const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  image: Buffer,
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  price: Number,
  discount: Number,
  platformFee: {
    type: Number,
    default: 0,
  },
  description: String,
  views: Number,
  rating:  {
    type:  Number,
    max: 5,
    min:  0,
    default: 0
  },
  is_active: {
    type: Number,
    enum: [0,1],
    default: 0,
  },
});

module.exports = mongoose.model("product", productSchema);
