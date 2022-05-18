const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentSchema = new Schema({
    userId: { type: ObjectId,required: true},
    bookId: { type: ObjectId, required: true },
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    rentAmount: {type: Number, required: true}
}, {
    timestamps: true,
});

const Rent = mongoose.model('Rent', rentSchema);

module.exports = Rent;