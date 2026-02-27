# 🗄️ MySQL Commands — EduManagePro

> **Real tables in this project:**
> `roles` · `users` · `user_roles` · `departments` · `courses`
>
> ⚠️ There is NO `students`, `teachers`, or separate role column — all users live in `users`, differentiated via the `user_roles` join table.

---

## STEP 1 — Connect to MySQL (CMD)

```cmd
mysql -u root -p
```

Enter your root password when prompted.

---

## STEP 2 — Select the Database

```sql
USE edumanage_db;
```

Verify you're in the right DB:

```sql
SELECT DATABASE();
```

---

## STEP 3 — Confirm Tables Exist

```sql
SHOW TABLES;
```

Expected output — 5 tables:
```
courses
departments
roles
user_roles
users
```

---

## STEP 4 — View All Project Data

Run each block to see all data:

```sql
-- 1. Roles (should show ADMIN, STUDENT, TEACHER, PARENT)
SELECT * FROM roles;

-- 2. All users (password hidden for safety)
SELECT id, username, email, first_name, last_name, phone, active, created_at
FROM users
ORDER BY id;

-- 3. Each user with their role (JOIN across 3 tables)
SELECT
    u.id,
    u.username,
    u.email,
    u.first_name,
    u.last_name,
    r.name AS role,
    u.active,
    u.created_at
FROM users u
JOIN user_roles ur ON u.id  = ur.user_id
JOIN roles r       ON r.id  = ur.role_id
ORDER BY u.id;

-- 4. All departments
SELECT id, code, name, icon, hod, status, student_count, faculty_count
FROM departments
ORDER BY id;

-- 5. All courses with department name
SELECT
    c.id,
    c.title,
    c.semester,
    c.credits,
    c.assigned_teacher_id,
    d.name AS department
FROM courses c
LEFT JOIN departments d ON c.department_id = d.id
ORDER BY d.name, c.semester;

-- 6. Row count summary across all tables
SELECT 'users'       AS `table`, COUNT(*) AS `rows` FROM users       UNION ALL
SELECT 'roles',                  COUNT(*)            FROM roles       UNION ALL
SELECT 'user_roles',             COUNT(*)            FROM user_roles  UNION ALL
SELECT 'departments',            COUNT(*)            FROM departments UNION ALL
SELECT 'courses',                COUNT(*)            FROM courses;
```

---

## STEP 5 — Filter by Role

Since roles are stored in a join table, use a JOIN — not a `WHERE role =` column:

```sql
-- All ADMIN users
SELECT u.id, u.username, u.email
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r       ON r.id = ur.role_id
WHERE r.name = 'ROLE_ADMIN';

-- All TEACHER users
SELECT u.id, u.username, u.email
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r       ON r.id = ur.role_id
WHERE r.name = 'ROLE_TEACHER';

-- All STUDENT users
SELECT u.id, u.username, u.email
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r       ON r.id = ur.role_id
WHERE r.name = 'ROLE_STUDENT';
```

---

## STEP 6 — Describe Table Structures

```sql
DESCRIBE users;
DESCRIBE roles;
DESCRIBE user_roles;
DESCRIBE departments;
DESCRIBE courses;
```

---

## STEP 7 — Search / Lookup

```sql
-- Find a user by email
SELECT * FROM users WHERE email = 'admin@edu.com';

-- Find a user by username
SELECT * FROM users WHERE username = 'sonal';

-- Fuzzy name search
SELECT * FROM users WHERE first_name LIKE '%Mansi%';
```

---

## STEP 8 — Promote a User to ADMIN

```sql
-- Find the role id first
SELECT id FROM roles WHERE name = 'ROLE_ADMIN';  -- note the id (e.g. 1)

-- Find the user id
SELECT id FROM users WHERE email = 'youruser@edu.com';

-- Insert into join table
INSERT INTO user_roles (user_id, role_id) VALUES (<user_id>, <role_id>);
```

---

## STEP 9 — Backup & Restore (CMD)

```cmd
:: Backup entire database
mysqldump -u root -p edumanage_db > edumanage_backup.sql

:: Restore from backup
mysql -u root -p edumanage_db < edumanage_backup.sql
```

---

## STEP 10 — Utility

```sql
SELECT VERSION();           -- MySQL version
SELECT USER();              -- Currently logged-in user
SHOW PROCESSLIST;           -- Active queries
EXIT;                       -- Quit MySQL shell
```
