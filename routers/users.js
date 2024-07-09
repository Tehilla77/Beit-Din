const express = require('express');
const usersRouter = express.Router();
const {GetUserById,GetUsers, IsUserExist, CreateUser, DeleteUser,UpdateUser} = require('../controllers/usersController');
const { updateUser } = require('../models/usersModel');

usersRouter.route('/:id')
.get(GetUserById)
.delete(DeleteUser)


usersRouter.route('/')
.post(CreateUser)
.put(UpdateUser)

usersRouter.route('/:first_name/:last_name/:password')
.get(IsUserExist)

usersRouter.route('/')
.get(GetUsers)


module.exports = usersRouter;
