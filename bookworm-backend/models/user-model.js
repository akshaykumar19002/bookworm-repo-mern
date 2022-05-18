const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    emailId: {type: String,required: true},
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    occupation: { type: String, required: false },
    professionalDomain: { type: String, required: false },
    contact: { type: Number, required: true },
    address: { type: String, required: false },
    userType: { type: Number, required: true },
    img:{data: Buffer, contentType: String }
}, {
    timestamps: true,
});

const User = mongoose.model('Users', userSchema);

module.exports = User;