'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Service = {
    id: number;
    title: string;
    description: string;
    thumbnailURL: string;
    videoURL: string;
    route: string;
    type: 'image' | 'video';
    created_at?: string;
    content: 'string',
};



import { supabase } from '@/components/backend/supabaseClient'; // adjust path as needed


export default function ServiceSection() {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('created_at', { ascending: true });

            if (!error && data) setServices(data);
        };

        fetchServices();
    }, []);

    return (
        <>
            {services.map((service, index) => (
                <section
                    key={index}
                    className="px-6 py-20 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300"
                >
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        {/* Left: Image or Video */}
                        <div className="w-full h-auto">
                            {service.type === 'video' ? (
                                <video
                                    controls
                                    className="rounded-lg shadow-2xl object-cover w-full"
                                    src={service.videoURL}
                                />
                            ) : (
                                <Image
                                    src={service.thumbnailURL}
                                    alt={service.title}
                                    width={700}
                                    height={400}
                                    className="rounded-lg shadow-2xl object-cover"
                                />
                            )}
                        </div>

                        {/* Right: Content */}
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900 dark:text-blue-300">
                                {service.title}
                            </h2>
                            <div className="w-12 h-1 bg-blue-500 dark:bg-blue-300 mb-6"></div>
                            <p className="mb-4 leading-relaxed whitespace-pre-line">
                                {service.description}
                            </p>
                            <Link
                                href={service.route || '#'}
                                className="inline-block mt-4 px-6 py-3 bg-blue-900 dark:bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
}
