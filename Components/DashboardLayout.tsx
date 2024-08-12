import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import styles from '../styles/DashboardLayout.module.css';
import { useRouter } from 'next/router';

type DashboardLayoutProps = {
    children: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('authenticated');
        router.push('/login');
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.content}>
                <div className={styles.header}>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Logout
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
