import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../landing_animations.css';
import '../../teacher-dashboard.css'; // Import the new premium styles

const MOCK_COURSES = [
    { id: 1, title: 'Operating Systems', students: 20, rating: 4.8, revenue: '—', status: 'Published' },
    { id: 2, title: 'Computer Networks', students: 20, rating: 4.6, revenue: '—', status: 'Published' },
];

const MOCK_STUDENTS = [
    // Group 1: Operating Systems (20 students)
    { name: 'Priya Sharma', course: 'Operating Systems', semester: 'Sem 4', progress: 78, lastActive: '2h ago' },
    { name: 'Vikram Singh', course: 'Operating Systems', semester: 'Sem 4', progress: 33, lastActive: '3d ago' },
    { name: 'Aarav Patel', course: 'Operating Systems', semester: 'Sem 4', progress: 88, lastActive: '10m ago' },
    { name: 'Isha Reddy', course: 'Operating Systems', semester: 'Sem 4', progress: 92, lastActive: '1h ago' },
    { name: 'Rohan Mehra', course: 'Operating Systems', semester: 'Sem 4', progress: 65, lastActive: '5h ago' },
    { name: 'Ananya Gupta', course: 'Operating Systems', semester: 'Sem 4', progress: 74, lastActive: '1d ago' },
    { name: 'Kabir Das', course: 'Operating Systems', semester: 'Sem 4', progress: 45, lastActive: '2d ago' },
    { name: 'Meera Iyer', course: 'Operating Systems', semester: 'Sem 4', progress: 81, lastActive: '30m ago' },
    { name: 'Arjun Nair', course: 'Operating Systems', semester: 'Sem 4', progress: 56, lastActive: '4h ago' },
    { name: 'Sana Khan', course: 'Operating Systems', semester: 'Sem 4', progress: 95, lastActive: '5m ago' },
    { name: 'Dev Malhotra', course: 'Operating Systems', semester: 'Sem 4', progress: 23, lastActive: '1w ago' },
    { name: 'Riya Jain', course: 'Operating Systems', semester: 'Sem 4', progress: 89, lastActive: '2h ago' },
    { name: 'Kunal Joshi', course: 'Operating Systems', semester: 'Sem 4', progress: 67, lastActive: '6h ago' },
    { name: 'Tara Singh', course: 'Operating Systems', semester: 'Sem 4', progress: 72, lastActive: '1d ago' },
    { name: 'Omkar Rao', course: 'Operating Systems', semester: 'Sem 4', progress: 50, lastActive: '3d ago' },
    { name: 'Nisha Verma', course: 'Operating Systems', semester: 'Sem 4', progress: 90, lastActive: '1h ago' },
    { name: 'Rahul Chawla', course: 'Operating Systems', semester: 'Sem 4', progress: 44, lastActive: '2d ago' },
    { name: 'Simran Kaur', course: 'Operating Systems', semester: 'Sem 4', progress: 85, lastActive: '45m ago' },
    { name: 'Yash Mehta', course: 'Operating Systems', semester: 'Sem 4', progress: 60, lastActive: '5h ago' },
    { name: 'Pooja Hegde', course: 'Operating Systems', semester: 'Sem 4', progress: 98, lastActive: '2m ago' },

    // Group 2: Computer Networks (20 students)
    { name: 'Amit Kumar', course: 'Computer Networks', semester: 'Sem 4', progress: 45, lastActive: '1d ago' },
    { name: 'Neha Gupta', course: 'Computer Networks', semester: 'Sem 4', progress: 92, lastActive: '30m ago' },
    { name: 'Rajiv Menon', course: 'Computer Networks', semester: 'Sem 4', progress: 20, lastActive: '4d ago' },
    { name: 'Sneha Roy', course: 'Computer Networks', semester: 'Sem 4', progress: 75, lastActive: '2h ago' },
    { name: 'Varun Dhawan', course: 'Computer Networks', semester: 'Sem 4', progress: 66, lastActive: '1d ago' },
    { name: 'Kriti Sanon', course: 'Computer Networks', semester: 'Sem 4', progress: 82, lastActive: '3h ago' },
    { name: 'Sidharth Malhotra', course: 'Computer Networks', semester: 'Sem 4', progress: 55, lastActive: '2d ago' },
    { name: 'Alia Bhatt', course: 'Computer Networks', semester: 'Sem 4', progress: 91, lastActive: '15m ago' },
    { name: 'Ranbir Kapoor', course: 'Computer Networks', semester: 'Sem 4', progress: 30, lastActive: '1w ago' },
    { name: 'Deepika Padukone', course: 'Computer Networks', semester: 'Sem 4', progress: 88, lastActive: '1h ago' },
    { name: 'Ranveer Singh', course: 'Computer Networks', semester: 'Sem 4', progress: 70, lastActive: '4h ago' },
    { name: 'Katrina Kaif', course: 'Computer Networks', semester: 'Sem 4', progress: 62, lastActive: '1d ago' },
    { name: 'Vicky Kaushal', course: 'Computer Networks', semester: 'Sem 4', progress: 94, lastActive: '10m ago' },
    { name: 'Kiara Advani', course: 'Computer Networks', semester: 'Sem 4', progress: 48, lastActive: '3d ago' },
    { name: 'Shahid Kapoor', course: 'Computer Networks', semester: 'Sem 4', progress: 77, lastActive: '2h ago' },
    { name: 'Kareena Kapoor', course: 'Computer Networks', semester: 'Sem 4', progress: 58, lastActive: '5h ago' },
    { name: 'Saif Ali Khan', course: 'Computer Networks', semester: 'Sem 4', progress: 85, lastActive: '45m ago' },
    { name: 'Sara Ali Khan', course: 'Computer Networks', semester: 'Sem 4', progress: 35, lastActive: '6d ago' },
    { name: 'Kartik Aaryan', course: 'Computer Networks', semester: 'Sem 4', progress: 79, lastActive: '3h ago' },
    { name: 'Janhvi Kapoor', course: 'Computer Networks', semester: 'Sem 4', progress: 90, lastActive: '1h ago' },
];

const MOCK_ASSIGNMENTS = [
    { id: 1, subject: 'Operating Systems', title: 'Process Scheduling Algorithms', due: '2026-02-25', submissions: '18/20', status: 'Active', priority: 'High', description: 'Implement FCFS, SJF, and Round Robin scheduling algorithms in C++ or Java. Compare their performance with different datasets.' },
    { id: 2, subject: 'Computer Networks', title: 'TCP/IP Protocol Suite Analysis', due: '2026-02-22', submissions: '15/20', status: 'Active', priority: 'Medium', description: 'Analyze the headers of TCP and IP packets using Wireshark. Explain the function of each field in a detailed report.' },
    { id: 3, subject: 'Operating Systems', title: 'Memory Management Report', due: '2026-03-01', submissions: '0/20', status: 'Scheduled', priority: 'Medium', description: 'Research and write a comprehensive report on virtual memory, paging, and fragmentation techniques used in modern operating systems.' },
];

export default function TeacherDashboard({ activeTab }) {
    const { user } = useAuth();
    const [assignmentViewMode, setAssignmentViewMode] = useState('list'); // 'list', 'view', 'grade'
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    const handleViewAssignment = (assignment) => {
        setSelectedAssignment(assignment);
        setAssignmentViewMode('view');
    };

    const handleGradeAssignment = (assignment) => {
        setSelectedAssignment(assignment);
        setAssignmentViewMode('grade');
    };

    const handleBackToAssignments = () => {
        setAssignmentViewMode('list');
        setSelectedAssignment(null);
    };

    if (activeTab === 'overview') return (
        <div className="teacher-dashboard-container animate-fade-in">
            <header className="dashboard-header animate-fade-in delay-100" style={{ marginBottom: '32px' }}>
                <h1 className="topbar-title">Teacher Dashboard</h1>
                <p className="topbar-subtitle">Manage your classes and students</p>
            </header>

            <div className="welcome-banner animate-fade-in delay-200" style={{ marginBottom: '32px', padding: '24px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))', borderRadius: '16px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                <div className="welcome-greeting" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', marginBottom: '8px' }}>📚 TEACHER PORTAL</div>
                <div className="welcome-name" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {user?.firstName ? `Welcome back, ${user.firstName}!` : `Welcome back, ${user?.username}!`}
                </div>
                <div className="welcome-desc" style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
                    You have <strong>307 students</strong> enrolled across 3 active courses.
                </div>
            </div>

            <div className="stats-grid animate-fade-in delay-300" style={{ marginBottom: '40px' }}>
                {[
                    { label: 'Total Students', value: '307', icon: '👥', color: 'indigo', change: '+18%' },
                    { label: 'Active Courses', value: '3', icon: '📚', color: 'sky', change: '+1' },
                    { label: 'Avg. Rating', value: '4.77', icon: '⭐', color: 'amber', change: '+0.2' },
                    { label: 'Monthly Earnings', value: '₹61K', icon: '💰', color: 'green', change: '+31%' },
                ].map(s => (
                    <div key={s.label} className={`stat-card overview-stat-glow ${s.color} hover-lift-3d`}>
                        <div className="stat-card-header">
                            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
                            <span className="stat-badge">{s.change}</span>
                        </div>
                        <div className="stat-value">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="card animate-fade-in delay-400 glass-panel-enhanced">
                <div className="card-header" style={{ padding: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <div className="card-title" style={{ fontSize: '20px', fontWeight: 700 }}>📈 Student Progress</div>
                </div>
                <div className="table-wrapper" style={{ padding: '16px' }}>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                        <thead>
                            <tr style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <th style={{ padding: '0 16px', textAlign: 'left' }}>Student</th>
                                <th style={{ textAlign: 'left' }}>Course</th>
                                <th style={{ textAlign: 'left' }}>Progress</th>
                                <th style={{ textAlign: 'left' }}>Last Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_STUDENTS.slice(0, 5).map((s, i) => (
                                <tr key={i} className="list-card-item">
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div className="user-avatar" style={{ width: '36px', height: '36px', fontSize: '14px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                                                {s.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{s.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{s.course}</td>
                                    <td style={{ minWidth: '200px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ flex: 1, height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                                                <div style={{
                                                    height: '100%',
                                                    width: `${s.progress}%`,
                                                    background: s.progress >= 80 ? 'var(--success)' : s.progress >= 50 ? 'var(--primary)' : 'var(--warning)',
                                                    borderRadius: '99px',
                                                    transition: 'width 1s ease-out'
                                                }} />
                                            </div>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', minWidth: '40px' }}>
                                                {s.progress}%
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{s.lastActive}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    if (activeTab === 'courses') return (
        <div className="teacher-dashboard-container animate-fade-in">
            <div className="topbar" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <div className="topbar-title">My Courses</div>
                    <div className="topbar-subtitle">Manage your educational content</div>
                </div>
                <button className="btn btn-primary btn-glow" style={{ padding: '10px 20px' }}>+ New Course</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {MOCK_COURSES.map((c, i) => (
                    <div key={c.id} className={`card glass-panel-enhanced hover-lift-3d animate-fade-in delay-${(i + 1) * 100}`} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '16px',
                                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
                                color: 'var(--primary)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px'
                            }}>📚</div>
                            <span className={`badge ${c.status === 'Published' ? 'badge-active' : 'badge-pending'}`}>{c.status}</span>
                        </div>

                        <div>
                            <div style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: '1.3' }}>{c.title}</div>
                            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>ID: #CRS-{202400 + c.id}</div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{c.students}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Students</div>
                            </div>
                            <div style={{ width: '1px', height: '24px', background: 'var(--border)' }}></div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{c.rating}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rating</div>
                            </div>
                            <div style={{ width: '1px', height: '24px', background: 'var(--border)' }}></div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--success)' }}>{c.revenue}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Earned</div>
                            </div>
                        </div>

                        <button className="btn btn-secondary btn-full" style={{ marginTop: 'auto' }}>Manage Course</button>
                    </div>
                ))}
            </div>
        </div>
    );

    if (activeTab === 'students') return (
        <div className="teacher-dashboard-container animate-fade-in">
            <div className="topbar" style={{ marginBottom: '32px' }}>
                <div>
                    <div className="topbar-title">Student Directory</div>
                    <div className="topbar-subtitle">View all enrolled students by course</div>
                </div>
            </div>

            {/* Section 1: Operating Systems */}
            <div className="card glass-panel-enhanced" style={{ marginBottom: '40px' }}>
                <div className="card-header" style={{ padding: '24px', borderBottom: '1px solid rgba(139, 92, 246, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '24px' }}>💻</div>
                        <div>
                            <div className="card-title" style={{ fontSize: '18px', fontWeight: 700 }}>Operating Systems</div>
                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Semester 4 • 20 Students</div>
                        </div>
                    </div>
                </div>
                <div className="table-wrapper" style={{ padding: '24px' }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr style={{ background: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
                                <th style={{ padding: '16px', borderRadius: '8px 0 0 8px' }}>Student</th>
                                <th style={{ padding: '16px' }}>Semester</th>
                                <th style={{ padding: '16px' }}>Joined</th>
                                <th style={{ padding: '16px', borderRadius: '0 8px 8px 0' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_STUDENTS.filter(s => s.course === 'Operating Systems').map((s, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div className="user-avatar" style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                                                {s.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.name.toLowerCase().replace(' ', '.')}@student.edu</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', fontWeight: 500 }}>{s.semester}</td>
                                    <td style={{ padding: '16px', color: 'var(--text-muted)' }}>2026-01-15</td>
                                    <td style={{ padding: '16px' }}><button className="btn btn-secondary btn-sm">Message</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Section 2: Computer Networks */}
            <div className="card glass-panel-enhanced">
                <div className="card-header" style={{ padding: '24px', borderBottom: '1px solid rgba(139, 92, 246, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '24px' }}>🌐</div>
                        <div>
                            <div className="card-title" style={{ fontSize: '18px', fontWeight: 700 }}>Computer Networks</div>
                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Semester 4 • 20 Students</div>
                        </div>
                    </div>
                </div>
                <div className="table-wrapper" style={{ padding: '24px' }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr style={{ background: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
                                <th style={{ padding: '16px', borderRadius: '8px 0 0 8px' }}>Student</th>
                                <th style={{ padding: '16px' }}>Semester</th>
                                <th style={{ padding: '16px' }}>Joined</th>
                                <th style={{ padding: '16px', borderRadius: '0 8px 8px 0' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_STUDENTS.filter(s => s.course === 'Computer Networks').map((s, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div className="user-avatar" style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                                                {s.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.name.toLowerCase().replace(' ', '.')}@student.edu</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', fontWeight: 500 }}>{s.semester}</td>
                                    <td style={{ padding: '16px', color: 'var(--text-muted)' }}>2026-01-15</td>
                                    <td style={{ padding: '16px' }}><button className="btn btn-secondary btn-sm">Message</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    if (activeTab === 'assignments') {
        if (assignmentViewMode === 'view' && selectedAssignment) {
            return (
                <div className="teacher-dashboard-container animate-fade-in">
                    <button onClick={handleBackToAssignments} className="btn" style={{ marginBottom: '24px', background: 'transparent', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        ← Back to Assignments
                    </button>
                    <div className="card glass-panel-enhanced" style={{ padding: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                            <div>
                                <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{selectedAssignment.title}</h2>
                                <div style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>{selectedAssignment.subject} • Due: {selectedAssignment.due}</div>
                            </div>
                            <span className={`badge ${selectedAssignment.priority === 'High' ? 'badge-pending' : 'badge-active'}`} style={{ fontSize: '14px' }}>
                                {selectedAssignment.priority} Priority
                            </span>
                        </div>
                        <div style={{ padding: '24px', background: 'rgba(255,255,255,0.5)', borderRadius: '16px', border: '1px solid rgba(139, 92, 246, 0.15)', marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Description</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>{selectedAssignment.description}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <button className="btn btn-primary btn-glow" onClick={() => handleGradeAssignment(selectedAssignment)}>Grade Submissions</button>
                            <button className="btn btn-secondary">Edit Assignment</button>
                        </div>
                    </div>
                </div>
            );
        }

        if (assignmentViewMode === 'grade' && selectedAssignment) {
            const courseStudents = MOCK_STUDENTS.filter(s => s.course === selectedAssignment.subject);
            return (
                <div className="teacher-dashboard-container animate-fade-in">
                    <button onClick={handleBackToAssignments} className="btn" style={{ marginBottom: '24px', background: 'transparent', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        ← Back to Assignments
                    </button>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div>
                            <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Grading: {selectedAssignment.title}</h2>
                            <div style={{ color: 'var(--text-secondary)' }}>{selectedAssignment.subject} • {courseStudents.length} Students</div>
                        </div>
                        <div className="card glass-panel-enhanced" style={{ padding: '12px 24px' }}>
                            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Average Grade: -- / 100</span>
                        </div>
                    </div>

                    <div className="card glass-panel-enhanced">
                        <div className="table-wrapper" style={{ padding: '24px' }}>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
                                        <th style={{ padding: '16px', borderRadius: '8px 0 0 8px' }}>Student</th>
                                        <th style={{ padding: '16px' }}>Status</th>
                                        <th style={{ padding: '16px' }}>Submission Date</th>
                                        <th style={{ padding: '16px' }}>Grade (0-100)</th>
                                        <th style={{ padding: '16px', borderRadius: '0 8px 8px 0' }}>Feedback</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseStudents.map((s, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                            <td style={{ padding: '16px', fontWeight: 600 }}>{s.name}</td>
                                            <td style={{ padding: '16px' }}>
                                                <span className="badge badge-completed">Submitted</span>
                                            </td>
                                            <td style={{ padding: '16px', color: 'var(--text-muted)' }}>Feb 24, 2026</td>
                                            <td style={{ padding: '16px' }}>
                                                <input type="number" min="0" max="100" placeholder="--" style={{
                                                    width: '60px', padding: '8px', borderRadius: '8px',
                                                    border: '1px solid var(--border)', textAlign: 'center'
                                                }} />
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <input type="text" placeholder="Add feedback..." style={{
                                                    width: '100%', padding: '8px 12px', borderRadius: '8px',
                                                    border: '1px solid var(--border)', background: 'rgba(255,255,255,0.5)'
                                                }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="teacher-dashboard-container animate-fade-in">
                <div className="topbar" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div className="topbar-title">Assignments</div>
                        <div className="topbar-subtitle">Manage classwork and grading</div>
                    </div>
                    <button className="btn btn-primary btn-glow" style={{ padding: '10px 24px' }}>+ Create Assignment</button>
                </div>

                <div className="card glass-panel-enhanced">
                    <div className="table-wrapper" style={{ padding: '24px' }}>
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr style={{ background: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
                                    <th style={{ padding: '16px', borderRadius: '8px 0 0 8px' }}>Assignment Title</th>
                                    <th style={{ padding: '16px' }}>Course</th>
                                    <th style={{ padding: '16px' }}>Due Date</th>
                                    <th style={{ padding: '16px' }}>Submissions</th>
                                    <th style={{ padding: '16px' }}>Status</th>
                                    <th style={{ padding: '16px', borderRadius: '0 8px 8px 0' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_ASSIGNMENTS.map((a, i) => (
                                    <tr key={a.id} className="list-card-item" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{
                                                    width: '40px', height: '40px', borderRadius: '12px',
                                                    background: a.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                                    color: a.priority === 'High' ? 'var(--danger)' : 'var(--info)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'
                                                }}>
                                                    📝
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{a.title}</div>
                                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Priority: {a.priority}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px', fontWeight: 500 }}>{a.subject}</td>
                                        <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{a.due}</td>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ flex: 1, width: '60px', height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                                                    <div style={{ width: '75%', height: '100%', background: 'var(--primary)', borderRadius: '99px' }}></div>
                                                </div>
                                                <span style={{ fontSize: '13px', fontWeight: 600 }}>{a.submissions}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <span className={`badge ${a.status === 'Active' ? 'badge-active' : 'badge-pending'}`}>
                                                {a.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <button className="btn btn-secondary btn-sm" onClick={() => handleViewAssignment(a)} style={{ marginRight: '8px' }}>View</button>
                                            <button className="btn btn-secondary btn-sm" onClick={() => handleGradeAssignment(a)}>Grade</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card animate-fade-in glass-panel-enhanced hover-lift-3d" style={{ margin: '24px' }}>
            <div className="card-body" style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }} className="animate-bounce">🚧</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }} className="text-gradient-animated">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} — Coming Soon
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>We are working hard to bring you this feature.</p>
            </div>
        </div>
    );
}
