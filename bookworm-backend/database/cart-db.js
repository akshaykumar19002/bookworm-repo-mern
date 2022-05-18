const { ObjectId } = require('mongodb');
let Cart = require('../models/cart-model');

module.exports = {
    
    addToCart: function(res, cartObject) {
        let cart = new Cart({
            userId: new ObjectId(cartObject.userId),
            bookId: new ObjectId(cartObject.bookId),
            action: cartObject.action
        });
        if (cartObject.action == 'rent') {
            cart.rentDuration = cartObject.rentDuration
        }
        Cart.findOne({userId: cart.userId, bookId: cart.bookId, action: cart.action}, function(err, crt) {
            console.log(crt, err);
            if (err || (crt != null && crt != undefined && crt.userId.toString() == cart.userId.toString())) {
                res.status(400).json({"error": "Book already present in the cart"});
            } else
                cart.save()
                    .then(() => res.json({"message": "Book added to cart"}))
                    .catch(err => res.status(400).json({"error": err}));
        })
    },

    fetchAllItemsByUserId: function(res, userId) {
        Cart.find()
            .populate('bookId')
            .exec( function (err, items) {
                if (err) {
                    res.status(400).json({"error": err})
                } else {
                    items = items.filter(item => item.userId.toString() == userId);
                    res.json(items)
                }
            });
    },

    deleteBookFromCart: async function(res, bookId, userId, action) {
        response = await Cart.deleteOne({"bookId": bookId, 'userId': userId, 'action': action});
        if (response == undefined || response == null || response.deletedCount == undefined || 
            response.deletedCount == 0)
            res.status(400).json({"error": "Failed to remove book from the cart"})
        else
            res.json({"message": "Book removed from cart"})
    },

    clearCart: async function(res, userId) {
        response = await Cart.deleteMany({'userId': userId});
        if (response == undefined || response == null || response.deletedCount == undefined || 
            response.deletedCount == 0)
            res.status(400).json({"error": "Failed to clear the cart"})
        else
            res.json({"message": "Cart cleared successfully"})
    }


}