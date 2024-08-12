import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../styles/News.module.css';

type NewsItem = {
    id: number;
    title: string;
    link: string;
    image: string;
    document: string;
};

const NewsPage: React.FC = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchNewsItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news');
                setNewsItems(response.data);
            } catch (error) {
                console.error("Failed to fetch news items", error);
            }
        };
        fetchNewsItems();
    }, []);

    return (
        <div className={styles.newsContainer}>
            <h1 className={styles.heading}>All News</h1>
            <div className={styles.newsList}>
                {newsItems.map((item) => (
                    <div key={item.id} className={styles.newsBox}>
                        <div className={styles.newsContent}>
                            <h3 className={styles.newsTitle}>{item.title}</h3>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                Read More
                            </a>
                            {item.image && <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.title} className={styles.newsImage} />}
                            {item.document && <a href={`http://localhost:5000/uploads/${item.document}`} target="_blank" rel="noopener noreferrer" className={styles.newsDocument}>Download Document</a>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
