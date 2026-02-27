# ⚛️ React 19 — Frontend UI Library

---

## What is it?
React is a JavaScript library for building user interfaces using **reusable components**.
Every visual element in EduManage Pro is a React component.

---

## Where is it used?
```
edumanage-frontend/src/
├── pages/
│   ├── LandingPage.jsx        ← Public landing page
│   ├── LoginPage.jsx          ← Login form
│   ├── RegisterPage.jsx       ← Registration form
│   ├── DashboardPage.jsx      ← Role-based dashboard router
│   └── dashboards/
│       ├── AdminDashboard.jsx     ← Admin panel (users, departments, analytics)
│       ├── TeacherDashboard.jsx   ← Teacher panel (courses, students, assignments)
│       └── StudentDashboard.jsx   ← Student panel (subjects, schedule, grades)
├── context/
│   └── AuthContext.jsx        ← Global state: logged-in user, token, role
└── App.jsx                    ← Root component with all routes
```

---

## Why React?
| Reason | Explanation |
|--------|-------------|
| **Component reuse** | Stat cards, tables, badges, modals are written once and reused across all 3 dashboards |
| **State management** | `useState` drives all dynamic UI (active tab, modal open/close, form values, course list) |
| **Fast re-renders** | Virtual DOM diffs so only changed parts re-paint — smooth UX on dashboard tab switches |
| **Ecosystem** | React Router, Axios, Hot Toast all integrate natively |
| **Industry standard** | Most widely used frontend library — predictable and well-documented |

---

## How it's used in this project

### 1. Components
Every page and sub-section is a `.jsx` file exporting a default function:
```jsx
// TeacherDashboard.jsx
export default function TeacherDashboard({ activeTab }) {
    if (activeTab === 'courses') return <CoursesView />;
    if (activeTab === 'students') return <StudentsView />;
}
```

### 2. useState — local UI state
```jsx
const [courses, setCourses] = useState(INITIAL_COURSES);
const [showModal, setShowModal] = useState(false);
const [activeTab, setActiveTab] = useState('overview');
```

### 3. Context API — global auth state
```jsx
// AuthContext.jsx — stores user + token globally
const { user, token, login, logout } = useAuth();
```

### 4. Props — passing data between components
```jsx
<TeacherDashboard activeTab={activeTab} />
```

### 5. Conditional rendering — role-based UI
```jsx
{user.role === 'ADMIN' && <AdminPanel />}
{user.role === 'TEACHER' && <TeacherPanel />}
```
