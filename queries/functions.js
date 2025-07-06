import mysql from "../connection/con-mysql.js";

try {
  const conn = await mysql.getConnection();
  conn.release();
  const result = await conn.query(`SELECT Sum(price) As Total FROM products`);
  const result = await conn.query(`SELECT AVG(price) As Avarage FROM products`);
  const result = await conn.query(`SELECT MAX(price) As Maximum FROM products`);
  const result = await conn.query(`SELECT MIN(price) As Minimum FROM products`);
  const result = await conn.query(`SELECT COUNT(id) As COUNT_OF_PRODUCT FROM products`);
    const result = await conn.query(`SELECT COUNT(DISTINCT country) As COUNT_OF_COUNTRY FROM users`);//unique countr
  const result = await conn.query(`SELECT COUNT(lastName) As COUNT_LASTNAME_KAYA WHERE lastName = ? FROM products`,['Kaya']);
  
  console.log(result[0]);
} catch (error) {
  console.log(error);
}
