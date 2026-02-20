import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protects routes requiring authentication
export const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="loading-screen"><div className="loading-spinner" /></div>;
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

    if (allowedRoles && allowedRoles.length > 0) {
        const hasAccess = allowedRoles.some(role =>
            user.roles?.includes(role) || user.roles?.includes(`ROLE_${role}`)
        );
        if (!hasAccess) return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

// Redirects authenticated users away from auth pages
export const PublicRoute = ({ children }) => {
    const { user, loading, getPrimaryRole } = useAuth();

    if (loading) return <div className="loading-screen"><div className="loading-spinner" /></div>;
    if (user) {
        const role = getPrimaryRole();
        const redirectMap = {
            ADMIN: '/dashboard/admin',
            TEACHER: '/dashboard/teacher',
            PARENT: '/dashboard/parent',
            STUDENT: '/dashboard/student',
        };
        return <Navigate to={redirectMap[role] || '/dashboard/student'} replace />;
    }

    return children;
};
