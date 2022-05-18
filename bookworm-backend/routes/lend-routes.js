const router = require('express').Router();
const lendDatabase = require('../database/lend-db');
const { route } = require('./ebook-routes');

router.route('/').post((req, res) => {
    lendDatabase.lendBook(res, req.body);
});

router.route('/lendBookAndUpdatePackage').post((req, res) => {
    lendDatabase.lendBookAndUpdatePackage(res, req.body)
})

module.exports = router;