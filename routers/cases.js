const express = require('express');
const casesRouter = express.Router();
const {GetCaseById,GetCases,CreateCase,GetCaseByUserId} = require('../controllers/casesController');

casesRouter.route('/userId/:id')
.get(GetCaseByUserId)

casesRouter.route('/:id')
.get(GetCaseById)
.put(CreateCase)

casesRouter.route('/')
.get(GetCases)


module.exports = casesRouter;
