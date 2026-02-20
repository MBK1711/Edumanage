import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../api/api';

const ROLES = [
    { value: 'student', label: '🎓 Student', desc: 'Enroll & learning' },
    { value: 'teacher', label: '👨‍🏫 Teacher', desc: 'Manage classes' },
    { value: 'parent', label: '👨‍👩‍👧‍👦 Parent', desc: 'Track progress' },
    { value: 'admin', label: '🛡️ Admin', desc: 'System control' },
];

export default function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '', email: '', password: '', confirmPassword: '',
        firstName: '', lastName: '', phone: '', role: 'student'
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const validate = () => {
        const errs = {};
        if (!form.firstName.trim()) errs.firstName = 'First name is required';
        if (!form.lastName.trim()) errs.lastName = 'Last name is required';
        if (!form.username.trim() || form.username.length < 3)
            errs.username = 'Username must be at least 3 characters';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            errs.email = 'Valid email is required';
        if (!form.password || form.password.length < 6)
            errs.password = 'Password must be at least 6 characters';
        if (form.password !== form.confirmPassword)
            errs.confirmPassword = 'Passwords do not match';
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
            const payload = {
                username: form.username,
                email: form.email,
                password: form.password,
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
                roles: [form.role],
            };
            const response = await authAPI.register(payload);
            if (response.data?.success === false) {
                toast.error(response.data?.message || 'Registration failed.');
                return;
            }
            toast.success('Account created! Please sign in.');
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
            let msg = 'Registration failed. Please try again.';
            if (!err.response) {
                msg = 'Cannot connect to server. Make sure the backend is running on port 8081.';
            } else if (err.response?.data?.message) {
                msg = err.response.data.message;
            } else if (err.response?.status === 400) {
                msg = 'Invalid registration data. Please check your inputs.';
            }
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
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join EduManage Pro today</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="firstName">First Name</label>
                            <input
                                id="firstName" name="firstName" type="text"
                                className={`form-input ${errors.firstName ? 'error' : ''}`}
                                placeholder="John"
                                value={form.firstName} onChange={handleChange}
                                disabled={loading}
                            />
                            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName" name="lastName" type="text"
                                className={`form-input ${errors.lastName ? 'error' : ''}`}
                                placeholder="Doe"
                                value={form.lastName} onChange={handleChange}
                                disabled={loading}
                            />
                            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Username</label>
                        <div className="input-wrapper">
                            <span className="input-icon">👤</span>
                            <input
                                id="username" name="username" type="text"
                                className={`form-input ${errors.username ? 'error' : ''}`}
                                placeholder="Choose a username"
                                value={form.username} onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                        {errors.username && <p className="error-text">{errors.username}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <span className="input-icon">✉️</span>
                            <input
                                id="email" name="email" type="email"
                                className={`form-input ${errors.email ? 'error' : ''}`}
                                placeholder="john@example.com"
                                value={form.email} onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="phone">Phone (Optional)</label>
                        <div className="input-wrapper">
                            <span className="input-icon">📱</span>
                            <input
                                id="phone" name="phone" type="tel"
                                className="form-input"
                                placeholder="+91 98765 43210"
                                value={form.phone} onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">🔒</span>
                                <input
                                    id="password" name="password"
                                    type={showPass ? 'text' : 'password'}
                                    className={`form-input ${errors.password ? 'error' : ''}`}
                                    placeholder="••••••"
                                    value={form.password} onChange={handleChange}
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
                        <div className="form-group">
                            <label className="form-label" htmlFor="confirmPassword">Confirm</label>
                            <div className="input-wrapper">
                                <span className="input-icon">🔒</span>
                                <input
                                    id="confirmPassword" name="confirmPassword"
                                    type={showPass ? 'text' : 'password'}
                                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                                    placeholder="••••••"
                                    value={form.confirmPassword} onChange={handleChange}
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
                            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Select Role</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {ROLES.map(r => (
                                <label key={r.value} style={{
                                    display: 'flex', flexDirection: 'column', gap: '4px',
                                    padding: '12px',
                                    border: `1px solid ${form.role === r.value ? 'var(--primary)' : 'var(--border)'}`,
                                    borderRadius: 'var(--radius-md)',
                                    background: form.role === r.value ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.03)',
                                    cursor: 'pointer',
                                    transition: 'var(--transition)',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input type="radio" name="role" value={r.value}
                                            checked={form.role === r.value}
                                            onChange={handleChange}
                                            style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
                                        />
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{r.label}</span>
                                    </div>
                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', paddingLeft: '24px' }}>{r.desc}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={loading}
                    >
                        {loading ? <span className="spinner" /> : 'Create Account'}
                    </button>
                </form>

                <p className="auth-link-text">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
