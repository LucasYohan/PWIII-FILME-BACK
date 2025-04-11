import dataBase from "../repository/mysql.js";

async function login(username, password) {

  const sql = "SELECT id_user, username, typeUser FROM users WHERE username = ? AND password = ?";
  
  const dataLogin = [username, password];

  const conn = await dataBase.connectDB();
  const [rows] = await conn.query(sql, dataLogin);
  conn.end();

  return rows.length > 0 ? rows[0] : null;
}

export default { login };