import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../api/api';
import toast from 'react-hot-toast';
import '../../landing_animations.css';

const MOCK_STATS = [
    { label: 'Total Users', value: '1,284', icon: '👥', color: 'indigo', change: '+12%' },
    { label: 'Active Courses', value: '348', icon: '📚', color: 'sky', change: '+8%' },
    { label: 'Monthly Revenue', value: '₹2.4L', icon: '💰', color: 'green', change: '+23%' },
    { label: 'Pending Orders', value: '67', icon: '📦', color: 'amber', change: '-5%' },
];

const MOCK_RECENT = [
    { id: 1, name: 'Priya Sharma', email: 'priya@test.com', role: 'STUDENT', status: 'Active' },
    { id: 2, name: 'Rohan Verma', email: 'rohan@test.com', role: 'INSTRUCTOR', status: 'Active' },
    { id: 3, name: 'Neha Gupta', email: 'neha@test.com', role: 'VENDOR', status: 'Pending' },
    { id: 4, name: 'Amit Kumar', email: 'amit@test.com', role: 'STUDENT', status: 'Active' },
    { id: 5, name: 'Sunita Joshi', email: 'sunita@test.com', role: 'INSTRUCTOR', status: 'Active' },
];

function StatCard({ label, value, icon, color, change }) {
    const isPositive = change.startsWith('+');
    return (
        <div className={`stat-card ${color}`}>
            <div className="stat-card-header">
                <div className={`stat-icon ${color}`}>{icon}</div>
                <span className="stat-badge" style={{
                    background: isPositive ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                    color: isPositive ? 'var(--success)' : 'var(--danger)',
                }}>{change}</span>
            </div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
        </div>
    );
}

function roleBadgeClass(role) {
    const map = { STUDENT: 'badge-student', INSTRUCTOR: 'badge-instructor', VENDOR: 'badge-vendor', ADMIN: 'badge-admin' };
    return map[role] || 'badge-student';
}

export default function AdminDashboard({ activeTab }) {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    useEffect(() => {
        if (activeTab === 'users') fetchUsers();
    }, [activeTab]);

    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            const res = await userAPI.getAllUsers();
            setUsers(res.data);
        } catch {
            setUsers(MOCK_RECENT.map(u => ({
                id: u.id, username: u.name.split(' ')[0].toLowerCase(),
                email: u.email, firstName: u.name.split(' ')[0],
                lastName: u.name.split(' ')[1], active: u.status === 'Active',
                roles: [{ name: `ROLE_${u.role}` }]
            })));
        } finally {
            setLoadingUsers(false);
        }
    };

    const toggleStatus = async (id, currentActive) => {
        try {
            await userAPI.toggleUserStatus(id, !currentActive);
            setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !currentActive } : u));
            toast.success('User status updated');
        } catch {
            toast.error('Failed to update status');
        }
    };

    if (activeTab === 'overview') return (
        <div>
            <header className="topbar animate-fade-in delay-100">
                <div>
                    <h1 className="page-title text-gradient-animated">Dashboard Overview</h1>
                    <p className="page-subtitle">Welcome back, {user?.firstName || 'Admin'}</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-secondary btn-sm">Download Report</button>
                    <button className="btn btn-primary btn-sm">View Analytics</button>
                </div>
            </header>

            <div className="stats-grid animate-fade-in delay-200">
                {MOCK_STATS.map(s => (
                    <div key={s.label} className={`stat-card ${s.color} hover-lift-3d`}>
                        <div className="stat-header">
                            <div className="stat-icon-wrapper feature-icon-pulse">{s.icon}</div>
                            <span className={`status-badge ${s.change.startsWith('+') ? 'completed' : 'cancelled'}`}>
                                {s.change}
                            </span>
                        </div>
                        <div className="stat-value">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Recent Users */}
                <div className="content-card animate-fade-in delay-300 hover-lift-3d glass-panel-enhanced">
                    <div className="content-header">
                        <h3 className="content-title">Recent Registrations</h3>
                    </div>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr><th>User</th><th>Role</th><th>Status</th></tr>
                            </thead>
                            <tbody>
                                {MOCK_RECENT.map(u => (
                                    <tr key={u.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div className="user-avatar" style={{ width: '36px', height: '36px', fontSize: '14px' }}>
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>{u.name}</div>
                                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="status-badge pending" style={{
                                                background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid var(--border)'
                                            }}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${u.status === 'Active' ? 'completed' : 'pending'}`}>
                                                {u.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* System Overview */}
                <div className="content-card animate-fade-in delay-400 hover-lift-3d glass-panel-enhanced">
                    <div className="content-header">
                        <h3 className="content-title">System Health</h3>
                    </div>
                    <div style={{ padding: '24px' }}>
                        {[
                            { label: 'Server Uptime', value: '99.9%', color: '#10b981', w: '99%' },
                            { label: 'Memory Usage', value: '42%', color: '#6366f1', w: '42%' },
                            { label: 'Disk Space', value: '28%', color: '#0ea5e9', w: '28%' },
                            { label: 'API Latency', value: '120ms', color: '#f59e0b', w: '65%' },
                        ].map(item => (
                            <div key={item.label} style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{item.label}</span>
                                    <span style={{ fontSize: '13px', fontWeight: 700, color: item.color }}>{item.value}</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%', width: item.w, background: item.color, borderRadius: '10px',
                                        boxShadow: `0 0 10px ${item.color}40`
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    if (activeTab === 'users') return (
        <div>
            <header className="topbar">
                <div>
                    <h1 className="page-title">User Management</h1>
                    <p className="page-subtitle">Manage system users, roles, and permissions</p>
                </div>
                <button className="btn btn-primary" onClick={fetchUsers}>
                    🔄 Refresh List
                </button>
            </header>

            <div className="content-card">
                {loadingUsers ? (
                    <div style={{ padding: '60px', display: 'flex', justifyContent: 'center' }}>
                        <div className="spinner" style={{ width: '40px', height: '40px', borderWidth: '3px' }} />
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>User Profile</th>
                                    <th>Assigned Roles</th>
                                    <th>Account Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                <div className="user-avatar">
                                                    {u.firstName ? u.firstName[0].toUpperCase() : u.username[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '15px' }}>
                                                        {u.firstName} {u.lastName}
                                                    </div>
                                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>@{u.username}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                {u.roles?.map(r => {
                                                    const roleName = (typeof r === 'string' ? r : r.name).replace('ROLE_', '');
                                                    return (
                                                        <span key={roleName} className="status-badge pending"
                                                            style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
                                                            {roleName}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${u.active ? 'completed' : 'cancelled'}`}>
                                                {u.active ? 'Active' : 'Deactivated'}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn btn-sm ${u.active ? 'btn-secondary' : 'btn-primary'}`}
                                                style={{ padding: '6px 12px', fontSize: '12px' }}
                                                onClick={() => toggleStatus(u.id, u.active)}
                                            >
                                                {u.active ? 'Deactivate' : 'Activate'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );

    if (activeTab === 'courses') return (
        <div className="animate-fade-in">
            <header className="topbar">
                <div>
                    <h1 className="page-title text-gradient-animated">Course Management</h1>
                    <p className="page-subtitle">Manage all courses and curriculum</p>
                </div>
                <button className="btn btn-primary btn-glow">+ New Course</button>
            </header>
            <div className="content-card glass-panel-enhanced hover-lift-3d">
                <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
                    <h3>No courses created yet</h3>
                    <p>Start by adding a new course curriculum to the platform.</p>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{
            height: '60vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)', textAlign: 'center'
        }} className="animate-fade-in glass-panel-enhanced hover-lift-3d">
            <div style={{ fontSize: '64px', marginBottom: '24px', opacity: 0.5 }} className="animate-bounce">🚧</div>
            <h2 className="page-title text-gradient-animated" style={{ fontSize: '24px', marginBottom: '8px' }}>Coming Soon</h2>
            <p className="page-subtitle">The {activeTab} module is currently under development.</p>
        </div>
    );
}

