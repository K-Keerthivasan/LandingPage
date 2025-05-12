import { notFound } from 'next/navigation';
import { getAllWorks } from '@/components/backend/our-works/ourworksClient';
import Image from 'next/image';

export async function generateStaticParams() {
    const { data } = await getAllWorks();
    console.log('Available slugs:', data?.map(w => w.route));
    return data?.map(w => ({ slug: w.route })) ?? [];
}

export const dynamic = 'force-dynamic';

export default async function WorkDetailPage({
                                                 params,
                                             }: {
    params: { slug: string };
}) {
    const { slug } = params;
    const { data } = await getAllWorks();
    const work = data?.find(w => w.route === slug);

    if (!work) return notFound();

    return (
        <main className="px-6 py-20 max-w-4xl mx-auto bg-white dark:bg-black text-black dark:text-white">
            <h1 className="text-4xl font-bold mb-4 text-blue-900 dark:text-blue-300">
                {work.title}
            </h1>

            <div className="mb-6 text-gray-700 dark:text-gray-300">
                {work.description}
            </div>

            {work.type === 'video' && work.videoURL ? (
                <video
                    src={work.videoURL}
                    controls
                    className="w-full mb-6 rounded shadow-lg"
                />
            ) : (
                <Image
                    src={work.thumbnailURL}
                    alt={work.title}
                    width={800}
                    height={400}
                    className="rounded shadow-lg mb-6"
                />
            )}

            <article
                className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: work.content }}
            />
        </main>
    );
}