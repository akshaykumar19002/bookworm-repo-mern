const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shelfSchema = new Schema({
    userId: { type: ObjectId,required: true},
    bookId: { type: ObjectId, required: true }
}, {
    timestamps: true,
});

const Shelf = mongoose.model('Shelf', shelfSchema);

module.exports = Shelf;