# 📚 EduManagePro — Command Reference Index

A quick reference folder for all commands used in this project.

---

## 📂 Files in this folder

| File | Description |
|------|-------------|
| `mysql-commands.md` | All MySQL database commands (connect, query, insert, export, etc.) |
| `project-commands.md` | CMD commands for project structure, running frontend & backend, searching files |

---

## ⚡ Most Used Commands (Quick Cheat Sheet)

### Start Everything
```cmd
:: Terminal 1 — Backend
cd "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro\edumanage-backend"
mvn spring-boot:run

:: Terminal 2 — Frontend
cd "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro\edumanage-frontend"
npm run dev

:: Terminal 3 — MySQL
mysql -u root -p
USE edumanage_db;
SELECT * FROM users;
```

---

## 🌐 App URLs (when running)
- **Frontend** → http://localhost:5173
- **Backend API** → http://localhost:8080
- **MySQL** → localhost:3306

---

> 📝 Add more `.md` files here as the project grows!
