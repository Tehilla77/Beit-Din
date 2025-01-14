require('dotenv').config();
const express = require('express');
const fsPromises = require('fs').promises;
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors'); 
const morgan = require('morgan');
const config = require('./config/config');
const logger = require('./middlewares/logger');
const discussionRouter = require('./routers/discussion')
const usersRouter = require('./routers/users')
const casesRouter = require('./routers/cases')
const filesRouter = require('./routers/files')


const app = express();
app.use (express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: 'http://localhost:3000',  
  credentials: true
}));

const verifyJWT = require("./middlewares/verifyJWT");

app.use(cookieParser());
app.use(logger);
app.use(morgan('Method: :method URL: :url Status: :status '));
app.use('/', express.static(path.join(__dirname, '/')));

app.use('/users',usersRouter)
app.use('/discussion',verifyJWT,discussionRouter)
app.use('/files',verifyJWT,filesRouter)
app.use('/cases',verifyJWT,casesRouter)

app.get('/',(req,res)=>{
  res.send('home');
})
app.use('*', (req, res) => {
    res.send('not-found')
})
app.listen(config.port,()=>{
console.log(`http://localhost:${config.port}`)

})