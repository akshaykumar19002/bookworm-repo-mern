const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SelectPackageSchema = new Schema({
    userId: {type: String,required: true},
    packageId: { type: String, required: true },
    packageStatus: { type: Number, required: true }
   
}, {
    timestamps: true,
});

// SelectPackageSchema.index({userId: "text", category: "text", subcategory: "text", publisher:"text", author: "text"})
const Pack = mongoose.model('Pack', SelectPackageSchema);

module.exports = Pack;