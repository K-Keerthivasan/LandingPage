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
            staggerChildren: 0.2 // Stagger process steps
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function AboutHowIWork() {
    return (
        <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
        >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-4">How I Work</motion.h2>
            <motion.div
                variants={sectionVariants} // Apply staggered animation to children
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                <motion.div variants={itemVariants} className="text-center">
                    <div className="text-4xl text-teal-500 dark:text-teal-300 mb-3">💡</div> {/* Icon placeholder */}
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Understand & Plan</h3>
                    <p className="text-gray-700 dark:text-gray-300">Deeply understanding your vision, goals, and audience is the first step. We&apos;ll define the scope and create a clear roadmap.</p>
                </motion.div>
                <motion.div variants={itemVariants} className="text-center">
                    <div className="text-4xl text-purple-500 dark:text-purple-300 mb-3">✍️</div> {/* Icon placeholder */}
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Design & Build</h3>
                    <p className="text-gray-700 dark:text-gray-300">Translating ideas into tangible designs and then bringing them to life with clean, efficient code or compelling video edits.</p>
                </motion.div>
                <motion.div variants={itemVariants} className="text-center">
                    <div className="text-4xl text-yellow-500 dark:text-yellow-300 mb-3">🚀</div> {/* Icon placeholder */}
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Review & Deploy</h3>
                    <p className="text-gray-700 dark:text-gray-300">Iterative feedback, rigorous testing, and smooth deployment to ensure the final product exceeds expectations.</p>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
