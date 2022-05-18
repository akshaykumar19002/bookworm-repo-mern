const router = require('express').Router();
const userDatabase = require('../database/user-db');

router.route('/').get((req, res) => {
    userDatabase.findAll(res);
});

router.route('/signin').post((req, res) => {
    userDatabase.signin(res, req.body);
});

router.route('/view').get((req, res) => {
   userDatabase.viewUser(res, req.query.id);
});

router.route('/signup').post((req, res) => {
    userDatabase.addUser(res, req.body);
});


module.exports = router;