// app/our-works/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {getWorkBySlug} from "@/app/lib/ourworksServer";
import {createStaticSupabase} from "@/app/lib/static-supabase";


export const dynamic = 'force-dynamic';
export async function generateStaticParams() {
    const supabase = createStaticSupabase();
    const { data } = await supabase.from('our_works').select('route');
    return data?.map((w) => ({ slug: w.route })) ?? [];
}

// Metadata per slug
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { data: work } = await getWorkBySlug(params.slug);

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
            description: work.description || '',
            images: [work.thumbnailURL || '/Logo.png'],
        },
    };
}

// Page component
export default async function WorkDetailPage({ params }: { params: { slug: string } }) {
    const { data: work } = await getWorkBySlug(params.slug);

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
