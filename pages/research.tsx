import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Nav from '@/Components/Nav';
import MobileNav from '@/Components/MobileNav';
import styles from '../styles/Research.module.css';

type ResearchItem = {
    id: number;
    title: string;
    description: string;
};

const ResearchPage: React.FC = () => {
    const [research, setResearch] = useState<ResearchItem[]>([]);
    const [nav, setNav] = useState(false);

    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);

    useEffect(() => {
        const fetchResearch = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/research');
                setResearch(response.data);
            } catch (error) {
                console.error("Failed to fetch research data", error);
            }
        };
        fetchResearch();
    }, []);

    return (
        <div className="overflow-x-hidden">
            <div>
                <MobileNav nav={nav} closeNav={closeNav} />
                <Nav openNav={openNav} />
                <div className={styles.researchContainer}>
                    <h1 className={styles.heading}>
                        <br />
                        <br/>
                        All <span className="text-yellow-400">Research</span>
                    </h1>
                    <div className={styles.researchList}>
                        {research.map((item) => (
                            <Link href={`/research/${item.id}`} key={item.id} legacyBehavior>
                                <a className={styles.researchBox}>
                                    <div className={styles.researchContent}>
                                        <p className={styles.researchTitle}>{item.title}</p>
                                        <p className={styles.researchDescription}>{item.description}</p>
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

export default ResearchPage;
