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
    type: mongoose.Schema.Types.ObjectId,
    ref: "category"
  },
  sub_category: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "subCategory"
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
  num_of_user_give_rating:  {
    type:  Number,
    default: 0
  },
  rating_sum:  {
    type:  Number,
    default: 0
  },
  average_rating:  {
    type:  Number,
    default: 0
  },
  commentId: [
    {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "comment"
    }
  ],
  is_active: {
    type: Number,
    enum: [0,1],
    default: 0,
  },
});

module.exports = mongoose.model("product", productSchema);
