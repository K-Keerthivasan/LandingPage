'use client';

import React from 'react';
//import Image from 'next/image';

export default function ContactPageSection() {
    return (
        <section className="w-full px-4 md:px-16 py-20 bg-white dark:bg-black text-black dark:text-white transition-colors">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left: Contact Form */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-300 mb-6">
                        Get in Touch
                    </h2>

                    <form className="space-y-6">
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border-b border-gray-500 bg-transparent focus:outline-none py-2 placeholder-gray-400"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border-b border-gray-500 bg-transparent focus:outline-none py-2 placeholder-gray-400"
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full border-b border-gray-500 bg-transparent focus:outline-none py-2 placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Message"
                                rows={4}
                                className="w-full border-b border-gray-500 bg-transparent focus:outline-none py-2 placeholder-gray-400 resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 transition-colors"
                        >
                            Send
                        </button>
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
                <div className="hidden md:flex justify-center items-center">
                 {/*   <Image
                        src="/logo-outline.png" // Replace this with your watermark-style image
                        alt="Contact Logo"
                        width={500}
                        height={500}
                        className="opacity-10 select-none"
                    />*/}
                </div>
            </div>
        </section>
    );
}
