import mysql from "../connection/con-mysql.js";

try {
  const conn = await mysql.getConnection();
  conn.release();
  const result = await conn.query(`SELECT * FROM users WHERE name != ?`,['Filiz']);
  // const result = await conn.query(`SELECT * FROM users WHERE NOT name = ?`,['Filiz']);
  console.log(result[0]);
} catch (error) {
  console.log(error);
}