'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { createBrowserSupabase } from '@/app/lib/client';
const supabase = await createBrowserSupabase();
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
const CATEGORIES = [
    { value: 'web-design', label: 'Web Design' },
    { value: 'video-production', label: 'Video Production' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'photography', label: 'Photography' },
];


const OurWorksSection = () => {
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchWorks = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('our-works')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setWorks(data || []);
            } catch (err) {
                console.error('Error fetching works:', err);
                setError('Failed to load works. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchWorks();
    }, []);

    const filteredWorks = activeFilter === 'all'
        ? works
        : works.filter(work => work.category === activeFilter);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: easeOut
            }
        }
    };

    const imageHoverVariants = {
        rest: { scale: 1, transition: { duration: 0.3 } },
        hover: { scale: 1.03, transition: { duration: 0.4 } }
    };

    const textHoverVariants = {
        rest: { y: 0, opacity: 0 },
        hover: { y: -20, opacity: 1, transition: { duration: 0.3 } }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-gray-950 text-black dark:text-white transition-colors duration-500 md:ml-16">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
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

                {/* Filter Controls */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
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

                {/* Loading and Error States */}
                <AnimatePresence>
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20"
                        >
                            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading projects...</p>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20 text-red-500 dark:text-red-400 text-lg"
                        >
                            {error}
                        </motion.div>
                    )}

                    {!loading && !error && filteredWorks.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 text-gray-600 dark:text-gray-400 text-lg"
                        >
                            No projects found in this category.
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Works Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredWorks.map((work, index) => (
                        <motion.div
                            key={work.id}
                            variants={itemVariants}
                            className="relative group"
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                        >
                            <Link href={`/our-works/${work.route}`} className="block">
                                {/* Media Container */}
                                <motion.div
                                    variants={imageHoverVariants}
                                    initial="rest"
                                    whileHover="hover"
                                    className="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3]"
                                >
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
                                            src={work.thumbnailURL}
                                            alt={work.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    )}

                                    {/* Overlay */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                                        variants={textHoverVariants}
                                        initial="rest"
                                        animate={hoveredIndex === index ? "hover" : "rest"}
                                    />

                                    {/* Category Badge */}
                                    <span className="absolute top-4 right-4 bg-blue-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                    {work.category || 'Project'}
                  </span>
                                </motion.div>

                                {/* Text Content */}
                                <div className="mt-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {work.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                                        {work.description}
                                    </p>
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{
                                            opacity: hoveredIndex === index ? 1 : 0,
                                            x: hoveredIndex === index ? 0 : -10
                                        }}
                                        className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 font-medium"
                                    >
                                        View project
                                        <svg
                                            className="ml-2 w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>


            </div>
        </div>
    );
};

export default OurWorksSection;