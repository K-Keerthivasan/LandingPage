// components/HeroVideoBanner.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function HeroVideoBanner() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <iframe
                    src="https://player.vimeo.com/video/1055439402?h=a2364db79e&autoplay=1&muted=1&loop=1&background=1"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] -translate-x-1/2 -translate-y-1/2 object-cover scale-[2] sm:scale-100"
                    style={{ background: 'transparent' }}
                ></iframe>
            </div>

            {/* Overlay content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                    Welcome to <span className="text-yellow-400">My Website</span>
                </h1>
                <p className="mt-4 text-white text-lg md:text-xl max-w-2xl">
                    Explore my world of creativity and innovation
                </p>
                <Link
                    href="#about"
                    className="mt-6 px-6 py-3 text-white font-semibold border border-yellow-400 hover:bg-yellow-400 hover:text-black transition duration-300"
                >
                    Click Here to See More
                </Link>

                <div className="absolute bottom-6 text-white animate-bounce">
                    <p>Scroll</p>
                    <span className="text-2xl">&#8595;</span>
                </div>
            </div>
        </div>
    );
}
