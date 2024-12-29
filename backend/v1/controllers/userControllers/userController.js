const db = require("../../config/db");
const userModal = require("../../models/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs =  require('fs');
const path = require('path');

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

    const token = await jwt.sign({ id: user._id }, process.env.SECRET);

    return res
      .status(200)
      .send({ message: "Login Success", status: true, token: token });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server  Error", status: false });
  }
};

module.exports.getUserController = async (req, res) => {
  try {
    const user = await userModal
      .findOne({ _id: req.user.id, is_active: 1 })
      .select("name email picture contact address");

    if (!user)
      return res
        .status(404)
        .send({ message: "User  Not Found", status: false });

    return res
      .status(200)
      .send({ message: "User  Found", status: true, data: user });
  } catch (err) {
    return res
      .status(500)
      .send({ messaage: "Internal  Server Error", status: false });
  }
};

module.exports.updateUserController = async (req, res) => {
  try {
    const user = await userModal.findOneAndUpdate(
      { _id: req.user.id, is_active: 1 },
      { ...req.body },
      { new: true }
    );

    if (!user)
      return res
        .status(404)
        .send({ message: "User Not  Found", status: false });

    return res
      .status(200)
      .send({ message: "user updated successfully", status: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal  Server  Error", status: false });
  }
};

module.exports.uploadProfilePicController = async (req,res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File not provided or invalid!' });
    }

    const user =  await userModal.findOne({_id: req.user.id , is_active: 1});
    const previousImage =  user.picture; //for  deleting previous profile picture from the disk
    user.picture = req.storedFileName;
    await user.save();
    if (previousImage) {
      const previousImagePath = path.join(__dirname, '../../../../frontend/public/uploads/profilePic', previousImage);
      fs.unlink(previousImagePath, (err) => {
        if (err) {
          console.error('Error deleting the previous file:', err);
        }
      });
    }

    if(!user){
      return res.status(500).json({ error: 'Server error while uploading file!' });
    }

    return res.status(200).json({ message: 'File uploaded successfully!', file: req.file });
  } catch (err) {
    return res.status(500).json({ error: 'Server error while uploading file!' });
  }
}