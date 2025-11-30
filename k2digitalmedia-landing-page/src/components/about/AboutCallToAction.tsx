'use client';

import React from 'react';
import Link from 'next/link';
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
            staggerChildren: 0.3 // Stagger text and button
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};


export default function AboutCallToAction() {
    return (
        <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center space-y-6"
        >
            <motion.h3 variants={itemVariants} className="text-4xl font-bold text-blue-800 dark:text-blue-300">Ready to Build Something Amazing?</motion.h3>
            <motion.p variants={itemVariants} className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                Whether you have a fully-fleshed project idea or just want to explore possibilities, I&apos;d love to connect and see how I can help bring your vision to life.
            </motion.p>
            <motion.div variants={itemVariants}>
                <Link
                    href="/contact"
                    className="inline-block px-10 py-5 bg-blue-900 dark:bg-blue-600 text-white font-bold text-xl rounded-lg shadow-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Let&apos;s Talk! <span className="ml-2">→</span>
                </Link>
            </motion.div>
        </motion.section>
    );
}
