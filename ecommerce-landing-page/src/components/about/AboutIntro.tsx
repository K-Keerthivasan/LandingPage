'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';
// Placeholder image - replace with Keerthi's actual photo
const profilePictureUrl = '/keerthi.png'; // Make sure this path is correct

// Animation variants for individual items within this section
const introVariants = {
    image: {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
    },
    text: {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut, delay: 0.2 } },
    },
    funFact: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: 20, transition: { duration: 0.3 } } // Requires AnimatePresence higher up
    }
};


export default function AboutIntro() {
    const [showFunFact, setShowFunFact] = useState(false);
    const funFacts = [
        "I’ve hit refresh more times than I’ve blinked today.",
        "I once designed a game level so hard, even I rage-quit during testing.",
        "My render times have taught me patience in ways meditation never could.",
        "I’ve built a portfolio site just to procrastinate building my actual portfolio.",
        "I once rotoscoped a coffee cup longer than it took to drink it.",
        "My CSS animations have more keyframes than my last short film.",
        "I’ve spent more time debugging than sleeping — and weirdly, I enjoy it.",
        "My game assets folder has more 'final_v2_reallyFinal_THISone' files than actual textures."
    ];

    const [currentFunFact, setCurrentFunFact] = useState(funFacts[0]);

    const toggleFunFact = () => {
        const randomIndex = Math.floor(Math.random() * funFacts.length);
        setCurrentFunFact(funFacts[randomIndex]);
        setShowFunFact(!showFunFact);
    };

    return (
        <section className="flex flex-col md:flex-row items-center md:space-x-12 space-y-10 md:space-y-0">
            <motion.div
                variants={introVariants.image}
                initial="initial"
                animate="animate"
                className="relative w-56 h-56 md:w-64 md:h-64 flex-shrink-0"
            >
                <Image
                    src={profilePictureUrl}
                    alt="Keerthi's Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full shadow-xl border-4 border-blue-300 dark:border-blue-600"
                />
            </motion.div>
            <motion.div
                variants={introVariants.text}
                initial="initial"
                animate="animate"
                className="flex-grow text-center md:text-left"
            >
                <h1 className="text-5xl md:text-7xl font-extrabold text-blue-900 dark:text-blue-300 mb-6 leading-tight">
                    Hey! I &apos;m Keerthi <span className="animate-wave inline-block">👋</span>
                </h1>
                <p className="text-xl md:text-2xl leading-relaxed text-gray-800 dark:text-gray-200">
                    A full-stack creative passionate about blending <strong className="text-blue-700 dark:text-blue-400">functional code</strong> with <strong className="text-teal-600 dark:text-teal-300">captivating visuals</strong> to build modern web experiences and tell compelling stories through video.
                </p>
                <button
                    onClick={toggleFunFact}
                    className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    {showFunFact ? 'Hide a Fun Fact' : 'Reveal a Fun Fact'}
                </button>
                {showFunFact && (
                    <motion.p
                        variants={introVariants.funFact}
                        initial="initial"
                        animate="animate"
                        className="mt-4 text-lg italic text-gray-700 dark:text-gray-300"
                    >
                        {currentFunFact}
                    </motion.p>
                )}

            </motion.div>
            {/* Simple global styles for the wave animation - can be moved to global CSS if preferred */}
            <style jsx>{`
                @keyframes wave {
                    0% { transform: rotate(0deg); }
                    15% { transform: rotate(14deg); }
                    30% { transform: rotate(-8deg); }
                    40% { transform: rotate(14deg); }
                    50% { transform: rotate(-4deg); }
                    60% { transform: rotate(10deg); }
                    70% { transform: rotate(0deg); }
                    100% { transform: rotate(0deg); }
                }
                .animate-wave {
                    animation: wave 2.5s infinite;
                    transform-origin: 70% 70%;
                }
            `}</style>
        </section>
    );
}
