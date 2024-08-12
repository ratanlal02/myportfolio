import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/AdminCertifications.module.css';

type Certification = {
    id: number;
    title: string;
    description: string;
};

const AdminCertifications: React.FC = () => {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/certifications');
            setCertifications(response.data);
        } catch (error) {
            console.error("Failed to fetch certifications", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId !== null) {
                await axios.put(`http://localhost:5000/api/certifications/${editingId}`, { title, description });
            } else {
                await axios.post('http://localhost:5000/api/certifications', { title, description });
            }
            setTitle('');
            setDescription('');
            setEditingId(null);
            fetchCertifications();
        } catch (error) {
            console.error("Failed to save certification", error);
        }
    };

    const handleEdit = (id: number) => {
        const certification = certifications.find((cert) => cert.id === id);
        if (certification) {
            setTitle(certification.title);
            setDescription(certification.description);
            setEditingId(id);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/certifications/${id}`);
            fetchCertifications();
        } catch (error) {
            console.error("Failed to delete certification", error);
        }
    };

    return (
        <div className={styles.adminContainer}>
            <h1 className={styles.heading}>Manage Certifications</h1>
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
            <div className={styles.certificationList}>
                {certifications.map((cert) => (
                    <div key={cert.id} className={styles.certificationItem}>
                        <div>
                            <h2>{cert.title}</h2>
                            <p>{cert.description}</p>
                        </div>
                        <div>
                            <button onClick={() => handleEdit(cert.id)} className={styles.editButton}>Edit</button>
                            <button onClick={() => handleDelete(cert.id)} className={styles.deleteButton}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminCertifications;
