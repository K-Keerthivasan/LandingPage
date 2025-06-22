'use client';

// Import icons from react-icons
import {
    SiReact, SiNextdotjs, SiTailwindcss, SiMui, SiSupabase, SiFirebase,
    SiAdobepremierepro, SiAdobeaftereffects, SiNuke,
    SiUnrealengine,
    SiAdobephotoshop, SiBlender,
} from 'react-icons/si';
import {FaNodeJs, FaGraduationCap} from 'react-icons/fa';
import {TbBrandCpp} from "react-icons/tb";
import {BiLogoVisualStudio} from "react-icons/bi";
import {SiDavinciresolve} from "react-icons/si"; // Found a better icon for DaVinci Resolve
import React from 'react';
import {motion} from 'framer-motion';
import { easeOut } from 'framer-motion';

// Animation variants (can be defined here or passed as props)
const sectionVariants = {
    hidden: {opacity: 0, y: 50},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: easeOut,
            staggerChildren: 0.07 // Slightly faster stagger for more items
        }
    },
};

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0},
};

// Define the tech stack with corresponding icon components and brand colors
const techStack = [
    {name: 'React', icon: SiReact, color: '#61DAFB'},
    {name: 'Next.js', icon: SiNextdotjs, color: '#000000'}, // Black or white depending on theme, but black is standard logo
    {name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4'},
    {name: 'MUI', icon: SiMui, color: '#007FFF'},
    {name: 'Supabase', icon: SiSupabase, color: '#3ECF8E'},
    {name: 'Firebase', icon: SiFirebase, color: '#FFCA28'},
    {name: 'Node.js', icon: FaNodeJs, color: '#339933'},
    {name: 'Unreal Engine', icon: SiUnrealengine, color: '#313131'}, // Dark gray/black
    {name: 'Visual Studio', icon: BiLogoVisualStudio, color: '#5C2D91'}, // Purple
    {name: 'DaVinci Resolve', icon: SiDavinciresolve, color: '#5D5D5D'}, // Using SiDavinciresolve
    {name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF'}, // Blue
    {name: 'Premiere Pro', icon: SiAdobepremierepro, color: '#EA77FF'}, // Purple/Pink
    {name: 'After Effects', icon: SiAdobeaftereffects, color: '#9999FF'}, // Lighter Purple
    {name: 'Nuke', icon: SiNuke, color: '#FFC400'}, // Yellow/Orange - Note: SiNuke might be Nuke by The Foundry, color adjusted
    {name: 'Blender', icon: SiBlender, color: '#F5792A'}, // Orange
    {name: 'C++', icon: TbBrandCpp, color: '#00599C'}, // Blue
    {name: 'AI Tools', icon: FaGraduationCap, color: '#FFD700'}, // Gold/Yellow - Using a graduation cap icon
];

export default function AboutToolkit() {
    return (
        <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.3}}
            className="space-y-6"
        >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-4">My
                Toolkit
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                Here are some of the technologies and tools I work with regularly:
            </motion.p>
            <motion.div
                variants={sectionVariants} // Apply staggered animation to children
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.3}}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
                {techStack.map((tech) => (
                    <motion.div
                        key={tech.name}
                        variants={itemVariants} // Apply item animation for scroll-in
                        whileHover={{
                            scale: 1.15, // Scale up slightly more on hover
                            y: -8, // Lift slightly more on hover
                            rotate: 5, // Add a subtle rotation
                            boxShadow: `0px 20px 30px rgba(0,0,0,0.3), 0px 0px 15px ${tech.color}`, // More pronounced shadow + colored glow
                            color: tech.color, // Change text/icon color to the tech's brand color on hover
                            borderColor: tech.color, // Change border color
                            borderWidth: 2, // Add border width for the stroke effect
                            transition: {duration: 0.3, ease: "easeOut"} // Animation duration and easing for hover
                        }}
                        // Base styles for the grid item
                        className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md cursor-pointer transform transition-transform duration-300 border-2 border-transparent" // Added base border
                    >
                        {/* Render the imported Icon Component */}
                        {/* Base icon color is set here, hover color is handled by Framer Motion */}
                        <div className="text-5xl text-gray-700 dark:text-gray-300 mb-2">
                            <tech.icon/>
                        </div>
                        <span
                            className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">{tech.name}</span>
                    </motion.div>
                ))}
            </motion.div>
            <motion.p variants={itemVariants}
                      className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center italic">
                Constantly learning and exploring new tools to build better things.
            </motion.p>
        </motion.section>
    );
}
