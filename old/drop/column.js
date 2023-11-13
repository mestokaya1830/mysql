import mysql from "../connection/con-mysql.js";

try {
  const conn = await mysql.getConnection()
  conn.release()
  await conn.query(`ALTER TABLE Users DROP COLUMN dd;`)
  console.log('Deleted')
} catch (error) {
  console.log(error)
}