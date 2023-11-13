import mysql from "../connection/con-mysql.js";

try {
  const conn = await mysql.getConnection();
  conn.release();
  const column = await conn.query(`ALTER TABLE Users ADD salary DECIMAL(5)`);
  console.log("Column Added");
} catch (error) {
  console.log(error);
}
