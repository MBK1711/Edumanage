# 📡 Axios — HTTP Client (Frontend ↔ Backend)

---

## What is it?
Axios is a Promise-based HTTP client for JavaScript. It sends requests from
the React frontend to the Spring Boot backend and handles the responses.

---

## Where is it used?
```
edumanage-frontend/src/
└── api/
    └── axiosInstance.js    ← Configured Axios instance (base URL + JWT header)

Used in:
├── pages/LoginPage.jsx         ← POST /api/auth/login
├── pages/RegisterPage.jsx      ← POST /api/auth/register
├── pages/dashboards/
│   ├── AdminDashboard.jsx      ← GET /api/users, /api/departments
│   ├── TeacherDashboard.jsx    ← GET /api/departments/{id}/courses
│   └── StudentDashboard.jsx    ← GET /api/users/me
```

---

## Why Axios?
| Reason | Explanation |
|--------|-------------|
| **Interceptors** | Automatically attaches the JWT token to every request header — no manual work per call |
| **JSON by default** | Automatically serializes request bodies and parses JSON responses |
| **Error handling** | Rejects promises on HTTP error codes (4xx, 5xx) — easy to catch with `.catch()` |
| **Cleaner syntax** | More readable than native `fetch()` — especially for POST with JSON bodies |

---

## How it's used in this project

### 1. axiosInstance.js — the configured client
```js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
});

// Attach JWT token to every outgoing request automatically
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;
```

### 2. Login — POST request
```js
// LoginPage.jsx
const response = await api.post('/api/auth/login', { username, password });
const { token, role } = response.data;
localStorage.setItem('token', token);
```

### 3. Register — POST request
```js
// RegisterPage.jsx
await api.post('/api/auth/register', {
    username, email, password, firstName, lastName, role
});
```

### 4. Fetch users — GET request
```js
// AdminDashboard.jsx
const response = await api.get('/api/users');
setUsers(response.data);
```

### 5. Error handling
```js
try {
    await api.post('/api/auth/login', credentials);
} catch (error) {
    toast.error(error.response?.data?.message || 'Login failed');
}
```

### 6. How the JWT flows
```
localStorage  →  axiosInstance interceptor  →  Authorization header
    ↓                                               ↓
"eyJhbGci..."   →   Every API request   →   Spring Security reads & validates it
```
