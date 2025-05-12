'use client';

import React, { useState } from 'react';
import { supabase } from '@/components/backend/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Import motion

// Variants for the main section
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Variants for the form container to stagger children
const formContainerVariants = {
    visible: {
        transition: {
            staggerChildren: 0.1 // Delay between each form element animation
        }
    },
    hidden: {} // No specific hidden state needed for the container
};

// Variants for individual form elements (inputs, textarea, button)
const formElementVariants = {
    hidden: { opacity: 0, y: 20 }, // Start slightly down and invisible
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }, // Slide up and fade
};

// Variants for the image container
const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 }, // Start smaller and invisible
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }, // Scale up and fade in
};

// Variants for the legal text
const legalTextVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } }, // Fade in with a delay
};


export default function ContactPageSection() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('contact_messages').insert([form]);
        if (error) {
            setStatus('Failed to send message.');
        } else {
            setStatus('Message sent successfully!');
            setForm({ name: '', email: '', phone: '', message: '' });
        }
    };

    return (
        <motion.section // Wrap the main section with motion
            className="w-full px-4 md:px-16 py-20 bg-white dark:bg-black text-black dark:text-white transition-colors"
            variants={sectionVariants} // Apply section animation
            initial="hidden"
            whileInView="visible" // Animate when section is in view
            viewport={{ once: true, amount: 0.2 }} // Trigger when 20% visible, only once
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left: Contact Form */}
                <div>
                    <motion.h2 // Animate the heading
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-300 mb-6"
                    >
                        Get in Touch
                    </motion.h2>

                    <motion.form // Wrap the form with motion for staggering
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        variants={formContainerVariants} // Apply stagger container variants
                        initial="hidden" // Initial state for children
                        whileInView="visible" // Trigger children animation when container is in view
                        viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible, only once
                    >
                        <motion.div variants={formElementVariants}> {/* Wrap input div */}
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                placeholder="Name"
                                required
                                className="w-full border-b border-gray-500 bg-transparent focus:outline-none py-2 placeholder-gray-400"
                            />
                        </motion.div>
                        <motion.div variants={formElementVariants}> {/* Wrap grid div */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    placeholder="Email"
                                    required
                                    className="w-full border-b border-gray-500 bg-transparent focus:outline-none py-2 placeholder-gray-400"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={e => setForm({ ...form, phone: e.target.value })}
                                    placeholder="Phone Number"
                                    className="w-full border-b border-gray-500 bg-transparent focus:outline-none py-2 placeholder-gray-400"
                                />
                            </div>
                        </motion.div>
                        <motion.div variants={formElementVariants}> {/* Wrap textarea div */}
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={e => setForm({ ...form, message: e.target.value })}
                                placeholder="Message"
                                rows={4}
                                required
                                className="w-full border-b border-gray-500 bg-transparent focus:outline-none py-2 placeholder-gray-400 resize-none"
                            />
                        </motion.div>
                        <motion.button // Animate the button
                            type="submit"
                            variants={formElementVariants} // Apply form element animation
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 transition-colors"
                        >
                            Send
                        </motion.button>
                        {status && <p className="text-sm mt-2 text-center">{status}</p>}
                    </motion.form>

                    <motion.p // Animate the legal text
                        variants={legalTextVariants} // Apply legal text animation
                        initial="hidden"
                        whileInView="visible" // Animate when in view
                        viewport={{ once: true, amount: 0.5 }} // Trigger when 50% visible, only once
                        className="mt-8 text-xs text-center text-gray-600 dark:text-gray-400"
                    >
                        This site is protected by reCAPTCHA and the Google{' '}
                        <span className="text-blue-500 cursor-pointer">Privacy Policy</span> and{' '}
                        <span className="text-orange-500 cursor-pointer">Terms of Service</span> apply.
                        Use of this form for solicitation or advertising may violate the{' '}
                        <span className="text-pink-500 cursor-pointer">CAN-SPAM act</span>. Each violation
                        carries a fine of up to $50,120 and will be automatically reported to the FTC.
                    </motion.p>
                </div>

                {/* Right: Watermark Image */}
                <motion.div // Animate the image container
                    className="hidden md:flex justify-center items-center p-4"
                    variants={imageVariants} // Apply image animation
                    initial="hidden"
                    whileInView="visible" // Animate when in view
                    viewport={{ once: true, amount: 0.5 }} // Trigger when 50% visible, only once
                >
                    <Link href="/" className="block w-full max-w-sm">
                        <div className="relative w-full aspect-[5/4] overflow-hidden rounded-lg">
                            <Image
                                src="https://i.imgur.com/bg0Vs3X.jpeg"
                                alt="Contact Logo"
                                fill
                                className="object-cover select-none hover:opacity-60 transition-opacity"
                            />
                        </div>
                    </Link>
                </motion.div>

            </div>
        </motion.section>
    );
}
