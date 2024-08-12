import { DevicePhoneMobileIcon, EnvelopeIcon, MapIcon } from "@heroicons/react/20/solid";
import React from "react";

const Footer = () => {
    return ( 
    <div className="pt-[8rem] pb-[4rem] bg-[#02050a]">
        <div className="grid border-b-[1px] pb-[6rem] border-r-gray-400 grid-cols-1 lg:grid-cols-3 
        md:grid-cols-2 w-[80%] mx-auto gap-[3rem]">
            <div className="flex items-center space-x-6">
                <div className="md:w-[6.5rem] md:h-[6.5rem] w-[5rem] h-[5rem] flex items-center justify-center
                rounded-full bg-[#55e6a5] ">
                    <MapIcon className="md:w-[4rem] md:h-[4rem] w-[3.5rem] h-[3.5rem] text-black"/>
                </div>
                <div>
                    <h1 className="text-[15px] mb-[0.2rem] font-semibold text-[white]">
                        Office
                        </h1>
                    <p className="text-[17px] w-[100%] text-white opacity-60">
                    2930 Colden Hall
                        </p>
                </div>
            </div>
            <div> <div className="flex items-center space-x-6">
                <div className="md:w-[6.5rem] md:h-[6.5rem] w-[5rem] h-[5rem] flex items-center justify-center
                rounded-full bg-[#55e6a5] ">
                    <DevicePhoneMobileIcon className="md:w-[4rem] md:h-[4rem] w-[3.5rem] h-[3.5rem] text-black"/>
                </div>
                <div>
                    <h1 className="text-[15px] mb-[0.2rem] font-semibold text-[white]">
                        Phone
                        </h1>
                    <p className="text-[15px] w-[100%] text-white opacity-60">
                    (+1)785-706-3358 </p>
                </div>
            </div></div>
            <div> <div className="flex items-center space-x-6">
                <div className="md:w-[6.5rem] md:h-[6.5rem] w-[5rem] h-[5rem] flex items-center justify-center
                rounded-full bg-[#55e6a5] ">
                    <EnvelopeIcon className="md:w-[4rem] md:h-[4rem] w-[3.5rem] h-[3.5rem] text-black"/>
                </div>
                <div>
                    <h1 className="text-[15px] mb-[0.2rem] font-semibold text-[white]">
                        Send Us Mail
                        </h1>
                    <p className="text-[15px] w-[90%] text-white opacity-60">
                    rlal@nwmissouri.edu<br/>
                        </p>
                </div>
            </div></div>
            <div></div>
        </div>
        <div className="w-[80%] mt-[2rem] mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-between">
            <div className="text-[15px] mb-[2rem] md:mb-0 text-white opacity-20">
            RatanLAL  2024 | All Rights Reserved

            </div>
            <div>
                <div className="flex items3-center space-x-10">
                    <p className="text-[15px] text-white opacity-20">Terms & condition</p>
                    <p className="text-[15px] text-white opacity-20">Privary Policy</p>
                    <p className="text-[15px] text-white opacity-20">Sitemap</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Footer;