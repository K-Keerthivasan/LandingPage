'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {SunIcon, MoonIcon} from '@heroicons/react/24/solid';
import {useTheme} from 'next-themes';

// Hook defined inline to prevent hydration issues
function useIsClient() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    return isClient;
}

const navItems = [
    {name: 'OUR WORK', href: '/'},
    {name: 'WEB DEVELOPMENT', href: '/web'},
    {name: 'VIDEO PRODUCTION', href: '/video'},
    {name: 'DIGITAL MARKETING', href: '/marketing'},
    {name: 'ABOUT US', href: '/about'},
    {name: 'CONTACT', href: '/contact'},
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const {resolvedTheme, setTheme} = useTheme();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const isClient = useIsClient();

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!isClient) return null; // Prevent hydration mismatch

    return (
        <>
            {/* Mini Sidebar - Top on mobile, Side on desktop */}
            <div
                className="fixed z-40 bg-blue-900 dark:bg-gray-900 text-white
        top-0 left-0 w-full h-[70px] flex items-center justify-between px-4
        md:flex-col md:w-[70px] md:h-full md:items-center md:justify-start md:pt-6 md:px-0"
            >
                <div className="md:mb-4">

                    <Link
                        href="/"
                        className="text-white dark:text-gray-100 text-2xl font-semibold italic transition-all duration-300
             hover:scale-110
             hover:text-shadow-glow-light
             dark:hover:[text-shadow:0_0_10px_red]
             focus:outline-none"
                    >
                        KK
                    </Link>



                </div>

                <div className="md:mt-2">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="w-8 h-8 border-white rounded flex flex-col justify-center items-center"
                    >
                        <span className="w-5 h-0.5 bg-white mb-1"/>
                        <span className="w-5 h-0.5 bg-white mb-1"/>
                        <span className="w-5 h-0.5 bg-white"/>
                    </button>
                </div>
            </div>

            {/* Full Overlay Sidebar */}
            <aside
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full w-[300px] bg-blue-900 dark:bg-gray-900 text-white p-6 z-50 transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out flex flex-col justify-between`}
            >
                <div>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-semibold">Welcome to My Site!</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white text-3xl leading-none"
                        >
                            &times;
                        </button>
                    </div>

                    <nav className="flex flex-col gap-4 text-lg">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="hover:underline"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-10 text-sm">
                        <p>+1 (226)-977-6398</p>
                        <p>kkvasan99@gmail.com</p>
                    </div>

                    <div className="mt-6 flex items-center gap-4">
                        {/*      <img src="/us-flag.png" alt="US" className="w-10" />
                        <img src="/kentucky.png" alt="Kentucky" className="w-16" />*/}
                    </div>
                </div>

                {/* Theme Toggle */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() =>
                            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                        }
                        className="flex items-center space-x-2 bg-white text-blue-900 px-4 py-2 rounded"
                    >
                        {resolvedTheme === 'dark' ? (
                            <>
                                <SunIcon className="w-5 h-5"/>
                                <span>Light</span>
                            </>
                        ) : (
                            <>
                                <MoonIcon className="w-5 h-5"/>
                                <span>Dark</span>
                            </>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
}
