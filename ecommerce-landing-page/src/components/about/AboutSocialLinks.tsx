'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

// Animation variants (can be defined here or passed as props)
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.1 // Stagger social icons
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function AboutSocialLinks() {
    return (
        <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center space-y-4"
        >
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-blue-800 dark:text-blue-200">Connect With Me</motion.h2>
            <motion.div
                variants={sectionVariants} // Apply staggered animation to children
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="flex justify-center space-x-6"
            >
                {/* Social media icons using react-icons */}

                {/* GitHub */}
                <motion.a
                    variants={itemVariants} // Apply scroll-in animation
                    whileHover={{ scale: 1.2, rotate: 5, color: '#6e5494' }} // Hover animation: scale, rotate, and color (GitHub purple)
                    transition={{ duration: 0.2 }} // Hover transition duration
                    href="https://github.com/yourusername" // Replace with actual GitHub URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" // Base color and transition
                    aria-label="GitHub" // Accessibility
                >
                    <FaGithub className="w-8 h-8" /> {/* Render the GitHub icon */}
                </motion.a>

                {/* Instagram */}
                <motion.a
                    variants={itemVariants} // Apply scroll-in animation
                    whileHover={{ scale: 1.2, rotate: 5, color: '#E1306C' }} // Hover animation: scale, rotate, and color (Instagram pink/purple)
                    transition={{ duration: 0.2 }} // Hover transition duration
                    href="https://instagram.com/yourusername" // Replace with actual Instagram URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" // Base color and transition
                    aria-label="Instagram" // Accessibility
                >
                    <FaInstagram className="w-8 h-8" /> {/* Render the Instagram icon */}
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                    variants={itemVariants} // Apply scroll-in animation
                    whileHover={{ scale: 1.2, rotate: 5, color: '#0077B5' }} // Hover animation: scale, rotate, and color (LinkedIn blue)
                    transition={{ duration: 0.2 }} // Hover transition duration
                    href="https://linkedin.com/in/yourusername" // Replace with actual LinkedIn URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" // Base color and transition
                    aria-label="LinkedIn" // Accessibility
                >
                    <FaLinkedin className="w-8 h-8" /> {/* Render the LinkedIn icon */}
                </motion.a>

                {/* YouTube */}
                <motion.a
                    variants={itemVariants} // Apply scroll-in animation
                    whileHover={{ scale: 1.2, rotate: 5, color: '#FF0000' }} // Hover animation: scale, rotate, and color (YouTube red)
                    transition={{ duration: 0.2 }} // Hover transition duration
                    href="https://youtube.com/yourchannel" // Replace with actual YouTube URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" // Base color and transition
                    aria-label="YouTube" // Accessibility
                >
                    <FaYoutube className="w-8 h-8" /> {/* Render the YouTube icon */}
                </motion.a>

            </motion.div>
        </motion.section>
    );
}
