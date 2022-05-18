const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: { type: ObjectId,required: true},
    bookId: { type: Schema.Types.ObjectId, required: true, ref: 'Ebook' },
    action: { type: String, required: true},
    rentDuration: { type: Number, required: false}

}, {
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;