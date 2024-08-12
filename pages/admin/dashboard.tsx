import React from 'react';
import DashboardLayout from '@/Components/DashboardLayout';
import ProtectedRoute from '@/Components/ProtectedRoute';
import Link from 'next/link';
import styles from '@/styles/Dashboard.module.css';

const AdminDashboard: React.FC = () => {
    return (
        <ProtectedRoute>
            <DashboardLayout>
                <div className={styles.dashboardContainer}>
                    <h1 className={styles.heading}>Admin Dashboard</h1>
                    <div className={styles.linkList}>
                        <Link href="/admin/research" legacyBehavior>
                            <a className={styles.linkItem}>Manage Research</a>
                        </Link>
                        <Link href="/admin/publications" legacyBehavior>
                            <a className={styles.linkItem}>Manage Publications</a>
                        </Link>
                        <Link href="/admin/teaching" legacyBehavior>
                            <a className={styles.linkItem}>Manage Teaching</a>
                        </Link>
                        <Link href="/admin/certifications" legacyBehavior>
                            <a className={styles.linkItem}>Manage Certifications</a>
                        </Link>
                        <Link href="/admin/news" legacyBehavior>
                            <a className={styles.linkItem}>Manage News</a>
                        </Link>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
};

export default AdminDashboard;
