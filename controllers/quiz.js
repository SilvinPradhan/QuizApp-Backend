const Questions = require('../models/quiz');
const { erroHandler, errorHandler } = require('../helpers/dbErrorHandler');
const { response } = require('express');

exports.create = async (req, res) => {
	const { description } = req.body;
	const { alternatives } = req.body;
	let questions = new Questions({ description, alternatives });
	questions.save((err, data) => {
		if (err) {
			console.log(err);
			return res.status(400).json({
				error: erroHandler(err),
			});
		}
		res.json(data);
		console.log('Endpoint to create a new quiz');
	});
};

exports.listAll = (req, res) => {
	Questions.find({}).exec((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		res.json(data);
	});
	console.log('Endpoint to get a summary of all quizzes.');
};

exports.listSingle = async (req, res) => {
	try {
		const _id = req.params.id;

		const question = await Questions.findOne({ _id });
		if (!question) {
			return res.status(404).json({});
		} else {
			return res.status(200).json(question);
			console.log('Endpoint to get a summary of a single quiz with submissions.');
		}
	} catch (error) {
		return res.status(500).json({ error: error });
	}
};

exports.submitSingle = (req, res) => {
	res.json({
		message: 'Endpoint to submit a single quiz result',
	});
};
