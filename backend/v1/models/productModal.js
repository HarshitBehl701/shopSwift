const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  image: [
    {type:String}
  ],
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
  },
  category: {
    type: String,
    enum:  ['electronics','clothing','shoes','accessories','baby','furniture','home-decor'],
  },
  price: {
    type: Number,
    min: 0,
  },
  discount: {
    type: Number,
    min: 0,
  },
  platformFee: {
    type: Number,
    min: 0,
    default: 0,
  },
  description: String,
  views: {
    type: Number,
    min: 0,
    default: 0
  },
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
