import dataBase from "../repository/mysql.js";

async function login(name, password) {

  const sql = "SELECT id_user, name, typeUser FROM users WHERE name = ? AND password = ?";
  
  const dataLogin = [name, password];

  const conn = await dataBase.connectDB();
  const [rows] = await conn.query(sql, dataLogin);
  conn.end();

  return rows.length > 0 ? rows[0] : null;
}

export default { login };