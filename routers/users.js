const express = require('express');
const usersRouter = express.Router();
const {GetUserByEmail,GetUsers, CreateUser, DeleteUser,UpdateUser, LogIn} = require('../controllers/usersController');
const verifyJWT = require("../middlewares/verifyJWT");
usersRouter.use(express.json());
usersRouter.use(express.urlencoded({ extended: true }));
const cors = require('cors');
usersRouter.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend app URL
    credentials: true
}));

usersRouter.route('/log-in')
.post(LogIn)

usersRouter.route('/:id')
.get(GetUserByEmail)
.delete(DeleteUser)

usersRouter.route('/')
.get(GetUsers)
.post(CreateUser)
.put(UpdateUser)


module.exports = usersRouter;
