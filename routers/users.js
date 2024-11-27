const express = require('express');
const usersRouter = express.Router();
const {GetUserById,GetUsers, LogIn, CreateUser, DeleteUser,UpdateUser, LogIn} = require('../controllers/usersController');

usersRouter.route('/log-in')
.post(LogIn) 

usersRouter.route('/:id')
.get(GetUserById)
.delete(DeleteUser)

usersRouter.route('/')
.get(GetUsers)
.post(CreateUser)
.put(UpdateUser)

module.exports = usersRouter;
