import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../styles/LatestCertifications.module.css';

type Certification = {
    id: number;
    title: string;
    description: string;
};

const LatestCertifications: React.FC = () => {
    const [certificationsList, setCertificationsList] = useState<Certification[]>([]);

    useEffect(() => {
        fetchLatestCertifications();
    }, []);

    const fetchLatestCertifications = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/certifications/latest');
            setCertificationsList(response.data);
        } catch (error) {
            console.error("Failed to fetch certifications data", error);
        }
    };

    return (
        <div className={styles.certificationsContainer}>
            <h2>Latest Certifications</h2>
            <div className={styles.certificationsList}>
                {certificationsList.map((item) => (
                    <div key={item.id} className={styles.certificationItem}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
            <div className={styles.readMore}>
                <Link href="/certifications" legacyBehavior>
                    <a className={styles.readMoreButton}>Read More</a>
                </Link>
            </div>
        </div>
    );
};

export default LatestCertifications;
