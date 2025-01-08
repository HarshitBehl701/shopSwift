const db = require("../../config/db");
const productModal = require("../../models/productModal");
const sellerModal = require("../../models/sellerModal");
const categoryModal = require("../../models/categoryModal");
const subCategoryModal = require("../../models/subCategoryModal");
const orderModal = require("../../models/orderModal");
const fs = require("fs");
const path = require("path");
const {formatDate} =   require('../../utils/formatDate')

module.exports.createProduct = async (req, res) => {
  try {
    const { name, category, subCategory, price, discount, description } =
      req.body;

    const seller = await sellerModal.findOne({ _id: req.user.id });
    if (!seller)
      return res.status(400).send({ message: "Access  Denied", status: false });

    if (!req.files || req.files.length === 0)
      return res
        .status(400)
        .send({ message: "At least one image is required", status: false });

    const categoryExists = await categoryModal.findOne({
      name: category,
      is_active: 1,
    });
    const subCategoryExists = await subCategoryModal.findOne({
      name: subCategory,
      is_active: 1,
    });

    if (
      (categoryExists &&
        subCategoryExists &&
        categoryExists.subCategory.includes(subCategoryExists._id)) == false
    )
      return res
        .status(400)
        .send({
          message: "Category  or Subcategory  is not valid",
          status: false,
        });

    const product = await productModal.create({
      name,
      sellerId: seller._id,
      category: categoryExists._id,
      sub_category: subCategoryExists._id,
      price,
      discount,
      description,
      image: req.storedFileName,
    });

    if (!product)
      return res
        .status(500)
        .send({ message: "Internal Server  Error", status: false });

    seller.products.push(product._id);
    await seller.save(); // saving  to seller object as well

    return res
      .status(201)
      .send({ message: "Product  Created  Successfully", status: true });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", status: false });
  }
};

module.exports.editProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      subCategory,  
      price,
      discount,
      description,
      files,
      deleteFiles,
    } = req.body;
    const { productId } = req.params;

    const decodeDeleteFiles  = JSON.parse(deleteFiles);


    //removing from directory
    decodeDeleteFiles.forEach((fileName)  => {
      const oldPicturePath = path
      .resolve(
        process.cwd(),
        "../frontend/public/uploads/other",
        fileName
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
    })
    

    const seller = await sellerModal.findOne({ _id: req.user.id });
    if (!seller)
      return res.status(400).send({ message: "Access  Denied", status: false });

    const categoryExists = await categoryModal.findOne({
      name: category,
      is_active: 1,
    });
    const subCategoryExists = await subCategoryModal.findOne({
      name: subCategory,
      is_active: 1,
    });

    if (
      (categoryExists &&
        subCategoryExists &&
        categoryExists.subCategory.includes(subCategoryExists._id)) == false
    )
      return res
        .status(400)
        .send({
          message: "Category  or Subcategory  is not valid",
          status: false,
        });


    const imageArray = (req.storedFileName) ?  [files,...req.storedFileName] : [files];
    const newImageArray  =   imageArray.flat();

    const product = await productModal.findOneAndUpdate({_id:productId ,  sellerId: seller._id},{
      name,
      category:  categoryExists._id,
      sub_category: subCategoryExists._id,
      price,
      discount,
      description,
      image:  newImageArray,
    });

    if (!product)
      return res
    .status(500)
    .send({ message: "Internal Server  Error", status: false });
    
    return res
    .status(201)
    .send({ message: "Product  Edited  Successfully", status: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal Server Error", status: false });
  }
};

module.exports.getAllProducts = async (_, res) => {
  try {
    const products = await productModal
      .find({ is_active: 1 })
      .populate({
        path: "sellerId",
        select: "brandname",
      })
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "sub_category",
        select: "name",
      });

    if (!products || products.length == 0) {
      return res.status(500).send({
        message: "Internal Server Error or Resource Not  Found",
        status: false,
      });
    }

    const requiredProducts = products.map((product) => {
      return {
        productId: product._id,
        name: product.name,
        image: product.image,
        brandName: product.sellerId.brandname,
        category: product.category.name,
        subCategory: product.sub_category.name,
        price: product.price,
        discount: product.discount,
        platformFee: product.platformFee,
        description: product.description,
        views: product.views,
        rating: product.average_rating,
        number_of_customer_rate: product.number_of_user_give_rating,
        status: product.is_active ? "Active" : "Inactive",
      };
    });

    return res
      .status(200)
      .send({
        message: "Resource  Found",
        status: true,
        data: requiredProducts,
      });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", status: false });
  }
};

module.exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    const response = await productModal
      .findOne({ _id: productId, is_active: 1 })
      .populate({
        path: "sellerId",
        select: "brandname brandLogo",
      })
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "sub_category",
        select: "name",
      });

    if (!response)
      return res
        .status(500)
        .send({ message: "Internal Server Error", status: false });

    const product = {
      productId: response._id,
      name: response.name,
      image: response.image,
      brandName: response.sellerId.brandname,
      brandLogo: response.sellerId.brandLogo,
      category: response.category.name,
      subCategory: response.sub_category.name,
      price: response.price,
      discount: response.discount,
      platformFee: response.platformFee,
      description: response.description,
      rating: response.average_rating,
      customer_rate: response.num_of_user_give_rating,
    };

    return res
      .status(200)
      .send({ message: "Resource Found", status: true, data: product });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server  Error", status: false });
  }
};

module.exports.getSellerProducts = async (req, res) => {
  try {
    //verifying seller   identity
    const seller = await sellerModal.findOne({
      _id: req.user.id,
      is_active: 1,
    });

    if (!seller)
      return res.status(400).send({ message: "Access Denied", status: false });

    const { type } = req.params;

    let productCondition = undefined;

    if (type == "live_products") {
      productCondition = { sellerId: req.user.id, is_active: 1 };
    } else if (type == "all_products") {
      productCondition = { sellerId: req.user.id };
    } else if (type == "product_detail") {
      productCondition = { sellerId: req.user.id, _id: req.body.productId };
    }

    const products = await productModal
      .find(productCondition)
      .populate({
        path: "sellerId",
        select: "brandname",
      })
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "sub_category",
        select: "name",
      });

    if (!products || products.length == 0)
      return res
        .status(500)
        .send({ message: "Internal Server Error", status: false });

    const requiredProducts = products.map((product) => {
      return {
        productId: product._id,
        name: product.name,
        image: product.image,
        brandName: product.sellerId.brandname,
        category: product.category.name,
        subCategory: product.sub_category.name,
        price: product.price,
        discount: product.discount,
        platformFee: product.platformFee,
        description: product.description,
        views: product.views,
        rating: product.average_rating,
        number_of_customer_rate: product.number_of_user_give_rating,
        status: product.is_active ? "Active" : "Inactive",
      };
    });

    return res
      .status(200)
      .send({
        message: "Resource Found",
        status: true,
        data: requiredProducts,
      });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", status: false });
  }
};

module.exports.getSellerOrders = async (req,res) => {
  try {
    //verifying seller   identity
    const seller = await sellerModal.findOne({
      _id: req.user.id,
      is_active: 1,
    });

    if (!seller)
      return res.status(400).send({ message: "Access Denied", status: false });

    const requestData = await orderModal.find({sellerId: seller._id}).populate({
      path: "productId"
    });

    const orders  =  requestData.map((data)  => ({
      id: data._id,
      order_date: formatDate(data.createdAt),
      quantity: data.quantity,
      rating: data.rating,
      status: data.status,
      amount:  data.amount,
      product: data.productId
    }))
    
    return res
      .status(200)
      .send({
        message: "Resource Found",
        status: true,
        data: orders,
      });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", status: false });
  }
}


module.exports.updateStatusProductController = async (req, res) => {
  try {
    const { productId, currentStatus } = req.body;

    const seller = await sellerModal.findOne({
      _id: req.user.id,
      is_active: 1,
    });

    if (!seller)
      return res.status(400).send({ message: "Access Denied", status: false });

    const product = await productModal.findOne({
      _id: productId,
      sellerId: req.user.id,
    });

    if (!product)
      return res
        .status(400)
        .send({ message: "Product Not Found", status: false });

    if (currentStatus == 1) {
      product.is_active = 0;
    } else if (currentStatus == 0) {
      product.is_active = 1;
    }

    await product.save();

    return res
      .status(200)
      .send({ message: "Product Status Updated Successfully", status: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server  Error", status: false });
  }
};

module.exports.updateProductViewAndRatingController = async (req, res) => {
  try {
    const { productId, action } = req.body;

    const product = await productModal.findOne({
      _id: productId,
      is_active: 1,
    });

    if (!product)
      return res
        .status(400)
        .send({ message: "Product Not Found", status: false });

    if (action == "add_view") {
      product.views = product.views + 1;
      await product.save();
    } else if (action == "update_rating") {
      const { rating } = req.body;
      product.number_of_user_give_rating =
        product.number_of_user_give_rating + 1;
      product.rating_sum = product.rating_sum + rating;
      product.average_rating =
        product.rating_sum / product.number_of_user_give_rating;
      await product.save();
    } else {
      return res.status(400).send({ message: "Invalid Action", status: false });
    }

    return res
      .status(200)
      .send({ message: "Product Updated Successfully", status: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", status: false });
  }
};
