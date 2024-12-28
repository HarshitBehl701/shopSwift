const db = require("../../config/db");
const userModal = require("../../models/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await userModal.findOne({ email: email });

    if (userExists)
      return res
        .status(409)
        .send({ message: "user already  found", status: true });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModal.create({
      name,
      email,
      password: hashPassword,
    });

    if (!user)
      return res
        .status(500)
        .send({ message: "Internal Server Error", status: false });

    return res
      .status(201)
      .send({ message: "User  Registered Successfully", status: true });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server  Error", status: false });
  }
};

module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModal.findOne({ email: email });

    if (!user)
      return res
        .status(404)
        .send({ message: "Email  Or  Password   Is    Incorrect" });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res
        .status(404)
        .send({ message: "Email  Or  Password   Is    Incorrect" });

    const token = await jwt.sign(
      { id: user._id},
      process.env.SECRET
    );

    return res
      .status(200)
      .send({ message: "Login Success", status: true, token: token });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server  Error", status: false });
  }
};
