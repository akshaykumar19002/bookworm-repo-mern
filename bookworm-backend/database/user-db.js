let User = require('../models/user-model');
const bcrypt = require('bcrypt');
var salt = 11

module.exports = {
    
    addUser: function(res, requestUser) {
        let user = new User(requestUser);
        User.findOne({"emailId": user.emailId}, function(err, usr) {
            console.log(usr, err);
            if (err || (usr != null && usr != undefined && usr.emailId == requestUser.emailId)) {
                res.status(400).json({"error": "User already exists"});
            } else {
                bcrypt.hash(user.password, salt, (err, encrypted) => {
                    if (err) {
                        console.log('Encryption failed: ', err)
                        res.status(400).json({"error": "Encryption error"})
                    } else {
                        user.password = encrypted;
                        user.save()
                            .then(() => res.json({"message": "User added"}))
                            .catch(err => res.status(400).json({"error": err}));
                    }
                })
            }
        })
    },

    findAll: function(res) {
        User.find().then(users => res.json(users))
        .catch(err => res.status(400).json({"error": err}));
    },

    signin: function(res, requestUser) {
        let user = requestUser;
        User.findOne({"emailId": user.emailId}, function(err, dbUser) {
            console.log(dbUser, err);
            if (err || dbUser == null || dbUser == undefined) {
                res.status(400).json({"error": "Authentication Failed"});
            } else {
                bcrypt.compare(user.password, dbUser.password, (err, result) => {
                    if (result == true) {
                        dbUser.password = ''
                        res.json(dbUser)
                    } else {
                        res.status(400).json({"error": "Incorrect password."});
                    }
                })
            }
        })
    },

    viewUser: function(res, id) {
        User.findById(id, function(err, user) {
            if (err || user == null) {
                res.status(400).json({"error": err})
            } else {
                res.json(user);
            }
        });
    }


}