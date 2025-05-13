// components/frontend/ServiceDetailClient.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ServiceDetailClient({ service }: { service: any }) {
    return (
        <motion.main
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-6 py-20 max-w-4xl mx-auto bg-white dark:bg-black text-black dark:text-white"
        >
            <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold mb-4 text-blue-900 dark:text-blue-300"
            >
                {service.title}
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mb-6 text-gray-700 dark:text-gray-300"
            >
                {service.description}
            </motion.div>

            {service.type === 'video' && service.videoURL ? (
                <motion.video
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    src={service.videoURL}
                    controls
                    className="w-full mb-6 rounded shadow-lg"
                />
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-6"
                >
                    <Image
                        src={service.thumbnailURL}
                        alt={service.title}
                        width={800}
                        height={400}
                        className="rounded shadow-lg"
                    />
                </motion.div>
            )}

            <motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: service.content }}
            />
        </motion.main>
    );
}
