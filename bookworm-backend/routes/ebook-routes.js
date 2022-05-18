const router = require('express').Router();
const ebookDatabase = require('../database/ebooks-db');
let Ebook = require('../models/ebook-model');
var fs = require('fs');
var path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
});
var upload = multer({ storage: storage });

router.route('/').get((req, res) => {
    ebookDatabase.findAll(res);
});

router.route('/search').get((req, res) => {
    ebookDatabase.searchBook(res, req.query.searchText);
});

router.route('/').post(upload.single('image'), (req, res) => {
    ebookDatabase.addEbook(res, req.body, req);
});

router.route('/view').get((req, res) => {
    ebookDatabase.viewBook(res, req.query.id);
});

router.route('/').put((req, res) => {
    ebookDatabase.editBook(res, req.body);
});

router.route('/').delete((req, res) => {
    ebookDatabase.deleteBook(res, req.query.id);
});

router.route('/download').get((req, res) => {
    let p = path.dirname(__dirname)
    console.log('path', p)
    let file = fs.createReadStream(p + '/uploads/' + req.query.title)
    file.pipe(res)
})

router.route('/fetchBooks').get((req, res) => {
    ebookDatabase.fetchBooks(res, req.query.userId);
})


module.exports = router;