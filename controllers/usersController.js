const { getUsers, getUserById, isUserExist, createUser, deleteUser, updateUser} = require('../models/usersModel');


async function GetUsers(req, res) {
    const user = await getUsers();
    res.send(user)
}


async function GetUserById(req, res) {
    const user = await getUserById(req.params.id);
    res.send(user)
}

async function IsUserExist(req, res) {
    const user = await isUserExist(req.params.first_name, req.params.last_name, req.params.password);
    res.send(user)
}
async function CreateUser(req, res) {
    const user = {
        id:req.body.id,
        password:req.body.password,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone,
        email:req.body.email,
        address:req.body.address
    }
    const u = await createUser(user)
    res.send(u)
}
async function DeleteUser(req, res) {
    const u = await deleteUser(req.params.id)
    res.send(u)
}
async function UpdateUser(req, res) {
    const user = {
        id:req.body.id,
        password:req.body.password,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone,
        email:req.body.email,
        address:req.body.address
    }
    const u = await updateUser(user)
    res.send(u)
}

module.exports = { GetUserById, GetUsers, IsUserExist, CreateUser, DeleteUser, UpdateUser };
