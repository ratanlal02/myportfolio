import React, { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import Image from "next/image";
import Modal from "./Modal";

const About = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="bg-[#121121] pb-[3rem] pt-[4rem] md:pt-[8rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 w-[80%] mx-auto gap-[3rem] items-center">
                <div>
                    <h1 className="text-[20px] font-bold uppercase text-[#55e6a5] md-[1rem]">
                    </h1>
                    <h2 className="text-[25px] md:text-[35px] lg:text-[35px] md:leading-[3rem] leading-[2rem] capitalize mb-[3rem] font-bold text-white">
                        VISIONS <span className="text-yellow-400">Target</span>
                    </h2>
                    <div className="mb-[3rem] flex items-center md:space-x-10">
                        <span className="w-[100px] hidden md:block h-[5px] bg-slate-400 rounded-sm"></span>
                        <p className="text-[15px] text-slate-50 w-[80%]">
                            In terms of A/B testing, automation, and reporting, Mailchimp will provide 
                            you with more advanced features. 
                            On the other hand, if you look for simplicity, better deliverability.
                        </p>
                    </div>
                    <button onClick={toggleModal} className="mt-[1rem] text-yellow-400 hover:underline mb-[1rem]">
                        Read More
                    </button>
                    <button className="px-[2rem] hover:bg-yellow-400 transition-all duration-200 py-[1rem] text-[15px]
                         font-bold uppercase bg-[#55e6a5] text-black flex items-center space-x-2">
                        <p>Download CV</p>
                        <ArrowDownTrayIcon className="w-[1.6rem] h-[1.7rem] text-black" />
                    </button>
                </div>
                <div data-aos="fade-left" className="lg:w-[500px] mx-auto md:mx-0 mt-[2rem] lg:mt-0 lg:h-[300px] w-[100px] relative">
                    <Image src="/images/about.jpg" alt="user" layout="fill" objectFit="contain" className="relative z-[11] w-[100%] h-[100%] object-contain"/>
                    <div className="absolute w-[100%] h-[100%] z-[10] bg-[#55e6a5] top-[-2rem] right-[-2rem]"></div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <h2 className="text-xl font-bold mb-4">More About Our Visions and Target</h2>
                <p>
                    Here you can provide more detailed information about the vision and target. This content can be as long as you need it to be. It can include details about the various goals, milestones, and strategies your organization or project is aiming to achieve. This is a good place to elaborate on the initial brief description provided and give your audience a more comprehensive understanding.  Here you can provide more detailed information about the vision and target. This content can be as long as you need it to be. It can include details about the various goals, milestones, and strategies your organization or project is aiming to achieve. This is a good place to elaborate on the initial brief description provided and give your audience a more comprehensive understanding. Here you can provide more detailed information about the vision and target. This content can be as long as you need it to be. It can include details about the various goals, milestones, and strategies your organization or project is aiming to achieve. This is a good place to elaborate on the initial brief description provided and give your audience a more comprehensive understanding.
                </p>
            </Modal>
        </div>
    );
};

export default About;
