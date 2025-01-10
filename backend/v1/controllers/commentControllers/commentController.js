const  commentModal  =  require('../../models/commentModal');
const orderModal  = require('../../models/orderModal')
const  userModal = require('../../models/userModal')
const  sellerModal = require('../../models/sellerModal')
const productModal = require('../../models/productModal');

module.exports.createCommentController  = async (req,res) => {
    try{
        const {comment} =  req.body;
        const {productId,orderId} =  req.params;

        const user  = await userModal.findOne({_id:req.user.id,is_active:1});

        if(!user)
            return res.status(404).send({message:  "User Not  Found",status:false});

        const product  = await productModal.findOne({_id:productId,is_active:1});

        if(!product)
            return  res.status(404).send({message: "Product Not Found",status:false});

        const  order = await orderModal.findOne({_id:orderId,productId:product._id,customerId:user._id,is_active:1});

        if(!order)
            return res.status(404).send({message: "Order NOt  Found",status:false});

        const createComment  = await  commentModal.create({
            productId: product._id,
            customerId:  user._id,
            orderId:  order._id,
            comment:comment
        });

        product.commentId.push(createComment._id);
        await   product.save();

        order.commentId.push(createComment._id);
        await order.save();
        
        return res.status(201).send({message:  "Comment  Created  Successfully",status:true});

    }catch(error){
        return res.status(500).send({message: "Internal  Server Error",status:false});
    }
}

module.exports.changeCommentStatusController  = async  (req,res) => {
    try{
        const {status,commentId} =  req.body;
        const {productId,orderId} =  req.params;

        const user = await sellerModal.findOne({_id:req.user.id,is_active:1});

        if(!user)
            return res.status(400).send({message: "Seller Not Found",status:false});

        const product =  await productModal.findOne({_id:productId,sellerId:user._id,is_active:1});

        if(!product)
            return res.status(400).send({message: "Product Not Found",status:false});

        const order =  await orderModal.findOne({_id:orderId,sellerId:user._id,productId:product._id,is_active:1});

        if(!order)
            return res.status(400).send({message: "Order Not Found",status:false});

        const comment = await commentModal.findOne({_id:commentId,productId:product._id,orderId:order._id});

        if(!comment)
            return res.status(400).send({message: "Comment Not Found",status:false});

        const  newStatus = (status  ==  'hide')  ? 0 : 1;

        comment.is_active  = newStatus;
        await  comment.save();

        return  res.status(200).send({message:"Status  Changed Successfully",status:true});

    }catch(error){
        return res.status(500).send({message: "Internal Server Error",status:false});
    }
}