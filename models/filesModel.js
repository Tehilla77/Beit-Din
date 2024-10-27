const pool = require('../db_manager')

async function uploadFile(file, dis_id) {
  const sql = `insert into files(file_path,discussion_id) values('${file}',${dis_id})`;
  try {
    const [rows, fields] = await pool.query(sql)
    return rows;
  }
  catch (error) {
    console.log(error); return error;
  }
}

async function getFileByDiscussionId(id) {
  const sql = `SELECT file_path FROM files WHERE files.discussion_id = ${id}`
  try {
    const [rows, fields] = await pool.query(sql)
    return rows;
  }
  catch (error) {
    console.log(error); return error;
  }
}


module.exports = { uploadFile, getFileByDiscussionId }