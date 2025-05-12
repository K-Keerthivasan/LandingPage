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
            staggerChildren: 0.15 // Stagger list items
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function AboutCoreValues() {
    return (
        <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
        >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-4">My Guiding Principles</motion.h2>
            <motion.ul
                variants={sectionVariants} // Apply staggered animation to children
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-4"
            >
                <motion.li variants={itemVariants} className="flex items-start space-x-3">
                    <span className="text-blue-600 dark:text-blue-400 text-xl mt-1">✓</span>
                    <div>
                        <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">Crystal Clear Communication</h3>
                        <p className="text-gray-700 dark:text-gray-300">Keeping you informed every step of the way, setting realistic expectations, and being readily available for questions or discussions. No jargon, just clarity.</p>
                    </div>
                </motion.li>
                <motion.li variants={itemVariants} className="flex items-start space-x-3">
                    <span className="text-teal-600 dark:text-teal-400 text-xl mt-1">✓</span>
                    <div>
                        <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">Creative Problem Solving</h3>
                        <p className="text-gray-700 dark:text-gray-300">Finding innovative and elegant solutions to unique challenges, whether it&apos;s a complex coding issue or a tricky editing sequence.</p>
                    </div>
                </motion.li>
                <motion.li variants={itemVariants} className="flex items-start space-x-3">
                    <span className="text-purple-600 dark:text-purple-400 text-xl mt-1">✓</span>
                    <div>
                        <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">Commitment to Quality</h3>
                        <p className="text-gray-700 dark:text-gray-300">Delivering high-quality, polished work that looks great, functions perfectly, and stands the test of time (and trends!).</p>
                    </div>
                </motion.li>
                <motion.li variants={itemVariants} className="flex items-start space-x-3">
                    <span className="text-yellow-600 dark:text-yellow-400 text-xl mt-1">✓</span>
                    <div>
                        <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">Client-Centric Approach</h3>
                        <p className="text-gray-700 dark:text-gray-300">Your goals are my priority. I strive to understand your needs deeply and tailor solutions that genuinely add value to your project or business.</p>
                    </div>
                </motion.li>
            </motion.ul>
        </motion.section>
    );
}
