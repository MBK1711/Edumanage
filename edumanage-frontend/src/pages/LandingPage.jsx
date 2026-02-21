import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    BookOpen,
    GraduationCap,
    Users,
    Award,
    ArrowRight,
    CheckCircle,
    Globe,
    Zap,
    Layout,
    Shield,
    PlayCircle,
    Menu,
    X,
    ChevronRight,
    Star,
    MapPin,
    Phone,
    Mail,
    Briefcase,
    Clock
} from 'lucide-react';
import '../landing.css';
import '../landing_animations.css';

const DEPARTMENTS = [
    { title: 'Engineering & Technology', desc: 'CSE, ECE, Mechanical & Civil', icon: <Zap size={24} />, duration: '4 Years', placement: '98% Placed', placementIcon: <Briefcase size={14} />, timeIcon: <Clock size={14} /> },
    { title: 'Business & Management', desc: 'MBA, BBA & Executive Programs', icon: <Layout size={24} />, duration: '2 - 3 Years', placement: '95% Placed', placementIcon: <Briefcase size={14} />, timeIcon: <Clock size={14} /> },
    { title: 'Medical Sciences', desc: 'MBBS, Nursing & Pharmacy', icon: <Shield size={24} />, duration: '5.5 Years', placement: '100% Internships', placementIcon: <Briefcase size={14} />, timeIcon: <Clock size={14} /> },
    { title: 'Arts & Humanities', desc: 'Psychology, Literature & History', icon: <BookOpen size={24} />, duration: '3 Years', placement: '88% Placed', placementIcon: <Briefcase size={14} />, timeIcon: <Clock size={14} /> },
    { title: 'Law & Governance', desc: 'LLB, LLM & Public Policy', icon: <Award size={24} />, duration: '5 Years', placement: '92% Placed', placementIcon: <Briefcase size={14} />, timeIcon: <Clock size={14} /> },
    { title: 'Research & Innovation', desc: 'Ph.D. & Post-Doctoral Studies', icon: <Globe size={24} />, duration: '3 - 5 Years', placement: '100% Funded', placementIcon: <Briefcase size={14} />, timeIcon: <Clock size={14} /> },
];

const FEATURES = [
    { title: 'World-Class Faculty', desc: 'Learn from industry veterans and distinguished professors.', icon: <Users size={24} /> },
    { title: 'State-of-the-Art Infrastructure', desc: 'Modern labs, smart classrooms, and vast libraries.', icon: <Layout size={24} /> },
    { title: 'Global Placements', desc: 'Top tier recruiters and international career opportunities.', icon: <Globe size={24} /> },
    { title: 'Vibrant Campus Life', desc: 'Clubs, sports, and cultural festivals.', icon: <Zap size={24} /> },
];

const REVIEWS = [
    { name: "Alex Johnson", role: "Alumni, Class of 2024", text: "EduCampus provided me not just with a degree, but with a worldview. The faculty support is unmatched." },
    { name: "Sarah Williams", role: "Student, Computer Science", text: "The campus facilities and the coding culture here are amazing. Truly a place to grow and innovate." },
    { name: "Dr. Rajesh Kumar", role: "Professor, Physics", text: "Research opportunities here rival the best institutions globally. Proud to be part of this legacy." }
];

export default function LandingPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <div className="landing-page">
            {/* Navbar */}
            <nav className={`landing-nav glass-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
                <div className="container nav-container">
                    <div className="nav-logo">
                        <div className="logo-icon"><GraduationCap size={24} color="white" /></div>
                        <span className="logo-text">EduCampus</span>
                    </div>

                    {/* Desktop Links */}
                    <div className="nav-links">
                        <a href="#portals">Portals</a>
                        <a href="#academics">Academics</a>
                        <a href="#admissions">Admissions</a>
                        <a href="#campus">Campus Life</a>
                    </div>
                    <div className="nav-actions">
                        <button className="btn btn-secondary btn-sm" onClick={() => navigate('/login')}>Sign In</button>
                        <button className="btn btn-primary btn-sm" onClick={() => navigate('/register')}>Apply Now</button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="mobile-menu animate-fade-in">
                        <a href="#portals" onClick={() => setMobileMenuOpen(false)}>Portals</a>
                        <a href="#academics" onClick={() => setMobileMenuOpen(false)}>Academics</a>
                        <a href="#admissions" onClick={() => setMobileMenuOpen(false)}>Admissions</a>
                        <a href="#campus" onClick={() => setMobileMenuOpen(false)}>Campus Life</a>
                        <div className="mobile-actions">
                            <button className="btn btn-secondary btn-full btn-glow" onClick={() => navigate('/login')}>Sign In</button>
                            <button className="btn btn-primary btn-full btn-glow" onClick={() => navigate('/register')}>Apply Now</button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <header className="hero-section">
                <div className="container hero-container">
                    <div className="hero-content">
                        {/* Institution Identity Block */}
                        <div className="institution-block animate-fade-in">
                            <div className="institution-name">EduCampus Institute of Technology</div>
                            <div className="institution-affiliation">
                                <GraduationCap size={13} />
                                Affiliated to <strong>National University of Science &amp; Technology (NUST)</strong>
                                <span className="affil-sep">|</span>
                                <span className="naac-tag">NAAC A++</span>
                            </div>
                        </div>

                        <div className="hero-badge">
                            <Star size={12} fill="currentColor" /> Admissions Open 2026-27
                        </div>
                        <h1 className="hero-title animate-fade-in delay-100">
                            Shaping Leaders for a<br />
                            <span className="text-gradient">Better Tomorrow</span>
                        </h1>
                        <p className="hero-subtitle animate-fade-in delay-200">
                            Join a legacy of excellence. EduCampus offers world-class education,
                            cutting-edge research opportunities, and a vibrant community for future innovators.
                        </p>

                        <div className="hero-cta-group animate-fade-in delay-300">
                            <button className="btn btn-primary btn-lg btn-glow" onClick={() => navigate('/register')}>
                                Explore Programs <ArrowRight size={18} />
                            </button>
                            <button className="btn btn-secondary btn-lg icon-btn btn-glow" onClick={() => navigate('/login')}>
                                <PlayCircle size={18} /> Virtual Tour
                            </button>
                        </div>

                        <div className="hero-stats animate-fade-in delay-400">
                            <div className="stat-item">
                                <span className="stat-num">50k+</span>
                                <span className="stat-lbl">Alumni</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-num">A++</span>
                                <span className="stat-lbl">NAAC Accredited</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-num">95%</span>
                                <span className="stat-lbl">Placement</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-image-wrapper">
                        {/* Abstract Gradient Blob Background */}
                        <div className="hero-blob blob-1"></div>
                        <div className="hero-blob blob-2"></div>

                        {/* Hero Image - Interactive Card */}
                        <div
                            className="hero-card glass-card hover-lift-3d"
                        >
                            <div className="hero-card-header">
                                <div className="user-avatar-lg"><Award size={32} color="white" /></div>
                                <div>
                                    <div className="hero-card-title">University Ranking</div>
                                    <div className="hero-card-subtitle">Top 10 in Innovation</div>
                                </div>
                                <div className="live-indicator">
                                    <span className="blink-dot"></span> #1 Choice
                                </div>
                            </div>
                            <div className="hero-card-body">
                                <div style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Research Output</span>
                                    <span style={{ color: 'var(--success)', fontWeight: '600' }}>+125%</span>
                                </div>
                                <div className="progress-bar-container">
                                    <div className="progress-track"><div className="progress-fill" style={{ width: '92%' }}></div></div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                                    <span className="status-badge"><CheckCircle size={12} /> Engineering</span>
                                    <span className="status-badge"><CheckCircle size={12} /> Medical</span>
                                    <span className="status-badge"><CheckCircle size={12} /> Business</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Portals Section */}
            <section id="portals" className="section-padding portals-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Access Your Portal</h2>
                        <p className="section-subtitle">Select your role to login to your personalized dashboard</p>
                    </div>
                    <div className="portals-grid">
                        {/* Student Panel */}
                        <div className="portal-card glass-card hover-lift-3d" onClick={() => navigate('/login')}>
                            <div className="portal-icon student-icon">
                                <GraduationCap size={32} color="white" />
                            </div>
                            <h3 className="portal-title">Student Panel</h3>
                            <p className="portal-desc">Access course materials, submit assignments, and view your academic progress.</p>
                            <button className="btn-link">Login as Student <ArrowRight size={16} className="arrow" /></button>
                        </div>

                        {/* Teacher Panel */}
                        <div className="portal-card glass-card hover-lift-3d" onClick={() => navigate('/login')}>
                            <div className="portal-icon teacher-icon">
                                <Users size={32} color="white" />
                            </div>
                            <h3 className="portal-title">Teacher Panel</h3>
                            <p className="portal-desc">Manage classes, grade assignments, and monitor your students' performance.</p>
                            <button className="btn-link">Login as Teacher <ArrowRight size={16} className="arrow" /></button>
                        </div>

                        {/* Admin Panel */}
                        <div className="portal-card glass-card hover-lift-3d" onClick={() => navigate('/login')}>
                            <div className="portal-icon admin-icon">
                                <Shield size={32} color="white" />
                            </div>
                            <h3 className="portal-title">Admin Panel</h3>
                            <p className="portal-desc">System administration, user management, analytics, and platform settings.</p>
                            <button className="btn-link">Login as Admin <ArrowRight size={16} className="arrow" /></button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Departments Section */}
            <section id="academics" className="section-padding courses-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Our Premier Programs</h2>
                        <p className="section-subtitle">Diverse schools of study fostering interdisciplinary learning</p>
                    </div>

                    <div className="courses-grid">
                        {DEPARTMENTS.map((dept, idx) => (
                            <div key={idx} className="course-card glass-card hover-lift-3d">
                                <div className="course-icon-wrapper feature-icon-pulse">{dept.icon}</div>
                                <h3 className="course-title">{dept.title}</h3>
                                <p className="course-desc" style={{ marginBottom: '12px' }}>{dept.desc}</p>

                                <div className="course-stats" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Clock size={16} style={{ color: 'var(--primary)' }} />
                                        <span><strong>Duration:</strong> {dept.duration}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Briefcase size={16} style={{ color: 'var(--success)' }} />
                                        <span><strong>Placement:</strong> {dept.placement}</span>
                                    </div>
                                </div>

                                <button className="btn-link" onClick={() => navigate('/register')}>Explore Program <ChevronRight size={16} className="arrow" /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Campus / Features Section */}
            <section id="campus" className="section-padding features-section bg-secondary-subtle">
                <div className="container features-container">
                    <div className="features-image">
                        <div className="feature-blob"></div>
                        <div className="feature-illustration glass-card">
                            <div className="illustration-content">
                                <h3>The EduCampus Experience</h3>
                                <div className="journey-step completed">
                                    <div className="step-icon"><BookOpen size={16} /></div>
                                    <span>Academic Rigor</span>
                                </div>
                                <div className="journey-line"></div>
                                <div className="journey-step active">
                                    <div className="step-icon"><Users size={16} /></div>
                                    <span>Industry Integration</span>
                                </div>
                                <div className="journey-line dashed"></div>
                                <div className="journey-step">
                                    <div className="step-icon"><Zap size={16} /></div>
                                    <span>Career Launchpad</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="features-content">
                        <h2 className="section-title">Why EduCampus Institute?</h2>
                        <p className="section-desc">
                            We are committed to nurturing global citizens through a holistic educational environment that combines academic rigor with practical exposure.
                        </p>

                        <div className="feature-list">
                            {FEATURES.map((feat, idx) => (
                                <div key={idx} className="feature-item hover-lift-3d" style={{ padding: '16px', borderRadius: '16px', transition: 'all 0.3s' }}>
                                    <div className="feature-icon feature-icon-pulse">{feat.icon}</div>
                                    <div>
                                        <h4 className="feature-title">{feat.title}</h4>
                                        <p className="feature-text">{feat.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="reviews" className="section-padding reviews-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Student Voices</h2>
                        <p className="section-subtitle">Hear from our community of achievers</p>
                    </div>
                    <div className="reviews-grid">
                        {REVIEWS.map((review, idx) => (
                            <div key={idx} className="review-card glass-card hover-lift-3d">
                                <div className="review-quote">"</div>
                                <p className="review-text">{review.text}</p>
                                <div className="review-author">
                                    <div className="author-avatar">{review.name.charAt(0)}</div>
                                    <div>
                                        <h4 className="author-name">{review.name}</h4>
                                        <span className="author-role">{review.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="admissions" className="cta-section">
                <div className="container">
                    <div className="cta-card glass-card glow-border">
                        <div className="cta-content">
                            <h2>Begin Your Journey With Us</h2>
                            <p>Applications for the upcoming academic year are now open.</p>
                        </div>
                        <div className="cta-form">
                            <Mail className="cta-icon" size={20} />
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="cta-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className="btn btn-white" onClick={handleSignup}>Start Application</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer-section">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-col">
                            <div className="footer-logo">
                                <GraduationCap size={24} /> EduCampus
                            </div>
                            <p className="footer-about">
                                Empowering minds, enriching lives. An institute dedicated to excellence in education, research, and innovation.
                            </p>
                        </div>
                        <div className="footer-col">
                            <h4>Academics</h4>
                            <a href="#">Undergraduate</a>
                            <a href="#">Postgraduate</a>
                            <a href="#">Ph.D. Programs</a>
                            <a href="#">Distance Learning</a>
                        </div>
                        <div className="footer-col">
                            <h4>Quick Links</h4>
                            <a href="#">Admissions</a>
                            <a href="#">Campus Map</a>
                            <a href="#">Library</a>
                            <a href="#">Alumni Network</a>
                        </div>
                        <div className="footer-col">
                            <h4>Contact Us</h4>
                            <div className="social-links">
                                <a href="#" className="social-icon"><Mail size={16} /> admissions@educampus.edu</a>
                                <a href="#" className="social-icon"><Phone size={16} /> +91 123 456 7890</a>
                                <a href="#" className="social-icon"><MapPin size={16} /> Campus City, India</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2026 <strong>EduCampus Institute of Technology</strong>. All rights reserved.</p>
                        <p className="footer-affiliation">
                            <GraduationCap size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                            Affiliated to <strong>National University of Science &amp; Technology (NUST)</strong> | Approved by AICTE | NAAC A++ Accredited
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
