# 🐬 MySQL — Relational Database

---

## What is it?
MySQL is the relational database that **permanently stores all project data** —
users, roles, departments, and courses. It's the single source of truth for the backend.

---

## Where is it used?
MySQL runs separately as a local service. The backend connects to it via JDBC.

```
MySQL Database: edumanage_db
├── Table: roles           ← ROLE_ADMIN, ROLE_TEACHER, ROLE_STUDENT, ROLE_PARENT
├── Table: users           ← All registered users (all roles in one table)
├── Table: user_roles      ← Join table: which user has which role(s)
├── Table: departments     ← CSE, IT, ECE, EE, ME, CE
└── Table: courses         ← Courses linked to departments and teachers
```

---

## Why MySQL?
| Reason | Explanation |
|--------|-------------|
| **Relational integrity** | Foreign keys ensure a course can't reference a non-existent department |
| **ACID transactions** | Atomic writes — either all changes save or none do |
| **JPA-friendly** | Works natively with Hibernate — no manual schema management needed |
| **Widely used** | Industry standard — abundant documentation and tooling |
| **Free & local** | Easy to set up locally via MySQL Installer |

---

## How it's used in this project

### 1. Database connection (application.properties)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/edumanage_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

### 2. Table structure (auto-created by Hibernate)

**`roles` table**
```
id | name
---|-------------
 1 | ROLE_ADMIN
 2 | ROLE_TEACHER
 3 | ROLE_STUDENT
 4 | ROLE_PARENT
```

**`users` table**
```
id | username | email          | password (BCrypt) | first_name | last_name | active | created_at
```

**`user_roles` (join table)**
```
user_id | role_id
--------|--------
      1 |       1    ← user 1 is ADMIN
      2 |       2    ← user 2 is TEACHER
```

**`departments` table**
```
id | code | name                          | icon | hod              | status | student_count | faculty_count
```

**`courses` table**
```
id | title              | semester | credits | department_id | assigned_teacher_id
```

### 3. MySQL Connector/J — the JDBC driver
```xml
<!-- pom.xml — tells Java how to connect to MySQL -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

### 4. How data flows from MySQL to the browser
```
MySQL table row
    → Hibernate loads it as a Java object (e.g. Department)
    → Jackson serializes it to JSON
    → Spring Web sends JSON in HTTP response
    → Axios receives JSON in React
    → React renders it in the dashboard
```

### 5. Useful MySQL commands for this project
```sql
-- Connect
mysql -u root -p
USE edumanage_db;

-- Quick overview of all data
SELECT 'users', COUNT(*) FROM users UNION ALL
SELECT 'departments', COUNT(*) FROM departments UNION ALL
SELECT 'courses', COUNT(*) FROM courses;

-- See all users with roles
SELECT u.username, u.email, r.name AS role
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON r.id = ur.role_id;
```
See the full command reference: [`commands/mysql-commands.md`](../commands/mysql-commands.md)
