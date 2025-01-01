const db = require("../../config/db");
const sellerModal = require("../../models/sellerModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs =  require('fs');
const path = require('path');

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

module.exports.getSellerController  =   async (req,res)  => {
  try {
    const user = await sellerModal
      .findOne({ _id: req.user.id, is_active: 1 })
      .select("fullname brandname email gstin brandLogo contact address");

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
}

module.exports.updateSellerController = async (req, res) => {
  try {
    const user = await sellerModal.findOneAndUpdate(
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

    const user =  await sellerModal.findOne({_id: req.user.id , is_active: 1});
    if(!user){
      return res.status(500).json({ error: 'Server error while uploading file!' });
    }

    //removing  old brandlogo
    const oldPicturePath =  path.join(__dirname,'/uploads/brandLogo',user.brandLogo);
    if(fs.existsSync(oldPicturePath) && fs.unlinkSync(oldPicturePath)){
      console.log('file removed'); //remove picture form  directory
    } else{
      console.log('file not removed');
    }

    user.brandLogo = req.storedFileName;
    await  user.save();

    return res.status(200).json({ message: 'File uploaded successfully!' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error while uploading file!' });
  }
}