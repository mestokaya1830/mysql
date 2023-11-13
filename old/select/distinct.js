import mysql from "../connection/con-mysql.js";

//The SELECT DISTINCT command returns only distinct (different) values in the result set.
try {
  const conn = await mysql.getConnection();
  conn.release();
  const result = await conn.query(`SELECT DISTINCT city FROM users;`);
  console.log(result[0]);
} catch (error) {
  console.log(error);
}