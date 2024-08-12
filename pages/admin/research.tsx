import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Research.module.css'; // Adjust the path to match your project structure

type ResearchItem = {
    id: number;
    title: string;
    description: string;
};

const AdminResearch: React.FC = () => {
    const [researchList, setResearchList] = useState<ResearchItem[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchResearchList();
    }, []);

    const fetchResearchList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/research');
            setResearchList(response.data);
        } catch (error) {
            console.error("Failed to fetch research data", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId !== null) {
                await axios.put(`http://localhost:5000/api/research/${editingId}`, { title, description });
            } else {
                await axios.post('http://localhost:5000/api/research', { title, description });
            }
            setTitle('');
            setDescription('');
            setEditingId(null);
            fetchResearchList();
        } catch (error) {
            console.error("Failed to save research data", error);
        }
    };

    const handleEdit = (id: number) => {
        const researchItem = researchList.find((item) => item.id === id);
        if (researchItem) {
            setTitle(researchItem.title);
            setDescription(researchItem.description);
            setEditingId(id);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/research/${id}`);
            fetchResearchList();
        } catch (error) {
            console.error("Failed to delete research data", error);
        }
    };

    return (
        <div className={styles.researchContainer}>
            <h1 className={styles.heading}>Manage Research</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
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
                {researchList.map((item) => (
                    <div key={item.id} className={styles.researchItem}>
                        <div>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                        <div>
                            <button onClick={() => handleEdit(item.id)} className={styles.editButton}>Edit</button>
                            <button onClick={() => handleDelete(item.id)} className={styles.deleteButton}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminResearch;
