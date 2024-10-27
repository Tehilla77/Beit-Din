const pool = require('../db_manager');
const discussionRouter = require('../routers/discussion');

async function getDiscussions() {
  const sql = 'SELECT * FROM discussions';
  try{
  const [rows, fields] = await pool.query(sql);
  console.log(rows)
  return rows;
}
catch(error){
  console.log(error); 
  return error;
}
}

async function getDiscussionById(id) {
  const sql = `SELECT * FROM discussions WHERE discussion_id = ${id}`
  const protocol = `SELECT * FROM files WHERE discussion_id = ${id}`
  try{
  const [rows, fields] = await pool.query(sql)
  const [p_rows, p_fields] = await pool.query(protocol)
  if (p_rows.length > 0) {
    console.log(rows[0])
    console.log('getDiscussionById')
    return {
      ...rows[0],
      isProtocol: true
    }

  }
  else {
    console.log(rows[0])
    console.log('getDiscussionById')
    return {
      ...rows[0],
      isProtocol: false
    }
  }
}
catch(error){
  console.log(error); 
  return error;
}
}
async function getDiscussionsByDate(date) {
  const sql = `SELECT * FROM discussions WHERE discussion_date = ${date}`;
  try{
  const [rows, fields] = await pool.query(sql);
  console.log(rows)
  return rows;
}
catch(error){
  console.log(error); 
  return error;
}
}

async function getDiscussionByCaseId(id) {
  const sql = `SELECT * FROM discussions WHERE case_id = ${id}`
  try{
  const [rows, fields] = await pool.query(sql)
  if(rows.length>0)
  {
  for(let i = 0; i<rows.length; i++){
    const protocol = `SELECT * FROM files WHERE discussion_id = ${rows[i].discussion_id}`
    const [p_rows, p_fields] = await pool.query(protocol)
    if(p_rows.length>0){
      rows[i].isProtocol = true
    }
    else{
      rows[i].isProtocol = false
    }
  }
}
    return rows
  }
  catch(error){
    console.log(error); 
    return error;
  }
}

async function createDiscussion(Dis) {
  const sqlCheck = `select * from discussions where date(discussion_date) = date('${Dis.discussion_date}') and (time(discussion_end) > time('${Dis.discussion_date}') || time(discussion_date) > time('${Dis.discussion_end}'));`
  try{
  const [rowsCheck, fieldsCheck] = await pool.query(sqlCheck);
  if(rowsCheck.length==0)
  {
    const sql = `insert into discussions(discussion_date,discussion_end,case_id,is_finish) values ('${Dis.discussion_date}','${Dis.discussion_end}','${Dis.case_id}',false)`;
    console.log(sql)
    const [rows, fields] = await pool.query(sql);
    return rows;
  }
}
catch(error){
  console.log(error); 
  return error;
}
}

async function createInquiries(inquirie) {
  const sql = `insert into inquiries(content_inquiries,finish_date,type_inquiries,discussion_id,is_done)values('${inquirie.content_inquirie}','${inquirie.finish_date}',${inquirie.type_inquirie},${inquirie.discussion_id},false);`;
  try{
  console.log(sql)
  const [rows, fields] = await pool.query(sql);
  console.log(rows);
  return rows;
}
catch(error){
  console.log(error); 
  return error;
}
}

async function getInquiriesByDiscussionId(id) {
  const sql = `SELECT * FROM inquiries WHERE discussion_id = ${id}`
  try{
  const [rows, fields] = await pool.query(sql)
  console.log(rows[0])
  return rows[0];
}
catch(error){
  console.log(error); 
  return error;
}
}
async function getInquiriesByDiscussionId(id) {
  const sql = `SELECT * FROM inquiries WHERE discussion_id = ${id}`
  try{
  const [rows, fields] = await pool.query(sql)
  console.log(rows[0])
  return rows[0];
}
catch(error){
  console.log(error); 
  return error;
}
}

async function getInquiriesThatPassed() {
  const sql = 'SELECT * FROM inquiries WHERE inquiries.finish_date < current_date AND is_done==false ORDER BY inquiries.finish_date DESC'
  try{
  const [rows, fields] = await pool.query(sql)
  console.log(rows[0])
  return rows[0];
}
catch(error){
  console.log(error); 
  return error;
}
}

async function deleteDiscussion(discussion_id) {
  const sql = `delete FROM discussions WHERE discussion_id=${discussion_id}`;
  try{
  const [rows, fields] = await pool.query(sql)
  console.log(rows[0])
  return rows[0];
}
catch(error){
  console.log(error); 
  return error;
}
}

// async function getInquiriesOfPassed() {
//   const sql = 'SELECT * FROM inquiries LEFT JOIN discussions ON inquiries.discussion_id=discussions.discussion_id WHERE discussions.discussion_date < current_date ORDER BY inquiries.finish_date DESC'
//   const [rows, fields] = await pool.query(sql)
//   console.log(rows[0])
//   return rows[0]
// }

module.exports = { getDiscussions, getDiscussionById, getDiscussionByCaseId, createDiscussion, createInquiries, getInquiriesByDiscussionId, getInquiriesThatPassed, createInquiries,deleteDiscussion }