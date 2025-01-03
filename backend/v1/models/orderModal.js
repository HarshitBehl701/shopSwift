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
  quantity: Number,
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
  is_active: {
    type:  Number,
    enum: [0,1],
    default: 1
  }
},{ timestamps: true });

module.exports = mongoose.model("order", orderSchema);
