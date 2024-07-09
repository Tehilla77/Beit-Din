const pool = require('../db_manager')
const config = require('../config/config')

async function getUsers() {
    const sql = 'SELECT * FROM users';
    const [rows, fields] = await pool.query(sql);
    console.log(rows)
    return rows;
  }

  async function getUserById(id) {
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    const [rows, fields] = await pool.query(sql);
    console.log(rows)
    return rows;
  }

  async function isUserExist(first_name,last_name,pwd) {
    const sql = `SELECT * FROM users WHERE first_name = '${first_name}' and last_name = '${last_name}' and users.password = '${pwd}'`
    const [rows, fields] = await pool.query(sql);
    return rows;
  }

  async function isIdExist(id) {
    const sql = `SELECT * FROM users WHERE users.id = ${id}`
    const [rows, fields] = await pool.query(sql);
    if(rows.length>0){
      console.log('isIdExist',rows.length )
      console.log(rows.length)
      return true;
    }
    return false;
  }

  async function isEmailExist(email) {
    const sql = `SELECT * FROM users WHERE users.email = '${email}'`
    const [rows, fields] = await pool.query(sql);
    if(rows.length>0){
      console.log('isEmailExist')
      console.log(rows)
      return true;
    }
    return false;
  }

  async function createUser(user) {
    if(isEmailExist(user.email)&&isIdExist(user.id)){
      try{
        if(config.manager_id==user.id){
          console.log('manager')
          const sql = `insert into users values('${user.id}','${user.password}','${user.first_name}','${user.last_name}','${user.email}','${user.phone}','${user.address}', ${true})`;
          console.log(sql);
          const [rows, fields] = await pool.query(sql);
          return rows;
        }
        else{
          console.log('not manager')
          const sql = `insert into users values('${user.id}','${user.password}','${user.first_name}','${user.last_name}','${user.email}','${user.phone}','${user.address}', ${false})`;
          console.log(sql);
          const [rows, fields] = await pool.query(sql);
          return rows;
        }
      }
      catch{
        return 'the insert user failed'
      }
    }
    else{
      return 'user-id or user-email already exist'
    }
  }

  async function deleteUser(id) {
    if(isIdExist(id)){
    const sql = `delete * FROM users WHERE users.id = ${id}`
    const [rows, fields] = await pool.query(sql);
    return 200;
  }
  }
  async function updateUser(user) {
    if(isIdExist(id)){
      const sql = `update * FROM users SET id=${user.id} password=${user.password} first_name=${user.first_name} last_name=${user.last_name} email=${user.email} phone=${user.phone} address=${user.address} WHERE users.id = ${user.id}`
      const [rows, fields] = await pool.query(sql);
      return 200;
    }
  }

  module.exports={getUsers,getUserById,isUserExist,createUser,deleteUser,updateUser}