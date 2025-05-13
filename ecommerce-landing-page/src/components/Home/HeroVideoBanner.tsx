'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroVideoBanner() {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const fadeOut = setTimeout(() => {
            overlayRef.current?.classList.add('opacity-0');
            setTimeout(() => overlayRef.current?.remove(), 500);
        }, 1000);

        return () => clearTimeout(fadeOut);
    }, []);

    if (!isMounted) {
        return <div style={{ backgroundColor: '#000', width: '100vw', height: '100vh' }} />;
    }

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden" style={{ backgroundColor: '#000' }}>
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 z-20 bg-black transition-opacity duration-500"
            >
                <Image
                    src="https://i.imgur.com/BpOGGhD.jpeg"
                    alt="Loading Cover"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Video */}

            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="  absolute top-1/2 left-1/2  w-[200vw] h-[200vh] -translate-x-1/2 -translate-y-1/2
  object-cover z-0
  scale-[1.5] sm:scale-100
  transition-transform duration-700 ease-in-out
  bg-black
"
                style={{ backgroundColor: 'black' }}
            >
                <source src="/showreel_fanshawe_fall.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>



            {/* Foreground Content */}
            <div className="relative z-30 flex flex-col items-center justify-center text-center h-full px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                    Welcome to <span className="text-yellow-400">My Website</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white max-w-2xl">
                    Explore my world of creativity and innovation
                </p>
                <Link
                    href="/about"
                    className="mt-6 px-6 py-3 border border-yellow-400 text-white font-semibold hover:bg-yellow-400 hover:text-black transition duration-300"
                >
                    Click Here to See More
                </Link>
                <div className="absolute bottom-6 text-white animate-bounce text-center">
                    <p>Scroll</p>
                    <span className="text-2xl">&#8595;</span>
                </div>
            </div>
        </div>
    );
}

