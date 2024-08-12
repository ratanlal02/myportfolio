import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Publications.module.css';

type Publication = {
    id: number;
    title: string;
    link: string;
    description: string;
};

const Publications: React.FC = () => {
    const [publications, setPublications] = useState<Publication[]>([]);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/publications');
                setPublications(response.data);
            } catch (error) {
                console.error("Failed to fetch publications data", error);
            }
        };
        fetchPublications();
    }, []);

    return (
        <div className={styles.publicationsContainer}>
            <h1 className={styles.heading}>Publications</h1>
            <div className={styles.publicationsList}>
                {publications.map((publication) => (
                    <div key={publication.id} className={styles.publicationItem}>
                        <h2 className={styles.title}>{publication.title}</h2>
                        <p className={styles.description}>{publication.description}</p>
                        <a href={publication.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            Read More
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Publications;
