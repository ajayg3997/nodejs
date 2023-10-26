const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    isAdmin: { type: Boolean, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique:true, match:/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/ },
    address: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema)