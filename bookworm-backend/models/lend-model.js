const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lendSchema = new Schema({
    userId: { type: ObjectId,required: true},
    bookId: { type: ObjectId, required: true },
    packageId: {type: Schema.Types.ObjectId, required: true, ref: 'Package'},
    endDate: { type: Date, required: true}
}, {
    timestamps: true,
});

const Lend = mongoose.model('Lend', lendSchema);

module.exports = Lend;