const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId,required: true},
    bookId: { type: Schema.Types.ObjectId, required: true, ref: 'Ebook' },
    action: { type: String, required: true},
    rentId: { type: Schema.Types.ObjectId, required: false, ref: 'Rent'},
    lendId: { type: Schema.Types.ObjectId, required: false, ref: 'Lend'}
}, {
    timestamps: true,
});

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing;