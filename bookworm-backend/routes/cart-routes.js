const router = require('express').Router();
const cartDatabase = require('../database/cart-db');

router.route('/').post((req, res) => {
    cartDatabase.addToCart(res, req.body);
});

router.route('/fetchAllItemsByUserId').get((req, res) => {
    cartDatabase.fetchAllItemsByUserId(res, req.query.userId);
});

router.route('/deleteBookFromCart').delete((req, res) => {
    cartDatabase.deleteBookFromCart(res, req.query.bookId, req.query.userId, req.query.action);
});

router.route('/clearCart').delete((req, res) => {
    cartDatabase.clearCart(res, req.query.userId);
});

module.exports = router;