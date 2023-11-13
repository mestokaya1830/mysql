import mysql from "../connection/con-mysql.js";

try {
  const conn = await mysql.getConnection();
  conn.release();
  const table = await conn.query(`
  create table USERS(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(40) NOT NULL,
    age SMALLINT(3) DEFAULT  4000,
    created_at DATE,
    PRIMARY KEY (id)
  );`);
  console.log("Table created");
} catch (error) {
  console.log(error);
}
