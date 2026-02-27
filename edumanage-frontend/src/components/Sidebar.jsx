import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../landing_animations.css';
import {
    LayoutDashboard,
    GraduationCap,
    Users,
    BookOpen,
    Building2,
    BarChart3,
    Settings,
    LogOut,
    CalendarDays,
    ClipboardList,
    BookMarked,
    CheckSquare,
    FileText,
    Star,
    Library,
    MessagesSquare,
    MessageCircle,
    Calendar,
    Trophy,
    CreditCard,
    UserCircle,
    Briefcase,
} from 'lucide-react';

const NAV_CONFIG = {
    ADMIN: [
        { id: 'overview', label: 'Overview', Icon: LayoutDashboard },
        { id: 'students', label: 'Students', Icon: GraduationCap },
        { id: 'teachers', label: 'Teachers', Icon: Briefcase },
        { id: 'courses', label: 'Courses', Icon: BookOpen },
        { id: 'departments', label: 'Departments', Icon: Building2 },
        { id: 'analytics', label: 'Analytics', Icon: BarChart3 },
        { id: 'messages', label: 'Messages', Icon: MessageCircle },
        { id: 'settings', label: 'Settings', Icon: Settings },
    ],
    TEACHER: [
        { id: 'overview', label: 'Overview', Icon: LayoutDashboard },
        { id: 'schedule', label: 'Schedule', Icon: CalendarDays },
        { id: 'courses', label: 'My Courses', Icon: BookOpen },
        { id: 'students', label: 'Students', Icon: Users },
        { id: 'attendance', label: 'Attendance', Icon: CheckSquare },
        { id: 'assignments', label: 'Assignments', Icon: ClipboardList },
        { id: 'gradebook', label: 'Gradebook', Icon: Star },
        { id: 'resources', label: 'Resource Library', Icon: Library },
        { id: 'parents', label: 'Parent Meetings', Icon: MessagesSquare },
        { id: 'messages', label: 'Messages', Icon: MessageCircle },
        { id: 'analytics', label: 'Analytics', Icon: BarChart3 },
    ],
    STUDENT: [
        { id: 'overview', label: 'Overview', Icon: LayoutDashboard },
        { id: 'subjects', label: 'My Subjects', Icon: BookMarked },
        { id: 'department', label: 'Department', Icon: Building2 },
        { id: 'academics', label: 'Academic Year', Icon: GraduationCap },
        { id: 'timetable', label: 'Timetable', Icon: Calendar },
        { id: 'attendance', label: 'Attendance', Icon: CheckSquare },
        { id: 'assignments', label: 'Assignments', Icon: FileText },
        { id: 'results', label: 'Results', Icon: Trophy },
        { id: 'resources', label: 'Library', Icon: Library },
        { id: 'messages', label: 'Messages', Icon: MessageCircle },
        { id: 'payments', label: 'Fee Payments', Icon: CreditCard },
        { id: 'profile', label: 'Profile', Icon: UserCircle },
    ],
};

export default function Sidebar({ activeTab, setActiveTab, role }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const navItems = NAV_CONFIG[role] || NAV_CONFIG.STUDENT;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const fullName = user
        ? [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username
        : 'Guest';

    const initials = user
        ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || user?.username?.[0]?.toUpperCase() || '?'
        : '?';

    return (
        <aside className="sidebar animate-fade-in">
            <div className="sidebar-header">
                <div className="sidebar-logo feature-icon-pulse" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GraduationCap size={26} strokeWidth={2.2} />
                </div>
                <span className="sidebar-title">EduManage</span>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <div className="nav-label">Main Menu</div>
                    {navItems.map(item => {
                        const isActive = activeTab === item.id;
                        return (
                            <div
                                key={item.id}
                                id={`nav-${item.id}`}
                                className={`nav-item ${isActive ? 'active' : ''} hover-lift-3d`}
                                style={{ transition: 'all 0.2s ease', margin: '2px 0' }}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <span className="nav-item-icon" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '22px',
                                    height: '22px',
                                    opacity: isActive ? 1 : 0.7,
                                    transition: 'opacity 0.2s ease',
                                }}>
                                    <item.Icon
                                        size={18}
                                        strokeWidth={isActive ? 2.5 : 2}
                                    />
                                </span>
                                {item.label}
                            </div>
                        );
                    })}
                </div>

                <div className="nav-section">
                    <div className="nav-label">System</div>
                    <div className="nav-item" onClick={handleLogout} style={{ color: 'var(--danger)', opacity: 0.85 }}>
                        <span className="nav-item-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px' }}>
                            <LogOut size={18} strokeWidth={2} />
                        </span>
                        Logout
                    </div>
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="user-card">
                    <div className="user-avatar">{initials}</div>
                    <div className="user-info">
                        <div className="user-name">
                            {fullName}
                        </div>
                        <span className="user-role-badge">{role}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
