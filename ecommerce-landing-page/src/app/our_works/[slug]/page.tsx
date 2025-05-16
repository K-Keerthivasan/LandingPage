// app/our-works/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllWorks } from '@/components/backend/our-works/ourworksClient';
import Image from 'next/image';

// Generate static paths
export async function generateStaticParams() {
    const { data } = await getAllWorks();
    console.log('Available slugs:', data?.map(w => w.route));
    return data?.map(w => ({ slug: w.route })) ?? [];
}

export const dynamic = 'force-dynamic';

// ✅ Dynamic Metadata for each work
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { data } = await getAllWorks();
    const work = data?.find(w => w.route === params.slug);

    if (!work) {
        return {
            title: 'Work Not Found | K2Digital Media',
            description: 'The requested project is not available.',
        };
    }

    return {
        title: `${work.title} | Our Work - K2Digital Media`,
        description: work.description || `View details of ${work.title} by K2Digital Media.`,
        openGraph: {
            title: `${work.title} | Our Work - K2Digital Media`,
            description: work.description || '',
            url: `https://k2digitalmedia.ca/our-works/${params.slug}`,
            siteName: 'K2Digital Media',
            images: [
                {
                    url: work.thumbnailURL || '/Logo.png',
                    width: 1200,
                    height: 630,
                    alt: work.title,
                },
            ],
            type: work.type === 'video' ? 'video.other' : 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${work.title} | K2Digital Media`,
            description: work.description,
            images: [work.thumbnailURL || '/Logo.png'],
        },
    };
}

// Render the work detail page
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
