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
    { name: 'Sana Sheikh', course: 'Operating Systems', semester: 'Sem 4', progress: 95, lastActive: '5m ago' },
    { name: 'Dev Desai', course: 'Operating Systems', semester: 'Sem 4', progress: 23, lastActive: '1w ago' },
    { name: 'Riya Jain', course: 'Operating Systems', semester: 'Sem 4', progress: 89, lastActive: '2h ago' },
    { name: 'Kunal Joshi', course: 'Operating Systems', semester: 'Sem 4', progress: 67, lastActive: '6h ago' },
    { name: 'Tara Verma', course: 'Operating Systems', semester: 'Sem 4', progress: 72, lastActive: '1d ago' },
    { name: 'Omkar Rao', course: 'Operating Systems', semester: 'Sem 4', progress: 50, lastActive: '3d ago' },
    { name: 'Nisha Thakur', course: 'Operating Systems', semester: 'Sem 4', progress: 90, lastActive: '1h ago' },
    { name: 'Rahul Chawla', course: 'Operating Systems', semester: 'Sem 4', progress: 44, lastActive: '2d ago' },
    { name: 'Simran Kaur', course: 'Operating Systems', semester: 'Sem 4', progress: 85, lastActive: '45m ago' },
    { name: 'Yash Mehta', course: 'Operating Systems', semester: 'Sem 4', progress: 60, lastActive: '5h ago' },
    { name: 'Pooja Tiwari', course: 'Operating Systems', semester: 'Sem 4', progress: 98, lastActive: '2m ago' },

    // Group 2: Computer Networks (20 students)
    { name: 'Amit Kumar', course: 'Computer Networks', semester: 'Sem 4', progress: 45, lastActive: '1d ago' },
    { name: 'Neha Gupta', course: 'Computer Networks', semester: 'Sem 4', progress: 92, lastActive: '30m ago' },
    { name: 'Rajiv Menon', course: 'Computer Networks', semester: 'Sem 4', progress: 20, lastActive: '4d ago' },
    { name: 'Sneha Roy', course: 'Computer Networks', semester: 'Sem 4', progress: 75, lastActive: '2h ago' },
    { name: 'Varun Sharma', course: 'Computer Networks', semester: 'Sem 4', progress: 66, lastActive: '1d ago' },
    { name: 'Kriti Prasad', course: 'Computer Networks', semester: 'Sem 4', progress: 82, lastActive: '3h ago' },
    { name: 'Siddharth Bose', course: 'Computer Networks', semester: 'Sem 4', progress: 55, lastActive: '2d ago' },
    { name: 'Alia Khan', course: 'Computer Networks', semester: 'Sem 4', progress: 91, lastActive: '15m ago' },
    { name: 'Rishabh Pandey', course: 'Computer Networks', semester: 'Sem 4', progress: 30, lastActive: '1w ago' },
    { name: 'Diya Shah', course: 'Computer Networks', semester: 'Sem 4', progress: 88, lastActive: '1h ago' },
    { name: 'Ravi Singh', course: 'Computer Networks', semester: 'Sem 4', progress: 70, lastActive: '4h ago' },
    { name: 'Kavya Soni', course: 'Computer Networks', semester: 'Sem 4', progress: 62, lastActive: '1d ago' },
    { name: 'Vivek Yadav', course: 'Computer Networks', semester: 'Sem 4', progress: 94, lastActive: '10m ago' },
    { name: 'Kiran Reddy', course: 'Computer Networks', semester: 'Sem 4', progress: 48, lastActive: '3d ago' },
    { name: 'Sahil Kapoor', course: 'Computer Networks', semester: 'Sem 4', progress: 77, lastActive: '2h ago' },
    { name: 'Kareena Das', course: 'Computer Networks', semester: 'Sem 4', progress: 58, lastActive: '5h ago' },
    { name: 'Samir Ali', course: 'Computer Networks', semester: 'Sem 4', progress: 85, lastActive: '45m ago' },
    { name: 'Sara Khan', course: 'Computer Networks', semester: 'Sem 4', progress: 35, lastActive: '6d ago' },
    { name: 'Karan Aaryan', course: 'Computer Networks', semester: 'Sem 4', progress: 79, lastActive: '3h ago' },
    { name: 'Janhvi Pillai', course: 'Computer Networks', semester: 'Sem 4', progress: 90, lastActive: '1h ago' },
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
            {/* Hero Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #6366f1 60%, #8b5cf6 100%)',
                borderRadius: '24px', padding: '36px 40px', marginBottom: '28px',
                position: 'relative', overflow: 'hidden', color: 'white'
            }} className="animate-fade-in delay-100">
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ position: 'absolute', bottom: '-50px', right: '100px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '10px', textTransform: 'uppercase' }}>👨‍🏫 Faculty Portal — EduCampus</div>
                <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>
                    {[user?.firstName, user?.lastName].filter(Boolean).join(' ')
                        ? `Good morning, ${[user.firstName, user.lastName].filter(Boolean).join(' ')}! 🌿`
                        : `Good morning, ${user?.username || 'Teacher'}! 🌿`}
                </div>
                <div style={{ fontSize: '16px', opacity: 0.88, maxWidth: '560px' }}>
                    You have <strong>40 students</strong> across <strong>2 active courses</strong>. You have <strong>2 assignments</strong> ready for grading.
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '8px 18px', fontSize: '13px', fontWeight: 600 }}>📅 Feb 21, 2026</div>
                    <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '8px 18px', fontSize: '13px', fontWeight: 600 }}>🏫 Dept: Computer Science</div>
                    <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '8px 18px', fontSize: '13px', fontWeight: 600 }}>⭐ Avg. Rating: 4.77</div>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="stats-grid animate-fade-in delay-200" style={{ marginBottom: '28px' }}>
                {[
                    { label: 'Total Students', value: '40', icon: '👥', color: 'indigo', change: 'Sem 4', sub: '2 courses' },
                    { label: 'Assignments Active', value: '2', icon: '📝', color: 'sky', change: 'Grading Due', sub: '33/40 submitted' },
                    { label: 'Avg. Class Progress', value: '68%', icon: '📈', color: 'green', change: '▲ On Track', sub: 'Last week: 61%' },
                    { label: 'Avg. Rating', value: '4.77', icon: '⭐', color: 'amber', change: 'Excellent', sub: 'Out of 5.0' },
                ].map(s => (
                    <div key={s.label} className={`stat-card overview-stat-glow ${s.color} hover-lift-3d`}>
                        <div className="stat-card-header">
                            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
                            <span className="stat-badge">{s.change}</span>
                        </div>
                        <div className="stat-value">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{s.sub}</div>
                    </div>
                ))}
            </div>

            {/* 2-Column: Student Progress + Assignment Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
                {/* Student Progress */}
                <div className="card glass-panel-enhanced animate-fade-in delay-300">
                    <div className="card-header" style={{ borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="card-title">📈 Progress Overview</div>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Latest 6</span>
                    </div>
                    <div style={{ padding: '16px' }}>
                        {[...MOCK_STUDENTS].sort((a, b) => b.progress - a.progress).slice(0, 3).concat(
                            [...MOCK_STUDENTS].sort((a, b) => a.progress - b.progress).slice(0, 3)
                        ).map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '12px', marginBottom: '6px', background: s.progress < 40 ? 'rgba(239,68,68,0.04)' : 'rgba(0,0,0,0.015)', border: `1px solid ${s.progress < 40 ? 'rgba(239,68,68,0.12)' : 'var(--border)'}` }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: s.progress >= 80 ? 'rgba(16,185,129,0.15)' : s.progress >= 50 ? 'rgba(99,102,241,0.15)' : 'rgba(239,68,68,0.15)', color: s.progress >= 80 ? '#059669' : s.progress >= 50 ? 'var(--primary)' : '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>
                                    {s.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.course}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '60px', height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${s.progress}%`, background: s.progress >= 80 ? 'var(--success)' : s.progress >= 50 ? 'var(--primary)' : 'var(--danger)', borderRadius: '99px' }} />
                                    </div>
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', minWidth: '36px' }}>{s.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Assignments to Grade */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="card glass-panel-enhanced animate-fade-in delay-400">
                        <div className="card-header" style={{ borderBottom: '1px solid var(--border)' }}>
                            <div className="card-title">📋 Needs Grading</div>
                        </div>
                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {MOCK_ASSIGNMENTS.map((a, i) => (
                                <div key={i} style={{ padding: '14px 16px', borderRadius: '14px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.6)' }}>
                                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '4px' }}>{a.title}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>{a.subject} · Due {a.due}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--primary)', fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px' }}>
                                            {a.submissions} submitted
                                        </span>
                                        <span className={`badge ${a.status === 'Active' ? 'badge-active' : 'badge-pending'}`}>{a.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats Row */}
                    <div className="card glass-panel-enhanced animate-fade-in delay-500">
                        <div className="card-header" style={{ borderBottom: '1px solid var(--border)' }}>
                            <div className="card-title">🏆 Class Snapshot</div>
                        </div>
                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { label: 'Highest Score', value: '98%', name: 'Pooja Tiwari', color: 'var(--success)' },
                                { label: 'Most Active', value: '2m ago', name: 'Sana Sheikh', color: 'var(--primary)' },
                                { label: 'Needs Attention', value: '23%', name: 'Dev Desai', color: 'var(--danger)' },
                            ].map((h, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border)' }}>
                                    <div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h.label}</div>
                                        <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)', marginTop: '2px' }}>{h.name}</div>
                                    </div>
                                    <div style={{ fontWeight: 800, fontSize: '16px', color: h.color }}>{h.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
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
            <div className="animate-fade-in">
                {/* Hero */}
                <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 60%, #10b981 100%)', borderRadius: '24px', padding: '24px 32px', marginBottom: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '4px', textTransform: 'uppercase' }}>📝 Assignments · Semester 4</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Manage Assignments</div>
                    <div style={{ fontSize: '13px', opacity: 0.88, marginBottom: '16px' }}>3 assignments · 33 of 40 submissions received · 1 pending grading</div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button style={{ background: 'white', color: '#6366f1', border: 'none', borderRadius: '12px', padding: '8px 18px', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>+ Create Assignment</button>
                        <button style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '12px', padding: '8px 18px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>📊 View Analytics</button>
                    </div>
                </div>

                {/* Assignment Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {MOCK_ASSIGNMENTS.map((a, i) => {
                        const [done, total] = a.submissions.split('/').map(Number);
                        const pct = Math.round(done / total * 100);
                        const priorityColor = a.priority === 'High' ? '#ef4444' : a.priority === 'Medium' ? '#f59e0b' : '#10b981';
                        const statusColor = a.status === 'Active' ? '#10b981' : a.status === 'Scheduled' ? '#6366f1' : '#f59e0b';
                        return (
                            <div key={a.id} style={{ background: 'white', border: `1.5px solid ${priorityColor}18`, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                {/* Top coloured bar */}
                                <div style={{ height: '4px', background: `linear-gradient(90deg, ${priorityColor}, ${priorityColor}88)` }} />
                                <div style={{ padding: '18px 22px' }}>
                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                        {/* Icon */}
                                        <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${priorityColor}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>📝</div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                                                <div style={{ fontWeight: 800, fontSize: '16px', color: '#1e293b' }}>{a.title}</div>
                                                <span style={{ fontSize: '10px', fontWeight: 800, color: priorityColor, background: `${priorityColor}12`, padding: '2px 10px', borderRadius: '20px', border: `1px solid ${priorityColor}25` }}>{a.priority} Priority</span>
                                                <span style={{ fontSize: '10px', fontWeight: 800, color: statusColor, background: `${statusColor}12`, padding: '2px 10px', borderRadius: '20px' }}>{a.status}</span>
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
                                                📚 {a.subject} &nbsp;·&nbsp; 📅 Due: <strong style={{ color: '#1e293b' }}>{a.due}</strong>
                                            </div>
                                            <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '14px', padding: '10px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                                {a.description}
                                            </div>
                                            {/* Submission bar */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ fontSize: '11px', color: '#94a3b8', flexShrink: 0 }}>Submissions</span>
                                                <div style={{ flex: 1, height: '7px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                                                    <div style={{ width: `${pct}%`, height: '100%', background: pct === 100 ? '#10b981' : pct >= 70 ? '#6366f1' : '#f59e0b', borderRadius: '99px' }} />
                                                </div>
                                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', flexShrink: 0 }}>{a.submissions} &nbsp;<span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>({pct}%)</span></span>
                                            </div>
                                        </div>
                                        {/* Actions */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                                            <button onClick={() => handleViewAssignment(a)} style={{ background: '#6366f1', border: 'none', borderRadius: '10px', padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>👁 View</button>
                                            <button onClick={() => handleGradeAssignment(a)} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: '#475569', cursor: 'pointer' }}>✏ Grade</button>
                                            <button style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: '#ef4444', cursor: 'pointer' }}>🗑</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ─── ATTENDANCE ─────────────────────────────────────────────────────────
    if (activeTab === 'attendance') {
        const LECTURES = [
            {
                subject: 'Operating Systems', code: 'CS-401', total: 45, done: 28, color: '#6366f1', icon: '💻', sessions: [
                    { date: 'Feb 20', topic: 'Deadlock Detection & Recovery', type: 'Lecture' },
                    { date: 'Feb 18', topic: 'Deadlock Avoidance — Banker\'s Algo', type: 'Lecture' },
                    { date: 'Feb 17', topic: 'Process Synchronization Lab', type: 'Lab' },
                    { date: 'Feb 14', topic: 'Semaphores & Mutex', type: 'Lecture' },
                    { date: 'Feb 12', topic: 'Critical Section Problem', type: 'Lecture' },
                ]
            },
            {
                subject: 'Computer Networks', code: 'CS-402', total: 45, done: 24, color: '#0ea5e9', icon: '🌐', sessions: [
                    { date: 'Feb 19', topic: 'TCP Congestion Control', type: 'Lecture' },
                    { date: 'Feb 17', topic: 'Wireshark Lab — TCP Analysis', type: 'Lab' },
                    { date: 'Feb 14', topic: 'Transport Layer — UDP vs TCP', type: 'Lecture' },
                    { date: 'Feb 12', topic: 'Network Layer — IP Addressing', type: 'Lecture' },
                    { date: 'Feb 10', topic: 'Subnetting Practice', type: 'Tutorial' },
                ]
            },
        ];

        // Per-student attendance: each student has random present counts per subject
        const studentAtt = MOCK_STUDENTS.map(s => {
            const maxDone = s.course === 'Operating Systems' ? 28 : 24;
            const present = Math.max(1, Math.round(maxDone * (0.55 + Math.random() * 0.45)));
            return { ...s, present, total: maxDone, pct: Math.round(present / maxDone * 100) };
        });
        const osStudents = studentAtt.filter(s => s.course === 'Operating Systems');
        const cnStudents = studentAtt.filter(s => s.course === 'Computer Networks');

        const typeStyle = { Lecture: '#6366f1', Lab: '#10b981', Tutorial: '#f59e0b' };

        return (
            <div className="animate-fade-in">
                {/* Hero */}
                <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #0ea5e9 55%, #6366f1 100%)', borderRadius: '24px', padding: '24px 32px', marginBottom: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '4px', textTransform: 'uppercase' }}>✅ Attendance · Semester 4</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Attendance Management</div>
                    <div style={{ fontSize: '13px', opacity: 0.88 }}>40 students · 2 subjects · 52 lectures delivered so far</div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '14px', flexWrap: 'wrap' }}>
                        {[{ l: 'OS Lectures Done', v: '28/45' }, { l: 'CN Lectures Done', v: '24/45' }, { l: 'Students Below 75%', v: studentAtt.filter(s => s.pct < 75).length }].map((s, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '10px 18px' }}>
                                <div style={{ fontSize: '10px', opacity: 0.8, marginBottom: '2px' }}>{s.l}</div>
                                <div style={{ fontWeight: 800, fontSize: '18px' }}>{s.v}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── SECTION 1: Lecture Log ── */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ width: '4px', height: '28px', borderRadius: '99px', background: 'linear-gradient(180deg, #10b981, #6366f1)' }} />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '15px', color: '#1e293b' }}>Lecture Progress</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Total sessions conducted per subject · Full syllabus = 45 lectures each</div>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                        {LECTURES.map((lec, li) => {
                            const pct = Math.round(lec.done / lec.total * 100);
                            return (
                                <div key={li} style={{ background: 'white', border: `1.5px solid ${lec.color}20`, borderRadius: '20px', overflow: 'hidden' }}>
                                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${lec.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{lec.icon}</div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b' }}>{lec.subject}</div>
                                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{lec.code}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 900, fontSize: '20px', color: lec.color }}>{lec.done}<span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>/{lec.total}</span></div>
                                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>lectures</div>
                                        </div>
                                    </div>
                                    {/* Progress bar */}
                                    <div style={{ padding: '12px 20px', borderBottom: '1px solid #f8fafc' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginBottom: '6px' }}>
                                            <span>Syllabus coverage</span><span style={{ color: lec.color, fontWeight: 700 }}>{pct}%</span>
                                        </div>
                                        <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                                            <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${lec.color}, ${lec.color}88)`, borderRadius: '99px' }} />
                                        </div>
                                    </div>
                                    {/* Recent sessions */}
                                    <div style={{ padding: '12px 20px' }}>
                                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recent Sessions</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            {lec.sessions.map((sess, si) => (
                                                <div key={si} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 10px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                                    <span style={{ fontSize: '10px', fontWeight: 700, color: typeStyle[sess.type], background: `${typeStyle[sess.type]}12`, padding: '2px 7px', borderRadius: '6px', flexShrink: 0 }}>{sess.type}</span>
                                                    <span style={{ flex: 1, fontSize: '12px', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sess.topic}</span>
                                                    <span style={{ fontSize: '10px', color: '#94a3b8', flexShrink: 0 }}>{sess.date}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── SECTION 2: Per-Student Attendance ── */}
                {[{ label: 'Operating Systems', students: osStudents, color: '#6366f1', done: 28 }, { label: 'Computer Networks', students: cnStudents, color: '#0ea5e9', done: 24 }].map((subj, si) => (
                    <div key={si} style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', marginBottom: '20px', overflow: 'hidden' }}>
                        <div style={{ padding: '14px 22px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbff' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '4px', height: '24px', borderRadius: '99px', background: subj.color }} />
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b' }}>{subj.label} — Student Attendance</div>
                                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{subj.students.length} students · {subj.done} classes conducted</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '3px 10px', borderRadius: '20px' }}>≥75% = OK</span>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '3px 10px', borderRadius: '20px' }}>&lt;75% = At-Risk</span>
                            </div>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc' }}>
                                        <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>#</th>
                                        <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Student</th>
                                        <th style={{ padding: '10px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Present</th>
                                        <th style={{ padding: '10px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Absent</th>
                                        <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Attendance %</th>
                                        <th style={{ padding: '10px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subj.students.map((s, i) => {
                                        const barColor = s.pct >= 85 ? '#10b981' : s.pct >= 75 ? '#f59e0b' : '#ef4444';
                                        return (
                                            <tr key={i} style={{ borderBottom: '1px solid #f8fafc', background: i % 2 === 0 ? 'white' : '#fafbff' }}>
                                                <td style={{ padding: '10px 16px', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{i + 1}</td>
                                                <td style={{ padding: '10px 16px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: `${barColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '11px', color: barColor, flexShrink: 0 }}>
                                                            {s.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <span style={{ fontWeight: 600, fontSize: '13px', color: '#1e293b' }}>{s.name}</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 700, color: '#10b981', fontSize: '13px' }}>{s.present}</td>
                                                <td style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 700, color: '#ef4444', fontSize: '13px' }}>{s.total - s.present}</td>
                                                <td style={{ padding: '10px 24px 10px 16px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{ flex: 1, minWidth: '80px', height: '6px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                                                            <div style={{ width: `${s.pct}%`, height: '100%', background: barColor, borderRadius: '99px' }} />
                                                        </div>
                                                        <span style={{ fontSize: '12px', fontWeight: 800, color: barColor, minWidth: '36px' }}>{s.pct}%</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                                                    <span style={{ fontSize: '10px', fontWeight: 800, color: barColor, background: `${barColor}12`, padding: '3px 10px', borderRadius: '20px' }}>
                                                        {s.pct >= 75 ? '✓ Safe' : '⚠ At-Risk'}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // ─── SCHEDULE ───────────────────────────────────────────────────────────
    if (activeTab === 'schedule') {
        const SCHEDULE = [
            { day: 'Monday', slots: [{ time: '9:00 AM', subj: 'Operating Systems', room: 'Lab 3', type: 'Lab' }, { time: '11:00 AM', subj: 'Computer Networks', room: 'Hall A', type: 'Lecture' }, { time: '2:00 PM', subj: 'OS Tutorial', room: 'Room 104', type: 'Tutorial' }] },
            { day: 'Tuesday', slots: [{ time: '10:00 AM', subj: 'Computer Networks', room: 'LH 2', type: 'Lecture' }, { time: '12:00 PM', subj: 'Faculty Meeting', room: 'Conf Rm', type: 'Meeting' }, { time: '3:00 PM', subj: 'Office Hours', room: 'Room 201', type: 'Office' }] },
            { day: 'Wednesday', slots: [{ time: '9:00 AM', subj: 'Operating Systems', room: 'LH 1', type: 'Lecture' }, { time: '11:00 AM', subj: 'CN Lab', room: 'Lab 5', type: 'Lab' }, { time: '2:00 PM', subj: 'Research Work', room: 'R&D Block', type: 'Research' }] },
            { day: 'Thursday', slots: [{ time: '10:00 AM', subj: 'Operating Systems', room: 'Room 304', type: 'Lecture' }, { time: '12:00 PM', subj: 'Computer Networks', room: 'LH 2', type: 'Lecture' }, { time: '3:00 PM', subj: 'Student Mentoring', room: 'Room 201', type: 'Mentoring' }] },
            { day: 'Friday', slots: [{ time: '9:00 AM', subj: 'OS Lab', room: 'Lab 3', type: 'Lab' }, { time: '11:00 AM', subj: 'Computer Networks', room: 'Hall B', type: 'Lecture' }, { time: '1:00 PM', subj: 'Dept Seminar', room: 'Audi', type: 'Meeting' }] },
        ];
        const typeColor = { Lecture: '#6366f1', Lab: '#10b981', Tutorial: '#f59e0b', Meeting: '#ef4444', Office: '#0ea5e9', Research: '#8b5cf6', Mentoring: '#d946ef' };
        return (
            <div className="animate-fade-in" style={{ padding: '0' }}>
                {/* Hero */}
                <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 55%, #d946ef 100%)', borderRadius: '24px', padding: '24px 32px', marginBottom: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '4px', textTransform: 'uppercase' }}>📅 Weekly Schedule · Semester 4</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>My Timetable</div>
                    <div style={{ fontSize: '13px', opacity: 0.88 }}>15 classes/week · 2 subjects · Mon–Fri</div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
                        {Object.entries(typeColor).map(([type, color]) => (
                            <div key={type} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '3px 12px', fontSize: '11px', fontWeight: 700 }}>
                                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: color, marginRight: '5px' }} />{type}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Days */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {SCHEDULE.map((day, di) => (
                        <div key={di} style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', overflow: 'hidden' }}>
                            <div style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px', background: '#fafbff' }}>
                                <div style={{ width: '4px', height: '24px', borderRadius: '99px', background: 'linear-gradient(180deg, #6366f1, #8b5cf6)' }} />
                                <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b' }}>{day.day}</div>
                                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{day.slots.length} sessions</span>
                            </div>
                            <div style={{ padding: '12px 16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                {day.slots.map((slot, si) => (
                                    <div key={si} style={{ flex: '1 1 200px', padding: '14px 16px', borderRadius: '14px', background: `${typeColor[slot.type]}08`, border: `1.5px solid ${typeColor[slot.type]}25` }}>
                                        <div style={{ fontSize: '11px', fontWeight: 700, color: typeColor[slot.type], marginBottom: '6px' }}>🕐 {slot.time}</div>
                                        <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b', marginBottom: '3px' }}>{slot.subj}</div>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <span style={{ fontSize: '11px', color: '#64748b' }}>📍 {slot.room}</span>
                                            <span style={{ fontSize: '10px', fontWeight: 700, color: typeColor[slot.type], background: `${typeColor[slot.type]}15`, padding: '2px 8px', borderRadius: '6px' }}>{slot.type}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ─── ATTENDANCE ─────────────────────────────────────────────────────────
    if (activeTab === 'attendance') {
        const ATT_DATA = [
            { date: 'Feb 20', day: 'Thu', subject: 'Operating Systems', room: 'Room 304', present: 18, absent: 2, total: 20, absentees: ['Dev Malhotra', 'Rahul Chawla'] },
            { date: 'Feb 19', day: 'Wed', subject: 'Computer Networks', room: 'LH 2', present: 19, absent: 1, total: 20, absentees: ['Ranbir Kapoor'] },
            { date: 'Feb 18', day: 'Tue', subject: 'Operating Systems', room: 'LH 1', present: 20, absent: 0, total: 20, absentees: [] },
            { date: 'Feb 17', day: 'Mon', subject: 'Computer Networks', room: 'Hall A', present: 17, absent: 3, total: 20, absentees: ['Rajiv Menon', 'Sara Ali Khan', 'Kiara Advani'] },
            { date: 'Feb 14', day: 'Fri', subject: 'OS Lab', room: 'Lab 3', present: 20, absent: 0, total: 20, absentees: [] },
        ];
        const overallPct = Math.round(ATT_DATA.reduce((s, r) => s + r.present, 0) / ATT_DATA.reduce((s, r) => s + r.total, 0) * 100);
        return (
            <div className="animate-fade-in">
                {/* Hero */}
                <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #0ea5e9 60%, #6366f1 100%)', borderRadius: '24px', padding: '24px 32px', marginBottom: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '4px', textTransform: 'uppercase' }}>✅ Attendance · Semester 4</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Attendance Tracker</div>
                    <div style={{ fontSize: '13px', opacity: 0.88 }}>2 active classes · {overallPct}% avg overall attendance</div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                        {[{ l: 'Avg Attendance', v: `${overallPct}%` }, { l: 'Total Sessions', v: ATT_DATA.length }, { l: 'Perfect Days', v: ATT_DATA.filter(r => r.absent === 0).length }].map((s, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '10px 18px' }}>
                                <div style={{ fontSize: '10px', opacity: 0.8, marginBottom: '2px' }}>{s.l}</div>
                                <div style={{ fontWeight: 800, fontSize: '18px' }}>{s.v}</div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Sessions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {ATT_DATA.map((rec, i) => {
                        const pct = Math.round(rec.present / rec.total * 100);
                        const color = pct === 100 ? '#10b981' : pct >= 85 ? '#f59e0b' : '#ef4444';
                        return (
                            <div key={i} style={{ background: 'white', border: `1.5px solid ${color}22`, borderRadius: '18px', padding: '0', overflow: 'hidden' }}>
                                <div style={{ padding: '14px 20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${color}12`, border: `1.5px solid ${color}25`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <div style={{ fontWeight: 900, fontSize: '16px', color, lineHeight: 1 }}>{rec.date.split(' ')[1]}</div>
                                        <div style={{ fontSize: '9px', color, fontWeight: 700 }}>{rec.date.split(' ')[0]}</div>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b', marginBottom: '2px' }}>{rec.subject} <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>· {rec.day} · {rec.room}</span></div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                                            <div style={{ flex: 1, maxWidth: '160px', height: '6px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                                                <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '99px' }} />
                                            </div>
                                            <span style={{ fontSize: '12px', fontWeight: 700, color }}>{rec.present}/{rec.total} present ({pct}%)</span>
                                        </div>
                                        {rec.absentees.length > 0 && (
                                            <div style={{ marginTop: '6px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: '10px', color: '#94a3b8' }}>Absent:</span>
                                                {rec.absentees.map((n, j) => <span key={j} style={{ fontSize: '10px', background: 'rgba(239,68,68,0.08)', color: '#ef4444', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>{n}</span>)}
                                            </div>
                                        )}
                                    </div>
                                    <button style={{ background: color, border: 'none', borderRadius: '10px', padding: '7px 14px', fontSize: '11px', fontWeight: 700, color: 'white', cursor: 'pointer', flexShrink: 0 }}>✏ Edit</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div style={{ marginTop: '18px', background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '18px', padding: '16px 20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px' }}>📋</span>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: '#1e293b' }}>Mark Today's Attendance</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Feb 21, 2026 · Friday · OS Lab — Lab 3</div>
                    </div>
                    <button style={{ background: '#10b981', border: 'none', borderRadius: '10px', padding: '8px 18px', fontSize: '12px', fontWeight: 800, color: 'white', cursor: 'pointer' }}>Mark Now →</button>
                </div>
            </div>
        );
    }

    // ─── GRADEBOOK ──────────────────────────────────────────────────────────
    if (activeTab === 'gradebook') {
        const GB_STUDENTS = [
            { name: 'Pooja Hegde', os: 95, cn: 88, avg: 91.5, grade: 'A+', rank: 1 },
            { name: 'Sana Khan', os: 92, cn: 94, avg: 93.0, grade: 'A+', rank: 1 },
            { name: 'Isha Reddy', os: 85, cn: 91, avg: 88.0, grade: 'A', rank: 3 },
            { name: 'Vicky Kaushal', os: 82, cn: 94, avg: 88.0, grade: 'A', rank: 3 },
            { name: 'Neha Gupta', os: 80, cn: 92, avg: 86.0, grade: 'A', rank: 5 },
            { name: 'Nisha Verma', os: 88, cn: 82, avg: 85.0, grade: 'A', rank: 6 },
            { name: 'Riya Jain', os: 84, cn: 85, avg: 84.5, grade: 'A', rank: 7 },
            { name: 'Simran Kaur', os: 83, cn: 85, avg: 84.0, grade: 'A', rank: 8 },
            { name: 'Deepika Padukone', os: 79, cn: 88, avg: 83.5, grade: 'B+', rank: 9 },
            { name: 'Saif Ali Khan', os: 78, cn: 85, avg: 81.5, grade: 'B+', rank: 10 },
        ];
        const gradeColor = { 'A+': '#10b981', A: '#6366f1', 'B+': '#f59e0b', B: '#94a3b8' };
        return (
            <div className="animate-fade-in">
                {/* Hero */}
                <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 60%, #8b5cf6 100%)', borderRadius: '24px', padding: '24px 32px', marginBottom: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '4px', textTransform: 'uppercase' }}>⭐ Gradebook · Semester 4</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Student Gradebook</div>
                    <div style={{ fontSize: '13px', opacity: 0.88 }}>40 students · 2 subjects · Mid-Term Scores</div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '14px', flexWrap: 'wrap' }}>
                        {[{ l: 'Class Avg', v: '82.4%' }, { l: 'A+ Students', v: '2' }, { l: 'Pass Rate', v: '96%' }, { l: 'Pending Grades', v: '0' }].map((s, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '10px 18px' }}>
                                <div style={{ fontSize: '10px', opacity: 0.8, marginBottom: '2px' }}>{s.l}</div>
                                <div style={{ fontWeight: 800, fontSize: '18px' }}>{s.v}</div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Table */}
                <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', overflow: 'hidden' }}>
                    <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b' }}>Top Performers · Mid-Term</div>
                        <button style={{ background: '#6366f1', border: 'none', borderRadius: '10px', padding: '7px 16px', fontSize: '12px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>+ Add Grades</button>
                    </div>
                    {GB_STUDENTS.map((s, i) => (
                        <div key={i} style={{ padding: '12px 20px', display: 'flex', gap: '16px', alignItems: 'center', borderBottom: i < GB_STUDENTS.length - 1 ? '1px solid #f8fafc' : 'none', background: i % 2 === 0 ? '#fafbff' : 'white' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: s.rank <= 3 ? 'linear-gradient(135deg, #f59e0b, #ef4444)' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 900, color: s.rank <= 3 ? 'white' : '#94a3b8', flexShrink: 0 }}>
                                {s.rank <= 3 ? ['🥇', '🥇', '🥉'][s.rank - 1] : `#${s.rank}`}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>{s.name}</div>
                                <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                                    <span style={{ fontSize: '11px', color: '#64748b' }}>OS: <strong style={{ color: '#6366f1' }}>{s.os}</strong></span>
                                    <span style={{ fontSize: '11px', color: '#64748b' }}>CN: <strong style={{ color: '#0ea5e9' }}>{s.cn}</strong></span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 900, fontSize: '16px', color: '#1e293b' }}>{s.avg}</div>
                                    <div style={{ width: '70px', height: '5px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden', marginTop: '3px' }}>
                                        <div style={{ width: `${s.avg}%`, height: '100%', background: gradeColor[s.grade] || '#94a3b8', borderRadius: '99px' }} />
                                    </div>
                                </div>
                                <span style={{ fontWeight: 800, fontSize: '13px', color: gradeColor[s.grade] || '#94a3b8', background: `${gradeColor[s.grade] || '#94a3b8'}15`, padding: '4px 12px', borderRadius: '20px', border: `1px solid ${gradeColor[s.grade] || '#94a3b8'}30` }}>{s.grade}</span>
                                <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '5px 12px', fontSize: '11px', fontWeight: 700, color: '#475569', cursor: 'pointer' }}>✏ Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ─── RESOURCE LIBRARY ───────────────────────────────────────────────────
    if (activeTab === 'resources') {
        const RESOURCES = [
            { title: 'OS Unit 1 — Process Management', subject: 'Operating Systems', type: 'PDF', size: '2.4 MB', date: 'Feb 10', downloads: 34, icon: '📄', color: '#ef4444' },
            { title: 'Scheduling Algorithms Slides', subject: 'Operating Systems', type: 'Slides', size: '5.1 MB', date: 'Feb 14', downloads: 28, icon: '📊', color: '#f59e0b' },
            { title: 'OS Lab Manual — Spring 2026', subject: 'Operating Systems', type: 'PDF', size: '3.2 MB', date: 'Jan 28', downloads: 40, icon: '📄', color: '#ef4444' },
            { title: 'TCP/IP Protocol Suite Slides', subject: 'Computer Networks', type: 'Slides', size: '4.7 MB', date: 'Feb 13', downloads: 22, icon: '📊', color: '#f59e0b' },
            { title: 'Subnetting Practice Sheet', subject: 'Computer Networks', type: 'PDF', size: '0.8 MB', date: 'Feb 15', downloads: 38, icon: '📄', color: '#ef4444' },
            { title: 'Wireshark Lab Exercise', subject: 'Computer Networks', type: 'Lab', size: '1.2 MB', date: 'Feb 12', downloads: 19, icon: '🔬', color: '#10b981' },
        ];
        return (
            <div className="animate-fade-in">
                {/* Hero */}
                <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 60%, #10b981 100%)', borderRadius: '24px', padding: '24px 32px', marginBottom: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '4px', textTransform: 'uppercase' }}>📚 Resource Library</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Course Resources</div>
                    <div style={{ fontSize: '13px', opacity: 0.88 }}>{RESOURCES.length} files uploaded · 181 total downloads</div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                        <button style={{ background: 'white', color: '#8b5cf6', border: 'none', borderRadius: '12px', padding: '8px 18px', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>+ Upload File</button>
                        <button style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '12px', padding: '8px 18px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>📁 Create Folder</button>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {RESOURCES.map((r, i) => (
                        <div key={i} style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '18px', padding: '16px 18px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                            <div style={{ width: '46px', height: '56px', borderRadius: '10px 3px 3px 10px', background: `linear-gradient(160deg, ${r.color}, ${r.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{r.icon}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 700, fontSize: '13px', color: '#1e293b', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</div>
                                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '6px' }}>{r.subject} · {r.size} · {r.date}</div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 700, color: r.color, background: `${r.color}10`, padding: '2px 8px', borderRadius: '6px' }}>{r.type}</span>
                                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>⬇ {r.downloads} downloads</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
                                <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '5px 10px', fontSize: '11px', fontWeight: 700, color: '#475569', cursor: 'pointer' }}>✏</button>
                                <button style={{ background: '#6366f1', border: 'none', borderRadius: '8px', padding: '5px 10px', fontSize: '11px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>⬇</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ─── PARENT MEETINGS ────────────────────────────────────────────────────
    if (activeTab === 'parents') {
        const MEETINGS = [
            { student: 'Dev Malhotra', parent: 'Mr. Ravi Malhotra', relation: 'Father', date: 'Feb 24', time: '11:00 AM', mode: 'In-Person', status: 'Scheduled', concern: 'Low attendance & falling grades', progress: 23, avatar: '👨' },
            { student: 'Rajiv Menon', parent: 'Mrs. Lata Menon', relation: 'Mother', date: 'Feb 25', time: '2:00 PM', mode: 'Video Call', status: 'Scheduled', concern: 'Performance in CN (20%)', progress: 20, avatar: '👩' },
            { student: 'Ranbir Kapoor', parent: 'Mr. Rishi Kapoor', relation: 'Father', date: 'Feb 21', time: '10:30 AM', mode: 'In-Person', status: 'Today', concern: 'Incomplete assignments', progress: 30, avatar: '👨' },
            { student: 'Vikram Singh', parent: 'Mrs. Sunita Singh', relation: 'Mother', date: 'Feb 18', time: '3:00 PM', mode: 'Phone', status: 'Done', concern: 'Improvement plan discussed', progress: 33, avatar: '👩' },
        ];
        const statusColor = { Scheduled: '#6366f1', Today: '#f59e0b', Done: '#10b981' };
        return (
            <div className="animate-fade-in">
                {/* Hero */}
                <div style={{ background: 'linear-gradient(135deg, #d946ef 0%, #8b5cf6 55%, #6366f1 100%)', borderRadius: '24px', padding: '24px 32px', marginBottom: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '4px', textTransform: 'uppercase' }}>👨‍👩‍👧 Parent Meetings · Feb 2026</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Parent–Teacher Meetings</div>
                    <div style={{ fontSize: '13px', opacity: 0.88 }}>4 meetings · 1 today · Follow up on at-risk students</div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
                        {[{ l: 'Scheduled', v: '2' }, { l: 'Today', v: '1' }, { l: 'Completed', v: '1' }].map((s, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '10px 18px' }}>
                                <div style={{ fontSize: '10px', opacity: 0.8, marginBottom: '2px' }}>{s.l}</div>
                                <div style={{ fontWeight: 800, fontSize: '18px' }}>{s.v}</div>
                            </div>
                        ))}
                        <button style={{ background: 'white', color: '#d946ef', border: 'none', borderRadius: '12px', padding: '10px 18px', fontWeight: 800, fontSize: '12px', cursor: 'pointer', marginLeft: 'auto' }}>+ Schedule Meeting</button>
                    </div>
                </div>
                {/* Meeting Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {MEETINGS.map((m, i) => (
                        <div key={i} style={{ background: 'white', border: `1.5px solid ${statusColor[m.status]}22`, borderRadius: '20px', padding: '18px 22px', display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${statusColor[m.status]}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{m.avatar}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                                    <div style={{ fontWeight: 800, fontSize: '15px', color: '#1e293b' }}>{m.student}</div>
                                    <span style={{ fontSize: '10px', fontWeight: 800, color: statusColor[m.status], background: `${statusColor[m.status]}12`, padding: '2px 10px', borderRadius: '20px', border: `1px solid ${statusColor[m.status]}25` }}>{m.status}</span>
                                </div>
                                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>Parent: <strong style={{ color: '#1e293b' }}>{m.parent}</strong> ({m.relation}) · {m.mode}</div>
                                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>📅 {m.date} · 🕐 {m.time}</div>
                                <div style={{ fontSize: '12px', padding: '8px 12px', borderRadius: '10px', background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e' }}>
                                    ⚠ <strong>Concern:</strong> {m.concern}
                                </div>
                                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>Progress:</span>
                                    <div style={{ flex: 1, maxWidth: '120px', height: '5px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{ width: `${m.progress}%`, height: '100%', background: m.progress < 40 ? '#ef4444' : '#f59e0b', borderRadius: '99px' }} />
                                    </div>
                                    <span style={{ fontSize: '11px', fontWeight: 700, color: m.progress < 40 ? '#ef4444' : '#f59e0b' }}>{m.progress}%</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                                <button style={{ background: statusColor[m.status], border: 'none', borderRadius: '10px', padding: '7px 14px', fontSize: '11px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>{m.status === 'Done' ? '📄 Notes' : '📞 Join'}</button>
                                <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '7px 14px', fontSize: '11px', fontWeight: 700, color: '#475569', cursor: 'pointer' }}>✏ Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ─── ANALYTICS ──────────────────────────────────────────────────────────
    if (activeTab === 'analytics') {
        const subjectStats = [
            { subj: 'Operating Systems', avg: 72, highest: 98, lowest: 23, pass: 18, fail: 2, color: '#6366f1', icon: '💻' },
            { subj: 'Computer Networks', avg: 68, highest: 94, lowest: 20, pass: 17, fail: 3, color: '#0ea5e9', icon: '🌐' },
        ];
        const topStudents = [...MOCK_STUDENTS].sort((a, b) => b.progress - a.progress).slice(0, 5);
        const lowStudents = [...MOCK_STUDENTS].sort((a, b) => a.progress - b.progress).slice(0, 5);
        const riskCounts = {
            high: MOCK_STUDENTS.filter(s => s.progress < 40).length,
            medium: MOCK_STUDENTS.filter(s => s.progress >= 40 && s.progress < 70).length,
            good: MOCK_STUDENTS.filter(s => s.progress >= 70).length,
        };

        return (
            <div className="animate-fade-in">
                {/* Hero */}
                <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 55%, #475569 100%)', borderRadius: '24px', padding: '24px 32px', marginBottom: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.7, marginBottom: '4px', textTransform: 'uppercase' }}>📊 Teaching Analytics · Semester 4</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Performance Dashboard</div>
                    <div style={{ fontSize: '13px', opacity: 0.75 }}>40 students · 2 subjects · Feb 2026</div>
                </div>

                {/* KPI Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '22px' }}>
                    {[
                        { l: 'Total Students', v: '40', icon: '👥', color: '#6366f1', sub: 'Sem 4 — CS' },
                        { l: 'Avg Class Score', v: '70%', icon: '📈', color: '#10b981', sub: '↑ 4% vs last sem' },
                        { l: 'Pass Rate', v: '87.5%', icon: '✅', color: '#0ea5e9', sub: '35 of 40 passing' },
                        { l: 'At-Risk Students', v: `${riskCounts.high}`, icon: '⚠️', color: '#ef4444', sub: 'Progress < 40%' },
                    ].map((s, i) => (
                        <div key={i} style={{ background: 'white', border: `1.5px solid ${s.color}18`, borderRadius: '18px', padding: '16px 18px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${s.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{s.icon}</div>
                            </div>
                            <div style={{ fontWeight: 900, fontSize: '26px', color: s.color, lineHeight: 1, marginBottom: '4px' }}>{s.v}</div>
                            <div style={{ fontWeight: 700, fontSize: '12px', color: '#1e293b', marginBottom: '2px' }}>{s.l}</div>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>{s.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Subject Performance */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '22px' }}>
                    {subjectStats.map((s, i) => (
                        <div key={i} style={{ background: 'white', border: `1.5px solid ${s.color}18`, borderRadius: '20px', overflow: 'hidden' }}>
                            <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${s.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{s.icon}</div>
                                <div style={{ fontWeight: 800, fontSize: '13px', color: '#1e293b' }}>{s.subj}</div>
                            </div>
                            <div style={{ padding: '14px 18px' }}>
                                {[{ l: 'Class Average', v: s.avg, max: 100 }, { l: 'Highest Score', v: s.highest, max: 100 }, { l: 'Lowest Score', v: s.lowest, max: 100 }].map((m, j) => (
                                    <div key={j} style={{ marginBottom: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>
                                            <span>{m.l}</span><span style={{ color: s.color, fontWeight: 800 }}>{m.v}%</span>
                                        </div>
                                        <div style={{ height: '7px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                                            <div style={{ width: `${m.v}%`, height: '100%', background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`, borderRadius: '99px' }} />
                                        </div>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                                    <div style={{ flex: 1, padding: '8px', background: 'rgba(16,185,129,0.07)', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(16,185,129,0.15)' }}>
                                        <div style={{ fontWeight: 900, fontSize: '16px', color: '#10b981' }}>{s.pass}</div>
                                        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>Passing</div>
                                    </div>
                                    <div style={{ flex: 1, padding: '8px', background: 'rgba(239,68,68,0.07)', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(239,68,68,0.15)' }}>
                                        <div style={{ fontWeight: 900, fontSize: '16px', color: '#ef4444' }}>{s.fail}</div>
                                        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>Failing</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Risk Distribution + Top/Bottom performers */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '18px' }}>
                    {/* Risk Distribution */}
                    <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', padding: '18px 20px' }}>
                        <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b', marginBottom: '16px' }}>🎯 Student Risk Distribution</div>
                        {[
                            { l: 'Low Risk (≥70%)', v: riskCounts.good, color: '#10b981', pct: Math.round(riskCounts.good / 40 * 100) },
                            { l: 'Medium Risk (40–69%)', v: riskCounts.medium, color: '#f59e0b', pct: Math.round(riskCounts.medium / 40 * 100) },
                            { l: 'High Risk (<40%)', v: riskCounts.high, color: '#ef4444', pct: Math.round(riskCounts.high / 40 * 100) },
                        ].map((r, i) => (
                            <div key={i} style={{ marginBottom: '14px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
                                    <span style={{ fontWeight: 600, color: '#475569' }}>{r.l}</span>
                                    <span style={{ fontWeight: 800, color: r.color }}>{r.v} students ({r.pct}%)</span>
                                </div>
                                <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                                    <div style={{ width: `${r.pct}%`, height: '100%', background: r.color, borderRadius: '99px' }} />
                                </div>
                            </div>
                        ))}
                        <div style={{ marginTop: '16px', padding: '10px 14px', background: '#fef2f2', borderRadius: '12px', border: '1px solid #fecaca' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', marginBottom: '2px' }}>⚠ Action Required</div>
                            <div style={{ fontSize: '11px', color: '#b91c1c' }}>{riskCounts.high} students at high risk — schedule parent meetings.</div>
                        </div>
                    </div>

                    {/* Top & Bottom Performers */}
                    <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', overflow: 'hidden' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100%' }}>
                            <div style={{ borderRight: '1px solid #f1f5f9' }}>
                                <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', background: 'rgba(16,185,129,0.04)' }}>
                                    <div style={{ fontWeight: 800, fontSize: '13px', color: '#10b981' }}>🏆 Top Performers</div>
                                </div>
                                {topStudents.map((s, i) => (
                                    <div key={i} style={{ padding: '9px 14px', borderBottom: '1px solid #f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, width: '16px' }}>#{i + 1}</span>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontWeight: 700, fontSize: '12px', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>
                                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>{s.course.split(' ')[0]}</div>
                                        </div>
                                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981' }}>{s.progress}%</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', background: 'rgba(239,68,68,0.04)' }}>
                                    <div style={{ fontWeight: 800, fontSize: '13px', color: '#ef4444' }}>⚠ Needs Support</div>
                                </div>
                                {lowStudents.map((s, i) => (
                                    <div key={i} style={{ padding: '9px 14px', borderBottom: '1px solid #f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontWeight: 700, fontSize: '12px', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>
                                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>{s.course.split(' ')[0]}</div>
                                        </div>
                                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#ef4444' }}>{s.progress}%</span>
                                        <button style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '3px 8px', fontSize: '9px', fontWeight: 700, color: '#ef4444', cursor: 'pointer' }}>Meet</button>
                                    </div>
                                ))}
                            </div>
                        </div>
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
