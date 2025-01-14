const express = require('express');
const casesRouter = express.Router();
const { GetCaseById, GetCases, CreateCase, GetCaseByUserId, GeFullCases, UpdateLastEnter } = require('../controllers/casesController');
// const { verify } = require('jsonwebtoken');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyUser = require('../middlewares/verifyUser');
// casesRouter.route('/updateLastEnter/:id')
// .put(UpdateLastEnter)

casesRouter.route('/FullCases')
    .get(GeFullCases)

casesRouter.route('/userId/:id')
    .get(verifyUser, GetCaseByUserId)

casesRouter.route('/:id')
    .get(GetCaseById)
    .put(UpdateLastEnter)


casesRouter.route('/')
    .get(GetCases)
    .post(CreateCase)


module.exports = casesRouter;
