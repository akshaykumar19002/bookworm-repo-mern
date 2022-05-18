const router = require('express').Router();
const packageDatabase = require('../database/package-db');

router.route('/').post((req, res) => {
    packageDatabase.createPackage(res, req.body);
});

router.route('/').get((req, res) => {
    packageDatabase.fetchAllPackages(res);
});

router.route('/fetchPackageById').get((req, res) => {
    packageDatabase.fetchPackageById(res, req.query.id);
});

router.route('/fetchPackageByName').get((req, res) => {
    packageDatabase.fetchPackageByName(res, req.query.pkgName);
});

router.route('/').delete((req, res) => {
    packageDatabase.deletePackageById(res, req.query.id);
});

router.route('/fetchByUserId').get((req, res) => {
    packageDatabase.fetchPackagesByUserId(res, req.query.userId);
})

module.exports = router;