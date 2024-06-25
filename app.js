require('dotenv').config();
const express = require('express');
const fsPromises = require('fs').promises;
const path = require('path');
const cors = require('cors'); 
const config = require('./config/config')
const discussionRouter = require('./routers/discussion')
const usersRouter = require('./routers/users')
const app = express();

app.use (express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend app URL
  credentials: true
}))

app.use('/users',usersRouter)
app.use('/discussion',discussionRouter)

app.get('/',(req,res)=>{
  res.send('home');
})
app.use('*', (req, res) => {
    res.send('not-found')
})
app.listen(config.port,()=>{
console.log(`http://localhost:${config.port}`)

})