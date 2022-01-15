const router = require('express').Router();
let example = require('../schemas/example');

router.route('/get').get((req, res) => {
	example
		.find()
		.then((resultQuery) => res.json({ ex: resultQuery }))
		.catch((error) => res.status(400).json('Error: ' + error));
});

router.route('/get/:id').get((req, res) => {
	example
		.findById(req.params.id)
		.then((resultQuery) => res.json(resultQuery))
		.catch((error) => res.status(400).json('Error: ' + error));
});

router.route('/add').post((req, res) => {
	const { content, extra } = req.body;

	const exampleToAdd = new example({ content, extra });
	exampleToAdd
		.save()
		.then(() => res.json('Example added!'))
		.catch((error) => res.status(400).json('Error: ' + error));
});

router.route('/modify/:id').post((req, res) => {
	example
		.findById(req.params.id)
		.then((resultQuery) => {
			resultQuery.content = req.body.content;
			resultQuery.extra = req.body.extra;
			resultQuery
				.save()
				.then(() => res.json('Example updated!'))
				.catch((error) => res.status(400).json('Error: ' + error));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
	example
		.findByIdAndDelete(req.params.id)
		.then(() => res.json('Example deleted!'))
		.catch((error) => res.status(400).json('Error: ' + error));
});

module.exports = router;
