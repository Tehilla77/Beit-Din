const pool = require('../db_manager')

async function uploadFile(file) {
    console.log(file)
    const sql = `insert into files(pdf) values('${file}')`;
    const [rows, fields] = await pool.query(sql)   
    console.log(rows)
    return rows;
  }

  async function getFileById(id) {
    const sql = `SELECT * FROM files WHERE files.id = ${id}`
    const [rows, fields] = await pool.query(sql)   
    return rows;
  }

  module.exports={uploadFile, getFileById}