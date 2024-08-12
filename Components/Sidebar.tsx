import React from 'react';
import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

const Sidebar: React.FC = () => {
    return (
        <div className={styles.sidebar}>
            <h2 className={styles.title}>Admin Dashboard</h2>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/admin/dashboard" legacyBehavior>
                        <a className={styles.navLink}>Dashboard</a>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/admin/research" legacyBehavior>
                        <a className={styles.navLink}>Research</a>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/admin/publications" legacyBehavior>
                        <a className={styles.navLink}>Publications</a>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/admin/teaching" legacyBehavior>
                        <a className={styles.navLink}>Teaching</a>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/admin/certifications" legacyBehavior>
                        <a className={styles.navLink}>Certifications</a>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/admin/news" legacyBehavior>
                        <a className={styles.navLink}>News</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
