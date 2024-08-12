import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Nav from '@/Components/Nav';
import MobileNav from '@/Components/MobileNav';
import styles from '../styles/Teaching.module.css';

type TeachingItem = {
    id: number;
    courseName: string;
    semester: string;
    year: number;
    university: string;
};

const TeachingPage: React.FC = () => {
    const [teaching, setTeaching] = useState<TeachingItem[]>([]);
    const [nav, setNav] = useState(false);

    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);

    useEffect(() => {
        const fetchTeaching = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/teaching');
                setTeaching(response.data);
            } catch (error) {
                console.error("Failed to fetch teaching data", error);
            }
        };
        fetchTeaching();
    }, []);

    return (
        <div className="overflow-x-hidden">
            <div>
                <MobileNav nav={nav} closeNav={closeNav} />
                <Nav openNav={openNav} />
                <div className={styles.teachingContainer}>
                    <h1 className={styles.heading}>
                        All <span className="text-yellow-400">Teaching</span>
                    </h1>
                    <div className={styles.teachingList}>
                        {teaching.map((item) => (
                            <Link href={`/teaching/${item.id}`} key={item.id} legacyBehavior>
                                <a className={styles.teachingBox}>
                                    <div className={styles.teachingContent}>
                                        <p className={styles.teachingTitle}>{item.courseName}</p>
                                        <p className={styles.teachingDescription}>{item.semester} {item.year}</p>
                                        <p className={styles.teachingDescription}>{item.university}</p>
                                    </div>
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeachingPage;
