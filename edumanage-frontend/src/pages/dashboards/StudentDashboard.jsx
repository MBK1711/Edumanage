import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../landing_animations.css';
import '../../student-dashboard.css';

const MOCK_SUBJECTS = [
    {
        id: 1, title: 'Operating Systems', code: 'CS-301', faculty: 'Dr. R. Sharma', credits: 4, status: 'In Progress', icon: '💻',
        syllabus: [
            { unit: 'Unit I', topic: 'Introduction to OS', topics: ['OS Structure', 'System Calls', 'OS Services', 'Types of OS'] },
            { unit: 'Unit II', topic: 'Process Management', topics: ['Process States', 'PCB', 'Scheduling Algorithms', 'Context Switching'] },
            { unit: 'Unit III', topic: 'Memory Management', topics: ['Paging', 'Segmentation', 'Virtual Memory', 'Page Replacement'] },
            { unit: 'Unit IV', topic: 'File Systems', topics: ['File Concepts', 'Directory Structure', 'Disk Scheduling', 'RAID'] },
            { unit: 'Unit V', topic: 'Deadlocks & Synchronization', topics: ['Deadlock Detection', 'Banker\'s Algorithm', 'Mutex', 'Semaphores'] },
        ],
        materials: [
            { name: 'OS Unit 1 - Introduction.pdf', type: 'PDF', size: '2.4 MB', date: 'Feb 10' },
            { name: 'Process Scheduling Slides.pptx', type: 'Slides', size: '5.1 MB', date: 'Feb 14' },
            { name: 'Memory Management Notes.pdf', type: 'PDF', size: '1.8 MB', date: 'Feb 17' },
            { name: 'OS Lab Manual.pdf', type: 'Lab', size: '3.2 MB', date: 'Jan 28' },
            { name: 'Lecture 8 - Deadlocks.mp4', type: 'Video', size: '210 MB', date: 'Feb 18' },
        ]
    },
    {
        id: 2, title: 'Computer Networks', code: 'CS-302', faculty: 'Prof. A. Gupta', credits: 4, status: 'In Progress', icon: '🌐',
        syllabus: [
            { unit: 'Unit I', topic: 'Network Fundamentals', topics: ['OSI Model', 'TCP/IP Stack', 'Network Topologies', 'Transmission Media'] },
            { unit: 'Unit II', topic: 'Data Link Layer', topics: ['Framing', 'Error Detection', 'MAC Protocols', 'Ethernet'] },
            { unit: 'Unit III', topic: 'Network Layer', topics: ['IP Addressing', 'Subnetting', 'Routing Protocols', 'ICMP'] },
            { unit: 'Unit IV', topic: 'Transport Layer', topics: ['TCP vs UDP', 'Flow Control', 'Congestion Control', 'Socket Programming'] },
            { unit: 'Unit V', topic: 'Application Layer', topics: ['HTTP/HTTPS', 'DNS', 'FTP', 'SMTP', 'Web Security'] },
        ],
        materials: [
            { name: 'CN Unit 1 - OSI Model.pdf', type: 'PDF', size: '1.9 MB', date: 'Feb 08' },
            { name: 'TCP-IP Protocol Suite.pptx', type: 'Slides', size: '4.7 MB', date: 'Feb 13' },
            { name: 'Subnetting Practice Sheet.pdf', type: 'PDF', size: '0.8 MB', date: 'Feb 15' },
            { name: 'Wireshark Lab Exercise.pdf', type: 'Lab', size: '1.2 MB', date: 'Feb 12' },
        ]
    },
    {
        id: 3, title: 'Database Mgmt Systems', code: 'CS-303', faculty: 'Ms. P. Singh', credits: 4, status: 'In Progress', icon: '🗄️',
        syllabus: [
            { unit: 'Unit I', topic: 'Database Concepts', topics: ['DBMS Architecture', 'Data Models', 'ER Diagrams', 'Schema Design'] },
            { unit: 'Unit II', topic: 'Relational Model', topics: ['Relational Algebra', 'SQL Basics', 'DDL & DML', 'Joins'] },
            { unit: 'Unit III', topic: 'Normalization', topics: ['1NF, 2NF, 3NF', 'BCNF', 'Functional Dependencies', 'Decomposition'] },
            { unit: 'Unit IV', topic: 'Transactions', topics: ['ACID Properties', 'Concurrency Control', 'Locking', 'Recovery'] },
            { unit: 'Unit V', topic: 'Advanced Topics', topics: ['Indexing & Hashing', 'Query Optimization', 'NoSQL Basics', 'MongoDB'] },
        ],
        materials: [
            { name: 'DBMS Unit 1 - ER Diagrams.pdf', type: 'PDF', size: '2.1 MB', date: 'Feb 05' },
            { name: 'SQL Practice Questions.pdf', type: 'PDF', size: '1.4 MB', date: 'Feb 11' },
            { name: 'Normalization Slides.pptx', type: 'Slides', size: '3.9 MB', date: 'Feb 16' },
            { name: 'DBMS Lab - MySQL Exercises.pdf', type: 'Lab', size: '2.0 MB', date: 'Feb 10' },
            { name: 'Transaction Management Notes.pdf', type: 'PDF', size: '1.6 MB', date: 'Feb 18' },
        ]
    },
    {
        id: 4, title: 'Software Engineering', code: 'CS-304', faculty: 'Dr. K. Mehta', credits: 3, status: 'In Progress', icon: '⚙️',
        syllabus: [
            { unit: 'Unit I', topic: 'SE Introduction', topics: ['SDLC Models', 'Agile vs Waterfall', 'Project Planning', 'Feasibility'] },
            { unit: 'Unit II', topic: 'Requirements', topics: ['SRS Document', 'Use Cases', 'Requirement Elicitation', 'Validation'] },
            { unit: 'Unit III', topic: 'Design', topics: ['HLD & LLD', 'Design Patterns', 'UML Diagrams', 'Modular Design'] },
            { unit: 'Unit IV', topic: 'Testing', topics: ['Unit Testing', 'Integration Testing', 'Black Box & White Box', 'Test Cases'] },
            { unit: 'Unit V', topic: 'Project Management', topics: ['Risk Management', 'Cost Estimation', 'COCOMO', 'SCM & Version Control'] },
        ],
        materials: [
            { name: 'SE Unit 1 - SDLC.pdf', type: 'PDF', size: '1.7 MB', date: 'Feb 06' },
            { name: 'Agile & Scrum Slides.pptx', type: 'Slides', size: '4.2 MB', date: 'Feb 12' },
            { name: 'UML Diagrams Reference.pdf', type: 'PDF', size: '2.3 MB', date: 'Feb 14' },
            { name: 'Testing Techniques Notes.pdf', type: 'PDF', size: '1.9 MB', date: 'Feb 17' },
        ]
    },
    {
        id: 5, title: 'Theory of Computation', code: 'CS-305', faculty: 'Prof. V. Rao', credits: 3, status: 'Completed', icon: '🧮',
        syllabus: [
            { unit: 'Unit I', topic: 'Automata Theory', topics: ['DFA', 'NFA', 'ε-NFA', 'Minimization of DFA'] },
            { unit: 'Unit II', topic: 'Regular Languages', topics: ['Regular Expressions', 'Pumping Lemma', 'Closure Properties'] },
            { unit: 'Unit III', topic: 'Context-Free Grammars', topics: ['CFG Rules', 'Parse Trees', 'Ambiguity', 'CNF & GNF'] },
            { unit: 'Unit IV', topic: 'Pushdown Automata', topics: ['PDA Definition', 'PDA vs CFG', 'CYK Algorithm', 'Parsing'] },
            { unit: 'Unit V', topic: 'Turing Machines', topics: ['TM Construction', 'Decidability', 'Halting Problem', 'Complexity Classes'] },
        ],
        materials: [
            { name: 'TOC Unit 1 - DFA & NFA.pdf', type: 'PDF', size: '1.5 MB', date: 'Jan 20' },
            { name: 'Regular Expressions Slides.pptx', type: 'Slides', size: '3.1 MB', date: 'Jan 27' },
            { name: 'CFG & PDA Notes.pdf', type: 'PDF', size: '2.0 MB', date: 'Feb 03' },
            { name: 'Turing Machine Examples.pdf', type: 'PDF', size: '1.8 MB', date: 'Feb 09' },
            { name: 'TOC Previous Year Papers.pdf', type: 'PDF', size: '4.5 MB', date: 'Feb 15' },
        ]
    },
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
    const [modal, setModal] = useState(null); // { subject, tab: 'syllabus'|'materials' }
    const [deptModal, setDeptModal] = useState(null); // { type: 'event'|'resource', data: {...} }
    const [calendarToast, setCalendarToast] = useState(null); // event title string

    const showCalendarToast = (title) => {
        setCalendarToast(title);
        setTimeout(() => setCalendarToast(null), 3000);
    };

    const typeIcon = (type) => ({ PDF: '📄', Slides: '📊', Lab: '🔬', Video: '🎥' }[type] || '📁');
    const typeColor = (type) => ({ PDF: '#ef4444', Slides: '#f59e0b', Lab: '#10b981', Video: '#6366f1' }[type] || '#8b5cf6');

    const RESOURCE_CONTENT = {
        'Placement Cell': {
            icon: '💼',
            color: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            desc: 'Access job openings, internship drives, and placement preparation resources.',
            stats: [{ label: 'Companies Visited', value: '48' }, { label: 'Offers Made', value: '312' }, { label: 'Avg Package', value: '₹12 LPA' }, { label: 'Highest Package', value: '₹42 LPA' }],
            links: ['Resume Builder', 'Mock Interview Portal', 'Upcoming Drives', 'Alumni Connect']
        },
        'Library Portal': {
            icon: '📚',
            color: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
            desc: 'Access e-books, journals, IEEE/Springer papers, and digital resources.',
            stats: [{ label: 'E-Books', value: '14,000+' }, { label: 'Journals', value: '320' }, { label: 'IEEE Papers', value: '8,500+' }, { label: 'Seats', value: '200' }],
            links: ['IEEE Xplore', 'Springer Link', 'NPTEL Lectures', 'Previous Year Papers']
        },
        'Faculty Directory': {
            icon: '👨‍🏫',
            color: 'linear-gradient(135deg, #10b981, #0ea5e9)',
            desc: 'Find and contact your professors, view their research areas and office hours.',
            stats: [{ label: 'Total Faculty', value: '32' }, { label: 'PhD Holders', value: '18' }, { label: 'Professors', value: '8' }, { label: 'Asst. Professors', value: '24' }],
            links: ['Dr. R. Sharma – OS', 'Prof. A. Gupta – Networks', 'Dr. S. Mehta – DBMS', 'Dr. P. Verma – TOC']
        },
        'Student Handbook': {
            icon: '📋',
            color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            desc: 'Complete guide to academic rules, code of conduct, exam policies, and grievance procedures.',
            stats: [{ label: 'Min Attendance', value: '75%' }, { label: 'Grace Marks', value: '5' }, { label: 'Backlog Limit', value: '3' }, { label: 'Fee Due Day', value: '15th' }],
            links: ['Exam Schedule PDF', 'Fee Structure', 'Grievance Portal', 'Anti-Ragging Policy']
        },
        'Research Labs': {
            icon: '🔬',
            color: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
            desc: 'Explore state-of-the-art research labs across AI, IoT, Cloud Computing, and Systems.',
            stats: [{ label: 'Active Labs', value: '6' }, { label: 'Ongoing Projects', value: '23' }, { label: 'Publications', value: '126' }, { label: 'Funded Projects', value: '9' }],
            links: ['AI & ML Lab', 'IoT Research Centre', 'Cloud Systems Lab', 'Cybersecurity Lab']
        },
        'Achievements': {
            icon: '🏅',
            color: 'linear-gradient(135deg, #f59e0b, #10b981)',
            desc: 'Celebrating our department milestones, awards, and student recognitions.',
            stats: [{ label: 'National Ranks', value: '3' }, { label: 'Hackathon Wins', value: '17' }, { label: 'Patents Filed', value: '8' }, { label: 'Startups Founded', value: '12' }],
            links: ['Smart India Hackathon 2025 Winners', 'NAAC A+ Ranking', 'Best Dept Award 2024', 'NIRF Top 50 Ranking']
        },
    };

    const EVENT_DETAILS = {
        'Hackathon 2026': {
            icon: '⚡', date: 'March 15, 2026', venue: 'CS Block – Lab 7 & 8', time: '8:00 AM – 8:00 AM (24hrs)',
            color: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            desc: 'Join the biggest inter-college coding marathon! Build innovative solutions in just 24 hours. Register solo or in teams of up to 4 members. Prizes worth ₹1,00,000 to be won.',
            prizes: ['1st Place: ₹50,000 + Internship Offer', '2nd Place: ₹30,000', '3rd Place: ₹20,000'],
            rules: ['Team size: 2–4 members', 'Any programming language allowed', 'Problem statements revealed at 8 AM', 'No pre-built projects'],
            contact: 'hackathon@cse.educampus.edu'
        },
        'Guest Lecture: AI Ethics': {
            icon: '🧠', date: 'March 22, 2026', venue: 'Main Auditorium', time: '11:00 AM – 1:00 PM',
            color: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
            desc: 'An exclusive talk by Dr. R. Krishnan (IIT Bombay, IEEE Fellow) on the ethical dimensions of AI systems — bias, fairness, explainability, and regulation in modern AI.',
            prizes: ['Open to all students & faculty', 'Certificate of Participation', 'Q&A Session included'],
            rules: ['Entry with valid college ID', 'Seats limited to 400', 'No prior registration needed'],
            contact: 'events@cse.educampus.edu'
        },
        'Tech Symposium': {
            icon: '🏆', date: 'April 5, 2026', venue: 'CS Block – Seminar Hall', time: '9:00 AM – 5:00 PM',
            color: 'linear-gradient(135deg, #10b981, #0ea5e9)',
            desc: 'Annual departmental technical festival featuring paper presentations, project expos, poster sessions, and panel discussions by industry leaders.',
            prizes: ['Best Paper: ₹10,000', 'Best Project Expo: ₹8,000', 'Best Poster: ₹5,000'],
            rules: ['Submit abstract by March 25', 'Teams of 1–3 members', 'Presentation: 15 mins + 5 mins Q&A'],
            contact: 'symposium@cse.educampus.edu'
        },
    };

    const getTimetableCell = (day, time) => {
        return MOCK_TIMETABLE.find(t => t.day === day && t.time === time);
    };


    if (activeTab === 'overview') return (
        <div className="animate-fade-in student-panel-glow">

            {/* Hero Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 55%, #d946ef 100%)',
                borderRadius: '24px', padding: '32px 36px', marginBottom: '28px',
                position: 'relative', overflow: 'hidden', color: 'white'
            }}>
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ position: 'absolute', bottom: '-50px', right: '100px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '8px', textTransform: 'uppercase' }}>🎓 Student Portal · EduCampus</div>
                <div style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px', lineHeight: 1.2 }}>
                    {[user?.firstName, user?.lastName].filter(Boolean).join(' ')
                        ? `Hey, ${[user.firstName, user.lastName].filter(Boolean).join(' ')}! Welcome back 👋`
                        : `Hey, ${user?.username || 'Student'}! Welcome back 👋`}
                </div>
                <div style={{ fontSize: '15px', opacity: 0.88 }}>
                    Semester 4 · B.Tech CSE · Roll No: <strong>2024CS058</strong> · CGPA: <strong>8.4</strong> &nbsp;🏆 Top 10%
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                    {['📅 Feb 21, 2026', '🏫 CSE Department', '📋 2 Assignments Pending'].map((chip, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '6px 16px', fontSize: '12px', fontWeight: 600 }}>{chip}</div>
                    ))}
                </div>
            </div>

            {/* Stat Cards */}
            <div className="stats-grid animate-fade-in delay-200" style={{ marginBottom: '28px' }}>
                {[
                    { label: 'Enrolled Subjects', value: '5', icon: '📚', color: 'indigo', trend: 'Semester 4', sub: '20 total credits' },
                    { label: 'Assignments Due', value: '2', icon: '📝', color: 'sky', trend: '⚠ Due Soon', sub: '1 overdue' },
                    { label: 'Attendance', value: '87%', icon: '✅', color: 'green', trend: '▲ Good', sub: 'Min required: 75%' },
                    { label: 'CGPA', value: '8.4', icon: '🏆', color: 'amber', trend: 'Top 10%', sub: 'Out of 10.0' },
                ].map(s => (
                    <div key={s.label} className={`stat-card overview-stat-glow ${s.color} hover-lift-3d`}>
                        <div className="stat-card-header">
                            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
                            <span className="stat-badge">{s.trend}</span>
                        </div>
                        <div className="stat-value">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{s.sub}</div>
                    </div>
                ))}
            </div>

            {/* Two-Column: Schedule + Work */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '24px', marginBottom: '24px' }}>

                {/* Today's Schedule */}
                <div className="card glass-panel-enhanced animate-fade-in delay-300">
                    <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '4px', height: '36px', borderRadius: '99px', background: 'linear-gradient(180deg, #6366f1, #a855f7)' }} />
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>Today's Classes</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '1px' }}>Your lecture & lab timetable for today</div>
                            </div>
                        </div>
                        <span style={{ fontSize: '11px', background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08))', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontWeight: 700, border: '1px solid rgba(99,102,241,0.2)' }}>📅 Monday</span>
                    </div>
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {MOCK_TIMETABLE.filter(t => t.day === 'Monday').map((cls, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px',
                                borderRadius: '14px', border: `1px solid ${i === 0 ? 'rgba(99,102,241,0.25)' : 'var(--border)'}`,
                                background: i === 0 ? 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.04))' : 'rgba(0,0,0,0.015)'
                            }}>
                                <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 800, minWidth: '62px', textAlign: 'center', background: 'rgba(99,102,241,0.08)', borderRadius: '8px', padding: '4px 6px' }}>{cls.time}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>{cls.subject}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>📍 {cls.room}</div>
                                </div>
                                {i === 0 && <span style={{ background: 'rgba(16,185,129,0.12)', color: '#059669', fontSize: '10px', fontWeight: 700, padding: '3px 9px', borderRadius: '20px', border: '1px solid rgba(16,185,129,0.2)' }}>LIVE</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* Pending Assignments */}
                    <div className="card glass-panel-enhanced animate-fade-in delay-400">
                        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '4px', height: '32px', borderRadius: '99px', background: 'linear-gradient(180deg, #f59e0b, #ef4444)' }} />
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-primary)' }}>Pending Work</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>Assignments awaiting your submission</div>
                            </div>
                        </div>
                        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {MOCK_ASSIGNMENTS.filter(a => a.status !== 'Submitted').map((a, i) => (
                                <div key={i} style={{
                                    display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px 14px', borderRadius: '12px',
                                    background: a.status === 'Late' ? 'rgba(239,68,68,0.05)' : 'rgba(245,158,11,0.05)',
                                    border: `1px solid ${a.status === 'Late' ? 'rgba(239,68,68,0.18)' : 'rgba(245,158,11,0.18)'}`
                                }}>
                                    <div style={{ fontSize: '22px', flexShrink: 0 }}>{a.status === 'Late' ? '🔴' : '🟡'}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginBottom: '2px' }}>{a.title}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{a.subject} · Due <strong>{a.due}</strong></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Course Progress */}
                    <div className="card glass-panel-enhanced animate-fade-in delay-500">
                        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '4px', height: '32px', borderRadius: '99px', background: 'linear-gradient(180deg, #10b981, #06b6d4)' }} />
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-primary)' }}>Subject Progress</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>Completion across your top 3 courses</div>
                            </div>
                        </div>
                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {MOCK_SUBJECTS.slice(0, 3).map((c, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.icon} {c.title}</span>
                                        <span style={{ color: c.status === 'Completed' ? 'var(--success)' : 'var(--primary)', fontWeight: 700 }}>
                                            {c.status === 'Completed' ? '100%' : '65%'}
                                        </span>
                                    </div>
                                    <div style={{ height: '7px', background: 'rgba(0,0,0,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: c.status === 'Completed' ? '100%' : '65%', background: c.status === 'Completed' ? 'var(--success)' : 'var(--primary)', borderRadius: '99px', transition: 'width 1s ease' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Active Courses Strip */}
            <div className="card glass-panel-enhanced animate-fade-in delay-300">
                <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '4px', height: '38px', borderRadius: '99px', background: 'linear-gradient(180deg, #8b5cf6, #6366f1)' }} />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>Enrolled Subjects</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Semester 4 · B.Tech Computer Science and Engineering</div>
                        </div>
                    </div>
                    <span style={{ fontSize: '11px', background: 'rgba(139,92,246,0.08)', color: '#7c3aed', padding: '4px 12px', borderRadius: '20px', fontWeight: 700, border: '1px solid rgba(139,92,246,0.18)' }}>5 Subjects · 20 Credits</span>
                </div>
                <div style={{ padding: '12px 16px' }}>
                    {MOCK_SUBJECTS.map((c, i) => (
                        <div key={c.id} className={`list-card-item delay-${(i + 1) * 100} animate-fade-in`}>
                            <div className="subject-icon">{c.icon}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>{c.title}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{c.code} · {c.faculty} · {c.credits} Credits</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '13px', fontWeight: 700, color: c.status === 'Completed' ? 'var(--success)' : 'var(--primary)' }}>
                                        {c.status === 'Completed' ? '100%' : '65%'}
                                    </div>
                                    <div style={{ width: '60px', height: '4px', background: 'rgba(0,0,0,0.06)', borderRadius: '99px', overflow: 'hidden', marginTop: '4px' }}>
                                        <div style={{ height: '100%', width: c.status === 'Completed' ? '100%' : '65%', background: c.status === 'Completed' ? 'var(--success)' : 'var(--primary)', borderRadius: '99px' }} />
                                    </div>
                                </div>
                                <span className={`badge ${c.status === 'Completed' ? 'badge-completed' : 'badge-active'}`}>{c.status}</span>
                            </div>
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

            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 60%, #dc2626 100%)', borderRadius: '24px', padding: '28px 36px', marginBottom: '28px', position: 'relative', overflow: 'hidden', color: 'white' }}>
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '6px', textTransform: 'uppercase' }}>📝 Assignments · Semester 4</div>
                <div style={{ fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>Your Assignments</div>
                <div style={{ fontSize: '14px', opacity: 0.88 }}>2 pending · 1 submitted · 1 overdue — stay on top of your deadlines!</div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                    {['📋 3 Total', '⚠️ 1 Overdue', '✅ 1 Submitted'].map((c, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '5px 14px', fontSize: '12px', fontWeight: 600 }}>{c}</div>
                    ))}
                </div>
            </div>

            {/* Assignment Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {MOCK_ASSIGNMENTS.map((a, i) => {
                    const isLate = a.status === 'Late';
                    const isSubmitted = a.status === 'Submitted';
                    const accentColor = isLate ? '#ef4444' : isSubmitted ? '#10b981' : '#f59e0b';
                    const bgColor = isLate ? 'rgba(239,68,68,0.04)' : isSubmitted ? 'rgba(16,185,129,0.04)' : 'rgba(245,158,11,0.04)';
                    return (
                        <div key={a.id} className="card glass-panel-enhanced hover-lift-3d animate-fade-in" style={{ padding: '0', overflow: 'hidden', borderLeft: `4px solid ${accentColor}`, background: bgColor }}>
                            <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '18px' }}>
                                {/* Icon */}
                                <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}11)`, border: `1px solid ${accentColor}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                                    {isSubmitted ? '✅' : isLate ? '🔴' : '📝'}
                                </div>
                                {/* Info */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 800, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '4px' }}>{a.title}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>📚 {a.subject}</span>
                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>•</span>
                                        <span style={{ fontSize: '13px', color: isLate ? '#ef4444' : 'var(--text-muted)', fontWeight: isLate ? 700 : 400 }}>⏰ Due: {a.due}</span>
                                        <span style={{ fontSize: '11px', background: a.priority === 'High' ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)', color: a.priority === 'High' ? '#ef4444' : '#3b82f6', padding: '2px 8px', borderRadius: '8px', fontWeight: 700 }}>{a.priority} Priority</span>
                                    </div>
                                </div>
                                {/* Right */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                                    <span style={{ background: isLate ? 'rgba(239,68,68,0.1)' : isSubmitted ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: accentColor, padding: '4px 14px', borderRadius: '20px', fontWeight: 700, fontSize: '12px', border: `1px solid ${accentColor}33` }}>{a.status}</span>
                                    {!isSubmitted && (
                                        <button className="btn btn-sm" style={{ background: accentColor, color: 'white', border: 'none', borderRadius: '10px', padding: '6px 16px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                                            {isLate ? 'Submit Late →' : 'Submit Now →'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    if (activeTab === 'payments') return (
        <div className="animate-fade-in student-panel-glow">

            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 60%, #8b5cf6 100%)', borderRadius: '24px', padding: '28px 36px', marginBottom: '28px', position: 'relative', overflow: 'hidden', color: 'white' }}>
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '6px', textTransform: 'uppercase' }}>💳 Fee Payments · Semester 4</div>
                <div style={{ fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>Financial Overview</div>
                <div style={{ fontSize: '14px', opacity: 0.88 }}>1 pending fee · 1 library fine · Total paid ₹45,000</div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
                    {[{ label: 'Total Paid', value: '₹45,000', icon: '✅' }, { label: 'Amount Due', value: '₹200', icon: '⚠️' }, { label: 'Next Due', value: 'Mar 15', icon: '📅' }].map((s, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.14)', borderRadius: '14px', padding: '12px 20px', backdropFilter: 'blur(8px)' }}>
                            <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '2px' }}>{s.icon} {s.label}</div>
                            <div style={{ fontWeight: 800, fontSize: '18px' }}>{s.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                {[
                    { id: 'INV-2024-001', desc: 'Semester 4 Tuition Fee', amount: '₹45,000', date: '2026-01-15', status: 'Paid', icon: '🎓', color: '#10b981', category: 'Tuition' },
                    { id: 'INV-2024-002', desc: 'Library Fine (Book Overdue)', amount: '₹200', date: '2026-02-10', status: 'Pending', icon: '📚', color: '#ef4444', category: 'Fine' },
                    { id: 'INV-2024-003', desc: 'Hostel Mess Fee – Feb', amount: '₹3,200', date: '2026-02-01', status: 'Paid', icon: '🍽️', color: '#10b981', category: 'Hostel' },
                    { id: 'INV-2024-004', desc: 'Exam Registration Fee', amount: '₹1,500', date: '2026-03-01', status: 'Pending', icon: '📝', color: '#f59e0b', category: 'Exam' },
                ].map((p, i) => (
                    <div key={p.id} className="card glass-panel-enhanced hover-lift-3d" style={{ padding: '0', overflow: 'hidden', borderLeft: `4px solid ${p.color}` }}>
                        <div style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${p.color}15`, border: `1px solid ${p.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{p.icon}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '3px' }}>{p.desc}</div>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{p.id}</span>
                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>•</span>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>📅 {p.date}</span>
                                    <span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.04)', color: 'var(--text-muted)', padding: '1px 8px', borderRadius: '6px', fontWeight: 600 }}>{p.category}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                                <div style={{ fontWeight: 900, fontSize: '18px', color: 'var(--text-primary)' }}>{p.amount}</div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <span style={{ background: `${p.color}15`, color: p.color, padding: '3px 12px', borderRadius: '20px', fontWeight: 700, fontSize: '11px', border: `1px solid ${p.color}30` }}>{p.status === 'Paid' ? '✓ Paid' : '⚠ Pending'}</span>
                                    {p.status === 'Pending' && <button className="btn btn-sm" style={{ background: p.color, color: 'white', border: 'none', borderRadius: '10px', padding: '5px 14px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Pay Now →</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Download Receipt */}
            <div className="card glass-panel-enhanced" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(99,102,241,0.03)', border: '1px dashed rgba(99,102,241,0.25)' }}>
                <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>📄 Fee Receipts &amp; Statements</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Download your official fee receipts for scholarship or tax purposes</div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-secondary" style={{ fontSize: '12px' }}>📥 All Receipts</button>
                    <button className="btn btn-primary" style={{ fontSize: '12px' }}>📊 Statement</button>
                </div>
            </div>
        </div>
    );

    if (activeTab === 'profile') {
        const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.username || 'Student';
        return (
            <div className="animate-fade-in student-panel-glow">

                {/* Cover + Avatar */}
                <div className="card glass-panel-enhanced" style={{ overflow: 'hidden', padding: 0, marginBottom: '24px' }}>
                    {/* Cover */}
                    <div style={{ height: '140px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)', position: 'relative', flexShrink: 0 }}>
                        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                        <div style={{ position: 'absolute', bottom: '-20px', left: '80px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                    </div>
                    {/* Avatar + Name row — sits BELOW the cover, on white bg */}
                    <div style={{ padding: '16px 36px 24px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', background: 'white' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid white', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', fontWeight: 800, color: 'white', boxShadow: '0 8px 24px rgba(99,102,241,0.35)', flexShrink: 0, marginTop: '-52px', position: 'relative', zIndex: 2 }}>
                            {fullName[0].toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 900, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '2px' }}>{fullName}</div>
                            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>@{user?.username} &nbsp;·&nbsp; Student ID: 2024CS058 &nbsp;·&nbsp; 🏛️ CSE Dept.</div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn btn-primary" style={{ fontSize: '13px', padding: '8px 18px' }}>✏️ Edit Profile</button>
                            <button className="btn btn-secondary" style={{ fontSize: '13px', padding: '8px 18px' }}>📥 Download ID</button>
                        </div>
                    </div>
                </div>

                {/* 2-column */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>

                    {/* Left: Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                        {/* Personal Info */}
                        <div className="card glass-panel-enhanced">
                            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '4px', height: '28px', borderRadius: '99px', background: 'linear-gradient(180deg, #6366f1, #a855f7)' }} />
                                <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-primary)' }}>Personal Information</div>
                            </div>
                            <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                {[
                                    { label: 'Full Name', value: fullName, icon: '👤' },
                                    { label: 'Email Address', value: user?.email || 'mansi567@gmail.com', icon: '✉️' },
                                    { label: 'Student ID', value: '2024CS058', icon: '🪪' },
                                    { label: 'Phone', value: '+91 98765 43210', icon: '📱' },
                                    { label: 'Date of Birth', value: '17 Nov 2004', icon: '🎂' },
                                    { label: 'Blood Group', value: 'B+', icon: '🩸' },
                                ].map((f, i) => (
                                    <div key={i} style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(0,0,0,0.015)', border: '1px solid var(--border)' }}>
                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>{f.icon} {f.label}</div>
                                        <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>{f.value || '—'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Academic Info */}
                        <div className="card glass-panel-enhanced">
                            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '4px', height: '28px', borderRadius: '99px', background: 'linear-gradient(180deg, #10b981, #0ea5e9)' }} />
                                <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-primary)' }}>Academic Details</div>
                            </div>
                            <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                {[
                                    { label: 'Program', value: 'B.Tech CSE', icon: '🎓' },
                                    { label: 'Department', value: 'Computer Science', icon: '🏛️' },
                                    { label: 'Current Semester', value: 'Semester 4', icon: '📆' },
                                    { label: 'Academic Year', value: '2026–27', icon: '📅' },
                                    { label: 'Batch', value: '2024–2028', icon: '👥' },
                                    { label: 'Role', value: 'Student', icon: '🏷️' },
                                ].map((f, i) => (
                                    <div key={i} style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(0,0,0,0.015)', border: '1px solid var(--border)' }}>
                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>{f.icon} {f.label}</div>
                                        <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>{f.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Stats + Achievements */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                        {/* Academic Highlights */}
                        <div className="card glass-panel-enhanced">
                            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '4px', height: '28px', borderRadius: '99px', background: 'linear-gradient(180deg, #f59e0b, #ef4444)' }} />
                                <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-primary)' }}>Academic Highlights</div>
                            </div>
                            <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                {[
                                    { label: 'CGPA', value: '8.4', color: '#6366f1', icon: '🏆' },
                                    { label: 'Attendance', value: '87%', color: '#10b981', icon: '✅' },
                                    { label: 'Credits', value: '86', color: '#f59e0b', icon: '📚' },
                                    { label: 'Rank', value: '#12', color: '#ef4444', icon: '🥇' },
                                ].map((s, i) => (
                                    <div key={i} style={{ padding: '14px', borderRadius: '14px', background: `${s.color}09`, border: `1px solid ${s.color}22`, textAlign: 'center' }}>
                                        <div style={{ fontSize: '18px', marginBottom: '4px' }}>{s.icon}</div>
                                        <div style={{ fontWeight: 900, fontSize: '22px', color: s.color }}>{s.value}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="card glass-panel-enhanced">
                            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '4px', height: '28px', borderRadius: '99px', background: 'linear-gradient(180deg, #8b5cf6, #d946ef)' }} />
                                <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-primary)' }}>Achievements</div>
                            </div>
                            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {[
                                    { title: 'Dean\'s List 2025', desc: 'Top 5% of the batch', icon: '🥇', color: '#f59e0b' },
                                    { title: 'Hackathon Runner-Up', desc: 'Smart India Hackathon 2025', icon: '⚡', color: '#6366f1' },
                                    { title: 'Zero Backlog Award', desc: 'Clean academic record', icon: '✅', color: '#10b981' },
                                ].map((a, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px 12px', borderRadius: '12px', background: `${a.color}08`, border: `1px solid ${a.color}22` }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${a.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{a.icon}</div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{a.title}</div>
                                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{a.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginBottom: '8px' }}>
                            <span style={{ fontWeight: 600 }}>Progress</span>
                            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{c.status === 'Completed' ? '100%' : '65%'}</span>
                        </div>
                        <div className="progress-track" style={{ marginBottom: '20px' }}>
                            <div className="progress-fill" style={{ width: c.status === 'Completed' ? '100%' : '65%', background: c.status === 'Completed' ? 'var(--success)' : 'var(--primary)' }}></div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => setModal({ subject: c, tab: 'syllabus' })}>📋 Syllabus</button>
                            <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => setModal({ subject: c, tab: 'materials' })}>📁 Materials</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modal && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 2000,
                    background: 'rgba(15,15,30,0.65)', backdropFilter: 'blur(6px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '24px'
                }} onClick={() => setModal(null)}>
                    <div style={{
                        background: 'white', borderRadius: '28px', width: '100%', maxWidth: '660px',
                        maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.25)', border: '1px solid rgba(139,92,246,0.15)'
                    }} onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div style={{
                            padding: '24px 28px 0',
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(168,85,247,0.06))'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <div style={{ fontSize: '36px' }}>{modal.subject.icon}</div>
                                    <div>
                                        <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>{modal.subject.title}</div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{modal.subject.code} &bull; {modal.subject.faculty} &bull; {modal.subject.credits} Credits</div>
                                    </div>
                                </div>
                                <button onClick={() => setModal(null)} style={{
                                    background: 'rgba(0,0,0,0.06)', border: 'none', borderRadius: '50%',
                                    width: '36px', height: '36px', cursor: 'pointer', fontSize: '18px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)'
                                }}>✕</button>
                            </div>

                            {/* Tabs */}
                            <div style={{ display: 'flex', gap: '4px' }}>
                                {['syllabus', 'materials'].map(t => (
                                    <button key={t} onClick={() => setModal(m => ({ ...m, tab: t }))} style={{
                                        padding: '10px 24px', border: 'none', cursor: 'pointer', fontWeight: 700,
                                        fontSize: '14px', borderRadius: '12px 12px 0 0', transition: 'all 0.2s',
                                        background: modal.tab === t ? 'white' : 'transparent',
                                        color: modal.tab === t ? 'var(--primary)' : 'var(--text-muted)',
                                        borderBottom: modal.tab === t ? '2px solid var(--primary)' : '2px solid transparent'
                                    }}>
                                        {t === 'syllabus' ? '📋 Syllabus' : '📁 Materials'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>

                            {modal.tab === 'syllabus' && (
                                <div>
                                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                                        📘 {modal.subject.syllabus.length} Units &bull; Semester 4 Curriculum
                                    </p>
                                    {modal.subject.syllabus.map((unit, i) => (
                                        <div key={i} style={{
                                            marginBottom: '16px', borderRadius: '16px', border: '1px solid var(--border)',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                display: 'flex', alignItems: 'center', gap: '12px',
                                                padding: '14px 18px',
                                                background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(168,85,247,0.04))'
                                            }}>
                                                <div style={{
                                                    width: '36px', height: '36px', borderRadius: '10px',
                                                    background: 'var(--primary-gradient)', color: 'white',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontWeight: 800, fontSize: '12px', flexShrink: 0
                                                }}>{i + 1}</div>
                                                <div>
                                                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{unit.unit}</div>
                                                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{unit.topic}</div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '14px 18px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {unit.topics.map((t, j) => (
                                                    <span key={j} style={{
                                                        background: 'rgba(139,92,246,0.08)', color: 'var(--primary)',
                                                        border: '1px solid rgba(139,92,246,0.15)',
                                                        borderRadius: '20px', padding: '4px 12px',
                                                        fontSize: '12px', fontWeight: 500
                                                    }}>{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {modal.tab === 'materials' && (
                                <div>
                                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                                        📂 {modal.subject.materials.length} files available
                                    </p>
                                    {modal.subject.materials.map((mat, i) => (
                                        <div key={i} style={{
                                            display: 'flex', alignItems: 'center', gap: '14px',
                                            padding: '14px 16px', borderRadius: '14px', marginBottom: '10px',
                                            border: '1px solid var(--border)', transition: 'all 0.2s',
                                            cursor: 'pointer', background: 'rgba(255,255,255,0.8)'
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.05)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'}
                                        >
                                            <div style={{
                                                width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                                                background: `${typeColor(mat.type)}18`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px'
                                            }}>{typeIcon(mat.type)}</div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mat.name}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{mat.size} &bull; Uploaded {mat.date}</div>
                                            </div>
                                            <span style={{
                                                background: `${typeColor(mat.type)}18`, color: typeColor(mat.type),
                                                fontSize: '10px', fontWeight: 700, padding: '3px 10px',
                                                borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0
                                            }}>{mat.type}</span>
                                            <button style={{
                                                background: 'var(--primary)', color: 'white', border: 'none',
                                                borderRadius: '10px', padding: '8px 14px', cursor: 'pointer',
                                                fontSize: '13px', fontWeight: 600, flexShrink: 0
                                            }}>⬇ Download</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
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
        <>
            <div className="animate-fade-in student-panel-glow">

                {/* ── Hero Banner ── */}
                <div style={{
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #a21caf 100%)',
                    borderRadius: '24px', padding: '32px 36px', marginBottom: '28px',
                    position: 'relative', overflow: 'hidden', color: 'white'
                }}>
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                    <div style={{ position: 'absolute', bottom: '-40px', right: '80px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.75, marginBottom: '8px', textTransform: 'uppercase' }}>🏛️ Department · EduCampus Institute of Technology</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>{DEPARTMENT_INFO.name}</div>
                    <div style={{ fontSize: '15px', opacity: 0.88 }}>
                        Dept. Head: <strong>{DEPARTMENT_INFO.head}</strong> &nbsp;·&nbsp; Est. 1999 &nbsp;·&nbsp; NAAC A+ Accredited
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                        {[`📍 ${DEPARTMENT_INFO.block}`, `✉️ ${DEPARTMENT_INFO.email}`, '👨‍🎓 480 Students', '👨‍🏫 32 Faculty'].map((chip, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '5px 14px', fontSize: '12px', fontWeight: 600 }}>{chip}</div>
                        ))}
                    </div>
                </div>

                {/* ── Dept Stats Row ── */}
                <div className="stats-grid animate-fade-in delay-200" style={{ marginBottom: '28px' }}>
                    {[
                        { label: 'Total Students', value: '480', icon: '👨‍🎓', color: 'indigo', trend: '4 Batches' },
                        { label: 'Faculty Members', value: '32', icon: '👨‍🏫', color: 'sky', trend: 'PhD Holders: 18' },
                        { label: 'Placement Rate', value: '94%', icon: '💼', color: 'green', trend: 'Avg ₹12 LPA' },
                        { label: 'Research Papers', value: '126', icon: '📄', color: 'amber', trend: 'Published 2025' },
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

                {/* ── Upcoming Events ── */}
                <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ width: '4px', height: '28px', borderRadius: '99px', background: 'linear-gradient(180deg, #6366f1, #a855f7)' }} />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '16px', color: 'var(--text-primary)' }}>Upcoming Department Events</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Don't miss these — add them to your calendar</div>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                        {[
                            { title: 'Hackathon 2026', date: 'MARCH 15, 2026', desc: '24-hour coding challenge. Form teams of 4 and win prizes up to ₹50,000.', icon: '⚡', color: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
                            { title: 'Guest Lecture: AI Ethics', date: 'MARCH 22, 2026', desc: 'IEEE talk by Dr. R. Krishnan from IIT Bombay. Open to all students.', icon: '🧠', color: 'linear-gradient(135deg, #0ea5e9, #6366f1)' },
                            { title: 'Tech Symposium', date: 'APRIL 05, 2026', desc: 'Annual technical fest with paper presentations, project expos & more.', icon: '🏆', color: 'linear-gradient(135deg, #10b981, #0ea5e9)' },
                        ].map((e, i) => (
                            <div key={i} className={`card glass-panel-enhanced hover-lift-3d animate-fade-in delay-${(i + 1) * 100}`} style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border)' }}>
                                {/* Colored top strip */}
                                <div style={{ height: '6px', background: e.color }} />
                                <div style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '12px' }}>
                                        <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: e.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{e.icon}</div>
                                        <div>
                                            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '3px' }}>📅 {e.date}</div>
                                            <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>{e.title}</div>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 16px 0' }}>{e.desc}</p>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            style={{ flex: 1, fontSize: '12px', padding: '8px' }}
                                            onClick={() => showCalendarToast(e.title)}
                                        >+ Add to Calendar</button>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            style={{ fontSize: '12px', padding: '8px 14px' }}
                                            onClick={() => setDeptModal({ type: 'event', data: { ...EVENT_DETAILS[e.title], title: e.title } })}
                                        >Details</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Quick Links ── */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ width: '4px', height: '28px', borderRadius: '99px', background: 'linear-gradient(180deg, #10b981, #0ea5e9)' }} />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '16px', color: 'var(--text-primary)' }}>Department Resources</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Useful links for CSE students</div>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
                        {[
                            { icon: '💼', label: 'Placement Cell', sub: 'Job & internship portal' },
                            { icon: '📚', label: 'Library Portal', sub: 'E-books & journals' },
                            { icon: '👨‍🏫', label: 'Faculty Directory', sub: 'Contact your professors' },
                            { icon: '📋', label: 'Student Handbook', sub: 'Rules & regulations' },
                            { icon: '🔬', label: 'Research Labs', sub: 'AI, IoT, Systems labs' },
                            { icon: '🏅', label: 'Achievements', sub: 'Dept. awards & recognitions' },
                        ].map((link, i) => (
                            <div
                                key={i}
                                className="card glass-panel-enhanced hover-lift-3d"
                                style={{ padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
                                onClick={() => setDeptModal({ type: 'resource', data: { ...RESOURCE_CONTENT[link.label], title: link.label } })}
                            >
                                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{link.icon}</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{link.label}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{link.sub}</div>
                                </div>
                                <div style={{ marginLeft: 'auto', fontSize: '16px', color: 'var(--text-muted)', opacity: 0.5 }}>›</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Department Modal Overlay ── */}
            {deptModal && (
                <div onClick={() => setDeptModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                    <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '520px', maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,0.25)' }}>
                        <div style={{ height: '8px', borderRadius: '24px 24px 0 0', background: deptModal.data.color }} />
                        <div style={{ padding: '24px 28px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: deptModal.data.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{deptModal.data.icon}</div>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '18px', color: '#1e1b4b', marginBottom: '3px' }}>{deptModal.data.title}</div>
                                    {deptModal.type === 'event'
                                        ? <div style={{ fontSize: '12px', color: '#6366f1', fontWeight: 700 }}>📅 {deptModal.data.date} &nbsp;·&nbsp; 📍 {deptModal.data.venue} &nbsp;·&nbsp; 🕐 {deptModal.data.time}</div>
                                        : <div style={{ fontSize: '12px', color: '#64748b' }}>Department Resource</div>}
                                </div>
                            </div>
                            <button onClick={() => setDeptModal(null)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '10px', width: '36px', height: '36px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>×</button>
                        </div>
                        <div style={{ padding: '22px 28px 28px' }}>
                            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>{deptModal.data.desc}</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
                                {deptModal.data.stats.map((s, i) => (
                                    <div key={i} style={{ background: '#f8fafc', borderRadius: '14px', padding: '14px 16px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>{s.label}</div>
                                        <div style={{ fontWeight: 800, fontSize: '20px', color: '#1e1b4b' }}>{s.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '16px 20px', border: '1px solid #e2e8f0', marginBottom: '14px' }}>
                                <div style={{ fontWeight: 700, fontSize: '13px', color: '#334155', marginBottom: '10px' }}>{deptModal.type === 'event' ? '🏆 Prizes & Benefits' : '🔗 Quick Links'}</div>
                                {deptModal.data.prizes.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', borderBottom: i < deptModal.data.prizes.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />
                                        <span style={{ fontSize: '13px', color: '#475569' }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '16px 20px', border: '1px solid #bbf7d0', marginBottom: '22px' }}>
                                <div style={{ fontWeight: 700, fontSize: '13px', color: '#334155', marginBottom: '10px' }}>{deptModal.type === 'event' ? '📋 Rules & Guidelines' : '🔧 Key Information'}</div>
                                {deptModal.data.rules.map((rule, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '6px 0', borderBottom: i < deptModal.data.rules.length - 1 ? '1px solid #dcfce7' : 'none' }}>
                                        <span style={{ color: '#10b981', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>✓</span>
                                        <span style={{ fontSize: '13px', color: '#475569' }}>{rule}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {deptModal.type === 'event'
                                    ? <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { showCalendarToast(deptModal.data.title); setDeptModal(null); }}>+ Add to Calendar</button>
                                    : <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setDeptModal(null)}>Open Portal →</button>
                                }
                                <button className="btn btn-secondary" onClick={() => setDeptModal(null)}>Close</button>
                            </div>
                            {deptModal.data.contact && <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: '#94a3b8' }}>✉️ {deptModal.data.contact}</div>}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Calendar Toast ── */}
            {calendarToast && (
                <div style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 1200, background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '14px 24px', borderRadius: '20px', boxShadow: '0 8px 32px rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 600 }}>
                    ✅ <span>"{calendarToast}" added to your calendar!</span>
                </div>
            )}
        </>
    );

    if (activeTab === 'academics') return (
        <div className="animate-fade-in student-panel-glow">

            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 55%, #4f46e5 100%)', borderRadius: '24px', padding: '28px 36px', marginBottom: '28px', position: 'relative', overflow: 'hidden', color: 'white' }}>
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '6px', textTransform: 'uppercase' }}>🎓 Academic Year · B.Tech CSE</div>
                <div style={{ fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>Year 3 — Junior</div>
                <div style={{ fontSize: '14px', opacity: 0.88 }}>Currently in Semester 4 of 8 · CGPA 8.4 · 86 Credits Earned</div>
                {/* Year Progress Bar */}
                <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px', opacity: 0.85 }}>
                        <span>Year 1 ✅</span><span>Year 2 ✅</span><span style={{ fontWeight: 700 }}>Year 3 ⚡ (Now)</span><span>Year 4 ⏳</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: '62.5%', height: '100%', background: 'rgba(255,255,255,0.85)', borderRadius: '99px' }} />
                    </div>
                </div>
            </div>

            {/* Key Dates strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
                {[
                    { label: 'Mid-Sem Exam', date: 'Mar 10, 2026', icon: '📝', color: '#f59e0b' },
                    { label: 'End-Sem Exam', date: 'May 5, 2026', icon: '📋', color: '#ef4444' },
                    { label: 'Result Declaration', date: 'Jun 1, 2026', icon: '🏅', color: '#10b981' },
                ].map((d, i) => (
                    <div key={i} className="card glass-panel-enhanced" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${d.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{d.icon}</div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{d.label}</div>
                            <div style={{ fontSize: '12px', color: d.color, fontWeight: 700 }}>{d.date}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Two-column: Calendar CTA + Curriculum */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.2fr', gap: '20px' }}>

                {/* Calendar card */}
                <div className="card glass-panel-enhanced" style={{ padding: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.05))', border: '1px solid rgba(139,92,246,0.15)' }}>
                    <div style={{ fontSize: '52px', marginBottom: '12px' }}>📅</div>
                    <div style={{ fontWeight: 800, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '6px' }}>Academic Calendar</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>All key exam dates, holidays, and semester schedule</div>
                    <button className="btn btn-primary btn-glow" style={{ width: '100%', fontSize: '13px' }}>📥 Download PDF</button>
                    <button className="btn btn-secondary" style={{ width: '100%', marginTop: '10px', fontSize: '13px' }}>🗓️ View Events</button>
                </div>

                {/* Curriculum as cards */}
                <div className="card glass-panel-enhanced">
                    <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '4px', height: '28px', borderRadius: '99px', background: 'linear-gradient(180deg, #6366f1, #a855f7)' }} />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)' }}>Semester 4 Curriculum</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>5 Subjects · 19 Credits · B.Tech CSE</div>
                        </div>
                    </div>
                    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {MOCK_SUBJECTS.map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 12px', borderRadius: '12px', background: 'rgba(0,0,0,0.015)', border: '1px solid var(--border)' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{s.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>{s.title}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.code} · {s.faculty}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', background: 'rgba(99,102,241,0.08)', padding: '2px 10px', borderRadius: '8px' }}>{s.credits} Cr</span>
                                    <span style={{ fontSize: '11px', color: s.status === 'Completed' ? 'var(--success)' : '#f59e0b', fontWeight: 700 }}>{s.status === 'Completed' ? '✅' : '⚡'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    if (activeTab === 'results') return (
        <div className="animate-fade-in student-panel-glow">

            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #6366f1 60%, #8b5cf6 100%)', borderRadius: '24px', padding: '28px 36px', marginBottom: '28px', position: 'relative', overflow: 'hidden', color: 'white' }}>
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '6px', textTransform: 'uppercase' }}>🏆 Academic Performance · B.Tech CSE</div>
                        <div style={{ fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>Exam Results</div>
                        <div style={{ fontSize: '14px', opacity: 0.88 }}>All pass · 0 backlogs · Top 10% in department</div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                            {['🎖️ 86 Credits Earned', '📅 Sem 3 Best', '✅ 0 Backlogs'].map((c, i) => (
                                <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '5px 14px', fontSize: '12px', fontWeight: 600 }}>{c}</div>
                            ))}
                        </div>
                    </div>
                    {/* CGPA Ring */}
                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                        <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '4px solid rgba(255,255,255,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ fontWeight: 900, fontSize: '26px', lineHeight: 1 }}>8.4</div>
                            <div style={{ fontSize: '10px', opacity: 0.8, fontWeight: 700 }}>CGPA</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Cards by Semester */}
            {['Sem 3', 'Sem 2', 'Sem 1'].map(sem => {
                const semResults = [
                    { sem: 'Sem 3', subject: 'Advanced React', grade: 'A', gpa: '4.0', status: 'Pass', icon: '⚛️' },
                    { sem: 'Sem 3', subject: 'System Design', grade: 'A-', gpa: '3.7', status: 'Pass', icon: '🏗️' },
                    { sem: 'Sem 2', subject: 'Algorithms', grade: 'B+', gpa: '3.3', status: 'Pass', icon: '🔢' },
                    { sem: 'Sem 2', subject: 'Data Structures', grade: 'A', gpa: '4.0', status: 'Pass', icon: '📐' },
                    { sem: 'Sem 1', subject: 'Mathematics I', grade: 'B', gpa: '3.0', status: 'Pass', icon: '📊' },
                ].filter(r => r.sem === sem);
                const avgGpa = (semResults.reduce((s, r) => s + parseFloat(r.gpa), 0) / semResults.length).toFixed(1);
                return (
                    <div key={sem} className="card glass-panel-enhanced hover-lift-3d" style={{ marginBottom: '20px' }}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '4px', height: '28px', borderRadius: '99px', background: 'linear-gradient(180deg, #6366f1, #10b981)' }} />
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)' }}>{sem}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{semResults.length} subjects</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 800, fontSize: '18px', color: 'var(--primary)' }}>{avgGpa} GPA</div>
                                <div style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 700 }}>All Pass ✓</div>
                            </div>
                        </div>
                        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {semResults.map((r, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 12px', borderRadius: '12px', background: 'rgba(0,0,0,0.015)', border: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: '22px', width: '36px', textAlign: 'center' }}>{r.icon}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>{r.subject}</div>
                                    </div>
                                    <div style={{ display: 'flex', align: 'center', gap: '16px', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ width: '50px', height: '5px', background: 'rgba(0,0,0,0.05)', borderRadius: '99px', overflow: 'hidden', marginBottom: '3px' }}>
                                                <div style={{ width: `${(parseFloat(r.gpa) / 4) * 100}%`, height: '100%', background: parseFloat(r.gpa) >= 3.7 ? '#10b981' : parseFloat(r.gpa) >= 3.0 ? '#6366f1' : '#f59e0b', borderRadius: '99px' }} />
                                            </div>
                                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{r.gpa} GPA</div>
                                        </div>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: r.grade.startsWith('A') ? 'rgba(16,185,129,0.1)' : 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', color: r.grade.startsWith('A') ? '#10b981' : '#6366f1' }}>{r.grade}</div>
                                        <span style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '3px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 700 }}>✓ Pass</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    if (activeTab === 'library') return (
        <div className="animate-fade-in student-panel-glow">

            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #0f766e 0%, #0ea5e9 55%, #6366f1 100%)', borderRadius: '24px', padding: '28px 36px', marginBottom: '24px', position: 'relative', overflow: 'hidden', color: 'white' }}>
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8, marginBottom: '6px', textTransform: 'uppercase' }}>📚 Library · EduCampus Digital Library</div>
                <div style={{ fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>My Library</div>
                <div style={{ fontSize: '14px', opacity: 0.88, marginBottom: '18px' }}>2 books borrowed · 0 overdue · 14,000+ e-books available</div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.18)', borderRadius: '14px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(255,255,255,0.25)' }}>
                        <span style={{ fontSize: '16px', opacity: 0.8 }}>🔍</span>
                        <span style={{ fontSize: '14px', opacity: 0.7, fontStyle: 'italic' }}>Search books, journals, papers...</span>
                    </div>
                    <button style={{ background: 'white', color: '#0f766e', border: 'none', borderRadius: '14px', padding: '10px 20px', fontWeight: 800, fontSize: '13px', cursor: 'pointer', flexShrink: 0 }}>Search</button>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
                    {['📖 E-Books', '📄 IEEE', '🎧 NPTEL', '📋 Projects', '🧑‍💻 CS Shelf'].map((c, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '4px 14px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)' }}>{c}</div>
                    ))}
                </div>
            </div>

            {/* 4 Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '22px' }}>
                {[
                    { label: 'Borrowed Now', value: '2', icon: '📖', color: '#0ea5e9', sub: 'Active checkouts' },
                    { label: 'Returned', value: '14', icon: '✅', color: '#10b981', sub: 'This semester' },
                    { label: 'Reading Streak', value: '14d', icon: '🔥', color: '#f59e0b', sub: 'Personal record!' },
                    { label: 'Saved Wishlist', value: '5', icon: '⭐', color: '#8b5cf6', sub: 'Books to read' },
                ].map((s, i) => (
                    <div key={i} style={{ background: 'white', border: `1.5px solid ${s.color}25`, borderRadius: '18px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>{s.icon}</div>
                        <div style={{ fontWeight: 900, fontSize: '28px', color: s.color, lineHeight: 1, marginBottom: '4px' }}>{s.value}</div>
                        <div style={{ fontWeight: 700, fontSize: '12px', color: '#1e293b', marginBottom: '2px' }}>{s.label}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{s.sub}</div>
                    </div>
                ))}
            </div>

            {/* Currently Borrowed */}
            <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', marginBottom: '20px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 22px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '4px', height: '28px', borderRadius: '99px', background: 'linear-gradient(180deg, #0ea5e9, #6366f1)' }} />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '15px', color: '#1e293b' }}>Currently Borrowed</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>2 books · Return on time to avoid fines (₹5/day)</div>
                        </div>
                    </div>
                    <button style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '10px', padding: '6px 14px', fontSize: '12px', fontWeight: 700, color: '#6366f1', cursor: 'pointer' }}>+ Borrow More</button>
                </div>
                <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                        { title: 'Operating Systems: Three Easy Pieces', author: 'Remzi H. Arpaci-Dusseau', issued: 'Feb 10, 2026', due: 'Feb 24, 2026', daysLeft: 3, total: 14, cover: '#6366f1', icon: '💻' },
                        { title: 'Computer Networks: A Top-Down Approach', author: 'James F. Kurose, Keith Ross', issued: 'Feb 15, 2026', due: 'Mar 1, 2026', daysLeft: 8, total: 14, cover: '#0ea5e9', icon: '🌐' },
                    ].map((book, i) => {
                        const pct = Math.min(100, Math.round(((book.total - book.daysLeft) / book.total) * 100));
                        const uc = book.daysLeft <= 3 ? '#ef4444' : book.daysLeft <= 7 ? '#f59e0b' : '#10b981';
                        return (
                            <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '14px 16px', borderRadius: '16px', border: `1.5px solid ${uc}22`, background: `${uc}04` }}>
                                <div style={{ width: '54px', height: '72px', borderRadius: '10px 4px 4px 10px', background: `linear-gradient(160deg, ${book.cover}, ${book.cover}bb)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0, boxShadow: `3px 3px 10px ${book.cover}44` }}>{book.icon}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 800, fontSize: '15px', color: '#1e293b', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</div>
                                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>by {book.author}</div>
                                    <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>
                                        <span style={{ color: '#94a3b8' }}>📅 Issued: {book.issued}</span>
                                        <span style={{ color: uc }}>⏰ Due: {book.due} · <strong>{book.daysLeft} days left</strong></span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ flex: 1, height: '7px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                                            <div style={{ width: `${pct}%`, height: '100%', background: uc, borderRadius: '99px' }} />
                                        </div>
                                        <span style={{ fontSize: '10px', color: uc, fontWeight: 700, flexShrink: 0 }}>{pct}% of loan elapsed</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                                    <button style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '7px 14px', fontSize: '12px', fontWeight: 700, color: '#475569', cursor: 'pointer' }}>🔄 Renew</button>
                                    <button style={{ background: '#0f766e', border: 'none', borderRadius: '10px', padding: '7px 14px', fontSize: '12px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>↩ Return</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom 2-col */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '20px' }}>
                {/* Categories */}
                <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '4px', height: '28px', borderRadius: '99px', background: 'linear-gradient(180deg, #10b981, #0ea5e9)' }} />
                        <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b' }}>Browse Categories</div>
                    </div>
                    <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                            { name: 'Computer Science', count: '2,840', icon: '💻', color: '#6366f1', hot: true },
                            { name: 'Mathematics', count: '1,200', icon: '📐', color: '#f59e0b', hot: false },
                            { name: 'Electronics', count: '980', icon: '⚡', color: '#10b981', hot: false },
                            { name: 'IEEE Journals', count: '8,500', icon: '📄', color: '#0ea5e9', hot: true },
                            { name: 'Project Reports', count: '640', icon: '📋', color: '#8b5cf6', hot: false },
                            { name: 'E-Theses / PhD', count: '290', icon: '🎓', color: '#ef4444', hot: false },
                        ].map((cat, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #f1f5f9', cursor: 'pointer' }}>
                                <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>{cat.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#1e293b' }}>{cat.name}</div>
                                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{cat.count} titles</div>
                                </div>
                                {cat.hot && <span style={{ fontSize: '9px', fontWeight: 800, color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '2px 7px', borderRadius: '6px' }}>HOT</span>}
                                <span style={{ color: '#cbd5e1', fontSize: '14px' }}>›</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* New Arrivals */}
                <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '4px', height: '28px', borderRadius: '99px', background: 'linear-gradient(180deg, #8b5cf6, #d946ef)' }} />
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b' }}>New Arrivals</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Added this month</div>
                            </div>
                        </div>
                        <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '6px 14px', fontSize: '11px', fontWeight: 700, color: '#475569', cursor: 'pointer' }}>View All</button>
                    </div>
                    <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                            { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', tag: 'NEW', icon: '🗄️', color: '#6366f1', year: '2024' },
                            { title: 'Clean Code: A Handbook', author: 'Robert C. Martin', tag: 'HOT', icon: '✨', color: '#f59e0b', year: '2024' },
                            { title: 'Deep Learning (MIT Press)', author: 'Goodfellow, Bengio, Courville', tag: 'NEW', icon: '🧠', color: '#10b981', year: '2025' },
                            { title: 'System Design Interview Vol. 2', author: 'Alex Xu, Sahn Lam', tag: 'HOT', icon: '🏗️', color: '#8b5cf6', year: '2024' },
                            { title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', tag: 'NEW', icon: '🔧', color: '#0ea5e9', year: '2025' },
                        ].map((book, i) => (
                            <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '10px 12px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                <div style={{ width: '42px', height: '54px', borderRadius: '8px 3px 3px 8px', background: `linear-gradient(160deg, ${book.color}, ${book.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0, boxShadow: `2px 2px 6px ${book.color}33` }}>{book.icon}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#1e293b', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</div>
                                    <div style={{ fontSize: '11px', color: '#64748b' }}>{book.author} · {book.year}</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px', flexShrink: 0 }}>
                                    <span style={{ fontSize: '9px', fontWeight: 800, color: book.tag === 'HOT' ? '#ef4444' : '#10b981', background: book.tag === 'HOT' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: '6px' }}>{book.tag}</span>
                                    <button style={{ background: book.color, border: 'none', borderRadius: '8px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>Borrow</button>
                                </div>
                            </div>
                        ))}
                    </div>
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

