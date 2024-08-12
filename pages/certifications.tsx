import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Nav from '@/Components/Nav';
import MobileNav from '@/Components/MobileNav';
import styles from '../styles/Certifications.module.css';

type Certification = {
    id: number;
    title: string;
    description: string;
};

const CertificationsPage: React.FC = () => {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [nav, setNav] = useState(false);

    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/certifications');
                setCertifications(response.data);
            } catch (error) {
                console.error("Failed to fetch certifications data", error);
            }
        };
        fetchCertifications();
    }, []);

    return (
        <div className="overflow-x-hidden">
            <div>
                <MobileNav nav={nav} closeNav={closeNav} />
                <Nav openNav={openNav} />
                <div className={styles.certificationsContainer}>
                    <h2>All Certifications</h2>
                    <div className={styles.certificationsList}>
                        {certifications.map((cert) => (
                            <div key={cert.id} className={styles.certificationItem}>
                                <h3>{cert.title}</h3>
                                <p>{cert.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificationsPage;
