# 🏗️ EduManage Pro — Technology Stack Documentation

This folder contains a detailed breakdown of **every technology** used in this project —
where it is used, why it was chosen, and exactly how it works in the codebase.

---

## 📂 Files in this folder

| File | Technology | Layer |
|------|-----------|-------|
| [01-react.md](./01-react.md) | React 19 | Frontend |
| [02-vite.md](./02-vite.md) | Vite 7 | Frontend Tooling |
| [03-react-router.md](./03-react-router.md) | React Router DOM 7 | Frontend Routing |
| [04-axios.md](./04-axios.md) | Axios | Frontend → Backend Communication |
| [05-css.md](./05-css.md) | Vanilla CSS | Frontend Styling |
| [06-react-libraries.md](./06-react-libraries.md) | Lucide React, React Hot Toast | Frontend UI |
| [07-spring-boot.md](./07-spring-boot.md) | Spring Boot 3.2.3 | Backend Framework |
| [08-spring-security-jwt.md](./08-spring-security-jwt.md) | Spring Security + JJWT | Authentication & Authorization |
| [09-spring-data-jpa.md](./09-spring-data-jpa.md) | Spring Data JPA + Hibernate | Database ORM |
| [10-mysql.md](./10-mysql.md) | MySQL | Database |
| [11-lombok.md](./11-lombok.md) | Lombok | Backend Code Generation |
| [12-maven.md](./12-maven.md) | Maven | Backend Build Tool |

---

## 🗺️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    BROWSER (User)                        │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP (port 5174)
┌───────────────────────▼─────────────────────────────────┐
│              FRONTEND  —  React + Vite                   │
│  Pages: Landing, Login, Register, Dashboards             │
│  Routing: React Router DOM                               │
│  HTTP calls: Axios (sends JWT in header)                 │
│  Icons: Lucide React   Toasts: React Hot Toast           │
│  Styling: Vanilla CSS (index.css, landing.css, etc.)     │
└───────────────────────┬─────────────────────────────────┘
                        │ REST API / JSON (port 8080)
┌───────────────────────▼─────────────────────────────────┐
│              BACKEND  —  Spring Boot 3                   │
│  Web Layer:      @RestController (Spring Web)            │
│  Security Layer: Spring Security + JJWT (JWT tokens)     │
│  Business Layer: @Service classes                        │
│  Data Layer:     Spring Data JPA + Hibernate             │
│  Code helpers:   Lombok, Spring Validation               │
│  Build:          Maven                                   │
└───────────────────────┬─────────────────────────────────┘
                        │ JDBC (MySQL Connector/J)
┌───────────────────────▼─────────────────────────────────┐
│              DATABASE  —  MySQL                          │
│  Tables: users, roles, user_roles, departments, courses  │
└─────────────────────────────────────────────────────────┘
```

---

## 🔁 Request Lifecycle (End to End)

```
1. User opens browser → Vite serves the React app
2. React Router renders the correct page/dashboard
3. User logs in → Axios POSTs to /api/auth/login
4. Spring Security + BCrypt verify credentials
5. JJWT creates a signed token and returns it
6. React stores the token in localStorage via AuthContext
7. Every subsequent Axios call attaches: Authorization: Bearer <token>
8. Spring Security's JwtAuthFilter validates the token on every request
9. @PreAuthorize annotations guard role-specific endpoints
10. Spring Data JPA (Hibernate) queries MySQL and returns data
11. Controller serializes response → JSON → Axios receives it → React renders it
```
