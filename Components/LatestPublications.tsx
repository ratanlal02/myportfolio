import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../styles/Publications.module.css';

type Publication = {
    id: string;
    title: string;
    link: string;
    description: string;
};

const LatestPublications: React.FC = () => {
    const [latestPublications, setLatestPublications] = useState<Publication[]>([]);

    useEffect(() => {
        const fetchLatestPublications = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/publications/latest');
                setLatestPublications(response.data);
            } catch (error) {
                console.error("Failed to fetch latest publications data", error);
            }
        };
        fetchLatestPublications();
    }, []);

    return (
        <div className={styles.publicationsContainer}>
            <br/>
            <br/>
            <h1 className={styles.heading}>Latest Publications</h1>
            <div className={styles.publicationsList}>
                {latestPublications.map((publication) => (
                    <div key={publication.id} className={styles.publicationItem}>
                        <h2 className={styles.title}>{publication.title}</h2>
                        <p className={styles.description}>{publication.description}</p>
                        <a href={publication.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            Read More
                        </a>
                    </div>
                ))}
            </div>
            <div className="text-center mt-[2rem]">
                <Link href="/publications" legacyBehavior>
                    <a className={styles.readMoreButton}>Read More</a>
                </Link>
            </div>
        </div>
    );
};

export default LatestPublications;
