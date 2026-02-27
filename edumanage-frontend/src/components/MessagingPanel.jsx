import { useState, useEffect, useRef } from 'react';

/* ══════════════════════════════════════════════════════════════
   MOCK DATA
══════════════════════════════════════════════════════════════ */

/* ── Admin → Teacher individual contacts ── */
const ADMIN_TO_TEACHER_CONTACTS = [
    { id: 't1', name: 'Dr. Anand Sharma', role: 'Teacher', dept: 'Computer Science', avatar: 'AS', color: '#6366f1', online: true },
    { id: 't2', name: 'Prof. Priya Desai', role: 'Teacher', dept: 'Information Tech', avatar: 'PD', color: '#0ea5e9', online: false },
    { id: 't3', name: 'Dr. Ramesh Kumar', role: 'Teacher', dept: 'Electronics', avatar: 'RK', color: '#f59e0b', online: true },
    { id: 't4', name: 'Dr. Sanjay Gupta', role: 'Teacher', dept: 'Electrical Engg', avatar: 'SG', color: '#f43f5e', online: false },
    { id: 't5', name: 'Prof. Anjali Verma', role: 'Teacher', dept: 'Mechanical', avatar: 'AV', color: '#10b981', online: true },
    { id: 't6', name: 'Dr. Vikram Singh', role: 'Teacher', dept: 'Civil Engineering', avatar: 'VS', color: '#8b5cf6', online: true },
    { id: 't7', name: 'Prof. Kavita Nair', role: 'Teacher', dept: 'Computer Science', avatar: 'KN', color: '#ec4899', online: false },
    { id: 't8', name: 'Dr. Suresh Iyer', role: 'Teacher', dept: 'Information Tech', avatar: 'SI', color: '#14b8a6', online: true },
];

/* ── Teacher → Subject groups (broadcast) ── */
const OS_STUDENTS = [
    { id: 's1', name: 'Priya Sharma', avatar: 'PS', color: '#6366f1', online: true },
    { id: 's2', name: 'Vikram Singh', avatar: 'VS', color: '#0ea5e9', online: false },
    { id: 's3', name: 'Aarav Patel', avatar: 'AP', color: '#f59e0b', online: true },
    { id: 's4', name: 'Isha Reddy', avatar: 'IR', color: '#f43f5e', online: true },
    { id: 's5', name: 'Sana Sheikh', avatar: 'SS', color: '#10b981', online: true },
    { id: 's6', name: 'Pooja Tiwari', avatar: 'PT', color: '#8b5cf6', online: false },
    { id: 's7', name: 'Rohan Mehra', avatar: 'RM', color: '#ec4899', online: true },
    { id: 's8', name: 'Ananya Gupta', avatar: 'AG', color: '#14b8a6', online: false },
    { id: 's9', name: 'Kabir Das', avatar: 'KD', color: '#f97316', online: false },
    { id: 's10', name: 'Meera Iyer', avatar: 'MI', color: '#06b6d4', online: true },
    { id: 's11', name: 'Arjun Nair', avatar: 'AN', color: '#8b5cf6', online: false },
    { id: 's12', name: 'Riya Jain', avatar: 'RJ', color: '#10b981', online: true },
    { id: 's13', name: 'Kunal Joshi', avatar: 'KJ', color: '#f59e0b', online: false },
    { id: 's14', name: 'Tara Verma', avatar: 'TV', color: '#6366f1', online: true },
    { id: 's15', name: 'Omkar Rao', avatar: 'OR', color: '#f43f5e', online: false },
    { id: 's16', name: 'Nisha Thakur', avatar: 'NT', color: '#ec4899', online: true },
    { id: 's17', name: 'Rahul Chawla', avatar: 'RC', color: '#14b8a6', online: false },
    { id: 's18', name: 'Simran Kaur', avatar: 'SK', color: '#0ea5e9', online: true },
    { id: 's19', name: 'Yash Mehta', avatar: 'YM', color: '#8b5cf6', online: false },
    { id: 's20', name: 'Dev Desai', avatar: 'DD', color: '#10b981', online: true },
];

const CN_STUDENTS = [
    { id: 'c1', name: 'Amit Kumar', avatar: 'AK', color: '#14b8a6', online: false },
    { id: 'c2', name: 'Neha Gupta', avatar: 'NG', color: '#ec4899', online: true },
    { id: 'c3', name: 'Rajiv Menon', avatar: 'RM', color: '#6366f1', online: false },
    { id: 'c4', name: 'Sneha Roy', avatar: 'SR', color: '#f59e0b', online: true },
    { id: 'c5', name: 'Varun Sharma', avatar: 'VS', color: '#f43f5e', online: false },
    { id: 'c6', name: 'Kriti Prasad', avatar: 'KP', color: '#10b981', online: true },
    { id: 'c7', name: 'Siddharth Bose', avatar: 'SB', color: '#0ea5e9', online: false },
    { id: 'c8', name: 'Alia Khan', avatar: 'AK', color: '#f97316', online: true },
    { id: 'c9', name: 'Rishabh Pandey', avatar: 'RP', color: '#8b5cf6', online: false },
    { id: 'c10', name: 'Diya Shah', avatar: 'DS', color: '#14b8a6', online: true },
    { id: 'c11', name: 'Ravi Singh', avatar: 'RS', color: '#6366f1', online: false },
    { id: 'c12', name: 'Kavya Soni', avatar: 'KS', color: '#ec4899', online: true },
    { id: 'c13', name: 'Vivek Yadav', avatar: 'VY', color: '#f59e0b', online: true },
    { id: 'c14', name: 'Kiran Reddy', avatar: 'KR', color: '#10b981', online: false },
    { id: 'c15', name: 'Sahil Kapoor', avatar: 'SK', color: '#0ea5e9', online: true },
    { id: 'c16', name: 'Kareena Das', avatar: 'KD', color: '#f43f5e', online: false },
    { id: 'c17', name: 'Samir Ali', avatar: 'SA', color: '#8b5cf6', online: true },
    { id: 'c18', name: 'Sara Khan', avatar: 'SH', color: '#14b8a6', online: false },
    { id: 'c19', name: 'Karan Aaryan', avatar: 'KA', color: '#f97316', online: true },
    { id: 'c20', name: 'Janhvi Pillai', avatar: 'JP', color: '#6366f1', online: true },
];

/* Group definitions for Teacher */
const TEACHER_GROUPS = [
    {
        id: 'grp_os',
        type: 'group',
        name: 'Operating Systems',
        subtitle: 'CS-401 · Semester 4',
        avatar: '💻',
        color: '#6366f1',
        members: OS_STUDENTS,
        icon: '💻',
    },
    {
        id: 'grp_cn',
        type: 'group',
        name: 'Computer Networks',
        subtitle: 'CS-402 · Semester 4',
        avatar: '🌐',
        color: '#0ea5e9',
        members: CN_STUDENTS,
        icon: '🌐',
    },
];

/* Teacher individual student contacts (subset) */
const TEACHER_TO_STUDENT_CONTACTS = [...OS_STUDENTS.slice(0, 6).map(s => ({ ...s, type: 'individual', course: 'Operating Systems' })),
...CN_STUDENTS.slice(0, 4).map(s => ({ ...s, type: 'individual', course: 'Computer Networks' }))];

/* Student receives messages */
const STUDENT_CONTACTS = [
    { id: 'teacher1', name: 'Dr. Anand Sharma', role: 'Teacher', course: 'Operating Systems', avatar: 'AS', color: '#6366f1', online: true },
    { id: 'teacher2', name: 'Prof. Priya Desai', role: 'Teacher', course: 'Computer Networks', avatar: 'PD', color: '#0ea5e9', online: false },
];

/* ── Seed messages ── */
const SEED_MESSAGES = {
    t1: [
        { id: 1, from: 'them', text: 'Good morning! Could you please send the updated syllabus for CS-401 by EOD?', time: '09:15 AM', date: 'Yesterday' },
        { id: 2, from: 'me', text: 'Good morning! Of course, I will send it over by 5 PM.', time: '09:22 AM', date: 'Yesterday' },
        { id: 3, from: 'them', text: 'Thank you! Also, please make sure the grading criteria is included.', time: '09:25 AM', date: 'Yesterday' },
        { id: 4, from: 'me', text: 'Noted! I will include all the grading rubrics and assessment details.', time: '09:30 AM', date: 'Yesterday' },
    ],
    t2: [
        { id: 1, from: 'them', text: 'Hello Admin, the mid-term results have been uploaded to the portal.', time: '02:10 PM', date: 'Feb 20' },
        { id: 2, from: 'me', text: 'Excellent, Prof. Desai! I will review them shortly.', time: '02:35 PM', date: 'Feb 20' },
    ],
    grp_os: [
        { id: 1, from: 'me', text: '📢 Good morning, class! Please ensure Chapter 3 — Process Synchronisation — is completed before our next lecture.', time: '09:00 AM', date: 'Yesterday', senderName: 'Dr. Anand Sharma' },
        { id: 2, from: 'group', senderId: 's5', senderName: 'Sana Sheikh', text: 'Understood sir! Will the Semaphore section also be covered in the quiz?', time: '09:12 AM', date: 'Yesterday' },
        { id: 3, from: 'group', senderId: 's1', senderName: 'Priya Sharma', text: 'Sir, could you please share the practice problems PDF?', time: '09:18 AM', date: 'Yesterday' },
        { id: 4, from: 'me', text: 'Yes, the Semaphore section is important. I\'ll share the practice problems by today evening. 📄', time: '09:22 AM', date: 'Yesterday', senderName: 'Dr. Anand Sharma' },
        { id: 5, from: 'group', senderId: 's3', senderName: 'Aarav Patel', text: 'Thank you, sir! Looking forward to it.', time: '09:25 AM', date: 'Yesterday' },
    ],
    grp_cn: [
        { id: 1, from: 'me', text: '📢 Reminder: Wireshark Lab session tomorrow — bring your laptops. Lab 5, 10 AM sharp.', time: '04:00 PM', date: 'Feb 21', senderName: 'Dr. Anand Sharma' },
        { id: 2, from: 'group', senderId: 'c2', senderName: 'Neha Gupta', text: 'Sir, should we install Wireshark before coming?', time: '04:15 PM', date: 'Feb 21' },
        { id: 3, from: 'me', text: 'Yes, please pre-install Wireshark 4.x. I\'ll share the lab manual in the portal tonight.', time: '04:20 PM', date: 'Feb 21', senderName: 'Dr. Anand Sharma' },
        { id: 4, from: 'group', senderId: 'c8', senderName: 'Alia Khan', text: 'Thank you sir! 🙏', time: '04:22 PM', date: 'Feb 21' },
        { id: 5, from: 'group', senderId: 'c13', senderName: 'Vivek Yadav', text: 'Looking forward to the lab session!', time: '04:30 PM', date: 'Feb 21' },
    ],
    s1: [
        { id: 1, from: 'me', text: 'Hi Priya! Your submission for Assignment 1 was excellent. Keep it up! 🎉', time: '11:00 AM', date: 'Yesterday' },
        { id: 2, from: 'them', text: 'Thank you so much, sir! I worked really hard on it.', time: '11:15 AM', date: 'Yesterday' },
        { id: 3, from: 'me', text: 'It shows. Your understanding of process scheduling was very clear.', time: '11:18 AM', date: 'Yesterday' },
    ],
    s5: [
        { id: 1, from: 'me', text: 'Sana, please submit Assignment 2 before the deadline. I noticed it is still pending.', time: '03:00 PM', date: 'Feb 21' },
        { id: 2, from: 'them', text: 'I will submit it tonight, sir. I had some questions about the memory management section.', time: '03:14 PM', date: 'Feb 21' },
        { id: 3, from: 'me', text: 'Sure! Come to my office hours tomorrow at 10 AM and we can discuss it.', time: '03:16 PM', date: 'Feb 21' },
    ],
    teacher1: [
        { id: 1, from: 'them', text: 'Hi! Please complete Assignment 2 on Memory Management before March 1st.', time: '10:00 AM', date: 'Feb 22' },
        { id: 2, from: 'me', text: 'Sure, I will submit it on time. I have a few doubts about paging.', time: '10:45 AM', date: 'Feb 22' },
        { id: 3, from: 'them', text: 'Great! Come to my office hours tomorrow at 10 AM and we can go over paging together.', time: '11:00 AM', date: 'Feb 22' },
    ],
};

const QUICK_REPLIES = {
    ADMIN: ['Will do! 👍', 'Please submit the report by Friday.', 'Meeting scheduled for Monday 10 AM.', 'Noted, I will follow up.', 'Thank you for the update!'],
    TEACHER: ['📢 Reminder: assignment due soon!', '✅ Well done, class!', '📅 Office hours: Mon & Wed 10–11 AM', '📚 Check the portal for updates.', '⚠️ Please complete before the deadline.'],
    GROUP: ['📢 Important announcement for the class.', '⏰ Assignment deadline approaching!', '✅ Great work everyone!', '📚 New material uploaded to portal.', '🗓️ Rescheduled to next week.'],
    STUDENT: ["Thank you, sir/ma'am!", 'I will submit it on time.', 'Understood, I will review the material.', 'Can I come to office hours?', 'I have a doubt about the topic.'],
};

const EMOJI_QUICK = ['👍', '🎉', '✅', '📚', '⚠️', '🕐', '📅', '🙏', '😊', '🔥'];

/* ══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════════════ */

/* Individual avatar */
function Avatar({ contact, size = 44, showOnline = true }) {
    const isGroup = contact.type === 'group';
    return (
        <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
                width: size, height: size, borderRadius: isGroup ? '14px' : '50%',
                background: isGroup
                    ? `linear-gradient(135deg, ${contact.color}dd, ${contact.color})`
                    : `linear-gradient(135deg, ${contact.color}cc, ${contact.color})`,
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: isGroup ? size * 0.45 : size * 0.35,
                letterSpacing: '-0.5px', boxShadow: isGroup ? `0 4px 12px ${contact.color}44` : 'none',
            }}>
                {contact.avatar}
            </div>
            {showOnline && !isGroup && (
                <div style={{
                    position: 'absolute', bottom: 1, right: 1,
                    width: size * 0.3, height: size * 0.3, borderRadius: '50%',
                    background: contact.online ? '#10b981' : '#cbd5e1',
                    border: '2px solid white',
                }} />
            )}
            {isGroup && (
                <div style={{
                    position: 'absolute', bottom: -3, right: -3, background: '#10b981',
                    color: 'white', fontSize: '9px', fontWeight: 800,
                    borderRadius: '8px', padding: '1px 5px', border: '2px solid white',
                    whiteSpace: 'nowrap',
                }}>
                    {contact.members.length}
                </div>
            )}
        </div>
    );
}

/* Group member stack (overlapping avatars) */
function MemberStack({ members, max = 5 }) {
    const visible = members.slice(0, max);
    const extra = members.length - max;
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {visible.map((m, i) => (
                <div key={m.id} style={{
                    width: 28, height: 28, borderRadius: '50%', border: '2px solid white',
                    background: `linear-gradient(135deg,${m.color}cc,${m.color})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: 800, color: 'white',
                    marginLeft: i === 0 ? 0 : -8, zIndex: visible.length - i,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                }}>
                    {m.avatar}
                </div>
            ))}
            {extra > 0 && (
                <div style={{
                    width: 28, height: 28, borderRadius: '50%', border: '2px solid white',
                    background: '#64748b', color: 'white', fontSize: '9px', fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginLeft: -8, zIndex: 0,
                }}>
                    +{extra}
                </div>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PANEL
══════════════════════════════════════════════════════════════ */
export default function MessagingPanel({ senderRole = 'ADMIN' }) {

    /* ── resolve contacts & groups by role ── */
    const isTeacher = senderRole === 'TEACHER';
    const adminContacts = ADMIN_TO_TEACHER_CONTACTS;
    const studentContacts = STUDENT_CONTACTS;

    /* Teacher sidebar view: 'groups' | 'direct' */
    const [teacherView, setTeacherView] = useState('groups');
    const [expandedGroupMembers, setExpandedGroupMembers] = useState(null); // group id

    const allItems = isTeacher
        ? (teacherView === 'groups' ? TEACHER_GROUPS : TEACHER_TO_STUDENT_CONTACTS)
        : (senderRole === 'ADMIN' ? adminContacts : studentContacts);

    const quickReplies = senderRole === 'ADMIN' ? QUICK_REPLIES.ADMIN
        : senderRole === 'STUDENT' ? QUICK_REPLIES.STUDENT
            : QUICK_REPLIES.TEACHER;

    /* ── state ── */
    const [selectedItem, setSelectedItem] = useState(() =>
        isTeacher ? TEACHER_GROUPS[0] : (senderRole === 'ADMIN' ? adminContacts[0] : studentContacts[0])
    );
    const [messages, setMessages] = useState(() => {
        const init = {};
        [...TEACHER_GROUPS, ...TEACHER_TO_STUDENT_CONTACTS, ...adminContacts, ...studentContacts]
            .forEach(c => { init[c.id] = SEED_MESSAGES[c.id] || []; });
        return init;
    });
    const [inputText, setInputText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiBar, setShowEmojiBar] = useState(false);
    const [unread, setUnread] = useState(() => ({
        t2: 1, grp_os: 2, grp_cn: 1,
    }));
    const [animatingMsg, setAnimatingMsg] = useState(null);
    const chatEndRef = useRef(null);
    const typingTimerRef = useRef(null);

    const currentMessages = messages[selectedItem?.id] || [];
    const isGroupChat = selectedItem?.type === 'group';

    /* auto-scroll */
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentMessages, selectedItem]);

    /* clear unread */
    useEffect(() => {
        if (selectedItem) setUnread(prev => { const n = { ...prev }; delete n[selectedItem.id]; return n; });
    }, [selectedItem]);

    /* switch to groups when switching to TEACHER view */
    const handleTeacherViewChange = (v) => {
        setTeacherView(v);
        setSelectedItem(v === 'groups' ? TEACHER_GROUPS[0] : TEACHER_TO_STUDENT_CONTACTS[0]);
        setSearchQuery('');
    };

    /* ── send message ── */
    const sendMessage = (text) => {
        if (!text.trim() || !selectedItem) return;

        const now = new Date();
        const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

        const msg = {
            id: Date.now(), from: 'me', text: text.trim(), time, date: 'Today',
            senderName: isGroupChat ? 'Dr. Anand Sharma' : undefined,
        };

        setAnimatingMsg(msg.id);
        setMessages(prev => ({ ...prev, [selectedItem.id]: [...(prev[selectedItem.id] || []), msg] }));
        setInputText('');
        setShowEmojiBar(false);

        /* simulate a student reply in group */
        if (isGroupChat && Math.random() > 0.35) {
            setIsTyping(true);
            const members = selectedItem.members;
            const replier = members[Math.floor(Math.random() * members.length)];
            const groupReplies = [
                'Understood, sir! 🙏', 'Thank you for the update!', 'Noted sir, will do.',
                'Got it! Will check the portal.', '✅ Okay sir!',
                'Thank you for the reminder!', 'Will be there on time!',
            ];
            setTimeout(() => {
                setIsTyping(false);
                const reply = {
                    id: Date.now() + 1, from: 'group',
                    senderId: replier.id, senderName: replier.name,
                    text: groupReplies[Math.floor(Math.random() * groupReplies.length)],
                    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                    date: 'Today',
                };
                setMessages(prev => ({ ...prev, [selectedItem.id]: [...(prev[selectedItem.id] || []), reply] }));
            }, 1500 + Math.random() * 1000);
        }
        /* individual reply */
        if (!isGroupChat && ['t1', 't3', 's2', 's5', 'teacher1'].includes(selectedItem.id) && Math.random() > 0.4) {
            setIsTyping(true);
            const responses = ['Got it, thank you! 👍', 'Sure, I will take care of it.', 'Understood! Thanks.', 'Noted! Will do.'];
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => ({
                    ...prev, [selectedItem.id]: [...(prev[selectedItem.id] || []), {
                        id: Date.now() + 1, from: 'them',
                        text: responses[Math.floor(Math.random() * responses.length)],
                        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                        date: 'Today',
                    }]
                }));
            }, 1800 + Math.random() * 800);
        }
        setTimeout(() => setAnimatingMsg(null), 600);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(inputText); }
        clearTimeout(typingTimerRef.current);
    };

    /* ── filtered list ── */
    const filteredItems = allItems.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ((c.dept || c.course || c.subtitle || '')).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const lastMsgPreview = (item) => {
        const msgs = messages[item.id] || [];
        if (!msgs.length) return 'No messages yet';
        const last = msgs[msgs.length - 1];
        if (last.from === 'me') return 'You: ' + last.text;
        if (last.from === 'group') return `${last.senderName?.split(' ')[0]}: ${last.text}`;
        return last.text;
    };

    const onlineCount = isTeacher
        ? (teacherView === 'groups'
            ? TEACHER_GROUPS.reduce((a, g) => a + g.members.filter(m => m.online).length, 0)
            : TEACHER_TO_STUDENT_CONTACTS.filter(c => c.online).length)
        : (senderRole === 'ADMIN' ? adminContacts.filter(c => c.online).length : studentContacts.filter(c => c.online).length);

    const totalMessages = Object.values(messages).flat().length;

    /* group quick replies */
    const activeQuickReplies = (isGroupChat ? QUICK_REPLIES.GROUP : quickReplies);

    /* selected contact color (groups use their colour) */
    const accentColor = selectedItem?.color || '#6366f1';

    /* member who replied – find from selectedItem.members */
    const findMember = (id) => {
        if (!isGroupChat) return null;
        return selectedItem.members.find(m => m.id === id);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
        }}>

            {/* ── Page Hero ── */}
            <div style={{
                background: senderRole === 'ADMIN'
                    ? 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#db2777 100%)'
                    : senderRole === 'TEACHER'
                        ? 'linear-gradient(135deg,#0f766e 0%,#6366f1 55%,#8b5cf6 100%)'
                        : 'linear-gradient(135deg,#0284c7 0%,#6366f1 55%,#8b5cf6 100%)',
                borderRadius: '20px', padding: '20px 28px 18px', marginBottom: '16px',
                color: 'white', position: 'relative', overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(99,102,241,0.25)',
                flexShrink: 0,
            }}>
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ position: 'absolute', bottom: '-40px', right: '60px', width: '110px', height: '110px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                <div style={{ position: 'absolute', top: '10px', left: '40%', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.75, marginBottom: '6px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ display: 'inline-block', width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>💬</span>
                    Messaging Center
                </div>
                <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px', letterSpacing: '-0.3px' }}>
                    {senderRole === 'ADMIN' ? 'Message Teachers'
                        : senderRole === 'TEACHER' ? 'Message Students & Groups'
                            : 'Messages from Teachers'}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.88, marginBottom: '10px' }}>
                    {senderRole === 'TEACHER'
                        ? `${TEACHER_GROUPS.length} Subject Groups · ${TEACHER_TO_STUDENT_CONTACTS.length} Individual Students · ${onlineCount} members online`
                        : `${onlineCount} online now`}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '2px' }}>
                    {[
                        { icon: '🟢', label: `${onlineCount} Online` },
                        { icon: '💬', label: `${totalMessages} Messages` },
                        { icon: '🔔', label: `${Object.keys(unread).length} Unread` },
                        ...(senderRole === 'TEACHER' ? [{ icon: '👥', label: `${TEACHER_GROUPS.length} Groups` }] : []),
                    ].map((chip, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', borderRadius: '20px', padding: '5px 12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            {chip.icon} {chip.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Main Panel ── */}
            <div style={{ display: 'flex', flex: 1, minHeight: 0, background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)' }}>

                {/* ════════ LEFT SIDEBAR ════════ */}
                <div style={{ width: '270px', borderRight: '1px solid #e8ecf4', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg,#f8faff 0%,#f4f6fd 100%)', flexShrink: 0, minHeight: 0 }}>

                    {/* Teacher: toggle Groups / Direct */}
                    {isTeacher && (
                        <div style={{ padding: '12px 14px', borderBottom: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '12px', padding: '3px', gap: '2px' }}>
                                {[
                                    { v: 'groups', label: '📚 Groups', count: TEACHER_GROUPS.length },
                                    { v: 'direct', label: '👤 Direct', count: TEACHER_TO_STUDENT_CONTACTS.length },
                                ].map(tab => (
                                    <button key={tab.v} onClick={() => handleTeacherViewChange(tab.v)} style={{
                                        flex: 1, padding: '8px 4px',
                                        borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '12px',
                                        transition: 'all 0.2s',
                                        background: teacherView === tab.v ? 'white' : 'transparent',
                                        color: teacherView === tab.v ? '#6366f1' : '#64748b',
                                        boxShadow: teacherView === tab.v ? '0 2px 8px rgba(0,0,0,0.10)' : 'none',
                                    }}>
                                        {tab.label}
                                        <span style={{ marginLeft: '4px', background: teacherView === tab.v ? '#6366f1' : 'rgba(0,0,0,0.08)', color: teacherView === tab.v ? 'white' : '#64748b', borderRadius: '8px', padding: '1px 6px', fontSize: '10px' }}>{tab.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Search */}
                    <div style={{ padding: '12px 14px', borderBottom: '1px solid #e2e8f0' }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', opacity: 0.4 }}>🔍</span>
                            <input
                                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                placeholder={isTeacher && teacherView === 'groups' ? 'Search subjects…' : 'Search…'}
                                style={{
                                    width: '100%', padding: '9px 10px 9px 32px',
                                    borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '13px',
                                    background: '#f8faff', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
                                }}
                                onFocus={e => e.target.style.borderColor = '#6366f1'}
                                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                            />
                        </div>
                    </div>

                    {/* Section label */}
                    <div style={{ padding: '8px 16px 4px', fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                        <span>{isTeacher && teacherView === 'groups' ? '📚 Subject Groups' : isTeacher ? '👤 Students' : senderRole === 'ADMIN' ? '👨‍🏫 Teachers' : '👩‍🏫 Teachers'}</span>
                        <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                    </div>

                    {/* Contact / Group list */}
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {filteredItems.map((item, idx) => {
                            const isSelected = selectedItem?.id === item.id;
                            const hasUnread = unread[item.id];
                            const isGrp = item.type === 'group';
                            const onlineMembers = isGrp ? item.members.filter(m => m.online).length : 0;
                            return (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedItem(item)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '12px',
                                        padding: '12px 14px', cursor: 'pointer',
                                        background: isSelected ? `linear-gradient(90deg,${item.color}15,${item.color}06)` : 'transparent',
                                        borderLeft: isSelected ? `3px solid ${item.color}` : '3px solid transparent',
                                        transition: 'all 0.2s',
                                        animation: `fadeInLeft 0.3s ease ${idx * 0.04}s both`,
                                    }}
                                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(0,0,0,0.03)'; }}
                                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                                >
                                    <Avatar contact={item} size={44} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                            <div style={{ fontWeight: hasUnread ? 800 : 600, fontSize: '13px', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                                                {item.name}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                                                {isGrp && (
                                                    <span style={{ fontSize: '9px', fontWeight: 800, color: item.color, background: `${item.color}15`, padding: '1px 6px', borderRadius: '6px', border: `1px solid ${item.color}30` }}>
                                                        BROADCAST
                                                    </span>
                                                )}
                                                {hasUnread && (
                                                    <div style={{ minWidth: '18px', height: '18px', borderRadius: '9px', background: item.color, color: 'white', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        {hasUnread}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '2px' }}>
                                            {isGrp
                                                ? <span>👥 {item.members.length} students · 🟢 {onlineMembers} online</span>
                                                : (item.dept || item.course || item.subtitle || '')}
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {lastMsgPreview(item)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {filteredItems.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                                <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔍</div>
                                <div style={{ fontSize: '13px' }}>Nothing found</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ════════ RIGHT: CHAT WINDOW ════════ */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', minHeight: 0, minWidth: 0 }}>
                    {selectedItem ? (
                        <>
                            {/* Chat Header */}
                            <div style={{ padding: '14px 22px', borderBottom: '1px solid #e2e8f0', background: '#fafbff' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <Avatar contact={selectedItem} size={46} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                            <div style={{ fontWeight: 800, fontSize: '16px', color: '#1e293b' }}>{selectedItem.name}</div>
                                            {isGroupChat && (
                                                <span style={{ fontSize: '10px', fontWeight: 800, color: accentColor, background: `${accentColor}15`, padding: '2px 8px', borderRadius: '6px', border: `1px solid ${accentColor}30` }}>
                                                    📢 BROADCAST GROUP
                                                </span>
                                            )}
                                        </div>
                                        {isGroupChat ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                                                <MemberStack members={selectedItem.members} max={6} />
                                                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                                                    {selectedItem.members.length} students · {selectedItem.members.filter(m => m.online).length} online
                                                </span>
                                            </div>
                                        ) : (
                                            <div style={{ fontSize: '12px', color: selectedItem.online ? '#10b981' : '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                                                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: selectedItem.online ? '#10b981' : '#cbd5e1' }} />
                                                {selectedItem.online ? 'Online' : 'Offline'} · {selectedItem.dept || selectedItem.course || selectedItem.subtitle}
                                            </div>
                                        )}
                                    </div>
                                    {/* Action buttons */}
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {isGroupChat && (
                                            <button
                                                onClick={() => setExpandedGroupMembers(expandedGroupMembers === selectedItem.id ? null : selectedItem.id)}
                                                style={{ height: '34px', padding: '0 12px', borderRadius: '10px', border: `1px solid ${accentColor}40`, background: expandedGroupMembers === selectedItem.id ? accentColor : `${accentColor}10`, color: expandedGroupMembers === selectedItem.id ? 'white' : accentColor, fontWeight: 700, fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.2s' }}
                                            >
                                                👥 Members
                                            </button>
                                        )}
                                        {[{ icon: '🔍', title: 'Search' }, { icon: '👤', title: 'Profile' }].map((btn, i) => (
                                            <button key={i} title={btn.title} style={{ width: '34px', height: '34px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', transition: 'all 0.2s' }}
                                                onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'scale(1)'; }}>
                                                {btn.icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Expanded members panel */}
                                {isGroupChat && expandedGroupMembers === selectedItem.id && (
                                    <div style={{ marginTop: '14px', padding: '14px', background: `${accentColor}06`, borderRadius: '14px', border: `1px solid ${accentColor}20`, animation: 'slideUp 0.25s ease' }}>
                                        <div style={{ fontSize: '11px', fontWeight: 800, color: accentColor, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                                            📋 {selectedItem.name} — All {selectedItem.members.length} Students
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '100px', overflowY: 'auto' }}>
                                            {selectedItem.members.map(m => (
                                                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '20px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: `linear-gradient(135deg,${m.color}cc,${m.color})`, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 800 }}>{m.avatar}</div>
                                                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#334155', whiteSpace: 'nowrap' }}>{m.name}</span>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: m.online ? '#10b981' : '#cbd5e1', flexShrink: 0 }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Group broadcast info bar */}
                            {isGroupChat && (
                                <div style={{ padding: '8px 22px', background: `linear-gradient(90deg,${accentColor}0a,transparent)`, borderBottom: `1px dashed ${accentColor}30`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '16px' }}>📢</span>
                                    <span style={{ fontSize: '12px', color: accentColor, fontWeight: 700 }}>
                                        Broadcast Mode — Your message will be sent to all {selectedItem.members.length} students in {selectedItem.name}
                                    </span>
                                </div>
                            )}

                            {/* Messages area */}
                            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '2px', background: 'linear-gradient(180deg,#f5f7ff 0%,#fafbff 40%,#fff 100%)' }}>
                                {currentMessages.length > 0 && <div style={{ flex: 1, minHeight: '20px' }}></div>}
                                {currentMessages.length === 0 && (
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5, textAlign: 'center' }}>
                                        <div style={{ fontSize: '52px', marginBottom: '12px' }}>{isGroupChat ? '📢' : '💬'}</div>
                                        <div style={{ fontSize: '15px', fontWeight: 700, color: '#64748b' }}>
                                            {isGroupChat ? `Start broadcasting to ${selectedItem.name}` : 'Start a conversation'}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                                            {isGroupChat ? `All ${selectedItem.members.length} students will receive your message` : `Send your first message to ${selectedItem.name}`}
                                        </div>
                                    </div>
                                )}

                                {(() => {
                                    let lastDate = null;
                                    return currentMessages.map((msg) => {
                                        const isMe = msg.from === 'me';
                                        const isGroupReply = msg.from === 'group';
                                        const showDate = msg.date !== lastDate;
                                        lastDate = msg.date;
                                        const isNew = msg.id === animatingMsg;
                                        const member = isGroupReply ? findMember(msg.senderId) : null;
                                        const memberColor = member?.color || '#64748b';

                                        return (
                                            <div key={msg.id}>
                                                {showDate && (
                                                    <div style={{ textAlign: 'center', margin: '16px 0 8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                                                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', whiteSpace: 'nowrap', background: '#f8faff', padding: '2px 10px', borderRadius: '20px' }}>{msg.date}</span>
                                                        <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                                                    </div>
                                                )}
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: isMe ? 'flex-end' : 'flex-start',
                                                    marginBottom: '8px', alignItems: 'flex-end', gap: '8px',
                                                    animation: isNew ? 'msgBounceIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275)' : 'none',
                                                }}>
                                                    {/* Left avatar for incoming */}
                                                    {!isMe && (
                                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg,${memberColor}cc,${memberColor})`, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0, marginBottom: '4px', boxShadow: `0 2px 6px ${memberColor}33` }}>
                                                            {isGroupReply ? (member?.avatar || msg.senderName?.[0] || '?') : selectedItem.avatar}
                                                        </div>
                                                    )}
                                                    <div style={{ maxWidth: '62%' }}>
                                                        {/* sender name for group replies */}
                                                        {isGroupReply && (
                                                            <div style={{ fontSize: '10px', fontWeight: 700, color: memberColor, marginBottom: '3px', paddingLeft: '2px' }}>
                                                                {msg.senderName}
                                                            </div>
                                                        )}
                                                        {/* teacher broadcast label */}
                                                        {isMe && isGroupChat && (
                                                            <div style={{ fontSize: '10px', fontWeight: 700, color: accentColor, textAlign: 'right', marginBottom: '3px' }}>
                                                                📢 Sent to all {selectedItem.members.length} students
                                                            </div>
                                                        )}
                                                        <div style={{
                                                            padding: '10px 16px',
                                                            borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                                            background: isMe
                                                                ? `linear-gradient(135deg,${accentColor},${accentColor}dd)`
                                                                : 'white',
                                                            color: isMe ? 'white' : '#1e293b',
                                                            fontSize: '14px', lineHeight: '1.55',
                                                            boxShadow: isMe ? `0 4px 12px ${accentColor}33` : '0 2px 8px rgba(0,0,0,0.06)',
                                                            border: isMe ? 'none' : '1px solid #e2e8f0',
                                                            wordBreak: 'break-word',
                                                        }}>
                                                            {msg.text}
                                                        </div>
                                                        <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '3px', textAlign: isMe ? 'right' : 'left' }}>
                                                            {msg.time} {isMe && '✓✓'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    });
                                })()}

                                {/* Typing indicator */}
                                {isTyping && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', animation: 'fadeIn 0.3s ease' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg,${accentColor}cc,${accentColor})`, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                                            {isGroupChat ? '👤' : selectedItem.avatar}
                                        </div>
                                        <div style={{ padding: '10px 16px', borderRadius: '20px 20px 20px 4px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                                            {[0, 1, 2].map(i => (
                                                <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#94a3b8', animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                                            ))}
                                        </div>
                                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                                            {isGroupChat ? 'A student is typing…' : 'typing…'}
                                        </span>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Quick Replies */}
                            <div style={{ padding: '8px 16px 0', borderTop: '1px solid #e2e8f0', background: '#fafbff', display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
                                {activeQuickReplies.map((qr, i) => (
                                    <button key={i} onClick={() => sendMessage(qr)} style={{
                                        padding: '5px 12px', borderRadius: '20px',
                                        border: `1px solid ${accentColor}40`, background: `${accentColor}0d`, color: accentColor,
                                        fontSize: '11px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s',
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.background = `${accentColor}20`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = `${accentColor}0d`; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                        {qr}
                                    </button>
                                ))}
                            </div>

                            {/* Emoji bar */}
                            {showEmojiBar && (
                                <div style={{ padding: '8px 16px', display: 'flex', gap: '6px', background: '#fafbff', borderTop: '1px solid #e2e8f0', animation: 'slideUp 0.2s ease' }}>
                                    {EMOJI_QUICK.map(em => (
                                        <button key={em} onClick={() => setInputText(p => p + em)} style={{ fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px', borderRadius: '6px', transition: 'transform 0.15s' }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.3)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                        >{em}</button>
                                    ))}
                                </div>
                            )}

                            {/* Input */}
                            <div style={{ padding: '12px 16px 16px', borderTop: '1px solid #e2e8f0', background: '#fafbff', display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                                <button onClick={() => setShowEmojiBar(v => !v)} style={{ width: '38px', height: '38px', borderRadius: '10px', border: '1px solid #e2e8f0', background: showEmojiBar ? accentColor : 'white', color: showEmojiBar ? 'white' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', transition: 'all 0.2s', flexShrink: 0 }}>😊</button>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <textarea
                                        value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={handleKeyDown}
                                        placeholder={isGroupChat ? `Broadcast to all ${selectedItem.members.length} students in ${selectedItem.name}…` : `Message ${selectedItem.name}…`}
                                        rows={1}
                                        style={{
                                            width: '100%', padding: '10px 14px',
                                            borderRadius: '14px', border: `1.5px solid ${inputText ? accentColor : '#e2e8f0'}`,
                                            fontSize: '14px', resize: 'none', outline: 'none',
                                            background: 'white', boxSizing: 'border-box', lineHeight: '1.5',
                                            maxHeight: '100px', overflow: 'auto', transition: 'border-color 0.2s, box-shadow 0.2s',
                                            boxShadow: inputText ? `0 0 0 3px ${accentColor}15` : 'none',
                                        }}
                                    />
                                </div>
                                <button
                                    onClick={() => sendMessage(inputText)} disabled={!inputText.trim()}
                                    style={{
                                        width: '44px', height: '44px', borderRadius: '12px',
                                        background: inputText.trim() ? `linear-gradient(135deg,${accentColor},${accentColor}cc)` : '#e2e8f0',
                                        border: 'none', color: inputText.trim() ? 'white' : '#94a3b8',
                                        cursor: inputText.trim() ? 'pointer' : 'default',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                                        transition: 'all 0.2s', flexShrink: 0,
                                        transform: inputText.trim() ? 'rotate(-40deg)' : 'none',
                                        boxShadow: inputText.trim() ? `0 4px 14px ${accentColor}44` : 'none',
                                    }}
                                    onMouseEnter={e => { if (inputText.trim()) e.currentTarget.style.transform = 'scale(1.08) rotate(-40deg)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = inputText.trim() ? 'rotate(-40deg)' : 'none'; }}
                                >✈</button>
                            </div>
                        </>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
                            <div style={{ fontSize: '56px' }}>💬</div>
                            <div style={{ fontSize: '16px', fontWeight: 600, color: '#64748b', marginTop: '12px' }}>Select a conversation</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Keyframe animations */}
            <style>{`
                @keyframes msgBounceIn {
                    0%   { opacity:0; transform:scale(0.8) translateY(8px); }
                    70%  { transform:scale(1.04) translateY(-2px); }
                    100% { opacity:1; transform:scale(1) translateY(0); }
                }
                @keyframes typingDot {
                    0%,60%,100% { transform:translateY(0); opacity:0.4; }
                    30% { transform:translateY(-5px); opacity:1; }
                }
                @keyframes fadeInLeft {
                    from { opacity:0; transform:translateX(-12px); }
                    to   { opacity:1; transform:translateX(0); }
                }
                @keyframes slideUp {
                    from { opacity:0; transform:translateY(8px); }
                    to   { opacity:1; transform:translateY(0); }
                }
            `}</style>
        </div>
    );
}
