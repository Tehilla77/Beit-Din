const express = require('express');
const usersRouter = express.Router();
const {GetUserById,GetUsers, IsUserExist, CreateUser, DeleteUser,UpdateUser} = require('../controllers/usersController');

usersRouter.route('/log-in')
.post(IsUserExist) 

usersRouter.route('/:id')
.get(GetUserById)
.delete(DeleteUser)

usersRouter.route('/')
.get(GetUsers)
.post(CreateUser)
.put(UpdateUser)

module.exports = usersRouter;
