const pool = require('../db_manager')

async function getUsers() {
    const sql = 'SELECT * FROM users';
    const [rows, fields] = await pool.query(sql);
    console.log('getUsers')
    console.log(rows)
    return rows;
  }
  async function getUserById(id) {
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    const [rows, fields] = await pool.query(sql);
    console.log('getUserById')
    console.log(rows)
    return rows;
  }
  async function isUserExist(id,pwd) {
    const sql = `SELECT * FROM users WHERE users.id = ${id} and users.password = ${pwd}`
    const [rows, fields] = await pool.query(sql);
    if(rows!=null){
      return rows;
    }
    return null;
  }

  async function createUser(user) {
    const sql = `insert into users values(${user.id},${user.password},${user.first_name},${user.last_name},${user.email},${user.phone},${user.address}, ${false})`;
    const [rows, fields] = await pool.query(sql);
  }

  module.exports={getUsers,getUserById,isUserExist,createUser}