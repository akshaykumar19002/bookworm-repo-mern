const router = require('express').Router();
const rentDatabase = require('../database/rent-db');

router.route('/').post((req, res) => {
    rentDatabase.addToRent(res, req.body);
});

router.route('/fetchAllBooksByUserId').get((req, res) => {
    rentDatabase.fetchAllBooksByUserId(res, req.query.userId);
});

router.route('/fetchAllAvailableBooksByUserId').get((req, res) => {
    rentDatabase.fetchAllAvailableBooksByUserId(res, req.query.userId);
});

router.route('/').delete((req, res) => {
    rentDatabase.deleteById(res, req.query.rentId);
});

module.exports = router;