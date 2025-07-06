import mysql from "../connection/con-mysql.js";

try {
  const conn = await mysql.getConnection();
  conn.release();
  const result = await conn.query(`SELECT * FROM users Where age between 30 and 40 `);
  const result = await conn.query(`SELECT * FROM users Where age not between 30 and 40 `);
  const result = await conn.query(`SELECT * FROM users Where age > 30 and age < 41 `);//without between
  console.log(result[0]);
} catch (error) {
  console.log(error);
}
