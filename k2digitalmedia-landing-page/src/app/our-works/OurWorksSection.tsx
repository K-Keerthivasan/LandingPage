'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { easeOut } from 'framer-motion';

type Work = {
    id: number;
    title: string;
    description: string;
    thumbnailURL: string;
    videoURL: string;
    route: string;
    type: 'image' | 'video';
    created_at?: string;
    content: string;
    category?: string;
};

// Props now come from the server page
export default function OurWorksSection({ initialWorks }: { initialWorks: Work[] }) {
    const [activeFilter, setActiveFilter] = useState<'all' | string>('all');
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const CATEGORIES = useMemo(
        () => [
            { value: 'web-design', label: 'Web Design' },
            { value: 'video-production', label: 'Video Production' },
            { value: 'graphic-design', label: 'Graphic Design' },
            { value: 'photography', label: 'Photography' },
        ],
        []
    );

    const filteredWorks = useMemo(
        () => (activeFilter === 'all' ? initialWorks : initialWorks.filter((w) => w.category === activeFilter)),
        [activeFilter, initialWorks]
    );

    // animation variants (keep subtle; don't hide the grid from SSR)
    const containerVariants = {
        initial: { opacity: 1 }, // keep visible for crawlers
        animate: {
            opacity: 1,
            transition: { staggerChildren: 0.06, when: 'beforeChildren' },
        },
    };

    const itemVariants = {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
    };

    const imageHover = {
        rest: { scale: 1, transition: { duration: 0.25 } },
        hover: { scale: 1.03, transition: { duration: 0.35 } },
    };

    const overlayHover = {
        rest: { opacity: 0 },
        hover: { opacity: 1, y: -8, transition: { duration: 0.25 } },
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-gray-950 text-black dark:text-white transition-colors duration-500 md:ml-16">
            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="mb-20 text-center"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 mb-6">
                        Creative Portfolio
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mb-8 rounded-full" />
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        Explore my collection of professional work spanning web development, video production, and digital design.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex flex-wrap justify-center gap-3 mb-16">
                    {[{ value: 'all', label: 'All Work' }, ...CATEGORIES].map((filter) => (
                        <motion.button
                            key={filter.value}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveFilter(filter.value)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                                activeFilter === filter.value
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            {filter.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Grid (server-rendered links are here) */}
                <motion.div variants={containerVariants} initial="initial" animate="animate" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredWorks.map((work, index) => (
                        <motion.div
                            key={work.id}
                            variants={itemVariants}
                            className="relative group"
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                        >
                            <Link href={`/our-works/${work.route}`} className="block">
                                {/* Media */}
                                <motion.div variants={imageHover} initial="rest" whileHover="hover" className="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3]">
                                    {work.type === 'video' ? (
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="absolute inset-0 w-full h-full object-cover"
                                            src={work.videoURL}
                                            aria-label={`Video preview for ${work.title}`}
                                        />
                                    ) : (
                                        <Image
                                            src={work.thumbnailURL || '/Logo.png'}
                                            alt={work.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    )}

                                    {/* Hover overlay */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                                        variants={overlayHover}
                                        initial="rest"
                                        animate={hoveredIndex === index ? 'hover' : 'rest'}
                                    />

                                    {/* Badge */}
                                    <span className="absolute top-4 right-4 bg-blue-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                    {work.category || 'Project'}
                  </span>
                                </motion.div>

                                {/* Text */}
                                <div className="mt-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {work.title}
                                    </h3>
                                    {work.description && <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{work.description}</p>}
                                    <motion.div
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: hoveredIndex === index ? 1 : 0, x: hoveredIndex === index ? 0 : -8 }}
                                        className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 font-medium"
                                    >
                                        View project
                                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* No results (still server-rendered if filter kills all) */}
                <AnimatePresence>
                    {filteredWorks.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-gray-600 dark:text-gray-400 text-lg">
                            No projects found in this category.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
