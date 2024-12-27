const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  picture: Buffer,
  contact: Number,
  address: {
    type: String,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  whislist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  is_active: {
    type: Number,
    enum: [0,1],
    default: 1,
  },
});

module.exports = mongoose.model("user", userSchema);
