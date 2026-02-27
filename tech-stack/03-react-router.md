# 🔀 React Router DOM 7 — Client-Side Routing

---

## What is it?
React Router DOM enables **navigation between pages** in a React app without
reloading the browser. It maps URL paths to React components.

---

## Where is it used?
```
edumanage-frontend/src/
├── App.jsx              ← All routes are defined here
└── pages/
    ├── LandingPage.jsx       → route: /
    ├── LoginPage.jsx         → route: /login
    ├── RegisterPage.jsx      → route: /register
    ├── DashboardPage.jsx     → route: /dashboard/:role
    └── UnauthorizedPage.jsx  → route: /unauthorized
```

---

## Why React Router?
| Reason | Explanation |
|--------|-------------|
| **Single Page App** | Users navigate between pages without full browser reloads — feels like a native app |
| **Role-based routing** | Redirects users to different dashboards based on their role (ADMIN → `/dashboard/admin`) |
| **Protected routes** | Blocks unauthenticated users from accessing dashboards |
| **URL parameters** | `/dashboard/:role` dynamically renders the right dashboard |

---

## How it's used in this project

### 1. Route definitions in App.jsx
```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/"               element={<LandingPage />} />
    <Route path="/login"          element={<LoginPage />} />
    <Route path="/register"       element={<RegisterPage />} />
    <Route path="/dashboard/*"    element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
    <Route path="/unauthorized"   element={<UnauthorizedPage />} />
  </Routes>
</BrowserRouter>
```

### 2. Protected Route — blocks guests
```jsx
function ProtectedRoute({ children }) {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
}
```

### 3. Role-based redirect after login
```jsx
// LoginPage.jsx — after successful login
if (role === 'ROLE_ADMIN')   navigate('/dashboard/admin');
if (role === 'ROLE_TEACHER') navigate('/dashboard/teacher');
if (role === 'ROLE_STUDENT') navigate('/dashboard/student');
```

### 4. useNavigate — programmatic navigation
```jsx
const navigate = useNavigate();
navigate('/login');       // go to login
navigate(-1);             // go back
```

### 5. useParams — reading URL segments
```jsx
// DashboardPage.jsx
const { role } = useParams();   // reads 'admin' from /dashboard/admin
```
