const pool = require('../db_manager')

async function getDiscussions() {
    const sql = 'SELECT * FROM discussion';
    const [rows, fields] = await pool.query(sql);
    console.log(rows)
    return rows;
  }
  async function getDiscussionById(id) {
    const sql = `SELECT * FROM discussion WHERE discussion_id = ${id}`
    const [rows, fields] = await pool.query(sql)
    console.log(rows[0])
    console.log('getDiscussionById')
    return rows[0]
  }
  module.exports={getDiscussions,getDiscussionById}