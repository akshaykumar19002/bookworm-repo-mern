const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ebookSchema = new Schema({
    booktitle: {type: String,required: true},
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    price: { type: Number, required: true },
    publisher: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    availability: { type: String, required: true },
    actions: [{type: String, required: true}],
    img:{ type: String, required: false }
}, {
    timestamps: true,
});

ebookSchema.index({booktitle: "text", category: "text", subcategory: "text", publisher:"text", author: "text"})
const Ebook = mongoose.model('Ebook', ebookSchema);

module.exports = Ebook;