'use client';

import React from "react";
import ContactPageSection from "@/components/Shared/ContactPageSection";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaEnvelope, FaBriefcase } from 'react-icons/fa';
import { motion } from 'framer-motion';

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const listContainerVariants = {
    visible: {
        transition: { staggerChildren: 0.1 }
    },
    hidden: {}
};

const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const linkItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Contact() {
    return (
        <div className="pl-0 md:pl-16">

            <ContactPageSection />

            <motion.section
                className="w-full px-4 md:px-16 pt-8 pb-20 bg-white dark:bg-black text-black dark:text-white transition-colors"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                    {/* Left: Services List */}
                    <motion.div
                        variants={listContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        className="flex flex-col gap-8"
                    >
                        <motion.h3
                            variants={listItemVariants}
                            className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-4"
                        >
                            What I Can Help You With
                        </motion.h3>

                        <motion.ul
                            variants={listContainerVariants}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800 dark:text-gray-300"
                        >
                            <motion.li variants={listItemVariants}>💻 Web Development – Portfolio, Blogs, E-commerce</motion.li>
                            <motion.li variants={listItemVariants}>🎬 Video Editing & VFX – Commercials, Shorts, Reels</motion.li>
                            <motion.li variants={listItemVariants}>🎨 Graphic Design – Posters, Thumbnails, Branding</motion.li>
                            <motion.li variants={listItemVariants}>📈 Digital Marketing – SEO, Campaigns, Social Ads</motion.li>
                        </motion.ul>
                    </motion.div>

                    {/* Right: Social Links and Testimonials */}
                    <motion.div
                        variants={listContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        className="flex flex-col gap-8 items-center text-center md:items-start md:text-left md:pl-8 lg:pl-12"
                    >
                        <motion.h3
                            variants={linkItemVariants}
                            className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300"
                        >
                            Find Me On
                        </motion.h3>

                        <motion.div
                            variants={listContainerVariants}
                            className="flex flex-col gap-3 text-sm"
                        >
                            <motion.div variants={linkItemVariants}>
                                <Link
                                    href="https://www.linkedin.com/in/kkvasan/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                                >
                                    <FaLinkedin className="w-4 h-4" />
                                    LinkedIn
                                </Link>
                            </motion.div>

                            <motion.div variants={linkItemVariants}>
                                <Link
                                    href="https://www.upwork.com/freelancers/~01a62123f026359fd6?mp_source=share"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-green-400 transition-colors"
                                >
                                    <FaBriefcase className="w-4 h-4" />
                                    Upwork
                                </Link>
                            </motion.div>

                            <motion.div variants={linkItemVariants}>
                                <Link
                                    href="https://github.com/K-Keerthivasan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                                >
                                    <FaGithub className="w-4 h-4" />
                                    GitHub
                                </Link>
                            </motion.div>



                            <motion.div variants={linkItemVariants}>
                                <Link
                                    href="mailto:kkvasan@k2digitalmedia.ca"
                                    className="flex items-center gap-2 hover:text-red-400 transition-colors"
                                >
                                    <FaEnvelope className="w-4 h-4" />
                                    Email
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                </div>
            </motion.section>
        </div>
    );
}
