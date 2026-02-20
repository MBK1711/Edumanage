import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../landing_animations.css';

const NAV_CONFIG = {
    ADMIN: [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'users', label: 'User Management', icon: '👥' },
        { id: 'courses', label: 'Courses', icon: '📚' },
        { id: 'orders', label: 'Orders', icon: '📦' },
        { id: 'vendors', label: 'Vendors', icon: '🏪' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ],
    TEACHER: [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'schedule', label: 'Schedule', icon: '🗓️' },
        { id: 'courses', label: 'My Courses', icon: '📚' },
        { id: 'students', label: 'Students', icon: '👥' },
        { id: 'attendance', label: 'Attendance', icon: '✅' },
        { id: 'assignments', label: 'Assignments', icon: '📝' },
        { id: 'gradebook', label: 'Gradebook', icon: '💯' },
        { id: 'resources', label: 'Resource Library', icon: '🗄️' },
        { id: 'parents', label: 'Parent Meetings', icon: '👨‍👩‍👧' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
    ],

    STUDENT: [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'subjects', label: 'My Subjects', icon: '📚' },
        { id: 'department', label: 'Department', icon: '🏛️' },
        { id: 'academics', label: 'Academic Year', icon: '🎓' },
        { id: 'timetable', label: 'Timetable', icon: '📅' },
        { id: 'assignments', label: 'Assignments', icon: '📝' },
        { id: 'results', label: 'Results', icon: '🏆' },
        { id: 'resources', label: 'Library', icon: '📖' },
        { id: 'payments', label: 'Fee Payments', icon: '💳' },
        { id: 'profile', label: 'Profile', icon: '👤' },
    ],
};

export default function Sidebar({ activeTab, setActiveTab, role }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Default to STUDENT if role not found
    const navItems = NAV_CONFIG[role] || NAV_CONFIG.STUDENT;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const initials = user
        ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
        : user?.username?.[0]?.toUpperCase() || '?';

    return (
        <aside className="sidebar animate-fade-in">
            <div className="sidebar-header">
                <div className="sidebar-logo feature-icon-pulse">🎓</div>
                <span className="sidebar-title">EduManage</span>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <div className="nav-label">Main Menu</div>
                    {navItems.map(item => (
                        <div
                            key={item.id}
                            id={`nav-${item.id}`}
                            className={`nav-item ${activeTab === item.id ? 'active' : ''} hover-lift-3d`}
                            style={{ transition: 'all 0.2s ease', margin: '4px 0' }}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <span className="nav-item-icon feature-icon-pulse">{item.icon}</span>
                            {item.label}
                        </div>
                    ))}
                </div>

                <div className="nav-section">
                    <div className="nav-label">System</div>
                    <div className="nav-item" onClick={handleLogout}>
                        <span className="nav-item-icon">🚪</span>
                        Logout
                    </div>
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="user-card">
                    <div className="user-avatar">{initials}</div>
                    <div className="user-info">
                        <div className="user-name">
                            {user?.firstName || user?.username}
                        </div>
                        <span className="user-role-badge">{role}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
