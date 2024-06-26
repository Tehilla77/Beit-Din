const fsPromises = require('fs').promises;
const config = require('../config/config');


async function logger(req, res, next) {
    const date = new Date().toLocaleDateString();
    const logItem = `Date: ${date}\t URL: ${req.url}\n`;
    if(config.node_env=='production'){
        try {
            await fsPromises.appendFile(path.join(__dirname, 'logger.txt'), logItem)
        } catch (err) {
            console.log(err);
        }
    } else{
        console.log(logItem)
    }
   
    next();
}

module.exports = logger;