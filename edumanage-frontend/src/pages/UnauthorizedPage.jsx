import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg-dark)', flexDirection: 'column', gap: '16px', textAlign: 'center', padding: '24px'
        }}>
            <div style={{ fontSize: '64px' }}>🚫</div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)' }}>Access Denied</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
                You don't have permission to access this page. Please contact an administrator.
            </p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: '8px' }}>Go Home</Link>
        </div>
    );
}
