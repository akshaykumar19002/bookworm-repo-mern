const router = require('express').Router();
const billingDatabase = require('../database/billing-db');

router.route('/addBookToBilling').post((req, res) => {
    billingDatabase.addBookToBilling(res, req.body);
});

router.route('/fetchAllBooksByUserId').get((req, res) => {
    billingDatabase.fetchAllBooksByUserId(res, req.query.userId);
});

router.route('/fetchAllBooksByActionAndUserId').get((req, res) => {
    billingDatabase.fetchAllBooksByActionAndUserId(res, req.query.userId, req.query.action);
});

router.route('/buy').post((req, res) => {
    billingDatabase.buyBook(res, req.body.userId, req.body.bookId);
});


module.exports = router;