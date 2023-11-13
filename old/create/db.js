import mysql from "../connection/con-mysql.js";

try {
  const conn = await mysql.getConnection();
  conn.release();
  const db = await conn.query(
    `create database if not exists newdb CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci;`
  );
  console.log("Db Created");
} catch (error) {
  console.log(error);
}
