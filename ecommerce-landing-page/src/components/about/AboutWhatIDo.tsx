'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Animation variants (can be defined here or passed as props)
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.2 // Stagger cards
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function AboutWhatIDo() {
    return (
        <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
        >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-4">What I Bring to the Table</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">Web Design & Development</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Crafting responsive, modern websites from concept to deployment. I focus on clean code, intuitive user interfaces, and performance, primarily using React, Next.js, and Tailwind CSS to build scalable and maintainable applications.
                    </p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">Video Production & Editing</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        From commercials and social media reels to short film sequences, I bring stories to life. Expertise in Adobe Premiere Pro, After Effects, and VFX tools allows me to deliver polished, impactful video content that resonates with your audience.
                    </p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">Digital Strategy & Consulting</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Beyond building, I help you think about your online presence. This includes advice on basic SEO, user experience improvements, and leveraging digital platforms to help your brand or project gain visibility.
                    </p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">Visual Storytelling & Design</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Leveraging my background in visual arts and design principles to create compelling digital experiences. This includes graphic design elements, UI/UX considerations, and ensuring visual consistency across all platforms.
                    </p>
                </motion.div>
            </div>

        </motion.section>
    );
}
