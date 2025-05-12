'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { supabase } from '@/components/backend/supabaseClient';

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
};

const workSectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.3
        }
    },
};

const workItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    },
};

export default function OurWorksSection() {
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWorks = async () => {
            setLoading(true);
            setError(null);
            const { data, error } = await supabase
                .from('our_works')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) {
                console.error('Error fetching works:', error);
                setError('Failed to load works. Please try again later.');
                setLoading(false);
            } else if (data) {
                setWorks(data);
                setLoading(false);
            } else {
                setWorks([]);
                setLoading(false);
            }
        };

        fetchWorks();
    }, []);

    return (
        <div className="px-6 md:pl-20 pt-24 md:pt-32 pb-20 bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 ease-in-out">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-blue-900 dark:text-blue-300 mb-4">MY WORK</h2>
                    <div className="w-16 h-1 bg-blue-500 dark:bg-blue-300 mb-6 rounded-full"></div>
                    <p className="max-w-4xl text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                        With a passion for bringing creative visions to life, I offer a range of services including custom website design and development, impactful video editing and production, captivating photography, and strategic digital marketing support. I work with clients across various industries, focusing on creating compelling online presences and powerful visual stories. My goal is to be your dedicated creative partner, helping you achieve your objectives with personalized attention and expertise.
                    </p>
                </motion.div>

                {loading && (
                    <div className="text-center text-xl text-gray-600 dark:text-gray-400">Loading works...</div>
                )}
                {error && (
                    <div className="text-center text-xl text-red-600 dark:text-red-400">{error}</div>
                )}
                {!loading && !error && works.length === 0 && (
                    <div className="text-center text-xl text-gray-600 dark:text-gray-400">No works found.</div>
                )}

                <div className="space-y-12 md:space-y-16">
                    {works.map((work, index) => (
                        <motion.section
                            key={work.id}
                            variants={workSectionVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="py-16 md:py-20 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                                {/* Media Section */}
                                <motion.div
                                    variants={workItemVariants}
                                    className={`relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl shadow-2xl ${
                                        index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'
                                    }`}
                                >
                                    {work.type === 'video' ? (
                                        <video
                                            controls
                                            className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                            src={work.videoURL}
                                            aria-label={`Video for ${work.title}`}
                                        />
                                    ) : (
                                        <Image
                                            src={work.thumbnailURL}
                                            alt={work.title}
                                            fill
                                            className="object-cover rounded-xl"
                                        />
                                    )}
                                </motion.div>

                                {/* Text Section */}
                                <motion.div
                                    variants={workItemVariants}
                                    className={`w-full self-center ${
                                        index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1'
                                    } flex flex-col justify-center`} // Added flex and justify-center
                                >
                                    <h3 className="text-3xl md:text-4xl font-bold mb-3 text-blue-900 dark:text-blue-300">
                                        {work.title}
                                    </h3>
                                    <div className="w-12 h-1 bg-blue-500 dark:bg-blue-300 mb-6 rounded-full"></div>
                                    <p className="mb-6 leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-line">
                                        {work.description}
                                    </p>
                                    <Link
                                        href={`/our_works/${work.route}`}
                                        className="inline-block px-8 py-3 bg-blue-900 dark:bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-300 transform hover:scale-105 shadow-lg"
                                    >
                                        View Details →
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.section>
                    ))}
                </div>
            </div>
        </div>
    );
}
