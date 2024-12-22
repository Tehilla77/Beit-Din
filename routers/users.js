const express = require('express');
const usersRouter = express.Router();
const {GetUserById,GetUsers, CreateUser, DeleteUser,UpdateUser, LogIn} = require('../controllers/usersController');
const verifyJWT = require("../middlewares/verifyJWT");
usersRouter.use(express.json());
usersRouter.use(express.urlencoded({ extended: true }));
const cors = require('cors');
usersRouter.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend app URL
    credentials: true
}));

usersRouter.post('/log-in',async (req, res) => {
    try {
        const response = await LogIn(req, res);
        res.send(response);
    } catch (err) {
        res.status(500).json({ error: "User creation failed" });
    }
})

usersRouter.route('/:id')
.get(verifyJWT,GetUserById)
.delete(DeleteUser)

usersRouter.route('/')
.get(GetUsers)
.post(CreateUser)
.put(UpdateUser)


module.exports = usersRouter;
