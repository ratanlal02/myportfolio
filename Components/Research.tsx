import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Research.module.css';

type ResearchItem = {
    id: number;
    title: string;
    description: string;
};

const ResearchPage: React.FC = () => {
    const [research, setResearch] = useState<ResearchItem[]>([]);

    useEffect(() => {
        const fetchResearch = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/research');
                setResearch(response.data);
            } catch (error) {
                console.error("Failed to fetch research data", error);
            }
        };
        fetchResearch();
    }, []);

    return (
        <div className={styles.researchContainer}>
            <h1 className={styles.heading}>
                All <span className="text-yellow-400">Research</span>
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-[4rem] gap-[3rem] w-[80%] mx-auto">
                {research.map((item) => (
                    <div key={item.id} className={styles.researchBox}>
                        <div className="w-[90%] text-center mx-auto bg-[#09101a] relative p-[2rem] mt-[-1rem]">
                            <p className="mt-[1rem] text-white text-[18px] font-semibold">{item.title}</p>
                            <p className="mt-[1rem] text-white text-[16px]">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResearchPage;
