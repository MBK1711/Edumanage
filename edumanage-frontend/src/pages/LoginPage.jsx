import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ usernameOrEmail: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const validate = () => {
        const errs = {};
        if (!form.usernameOrEmail.trim()) errs.usernameOrEmail = 'Username or email is required';
        if (!form.password) errs.password = 'Password is required';
        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);
        try {
            const res = await authAPI.login(form);
            const data = res.data;
            login(
                {
                    id: data.id, username: data.username, email: data.email,
                    firstName: data.firstName, lastName: data.lastName, roles: data.roles
                },
                data.token
            );

            toast.success(`Welcome back, ${data.username}!`);

            const roleMap = {
                'ROLE_ADMIN': '/dashboard/admin',
                'ROLE_TEACHER': '/dashboard/teacher',
                'ROLE_PARENT': '/dashboard/parent',
                'ROLE_INSTRUCTOR': '/dashboard/teacher',
                'ROLE_VENDOR': '/dashboard/parent',
                'ROLE_STUDENT': '/dashboard/student',
            };
            const priority = ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_PARENT', 'ROLE_INSTRUCTOR', 'ROLE_VENDOR', 'ROLE_STUDENT'];
            let destination = '/dashboard/student';
            for (const r of priority) {
                if (data.roles?.includes(r)) { destination = roleMap[r]; break; }
            }
            navigate(destination, { replace: true });
        } catch (err) {
            const msg = err.response?.data?.message || 'Invalid credentials. Please try again.';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">🎓</div>
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to your EduManage Pro account</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label className="form-label" htmlFor="usernameOrEmail">Username or Email</label>
                        <div className="input-wrapper">
                            <span className="input-icon">👤</span>
                            <input
                                id="usernameOrEmail"
                                name="usernameOrEmail"
                                type="text"
                                className={`form-input ${errors.usernameOrEmail ? 'error' : ''}`}
                                placeholder="Enter username or email"
                                value={form.usernameOrEmail}
                                onChange={handleChange}
                                autoComplete="username"
                                disabled={loading}
                            />
                        </div>
                        {errors.usernameOrEmail && <p className="error-text">{errors.usernameOrEmail}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon">🔒</span>
                            <input
                                id="password"
                                name="password"
                                type={showPass ? 'text' : 'password'}
                                className={`form-input ${errors.password ? 'error' : ''}`}
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                disabled={loading}
                                style={{ paddingRight: '40px' }}
                            />
                            <span
                                className="password-toggle-icon"
                                onClick={() => setShowPass(!showPass)}
                                title={showPass ? "Hide password" : "Show password"}
                            >
                                {showPass ? '🙈' : '👁️'}
                            </span>
                        </div>
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={loading}
                        style={{ marginTop: '8px' }}
                    >
                        {loading ? <span className="spinner" /> : 'Sign In'}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '1px', background: 'var(--border)' }} />
                    <span style={{ position: 'relative', background: 'var(--bg-card)', padding: '0 12px', color: 'var(--text-muted)', fontSize: '12px' }}>OR</span>
                </div>

                {/* Demo credentials hint */}
                <div style={{
                    marginTop: '24px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                }}>
                    <strong style={{ color: '#60a5fa', display: 'block', marginBottom: '4px' }}>Demo Accounts</strong>
                    Don't have an account? Use the <strong>Create Account</strong> link below to register a new user with any role.
                </div>

                <p className="auth-link-text">
                    Don't have an account? <Link to="/register">Create account</Link>
                </p>
            </div>
        </div>
    );
}
