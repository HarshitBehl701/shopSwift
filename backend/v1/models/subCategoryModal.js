const mongoose = require('mongoose');

const subCategorySchema  = mongoose.Schema({
    name: String,
    category:  {
        type: mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    is_active: {
        type: Number,
        enum: [0,1],
        default: 0,
    }
})

module.exports  = mongoose.model('subCategory',subCategorySchema);