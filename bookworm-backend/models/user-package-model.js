const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPackageSchema = new Schema({
    userId: { type: ObjectId,required: true},
    packageId: { type: ObjectId, required: true }
}, {
    timestamps: true,
});

const UserPackage = mongoose.model('UserPackage', userPackageSchema);

module.exports = UserPackage;