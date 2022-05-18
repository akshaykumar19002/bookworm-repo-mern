const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({
    packageName: { type: String, required: true },
    noOfDays: { type: Number, required: true },
    lendAmount: { type: Number, required: true },
    noOfBooks: { type: Number, required: true },
    userId: { type: ObjectId, required: true },
    endDate: { type: Date, requierd: true}
}, {
    timestamps: true,
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;