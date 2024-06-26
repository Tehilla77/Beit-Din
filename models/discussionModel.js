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
  async function createDiscussion(Discussion) {
    const sql = `insert into discussion(discussion_date,discussion_hour,discussion_time,case_id,protocol,is_finish)values('${Discussion.discussion_date}','${Discussion.discussion_hour}',${Discussion.discussion_time},${Discussion.case_id},'${Discussion.protocol}',${Discussion.is_finish})`;
    console.log(sql)
    const [rows, fields] = await pool.query(sql);
  }
  module.exports={getDiscussions,getDiscussionById,createDiscussion}