const db = require("../../config/db");
const userModal = require("../../models/userModal");
const productModal = require("../../models/productModal");
const orderModal = require("../../models/orderModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

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

module.exports.getUserCartAndWhislistController = async (req, res) => {
  try {
    const user = await userModal
      .findOne({ _id: req.user.id, is_active: 1 })
      .select("cart whislist")
      .populate({
        path: "cart",
        ref: "product",
      })
      .populate({
        path: "whislist",
        ref: "product",
      });
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

module.exports.uploadProfilePicController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File not provided or invalid!" });
    }

    const user = await userModal.findOne({ _id: req.user.id, is_active: 1 });

    if (!user) {
      return res
        .status(500)
        .json({ error: "Server error while uploading file!" });
    }

    // Removing old image from directory
    if (user.picture) {
      const oldPicturePath = path
        .resolve(
          process.cwd(),
          "../frontend/public/uploads/profilePic",
          user.picture
        )
        .trim();
      if (fs.existsSync(oldPicturePath)) {
        try {
          fs.unlinkSync(oldPicturePath);
        } catch (unlinkErr) {
          console.error("Error removing old file:", unlinkErr.message);
        }
      } else {
        console.log("Old file not found, skipping removal.");
      }
    }

    user.picture = req.storedFileName[0];
    await user.save();

    return res.status(200).json({ message: "File uploaded successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error while uploading file!" });
  }
};

module.exports.manageUserCartController = async (req, res) => {
  try {
    const { productId, type } = req.body;
    const user = await userModal.findOne({ _id: req.user.id, is_active: 1 });

    if (!user)
      return res
        .status(500)
        .send({ message: "Some Unexpected  Error  Occured", status: false });

    const product = await productModal.findOne({
      _id: productId,
      is_active: 1,
    });

    if (!product)
      return res
        .status(404)
        .send({ message: "Product Not Found", status: false });

    if (type == "add") {
      if (user.cart.includes(productId)) {
        return res
          .status(400)
          .send({ message: "Product Already In Cart", status: false });
      } else {
        user.cart.push(productId);
        await user.save();
      }
    } else if (type == "remove") {
      if (!user.cart.includes(productId)) {
        return res
          .status(400)
          .send({ message: "Product Not Found In Cart", status: false });
      } else {
        user.cart = user.cart.filter((id) => id != productId);
        await user.save();
      }
    } else {
      return res.status(400).send({ message: "Invalid Type", status: false });
    }

    return res
      .status(200)
      .send({ message: "Cart Updated Successfully", status: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal  Server Error", status: false });
  }
};

module.exports.manageUserWhislistController = async (req, res) => {
  try {
    const { productId, type } = req.body;

    const user = await userModal.findOne({ _id: req.user.id, is_active: 1 });

    if (!user)
      return res
        .status(500)
        .send({ message: "Some Unexpected  Error  Occured", status: false });

    const product = await productModal.findOne({
      _id: productId,
      is_active: 1,
    });

    if (!product)
      return res
        .status(404)
        .send({ message: "Product Not Found", status: false });

    if (type == "add") {
      if (user.whislist.includes(productId)) {
        return res
          .status(400)
          .send({ message: "Product Already In Whislist", status: false });
      } else {
        user.whislist.push(productId);
        await user.save();
      }
    } else if (type == "remove") {
      if (!user.whislist.includes(productId)) {
        return res
          .status(400)
          .send({ message: "Product Not Found In Whislist", status: false });
      } else {
        user.whislist = user.whislist.filter((id) => id != productId);
        await user.save();
      }
    } else {
      return res.status(400).send({ message: "Invalid Type", status: false });
    }

    return res
      .status(200)
      .send({ message: "Whislist Updated Successfully", status: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", status: false });
  }
};

module.exports.createUserOrderController = async (req, res) => {
  try {
    const { productId  , quantity } = req.body;

    const product = await productModal.findOne({ _id: productId, is_active: 1 });

    if (!product)
      return res
        .status(404)
        .send({ message: "Product  Not  Found", status: false });

    const user = await userModal.findOne({ _id: req.user.id, is_active: 1 });

    if (!user)
      return res
        .status(404)
        .send({ message: "User  Not  Found", status: false });

    const order = await orderModal.create({
      productId: productId,
      customerId:  user._id,
      sellerId: product.sellerId,
      amount: product.price  -  product.discount -  product.platformFee,
      quantity:  quantity,
    });

    if(!order)  return  res.status(500).send({message:  'Internal  Server  Error',status:  false});

    return  res.status(201).send({message:  "Order Placed  Successfully",status: true});

  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server  Error", status: false });
  }
};
