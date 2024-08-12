import React, { useEffect, useState } from 'react';
import MobileNav from '@/Components/MobileNav';
import Nav from '@/Components/Nav';
import Hero from '@/Components/Hero';
import About from '@/Components/About';
import Services from '@/Components/Services';
import Skills from '@/Components/Skills';
import Footer from '@/Components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LatestResearch from '@/Components/LatestResearch';
import LatestPublications from '@/Components/LatestPublications';
import LatestTeaching from '@/Components/LatestTeaching';
import LatestCertifications from '@/Components/LatestCertifications';
import LatestNews from '@/Components/LatestNews';

const HomePage = () => {
    const [nav, setNav] = useState(false);

    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);

    useEffect(() => {
        AOS.init({
            disable: false,
            startEvent: 'DOMContentLoaded',
            initClassName: 'aos-init',
            animatedClassName: 'aos-animate',
            useClassNames: false,
            disableMutationObserver: false,
            debounceDelay: 50,
            throttleDelay: 99,
            offset: 120,
            delay: 0,
            duration: 1000,
            easing: 'ease',
            once: true,
            mirror: false,
            anchorPlacement: 'top-bottom',
        });
    }, []);

    return (
        <div className="overflow-x-hidden">
            <div>
                <MobileNav nav={nav} closeNav={closeNav} />
                <Nav openNav={openNav} />
                <Hero />
                <div className="relative z-[30]">
                    <About />
                    <div id="latest-research">
                        <LatestResearch />
                    </div>
                    <div id="latest-publications">
                        <LatestPublications />
                    </div>
                    <div id="latest-teaching">
                        <LatestTeaching />
                    </div>
                    <div id="latest-certifications">
                        <LatestCertifications />
                    </div>
                    <div id="latest-news">
                        <LatestNews />
                    </div>
                    <div id="my-services">
                        <Services />
                    </div>
                    <div id="my-skills">
                        <Skills />
                    </div>
                    <div id="my-footer">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
