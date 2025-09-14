
👉️ CREATE NEW USER
CREATE USER 'mesto'@'localhost' IDENTIFIED BY 'mk1972mk'


👉️ ALTER PASSWORD
ALTER USER 'mesto'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mk1972mk';
flush privileges;


👉️ PERMISSION
GRANT ALL ON *.* TO 'mesto'@'localhost';
GRANT ALL ON blog.* TO 'mesto'@'localhost';
FLUSH PRIVILEGES;


👉️ REVOKE
REVOKE ALL PRIVILEGES ON *.* FROM 'mesto'@'localhost';
REVOKE ALL PRIVILEGES ON blog.* FROM 'mesto'@'localhost';
FLUSH PRIVILEGES;


👉️ ALTER SPECIFIC ROLE
GRANT SELECT, INSERT, DELETE ON blog.* TO mesto@'localhost';//spesific grant
FLUSH PRIVILEGES;


👉️ SHOW USER PERMISSION
SELECT User, Host FROM mysql.user;
SHOW GRANTS FOR 'mesto'@'localhost';
SELECT db, host, user FROM mysql.db;
SELECT db, host, user FROM mysql.db WHERE db = 'db';
SELECT * FROM mysql.db WHERE Db = 'db'\G;


👉️ LOCK
CREATE USER mesto@localhost IDENTIFIED BY 'new_password' ACCOUNT LOCK;
CREATE USER mesto@localhost IDENTIFIED BY 'new_password' ACCOUNT UNLOCK;
ALTER USER mesto@localhost ACCOUNT LOCK;
ALTER USER username@hostname ACCOUNT UNLOCK;

SELECT User, Host, account_locked FROM mysql.user WHERE User = 'mesto';


👉️ DROP
DROP USER 'mesto'@'localhost';








