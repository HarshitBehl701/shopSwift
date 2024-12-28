const db = require("../../config/db");
const sellerModal = require("../../models/sellerModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.sellerRegistration = async (req, res) => {
  try {
    const { fullname, email, brandname, password } = req.body;

    const sellerExists = await  sellerModal.findOne({ email: email });

    if (sellerExists)
      return res
        .status(409)
        .send({ message: "Seller Already  Exists", status: true });

    const hashPassword = await bcrypt.hash(password, 10);

    const seller = await sellerModal.create({
      fullname,
      email,
      brandname,
      password: hashPassword,
    });

    if (!seller)
      return res
        .status(500)
        .send({ message: "Internal Server Error", status: false });

    return res
      .status(201)
      .send({ message: "Seller  Account  Created Successfully", status: true });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", status: false });
  }
};

module.exports.sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await sellerModal.findOne({ email: email });

    if (!seller)
      return res
        .status(404)
        .send({ message: "Email Or  Password  Is Incorrect", status: false });

    const passwordVerify = await bcrypt.compare(password, seller.password);

    if (!passwordVerify)
      return res
        .status(404)
        .send({ message: "Email Or  Password  Is Incorrect", status: false });

    const token = await jwt.sign(
      { id: seller._id},
      process.env.SECRET
    );

    return res
      .status(200)
      .send({ message: "Login  Successfull", status: true, token: token });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", status: false });
  }
};
