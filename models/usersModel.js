const pool = require('../db_manager')
const config = require('../config/config')

async function getUsers() {
  const sql = 'SELECT * FROM users';
  try {
    const [rows, fields] = await pool.query(sql);
    console.log(rows)
    return rows;
  }
  catch (error) {
    console.log(error); return error;
  }
}

async function getUserById(id) {
  const sql = `SELECT * FROM users WHERE id = ${id}`;
  try {
    const [rows, fields] = await pool.query(sql);
    console.log(rows)
    return rows[0];
  }
  catch (error) {
    console.log(error); console.log(error); return error;
  }
}

async function isUserExist(first_name, last_name, pwd) {
  const sql = `SELECT * FROM users WHERE first_name = '${first_name}' and last_name = '${last_name}' and users.password = '${pwd}'`
  try {
    const [rows, fields] = await pool.query(sql);
    console.log(rows);
    return rows;
  }
  catch (error) {
    console.log(error); return error;
  }
}

async function isIdExist(id) {
  const sql = `SELECT * FROM users WHERE users.id = '${id}'`
  try {
    const [rows, fields] = await pool.query(sql);
    if (rows.length > 0) {
      return true;
    }
    return false;
  }
  catch (error) {
    console.log(error); return error;
  }
}

async function isEmailExist(email) {
  const sql = `SELECT * FROM users WHERE users.email = '${email}'`
  try {
    const [rows, fields] = await pool.query(sql);
    if (rows.length > 0) {
      return true;
    }
    return false;
  }
  catch (error) {
    console.log(error); return error;
  }
}

async function createUser(user) {
  try {
    if (isIdExist(user.id)) {
      if (config.manager_id == user.id) {
        const sql = `insert into users values('${user.id}','${user.password}','${user.first_name}','${user.last_name}','${user.email}','${user.phone}','${user.address}', ${true})`;
        console.log(sql);
        const [rows, fields] = await pool.query(sql);
        return rows;
      }
      else {
        const sql = `insert into users values('${user.id}','${user.password}','${user.first_name}','${user.last_name}','${user.email}','${user.phone}','${user.address}', ${false})`;
        console.log(sql);
        const [rows, fields] = await pool.query(sql);
        return rows;
      }
    }
    else {
      // return new Error ('user-id already exist');
      return 'user-id already exist';
    }
  }
  catch (error) {
    console.log(error); return error;
  }
}

async function deleteUser(id) {
  if (isIdExist(id)) {
    const sql = `delete FROM users WHERE users.id = '${id}'`
    const [rows, fields] = await pool.query(sql);
    return 200;
  }
}
async function updateUser(user) {
  try {
    if (isIdExist(id)) {
      const sql = `update * FROM users SET id=${user.id} password=${user.password} first_name=${user.first_name} last_name=${user.last_name} email=${user.email} phone=${user.phone} address=${user.address} WHERE users.id = ${user.id}`
      const [rows, fields] = await pool.query(sql);
      return rows;
    }
  }
  catch (error) {
    console.log(error); return error;
  }
}

module.exports = { getUsers, getUserById, isUserExist,isEmailExist, createUser, deleteUser, updateUser }