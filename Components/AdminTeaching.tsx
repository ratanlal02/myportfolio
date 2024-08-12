import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/AdminTeaching.module.css'; // Ensure the path is correct

type TeachingItem = {
    id: number;
    courseName: string;
    semester: string;
    year: number;
    university: string;
};

const AdminTeaching: React.FC = () => {
    const [teachingList, setTeachingList] = useState<TeachingItem[]>([]);
    const [courseName, setCourseName] = useState<string>('');
    const [semester, setSemester] = useState<string>('');
    const [year, setYear] = useState<number>(2023);
    const [university, setUniversity] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchTeachingList();
    }, []);

    const fetchTeachingList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/teaching');
            setTeachingList(response.data);
        } catch (error) {
            console.error("Failed to fetch teaching data", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId !== null) {
                console.log(`Updating teaching entry with id: ${editingId}`);
                await axios.put(`http://localhost:5000/api/teaching/${editingId}`, { courseName, semester, year, university });
            } else {
                console.log('Creating new teaching entry');
                await axios.post('http://localhost:5000/api/teaching', { courseName, semester, year, university });
            }
            setCourseName('');
            setSemester('');
            setYear(2023);
            setUniversity('');
            setEditingId(null);
            fetchTeachingList();
        } catch (error) {
            console.error("Failed to save teaching data", error);
        }
    };

    const handleEdit = (id: number) => {
        console.log(`Editing teaching entry with id: ${id}`);
        const teachingItem = teachingList.find((item) => item.id === id);
        if (teachingItem) {
            setCourseName(teachingItem.courseName);
            setSemester(teachingItem.semester);
            setYear(teachingItem.year);
            setUniversity(teachingItem.university);
            setEditingId(id);
            console.log(`Editing ID set to: ${id}`);
        } else {
            console.log(`Teaching entry not found for id: ${id}`);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            console.log(`Deleting teaching entry with id: ${id}`);
            await axios.delete(`http://localhost:5000/api/teaching/${id}`);
            fetchTeachingList();
        } catch (error) {
            console.error("Failed to delete teaching data", error);
        }
    };

    return (
        <div className={styles.adminContainer}>
            <h1 className={styles.heading}>Manage Teaching</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="Course Name"
                    className={styles.input}
                />
                <input
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="Semester"
                    className={styles.input}
                />
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    placeholder="Year"
                    className={styles.input}
                />
                <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="University"
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    {editingId !== null ? 'Update' : 'Add'}
                </button>
            </form>
            <div className={styles.teachingList}>
                {teachingList.map((item) => (
                    <div key={item.id} className={styles.teachingItem}>
                        <h2>{item.courseName}</h2>
                        <p>{item.semester} {item.year}</p>
                        <p>{item.university}</p>
                        <button onClick={() => handleEdit(item.id)} className={styles.editButton}>Edit</button>
                        <button onClick={() => handleDelete(item.id)} className={styles.deleteButton}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminTeaching;
