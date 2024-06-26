const express = require('express');
const usersRouter = express.Router();
const {GetUserById,GetUsers, IsUserExist, CreateUser} = require('../controllers/usersController');

usersRouter.route('/:id')
.get(GetUserById)
.put(CreateUser)

// usersRouter.route('/:id/:password')
// .get(IsUserExist)

usersRouter.route('/')
.get(GetUsers)

module.exports = usersRouter;
