const { uploadFile, getFileByDiscussionId } = require('../models/filesModel');
const path = require('path');


async function UploadFile(req, res) {
    const file = req.file.filename;
    const dis_id = Number(req.body.discussion_id)
    try {
        const u = await uploadFile(file, dis_id)
        return u;
    }
    catch (error) {
        return error;
    }
}

async function GetFileByDiscussionId(req, res) {
    try {
        const result = await getFileByDiscussionId(req.params.id);
        const currentDir = __dirname;
        const parentDir = path.join(currentDir, '..');
        const filePath = path.join(parentDir, '/', result[0].file_path);
        res.sendFile(filePath);
    }
    catch (error) {
        return error;
    }
}

module.exports = { UploadFile, GetFileByDiscussionId }