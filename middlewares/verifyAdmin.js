const jwt = require('jsonwebtoken');
require('dotenv').config();
const { GetUserById } = require('../controllers/usersController');

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await GetUserById(req.user);
    if (user.userRole == 3) {
      console.log("verify Admin")
      next();
    }
    else
      return res.sendStatus(403); // טוקן לא תקין

  } catch (err) {
    res.status(500).json({ error: "User verify failed" });
  }

}
module.exports = verifyAdmin