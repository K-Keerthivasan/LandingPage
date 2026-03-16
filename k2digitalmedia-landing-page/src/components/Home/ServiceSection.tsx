'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import motion
import { easeOut } from 'framer-motion';

type Service = {
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

import { createBrowserSupabase } from '@/app/lib/client';
const supabase = createBrowserSupabase();

// Define animation variants for each service item
const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

// Define staggered animation for elements within the item
const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};


export default function ServiceSection() {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('created_at', { ascending: true });

            if (!error && data) setServices(data);
        };

        fetchServices();
    }, []);

    return (
        <>
            {/* Map through services and wrap each section with motion */}
            {services.map((service) => (
                <motion.section // Wrap each individual service item section
                    key={service.id}
                    className="px-6 py-20 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300"
                    variants={itemVariants} // Apply the item animation variants
                    initial="hidden"
                    whileInView="visible" // Animate when the item is in view
                    viewport={{ once: true, amount: 0.2 }} // Only animate once, when 20% visible
                >
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        {/* Left: Image or Video - Can also be animated */}
                        <motion.div
                            variants={contentVariants} // Apply content animation
                            initial="hidden"
                            whileInView="visible" // Animate when in view
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: 0.2 }} // Stagger animation slightly
                            className="w-full h-auto"
                        >
                            {service.type === 'video' ? (
                                <video
                                    controls
                                    className="rounded-lg shadow-2xl object-cover w-full"
                                    src={service.videoURL}
                                />
                            ) : (
                                <Image
                                    src={service.thumbnailURL}
                                    alt={service.title}
                                    width={700}
                                    height={400}
                                    className="rounded-lg shadow-2xl object-cover"
                                />
                            )}
                        </motion.div>

                        {/* Right: Content - Animate individual elements */}
                        <div className="flex flex-col justify-center"> {/* Added flex container for content */}
                            <motion.h2
                                variants={contentVariants} // Apply content animation
                                initial="hidden"
                                whileInView="visible" // Animate when in view
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: 0.3 }} // Stagger animation
                                className="text-4xl md:text-5xl font-bold mb-4 text-blue-900 dark:text-blue-300"
                            >
                                {service.title}
                            </motion.h2>
                            <motion.div
                                variants={contentVariants} // Apply content animation
                                initial="hidden"
                                whileInView="visible" // Animate when in view
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: 0.4 }} // Stagger animation
                                className="w-12 h-1 bg-blue-500 dark:bg-blue-300 mb-6"
                            ></motion.div>
                            <motion.p
                                variants={contentVariants} // Apply content animation
                                initial="hidden"
                                whileInView="visible" // Animate when in view
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: 0.5 }} // Stagger animation
                                className="mb-4 leading-relaxed whitespace-pre-line"
                            >
                                {service.description}
                            </motion.p>
                            <motion.div // Wrap Link in motion div
                                variants={contentVariants} // Apply content animation
                                initial="hidden"
                                whileInView="visible" // Animate when in view
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: 0.6 }} // Stagger animation
                            >
                                <Link
                                    href={`/services/${service.route}`}
                                    className="inline-block mt-4 px-6 py-3 bg-blue-900 dark:bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
                                >
                                    Learn More
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
            ))}
        </>
    );
}
