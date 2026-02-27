import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../../context/AuthContext';
import { userAPI, classAPI } from '../../api/api';
import toast from 'react-hot-toast';
import '../../landing_animations.css';
import MessagingPanel from '../../components/MessagingPanel';

const MOCK_STATS = [
    { label: 'Total Students', value: '1,284', icon: '🎓', color: 'indigo', change: '+12%' },
    { label: 'Total Teachers', value: '124', icon: '👨‍🏫', color: 'green', change: '+5%' },
    { label: 'Departments', value: '12', icon: '🏛️', color: 'amber', change: '0%' },
    { label: 'Active Courses', value: '348', icon: '📚', color: 'sky', change: '+8%' },
];

const MOCK_RECENT = Array.from({ length: 240 }).map((_, i) => {
    const isStudent = i % 8 !== 0; // 87.5% students, 12.5% teachers
    const firstNames = ['Aarav', 'Aditi', 'Arjun', 'Diya', 'Ishaan', 'Kavya', 'Rohan', 'Sneha', 'Vikram', 'Ananya', 'Neel', 'Maya', 'Siddharth', 'Tara', 'Karan', 'Pooja'];
    const lastNames = ['Sharma', 'Verma', 'Gupta', 'Kumar', 'Joshi', 'Singh', 'Patel', 'Reddy', 'Das', 'Mehta', 'Nair', 'Menon', 'Rao', 'Iyer', 'Bose'];
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[(i * 3) % lastNames.length];
    return {
        id: i + 1,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}${i}@university.edu`,
        role: isStudent ? 'STUDENT' : 'TEACHER',
        status: i % 15 === 0 ? 'Pending' : 'Active'
    };
});
const MOCK_USERS_PARSED = MOCK_RECENT.map(u => ({
    id: u.id,
    username: u.name.split(' ')[0].toLowerCase() + u.id,
    email: u.email,
    firstName: u.name.split(' ')[0],
    lastName: u.name.split(' ')[1],
    active: u.status === 'Active',
    roles: [{ name: `ROLE_${u.role}` }]
}));

// Dedicated teacher mock data: 30 teachers per department = 180 teachers total
const TEACHER_DEPTS = [
    { name: 'Computer Science', subjects: ['Data Structures', 'Algorithms', 'Operating Systems', 'Machine Learning', 'Computer Networks'] },
    { name: 'Information Tech', subjects: ['Database Systems', 'Cloud Computing', 'Web Technologies', 'Cyber Security', 'Software Engineering'] },
    { name: 'Electronics', subjects: ['Circuit Analysis', 'Digital Electronics', 'Microprocessors', 'VLSI Design', 'Signal Processing'] },
    { name: 'Electrical', subjects: ['Power Systems', 'Control Systems', 'Electrical Machines', 'Circuit Theory', 'Power Electronics'] },
    { name: 'Mechanical', subjects: ['Thermodynamics', 'Fluid Mechanics', 'Manufacturing', 'Machine Design', 'Robotics'] },
    { name: 'Civil', subjects: ['Structural Analysis', 'Soil Mechanics', 'Surveying', 'Construction Mgmt', 'Hydraulics'] },
];
const TEACHER_FIRST_NAMES = ['Anand', 'Priya', 'Ramesh', 'Sanjay', 'Vikram', 'Anjali', 'Suresh', 'Meena', 'Rajesh', 'Kavita'];
const TEACHER_LAST_NAMES = ['Sharma', 'Desai', 'Kumar', 'Gupta', 'Singh', 'Verma', 'Patel', 'Iyer', 'Nair', 'Rao'];
const TEACHER_SALARIES = ['₹60,000', '₹70,000', '₹75,000', '₹80,000', '₹85,000', '₹90,000', '₹95,000', '₹1,00,000'];
const MOCK_TEACHERS_PARSED = [];
let _tid = 5000; // start IDs well above student IDs to avoid collisions
TEACHER_DEPTS.forEach((dept) => {
    for (let i = 0; i < 30; i++) {
        const fn = TEACHER_FIRST_NAMES[i % TEACHER_FIRST_NAMES.length];
        const ln = TEACHER_LAST_NAMES[(i * 3) % TEACHER_LAST_NAMES.length];
        MOCK_TEACHERS_PARSED.push({
            id: _tid++,
            username: `${fn.toLowerCase()}${_tid}`,
            email: `${fn.toLowerCase()}${_tid}@university.edu`,
            firstName: fn,
            lastName: ln,
            active: i % 10 !== 0,
            roles: [{ name: 'ROLE_TEACHER' }],
            _dept: dept.name,
            _subject: dept.subjects[i % dept.subjects.length],
            _salary: TEACHER_SALARIES[i % TEACHER_SALARIES.length],
        });
    }
});


const BE_DEPARTMENTS = [
    { id: 'cse', name: 'Computer Science & Engineering', icon: '💻', students: '450', faculty: '42', hod: 'Dr. Anand Sharma', status: 'Active', color: 'indigo' },
    { id: 'it', name: 'Information Technology', icon: '🌐', students: '380', faculty: '35', hod: 'Dr. Priya Desai', status: 'Active', color: 'sky' },
    { id: 'ece', name: 'Electronics & Communication', icon: '📡', students: '320', faculty: '30', hod: 'Dr. Ramesh Kumar', status: 'Active', color: 'amber' },
    { id: 'ee', name: 'Electrical Engineering', icon: '⚡', students: '280', faculty: '28', hod: 'Dr. Sanjay Gupta', status: 'Active', color: 'rose' },
    { id: 'me', name: 'Mechanical Engineering', icon: '⚙️', students: '350', faculty: '38', hod: 'Dr. Vikram Singh', status: 'Active', color: 'green' },
    { id: 'cv', name: 'Civil Engineering', icon: '🏗️', students: '290', faculty: '25', hod: 'Dr. Anjali Verma', status: 'Active', color: 'purple' },
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
    const map = { STUDENT: 'badge-student', TEACHER: 'badge-teacher', ADMIN: 'badge-admin' };
    return map[role] || 'badge-student';
}

export default function AdminDashboard({ activeTab }) {
    const { user } = useAuth();
    const [users, setUsers] = useState(MOCK_USERS_PARSED);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [courseDeptFilter, setCourseDeptFilter] = useState('All Departments');
    const [studentDeptFilter, setStudentDeptFilter] = useState('All Departments');
    const [teacherDeptFilter, setTeacherDeptFilter] = useState('All Departments');
    const [viewingTopics, setViewingTopics] = useState(null);
    const [editingSyllabus, setEditingSyllabus] = useState(null);
    const [viewingTeacherProfile, setViewingTeacherProfile] = useState(null);
    const [viewingDeptSyllabus, setViewingDeptSyllabus] = useState(null);
    const [viewingDeptStaff, setViewingDeptStaff] = useState(null);
    const [activeSettingsTab, setActiveSettingsTab] = useState('General Information');
    const [departments, setDepartments] = useState(BE_DEPARTMENTS);

    useEffect(() => {
        if (activeTab === 'students' || activeTab === 'teachers') fetchUsers();
        if (activeTab === 'departments') fetchDepartments();
    }, [activeTab]);

    const fetchDepartments = async () => {
        try {
            const res = await classAPI.getDepartments();
            const apiDepts = res.data || [];
            if (apiDepts.length > 0) {
                // Map backend shape → the shape our existing JSX card uses
                const COLOR_MAP = { CSE: 'indigo', IT: 'sky', ECE: 'violet', EE: 'amber', ME: 'orange', CE: 'green' };
                setDepartments(apiDepts.map(d => ({
                    id: d.code?.toLowerCase() || String(d.id),
                    name: d.name,
                    icon: d.icon || '🏛️',
                    students: String(d.studentCount ?? '—'),
                    faculty: String(d.facultyCount ?? '—'),
                    hod: d.hod || 'TBA',
                    status: d.status || 'Active',
                    color: d.color || COLOR_MAP[d.code] || 'indigo',
                })));
            }
            // If the DB is empty, keep the BE_DEPARTMENTS mock as fallback
        } catch {
            // Network error → stay on the mock fallback silently
        }
    };

    const getStudentDetails = (id) => {
        const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
        const fees = ['₹45,000 Paid', '₹50,000 Paid (Full)', '₹20,000 (Partial)', '₹10,000 (Pending)'];
        const depts = ['Computer Science', 'Information Tech', 'Electronics', 'Electrical', 'Mechanical', 'Civil'];
        return { year: years[id % 4], fees: fees[id % 4], dept: depts[id % 6] };
    };

    const getTeacherDetails = (id) => {
        const subjects = ['Data Structures', 'Applied Physics', 'Circuit Analysis', 'Thermodynamics', 'Engineering Maths'];
        const salaries = ['₹60,000', '₹85,000', '₹90,000', '₹70,000', '₹65,000'];
        const depts = ['Computer Science', 'Information Tech', 'Electronics', 'Electrical', 'Mechanical', 'Civil'];
        return { subject: subjects[(id * 3) % 5], salary: salaries[(id * 7) % 5], dept: depts[(id * 2) % 6] };
    };

    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            const res = await userAPI.getAllUsers();
            // Merge real API users with mock data: real users take precedence by id
            const realUsers = res.data || [];
            const realIds = new Set(realUsers.map(u => u.id));
            const merged = [
                ...realUsers,
                ...MOCK_USERS_PARSED.filter(u => !realIds.has(u.id))
            ];
            setUsers(merged);
        } catch {
            setUsers(MOCK_USERS_PARSED);
        } finally {
            setLoadingUsers(false);
        }
    };

    const toggleStatus = async (id, currentActive) => {
        try {
            await userAPI.toggleUserStatus(id, !currentActive);
            setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !currentActive } : u));
            toast.success(`Access ${currentActive ? 'Revoked' : 'Restored'} for user`);
        } catch {
            setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !currentActive } : u));
            toast.success(`Access ${currentActive ? 'revoked' : 'restored'} successfully.`);
        }
    };

    if (activeTab === 'overview') return (
        <div>
            {/* Hero Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)',
                borderRadius: '24px', padding: '36px 40px', marginBottom: '28px',
                position: 'relative', overflow: 'hidden', color: 'white'
            }} className="animate-fade-in delay-100">
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                <div style={{ position: 'absolute', bottom: '-60px', right: '80px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '10px', textTransform: 'uppercase' }}>🛡️ Admin Command Center — EduCampus</div>
                <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>
                    Welcome, {[user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.username || 'Administrator'}! 🎯
                </div>
                <div style={{ fontSize: '16px', opacity: 0.88, maxWidth: '600px', lineHeight: 1.5 }}>
                    The institute has <strong>1,284 students</strong> and <strong>124 faculty</strong> across <strong>12 departments</strong>. System health is <strong style={{ color: '#6ee7b7' }}>Excellent</strong>.
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
                    <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '8px 18px', fontWeight: 600 }}>📊 Download Report</button>
                    <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '8px 18px', fontWeight: 600 }}>👤 Add New User</button>
                    <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '8px 18px', fontWeight: 600 }}>📅 Academic Calendar</button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="stats-grid animate-fade-in delay-200" style={{ marginBottom: '28px' }}>
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

            {/* 2-Column Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', marginBottom: '24px' }}>
                {/* Recent Registrations */}
                <div className="content-card animate-fade-in delay-300 hover-lift-3d glass-panel-enhanced">
                    <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 className="content-title">🆕 Recent Registrations</h3>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.04)', padding: '4px 10px', borderRadius: '20px' }}>Last 10</span>
                    </div>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr><th>User</th><th>Role</th><th>Status</th></tr>
                            </thead>
                            <tbody>
                                {MOCK_RECENT.slice(0, 10).map(u => (
                                    <tr key={u.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div className="user-avatar" style={{ width: '36px', height: '36px', fontSize: '14px', background: u.role === 'TEACHER' ? 'var(--success)' : 'var(--primary)' }}>
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>{u.name}</div>
                                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{ background: u.role === 'TEACHER' ? 'rgba(16,185,129,0.1)' : 'rgba(99,102,241,0.1)', color: u.role === 'TEACHER' ? 'var(--success)' : 'var(--primary)', border: `1px solid ${u.role === 'TEACHER' ? 'rgba(16,185,129,0.2)' : 'rgba(99,102,241,0.2)'}`, padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>
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

                {/* Right column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* System Health */}
                    <div className="content-card animate-fade-in delay-400 hover-lift-3d glass-panel-enhanced">
                        <div className="content-header">
                            <h3 className="content-title">🖥️ System Health</h3>
                        </div>
                        <div style={{ padding: '20px 24px' }}>
                            {[
                                { label: 'Server Uptime', value: '99.9%', color: '#10b981', w: '99%' },
                                { label: 'Memory Usage', value: '42%', color: '#6366f1', w: '42%' },
                                { label: 'Disk Space Used', value: '28%', color: '#0ea5e9', w: '28%' },
                                { label: 'API Response', value: '120ms', color: '#f59e0b', w: '65%' },
                            ].map(item => (
                                <div key={item.label} style={{ marginBottom: '18px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{item.label}</span>
                                        <span style={{ fontSize: '13px', fontWeight: 700, color: item.color }}>{item.value}</span>
                                    </div>
                                    <div style={{ height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: item.w, background: item.color, borderRadius: '10px', transition: 'width 1s ease' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Department Snapshot */}
                    <div className="content-card animate-fade-in delay-500 hover-lift-3d glass-panel-enhanced">
                        <div className="content-header">
                            <h3 className="content-title">🏛️ Dept. Snapshot</h3>
                        </div>
                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {BE_DEPARTMENTS.slice(0, 4).map((d, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontSize: '20px' }}>{d.icon}</span>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>{d.name.length > 22 ? d.name.substring(0, 22) + '…' : d.name}</div>
                                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{d.faculty} Faculty</div>
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: 800, fontSize: '16px', color: 'var(--primary)' }}>{d.students}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (activeTab === 'students') {
        const studentList = users.filter(u => u.roles?.some(r => {
            const roleName = typeof r === 'string' ? r : r.name;
            return roleName.includes('STUDENT');
        }));

        const studentsWithDetails = studentList.map(u => ({ ...u, details: getStudentDetails(u.id) }));

        const deptsInfo = [
            { code: 'CSE', name: 'Computer Science', color: 'indigo' },
            { code: 'IT', name: 'Information Tech', color: 'sky' },
            { code: 'ECE', name: 'Electronics', color: 'amber' },
            { code: 'EE', name: 'Electrical', color: 'rose' },
            { code: 'ME', name: 'Mechanical', color: 'green' },
            { code: 'CV', name: 'Civil', color: 'purple' }
        ];

        const activeDepts = studentDeptFilter === 'All Departments'
            ? deptsInfo
            : deptsInfo.filter(d => d.name === studentDeptFilter);

        return (
            <div className="animate-fade-in">
                <header className="topbar">
                    <div>
                        <h1 className="page-title text-gradient-animated">Student Records</h1>
                        <p className="page-subtitle">Manage student enrollments mapped by department and academic year</p>
                    </div>
                    <button className="btn btn-primary" onClick={fetchUsers}>
                        🔄 Refresh List
                    </button>
                </header>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
                    {['All Departments', ...deptsInfo.map(d => d.name)].map(f => (
                        <button
                            key={f}
                            className={`btn btn-sm ${studentDeptFilter === f ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ borderRadius: '20px', whiteSpace: 'nowrap' }}
                            onClick={() => setStudentDeptFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {loadingUsers ? (
                    <div style={{ padding: '60px', display: 'flex', justifyContent: 'center' }} className="content-card glass-panel-enhanced">
                        <div className="spinner" style={{ width: '40px', height: '40px', borderWidth: '3px' }} />
                    </div>
                ) : (
                    activeDepts.map(dept => {
                        const deptStudents = studentsWithDetails
                            .filter(u => u.details.dept === dept.name || u.details.dept === dept.code)
                            .sort((a, b) => a.details.year.localeCompare(b.details.year)); // Sort 1st -> 4th Year

                        if (deptStudents.length === 0) return null;

                        return (
                            <div key={dept.code} style={{ marginBottom: '40px' }} className="content-card animate-fade-in glass-panel-enhanced">
                                <div style={{ padding: '20px 32px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: `var(--${dept.color})`, color: 'white', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold' }}>
                                        {dept.code}
                                    </div>
                                    <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', fontWeight: 700, margin: 0 }}>
                                        {dept.name} Students
                                    </h3>
                                    <span style={{ marginLeft: 'auto', background: 'rgba(0,0,0,0.05)', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>
                                        {deptStudents.length} Students
                                    </span>
                                </div>
                                <div className="table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Student Profile</th>
                                                <th>Academic Year</th>
                                                <th>Fees Paid</th>
                                                <th>Account Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {deptStudents.map(u => (
                                                <tr key={u.id}>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                            <div className="user-avatar" style={{ background: `var(--${dept.color})`, opacity: 0.85 }}>
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
                                                        <span style={{ fontWeight: 600, color: 'var(--primary)', background: 'rgba(139, 92, 246, 0.08)', padding: '4px 8px', borderRadius: '6px' }}>{u.details.year}</span>
                                                    </td>
                                                    <td>
                                                        <span className="status-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                                            {u.details.fees}
                                                        </span>
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
                                                            {u.active ? 'Disable' : 'Enable'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        );
    }

    if (activeTab === 'teachers') {
        // Get real teachers from API state (if any) and merge with mock
        const realTeacherList = users.filter(u => u.roles?.some(r => {
            const roleName = typeof r === 'string' ? r : r.name;
            return roleName.includes('TEACHER') || roleName.includes('INSTRUCTOR');
        })).map(u => {
            const d = getTeacherDetails(u.id);
            return { ...u, _dept: d.dept, _subject: d.subject, _salary: d.salary };
        });

        // Merge: real teachers first, then mock (avoiding ID collisions)
        const realIds = new Set(realTeacherList.map(u => u.id));
        const allTeachers = [
            ...realTeacherList,
            ...MOCK_TEACHERS_PARSED.filter(u => !realIds.has(u.id))
        ];

        const deptsInfo = [
            { code: 'CSE', name: 'Computer Science', color: 'indigo' },
            { code: 'IT', name: 'Information Tech', color: 'sky' },
            { code: 'ECE', name: 'Electronics', color: 'amber' },
            { code: 'EE', name: 'Electrical', color: 'rose' },
            { code: 'ME', name: 'Mechanical', color: 'green' },
            { code: 'CV', name: 'Civil', color: 'purple' }
        ];

        const activeDepts = teacherDeptFilter === 'All Departments'
            ? deptsInfo
            : deptsInfo.filter(d => d.name === teacherDeptFilter);

        return (
            <div className="animate-fade-in">
                <header className="topbar">
                    <div>
                        <h1 className="page-title text-gradient-animated">Faculty & Teachers</h1>
                        <p className="page-subtitle">Manage teaching staff, subjects, and payroll by department</p>
                    </div>
                    <button className="btn btn-primary" onClick={fetchUsers}>
                        🔄 Refresh List
                    </button>
                </header>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
                    {['All Departments', ...deptsInfo.map(d => d.name)].map(f => (
                        <button
                            key={f}
                            className={`btn btn-sm ${teacherDeptFilter === f ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ borderRadius: '20px', whiteSpace: 'nowrap' }}
                            onClick={() => setTeacherDeptFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="animate-fade-in">
                    {activeDepts.map(dept => {
                        const deptTeachers = allTeachers.filter(u => u._dept === dept.name);
                        if (deptTeachers.length === 0) return null;

                        return (
                            <div key={dept.code} style={{ marginBottom: '40px' }} className="content-card animate-fade-in glass-panel-enhanced">
                                <div style={{ padding: '20px 32px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: `var(--${dept.color})`, color: 'white', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold' }}>
                                        {dept.code}
                                    </div>
                                    <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', fontWeight: 700, margin: 0 }}>
                                        {dept.name} Faculty
                                    </h3>
                                    <span style={{ marginLeft: 'auto', background: 'rgba(0,0,0,0.05)', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>
                                        {deptTeachers.length} Teachers
                                    </span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px', padding: '24px' }}>
                                    {deptTeachers.map(u => (
                                        <div key={u.id} className="card hover-lift-3d animate-fade-in" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)', background: 'white', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
                                            {/* Top Header */}
                                            <div style={{ height: '100px', background: `linear-gradient(135deg, rgba(var(--${dept.color}-rgb), 0.8), rgba(var(--${dept.color}-rgb), 1))`, position: 'relative', display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
                                                <span className={`status-badge ${u.active ? 'completed' : 'cancelled'}`} style={{ padding: '6px 12px', fontSize: '11px', backdropFilter: 'blur(4px)', background: u.active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.9)', height: 'fit-content', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                                    {u.active ? '● Active' : '● On Leave'}
                                                </span>
                                            </div>

                                            {/* Content Body */}
                                            <div style={{ padding: '0 24px 24px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>

                                                {/* Centered Avatar */}
                                                <div style={{ width: '84px', height: '84px', borderRadius: '50%', border: '4px solid white', background: `linear-gradient(135deg, rgba(var(--${dept.color}-rgb), 0.9), rgba(var(--${dept.color}-rgb), 1))`, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 800, margin: '-42px auto 16px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                                                    {u.firstName ? u.firstName[0].toUpperCase() : (u.username || 'T')[0].toUpperCase()}
                                                </div>

                                                {/* Name & Handle */}
                                                <div style={{ fontWeight: 800, fontSize: '20px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                                    {u.firstName} {u.lastName}
                                                </div>
                                                <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                                    <span style={{ fontSize: '14px' }}>✉️</span> @{u.username}
                                                </div>

                                                {/* Key Data Grid */}
                                                <div style={{ width: '100%', display: 'flex', gap: '12px', marginBottom: '24px' }}>
                                                    <div style={{ flex: 1, background: 'rgba(0,0,0,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
                                                        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '6px' }}>Primary Subject</div>
                                                        <div style={{ fontWeight: 700, fontSize: '13px', color: `var(--${dept.color})`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                                            📚 <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{u._subject}</span>
                                                        </div>
                                                    </div>
                                                    <div style={{ flex: 1, background: 'rgba(0,0,0,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
                                                        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '6px' }}>Base Salary</div>
                                                        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                                            💳 <span>{u._salary}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', marginTop: 'auto' }}>
                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        style={{ padding: '10px', fontSize: '13px' }}
                                                        onClick={() => setViewingTeacherProfile({ ...u, deptColor: dept.color })}
                                                    >
                                                        View Profile
                                                    </button>
                                                    <button
                                                        className={`btn btn-sm hover-lift-3d ${u.active ? 'btn-secondary' : 'btn-primary'}`}
                                                        style={{
                                                            padding: '10px',
                                                            fontSize: '13px',
                                                            border: u.active ? '1px solid rgba(239, 68, 68, 0.3)' : `1px solid var(--${dept.color})`,
                                                            color: u.active ? 'var(--danger)' : 'white',
                                                            background: u.active ? 'white' : `var(--${dept.color})`
                                                        }}
                                                        onClick={() => toggleStatus(u.id, u.active)}
                                                    >
                                                        {u.active ? 'Revoke Access' : 'Restore Access'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View Teacher Profile Modal */}
                {viewingTeacherProfile && createPortal(
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000, backdropFilter: 'blur(4px)' }}>
                        <div className="card animate-fade-in" style={{ width: '90%', maxWidth: '500px', background: 'white', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', padding: 0 }}>
                            <div style={{ padding: '32px 24px 24px', background: `linear-gradient(135deg, rgba(var(--${viewingTeacherProfile.deptColor}-rgb), 0.8), rgba(var(--${viewingTeacherProfile.deptColor}-rgb), 1))`, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                                <button onClick={() => setViewingTeacherProfile(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.2)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', color: 'white', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>×</button>

                                <div style={{ width: '96px', height: '96px', borderRadius: '50%', border: '4px solid white', background: `var(--${viewingTeacherProfile.deptColor})`, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 800, boxShadow: '0 8px 16px rgba(0,0,0,0.2)', marginBottom: '16px' }}>
                                    {viewingTeacherProfile.firstName ? viewingTeacherProfile.firstName[0].toUpperCase() : (viewingTeacherProfile.username || 'T')[0].toUpperCase()}
                                </div>
                                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'white', margin: '0 0 4px 0' }}>{viewingTeacherProfile.firstName} {viewingTeacherProfile.lastName}</h3>
                                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', margin: 0 }}>@{viewingTeacherProfile.username}</p>
                            </div>

                            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>Department</div>
                                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{viewingTeacherProfile._dept}</div>
                                    </div>
                                    <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>Status</div>
                                        <div style={{ fontWeight: 700, color: viewingTeacherProfile.active ? 'var(--success)' : 'var(--danger)' }}>
                                            {viewingTeacherProfile.active ? '● Active Staff' : '● Access Revoked'}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Contact Information</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <span style={{ fontSize: '16px' }}>📧</span>
                                            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{viewingTeacherProfile.email}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <span style={{ fontSize: '16px' }}>📱</span>
                                            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{viewingTeacherProfile.phone || '+91 98765 43210'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Academic Details</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>📚 {viewingTeacherProfile._subject}</div>
                                        <div style={{ color: 'var(--text-primary)', fontWeight: 700, background: 'white', padding: '4px 12px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>{viewingTeacherProfile._salary}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        );
    }

    if (activeTab === 'courses') {
        const deptsInfo = [
            { code: 'CSE', name: 'Computer Science', pfx: 'CS', color: 'indigo', subjects: ['Engineering Physics', 'Data Structures', 'Operating Systems', 'Machine Learning'] },
            { code: 'IT', name: 'Information Tech', pfx: 'IT', color: 'sky', subjects: ['Engineering Chem', 'Object Oriented Prog', 'Database Systems', 'Cloud Computing'] },
            { code: 'ECE', name: 'Electronics & Comm', pfx: 'EC', color: 'amber', subjects: ['Basic Electronics', 'Digital Logic', 'Microprocessors', 'VLSI Design'] },
            { code: 'EE', name: 'Electrical', pfx: 'EE', color: 'rose', subjects: ['Electrical Basics', 'Circuit Theory', 'Power Systems', 'Control Systems'] },
            { code: 'ME', name: 'Mechanical', pfx: 'ME', color: 'green', subjects: ['Engineering Drawing', 'Thermodynamics', 'Fluid Mechanics', 'Robotics'] },
            { code: 'CV', name: 'Civil', pfx: 'CV', color: 'purple', subjects: ['Engineering Mechanics', 'Surveying', 'Structural Analysis', 'Town Planning'] }
        ];

        const ENGINEERING_COURSES = [];
        let cid = 1;
        deptsInfo.forEach(d => {
            d.subjects.forEach((subj, idx) => {
                const year = idx + 1;
                const yearLabels = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
                ENGINEERING_COURSES.push({
                    id: cid++,
                    name: subj,
                    code: `${d.pfx}-${year}01`,
                    dept: d.code,
                    deptName: d.name,
                    yearInt: year,
                    year: yearLabels[idx],
                    credits: [4, 4, 3, 3][idx],
                    type: year === 4 ? 'Elective' : 'Core',
                    instructor: `Dr. ${['Sharma', 'Desai', 'Kumar', 'Verma', 'Gupta', 'Singh'][(cid + idx) % 6]}`,
                    color: d.color,
                    topics: [
                        `Introduction to ${subj}`,
                        `Advanced Concepts in ${subj}`,
                        `Practical Applications of ${subj}`,
                        `Case Studies in ${subj}`
                    ],
                    syllabus: `Unit 1: Fundamentals of ${subj}\n- Basic terminology and definitions\n- Historical context\n\nUnit 2: Core Principles\n- Theories and frameworks\n- Mathematical foundations\n\nUnit 3: Advanced Topics\n- Specialized applications\n- Modern developments\n\nUnit 4: Future Trends\n- Emerging technologies in ${subj}\n- Research paradigms`
                });
            });
        });

        const activeDepts = courseDeptFilter === 'All Departments'
            ? deptsInfo
            : deptsInfo.filter(d => d.name === courseDeptFilter);

        return (
            <div className="animate-fade-in">
                <header className="topbar" style={{ marginBottom: '24px' }}>
                    <div>
                        <h1 className="page-title text-gradient-animated">Academic Curriculum</h1>
                        <p className="page-subtitle">Manage university syllabus grouped by departments and academic years</p>
                    </div>
                    <button className="btn btn-primary btn-glow">+ Add New Course</button>
                </header>

                {/* Filter Bar */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
                    {['All Departments', ...deptsInfo.map(d => d.name)].map(f => (
                        <button
                            key={f}
                            className={`btn btn-sm ${courseDeptFilter === f ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ borderRadius: '20px', whiteSpace: 'nowrap' }}
                            onClick={() => setCourseDeptFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Group By Department */}
                {activeDepts.map(dept => {
                    const deptCourses = ENGINEERING_COURSES.filter(c => c.dept === dept.code).sort((a, b) => a.yearInt - b.yearInt);
                    return (
                        <div key={dept.code} style={{ marginBottom: '40px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', borderBottom: '2px solid var(--border)', paddingBottom: '12px' }}>
                                <div style={{ background: `var(--${dept.color})`, color: 'white', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold' }}>
                                    {dept.code}
                                </div>
                                <h2 style={{ fontSize: '20px', color: 'var(--text-primary)', fontWeight: 700 }}>
                                    {dept.name} Curriculum
                                </h2>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px', paddingBottom: '16px' }}>
                                {deptCourses.map(course => (
                                    <div key={course.id} className="card hover-lift-3d animate-fade-in" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)', background: 'white', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
                                        {/* Graphic Top Section */}
                                        <div style={{ padding: '20px', background: `linear-gradient(135deg, rgba(var(--${course.color}-rgb), 0.05), rgba(var(--${course.color}-rgb), 0.15))`, borderBottom: '1px solid rgba(0,0,0,0.05)', position: 'relative' }}>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `var(--${course.color})`, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: `0 8px 16px rgba(var(--${course.color}-rgb), 0.3)` }}>
                                                    📚
                                                </div>
                                                <span style={{ background: 'white', color: `var(--${course.color})`, fontWeight: 800, fontSize: '11px', padding: '4px 12px', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                    {course.year}
                                                </span>
                                            </div>

                                            <div>
                                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                                                    <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.7)', padding: '2px 8px', borderRadius: '6px' }}>{course.code}</span>
                                                    <span style={{ fontWeight: 700, fontSize: '12px', color: course.type === 'Core' ? 'var(--primary)' : 'var(--amber)', background: 'rgba(255,255,255,0.7)', padding: '2px 8px', borderRadius: '6px' }}>{course.type}</span>
                                                </div>
                                                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3, margin: 0 }}>{course.name}</h3>
                                            </div>
                                        </div>

                                        {/* Data Section */}
                                        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.02)', padding: '12px', borderRadius: '12px' }}>
                                                <div>
                                                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', letterSpacing: '0.5px' }}>Course Instructor</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        👨‍🏫 {course.instructor}
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', letterSpacing: '0.5px' }}>Credits</div>
                                                    <div style={{ fontWeight: 800, color: `var(--${course.color})`, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        ⭐ {course.credits}
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: 'auto' }}>
                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    style={{ padding: '8px', fontSize: '13px' }}
                                                    onClick={() => setViewingTopics(course)}
                                                >
                                                    📄 View Topics
                                                </button>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    style={{ padding: '8px', fontSize: '13px', background: `var(--${course.color})`, borderColor: `var(--${course.color})` }}
                                                    onClick={() => setEditingSyllabus(course)}
                                                >
                                                    ✏️ Edit Syllabus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {/* View Topics Modal */}
                {viewingTopics && createPortal(
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000, backdropFilter: 'blur(4px)' }}>
                        <div className="card animate-fade-in" style={{ width: '90%', maxWidth: '500px', background: 'white', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', padding: 0 }}>
                            <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `linear-gradient(135deg, rgba(var(--${viewingTopics.color}-rgb), 0.1), transparent)` }}>
                                <div>
                                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{viewingTopics.name}</h3>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Course Topics & Modules</p>
                                </div>
                                <button onClick={() => setViewingTopics(null)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
                            </div>
                            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {viewingTopics.topics.map((topic, i) => (
                                    <div key={i} style={{ padding: '12px 16px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', borderLeft: `3px solid var(--${viewingTopics.color})`, display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '13px', background: 'white', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 'bold', color: `var(--${viewingTopics.color})`, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>{i + 1}</span>
                                        <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>{topic}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: '16px 24px', background: 'rgba(0,0,0,0.02)', borderTop: '1px solid var(--border)', display: 'flex', justifyItems: 'flex-end', justifyContent: 'flex-end' }}>
                                <button className="btn btn-primary btn-sm" onClick={() => setViewingTopics(null)}>Close Overlay</button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

                {/* Edit Syllabus Modal */}
                {editingSyllabus && createPortal(
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000, backdropFilter: 'blur(4px)' }}>
                        <div className="card animate-fade-in" style={{ width: '90%', maxWidth: '700px', background: 'white', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', padding: 0 }}>
                            <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `linear-gradient(135deg, rgba(var(--${editingSyllabus.color}-rgb), 0.1), transparent)` }}>
                                <div>
                                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Edit Syllabus: {editingSyllabus.name}</h3>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Modify the course outline and entire structured syllabus below.</p>
                                </div>
                                <button onClick={() => setEditingSyllabus(null)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
                            </div>
                            <div style={{ padding: '24px' }}>
                                <textarea
                                    defaultValue={editingSyllabus.syllabus}
                                    style={{ width: '100%', height: '300px', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', fontFamily: 'monospace', fontSize: '13px', color: 'var(--text-primary)', resize: 'vertical', lineHeight: 1.6, background: 'rgba(0,0,0,0.01)' }}
                                />
                            </div>
                            <div style={{ padding: '16px 24px', background: 'rgba(0,0,0,0.02)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                <button className="btn btn-secondary btn-sm" onClick={() => setEditingSyllabus(null)}>Discard Changes</button>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                        toast.success('Syllabus updated successfully!');
                                        setEditingSyllabus(null);
                                    }}
                                >
                                    Save Syllabus
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        );
    }

    if (activeTab === 'departments') return (
        <div className="animate-fade-in">
            <header className="topbar">
                <div>
                    <h1 className="page-title text-gradient-animated">Engineering Departments</h1>
                    <p className="page-subtitle">Manage institutional branches, faculty ratio, and student intake</p>
                </div>
                <button className="btn btn-primary btn-glow">+ Add New Branch</button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
                {departments.map(dept => (
                    <div key={dept.id} className="content-card glass-panel-enhanced hover-lift-3d" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <div className={`stat-icon-wrapper ${dept.color}`} style={{ width: '56px', height: '56px', fontSize: '24px', borderRadius: '16px' }}>
                                    {dept.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{dept.name}</h3>
                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>HOD: <span style={{ fontWeight: 600 }}>{dept.hod}</span></div>
                                </div>
                            </div>
                            <span className="status-badge completed">Active</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Enrolled Students</div>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary)' }}>{dept.students} <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>🎓</span></div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Total Faculty</div>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--secondary)' }}>{dept.faculty} <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>👨‍🏫</span></div>
                            </div>
                        </div>

                        <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                            <button className="btn btn-secondary btn-full" style={{ padding: '10px' }} onClick={() => setViewingDeptSyllabus(dept)}>View Syllabus</button>
                            <button className="btn btn-secondary btn-full" style={{ padding: '10px' }} onClick={() => setViewingDeptStaff(dept)}>Staff Roster</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* View Dept Syllabus Modal */}
            {viewingDeptSyllabus && createPortal(
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000, backdropFilter: 'blur(4px)' }}>
                    <div className="card animate-fade-in" style={{ width: '90%', maxWidth: '600px', background: 'white', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', padding: 0 }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: `linear-gradient(135deg, rgba(var(--${viewingDeptSyllabus.color}-rgb), 0.1), transparent)` }}>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>{viewingDeptSyllabus.name} Syllabus</h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Core curriculum and structured topics for 2025-2026</p>
                            </div>
                            <button onClick={() => setViewingDeptSyllabus(null)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
                        </div>
                        <div style={{ padding: '24px', maxHeight: '500px', overflowY: 'auto' }}>
                            {[1, 2, 3, 4, 5, 6].map(sem => (
                                <div key={sem} style={{ marginBottom: '24px' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 700, color: `var(--${viewingDeptSyllabus.color})`, marginBottom: '12px', borderBottom: '2px solid rgba(0,0,0,0.05)', paddingBottom: '6px' }}>Semester {sem}</div>
                                    <div style={{ display: 'grid', gap: '8px' }}>
                                        {[1, 2, 3, 4].map(sub => {
                                            const subNames = TEACHER_DEPTS.find(t => viewingDeptSyllabus.name.includes(t.name) || (viewingDeptSyllabus.id === 'ece' && t.name === 'Electronics') || (viewingDeptSyllabus.id === 'ee' && t.name === 'Electrical') || (viewingDeptSyllabus.id === 'cv' && t.name === 'Civil') || (viewingDeptSyllabus.id === 'me' && t.name === 'Mechanical'))?.subjects || ['Engineering Mathematics', 'Applied Physics', 'Communication Skills', 'Engineering Graphics'];
                                            return (
                                                <div key={sub} style={{ background: 'var(--bg-secondary)', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500, display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>📚 {subNames[sub % subNames.length]} {(sem > 2) ? (['I', 'II', 'III'][sub % 3]) : ''}</span>
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{sem * sub + 10} Credits</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: '16px 24px', background: 'rgba(0,0,0,0.02)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn btn-primary btn-sm" onClick={() => setViewingDeptSyllabus(null)}>Close Syllabus</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* View Dept Staff Modal */}
            {viewingDeptStaff && createPortal(
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000, backdropFilter: 'blur(4px)' }}>
                    <div className="card animate-fade-in" style={{ width: '90%', maxWidth: '700px', background: 'white', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', padding: 0 }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `linear-gradient(135deg, rgba(var(--${viewingDeptStaff.color}-rgb), 0.8), rgba(var(--${viewingDeptStaff.color}-rgb), 1))` }}>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white', margin: '0 0 4px 0' }}>{viewingDeptStaff.name} Staff</h3>
                                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', margin: 0 }}>Showing academic faculty roster</p>
                            </div>
                            <button onClick={() => setViewingDeptStaff(null)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', color: 'white', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                        </div>
                        <div style={{ padding: '24px', maxHeight: '500px', overflowY: 'auto' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                                {MOCK_TEACHERS_PARSED.filter(t => viewingDeptStaff.name.includes(t._dept) || (viewingDeptStaff.id === 'ece' && t._dept === 'Electronics') || (viewingDeptStaff.id === 'ee' && t._dept === 'Electrical') || (viewingDeptStaff.id === 'cv' && t._dept === 'Civil') || (viewingDeptStaff.id === 'me' && t._dept === 'Mechanical')).slice(0, 10).map((t, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.03)' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: `var(--${viewingDeptStaff.color})`, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 700 }}>
                                            {t.firstName[0]}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '15px' }}>{t.firstName} {t.lastName}</div>
                                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{t._subject}</div>
                                            <span className="status-badge" style={{ background: t.active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: t.active ? 'var(--success)' : 'var(--danger)', padding: '2px 8px', fontSize: '10px' }}>
                                                {t.active ? 'Active' : 'On Leave'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ padding: '16px 24px', background: 'rgba(0,0,0,0.02)', borderTop: '1px solid var(--border)', display: 'flex', justifyItems: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Showing 10 faculty members</div>
                            <button className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setViewingDeptStaff(null)}>Close Roster</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );

    if (activeTab === 'analytics') return (
        <div className="animate-fade-in">
            <header className="topbar">
                <div>
                    <h1 className="page-title text-gradient-animated">Advanced Analytics</h1>
                    <p className="page-subtitle">Monitor institutional growth, revenue, and engagement</p>
                </div>
                <button className="btn btn-primary btn-glow" onClick={() => toast.success('Report successfully generated!')}>📄 Export Report</button>
            </header>

            <div className="stats-grid" style={{ marginBottom: '32px' }}>
                {[
                    { title: "Total Revenue", val: "₹1.42 Cr", inc: "+12.5%", desc: "vs last semester", icon: "💰", color: "indigo" },
                    { title: "Avg. Attendance", val: "84.2%", inc: "+2.1%", desc: "across all departments", icon: "📈", color: "sky" },
                    { title: "Student Pass Rate", val: "91.5%", inc: "+4.3%", desc: "in latest examinations", icon: "🏆", color: "green" },
                    { title: "Library Usage", val: "4,201", inc: "+18.2%", desc: "books borrowed this month", icon: "📚", color: "purple" }
                ].map((s, i) => (
                    <div key={i} className="card glass-panel-enhanced hover-lift-3d" style={{ padding: '24px', borderTop: `4px solid var(--${s.color})` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `rgba(var(--${s.color}-rgb), 0.1)`, color: `var(--${s.color})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                                {s.icon}
                            </div>
                            <span className="status-badge completed" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                                {s.inc}
                            </span>
                        </div>
                        <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{s.title}</h3>
                        <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>{s.val}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.desc}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Custom CSS Chart for Revenue Growth */}
                <div className="card glass-panel-enhanced" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Revenue Growth (Current Year)</h3>
                        <select className="input-field" style={{ width: 'auto', padding: '8px 12px', fontSize: '13px', margin: 0 }}>
                            <option>2025 - 2026</option>
                            <option>2024 - 2025</option>
                        </select>
                    </div>
                    <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '20px 0 0' }}>
                        {[40, 60, 45, 80, 55, 90, 75, 100, 85, 65, 95, 110].map((h, i) => (
                            <div key={i} style={{ width: '6%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    width: '100%',
                                    height: `${h * 1.5}px`,
                                    background: `linear-gradient(to top, rgba(var(--indigo-rgb), 0.6), rgba(var(--sky-rgb), 0.9))`,
                                    borderRadius: '6px 6px 0 0',
                                    transition: 'height 1s ease',
                                    cursor: 'pointer'
                                }} className="hover-lift-3d" title={`₹${(h * 2.5).toFixed(1)} Lakhs`} />
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card glass-panel-enhanced" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 24px 0' }}>Department Distribution</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { name: 'Computer Science', pct: '35%', color: 'indigo' },
                            { name: 'Information Tech', pct: '25%', color: 'sky' },
                            { name: 'Electronics & Comm', pct: '15%', color: 'amber' },
                            { name: 'Electrical', pct: '12%', color: 'rose' },
                            { name: 'Mechanical', pct: '8%', color: 'green' },
                            { name: 'Civil', pct: '5%', color: 'purple' }
                        ].map((d, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>
                                    <span>{d.name}</span>
                                    <span>{d.pct}</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: d.pct, height: '100%', background: `var(--${d.color})`, borderRadius: '4px' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    if (activeTab === 'settings') return (
        <div className="animate-fade-in">
            <header className="topbar">
                <div>
                    <h1 className="page-title text-gradient-animated">Platform Settings</h1>
                    <p className="page-subtitle">Configure university preferences, policies, and system settings</p>
                </div>
                <button className="btn btn-primary btn-glow" onClick={() => toast.success('Settings saved successfully!')}>💾 Save Changes</button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {['General Information', 'Academic Calendar', 'Payment Gateways', 'Email Notifications', 'Security & Access'].map((t, i) => (
                        <button key={i} onClick={() => setActiveSettingsTab(t)} style={{
                            padding: '16px',
                            textAlign: 'left',
                            background: activeSettingsTab === t ? 'var(--primary)' : 'transparent',
                            color: activeSettingsTab === t ? 'white' : 'var(--text-secondary)',
                            borderRadius: '12px',
                            border: 'none',
                            fontWeight: activeSettingsTab === t ? 700 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: activeSettingsTab === t ? '0 4px 12px rgba(var(--primary-rgb), 0.3)' : 'none'
                        }}>
                            {t}
                        </button>
                    ))}
                </div>

                <div className="card glass-panel-enhanced" style={{ padding: '32px' }}>
                    {activeSettingsTab === 'General Information' && (
                        <div className="animate-fade-in">
                            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>General Information</h2>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 600 }}>Institution Name</label>
                                    <input type="text" className="input-field" defaultValue="EduManage University" style={{ padding: '12px', borderRadius: '10px' }} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 600 }}>University Code</label>
                                    <input type="text" className="input-field" defaultValue="EDU-PRO-2025" style={{ padding: '12px', borderRadius: '10px' }} />
                                </div>
                            </div>

                            <div className="form-group" style={{ marginBottom: '24px' }}>
                                <label className="form-label" style={{ fontWeight: 600 }}>Official Address</label>
                                <textarea className="input-field" rows="3" defaultValue="123 Education Boulevard, Knowledge City, State - 400001" style={{ padding: '12px', borderRadius: '10px', resize: 'vertical' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 600 }}>Support Email</label>
                                    <input type="email" className="input-field" defaultValue="support@edumanage.edu" style={{ padding: '12px', borderRadius: '10px' }} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 600 }}>Contact Number</label>
                                    <input type="text" className="input-field" defaultValue="+91 1800-456-7890" style={{ padding: '12px', borderRadius: '10px' }} />
                                </div>
                            </div>

                            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>System Preferences</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    { title: 'Enable SMS Notifications', desc: 'Send automated SMS warnings for low attendance', checked: true },
                                    { title: 'Automated Fee Reminders', desc: 'Send emails 7 days before fee due date', checked: true },
                                    { title: 'Public Syllabus Viewing', desc: 'Allow visitors to see course syllabus without logging in', checked: false }
                                ].map((pref, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
                                        <div>
                                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{pref.title}</div>
                                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{pref.desc}</div>
                                        </div>
                                        <div style={{
                                            width: '48px', height: '26px', background: pref.checked ? 'var(--green)' : 'var(--text-muted)',
                                            borderRadius: '13px', position: 'relative', cursor: 'pointer',
                                            transition: 'background 0.3s'
                                        }}>
                                            <div style={{
                                                width: '22px', height: '22px', background: 'white', borderRadius: '50%',
                                                position: 'absolute', top: '2px', left: pref.checked ? '24px' : '2px',
                                                transition: 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSettingsTab === 'Academic Calendar' && (
                        <div className="animate-fade-in">
                            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>Academic Terms</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 600 }}>Odd Semester Start Date</label>
                                    <input type="date" className="input-field" defaultValue="2025-07-15" style={{ padding: '12px', borderRadius: '10px' }} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 600 }}>Odd Semester End Date</label>
                                    <input type="date" className="input-field" defaultValue="2025-11-30" style={{ padding: '12px', borderRadius: '10px' }} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 600 }}>Even Semester Start Date</label>
                                    <input type="date" className="input-field" defaultValue="2026-01-15" style={{ padding: '12px', borderRadius: '10px' }} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 600 }}>Even Semester End Date</label>
                                    <input type="date" className="input-field" defaultValue="2026-05-31" style={{ padding: '12px', borderRadius: '10px' }} />
                                </div>
                            </div>

                            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>Holiday Overrides</h2>
                            <div style={{ padding: '16px', border: '1px dashed var(--border)', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>🏖️</span>
                                <div>Click to generate default national holidays list</div>
                            </div>
                        </div>
                    )}

                    {activeSettingsTab === 'Payment Gateways' && (
                        <div className="animate-fade-in">
                            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>Fee Collection Settings</h2>
                            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ fontSize: '32px' }}>💳</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Stripe Integration</div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Accept international payments securely</div>
                                </div>
                                <button className="btn btn-secondary btn-sm">Configure Key</button>
                            </div>

                            <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ fontSize: '32px' }}>🏦</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, color: 'var(--success)' }}>Razorpay (Active - Default)</div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Live integration with INR standard fee structures</div>
                                </div>
                                <button className="btn btn-sm" style={{ background: 'var(--success)', color: 'white', border: 'none' }}>Connected</button>
                            </div>

                            <div className="form-group">
                                <label className="form-label" style={{ fontWeight: 600 }}>Currency Default</label>
                                <select className="input-field" style={{ padding: '12px', borderRadius: '10px' }} defaultValue="INR">
                                    <option value="INR">Indian Rupee (₹)</option>
                                    <option value="USD">US Dollar ($)</option>
                                    <option value="EUR">Euro (€)</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {activeSettingsTab === 'Email Notifications' && (
                        <div className="animate-fade-in">
                            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>SMTP Configuration</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 600 }}>SMTP Server Host</label>
                                    <input type="text" className="input-field" defaultValue="smtp.edumanage.edu" style={{ padding: '12px', borderRadius: '10px' }} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 600 }}>SMTP Port</label>
                                    <input type="text" className="input-field" defaultValue="587" style={{ padding: '12px', borderRadius: '10px' }} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 600 }}>Sender Email Line</label>
                                    <input type="email" className="input-field" defaultValue="no-reply@edumanage.edu" style={{ padding: '12px', borderRadius: '10px' }} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 600 }}>Auth Password</label>
                                    <input type="password" className="input-field" defaultValue="********" style={{ padding: '12px', borderRadius: '10px' }} />
                                </div>
                            </div>
                            <button className="btn btn-secondary">Send Test Email</button>
                        </div>
                    )}

                    {activeSettingsTab === 'Security & Access' && (
                        <div className="animate-fade-in">
                            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>Authentication Security</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                                {[
                                    { title: 'Require 2FA for Staff Accounts', desc: 'Enforce two-factor authentication for higher roles', checked: true },
                                    { title: 'Strict IP Whitelisting', desc: 'Allow Admin dashboard access only from campus network lines', checked: false },
                                    { title: 'Session Timeout', desc: 'Force logout users who are inactive for longer than 60 minutes', checked: true }
                                ].map((pref, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
                                        <div>
                                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{pref.title}</div>
                                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{pref.desc}</div>
                                        </div>
                                        <div style={{
                                            width: '48px', height: '26px', background: pref.checked ? 'var(--green)' : 'var(--text-muted)',
                                            borderRadius: '13px', position: 'relative', cursor: 'pointer',
                                            transition: 'background 0.3s'
                                        }}>
                                            <div style={{
                                                width: '22px', height: '22px', background: 'white', borderRadius: '50%',
                                                position: 'absolute', top: '2px', left: pref.checked ? '24px' : '2px',
                                                transition: 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="form-group">
                                <label className="form-label" style={{ fontWeight: 600, color: 'var(--danger)' }}>Data Deletion</label>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>This operation drops the entire schema table including active student profiles and past analytics. Ensure proper backups.</p>
                                <button className="btn btn-sm" style={{ background: 'var(--danger)', color: 'white', border: 'none', padding: '10px 16px' }}>Factory Reset Platform</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    if (activeTab === 'messages') return <MessagingPanel senderRole="ADMIN" />;

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

