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
            staggerChildren: 0.3 // Stagger text and button
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function AboutResumeDownload() {
    return (
        <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center space-y-6"
        >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-4">Want to Learn More?</motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-800 dark:text-gray-200 mb-6">
                Find detailed information about my experience, skills, and projects in my resume.
            </motion.p>
            <motion.div variants={itemVariants}>
                <a
                    href="/Keerthi_Resume.pdf" // Ensure this file exists in your public directory
                    download
                    className="inline-block px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                    Download My Resume <span className="ml-2">↓</span>
                </a>
            </motion.div>
        </motion.section>
    );
}
