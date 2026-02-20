import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../api/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore session from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('edumanage_token');
        const storedUser = localStorage.getItem('edumanage_user');
        if (storedToken && storedUser) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem('edumanage_token');
                localStorage.removeItem('edumanage_user');
            }
        }
        setLoading(false);
    }, []);

    const login = useCallback((userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
        localStorage.setItem('edumanage_token', jwtToken);
        localStorage.setItem('edumanage_user', JSON.stringify(userData));
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('edumanage_token');
        localStorage.removeItem('edumanage_user');
    }, []);

    const hasRole = useCallback((role) => {
        if (!user?.roles) return false;
        return user.roles.includes(role) || user.roles.includes(`ROLE_${role}`);
    }, [user]);

    const getPrimaryRole = useCallback(() => {
        if (!user?.roles?.length) return 'STUDENT';
        const roleMap = {
            'ROLE_ADMIN': 'ADMIN',
            'ROLE_TEACHER': 'TEACHER',
            'ROLE_PARENT': 'PARENT',
            'ROLE_INSTRUCTOR': 'TEACHER', // Fallback for legacy
            'ROLE_VENDOR': 'PARENT', // Fallback for legacy
            'ROLE_STUDENT': 'STUDENT',
        };
        const priority = ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_PARENT', 'ROLE_STUDENT'];
        for (const r of priority) {
            if (user.roles.includes(r)) return roleMap[r];
        }
        return 'STUDENT';
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, hasRole, getPrimaryRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
