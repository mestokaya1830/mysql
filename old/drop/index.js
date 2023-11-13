import mysql from "../connection/con-mysql.js";

try {
  const conn = await mysql.getConnection();
  conn.release();
  const column = await conn.query(`DROP INDEX idx_name ON Users;`);
  console.log("Index Deleted");
} catch (error) {
  console.log(error);
}