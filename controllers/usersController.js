const { getUsers, getUserByEmail, getUserById, createUser, deleteUser, updateUser } = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

async function GetUsers(req, res) {
    try {
        const users = await getUsers();
        res.status(200).send(users); // Ensure to return a proper status code
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to retrieve users" }); // Return error with proper message
    }
}

async function GetUserByEmail(req, res) {
    try {
        const user = await getUserByEmail(req.params.email);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(user); // Return the user if found
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to retrieve user" });
    }
}

async function GetUserById(userId) {
    try {
      // Fetch the user from the database using the provided userId
      const user = await getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;  // Return user data
    } catch (error) {
      console.error(error);
      throw error;  // Propagate error to be handled by the calling middleware
    }
  }

async function LogIn(req, res) {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ error: "Invalid password" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Set token in HTTP-only cookie for secure access
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'Lax', 
            secure: process.env.NODE_ENV === 'production', // Make secure cookie conditional on production environment
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.send ({ user: user, token: token });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message || "An error occurred during login" });
    }
}

async function CreateUser(req, res) {
    console.log("req.body", req.body)
    const { id, password, first_name, last_name, phone, email, address, role } = req.body;
    try {
        const hashPwd = await bcrypt.hash(password, saltRounds);

        const newUser = {
            id,
            password: hashPwd,
            first_name,
            last_name,
            phone,
            email,
            address,
            role
        };

        const user = await createUser(newUser);

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Set token in HTTP-only cookie for secure access
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true, // Ensure it's secure when in production
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.send ({ user: newUser, token: token });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "User creation failed" });
    }
}

async function DeleteUser(req, res) {
    try {
        const user = await deleteUser(req.params.id);
        res.status(200).send({ message: "User deleted successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to delete user" });
    }
}

async function UpdateUser(req, res) {
    const { id, password, first_name, last_name, phone, email, address } = req.body;

    try {
        const updatedUser = {
            id,
            password: password ? await bcrypt.hash(password, saltRounds) : undefined,
            first_name,
            last_name,
            phone,
            email,
            address
        };

        const user = await updateUser(updatedUser);
        res.status(200).send({ message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to update user" });
    }
}

module.exports = { GetUserByEmail,GetUserById, GetUsers, LogIn, CreateUser, DeleteUser, UpdateUser };
