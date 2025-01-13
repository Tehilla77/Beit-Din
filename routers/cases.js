const express = require('express');
const casesRouter = express.Router();
const { GetCaseById, GetCases, CreateCase, GetCaseByUserId, GeFullCases, UpdateLastEnter } = require('../controllers/casesController');
// const { verify } = require('jsonwebtoken');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyAdmin = require('../middlewares/verifyAdmin');
// casesRouter.route('/updateLastEnter/:id')
// .put(UpdateLastEnter)

casesRouter.route('/FullCases')
    .get(verifyJWT, verifyAdmin, GeFullCases)

casesRouter.route('/userId/:id')
    .get(verifyJWT, GetCaseByUserId)

casesRouter.route('/:id')
    .get(GetCaseById)
    .put(UpdateLastEnter)


casesRouter.route('/')
    .get(GetCases)
    .post(CreateCase)


module.exports = casesRouter;
