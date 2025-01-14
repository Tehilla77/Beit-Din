const jwt = require('jsonwebtoken');
require('dotenv').config();
const { GetUserById } = require('../controllers/usersController');

const verifyUser = async (req, res, next) => {
  try {
    const user = await GetUserById(req.user);
    if (user.userRole == 1) {
      console.log("verify JWT")
      next();
    }
    else
      return res.sendStatus(403); // טוקן לא תקין

  } catch (err) {
    res.status(500).json({ error: "User verify failed" });
  }

}
module.exports = verifyUser