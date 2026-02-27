import axios from 'axios';

const API_BASE_URL = '/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('edumanage_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 globally — but skip for auth endpoints
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/register');
    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem('edumanage_token');
      localStorage.removeItem('edumanage_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== AUTH API =====
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  validate: () => api.get('/auth/validate'),
};

// ===== USER API =====
export const userAPI = {
  getProfile: () => api.get('/profile'),
  getAllUsers: () => api.get('/admin/users'),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  toggleUserStatus: (id, active) => api.patch(`/admin/users/${id}/status?active=${active}`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
};

// ===== CLASSES & DEPARTMENTS API =====
export const classAPI = {
  getDepartments: () => api.get('/departments'),
  getDepartmentCourses: (deptId) => api.get(`/departments/${deptId}/courses`),
  createDepartment: (data) => api.post('/departments', data),
  addCourse: (deptId, data) => api.post(`/departments/${deptId}/courses`, data),
  deleteDepartment: (deptId) => api.delete(`/departments/${deptId}`)
};

// ===== TIMETABLE API =====
export const timetableAPI = {
  getSchedule: (role) => api.get(`/timetable/${role}`), // "STUDENT" or "TEACHER"
  addSession: (data) => api.post('/timetable/add', data),
  deleteSession: (id) => api.delete(`/timetable/${id}`)
};

// ===== ATTENDANCE API =====
export const attendanceAPI = {
  markAttendance: (data) => api.post('/attendance/record', data),
  getDailyAttendance: (courseId, date) => api.get(`/attendance/course/${courseId}/date/${date}`),
  getCourseAttendance: (courseId) => api.get(`/attendance/course/${courseId}`),
  getStudentAttendance: (studentId) => api.get(`/attendance/student/${studentId}`)
};

export default api;
