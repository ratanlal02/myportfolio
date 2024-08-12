import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../styles/Research.module.css';

type ResearchItem = {
    id: number;
    title: string;
    description: string;
};

const LatestResearch: React.FC = () => {
    const [latestResearch, setLatestResearch] = useState<ResearchItem[]>([]);

    useEffect(() => {
        const fetchLatestResearch = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/research/latest');
                setLatestResearch(response.data);
            } catch (error) {
                console.error("Failed to fetch latest research data", error);
            }
        };
        fetchLatestResearch();
    }, []);

    return (
        <div className={styles.researchContainer}>
            <h1 className={styles.heading}>
                <br/>
                <br/>
                Latest <span className="text-yellow-400">Research</span>
            </h1>
            <div className={styles.researchList}>
                {latestResearch.map((item) => (
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
            <div className={styles.readMoreContainer}>
                <Link href="/research" legacyBehavior>
                    <a className={styles.readMoreButton}>Read More</a>
                </Link>
            </div>
        </div>
    );
};

export default LatestResearch;
