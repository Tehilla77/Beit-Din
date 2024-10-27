const express = require('express');
const multer = require('multer');
const filesRouter = express.Router();
const { UploadFile,GetFileByDiscussionId } = require('../controllers/filesController');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,"./")},
    filename: function(req,file,cb){
      const ext = file.mimetype.split("/")[1];
      cb(null,`upload/${file.originalname}-${Date.now()}.${ext}`);
    }
  });
  
  const upload = multer({
    storage: storage
  });
  
filesRouter.route('/upload')
.post(upload.single('pdf_file'),(req,res)=>{console.log(req.body.discussion_id)
        UploadFile(req,res)})


filesRouter.route('/getFileByDiscussionId/:id')
.get(GetFileByDiscussionId)

module.exports = filesRouter;