# 🗄️ MySQL Commands — EduManagePro

## 🔌 Connect to MySQL
```cmd
mysql -u root -p
mysql -u root -p edumanage_db
```

---

## 🗄️ Database Commands
```sql
SHOW DATABASES;
USE edumanage_db;
CREATE DATABASE IF NOT EXISTS edumanage_db;
DROP DATABASE edumanage_db;
SELECT DATABASE();
```

---

## 📋 Table Commands
```sql
SHOW TABLES;
DESCRIBE users;
DESCRIBE roles;
DESCRIBE students;
SHOW CREATE TABLE users;
```

---

## 👥 View All Data
```sql
SELECT * FROM users;
SELECT * FROM roles;
SELECT * FROM students;
SELECT * FROM teachers;
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM students;
```

---

## 🔍 Filter & Search
```sql
SELECT * FROM users WHERE email = 'admin@edu.com';
SELECT * FROM users WHERE role = 'STUDENT';
SELECT * FROM users WHERE role = 'TEACHER';
SELECT * FROM users WHERE role = 'ADMIN';
SELECT * FROM students WHERE department = 'Computer Science';
SELECT * FROM users WHERE name LIKE '%Mansi%';
```

---

## 👤 Users With Roles (JOIN)
```sql
SELECT u.id, u.name, u.email, r.name AS role
FROM users u
JOIN roles r ON u.role_id = r.id;
```

---

## ✏️ Insert / Update / Delete
```sql
-- Insert user
INSERT INTO users (name, email, password, role)
VALUES ('Test User', 'test@edu.com', 'hashed_password', 'STUDENT');

-- Update role
UPDATE users SET role = 'ADMIN' WHERE email = 'test@edu.com';

-- Delete user
DELETE FROM users WHERE email = 'test@edu.com';
```

---

## 🧹 Reset Tables
```sql
TRUNCATE TABLE users;
DROP TABLE IF EXISTS users;
```

---

## 📤 Export & Import (CMD)
```cmd
:: Backup database
mysqldump -u root -p edumanage_db > edumanage_backup.sql

:: Restore database
mysql -u root -p edumanage_db < edumanage_backup.sql
```

---

## ⚙️ Utility
```sql
SELECT VERSION();
SELECT USER();
SELECT user, host FROM mysql.user;
SHOW PROCESSLIST;
EXIT;
```
