'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { getAllWorks } from '@/components/backend/our-works/ourworksClient';
import Link from "next/link";
import { motion } from 'framer-motion'; // Import motion

const cardsPerPage = 3;

// Define animation variants for each project card
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function OurWorkSection() {
    const [projects, setProjects] = useState<{
        title: string;
        thumbnailURL: string;
        type: string;
        route: string;
    }[]>([]);

    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        const fetchWorks = async () => {
            const { data } = await getAllWorks();
            if (data) setProjects(data);
        };
        fetchWorks();
    }, []);

    const nextCards = () => {
        setStartIndex((prevIndex) =>
            Math.min(prevIndex + cardsPerPage, projects.length - cardsPerPage)
        );
    };

    const prevCards = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - cardsPerPage, 0));
    };

    const visibleProjects = projects.slice(startIndex, startIndex + cardsPerPage);

    return (
        <section className="bg-white dark:bg-black text-black dark:text-white px-6 py-20 transition-colors">
            <div className="max-w-7xl mx-auto">
                {/* Animate the heading and description */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold text-blue-900 dark:text-blue-300 mb-4"
                >
                    MY WORK
                </motion.h2>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }} // Animate width from 0 to 48px (Tailwind's w-12)
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-12 h-1 bg-gray-400 mb-6"
                />
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-12 max-w-4xl text-lg leading-relaxed"
                >
                    Serving clients in a variety of industries throughout the United States, we specialize in custom
                    website
                    design and development, search engine optimization (SEO), and 4K cinematic video production.
                    Creating powerful
                    marketing campaigns, we offer a wide range of services from event production, graphic design, social
                    media and
                    photography, to compelling content and targeted advertising. Our primary objective is to be your
                    trusted
                    marketing resource for years to come.
                </motion.p>

                <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {visibleProjects.map((project, idx) => (
                            <motion.div // Wrap the Link with motion.div
                                key={idx}
                                variants={cardVariants} // Apply card animation variants
                                initial="hidden"
                                whileInView="visible" // Animate when the card is in view
                                viewport={{ once: true, amount: 0.4 }} // Animate when 40% visible
                                // Optional: Add a stagger effect based on index
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <Link
                                    href={`/our_works/${project.route}`}
                                    className="relative group overflow-hidden rounded-lg shadow-lg block"
                                >
                                    <Image
                                        src={project.thumbnailURL}
                                        alt={project.title}
                                        width={400}
                                        height={600}
                                        className="w-full h-auto object-cover"
                                    />
                                    <span
                                        className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 transform origin-left text-sm font-semibold text-yellow-500 tracking-widest">
                                        {project.type === 'video' ? 'Video Project' : 'Image Project'}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Navigation buttons - You could animate these too if desired */}
                    {projects.length > cardsPerPage && (
                        <div
                            className="absolute top-1/2 left-0 right-0 flex justify-between items-center -translate-y-1/2">
                            <button
                                onClick={prevCards}
                                className={`bg-white dark:bg-black text-yellow-500 rounded-full shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${startIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-label="Previous projects"
                                disabled={startIndex === 0}
                            >
                                <ChevronLeftIcon className="w-6 h-6"/>
                            </button>
                            <button
                                onClick={nextCards}
                                className={`bg-white dark:bg-black text-yellow-500 rounded-full shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${startIndex >= projects.length - cardsPerPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-label="Next projects"
                                disabled={startIndex >= projects.length - cardsPerPage}
                            >
                                <ChevronRightIcon className="w-6 h-6"/>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
