const express = require('express');
const filesRouter = express.Router();
const { UploadFile,GetFileById } = require('../controllers/filesController');

filesRouter.route('/upload')
    .post((req,res)=>{console.log(req.files[0].buffer)
        UploadFile(req,res)})

filesRouter.route('/getFileById/:id')
.get(GetFileById)

module.exports = filesRouter;