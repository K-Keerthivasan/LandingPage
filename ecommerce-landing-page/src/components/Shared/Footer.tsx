'use client';

import { useEffect, useState } from 'react';
import {
    FaFacebookF,
    FaInstagram,
    FaVimeoV,
    FaYoutube,
    FaLinkedinIn,
} from 'react-icons/fa';
import Link from 'next/link';
import { getAllServices } from '@/components/backend/service/servicesClient';

export default function Footer() {
    const [services, setServices] = useState<{ title: string; route: string }[]>([]);

    useEffect(() => {
        async function fetchServices() {
            const { data } = await getAllServices();
            if (data) {
                const filtered = data
                    .filter(s => s.route && s.title)
                    .map(s => ({
                        title: s.title,
                        route: `/services/${s.route}`,
                    }));
                setServices(filtered);
            }
        }
        fetchServices();
    }, []);

    return (
        <footer className="bg-blue-900 dark:bg-gray-900 text-white dark:text-gray-100 py-10 px-6 md:px-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 text-sm px-6 md:px-12 lg:px-20">
                {/* 1. K2 Logo & Tagline */}
                <div className="flex flex-col">
                    <div className="md:mb-4">
                        <Link
                            href="/"
                            className="text-white dark:text-gray-100 text-3xl font-semibold italic transition-all duration-300
                                       hover:scale-110 hover:text-shadow-glow-light dark:hover:[text-shadow:0_0_10px_red] focus:outline-none"
                        >
                            K2
                        </Link>
                    </div>
                    <h2 className="text-xl font-bold text-yellow-400 dark:text-yellow-300 mb-2">
                        Affordable Web, Marketing &<br /> Video Solutions for Growth
                    </h2>
                </div>

                {/* 2. Static Services */}
                <div className="space-y-1">
                    <h2 className="text-xl font-bold text-yellow-400 dark:text-yellow-300 mb-2">
                        Links
                    </h2>
                    <Link href="/about" className="hover:underline">About Me</Link>
                    <p className="hover:underline"> </p>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                 </div>

                {/* 3. Dynamic Services from DB */}
                <div className="space-y-1">
                    {services.map(service => (
                        <Link
                            key={service.route}
                            href={service.route}
                            className="hover:underline block"
                        >
                            {service.title}
                        </Link>
                    ))}
                </div>

                {/* 4. Contact Info & Socials */}
                <div className="flex flex-col items-start gap-4"></div>

                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-yellow-400 dark:text-yellow-300 font-semibold">Lets Chat</h3>
                        <p>+1 (226)977-6398</p>
                    </div>
                  {/*  <div>
                        <h3 className="text-yellow-400 dark:text-yellow-300 font-semibold">Hatfield Media</h3>
                        <p>
                            2351 Nelson Miller Parkway<br />
                            Suite #100<br />
                            Louisville, KY 40223
                        </p>
                    </div>*/}
                    <div>
                        <h3 className="text-yellow-400 dark:text-yellow-300 font-semibold mb-1">Social</h3>
                        <div className="flex space-x-3 text-lg">
                            <FaFacebookF className="hover:text-yellow-400 transition" />
                            <FaInstagram className="hover:text-yellow-400 transition" />
                            <FaVimeoV className="hover:text-yellow-400 transition" />
                            <FaYoutube className="hover:text-yellow-400 transition" />
                            <FaLinkedinIn className="hover:text-yellow-400 transition" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 text-xs text-center text-white/70 dark:text-gray-400">
                Site Info | Privacy Policy | Accessibility <br />
                © {new Date().getFullYear()} Your Company
            </div>
        </footer>
    );
}