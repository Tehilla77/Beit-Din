const { getUsers, getUserById, isUserExist,isEmailExist, createUser, deleteUser, updateUser } = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

async function GetUsers(req, res) {
    try {
        const user = await getUsers();
        res.send(user);
    }
    catch (error) {
        return error;
    }
}


async function GetUserById(req, res) {
    try {
        const user = await getUserById(req.params.id);
        res.send(user);
    }
    catch (error) {
        return error;
    }
}

async function LogIn(req, res) {//it is work bad!
    try {
        const password = req.body.password;
        const id = req.body.id;
        console.log(req.body)
        const u = await getUserById(req.body.id);
        console.log("bcrypt pwd - -",u.password,"pwd - -",password);
        console.log("bcrypt id - -",u.id, "id - -",id);

        if (!(await bcrypt.compare(password, u.password))) {
            throw new Error("not valid password");
        }
        else {
            await isEmailExist(u.email);
            const token = jwt.sign(
                { "userId": u.id },
                process.env.SECRET_KEY,
                { expiresIn: '1d' }
            );
            res.cookie('jwt', token, {
                httpOnly: true,
                sameSite: 'None',
                secure: true, 
                maxAge: 24 * 60 * 60 * 1000
              });
              console.log('I here, after res.cookie')
              console.log(token)
            res.send  ({ user: u, token: token });
        }
    }
    catch (err) {
        throw err;
    }
}


async function CreateUser(req, res) {
    const hashPwd = await bcrypt.hash(req.body.password, saltRounds);
    const user = {
        id: req.body.id,
        password: hashPwd,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    }
    try {
        const u = await createUser(user)
        const token = jwt.sign(
            { "userId": u.id },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );
        console.log(token);
        res.cookie('jwt', token, 
            { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.send({ user: u, token: token });
    } catch (err) {
        throw err;
    }
}

async function DeleteUser(req, res) {
    try {
        const u = await deleteUser(req.params.id)
        res.send(u)
    }
    catch (error) {
        return error;
    }
}

async function UpdateUser(req, res) {
    const user = {
        id: req.body.id,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    }
    try {
        const u = await updateUser(user)
        res.send(u)
    }
    catch (error) {
        return error;
    }
}

module.exports = { GetUserById, GetUsers, LogIn, CreateUser, DeleteUser, UpdateUser };
