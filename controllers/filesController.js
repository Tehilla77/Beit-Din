const { uploadFile, getFileById} = require('../models/filesModel');

async function UploadFile(req, res) {
    console.log('UploadFile')
   console.log(req.files)
    const file = req.body.pdf_file
    console.log(file)


    const u = await uploadFile(file)
    res.send(u)
}

async function GetFileById(req, res) {
    const id = await getFileById(req.params.id);
    res.send(id)
}

module.exports={UploadFile,GetFileById}