const { ObjectId } = require('mongodb');
const Lend = require('../models/lend-model');
const Package = require('../models/package-model');
const billingDb = require('./billing-db');

module.exports = {
    
    lendBook: function(res, lendObject) {
        const lend = new Lend(lendObject);
        lend.save()
            .then((lend) => {
                lendObject.lendId = lend._id
                lendObject.action = 'lend'
                billingDb.addBookToBilling(res, lendObject);
            })
            .catch(err => ({'error': err}))
    },

    lendBookAndUpdatePackage: async function(res, lendObject) {
        const lend = new Lend(lendObject);
        response = await lend.save();
        if (response) {
            lendObject.lendId = response._id
            lendObject.action = 'lend'
            pkg = await Package.findById(lend.packageId).exec()
            pkg.noOfBooks = parseInt(pkg.noOfBooks) - 1
            resp = await Package.updateOne({_id: ObjectId(lend.packageId)}, {noOfBooks: pkg.noOfBooks});
            console.log(resp, pkg)
            billingDb.addBookToBilling(res, lendObject);
        } else {
            res.status(400).json({'error': 'Failed to lend eBook.'});
        }
    },

    fetchLentBooksByUserId: async function(userId) {
        books = await Lend.find().populate('packageId');
        books.filter((book) => {
            if (userId == book.userId.toString() && book.packageId.endDate.getTime() > new Date().getTime()) {
                return true
            }
            return false
        })
        return books
    }

}