'use client';

import React, {useRef, useState} from 'react';
import { supabase } from '@/components/backend/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HCaptcha from '@hcaptcha/react-hcaptcha';

// --- Animation Variants ---
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const formContainerVariants = {
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
    hidden: {},
};

const formElementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const legalTextVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
};

// --- Main Component ---
export default function ContactPageSection() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        botField: '', // Honeypot field
    });

    const [status, setStatus] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [captchaError, setCaptchaError] = useState('');
    const captchaRef = useRef<HCaptcha>(null);

    // Toggle this to false if you want to skip verification.ts (⚠️ less secure)
    const USE_SERVER_VERIFICATION = true;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.botField) return; // Block bots via honeypot

        if (!captchaToken) {
            setCaptchaError('Please complete the CAPTCHA before submitting.');
            return;
        }

        if (USE_SERVER_VERIFICATION) {
            const verify = await fetch('/api/verify-captcha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: captchaToken }),
            });

            const { success } = await verify.json();
            if (!success) {
                setCaptchaError('CAPTCHA verification failed. Try again.');
                captchaRef.current?.resetCaptcha(); // Reset if failed
                return;
            }
        }

        const { error } = await supabase.from('contact_messages').insert([{
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
        }]);

        if (error) {
            setStatus('Failed to send message.');
        } else {
            setStatus('Message sent successfully!');
            setForm({ name: '', email: '', phone: '', message: '', botField: '' });
            setCaptchaToken('');
            captchaRef.current?.resetCaptcha(); // ✅ Reset hCaptcha visually
        }
    };


    return (
        <motion.section
            className="w-full px-4 md:px-16 py-20 bg-white dark:bg-black text-black dark:text-white transition-colors"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left: Contact Form */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-300 mb-6"
                    >
                        Get in Touch
                    </motion.h2>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        variants={formContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* Honeypot Field */}
                        <motion.input
                            type="text"
                            name="botField"
                            className="hidden"
                            value={form.botField}
                            onChange={(e) => setForm({ ...form, botField: e.target.value })}
                            tabIndex={-1}
                            autoComplete="off"
                        />

                        {/* Name */}
                        <motion.div variants={formElementVariants}>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Name"
                                required
                                className="w-full border-b border-gray-500 bg-transparent focus:outline-none py-2 placeholder-gray-400"
                            />
                        </motion.div>

                        {/* Email & Phone */}
                        <motion.div variants={formElementVariants}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="Email"
                                    required
                                    className="w-full border-b border-gray-500 bg-transparent focus:outline-none py-2 placeholder-gray-400"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    placeholder="Phone Number"
                                    className="w-full border-b border-gray-500 bg-transparent focus:outline-none py-2 placeholder-gray-400"
                                />
                            </div>
                        </motion.div>

                        {/* Message */}
                        <motion.div variants={formElementVariants}>
              <textarea
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Message"
                  rows={4}
                  required
                  className="w-full border-b border-gray-500 bg-transparent focus:outline-none py-2 placeholder-gray-400 resize-none"
              />
                        </motion.div>

                        {/* hCaptcha */}
                        <motion.div variants={formElementVariants}>
                            <HCaptcha
                                ref={captchaRef}
                                sitekey="e5d291c6-ea70-42fa-a1a2-ae86dc02916c"
                                onVerify={(token) => {
                                    setCaptchaToken(token);
                                    setCaptchaError('');
                                }}
                                onExpire={() => setCaptchaToken('')}
                            />
                            {captchaError && <p className="text-red-500 text-sm mt-1">{captchaError}</p>}
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            variants={formElementVariants}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 transition-colors"
                        >
                            Send
                        </motion.button>

                        {/* Status Message */}
                        {status && <p className="text-sm mt-2 text-center">{status}</p>}
                    </motion.form>

                    {/* Legal Text */}
                    <motion.p
                        variants={legalTextVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        className="mt-8 text-xs text-center text-gray-600 dark:text-gray-400"
                    >
                        This site is protected by reCAPTCHA and the Google{' '}
                        <span className="text-blue-500 cursor-pointer">Privacy Policy</span> and{' '}
                        <span className="text-orange-500 cursor-pointer">Terms of Service</span> apply. Use of this form for
                        solicitation may violate the{' '}
                        <span className="text-pink-500 cursor-pointer">CAN-SPAM act</span>.
                    </motion.p>
                </div>

                {/* Right: Image */}
                <motion.div
                    className="hidden md:flex justify-center items-center p-4"
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <Link href="/contact" className="block w-full max-w-sm">
                        <div className="relative w-full aspect-[1] overflow-hidden rounded-lg">
                            <Image
                                src="https://i.imgur.com/gfH4xWS.png"
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
