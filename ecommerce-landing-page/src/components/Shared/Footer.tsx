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
import { getAllServices } from '@/components/backend/services';

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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 text-sm px-6 md:px-12 lg:px-20 ml-0 md:ml-64">
                {/* 1. Tagline */}
                <div>
                    <h2 className="text-xl font-bold text-yellow-400 dark:text-yellow-300 mb-2">
                        Digital Marketing &<br />Web Development Agency
                    </h2>
                </div>

                {/* 2. Static Services */}
                <div className="space-y-1">
                    <Link href="/contact" className="hover:underline">Contact</Link>
                    <p className="hover:underline">Photography</p>
                    <p className="hover:underline">Website Emergency Services</p>
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
                        <h3 className="text-yellow-400 dark:text-yellow-300 font-semibold">Les Chat</h3>
                        <p>1-502-509-3349</p>
                    </div>
                    <div>
                        <h3 className="text-yellow-400 dark:text-yellow-300 font-semibold">Hatfield Media</h3>
                        <p>
                            2351 Nelson Miller Parkway<br />
                            Suite #100<br />
                            Louisville, KY 40223
                        </p>
                    </div>
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
