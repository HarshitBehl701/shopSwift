const db = require("../../config/db");
const productModal = require("../../models/productModal");
const sellerModal = require("../../models/sellerModal");

module.exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, discount, description } = req.body;

    const seller = await sellerModal.findOne({ _id: req.user.id });

    if (!seller)
      return res.status(400).send({ message: "Access  Denied", status: false });

    const product = await productModal.create({
      name,
      sellerId: seller._id,
      category,
      price,
      discount,
      description,
    });

    if (!product)
      return res
        .status(500)
        .send({ message: "Internal Server  Error", status: false });

    return res
      .status(201)
      .send({ message: "Product  Created  Successfully", status: true });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", status: false });
  }
};

module.exports.getAllProducts = async (_, res) => {
  try {
    const products = await productModal.find({ is_active: 1 }).populate({
      path: "sellerId",
      select: "brandname",
    });

    if (!products || products.length == 0)
      return res
        .status(500)
        .send({
          message: "Internal Server Error or Resource Not  Found",
          status: false,
        });

    return res
      .status(200)
      .send({ message: "Resource  Found", status: true, data: products });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", status: false });
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModal
      .findOne({ _id: productId, is_active: 1 })
      .populate({
        path: "sellerId",
        select: "brandname",
      });

    if (!product || product.length == 0)
      return res
        .status(500)
        .send({ message: "Internal Server Error", status: false });

    return res
      .status(200)
      .send({ message: "Resource Found", status: true, data: product });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", status: false });
  }
};
