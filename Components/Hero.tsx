import Particle from "./Particle";
import React, { useState } from "react";
import TextEffect from "./TextEffect";
import Image from "next/image";
import { ArrowDownTrayIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import Modal from "./Modal";

const Hero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="h-[88vh] bg-[url('/images/banner.jpg')] mt-[10vh] bg-cover bg-center ">
            <Particle />
            <div className="w-[80%] grid-cols-1 mx-auto grid lg:grid-cols-2 gap-[3rem] h-[100%] items-center">
                <div>
                    <h1 className="text-[20px] md:text-[25px] text-white font-bold">
                        HI, I`M <span className="text-yellow-400">DR. RATAN LAL</span>
                    </h1>
                    <p className="mt-[2rem] text-[15px] text-[#fffffff0]">
                        Ratan Lal is a Ph.D. candidate in the department of computer science at Kansas State University, USA. He obtained his master in computer science from Indian Statistical Institute, India in 2014.
                    </p>
                    <button onClick={toggleModal} className="mt-[1rem] text-yellow-400 hover:underline">
                        Read More
                    </button>
                    <div className="mt-[2rem] flex-col space-y-6 sm:space-y-0 sm:flex sm:flex-row items-center sm:space-x-6">
                        <button className="px-[2rem] hover:bg-yellow-400 transition-all duration-200 py-[1rem] text-[14px] font-bold uppercase bg-[#55e6a5] text-black flex items-center space-x-2">
                            <p>Download CV</p>
                            <ArrowDownTrayIcon className="w-[1.6rem] h-[1.7rem] text-black" />
                        </button>
                        <button className="flex items-center space-x-2">
                            <PlayCircleIcon className="w-[4rem] h-[4rem] hover:text-yellow-400 transition-all duration-200 text-[#55e6a5]" />
                            <p className="text-[15px] font-semibold text-white">Watch The Video</p>
                        </button>
                    </div>
                </div>
                <div className="w-[400px] h-[400px] hidden bg-[#55e6a5] relative lg:flex items-center rounded-full">
                    <Image src="/images/u1.jpg" alt="user" layout="fill" className="object-cover rounded-full" />
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <h2 className="text-xl font-bold mb-4">More About Dr. Ratan Lal</h2>
                <p>
                    He was a research assistant at IMDEA Software Institute, Spain from July 2014 to December 2015. He was a research intern at Toyota Motor North America, Research and Development (TMNA R&D) in summer 2019. His main research interest is in the Formal Analysis of (Stochastic) Cyber-Physical Systems and its applications in automotive, robotics, unmanned aerial vehicle (UAV), and autonomous underwater vehicle (AUV), with emphasis on both theoretical and practical methods for the design and verification of hybrid control systems. He has been awarded the Gattani Outstanding Graduate Student Award for his research outstanding at Kansas State University. He has been serving as a member of research evaluation program committee for the top conferences: International Conference on Hybrid Systems: Computation and Control (HSCC), International Conference on Computer-Aided Verification (CAV). Also, he has been serving as a technical program committee for the international conferences: Advances in Computation, Communications and Services (ACCSE). He has reviewed more than 50 papers for the international conferences and journals related to cyber-physical systems.
                </p>
            </Modal>
        </div>
    );
};

export default Hero;
