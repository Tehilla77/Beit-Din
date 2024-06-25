const { getUsers,getUserById, isUserExist, createUser} = require('../models/usersModel');


async function GetUsers(req, res) {
        const user = await getUsers();
        res.send(user)
    }

   
async function GetUserById(req, res){
    const user = await getUserById(req.params.id);
    res.send(user)
}

async function IsUserExist(req,res){
    const user = await isUserExist(req.params.id,req.params.password);
    res.send(user)
}
async function CreateUser(req,res){
    const user ={
        id:req.params.id,
        password:req.params.password,
        first_name:req.params.first_name,
        last_name:req.params.last_name,
        phone:req.params.phone,
        email:req.params.email,
        address:req.params.address
    }
    const u = await createUser(user)
    res.send(u)
}

    module.exports = {GetUserById,GetUsers,IsUserExist,CreateUser};
