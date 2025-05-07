import { notFound } from 'next/navigation';
import { getAllServices } from '@/components/backend/services';
import Image from 'next/image';

export async function generateStaticParams() {
    const { data } = await getAllServices();
    if (!data) return [];

    return data.map(service => ({
        slug: service.route,
    }));
}

export default async function ServiceDetailPage({
                                                    params,
                                                }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const { data } = await getAllServices();
    const service = data?.find(s => s.route === slug);

    if (!service) return notFound();

    return (
        <main className="px-6 py-20 max-w-4xl mx-auto bg-white dark:bg-black text-black dark:text-white">
            <h1 className="text-4xl font-bold mb-4 text-blue-900 dark:text-blue-300">
                {service.title}
            </h1>
            <div className="mb-6 text-gray-700 dark:text-gray-300">
                {service.description}
            </div>

            {service.type === 'video' && service.videoURL ? (
                <video
                    src={service.videoURL}
                    controls
                    className="w-full mb-6 rounded"
                />
            ) : (
                <Image
                    src={service.thumbnailURL}
                    alt={service.title}
                    width={800}
                    height={400}
                    className="rounded"
                />
            )}

            <article
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: service.content }}
            />
        </main>
    );
}
