const  mongoose  = require('mongoose');

const categorySchema =   mongoose.Schema({
    name: String,
    image:  String,
    subCategory:  [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'subCategory'
        }
    ],
    is_active: {
        type:  Number,
        enum: [1,0],
        default: 0,
    }

});

module.exports  =  mongoose.model('category',categorySchema);