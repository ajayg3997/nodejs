const mongoose = require('mongoose');
const restaurantSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: String, required: true },
    restaurantName: { type: String, required: true, unique:true },
    restaurantAddress: { type: String, required: true }
});

module.exports = mongoose.model('Restaurant', restaurantSchema)