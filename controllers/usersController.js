const { getUsers, getUserById, isUserExist, createUser, deleteUser, updateUser } = require('../models/usersModel');


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

async function IsUserExist(req, res) {
    try {
        const user = await isUserExist(req.body.first_name, req.body.last_name, req.body.password);
        res.send(user)
    }
    catch (error) {
        return error;
    }
}
async function CreateUser(req, res) {
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
        const u = await createUser(user)
        res.send(u)
    }
    catch (error) {
        return error;
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

module.exports = { GetUserById, GetUsers, IsUserExist, CreateUser, DeleteUser, UpdateUser };
