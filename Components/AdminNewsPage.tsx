import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/AdminNews.module.css';

type NewsItem = {
    id: number;
    title: string;
    link: string;
    image: string;
    document: string;
};

const AdminNewsPage: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [document, setDocument] = useState<File | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/news');
            setNews(response.data);
        } catch (error) {
            console.error("Failed to fetch news data", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('link', link);
        if (image) formData.append('image', image);
        if (document) formData.append('document', document);

        try {
            if (editingId !== null) {
                await axios.put(`http://localhost:5000/api/news/${editingId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post('http://localhost:5000/api/news', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            setTitle('');
            setLink('');
            setImage(null);
            setDocument(null);
            setEditingId(null);
            fetchNews();
        } catch (error) {
            console.error("Failed to save news data", error);
        }
    };

    const handleEdit = (id: number) => {
        const newsItem = news.find((item) => item.id === id);
        if (newsItem) {
            setTitle(newsItem.title);
            setLink(newsItem.link);
            setImage(null);
            setDocument(null);
            setEditingId(id);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/news/${id}`);
            fetchNews();
        } catch (error) {
            console.error("Failed to delete news data", error);
        }
    };

    return (
        <div className={styles.adminNewsContainer}>
            <h1 className={styles.heading}>Manage News</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className={styles.input}
                />
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Link"
                    className={styles.input}
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    placeholder="Upload Image"
                    className={styles.input}
                />
                <input
                    type="file"
                    onChange={(e) => setDocument(e.target.files ? e.target.files[0] : null)}
                    placeholder="Upload Document"
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    {editingId !== null ? 'Update' : 'Add'}
                </button>
            </form>
            <div className={styles.newsList}>
                {news.map((item) => (
                    <div key={item.id} className={styles.newsItem}>
                        <div>
                            <h2>{item.title}</h2>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                            {item.image && <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.title} className={styles.newsImage} />}
                            {item.document && <a href={`http://localhost:5000/uploads/${item.document}`} target="_blank" rel="noopener noreferrer" className={styles.newsDocument}>Download Document</a>}
                        </div>
                        <div className={styles.actions}>
                            <button onClick={() => handleEdit(item.id)} className={styles.editButton}>Edit</button>
                            <button onClick={() => handleDelete(item.id)} className={styles.deleteButton}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminNewsPage;
