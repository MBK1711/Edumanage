import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import AdminDashboard from './dashboards/AdminDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';
import StudentDashboard from './dashboards/StudentDashboard';

const DASHBOARD_MAP = {
    ADMIN: AdminDashboard,
    TEACHER: TeacherDashboard,
    STUDENT: StudentDashboard,
};

export default function DashboardPage() {
    const { user, getPrimaryRole } = useAuth();
    const role = getPrimaryRole();
    const [activeTab, setActiveTab] = useState('overview');

    const DashboardComponent = DASHBOARD_MAP[role] || StudentDashboard;

    return (
        <div className="dashboard-layout">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={role} />
            <main className="main-content">
                <DashboardComponent activeTab={activeTab} />
            </main>
        </div>
    );
}
