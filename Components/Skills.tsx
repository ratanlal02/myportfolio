import React from "react";
import SkillsItem from "./skillsItem";

const Skills = () => {
    return (
        <div className="pt-[4rem] md:pt-[3rem] pb-[5rem] bg-[#09101a]">
            <h1 className="heading">
                <br/>
                Edu<span className="text-yellow-400">cation</span>
            </h1>
            <div className="w-[80%] mx-auto pt-[4rem] md:pt-[8rem] grid grid-cols-1 md:grid-cols-2 gap-[2rem] items-center">
                <div>
                    <SkillsItem 
                        title={`Kansas State University, USA\nComputer Science`} 
                        year="Ph.D. (Candidate)" 
                    />
                    <SkillsItem 
                        title={`Indian Statistical Institute, India\nComputer Science`} 
                        year="M.Tech. - 2014" 
                    />
                </div>
                <div>
                    <SkillsItem 
                        title={`Motilal Nehru National Institute of Technology, India\nComputer Application`} 
                        year="M.C.A. - 2010" 
                    />
                    <SkillsItem 
                        title={`University of Allahabad, India\nMathematics and Statistics`} 
                        year="B.Sc. - 2003" 
                    />
                </div>
            </div>
        </div>
    );
};

export default Skills;
