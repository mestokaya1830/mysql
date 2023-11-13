import mysql from "../connection/con-mysql.js";

try {
  const conn = await mysql.getConnection()
  conn.release()
  await conn.query(`DROP DATABASE newdb;`)
  console.log('Deleted')
} catch (error) {
  console.log(error)
}