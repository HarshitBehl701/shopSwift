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
  amount: Number,
  rating: {
    type: Number,
    max: 5,
    min:  0,
    default: 0
  },
  status: {
    type: String,
    enum: ["ordered" , "canceled" , "pending", "out for delivery", "delivered"],
    default: "ordered",
  },
});

module.exports = mongoose.model("order", orderSchema);
