const express = require('express');
const casesRouter = express.Router();
const { GetCaseById, GetCases, CreateCase, GetCaseByUserId, GeFullCases, UpdateLastEnter } = require('../controllers/casesController');

// casesRouter.route('/updateLastEnter/:id')
// .put(UpdateLastEnter)

casesRouter.route('/FullCases')
    .get(GeFullCases)

casesRouter.route('/userId/:id')
    .get(GetCaseByUserId)

casesRouter.route('/:id')
    .get(GetCaseById)
    .put(UpdateLastEnter)


casesRouter.route('/')
    .get(GetCases)
    .post(CreateCase)


module.exports = casesRouter;
