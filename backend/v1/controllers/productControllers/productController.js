const db = require("../../config/db");
const productModal = require("../../models/productModal");
const sellerModal = require("../../models/sellerModal");

module.exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, discount, description } = req.body;

    const seller = await sellerModal.findOne({ _id: req.user.id });

    if (!seller)
      return res.status(400).send({ message: "Access  Denied", status: false });

    if (!req.files || req.files.length === 0)
      return res
        .status(400)
        .send({ message: "At least one image is required", status: false });

    const product = await productModal.create({
      name,
      sellerId: seller._id,
      category,
      price,
      discount,
      description,
      image:  req.storedFileName,
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


module.exports.getProductDetails  =  async  (req,res)  => {
  try{
    const  {productId} =  req.params;
    
    const response = await productModal
    .findOne({ _id: productId, is_active: 1 })
    .populate({
      path: 'sellerId', 
      select: 'brandname brandLogo'
    });
  

    if(!response)
      return  res.status(500).send({message:   "Internal Server  Error",status: false});
    
    const product = {
      name:  response.name,
      image: response.image,
      brandName: response.sellerId.brandname,
      brandLogo: response.sellerId.brandLogo,
      category: response.category,
      price: response.price,
      discount: response.discount,
      platformFee: response.platformFee,
      description: response.description,
      views: response.views,
      rating: response.rating,
    }

    return  res.status(200).send({message: "Resource Found",status: true,data: product});

  }catch(error){
    return  res.status(500).send({message:   "Internal Server  Error",status: false});
  }
}

module.exports.getSellerProducts = async (req, res) => {
  try {
    //verifying seller   identity
    const seller = await sellerModal.findOne({ _id: req.user.id , is_active: 1 });

    if(!seller)
      return res.status(400).send({ message: "Access Denied", status: false });

    const  {type} = req.params;

    let productCondition  =  undefined;

    if(type == 'live_products'){
      productCondition = { sellerId: req.user.id , is_active: 1 };
    }else  if(type =='all_products'){
      productCondition = { sellerId: req.user.id }; 
    }else   if(type   == 'product_detail'){
      productCondition  = { sellerId: req.user.id , _id: req.body.productId};
    }

    const products = await productModal
      .find(productCondition)
      .populate({
        path: "sellerId",
        select: "brandname",
      });


    if (!products || products.length == 0)
      return res
        .status(500)
        .send({ message: "Internal Server Error", status: false });

    const requiredProducts =  products.map((product) =>{
      return {
        productId: product._id,
        name: product.name,
        image: product.image,
        brandName: product.sellerId.brandname,
        category: product.category,
        price: product.price,
        discount: product.discount,
        platformFee: product.platformFee,
        description: product.description,
        views: product.views,
        rating: product.rating,
        status: (product.is_active)  ? 'Active' : 'Inactive', 
      }
    })


    return res
      .status(200)
      .send({ message: "Resource Found", status: true, data: requiredProducts });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", status: false });
  }
};

module.exports.updateStatusProductController =  async (req,res) => {
  try{
    const {productId,currentStatus} =  req.body;

    const seller = await  sellerModal.findOne({_id:  req.user.id,is_active:  1});

    if(!seller)
      return  res.status(400).send({message: "Access Denied",status:false});

    const product = await productModal.findOne({_id: productId,sellerId: req.user.id});

    if(!product)
      return  res.status(400).send({message: "Product Not Found",status:false});

    if(currentStatus ==  1){
      product.is_active = 0;
    }else  if(currentStatus ==  0){
      product.is_active = 1;
    }

    await  product.save();
    
    return  res.status(200).send({message: "Product Status Updated Successfully",status:true});

  }catch(error){
    return  res.status(500).send({message: "Internal Server  Error",status:false});
  }
}