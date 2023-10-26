const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId:{type:String, require:true},
    restaurantId: { type: String, required: true },
    productName: { type: String, required: true, unique: true },
    productPrice: { type: String, required: true },
    productDec: { type: String, required: true },
    productImg: { type: String, required:true}
});

module.exports = mongoose.model('Product', productSchema)