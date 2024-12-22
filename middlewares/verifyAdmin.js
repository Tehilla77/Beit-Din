const jwt = require('jsonwebtoken');
require('dotenv').config();
const { GetUserById } = require('../controllers/usersController');

const verifyAdmin = async(req, res, next) => {
    try {
        const user = await GetUserById(req.user);
        if(user[0].user_type==3){ 
            next();    
          }
          else
          return res.sendStatus(403); // טוקן לא תקין
      
        }  catch (err) {
          res.status(500).json({ error: "User verify failed" });
      }
         
        }
      module.exports = verifyAdmin