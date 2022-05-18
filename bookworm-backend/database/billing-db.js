const { ObjectId } = require('mongodb');
let Billing = require('../models/billing-model');
let Ebook = require('../models/ebook-model');

module.exports = {
    
    addBookToBilling: function(res, billingObject) {
        let billing = new Billing({
            userId: new ObjectId(billingObject.userId),
            bookId: new ObjectId(billingObject.bookId),
            action: billingObject.action
        });
        if (billingObject.action == 'rent' && billingObject.rentId != undefined) {
            billing.rentId = billingObject.rentId
        }
        if (billingObject.action == 'lend' && billingObject.lendId != undefined) {
            billing.lendId = billingObject.lendId
        }

        Billing.findOne({userId: billing.userId, bookId: billing.bookId, action: billing.action}, function(err, crt) {
            console.log(crt, err);
            if (err || (crt != null && crt != undefined && crt.userId.toString() == billing.userId.toString())) {
                res.status(400).json({"error": "Book already present in the billing"});
            } else
                billing.save()
                    .then(() => res.json({"message": "Book added to billing"}))
                    .catch(err => res.status(400).json({"error": err}));
        })
    },

    fetchAllBooksByUserId: function(res, userId) {
        Billing.find()
            .populate('bookId rentId lendId')
            .exec( function (err, items) {
                console.log(err, items)
                if (err) {
                    res.status(400).json({"error": err})
                } else {
                    items = items.filter(item => item.userId.toString() == userId);
                    items.filter(item => {
                        if (item.rentId !== null && item.rentId !== undefined) {
                            if (new Date(item.rentId.endDate).getTime() > new Date().getTime()) {
                                return true;
                            } else
                                return false;
                        } else if (item.lendId !== null && item.lendId !== undefined) {
                            return true;
                        }
                        return true;
                    })
                    res.json(items)
                }
            })
    },

    fetchAllBooksByActionAndUserId: function(res, userId, action) {
        Billing.find()
            .populate('bookId rentId lendId')
            .exec( function (err, items) {
                if (err) {
                    res.status(400).json({"error": err})
                } else {
                    items = items.filter(item => item.userId.toString() == userId && 
                        item.action == action);
                    res.json(items)
                }
            })
    },

    buyBook: async function(res, userId, bookId) {
        bookDetails = await Ebook.findById(bookId);
        if (bookDetails.actions.includes('buy')) {
            response = await Billing.findOne({'bookId': bookId, 'userId': userId, 'action': 'buy'})
            if (response) {
                res.status(400).json({'error': 'Book already bought by this user'})
            } else {
                let billing = new Billing({
                    'userId': userId,
                    'bookId': bookId,
                    'action': 'buy'
                })
                billing.save()
                    .then(() => res.json({"message": "Book bought successfully"}))
                    .catch(err => res.status(400).json({"error": err}));
            }
        } else {
            res.status(400).json({'error': 'Cannot buy this ebook'})
        }
    },

    fetchAllActiveBooks: async function(userId) {
        let books = await Billing.find()
            .populate('bookId rentId lendId')
            .exec();
        books = books.filter((book) => {
            return book.userId.toString() === userId
        })
        return books.filter((book) => {
            if (book.action === 'buy'){
                return true;
            } else if (book.action === 'rent' && book.rentId !== undefined && book.rentId !== null && new Date(book.rentId.endDate).getTime() > new Date().getTime()) {
                return true;
            } else if (book.action === 'lend' && book.lendId !== undefined && book.lendId !== null && new Date(book.lendId.endDate).getTime() > new Date().getTime()) {
                return true;
            }
            return false;
        })
    }
}