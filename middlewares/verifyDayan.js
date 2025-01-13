const jwt = require('jsonwebtoken');
require('dotenv').config();
const { GetUserById } = require('../controllers/usersController');

const verifyDayan = async(req, res, next) => {
    try {
        const user = await GetUserById(req.user);
        if(user.user_type==2){ 
            next();    
          }
          else
          return res.sendStatus(403); // טוקן לא תקין
      
        }  catch (err) {
          res.status(500).json({ error: "User verify failed" });
      }
         
        }
      module.exports = verifyDayan