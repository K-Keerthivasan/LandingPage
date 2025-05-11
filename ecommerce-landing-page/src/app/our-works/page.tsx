'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/components/backend/supabaseClient';

type Work = {
    id: number;
    title: string;
    description: string;
    thumbnailURL: string;
    videoURL: string;
    route: string;
    type: 'image' | 'video';
    created_at?: string;
    content: string;
};

export default function OurWorksSection() {
    const [works, setWorks] = useState<Work[]>([]);

    useEffect(() => {
        const fetchWorks = async () => {
            const { data, error } = await supabase
                .from('our_works')
                .select('*')
                .order('created_at', { ascending: true });

            if (!error && data) setWorks(data);
        };

        fetchWorks();
    }, []);

    return (
        <div className="pl-0 md:pl-16">
            {works.map((work, index) => (
                <section
                    key={index}
                    className="px-6 py-20 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300"
                >
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        {/* Left: Image or Video */}
                        <div className="w-full h-auto">
                            {work.type === 'video' ? (
                                <video
                                    controls
                                    className="rounded-lg shadow-2xl object-cover w-full"
                                    src={work.videoURL}
                                />
                            ) : (
                                <Image
                                    src={work.thumbnailURL}
                                    alt={work.title}
                                    width={700}
                                    height={400}
                                    className="rounded-lg shadow-2xl object-cover"
                                />
                            )}
                        </div>

                        {/* Right: Content */}
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900 dark:text-blue-300">
                                {work.title}
                            </h2>
                            <div className="w-12 h-1 bg-blue-500 dark:bg-blue-300 mb-6"></div>
                            <p className="mb-4 leading-relaxed whitespace-pre-line">
                                {work.description}
                            </p>
                            <Link
                                href={`/our-works/${work.route}`}
                                className="inline-block mt-4 px-6 py-3 bg-blue-900 dark:bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                </section>
            ))}
      </div>
    );
}