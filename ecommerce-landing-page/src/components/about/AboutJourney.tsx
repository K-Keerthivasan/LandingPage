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
            staggerChildren: 0.3 // Stagger paragraphs
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function AboutJourney() {
    return (
        <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
        >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-4">My Journey</motion.h2>
            <motion.p variants={itemVariants} className="leading-relaxed text-lg text-gray-800 dark:text-gray-200">
                My creative path began behind the lens and in the edit suite during my college days. I was captivated by the power of visual storytelling, spending hours crafting narratives through short films and dynamic ad campaigns. This foundation in <strong className="text-teal-600 dark:text-teal-300">VFX and video editing</strong> gave me a unique perspective – understanding how to capture attention and communicate ideas effectively through visuals.
            </motion.p>
            <motion.p variants={itemVariants} className="leading-relaxed text-lg text-gray-800 dark:text-gray-200">
                As I helped clients with video content, I often saw the need for a stronger online presence. This sparked my interest in <strong className="text-blue-700 dark:text-blue-400">web development and digital design</strong>. I taught myself to code, initially focusing on turning designs into clean, functional websites. My background in visual arts meant I naturally gravitated towards creating user-friendly, aesthetically pleasing interfaces that truly represent a brand.
            </motion.p>
            <motion.p variants={itemVariants} className="leading-relaxed text-lg text-gray-800 dark:text-gray-200">
                Today, I blend these skills daily. Whether I&apos;m building a custom web application, designing a landing page, or cutting together a promotional video, my goal is always the same: to help businesses and individuals translate their vision into a compelling digital reality. It&apos;s a journey from pixels on a timeline to pixels on a screen, and I love every step of it.
            </motion.p>
        </motion.section>
    );
}
