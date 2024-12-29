const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema({
  fullname: String,
  email: String,
  brandname: String,
  password:String,
  gstin: String,
  brandLogo: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  contact: String,
  address: String,
  rating:{
    type:  Number,
    max: 5,
    min:  0,
    default:  0
  },
  is_active: {
    type: Number,
    enum: [0,1],
    default: 1,
  },
});

module.exports = mongoose.model("seller", sellerSchema);
