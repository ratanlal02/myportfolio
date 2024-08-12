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

const LatestNews: React.FC = () => {
    const [latestNews, setLatestNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news/latest');
                setLatestNews(response.data);
            } catch (error) {
                console.error("Failed to fetch latest news data", error);
            }
        };
        fetchLatestNews();
    }, []);

    return (
        <div className={styles.newsContainer}>
            <br/>
            <br/>
            <h2 className={styles.heading}>Latest News</h2>
            <div className={styles.newsList}>
                {latestNews.map((item) => (
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
            <div className={styles.readMoreContainer}>
                <Link href="/news" legacyBehavior>
                    <a className={styles.readMoreButton}>Read More</a>
                </Link>
            </div>
        </div>
    );
};

export default LatestNews;
