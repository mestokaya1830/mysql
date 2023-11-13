import mysql from "../connection/con-mysql.js";

try {
  const conn = await mysql.getConnection();
  conn.release();
  const result = await conn.query(`SELECT * FROM users WHERE city NOT IN('Amed','Maras')`);
  console.log(result[0]);
} catch (error) {
  console.log(error);
}