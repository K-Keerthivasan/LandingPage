'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { getAllWorks } from '@/components/backend/our-works/ourworksClient';
import Link from "next/link";
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';

const CATEGORIES = [
    { value: 'web-design', label: 'Web Design' },
    { value: 'video-production', label: 'Video Production' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'photography', label: 'Photography' },
];

const cardsPerPage = 3;

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

export default function OurWorkSection() {
    const [projects, setProjects] = useState<{
        title: string;
        thumbnailURL: string;
        type: string;
        route: string;
        category?: string;
    }[]>([]);

    const [startIndex, setStartIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        const fetchWorks = async () => {
            const { data } = await getAllWorks();
            if (data) setProjects(data);
        };
        fetchWorks();
    }, []);

    const nextCards = () => {
        setStartIndex((prevIndex) =>
            Math.min(prevIndex + cardsPerPage, filteredProjects.length - cardsPerPage)
        );
    };

    const prevCards = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - cardsPerPage, 0));
    };

    // Filter projects by active category
    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    const visibleProjects = filteredProjects.slice(startIndex, startIndex + cardsPerPage);

    return (
        <section className="bg-white dark:bg-black text-black dark:text-white px-4 sm:px-6 lg:px-8 py-16 md:py-24 transition-colors">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-12 md:mb-16 lg:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 dark:text-blue-300 mb-4"
                    >
                        My Creative Portfolio
                    </motion.h2>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 48 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mb-6"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-base md:text-lg leading-relaxed max-w-4xl text-gray-600 dark:text-gray-300"
                    >
                        Explore my collection of professional work spanning web development, video production, and digital design.
                        Each project represents a unique challenge and creative solution.
                    </motion.p>
                </div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setActiveCategory('all');
                            setStartIndex(0);
                        }}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                            activeCategory === 'all'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        All Work
                    </motion.button>

                    {CATEGORIES.map((category) => (
                        <motion.button
                            key={category.value}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setActiveCategory(category.value);
                                setStartIndex(0);
                            }}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                                activeCategory === category.value
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            {category.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="relative">
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            No projects found in this category.
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {visibleProjects.map((project, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={cardVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.4 }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        className="group"
                                    >
                                        <Link
                                            href={`/our_works/${project.route}`}
                                            className="block relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                        >
                                            <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
                                                <Image
                                                    src={project.thumbnailURL}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                                                <span className="text-sm font-medium text-blue-300">
                                                    {project.category ?
                                                        CATEGORIES.find(c => c.value === project.category)?.label ||
                                                        (project.type === 'video' ? 'Video Production' : 'Web Design')
                                                        :
                                                        (project.type === 'video' ? 'Video Production' : 'Web Design')
                                                    }
                                                </span>
                                            </div>

                                            <span className="absolute top-4 right-4 bg-blue-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                                                {project.category ?
                                                    CATEGORIES.find(c => c.value === project.category)?.label.split(' ')[0] ||
                                                    (project.type === 'video' ? 'Video' : 'Web')
                                                    :
                                                    (project.type === 'video' ? 'Video' : 'Web')
                                                }
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Navigation buttons */}
                            {filteredProjects.length > cardsPerPage && (
                                <div className="flex justify-center mt-8 md:mt-12 space-x-4">
                                    <button
                                        onClick={prevCards}
                                        className={`flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            startIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                        aria-label="Previous projects"
                                        disabled={startIndex === 0}
                                    >
                                        <ChevronLeftIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </button>
                                    <button
                                        onClick={nextCards}
                                        className={`flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            startIndex >= filteredProjects.length - cardsPerPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                        aria-label="Next projects"
                                        disabled={startIndex >= filteredProjects.length - cardsPerPage}
                                    >
                                        <ChevronRightIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* View All Button */}
                {projects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-center mt-12 md:mt-16"
                    >
                        <Link
                            href="/our_works"
                            className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                        >
                            View Full Portfolio
                            <ChevronRightIcon className="ml-2 w-5 h-5" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}