import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../landing_animations.css';
import '../../teacher-dashboard.css'; // Import the new premium styles
import MessagingPanel from '../../components/MessagingPanel';
import { timetableAPI, attendanceAPI } from '../../api/api';

const INITIAL_COURSES = [
    {
        id: 1, title: 'Operating Systems', code: 'CS-401', semester: 4, credits: 4,
        students: 20, rating: 4.8, revenue: '—', status: 'Published',
        icon: '💻', color: '#6366f1',
        description: 'Covers process management, memory management, file systems, and deadlock handling in modern operating systems.',
        syllabus: [
            { id: 1, unit: 'Unit 1', topic: 'Introduction to OS & Process Management', done: true },
            { id: 2, unit: 'Unit 2', topic: 'CPU Scheduling Algorithms', done: true },
            { id: 3, unit: 'Unit 3', topic: 'Process Synchronization & Semaphores', done: true },
            { id: 4, unit: 'Unit 4', topic: 'Deadlock Detection & Recovery', done: true },
            { id: 5, unit: 'Unit 5', topic: 'Memory Management & Virtual Memory', done: false },
            { id: 6, unit: 'Unit 6', topic: 'File Systems & I/O Management', done: false },
        ],
        announcements: [
            { id: 1, text: 'Mid-term exam scheduled for March 5th — Unit 1 to 4.', date: 'Feb 18' },
            { id: 2, text: 'Assignment 1 deadline extended to Feb 27.', date: 'Feb 20' },
        ],
    },
    {
        id: 2, title: 'Computer Networks', code: 'CS-402', semester: 4, credits: 4,
        students: 20, rating: 4.6, revenue: '—', status: 'Published',
        icon: '🌐', color: '#0ea5e9',
        description: 'Covers the TCP/IP stack, routing protocols, transport layer mechanisms, network security, and wireless networking.',
        syllabus: [
            { id: 1, unit: 'Unit 1', topic: 'Network Models & Physical Layer', done: true },
            { id: 2, unit: 'Unit 2', topic: 'Data Link Layer & MAC Protocols', done: true },
            { id: 3, unit: 'Unit 3', topic: 'Network Layer & IP Addressing', done: true },
            { id: 4, unit: 'Unit 4', topic: 'Transport Layer — TCP & UDP', done: false },
            { id: 5, unit: 'Unit 5', topic: 'Application Layer Protocols', done: false },
            { id: 6, unit: 'Unit 6', topic: 'Network Security Fundamentals', done: false },
        ],
        announcements: [
            { id: 1, text: 'Wireshark Lab session on Feb 25 — bring laptops.', date: 'Feb 17' },
        ],
    },
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

    // ── Backend API States ──────────────────────────────────────────────────
    const [backendSchedule, setBackendSchedule] = useState([]);

    // ── Add Session Modal State ─────────────────────────────────────────────
    const [showAddSession, setShowAddSession] = useState(false);
    const [sessionForm, setSessionForm] = useState({ dayOfWeek: 'Monday', timeSlot: '10:00 AM', subject: '', room: '', sessionType: 'Lecture' });
    const [isSubmittingSession, setIsSubmittingSession] = useState(false);

    const handleAddSessionSubmit = async () => {
        if (!sessionForm.subject || !sessionForm.room) return alert("Please fill subject and room");
        setIsSubmittingSession(true);
        try {
            await timetableAPI.addSession({ ...sessionForm, roleTarget: 'TEACHER' });
            // re-fetch schedule
            const res = await timetableAPI.getSchedule('TEACHER');
            setBackendSchedule(res.data);
            setShowAddSession(false);
            setSessionForm({ dayOfWeek: 'Monday', timeSlot: '10:00 AM', subject: '', room: '', sessionType: 'Lecture' });
            alert("Session added successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to add session");
        } finally {
            setIsSubmittingSession(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'schedule') {
            timetableAPI.getSchedule('TEACHER').then(res => setBackendSchedule(res.data)).catch(err => console.error("Failed to fetch schedule", err));
        }
    }, [activeTab]);

    // ── Course Management State ──────────────────────────────────────────────
    const [courses, setCourses] = useState(INITIAL_COURSES);
    const [courseView, setCourseView] = useState('list'); // 'list' | 'detail'
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null); // null = new course
    const [courseForm, setCourseForm] = useState({ title: '', code: '', semester: '', credits: '', description: '', status: 'Draft', icon: '📚', color: '#6366f1' });
    const [newTopic, setNewTopic] = useState('');
    const [announcementText, setAnnouncementText] = useState('');
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const openCreateModal = () => {
        setEditingCourse(null);
        setCourseForm({ title: '', code: '', semester: '', credits: '', description: '', status: 'Draft', icon: '📚', color: '#6366f1' });
        setShowCourseModal(true);
    };

    const openEditModal = (course) => {
        setEditingCourse(course);
        setCourseForm({ title: course.title, code: course.code, semester: course.semester, credits: course.credits, description: course.description, status: course.status, icon: course.icon, color: course.color });
        setShowCourseModal(true);
    };

    const saveCourse = () => {
        if (!courseForm.title.trim()) return;
        if (editingCourse) {
            setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...courseForm, semester: Number(courseForm.semester), credits: Number(courseForm.credits) } : c));
            if (selectedCourse?.id === editingCourse.id) setSelectedCourse(prev => ({ ...prev, ...courseForm, semester: Number(courseForm.semester), credits: Number(courseForm.credits) }));
        } else {
            const newCourse = { id: Date.now(), ...courseForm, semester: Number(courseForm.semester) || 1, credits: Number(courseForm.credits) || 3, students: 0, rating: 0, revenue: '—', syllabus: [], announcements: [] };
            setCourses(prev => [...prev, newCourse]);
        }
        setShowCourseModal(false);
    };

    const deleteCourse = (id) => {
        setCourses(prev => prev.filter(c => c.id !== id));
        if (selectedCourse?.id === id) { setCourseView('list'); setSelectedCourse(null); }
        setDeleteConfirmId(null);
    };

    const toggleSyllabusTopic = (courseId, topicId) => {
        const updater = prev => prev.map(c => c.id === courseId ? { ...c, syllabus: c.syllabus.map(t => t.id === topicId ? { ...t, done: !t.done } : t) } : c);
        setCourses(updater);
        setSelectedCourse(prev => ({ ...prev, syllabus: prev.syllabus.map(t => t.id === topicId ? { ...t, done: !t.done } : t) }));
    };

    const addSyllabusTopic = (courseId) => {
        if (!newTopic.trim()) return;
        const topic = { id: Date.now(), unit: `Unit ${(courses.find(c => c.id === courseId)?.syllabus.length || 0) + 1}`, topic: newTopic.trim(), done: false };
        const updater = prev => prev.map(c => c.id === courseId ? { ...c, syllabus: [...c.syllabus, topic] } : c);
        setCourses(updater);
        setSelectedCourse(prev => ({ ...prev, syllabus: [...prev.syllabus, topic] }));
        setNewTopic('');
    };

    const removeSyllabusTopic = (courseId, topicId) => {
        const updater = prev => prev.map(c => c.id === courseId ? { ...c, syllabus: c.syllabus.filter(t => t.id !== topicId) } : c);
        setCourses(updater);
        setSelectedCourse(prev => ({ ...prev, syllabus: prev.syllabus.filter(t => t.id !== topicId) }));
    };

    const postAnnouncement = (courseId) => {
        if (!announcementText.trim()) return;
        const ann = { id: Date.now(), text: announcementText.trim(), date: 'Today' };
        const updater = prev => prev.map(c => c.id === courseId ? { ...c, announcements: [ann, ...c.announcements] } : c);
        setCourses(updater);
        setSelectedCourse(prev => ({ ...prev, announcements: [ann, ...prev.announcements] }));
        setAnnouncementText('');
    };

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
                    <div className="card-header" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '20px' }}>📈</span> Progress Overview
                        </h3>
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
                        <div className="card-header" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '20px' }}>📋</span> Needs Grading
                            </h3>
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

    if (activeTab === 'courses') {

        // ── COURSE DETAIL VIEW ───────────────────────────────────────────────
        if (courseView === 'detail' && selectedCourse) {
            const c = selectedCourse;
            const donePct = c.syllabus.length ? Math.round(c.syllabus.filter(t => t.done).length / c.syllabus.length * 100) : 0;
            const courseStudents = MOCK_STUDENTS.filter(s => s.course === c.title);
            return (
                <div className="teacher-dashboard-container animate-fade-in">
                    {/* Back + Actions bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <button onClick={() => { setCourseView('list'); setSelectedCourse(null); }} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: '10px', padding: '8px 16px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back to Courses</button>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => openEditModal(courses.find(x => x.id === c.id))} style={{ background: '#6366f1', border: 'none', borderRadius: '10px', padding: '8px 18px', fontSize: '13px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>✏ Edit Course</button>
                            <button onClick={() => setDeleteConfirmId(c.id)} style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '8px 18px', fontSize: '13px', fontWeight: 700, color: '#ef4444', cursor: 'pointer' }}>🗑 Delete</button>
                        </div>
                    </div>

                    {/* Delete confirm */}
                    {deleteConfirmId === c.id && (
                        <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '16px', padding: '16px 22px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontWeight: 700, color: '#b91c1c' }}>⚠ Are you sure you want to delete "{c.title}"? This cannot be undone.</div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => setDeleteConfirmId(null)} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px 16px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                                <button onClick={() => deleteCourse(c.id)} style={{ background: '#ef4444', border: 'none', borderRadius: '8px', padding: '6px 16px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>Delete</button>
                            </div>
                        </div>
                    )}

                    {/* Hero */}
                    <div style={{ background: `linear-gradient(135deg, ${c.color} 0%, ${c.color}aa 100%)`, borderRadius: '24px', padding: '28px 36px', marginBottom: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '16px' }}>
                            <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', flexShrink: 0 }}>{c.icon}</div>
                            <div>
                                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, textTransform: 'uppercase', marginBottom: '4px' }}>{c.code} · Semester {c.semester} · {c.credits} Credits</div>
                                <div style={{ fontSize: '28px', fontWeight: 900, lineHeight: 1.2 }}>{c.title}</div>
                                <span style={{ display: 'inline-block', marginTop: '6px', background: 'rgba(255,255,255,0.25)', borderRadius: '20px', padding: '3px 14px', fontSize: '12px', fontWeight: 700 }}>{c.status}</span>
                            </div>
                        </div>
                        <div style={{ fontSize: '14px', opacity: 0.9, maxWidth: '600px', lineHeight: 1.5 }}>{c.description}</div>
                        <div style={{ display: 'flex', gap: '14px', marginTop: '18px', flexWrap: 'wrap' }}>
                            {[{ l: 'Students', v: c.students || courseStudents.length }, { l: 'Rating', v: c.rating || '—' }, { l: 'Syllabus Done', v: `${donePct}%` }].map((s, i) => (
                                <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '10px 18px' }}>
                                    <div style={{ fontSize: '10px', opacity: 0.8, marginBottom: '2px' }}>{s.l}</div>
                                    <div style={{ fontWeight: 900, fontSize: '18px' }}>{s.v}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
                        {/* LEFT: Syllabus */}
                        <div>
                            <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px' }}>
                                <div style={{ padding: '16px 22px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbff' }}>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '15px', color: '#1e293b' }}>📋 Course Syllabus</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{c.syllabus.filter(t => t.done).length}/{c.syllabus.length} topics covered</div>
                                    </div>
                                    <div style={{ height: '8px', width: '100px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{ width: `${donePct}%`, height: '100%', background: donePct === 100 ? '#10b981' : c.color, borderRadius: '99px' }} />
                                    </div>
                                </div>
                                <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {c.syllabus.map((t) => (
                                        <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '12px', background: t.done ? 'rgba(16,185,129,0.06)' : '#fafbff', border: `1px solid ${t.done ? 'rgba(16,185,129,0.2)' : '#f1f5f9'}`, transition: 'all 0.2s' }}>
                                            <button onClick={() => toggleSyllabusTopic(c.id, t.id)} style={{ width: '22px', height: '22px', borderRadius: '6px', border: `2px solid ${t.done ? '#10b981' : '#cbd5e1'}`, background: t.done ? '#10b981' : 'white', color: 'white', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800 }}>{t.done ? '✓' : ''}</button>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontWeight: t.done ? 500 : 700, fontSize: '13px', color: t.done ? '#64748b' : '#1e293b', textDecoration: t.done ? 'line-through' : 'none' }}>{t.topic}</div>
                                                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{t.unit}</div>
                                            </div>
                                            <button onClick={() => removeSyllabusTopic(c.id, t.id)} style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '3px 8px', fontSize: '11px', color: '#ef4444', cursor: 'pointer', flexShrink: 0 }}>✕</button>
                                        </div>
                                    ))}
                                </div>
                                {/* Add topic */}
                                <div style={{ padding: '14px 22px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '10px' }}>
                                    <input value={newTopic} onChange={e => setNewTopic(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSyllabusTopic(c.id)} placeholder="Add new topic..." style={{ flex: 1, padding: '9px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', background: '#fafbff' }} />
                                    <button onClick={() => addSyllabusTopic(c.id)} style={{ background: c.color, border: 'none', borderRadius: '10px', padding: '9px 18px', fontSize: '13px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>+ Add</button>
                                </div>
                            </div>

                            {/* Enrolled Students */}
                            <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', overflow: 'hidden' }}>
                                <div style={{ padding: '16px 22px', borderBottom: '1px solid #f1f5f9', background: '#fafbff' }}>
                                    <div style={{ fontWeight: 800, fontSize: '15px', color: '#1e293b' }}>👥 Enrolled Students ({courseStudents.length})</div>
                                </div>
                                <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
                                    {courseStudents.map((s, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 22px', borderBottom: '1px solid #f8fafc' }}>
                                            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `${c.color}18`, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', flexShrink: 0 }}>{s.name.split(' ').map(n => n[0]).join('')}</div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 600, fontSize: '13px', color: '#1e293b' }}>{s.name}</div>
                                                <div style={{ fontSize: '10px', color: '#94a3b8' }}>{s.lastActive} active</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <div style={{ width: '50px', height: '5px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}><div style={{ width: `${s.progress}%`, height: '100%', background: s.progress >= 70 ? '#10b981' : s.progress >= 40 ? '#f59e0b' : '#ef4444', borderRadius: '99px' }} /></div>
                                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569', minWidth: '32px' }}>{s.progress}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Announcements */}
                        <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', overflow: 'hidden', alignSelf: 'start' }}>
                            <div style={{ padding: '16px 22px', borderBottom: '1px solid #f1f5f9', background: '#fafbff' }}>
                                <div style={{ fontWeight: 800, fontSize: '15px', color: '#1e293b' }}>📣 Announcements</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Visible to all enrolled students</div>
                            </div>
                            <div style={{ padding: '16px 22px', borderBottom: '1px solid #f1f5f9' }}>
                                <textarea value={announcementText} onChange={e => setAnnouncementText(e.target.value)} placeholder="Write an announcement for your students..." rows={3} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px', resize: 'vertical', outline: 'none', background: '#fafbff', boxSizing: 'border-box' }} />
                                <button onClick={() => postAnnouncement(c.id)} style={{ background: c.color, border: 'none', borderRadius: '10px', padding: '9px 20px', fontSize: '13px', fontWeight: 700, color: 'white', cursor: 'pointer', marginTop: '10px', width: '100%' }}>📣 Post Announcement</button>
                            </div>
                            <div style={{ padding: '14px 22px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '360px', overflowY: 'auto' }}>
                                {c.announcements.length === 0 && <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', padding: '20px' }}>No announcements yet.</div>}
                                {c.announcements.map((a) => (
                                    <div key={a.id} style={{ padding: '12px 14px', borderRadius: '12px', background: `${c.color}08`, border: `1px solid ${c.color}20` }}>
                                        <div style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>{a.text}</div>
                                        <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '6px', fontWeight: 600 }}>📅 {a.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // ── COURSE LIST VIEW ─────────────────────────────────────────────────
        return (
            <div className="teacher-dashboard-container animate-fade-in">
                {/* Course Modal */}
                {showCourseModal && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '560px', boxShadow: '0 24px 80px rgba(0,0,0,0.18)' }}>
                            <div style={{ fontSize: '22px', fontWeight: 900, color: '#1e293b', marginBottom: '6px' }}>{editingCourse ? '✏ Edit Course' : '➕ New Course'}</div>
                            <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>Fill in the details below to {editingCourse ? 'update' : 'create'} the course.</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                {[{ label: 'Course Title *', key: 'title', span: 2 }, { label: 'Course Code', key: 'code' }, { label: 'Semester', key: 'semester', type: 'number' }, { label: 'Credits', key: 'credits', type: 'number' }, { label: 'Icon (Emoji)', key: 'icon' }].map(f => (
                                    <div key={f.key} style={{ gridColumn: f.span === 2 ? 'span 2' : 'auto' }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>{f.label}</label>
                                        <input type={f.type || 'text'} value={courseForm[f.key]} onChange={e => setCourseForm(p => ({ ...p, [f.key]: e.target.value }))} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box', background: '#fafbff' }} />
                                    </div>
                                ))}
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Status</label>
                                    <select value={courseForm.status} onChange={e => setCourseForm(p => ({ ...p, status: e.target.value }))} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '13px', outline: 'none', background: '#fafbff' }}>
                                        {['Draft', 'Published', 'Archived'].map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Description</label>
                                    <textarea value={courseForm.description} onChange={e => setCourseForm(p => ({ ...p, description: e.target.value }))} rows={3} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '13px', outline: 'none', resize: 'vertical', background: '#fafbff', boxSizing: 'border-box' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
                                <button onClick={() => setShowCourseModal(false)} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 22px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                                <button onClick={saveCourse} style={{ background: '#6366f1', border: 'none', borderRadius: '10px', padding: '10px 22px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>{editingCourse ? 'Save Changes' : 'Create Course'}</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="topbar" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <div className="topbar-title">My Courses</div>
                        <div className="topbar-subtitle">Manage your educational content · {courses.length} course{courses.length !== 1 ? 's' : ''}</div>
                    </div>
                    <button className="btn btn-primary btn-glow" onClick={openCreateModal} style={{ padding: '10px 20px' }}>+ New Course</button>
                </div>

                {courses.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '20px', border: '2px dashed #e2e8f0' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>No courses yet</div>
                        <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '20px' }}>Create your first course to get started.</div>
                        <button onClick={openCreateModal} style={{ background: '#6366f1', border: 'none', borderRadius: '12px', padding: '10px 24px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>+ Create First Course</button>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                    {courses.map((c, i) => (
                        <div key={c.id} className={`card glass-panel-enhanced hover-lift-3d animate-fade-in delay-${(i + 1) * 100}`} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>{c.icon}</div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                                    <span className={`badge ${c.status === 'Published' ? 'badge-active' : c.status === 'Archived' ? 'badge-inactive' : 'badge-pending'}`}>{c.status}</span>
                                    {c.code && <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>{c.code}</span>}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text-primary)', marginBottom: '6px', lineHeight: '1.3' }}>{c.title}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.description || `Semester ${c.semester || '—'} · ${c.credits || '—'} Credits`}</div>
                            </div>
                            {c.syllabus && c.syllabus.length > 0 && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginBottom: '5px' }}>
                                        <span>Syllabus Progress</span>
                                        <span style={{ fontWeight: 700, color: c.color }}>{Math.round(c.syllabus.filter(t => t.done).length / c.syllabus.length * 100)}%</span>
                                    </div>
                                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{ width: `${Math.round(c.syllabus.filter(t => t.done).length / c.syllabus.length * 100)}%`, height: '100%', background: c.color, borderRadius: '99px' }} />
                                    </div>
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                {[{ l: 'Students', v: c.students }, { l: 'Rating', v: c.rating || '—' }, { l: 'Credits', v: c.credits || '—' }].map((s, j) => (
                                    <div key={j} style={{ textAlign: 'center', flex: 1 }}>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{s.v}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{s.l}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                                <button onClick={() => { setSelectedCourse(courses.find(x => x.id === c.id)); setCourseView('detail'); }} className="btn btn-secondary" style={{ flex: 1 }}>Manage Course</button>
                                <button onClick={() => openEditModal(c)} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer', fontSize: '14px' }} title="Edit">✏</button>
                                <button onClick={() => setDeleteConfirmId(c.id)} style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer', fontSize: '14px' }} title="Delete">🗑</button>
                            </div>
                            {deleteConfirmId === c.id && (
                                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '12px 14px' }}>
                                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#b91c1c', marginBottom: '8px' }}>Delete "{c.title}"?</div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button onClick={() => setDeleteConfirmId(null)} style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                                        <button onClick={() => deleteCourse(c.id)} style={{ flex: 1, background: '#ef4444', border: 'none', borderRadius: '8px', padding: '6px', fontSize: '12px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>Delete</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

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
            { day: 'Monday', slots: [{ time: '09:00 AM', subj: 'OS Lab', room: 'Lab 3', type: 'Lab' }, { time: '11:00 AM', subj: 'Computer Networks', room: 'Hall A', type: 'Lecture' }, { time: '02:00 PM', subj: 'OS Tutorial', room: 'Room 104', type: 'Tutorial' }] },
            { day: 'Tuesday', slots: [{ time: '10:00 AM', subj: 'Computer Networks', room: 'LH 2', type: 'Lecture' }, { time: '12:00 PM', subj: 'Faculty Meeting', room: 'Conf Rm', type: 'Meeting' }, { time: '03:00 PM', subj: 'Office Hours', room: 'Room 201', type: 'Office' }] },
            { day: 'Wednesday', slots: [{ time: '09:00 AM', subj: 'Operating Systems', room: 'LH 1', type: 'Lecture' }, { time: '11:00 AM', subj: 'CN Lab', room: 'Lab 5', type: 'Lab' }, { time: '02:00 PM', subj: 'Research Work', room: 'R&D Block', type: 'Research' }] },
            { day: 'Thursday', slots: [{ time: '10:00 AM', subj: 'Operating Systems', room: 'Room 304', type: 'Lecture' }, { time: '12:00 PM', subj: 'Computer Networks', room: 'LH 2', type: 'Lecture' }, { time: '03:00 PM', subj: 'Student Mentoring', room: 'Room 201', type: 'Mentoring' }] },
            { day: 'Friday', slots: [{ time: '09:00 AM', subj: 'OS Lab', room: 'Lab 3', type: 'Lab' }, { time: '11:00 AM', subj: 'Computer Networks', room: 'Hall B', type: 'Lecture' }, { time: '01:00 PM', subj: 'Dept Seminar', room: 'Audi', type: 'Meeting' }] },
        ];
        const typeColor = { Lecture: '#6366f1', Lab: '#10b981', Tutorial: '#f59e0b', Meeting: '#ef4444', Office: '#0ea5e9', Research: '#8b5cf6', Mentoring: '#d946ef' };

        const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
        const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const currentSlotTime = '11:00 AM'; // Mock

        // Use backend data if available, else fallback to MOCK
        const rawSchedule = backendSchedule.length > 0 ? backendSchedule : [];
        const combinedSlots = rawSchedule.map(s => ({ time: s.timeSlot, subj: s.subject, room: s.room, type: s.sessionType, day: s.dayOfWeek }));

        const todaysClasses = backendSchedule.length > 0
            ? combinedSlots.filter(s => s.day === todayStr)
            : (SCHEDULE.find(d => d.day === todayStr) || SCHEDULE[0]).slots;

        const getTimetableCell = (day, time) => {
            if (backendSchedule.length > 0) {
                return combinedSlots.find(s => s.day === day && s.time === time);
            }
            const d = SCHEDULE.find(x => x.day === day);
            return d ? d.slots.find(s => s.time === time) : null;
        };

        return (
            <div className="animate-fade-in" style={{ padding: '0' }}>
                {/* Hero */}
                <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 55%, #d946ef 100%)', borderRadius: '24px', padding: '24px 32px', marginBottom: '24px', color: 'white', display: 'flex', gap: '24px', flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                    <div style={{ flex: '1 1 300px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '4px', textTransform: 'uppercase' }}>📅 {todayStr}'s Schedule</div>
                        <div style={{ fontSize: '24px', fontWeight: 800, marginBottom: '14px' }}>My Timetable</div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}>
                                <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '2px' }}>Total Sessions</div>
                                <div style={{ fontSize: '18px', fontWeight: 800 }}>{todaysClasses.length}</div>
                            </div>
                            <div style={{ background: 'rgba(16,185,129,0.15)', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.3)', color: '#a7f3d0' }}>
                                <div style={{ fontSize: '10px', opacity: 0.8, marginBottom: '2px' }}>Next Session</div>
                                <div style={{ fontSize: '14px', fontWeight: 800, whiteSpace: 'nowrap' }}>{todaysClasses[0]?.time || 'None'}</div>
                            </div>
                        </div>
                    </div>
                    {/* Today's Timeline mini-widget */}
                    <div style={{ flex: '2 1 400px', display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }} className="hide-scroll">
                        {todaysClasses.map((c, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '16px', padding: '12px 16px', minWidth: '150px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 700 }}>🕐 {c.time}</span>
                                    <span style={{ fontSize: '9px', fontWeight: 700, background: 'rgba(255,255,255,0.15)', padding: '2px 6px', borderRadius: '4px' }}>{c.type}</span>
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.subj}</div>
                                <div style={{ fontSize: '11px', color: '#cbd5e1' }}>📍 {c.room}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filters / Legend */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', background: 'white', padding: '12px 20px', borderRadius: '16px', border: '1.5px solid #e2e8f0', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {Object.entries(typeColor).map(([t, c]) => (
                            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#475569' }}>
                                <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: c }}></span> {t}
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => setShowAddSession(true)} style={{ background: '#6366f1', border: 'none', borderRadius: '8px', padding: '6px 14px', fontSize: '11px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>+ Add Session</button>
                    </div>
                </div>

                {/* Timetable Grid */}
                <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '24px', overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: `80px repeat(${TIME_SLOTS.length}, 1fr)` }}>
                        {/* Header Row */}
                        <div style={{ background: '#f8fafc', padding: '14px', borderBottom: '1.5px solid #e2e8f0', borderRight: '1.5px solid #e2e8f0', fontWeight: 800, fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Day</div>
                        {TIME_SLOTS.map(time => (
                            <div key={time} style={{ background: '#f8fafc', padding: '14px', borderBottom: '1.5px solid #e2e8f0', borderRight: '1px solid #f1f5f9', fontWeight: 800, fontSize: '11px', color: '#64748b', textAlign: 'center' }}>
                                {time}
                            </div>
                        ))}

                        {/* Rows */}
                        {DAYS.map((day) => {
                            const isToday = day === todayStr;
                            return (
                                <>
                                    <div key={day} style={{ background: isToday ? 'rgba(99,102,241,0.05)' : 'white', padding: '0', borderBottom: '1px solid #f1f5f9', borderRight: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '4px', position: 'relative' }}>
                                        {isToday && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#6366f1' }} />}
                                        <span style={{ fontWeight: 800, fontSize: '13px', color: isToday ? '#6366f1' : '#1e293b' }}>{day.substring(0, 3)}</span>
                                        {isToday && <span style={{ fontSize: '9px', fontWeight: 800, background: '#6366f1', color: 'white', padding: '2px 6px', borderRadius: '10px' }}>TODAY</span>}
                                    </div>
                                    {TIME_SLOTS.map(time => {
                                        const subject = getTimetableCell(day, time);
                                        const isCurrent = isToday && time === currentSlotTime;

                                        if (subject) {
                                            const sColor = typeColor[subject.type] || '#94a3b8';
                                            return (
                                                <div key={`${day}-${time}`} style={{ padding: '8px', borderBottom: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9', background: isCurrent ? 'rgba(99,102,241,0.08)' : isToday ? 'rgba(99,102,241,0.02)' : 'white', position: 'relative' }}>
                                                    {isCurrent && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#6366f1' }} />}
                                                    <div style={{ height: '100%', background: `${sColor}12`, border: `1px solid ${sColor}30`, borderRadius: '10px', padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'transform 0.2s', cursor: 'pointer', textAlign: 'left' }} className="hover-lift">
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                                                            <span style={{ fontSize: '8px', fontWeight: 800, color: sColor, background: `${sColor}20`, padding: '2px 4px', borderRadius: '4px', textTransform: 'uppercase' }}>{subject.type}</span>
                                                        </div>
                                                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#1e293b', lineHeight: 1.2, marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{subject.subj}</div>
                                                        <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, marginTop: 'auto' }}>📍 {subject.room}</div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return (
                                            <div key={`${day}-${time}`} className="hover-lift" style={{ padding: '8px', borderBottom: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9', background: isToday ? 'rgba(99,102,241,0.02)' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                <span style={{ color: '#e2e8f0', fontSize: '20px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#cbd5e1'} onMouseLeave={e => e.target.style.color = '#e2e8f0'}>+</span>
                                            </div>
                                        );
                                    })}
                                </>
                            );
                        })}
                    </div>
                </div>

                {/* Add Session Modal */}
                {showAddSession && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, animation: 'fadeIn 0.2s ease-out' }}>
                        <div style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '440px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden', animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                            <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                                <div>
                                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b' }}>Add New Session</div>
                                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Schedule a class for your timetable</div>
                                </div>
                                <button onClick={() => setShowAddSession(false)} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}>✕</button>
                            </div>
                            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Day of Week</label>
                                        <select value={sessionForm.dayOfWeek} onChange={e => setSessionForm(p => ({ ...p, dayOfWeek: e.target.value }))} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc', color: '#1e293b', outline: 'none' }}>
                                            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Time Slot</label>
                                        <select value={sessionForm.timeSlot} onChange={e => setSessionForm(p => ({ ...p, timeSlot: e.target.value }))} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc', color: '#1e293b', outline: 'none' }}>
                                            {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Subject</label>
                                    <input placeholder="e.g. Operating Systems" value={sessionForm.subject} onChange={e => setSessionForm(p => ({ ...p, subject: e.target.value }))} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc', color: '#1e293b', outline: 'none' }} />
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Room</label>
                                        <input placeholder="e.g. Room 304" value={sessionForm.room} onChange={e => setSessionForm(p => ({ ...p, room: e.target.value }))} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc', color: '#1e293b', outline: 'none' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Type</label>
                                        <select value={sessionForm.sessionType} onChange={e => setSessionForm(p => ({ ...p, sessionType: e.target.value }))} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc', color: '#1e293b', outline: 'none' }}>
                                            <option value="Lecture">Lecture</option>
                                            <option value="Lab">Lab</option>
                                            <option value="Tutorial">Tutorial</option>
                                            <option value="Meeting">Meeting</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '20px 24px', background: '#f8fafc', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                <button onClick={() => setShowAddSession(false)} style={{ padding: '10px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', fontSize: '14px' }}>Cancel</button>
                                <button onClick={handleAddSessionSubmit} disabled={isSubmittingSession} style={{ padding: '10px 24px', borderRadius: '12px', border: 'none', background: '#6366f1', color: 'white', fontWeight: 700, cursor: isSubmittingSession ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.25)', transition: 'all 0.2s', fontSize: '14px', opacity: isSubmittingSession ? 0.7 : 1 }}>{isSubmittingSession ? 'Saving...' : 'Save Session'}</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // ─── ATTENDANCE ─────────────────────────────────────────────────────────
    const [attendanceList, setAttendanceList] = useState([
        { id: '2024CS001', name: 'Aarav Sharma', status: 'Present' },
        { id: '2024CS002', name: 'Rohan Desai', status: 'Absent' },
        { id: '2024CS003', name: 'Sneha Menon', status: 'Present' },
        { id: '2024CS004', name: 'Karan Mehra', status: 'Late' },
        { id: '2024CS005', name: 'Priya Sharma', status: 'Present' }
    ]);

    const [isSubmittingAtt, setIsSubmittingAtt] = useState(false);

    const handleAttendanceChange = (studentId, newStatus) => {
        setAttendanceList(prev => prev.map(s => s.id === studentId ? { ...s, status: newStatus } : s));
    };

    const submitAttendance = async () => {
        setIsSubmittingAtt(true);
        try {
            // Usually we'd iterate over students and send POST to attendanceAPI
            // For mock demo without disrupting database too heavily, just simulating delay
            await new Promise(r => setTimeout(r, 600));
            alert("Attendance successfully recorded!");
        } catch (error) {
            console.error("Failed to submit attendance", error);
        } finally {
            setIsSubmittingAtt(false);
        }
    };

    if (activeTab === 'attendance') {
        const ATT_DATA = [
            { date: 'Feb 20', day: 'Thu', subject: 'Operating Systems', room: 'Room 304', present: 18, absent: 2, total: 20, absentees: ['Karan Mehra', 'Rahul Verma'] },
            { date: 'Feb 19', day: 'Wed', subject: 'Computer Networks', room: 'LH 2', present: 19, absent: 1, total: 20, absentees: ['Rohan Desai'] },
            { date: 'Feb 18', day: 'Tue', subject: 'Operating Systems', room: 'LH 1', present: 20, absent: 0, total: 20, absentees: [] },
            { date: 'Feb 17', day: 'Mon', subject: 'Computer Networks', room: 'Hall A', present: 17, absent: 3, total: 20, absentees: ['Sneha Menon', 'Priya Sharma', 'Ananya Singh'] },
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
                </div>

                {/* Mark Attendance Panel */}
                <div style={{ background: 'white', borderRadius: '20px', padding: '24px', marginBottom: '24px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '16px' }}>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '16px', color: '#1e293b' }}>Mark Live Attendance</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Operating Systems · Room 304 · 10:00 AM</div>
                        </div>
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                            Today, {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {attendanceList.map((s, i) => {
                            const bg = s.status === 'Present' ? '#10b981' : s.status === 'Late' ? '#f59e0b' : '#ef4444';
                            return (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                        <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', color: '#64748b' }}>
                                            {s.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>{s.name}</div>
                                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{s.id}</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {['Present', 'Late', 'Absent'].map(st => {
                                            const isActive = s.status === st;
                                            const activeColor = st === 'Present' ? '#10b981' : st === 'Late' ? '#f59e0b' : '#ef4444';
                                            return (
                                                <button key={st}
                                                    onClick={() => handleAttendanceChange(s.id, st)}
                                                    style={{
                                                        background: isActive ? activeColor : 'white',
                                                        color: isActive ? 'white' : '#64748b',
                                                        border: `1.5px solid ${isActive ? activeColor : '#e2e8f0'}`,
                                                        borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
                                                    }}>
                                                    {st}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{attendanceList.length} students total · <span style={{ color: '#10b981' }}>{attendanceList.filter(s => s.status === 'Present').length} Present</span></div>
                        <button onClick={submitAttendance} disabled={isSubmittingAtt} style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 24px', fontSize: '14px', fontWeight: 700, cursor: isSubmittingAtt ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.2)', opacity: isSubmittingAtt ? 0.7 : 1 }}>
                            {isSubmittingAtt ? 'Submitting...' : 'Submit Attendance'}
                        </button>
                    </div>
                </div>

                <div style={{ fontWeight: 800, fontSize: '16px', color: '#1e293b', marginBottom: '16px' }}>Attendance History</div>

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
                                    <button onClick={() => alert("Edit Attendance coming soon.")} style={{ background: color, border: 'none', borderRadius: '10px', padding: '7px 14px', fontSize: '11px', fontWeight: 700, color: 'white', cursor: 'pointer', flexShrink: 0 }}>✏ Edit</button>
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
                    <button onClick={() => alert("Mark Now panel coming soon!")} style={{ background: '#10b981', border: 'none', borderRadius: '10px', padding: '8px 18px', fontSize: '12px', fontWeight: 800, color: 'white', cursor: 'pointer' }}>Mark Now →</button>
                </div>
            </div>
        );
    }

    // ─── GRADEBOOK ──────────────────────────────────────────────────────────
    if (activeTab === 'gradebook') {
        const GB_STUDENTS = [
            { name: 'Karan Mehra', os: 95, cn: 88, avg: 91.5, grade: 'A+', rank: 1 },
            { name: 'Priya Sharma', os: 92, cn: 94, avg: 93.0, grade: 'A+', rank: 1 },
            { name: 'Rahul Verma', os: 85, cn: 91, avg: 88.0, grade: 'A', rank: 3 },
            { name: 'Ananya Singh', os: 82, cn: 94, avg: 88.0, grade: 'A', rank: 3 },
            { name: 'Rohan Desai', os: 80, cn: 92, avg: 86.0, grade: 'A', rank: 5 },
            { name: 'Sneha Menon', os: 88, cn: 82, avg: 85.0, grade: 'A', rank: 6 },
            { name: 'Aditya Joshi', os: 84, cn: 85, avg: 84.5, grade: 'A', rank: 7 },
            { name: 'Kavita Nair', os: 83, cn: 85, avg: 84.0, grade: 'A', rank: 8 },
            { name: 'Vikram Chawla', os: 79, cn: 88, avg: 83.5, grade: 'B+', rank: 9 },
            { name: 'Megha Patil', os: 78, cn: 85, avg: 81.5, grade: 'B+', rank: 10 },
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
                        <button onClick={() => alert("Add Grades coming soon!")} style={{ background: '#6366f1', border: 'none', borderRadius: '10px', padding: '7px 16px', fontSize: '12px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>+ Add Grades</button>
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
                                <button onClick={() => alert(`Edit grades for ${s.name} coming soon!`)} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '5px 12px', fontSize: '11px', fontWeight: 700, color: '#475569', cursor: 'pointer' }}>✏ Edit</button>
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
                        <button onClick={() => alert("Upload File coming soon!")} style={{ background: 'white', color: '#8b5cf6', border: 'none', borderRadius: '12px', padding: '8px 18px', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>+ Upload File</button>
                        <button onClick={() => alert("Create Folder coming soon!")} style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '12px', padding: '8px 18px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>📁 Create Folder</button>
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
                                <button onClick={() => alert(`Edit Resource ${r.title} coming soon!`)} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '5px 10px', fontSize: '11px', fontWeight: 700, color: '#475569', cursor: 'pointer' }}>✏</button>
                                <button onClick={() => alert(`Downloading ${r.title}... (Mock)`)} style={{ background: '#6366f1', border: 'none', borderRadius: '8px', padding: '5px 10px', fontSize: '11px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>⬇</button>
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
            { student: 'Karan Mehra', parent: 'Mr. Ravi Mehra', relation: 'Father', date: 'Feb 24', time: '11:00 AM', mode: 'In-Person', status: 'Scheduled', concern: 'Low attendance & falling grades', progress: 23, avatar: '👨' },
            { student: 'Sneha Menon', parent: 'Mrs. Lata Menon', relation: 'Mother', date: 'Feb 25', time: '2:00 PM', mode: 'Video Call', status: 'Scheduled', concern: 'Performance in CN (20%)', progress: 20, avatar: '👩' },
            { student: 'Rohan Desai', parent: 'Mr. Prakash Desai', relation: 'Father', date: 'Feb 21', time: '10:30 AM', mode: 'In-Person', status: 'Today', concern: 'Incomplete assignments', progress: 30, avatar: '👨' },
            { student: 'Vikram Chawla', parent: 'Mrs. Sunita Chawla', relation: 'Mother', date: 'Feb 18', time: '3:00 PM', mode: 'Phone', status: 'Done', concern: 'Improvement plan discussed', progress: 33, avatar: '👩' },
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
                        <button onClick={() => alert("Schedule Meeting coming soon!")} style={{ background: 'white', color: '#d946ef', border: 'none', borderRadius: '12px', padding: '10px 18px', fontWeight: 800, fontSize: '12px', cursor: 'pointer', marginLeft: 'auto' }}>+ Schedule Meeting</button>
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
                                <button onClick={() => m.status === 'Done' ? alert(`View notes for ${m.student}`) : alert(`Joining meeting with ${m.parent}`)} style={{ background: statusColor[m.status], border: 'none', borderRadius: '10px', padding: '7px 14px', fontSize: '11px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>{m.status === 'Done' ? '📄 Notes' : '📞 Join'}</button>
                                <button onClick={() => alert(`Edit meeting for ${m.student} coming soon!`)} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '7px 14px', fontSize: '11px', fontWeight: 700, color: '#475569', cursor: 'pointer' }}>✏ Edit</button>
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

    if (activeTab === 'messages') return <MessagingPanel senderRole="TEACHER" />;

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
