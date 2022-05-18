const { ObjectId } = require('mongodb');
const Package = require('../models/package-model');
const lendDb = require('../database/lend-db');

module.exports = {
    
    createPackage: function(res, packageObject) {
        let package = new Package(packageObject);
        let filters = {
            'userId': packageObject.userId,
            'endDate': {$gt: new Date()},
            'packageName':package.packageName
        }
        Package.find(filters, function(err, packages) {
            console.log(packages, err);
            if (err) {
                res.status(400).json({"error": err});
            } else {
                if (packages.length == 0)
                    package.save()
                        .then((pkg) => {
                            packageObject.packageId = pkg._id
                            lendDb.lendBook(res, packageObject);
                        })
                        .catch(err => res.status(400).json({"error": err}));
                else
                    res.status(400).json({"error": 'Package with this name already exists'});
            }
        })
    },

    fetchAllPackages: function(res) {
        Package.find().then(items => res.json(items))
        .catch(err => res.status(400).json({"error": err}));
    },

    fetchPackageById: function(res, id) {
        Package.findById(id, function(err, pkg) {
            if (err || pkg == null) {
                res.status(400).json({"error": err})
            } else {
                res.json(pkg);
            }
        });
    },

    fetchPackageByName: function(res, pkgName) {
        Package.findOne({'packageName': pkgName})
            .then((items) => {
                if (pkg == null)
                    res.status(400).json({"error": err})
                else
                    res.json(items)
            })
            .catch(err => res.status(400).json({"error": err}));
    },

    deletePackageById: function(res, id) {
        Package.findByIdAndDelete(id, function(err, pkg) {
            if (err) {
                res.status(400).json({"error": err})
            } else {
                res.json({"message": "Package deleted successfully."})
            }
        })
    },

    fetchPackagesByUserId: function(res, userId) {
        Package.find({'userId': new ObjectId(userId), 'endDate': {$gt: new Date()}})
            .then(items => res.json(items))
            .catch(err => res.status(400).json({"error": err}));
    }

}