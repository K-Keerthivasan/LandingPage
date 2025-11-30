'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';

// Animation variants (can be defined here or passed as props)
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: easeOut,
            staggerChildren: 0.15 // Stagger list items
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function AboutHobbies() {
    return (
        <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
        >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-4">Beyond the Screen</motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                While code and creativity keep me busy, here&apos;s a peek into what I enjoy when I&apos;m not building digital experiences:
            </motion.p>
            <motion.ul
                variants={sectionVariants} // Apply staggered animation to children
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300"
            >
                <motion.li variants={itemVariants}>Exploring hiking trails and convincing myself I enjoy cardio.</motion.li>
                <motion.li variants={itemVariants}>Trying (and often failing) to master new recipes in the kitchen.</motion.li>
                <motion.li variants={itemVariants}>Getting lost in a good book or documentary.</motion.li>
                <motion.li variants={itemVariants}>Playing around with photography and capturing everyday moments.</motion.li>
            </motion.ul>
        </motion.section>
    );
}
