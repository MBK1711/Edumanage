import { useAuth } from '../../context/AuthContext';
import '../../landing_animations.css';
import '../../student-dashboard.css';

const MOCK_SUBJECTS = [
    { id: 1, title: 'Operating Systems', code: 'CS-301', faculty: 'Dr. R. Sharma', credits: 4, status: 'In Progress', icon: '💻' },
    { id: 2, title: 'Computer Networks', code: 'CS-302', faculty: 'Prof. A. Gupta', credits: 4, status: 'In Progress', icon: '🌐' },
    { id: 3, title: 'Database Mgmt Systems', code: 'CS-303', faculty: 'Ms. P. Singh', credits: 4, status: 'In Progress', icon: '🗄️' },
    { id: 4, title: 'Software Engineering', code: 'CS-304', faculty: 'Dr. K. Mehta', credits: 3, status: 'In Progress', icon: '⚙️' },
    { id: 5, title: 'Theory of Computation', code: 'CS-305', faculty: 'Prof. V. Rao', credits: 3, status: 'Completed', icon: '🧮' },
];

const DEPARTMENT_INFO = {
    name: 'Computer Science & Engineering',
    head: 'Dr. Anjali Verma',
    block: 'Block C, 3rd Floor',
    email: 'cse.dept@educampus.edu',
    events: [
        { title: 'Hackathon 2026', date: 'March 15, 2026' },
        { title: 'Guest Lecture: AI Ethics', date: 'March 22, 2026' },
        { title: 'Tech Symposium', date: 'April 05, 2026' }
    ]
};

const MOCK_ASSIGNMENTS = [
    { id: 1, subject: 'Operating Systems', title: 'Process Scheduling Algorithms', due: '2026-02-25', status: 'Pending', priority: 'High' },
    { id: 2, subject: 'Computer Networks', title: 'TCP/IP Protocol Suite Analysis', due: '2026-02-22', status: 'Submitted', priority: 'Medium' },
    { id: 3, subject: 'DBMS', title: 'Normalization & ER Diagrams', due: '2026-02-20', status: 'Late', priority: 'High' },
];

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const MOCK_TIMETABLE = [
    { day: 'Monday', time: '10:00 AM', subject: 'Operating Systems', room: 'Lab 3' },
    { day: 'Monday', time: '11:00 AM', subject: 'Computer Networks', room: 'Hall A' },
    { day: 'Monday', time: '02:00 PM', subject: 'DBMS Lab', room: 'Lab 2' },
    { day: 'Monday', time: '04:00 PM', subject: 'Library', room: 'Lib 1' },

    { day: 'Tuesday', time: '09:00 AM', subject: 'Software Engineering', room: 'LH 1' },
    { day: 'Tuesday', time: '11:00 AM', subject: 'Theory of Computation', room: 'LH 2' },
    { day: 'Tuesday', time: '01:00 PM', subject: 'Minor Project', room: 'Lab 1' },
    { day: 'Tuesday', time: '03:00 PM', subject: 'Sports', room: 'Ground' },

    { day: 'Wednesday', time: '10:00 AM', subject: 'Operating Systems', room: 'Lab 3' },
    { day: 'Wednesday', time: '12:00 PM', subject: 'Computer Networks', room: 'Hall A' },
    { day: 'Wednesday', time: '02:00 PM', subject: 'Web Development', room: 'Lab 5' },
    { day: 'Wednesday', time: '04:00 PM', subject: 'Mentoring', room: 'Room 101' },

    { day: 'Thursday', time: '09:00 AM', subject: 'Theory of Computation', room: 'Room 304' },
    { day: 'Thursday', time: '11:00 AM', subject: 'DBMS Lab', room: 'Lab 2' },
    { day: 'Thursday', time: '01:00 PM', subject: 'Software Engineering', room: 'LH 1' },
    { day: 'Thursday', time: '03:00 PM', subject: 'Placement Training', room: 'Audi' },

    { day: 'Friday', time: '10:00 AM', subject: 'Machine Learning', room: 'Lab 4' },
    { day: 'Friday', time: '12:00 PM', subject: 'Minor Project', room: 'Lab 1' },
    { day: 'Friday', time: '02:00 PM', subject: 'Cloud Computing', room: 'Lab 3' },
];

const MOCK_PAYMENTS = [
    { id: 'INV-2024-001', desc: 'Semester 4 Tuition Fee', amount: '₹45,000', date: '2026-01-15', status: 'Paid' },
    { id: 'INV-2024-002', desc: 'Library Fine', amount: '₹200', date: '2026-02-10', status: 'Pending' },
];

export default function StudentDashboard({ activeTab }) {
    const { user } = useAuth();

    const getTimetableCell = (day, time) => {
        return MOCK_TIMETABLE.find(t => t.day === day && t.time === time);
    };

    if (activeTab === 'overview') return (
        <div className="animate-fade-in student-panel-glow">
            <div className="welcome-banner animate-fade-in delay-100" style={{ marginBottom: '32px' }}>
                <div className="welcome-greeting">🎓 STUDENT PORTAL</div>
                <div className="welcome-name text-gradient-animated">
                    {user?.firstName ? `Welcome back, ${user.firstName}!` : `Welcome back, ${user?.username}!`}
                </div>
                <div className="welcome-desc">
                    You're crushing it in <strong>Semester 4</strong>. Keep up the momentum! 🚀
                </div>
            </div>

            <div className="stats-grid animate-fade-in delay-200">
                {[
                    { label: 'Enrolled Courses', value: '5', icon: '📚', color: 'indigo', trend: '+1 new' },
                    { label: 'Assignments', value: '2', icon: '📝', color: 'sky', trend: 'Due Soon' },
                    { label: 'Attendance', value: '87%', icon: '✅', color: 'green', trend: 'Good' },
                    { label: 'CGPA', value: '8.4', icon: '🏆', color: 'amber', trend: 'Top 10%' },
                ].map(s => (
                    <div key={s.label} className={`stat-card overview-stat-glow ${s.color} hover-lift-3d`}>
                        <div className="stat-card-header">
                            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
                            <span className="stat-badge">{s.trend}</span>
                        </div>
                        <div className="stat-value">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="card animate-fade-in delay-300 glass-panel-enhanced" style={{ marginTop: '32px' }}>
                <div className="card-header" style={{ borderBottom: '1px solid var(--border)' }}>
                    <div className="card-title">📚 Active Courses</div>
                </div>
                <div style={{ padding: '16px' }}>
                    {MOCK_SUBJECTS.slice(0, 3).map((c, i) => (
                        <div key={c.id} className={`list-card-item delay-${(i + 1) * 100} animate-fade-in`}>
                            <div className="subject-icon">{c.icon}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)' }}>{c.title}</div>
                                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                                    {c.code} · {c.faculty}
                                </div>
                            </div>
                            <span className={`badge ${c.status === 'Completed' ? 'badge-completed' : 'badge-active'}`}>
                                {c.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (activeTab === 'timetable') return (
        <div className="animate-fade-in student-panel-glow">
            <div className="topbar" style={{ marginBottom: '24px' }}>
                <div>
                    <div className="topbar-title">Weekly Schedule</div>
                    <div className="topbar-subtitle">Manage your classes and labs efficiently</div>
                </div>
                <button className="btn btn-secondary btn-sm">Export PDF</button>
            </div>

            <div className="timetable-container animate-fade-in delay-100">
                <div className="timetable-grid">
                    {/* Header Row */}
                    <div className="timetable-header-cell">Time / Day</div>
                    {TIME_SLOTS.map(time => (
                        <div key={time} className="timetable-header-cell">{time}</div>
                    ))}

                    {/* Rows */}
                    {DAYS.map(day => (
                        <>
                            <div key={day} className="timetable-day-header">{day}</div>
                            {TIME_SLOTS.map(time => {
                                const subject = getTimetableCell(day, time);
                                return (
                                    <div key={`${day}-${time}`} className={`timetable-cell ${subject ? 'active' : ''}`}>
                                        {subject ? (
                                            <>
                                                <div className="timetable-subject">{subject.subject}</div>
                                                <div className="timetable-room">📍 {subject.room}</div>
                                            </>
                                        ) : (
                                            <span style={{ opacity: 0.3 }}>-</span>
                                        )}
                                    </div>
                                );
                            })}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );

    if (activeTab === 'assignments') return (
        <div className="animate-fade-in student-panel-glow">
            <div className="topbar" style={{ marginBottom: '24px' }}>
                <div className="topbar-title">Assignments</div>
                <div className="topbar-subtitle">Stay on top of your deadlines</div>
            </div>
            <div className="glass-panel-enhanced" style={{ borderRadius: '24px', padding: '24px' }}>
                {MOCK_ASSIGNMENTS.map((a, i) => (
                    <div key={a.id} className={`list-card-item delay-${(i + 1) * 100} animate-fade-in`}>
                        <div style={{
                            width: '56px', height: '56px', borderRadius: '16px',
                            background: a.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                            color: a.priority === 'High' ? 'var(--danger)' : 'var(--info)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
                        }}>
                            {a.status === 'Submitted' ? '✅' : '📝'}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)' }}>{a.title}</div>
                            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                                {a.subject} • Due: <span style={{ fontWeight: 600 }}>{a.due}</span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span className={`badge ${a.status === 'Submitted' ? 'badge-completed' : a.status === 'Late' ? 'badge-cancelled' : 'badge-pending'}`} style={{ marginBottom: '4px', display: 'inline-block' }}>
                                {a.status}
                            </span>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{a.priority} Priority</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (activeTab === 'payments') return (
        <div className="animate-fade-in student-panel-glow">
            <div className="topbar" style={{ marginBottom: '24px' }}>
                <div className="topbar-title">Financials</div>
                <div className="topbar-subtitle">Invoices & Payment History</div>
            </div>
            <div className="card glass-panel-enhanced hover-lift-3d">
                <div className="table-responsive">
                    <table>
                        <thead><tr><th>Invoice ID</th><th>Description</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
                        <tbody>
                            {MOCK_PAYMENTS.map(p => (
                                <tr key={p.id}>
                                    <td style={{ fontFamily: 'monospace', color: 'var(--primary)', fontWeight: 600 }}>{p.id}</td>
                                    <td>{p.desc}</td>
                                    <td style={{ fontWeight: 700 }}>{p.amount}</td>
                                    <td style={{ color: 'var(--text-muted)' }}>{p.date}</td>
                                    <td>
                                        <span className={`badge ${p.status === 'Paid' ? 'badge-completed' : 'badge-pending'}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    if (activeTab === 'profile') return (
        <div className="animate-fade-in student-panel-glow">
            <div className="card glass-panel-enhanced" style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
                <div style={{ height: '140px', background: 'linear-gradient(135deg, #6366f1, #d946ef)' }}></div>
                <div style={{ padding: '0 32px 32px', display: 'flex', alignItems: 'flex-end', gap: '24px', marginTop: '-40px' }}>
                    <div style={{
                        width: '120px', height: '120px', borderRadius: '50%', border: '4px solid white',
                        background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '48px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}>
                        {user?.firstName ? user.firstName[0] : '👤'}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: 800 }}>{user?.firstName} {user?.lastName}</h2>
                        <div style={{ color: 'var(--text-secondary)' }}>@{user?.username} • Student ID: 2024CS058</div>
                    </div>
                </div>
                <div style={{ padding: '0 32px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                    {[
                        { label: 'Email', value: user?.email },
                        { label: 'Role', value: 'Student' },
                        { label: 'Department', value: 'Computer Science' },
                        { label: 'Semester', value: '4' },
                    ].map(f => (
                        <div key={f.label} className="stat-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.5)' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{f.label}</div>
                            <div style={{ fontWeight: 600, fontSize: '15px' }}>{f.value || '—'}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (activeTab === 'subjects') return (
        <div className="animate-fade-in student-panel-glow">
            <div className="topbar" style={{ marginBottom: '24px' }}>
                <div className="topbar-title">My Subjects</div>
                <div className="topbar-subtitle">Learning materials & progress</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {MOCK_SUBJECTS.map((c, i) => (
                    <div key={c.id} className={`card glass-panel-enhanced hover-lift-3d delay-${(i + 1) * 100} animate-fade-in`} style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <div className="subject-icon">{c.icon}</div>
                            <span className={`badge ${c.status === 'Completed' ? 'badge-completed' : 'badge-active'}`}>{c.status}</span>
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{c.title}</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>{c.code} • {c.faculty}</p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginBottom: '16px' }}>
                            <span style={{ fontWeight: 600 }}>Progress</span>
                            <span style={{ color: 'var(--primary)' }}>{c.status === 'Completed' ? '100%' : '65%'}</span>
                        </div>
                        <div className="progress-track" style={{ marginBottom: '20px' }}>
                            <div className="progress-fill" style={{ width: c.status === 'Completed' ? '100%' : '65%', background: c.status === 'Completed' ? 'var(--success)' : 'var(--primary)' }}></div>
                        </div>

                        <button className="btn btn-secondary btn-full btn-sm">View Classroom</button>
                    </div>
                ))}
            </div>
        </div>
    );

    if (activeTab === 'resources') return (
        <div className="animate-fade-in student-panel-glow">
            <div className="topbar" style={{ marginBottom: '24px' }}>
                <div className="topbar-title">Digital Library</div>
                <div className="topbar-subtitle">Access your semester resources</div>
            </div>
            <div className="resource-grid">
                {['React Patterns PDF', 'System Design Bible', 'DSA Cheatsheet', 'Cloud Architecture 101'].map((book, i) => (
                    <div key={i} className={`resource-card delay-${(i + 1) * 100} animate-fade-in`}>
                        <div style={{ fontSize: '42px', marginBottom: '16px', color: 'var(--primary)' }}>📕</div>
                        <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>{book}</h4>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>PDF • 4.2 MB</p>
                        <button className="btn btn-sm btn-secondary btn-full">Download Resources</button>
                    </div>
                ))}
            </div>
        </div>
    );

    if (activeTab === 'department') return (
        <div className="animate-fade-in student-panel-glow">
            <div className="topbar" style={{ marginBottom: '24px' }}>
                <div className="topbar-title">My Department</div>
                <div className="topbar-subtitle">Computer Science & Engineering</div>
            </div>
            <div className="card glass-panel-enhanced hover-lift-3d" style={{ marginBottom: '32px', padding: '32px', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '20px',
                        background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px',
                        color: 'white', boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
                    }}>🏛️</div>
                    <div>
                        <h2 style={{ fontSize: '28px', marginBottom: '4px', color: 'var(--text-primary)', fontWeight: 800 }}>{DEPARTMENT_INFO.name}</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Head: <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{DEPARTMENT_INFO.head}</span></p>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="stat-card" style={{ background: 'white', border: '1px solid var(--border)' }}>
                        <div className="stat-label">📍 Location</div>
                        <div className="stat-value" style={{ fontSize: '16px' }}>{DEPARTMENT_INFO.block}</div>
                    </div>
                    <div className="stat-card" style={{ background: 'white', border: '1px solid var(--border)' }}>
                        <div className="stat-label">📧 Contact</div>
                        <div className="stat-value" style={{ fontSize: '16px' }}>{DEPARTMENT_INFO.email}</div>
                    </div>
                </div>
            </div>

            <h3 style={{ margin: '0 0 20px 4px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '24px', height: '4px', background: 'var(--primary)', borderRadius: '2px' }}></span>
                Upcoming Events
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {DEPARTMENT_INFO.events.map((e, i) => (
                    <div key={i} className={`card glass-panel-enhanced hover-lift-3d delay-${(i + 1) * 100} animate-fade-in`} style={{ padding: '24px', borderLeft: '4px solid var(--primary)' }}>
                        <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            📅 {e.date}
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{e.title}</div>
                        <button className="btn-link" style={{ marginTop: '16px', fontSize: '13px' }}>Add to Calendar →</button>
                    </div>
                ))}
            </div>
        </div>
    );

    if (activeTab === 'academics') return (
        <div className="animate-fade-in student-panel-glow">
            <div className="topbar" style={{ marginBottom: '24px' }}>
                <div className="topbar-title">Academic Overview</div>
                <div className="topbar-subtitle">Year 3 — Semester 5</div>
            </div>

            <div className="card glass-panel-enhanced hover-lift-3d" style={{ marginBottom: '32px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '40px' }}>
                    <div>
                        <div className="badge badge-active" style={{ marginBottom: '12px' }}>Current Status</div>
                        <h2 className="text-gradient-animated" style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px' }}>Year 3 (Junior)</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>B.Tech in Computer Science & Engineering</p>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                            {['Year 1', 'Year 2'].map(y => <span key={y} className="badge badge-completed">✅ {y}</span>)}
                            <span className="badge badge-active">⚡ Year 3</span>
                            <span className="badge badge-pending">⏳ Year 4</span>
                        </div>
                    </div>
                    <div style={{ fontSize: '80px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}>🎓</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
                <div className="card glass-panel-enhanced hover-lift-3d" style={{ padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
                    <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 700 }}>Academic Calendar</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14px' }}>Key dates for exams & holidays.</p>
                    <button className="btn btn-primary btn-glow btn-full">Download PDF 📥</button>
                </div>

                <div className="card glass-panel-enhanced">
                    <div className="card-header"><div className="card-title">Curriculum</div></div>
                    <div className="table-wrapper">
                        <table>
                            <thead><tr><th>Code</th><th>Subject</th><th>Credits</th><th>Type</th></tr></thead>
                            <tbody>
                                {MOCK_SUBJECTS.map((s, i) => (
                                    <tr key={i}>
                                        <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{s.code}</td>
                                        <td>{s.title}</td>
                                        <td>{s.credits}</td>
                                        <td><span className="badge badge-active">Core</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

    if (activeTab === 'results') return (
        <div className="animate-fade-in student-panel-glow">
            <div className="topbar" style={{ marginBottom: '24px' }}>
                <div className="topbar-title">Exam Results</div>
                <div className="topbar-subtitle">Your academic performance history</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                {[
                    { label: 'CGPA', value: '8.4', color: 'text-gradient-animated' },
                    { label: 'Credits Earned', value: '86', color: 'var(--success)' },
                    { label: 'Active Backlogs', value: '0', color: 'var(--text-muted)' },
                    { label: 'Best Sem', value: 'Sem 3', color: 'var(--primary)' },
                ].map((stat, i) => (
                    <div key={i} className="card glass-panel-enhanced text-center" style={{ padding: '24px' }}>
                        <div style={{ fontSize: '32px', fontWeight: 800, color: stat.color, marginBottom: '4px' }}>{stat.value}</div>
                        <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="card glass-panel-enhanced hover-lift-3d">
                <div className="table-responsive">
                    <table style={{ minWidth: '100%' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-secondary)' }}>
                                <th style={{ padding: '16px' }}>Semester</th>
                                <th>Subject</th>
                                <th>Grade</th>
                                <th>GPA</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { sem: 'Sem 3', subject: 'Advanced React', grade: 'A', gpa: '4.0', status: 'Pass' },
                                { sem: 'Sem 3', subject: 'System Design', grade: 'A-', gpa: '3.7', status: 'Pass' },
                                { sem: 'Sem 2', subject: 'Algorithms', grade: 'B+', gpa: '3.3', status: 'Pass' },
                                { sem: 'Sem 2', subject: 'Data Structures', grade: 'A', gpa: '4.0', status: 'Pass' },
                                { sem: 'Sem 1', subject: 'Mathematics I', grade: 'B', gpa: '3.0', status: 'Pass' },
                            ].map((r, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '16px', fontWeight: 600 }}>{r.sem}</td>
                                    <td>{r.subject}</td>
                                    <td><span className={`badge ${r.grade.startsWith('A') ? 'badge-active' : 'badge-completed'}`}>{r.grade}</span></td>
                                    <td style={{ fontFamily: 'monospace' }}>{r.gpa}</td>
                                    <td><span style={{ color: 'var(--success)', fontWeight: 600 }}>{r.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    // Default fallback
    return (
        <div className="card">
            <div className="card-body" style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Coming Soon</div>
            </div>
        </div>
    );
}
