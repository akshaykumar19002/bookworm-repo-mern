const { ObjectId } = require('mongodb');
let Ebook = require('../models/ebook-model');
var fs = require('fs');
var path = require('path');
const billingDb = require('./billing-db');

module.exports = {
    
    addEbook: function(res, requestEbook, req) {
        let ebook = new Ebook(requestEbook);
        ebook.img = req.file.path
        ebook.save()
            .then(() => res.json({"message": "Ebook added"}))
            .catch(err => res.status(400).json({"error": err}));
    },

    findAll: function(res) {
        Ebook.find().then(ebooks => res.json(ebooks))
        .catch(err => res.status(400).json({"error": err}));
    },

    searchBook: function(res, searchText) {
        Ebook.find({"booktitle": {"$regex": searchText, "$options": "i"}}).then(ebooks => res.json(ebooks))
        .catch(err => res.status(400).json({"error": err}));
        // Ebook.find({"$text": {"$search": searchText}}).then(ebooks => res.json(ebooks))
        // .catch(err => res.status(400).json({"error": err}));
    },

    viewBook: function(res, id) {
        Ebook.findById(id, function(err, book) {
            if (err || book == null) {
                res.status(400).json({"error": err})
            } else {
                res.json(book);
            }
        });
    },

    editBook: async function(res, bookObject) {
        const filter = {'_id': new ObjectId(bookObject._id)}
        const updatedObject = {
            'booktitle': bookObject.booktitle,
            'category': bookObject.category,
            'subcategory': bookObject.subcategory,
            'price': bookObject.price,
            'publisher': bookObject.publisher,
            'author': bookObject.author,
            'description': bookObject.description,
            'availability': bookObject.availability,
            'img': bookObject.img
        }
        response = await Ebook.findOneAndUpdate(filter, updatedObject, {new: true});
        if (response == null) {
            res.error(400).json({'error': 'Failed to update ebook'})
        } else
            res.json({'message': 'Ebook updated successfully'})
    },

    deleteBook: function(res, id) {
        Ebook.findByIdAndDelete(id, function(err) {
            if (err) {
                res.status(400).json({"error": err})
            } else {
                res.json({"message": "Ebook deleted successfully."})
            }
        })
    },

    fetchBooks: async function(res, userId) {
        let books = await billingDb.fetchAllActiveBooks(userId);
        // console.log('already bought books:', books);
        books = books.map((book) => {
            return ObjectId(book.bookId._id)
        })
        console.log(books)
        books = await Ebook.find({'_id': {$nin: books}});
        res.json(books)
    } 

}