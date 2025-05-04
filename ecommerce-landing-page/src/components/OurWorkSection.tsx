'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const projects = [
    {
        title: 'Kentucky Blood Center',
        img: 'https://i.imgur.com/3wZzePr.jpeg',
        label: 'Video Production',
    },
    {
        title: 'Bluegrass Train Experience',
        img: 'https://i.imgur.com/BqqinYQ.jpeg',
        label: 'Website Design & Development',
    },
    {
        title: 'Kentucky Garden Trail',
        img: 'https://i.imgur.com/uLXI9Oc.jpeg',
        label: 'Website Design & Development',
    },
    {
        title: 'Another Project',
        img: 'https://i.imgur.com/BqqinYQ.jpeg',
        label: 'Marketing',
    },
    {
        title: 'Yet Another One',
        img: 'https://i.imgur.com/3wZzePr.jpeg',
        label: 'Consulting',
    },
    // Add more projects as needed
];

const cardsPerPage = 3;

export default function OurWorkSection() {
    const [startIndex, setStartIndex] = useState(0);

    const nextCards = () => {
        setStartIndex((prevIndex) => Math.min(prevIndex + cardsPerPage, projects.length - cardsPerPage));
    };

    const prevCards = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - cardsPerPage, 0));
    };

    const visibleProjects = projects.slice(startIndex, startIndex + cardsPerPage);

    return (
        <section className="bg-white dark:bg-black text-black dark:text-white px-6 py-20 transition-colors">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-blue-900 dark:text-blue-300 mb-4">OUR WORK</h2>
                <div className="w-12 h-1 bg-gray-400 mb-6" />
                <p className="mb-12 max-w-4xl text-lg leading-relaxed">
                    Serving clients in a variety of industries throughout the United States, we specialize in custom website
                    design and development, search engine optimization (SEO), and 4K cinematic video production. Creating powerful
                    marketing campaigns, we offer a wide range of services from event production, graphic design, social media and
                    photography, to compelling content and targeted advertising. Our primary objective is to be your trusted
                    marketing resource for years to come.
                </p>

                <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {visibleProjects.map((project, idx) => (
                            <div key={idx} className="relative group overflow-hidden rounded-lg shadow-lg">
                                <Image
                                    src={project.img}
                                    alt={project.title}
                                    width={400}
                                    height={600}
                                    className="w-full h-auto object-cover"
                                />
                                <span className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 transform origin-left text-sm font-semibold text-yellow-500 tracking-widest">
                                    {project.label}
                                </span>
                            </div>
                        ))}
                    </div>
                    {projects.length > cardsPerPage && (
                        <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center -translate-y-1/2">
                            <button
                                onClick={prevCards}
                                className={`bg-white dark:bg-black text-yellow-500 rounded-full shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${startIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-label="Previous projects"
                                disabled={startIndex === 0}
                            >
                                <ChevronLeftIcon className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextCards}
                                className={`bg-white dark:bg-black text-yellow-500 rounded-full shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${startIndex >= projects.length - cardsPerPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-label="Next projects"
                                disabled={startIndex >= projects.length - cardsPerPage}
                            >
                                <ChevronRightIcon className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}