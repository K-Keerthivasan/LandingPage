'use client';

import Image from 'next/image';
import Link from 'next/link';

const services = [
    {
        title: 'WEB DEVELOPMENT',
        imageUrl: 'https://i.imgur.com/vBq889D.jpeg',
        imageAlt: 'Web Development',
        description: [
            'Hatfield Media has provided web design and development for US businesses since 2009. We are here to help transform your digital presence and deliver substantial business growth.',
            'Whether it\'s your first website or a major overhaul, we provide enterprise-grade services and support, giving you the technological edge to grow.',
        ],
        buttonLabel: 'Web Development Services',
        buttonHref: '#',
    },

    {
        title: 'DIGITAL MARKETING AND SOCIAL MEDIA MANAGEMENT',
        imageUrl: 'https://i.imgur.com/ZQZ4PRe.jpeg',
        imageAlt: 'Video Production',
        description: [
            'We produce cinematic commercials, social videos, and branded documentaries that drive engagement.',
            'From script to screen, our in-house team handles all production and post workflows.',
        ],
        buttonLabel: 'Video Production Services',
        buttonHref: '#',
    },

    {
        title: 'VIDEO PRODUCTION',
        imageUrl: 'https://i.imgur.com/ZQZ4PRe.jpeg',
        imageAlt: 'Video Production',
        description: [
            'We produce cinematic commercials, social videos, and branded documentaries that drive engagement.',
            'From script to screen, our in-house team handles all production and post workflows.',
        ],
        buttonLabel: 'Video Production Services',
        buttonHref: '#',
    },
    {
        title: 'SECURITY CONSULTANT',
        imageUrl: 'https://i.imgur.com/ZQZ4PRe.jpeg',
        imageAlt: 'Video Production',
        description: [
            'We produce cinematic commercials, social videos, and branded documentaries that drive engagement.',
            'From script to screen, our in-house team handles all production and post workflows.',
        ],
        buttonLabel: 'Video Production Services',
        buttonHref: '#',
    },


    // Add more objects as needed
];

export default function ServiceSection() {
    return (
        <>
            {services.map((service, index) => (
                <section
                    key={index}
                    className="px-6 py-20 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300"
                >
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        {/* Left: Image */}
                        <div className="w-full h-auto">
                            <Image
                                src={service.imageUrl}
                                alt={service.imageAlt}
                                width={700}
                                height={400}
                                className="rounded-lg shadow-2xl object-cover"
                            />
                        </div>

                        {/* Right: Content */}
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900 dark:text-blue-300">
                                {service.title}
                            </h2>
                            <div className="w-12 h-1 bg-blue-500 dark:bg-blue-300 mb-6"></div>
                            {service.description.map((para, idx) => (
                                <p key={idx} className="mb-4 leading-relaxed">
                                    {para}
                                </p>
                            ))}
                            <Link
                                href={service.buttonHref}
                                className="inline-block mt-4 px-6 py-3 bg-blue-900 dark:bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
                            >
                                {service.buttonLabel}
                            </Link>
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
}
