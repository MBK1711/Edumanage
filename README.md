# EduManage Pro – Multi-Role Learning Administration System

A full-stack, production-ready LMS (Learning Management System) with JWT authentication,
role-based access control, and four distinct dashboards.

---

## 🏗️ Tech Stack

| Layer    | Technology                                          |
|----------|-----------------------------------------------------|
| Backend  | Spring Boot 3.2, Spring Security, Spring Data JPA  |
| Database | MySQL 8+                                            |
| Auth     | JWT (jjwt 0.11.5), BCrypt                          |
| Frontend | React 18 + Vite, React Router v6, Axios            |
| Styling  | Vanilla CSS (dark glass-morphism design system)    |

---

## 📁 Project Structure

```
EduManagePro/
├── edumanage-backend/           ← Spring Boot API
│   └── src/main/java/com/edumanage/backend/
│       ├── config/              ← SecurityConfig, DataInitializer (CORS, JWT, roles seed)
│       ├── controller/          ← AuthController, UserController
│       ├── dto/                 ← LoginRequest, RegisterRequest, JwtResponse, MessageResponse
│       ├── entity/              ← User, Role, Vendor, Item, Order, OrderItem
│       ├── repository/          ← JPA Repositories
│       ├── security/            ← JwtUtils, AuthTokenFilter, UserDetailsImpl, AuthEntryPoint
│       └── service/             ← AuthService, UserService
│
└── edumanage-frontend/          ← React / Vite SPA
    └── src/
        ├── api/api.js           ← Axios client (JWT interceptors)
        ├── context/AuthContext.jsx
        ├── components/
        │   ├── Sidebar.jsx      ← Role-aware navigation
        │   └── RouteGuards.jsx  ← PrivateRoute, PublicRoute
        └── pages/
            ├── LoginPage.jsx
            ├── RegisterPage.jsx
            ├── DashboardPage.jsx
            └── dashboards/
                ├── AdminDashboard.jsx
                ├── InstructorDashboard.jsx
                ├── VendorDashboard.jsx
                └── StudentDashboard.jsx
```

---

## 🚀 Quick Start

### Prerequisites
- Java 21+
- Maven 3.8+
- MySQL 8+
- Node.js 18+

---

### 1. Database Setup

```sql
-- Create the database (Spring Boot will create tables automatically)
CREATE DATABASE IF NOT EXISTS edumanage_db;
```

---

### 2. Configure Backend

Edit `edumanage-backend/src/main/resources/application.properties`:

```properties
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

---

### 3. Start Backend

```bash
cd edumanage-backend
mvn spring-boot:run
```

> The backend starts on **http://localhost:8080**
> On first run, Spring Boot auto-creates all tables and seeds 4 roles.

---

### 4. Start Frontend

```bash
cd edumanage-frontend
npm run dev
```

> Frontend is available at **http://localhost:5173**

---

## 🔐 Authentication Flow

```
POST /api/auth/register  →  Create user (roles: admin | instructor | vendor | student)
POST /api/auth/login     →  Returns JWT token + user info + roles[]
```

JWT is stored in `localStorage` and auto-attached to every API request via Axios interceptor.

---

## 👥 Roles & Dashboards

| Role       | Badge       | Dashboard Access                          |
|------------|-------------|-------------------------------------------|
| ADMIN      | 🛡️ Purple   | All users, courses, orders, vendors, analytics |
| INSTRUCTOR | 📚 Blue     | My courses, student progress, earnings    |
| VENDOR     | 🏪 Amber    | Products, orders, revenue                 |
| STUDENT    | 🎓 Green    | Enrolled courses, orders, profile         |

---

## 🌐 API Endpoints

### Auth (Public)
| Method | Path                    | Description        |
|--------|-------------------------|--------------------|
| POST   | `/api/auth/register`    | Register new user  |
| POST   | `/api/auth/login`       | Login, get JWT     |
| GET    | `/api/auth/validate`    | Validate token     |

### Protected (Bearer JWT required)
| Method | Path                          | Role      | Description          |
|--------|-------------------------------|-----------|----------------------|
| GET    | `/api/profile`                | Any       | Current user profile |
| GET    | `/api/admin/users`            | ADMIN     | All users            |
| PATCH  | `/api/admin/users/{id}/status`| ADMIN     | Toggle user status   |
| DELETE | `/api/admin/users/{id}`       | ADMIN     | Delete user          |
| GET    | `/api/admin/dashboard`        | ADMIN     | Admin check          |
| GET    | `/api/instructor/dashboard`   | INSTRUCTOR| Instructor check     |
| GET    | `/api/vendor/dashboard`       | VENDOR    | Vendor check         |
| GET    | `/api/student/dashboard`      | STUDENT   | Student check        |

---

## 🎨 Design Features

- **Dark glassmorphism** theme with indigo/skyblue gradient accents
- **Animated stat cards** with role-specific metrics
- **SVG progress rings** for course completion (student dashboard)
- **Live user management table** with activate/deactivate (admin)
- **Role selector cards** on registration page
- **Toast notifications** with dark theme
- **Responsive layout** with collapsible sidebar

---

## 📝 Deliverables Checklist

- [x] Spring Boot project setup with Maven
- [x] MySQL integration with auto-schema creation
- [x] Entities: User, Role, Vendor, Item, Order, OrderItem
- [x] Registration API (`/api/auth/register`)
- [x] Login API with JWT (`/api/auth/login`)
- [x] Spring Security + stateless session config
- [x] Role-based access control (`ADMIN`, `INSTRUCTOR`, `VENDOR`, `STUDENT`)
- [x] React project with Vite
- [x] Login page with validation
- [x] Registration page with role selection
- [x] Four role-specific dashboards
- [x] JWT stored securely in localStorage
- [x] Role-based redirect after login
- [x] Backend CORS configured for frontend origin
