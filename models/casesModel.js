const pool = require('../db_manager')


async function getCases() {
  const sql = 'SELECT * FROM cases';
  try {
    const [rows, fields] = await pool.query(sql);
    console.log(rows)
    return rows;
  }
  catch (error) {
    console.log(error);
  }

}

async function geFullCases() {
  try {
    const sql1 = 'SELECT * FROM cases LEFT JOIN users ON cases.defendant_id=users.id';
    const [rows1, fields1] = await pool.query(sql1);
    const sql2 = 'SELECT * FROM cases LEFT JOIN users ON cases.prosecutor_id=users.id';
    const [rows2, fields2] = await pool.query(sql2);
    console.log("rows1")
    console.log(rows1)
    console.log("rows2")
    console.log(rows2)
    const fullCase = [{}]
    for (let i = 0; i < rows1.length; i++) {
      fullCase.push({
        case_id: rows1[i].case_id,
        defendant_id: rows1[i].defendant_id,
        prosecutor_id: rows1[i].prosecutor_id,
        is_decision: rows1[i].is_decision,
        is_defedant_agree: rows1[i].is_defedant_agree,
        issue: rows1[i].issue,
        last_enter: rows1[i].last_enter,
        pro_first_name: rows2[i].first_name,
        pro_last_name: rows2[i].last_name,
        pro_email: rows2[i].email,
        pro_password: rows2[i].password,
        pro_phone: rows2[i].phone,
        pro_address: rows2[i].address,
        def_email: rows1[i].email,
        def_first_name: rows1[i].first_name,
        def_last_name: rows1[i].last_name,
        def_email: rows1[i].email,
        def_password: rows1[i].password,
        def_phone: rows1[i].phone,
        def_address: rows1[i].address
      })
    }
    console.log(fullCase)
    return fullCase.splice(1,fullCase.length).sort((a, b) => new Date(b.last_enter).getTime() - new Date(a.last_enter).getTime());;
  }
  catch (error) {
    console.log(error);
  }
}
async function getCaseById(id) {
  const sql = `SELECT * FROM cases WHERE case_id = ${id}`;
  try {
    const [rows, fields] = await pool.query(sql);
    console.log(rows)
    return rows;
  }
  catch (error) {
    console.log(error);
  }
}
async function getCaseByUserId(id) {
  const sql = `SELECT * FROM cases WHERE defendant_id = '${id}' or prosecutor_id = '${id}'`;
  try {
    const [rows, fields] = await pool.query(sql);
    console.log(rows)
    return rows;
  }
  catch (error) {
    console.log(error);
  }
}

async function createCase(caseDetails) {
  currentDate = new Date();
  const time = currentDate.getTime();
  console.log(new Date(time).getFullYear() + '-' + appendLeadingZeros(new Date(time).getMonth() + 1) + '-' + new Date(time).getDate())
  const sql = `insert into cases(last_enter,is_defedant_agree,is_decision,prosecutor_id,defendant_id,issue) values('${new Date().getFullYear()}-${appendLeadingZeros(new Date().getMonth() + 1)}-${new Date().getDate()}',false,false,'${caseDetails.prosecutor_id}','${caseDetails.defendant_id}','${caseDetails.issue}')`;
  try {
    const [rows, fields] = await pool.query(sql);
    return rows;
  }
  catch (error) {
    console.log(error);
  }
}

async function updateLastEnter(id) {
  currentDate = new Date();
  const time = currentDate.getTime();
  console.log(new Date(time).getFullYear() + '-' + appendLeadingZeros(new Date(time).getMonth() + 1) + '-' + new Date(time).getDate())
  console.log(id)
  const sql = `update cases SET last_enter='${new Date().getFullYear()}-${appendLeadingZeros(new Date().getMonth() + 1)}-${new Date().getDate()}' WHERE cases.case_id = '${id}'`
  try {
    const [rows, fields] = await pool.query(sql);
    return rows;
  }
  catch (error) {
    console.log(error);
  }
}

function appendLeadingZeros(int) {
  if (int < 10) {
    return '0' + int;
  }
  return int;
}

module.exports = { getCases, getCaseById, createCase, getCaseByUserId, geFullCases, updateLastEnter }