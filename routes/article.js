const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const upload = require('../helpers/multer');

// get all articles
router.get('/', (req, res) => {
	Article.find()
	.sort({name: 1})
    .then(articles => {
		res.status(200).json({
			// msg: 'Articles retrieved successfully',
			articles
		});
    })
});

// get a specific article
router.get('/:id', (req, res) => {
	Article.findById(req.params.id)
	.then(article => {
		res.status(200).json({
			// msg: 'Articles retrieved successfully',
			article
		});
		
	})
});

// update article
router.post('/edit/:id', upload.single('photo'), (req, res) => {
	const {name, price} = req.body;
	let updatedArticle;
	if(req.file) {
		let photo = req.file.url;
		updatedArticle = {name, price, photo}
	}
	else {
		updatedArticle = {name, price}
	}
	Article.findByIdAndUpdate(req.params.id, { $set: updatedArticle })
	.then(article => {
		res.json({
			success: true,
			articulo: article
		});
	});
});

// create article
router.post('/', upload.single('photo'), (req, res) => {
	const {name, price} = req.body;
	const photo = req.file.url;
	const newArticle = {name, price, photo}
	Article.create(newArticle)
		.then(article => {
			res.json({
				success: true,
				articulo: article
			});
		})
		.catch(err => {
			console.log('Photo Uploading Error =====>', err);
			res.status(500).json({ err, msg: 'Article cannot be created' });
		});
});

// delete article
router.post('/delete/:id', (req, res) => {
	Article.findByIdAndDelete(req.params.id)
	.then(resp => {
		res.status(201).json({resp, msg: "Articulo borrado con éxito"})
	})
});

module.exports = router;
