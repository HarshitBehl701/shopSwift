const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    productId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'product'
    },
    customerId:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    orderId:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    comment: {
        type: String
    },is_active: {
        type:  Number,
        enum: [1,0],
        default: 1,
    }
},{ timestamps: true })

module.exports  = mongoose.model('comment',commentSchema);