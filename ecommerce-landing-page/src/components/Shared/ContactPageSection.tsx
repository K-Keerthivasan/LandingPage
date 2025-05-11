'use client';

import React, { useState } from 'react';
import { supabase } from '@/components/backend/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';

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
        <section className="w-full px-4 md:px-16 py-20 bg-white dark:bg-black text-black dark:text-white transition-colors">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left: Contact Form */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-300 mb-6">
                        Get in Touch
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                placeholder="Name"
                                required
                                className="w-full border-b border-gray-500 bg-transparent focus:outline-none py-2 placeholder-gray-400"
                            />
                        </div>
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
                        <div>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={e => setForm({ ...form, message: e.target.value })}
                                placeholder="Message"
                                rows={4}
                                required
                                className="w-full border-b border-gray-500 bg-transparent focus:outline-none py-2 placeholder-gray-400 resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 transition-colors"
                        >
                            Send
                        </button>
                        {status && <p className="text-sm mt-2 text-center">{status}</p>}
                    </form>

                    <p className="mt-8 text-xs text-center text-gray-600 dark:text-gray-400">
                        This site is protected by reCAPTCHA and the Google{' '}
                        <span className="text-blue-500 cursor-pointer">Privacy Policy</span> and{' '}
                        <span className="text-orange-500 cursor-pointer">Terms of Service</span> apply.
                        Use of this form for solicitation or advertising may violate the{' '}
                        <span className="text-pink-500 cursor-pointer">CAN-SPAM act</span>. Each violation
                        carries a fine of up to $50,120 and will be automatically reported to the FTC.
                    </p>
                </div>

                {/* Right: Watermark Image */}
                <div className="hidden md:flex justify-center items-center p-4">
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
                </div>

            </div>
        </section>
    );
}
