const pool = require('../db_manager')


async function getCases() {
    const sql = 'SELECT * FROM cases';
    const [rows, fields] = await pool.query(sql);
    console.log(rows)
    return rows;
  }
  async function getCaseById(id) {
    const sql = `SELECT * FROM cases WHERE case_id = ${id}`;
    const [rows, fields] = await pool.query(sql);
    console.log(rows)
    return rows;
  }
  async function getCaseByUserId(id) {
    console.log('getCaseByUserId')
    const sql = `SELECT * FROM cases WHERE defendant_id = '${id}' or prosecutor_id = '${id}'`;
    const [rows, fields] = await pool.query(sql);
    console.log(rows)
    if(rows.length>0)
      {
        return rows;
      }
      else{
        return null;
        return 404;
      }
  }

  async function createCase(caseDetails) {
    const sql = `insert into cases(is_defedant_agree,is_decision,prosecutor_id,defendant_id,issue) values(false,false,'${caseDetails.prosecutor_id}','${caseDetails.defendant_id}','${caseDetails.issue}')`;
    const [rows, fields] = await pool.query(sql);
  }
  module.exports={getCases,getCaseById,createCase,getCaseByUserId}