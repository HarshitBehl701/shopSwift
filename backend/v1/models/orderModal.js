const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
  },
  commentId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    }
  ],
  amount: Number,
  quantity: Number,
  rating: {
    type: Number,
    max: 5,
    min:  0,
    default: null
  },
  status: {
    type: String,
    enum: ["ordered" , "cancelled" , "processing", "out for delivery", "delivered"],
    default: "ordered",
  },
  is_active: {
    type:  Number,
    enum: [0,1],
    default: 1
  }
},{ timestamps: true });

module.exports = mongoose.model("order", orderSchema);
