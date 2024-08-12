import { Bars3Icon } from "@heroicons/react/20/solid";
import React from "react";
import Link from "next/link";

interface Props {
    openNav: () => void;
}

const Nav = ({ openNav }: Props) => {
    return (
        <div className="w-full fixed z-[10000] top-0 h-[12vh] bg-[#141c27] shadow-md">
            <div className="flex items-center justify-between w-[80%] mx-auto h-full">
                <h1 className="flex-shrink-0 cursor-pointer text-[15px] text-white font-bold">
                    Ratan
                    <span className="text-yellow-300">LAL</span>
                </h1>
                <Link href="/" legacyBehavior>
                    <a className="nav-link">Home</a>
                </Link>
                <Link href="/#latest-research" legacyBehavior>
                    <a className="nav-link">Research</a>
                </Link>
                <Link href="/#latest-publications" legacyBehavior>
                    <a className="nav-link">Publications</a>
                </Link>
                <Link href="/#latest-teaching" legacyBehavior>
                    <a className="nav-link">Teaching</a>
                </Link>
                <Link href="/#latest-news" legacyBehavior>
                    <a className="nav-link">News</a>
                </Link>
                <Link href="/#my-services" legacyBehavior>
                    <a className="nav-link">Services</a>
                </Link>
                <Link href="/#my-skills" legacyBehavior>
                    <a className="nav-link">Education</a>
                </Link>
                <Link href="/#my-footer" legacyBehavior>
                    <a className="nav-link">Contact</a>
                </Link>
                <div onClick={openNav}>
                    <Bars3Icon className="w-[2rem] md:hidden h-[2rem] cursor-pointer text-yellow-300" />
                </div>
            </div>
        </div>
    );
}

export default Nav;
