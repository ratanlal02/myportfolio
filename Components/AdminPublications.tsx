import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Research.module.css'; // Create a new CSS module for publications if needed

type Publication = {
    id: number;
    title: string;
    link: string;
    description: string;
};

const AdminPublications: React.FC = () => {
    const [publicationsList, setPublicationsList] = useState<Publication[]>([]);
    const [title, setTitle] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchPublicationsList();
    }, []);

    const fetchPublicationsList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/publications');
            setPublicationsList(response.data);
        } catch (error) {
            console.error("Failed to fetch publications data", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId !== null) {
                console.log(`Updating publication with id: ${editingId}`);
                await axios.put(`http://localhost:5000/api/publications/${editingId}`, { title, link, description });
            } else {
                console.log('Creating new publication');
                await axios.post('http://localhost:5000/api/publications', { title, link, description });
            }
            setTitle('');
            setLink('');
            setDescription('');
            setEditingId(null);
            fetchPublicationsList();
        } catch (error) {
            console.error("Failed to save publication data", error);
        }
    };

    const handleEdit = (id: number) => {
        console.log(`Editing publication with id: ${id}`);
        const publicationItem = publicationsList.find((item) => item.id === id);
        if (publicationItem) {
            setTitle(publicationItem.title);
            setLink(publicationItem.link);
            setDescription(publicationItem.description);
            setEditingId(id);
            console.log(`Editing ID set to: ${id}`);
        } else {
            console.log(`Publication item not found for id: ${id}`);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            console.log(`Deleting publication with id: ${id}`);
            await axios.delete(`http://localhost:5000/api/publications/${id}`);
            fetchPublicationsList();
        } catch (error) {
            console.error("Failed to delete publication data", error);
        }
    };

    return (
        <div className={styles.adminContainer}>
            <h1 className={styles.heading}>Manage Publications</h1>
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
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className={styles.textarea}
                ></textarea>
                <button type="submit" className={styles.button}>
                    {editingId !== null ? 'Update' : 'Add'}
                </button>
            </form>
            <div className={styles.researchList}>
                {publicationsList.map((item) => (
                    <div key={item.id} className={styles.researchItem}>
                        <h2>{item.title}</h2>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                        <p>{item.description}</p>
                        <button onClick={() => handleEdit(item.id)} className={styles.editButton}>Edit</button>
                        <button onClick={() => handleDelete(item.id)} className={styles.deleteButton}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPublications;
