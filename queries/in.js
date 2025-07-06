import mysql from "../connection/con-mysql.js";

//The IN command allows you to specify multiple values in a WHERE clause.
try {
  const conn = await mysql.getConnection();
  conn.release();
  const result = await conn.query(`SELECT * FROM users WHERE city IN('Amed','Maras')`);
  console.log(result[0]);
} catch (error) {
  console.log(error);
}