const express = require('express');
const casesRouter = express.Router();
const {GetCaseById,GetCases,CreateCase} = require('../controllers/casesController');

casesRouter.route('/:id')
.get(GetCaseById)
.put(CreateCase)


casesRouter.route('/')
.get(GetCases)



module.exports = casesRouter;
