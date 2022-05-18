const { ObjectId } = require('mongodb');
let Rent = require('../models/rent-model');

module.exports = {
    
    addToRent: function(res, rentObject) {
        let rent = new Rent({
            userId: new ObjectId(rentObject.userId),
            bookId: new ObjectId(rentObject.bookId),
            startDate: new Date(rentObject.startDate),
            endDate: new Date(rentObject.endDate),
            rentAmount: rentObject.rentAmount
        });
        Rent.findOne({userId: rent.userId, bookId: rent.bookId, endDate: {$gt: new Date()}}, function(err, crt) {
            console.log(crt, err);
            if (err || (crt != null && crt != undefined && crt.userId.toString() == rent.userId.toString())) {
                res.status(400).json({"error": "Book is already rented out"});
            } else
                rent.save()
                    .then((result) => res.json({"message": "Book is bought on rent", 'id':result._id}))
                    .catch(err => res.status(400).json({"error": err}));
        })
    },

    fetchAllBooksByUserId: function(res, userId) {
        Rent.find({"userId": userId}).then(items => res.json(items))
        .catch(err => res.status(400).json({"error": err}));
    },

    fetchAllAvailableBooksByUserId: function(res, userId) {
        Rent.find({'userId': userId, 'endDate': {$gte: new Date()}}).then(items => res.json(items))
        .catch(err => res.status(400).json({"error": err}));
    },

    deleteById: (res, rentId) => {
        Rent.findByIdAndDelete(rentId, function(err) {
            if (err) {
                res.status(400).json({"error": err})
            } else {
                res.json({"message": "Rent details deleted successfully."})
            }
        })
    }


}