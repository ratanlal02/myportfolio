import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";
import Link from "next/link";

interface Props {
    nav: boolean;
    closeNav: () => void;
}

const MobileNav = ({ nav, closeNav }: Props) => {
    const navAnimation = nav ? "translate-x-0" : "translate-x-[-100%]";

    return (
        <div className={`fixed ${navAnimation} transform transition-all duration-300 top-0 left-0 right-0 bottom-0 z-[1000000] bg-[#09101a]`}>
            <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
                <Link href="/" legacyBehavior>
                    <a onClick={closeNav} className="nav-link-mobile text-yellow-400">Home</a>
                </Link>
                <Link href="/#latest-research" legacyBehavior>
                    <a onClick={closeNav} className="nav-link-mobile text-yellow-400">Research</a>
                </Link>
                <Link href="/#latest-publications" legacyBehavior>
                    <a onClick={closeNav} className="nav-link-mobile text-yellow-400">Publications</a>
                </Link>
                <Link href="/#latest-teaching" legacyBehavior>
                    <a onClick={closeNav} className="nav-link-mobile text-yellow-400">Teaching</a>
                </Link>
                <Link href="/#latest-news" legacyBehavior>
                    <a onClick={closeNav} className="nav-link-mobile text-yellow-400">News</a>
                </Link>
                <Link href="/#my-services" legacyBehavior>
                    <a onClick={closeNav} className="nav-link-mobile text-yellow-400">Services</a>
                </Link>
                <Link href="/#my-skills" legacyBehavior>
                    <a onClick={closeNav} className="nav-link-mobile text-yellow-400">Education</a>
                </Link>
                <Link href="/#my-footer" legacyBehavior>
                    <a onClick={closeNav} className="nav-link-mobile text-yellow-400">Contact</a>
                </Link>
            </div>
            <div onClick={closeNav} className="absolute z-[10000000] cursor-pointer top-[2rem] right-[2rem] w-[2rem] h-[2rem] text-yellow-400">
                <XMarkIcon />
            </div>
        </div>
    );
};

export default MobileNav;
