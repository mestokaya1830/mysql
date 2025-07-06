import mysql from "../connection/con-mysql.js";

try {
  const conn = await mysql.getConnection();
  conn.release();
  const result = await conn.query(`SELECT * FROM users WHERE name LIKE "Mu%"`);//first char
  const result = await conn.query(`SELECT * FROM users WHERE name LIKE "%Mu"`);//last char
  //with wild
  const result = await conn.query(`SELECT * FROM users WHERE name LIKE "%____"`);//lmust be length 4
  const result = await conn.query(`SELECT * FROM users WHERE name LIKE "%Mu%"`);//firts or last char
  const result = await conn.query(`SELECT * FROM users WHERE name LIKE "Mu__"`);//first char must be length 4
  const result = await conn.query(`SELECT * FROM users WHERE name LIKE "__ya"`);//last char must be length 4
  const result = await conn.query(`SELECT * FROM users WHERE name LIKE "_ay_"`);//length 4 first any 3. and 4. ay last any
  console.log(result[0]);
} catch (error) {and
  console.log(error);
}
