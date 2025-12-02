// app/our-works/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getWorkBySlug } from '@/app/lib/ourworksServer';
import { createStaticSupabase } from '@/app/lib/static-supabase';

export const dynamic = 'force-dynamic';

// Build routes ahead of time if you want; optional with force-dynamic
export async function generateStaticParams() {
    const supabase = createStaticSupabase();
    const { data } = await supabase.from('our-works').select('route');
    return data?.map((w) => ({ slug: w.route })) ?? [];
}

// NOTE: params is a Promise in Next 15 dynamic APIs — await it first.
type ParamsPromise = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: ParamsPromise }) {
    const { slug } = await params;
    const { data: work } = await getWorkBySlug(slug);

    if (!work) {
        return {
            title: 'Work Not Found | K2Digital Media',
            description: 'The requested project is not available.',
        };
    }

    const title = `${work.title} | Our Work - K2Digital Media`;
    const description =
        work.description || `View details of ${work.title} by K2Digital Media.`;
    const image = work.thumbnailURL || '/Logo.png';

    return {
        title,
        description,
        alternates: {
            canonical: `https://k2digitalmedia.ca/our-works/${slug}`,
        },
        openGraph: {
            title,
            description: work.description || '',
            url: `https://k2digitalmedia.ca/our-works/${slug}`,
            siteName: 'K2Digital Media',
            images: [{ url: image, width: 1200, height: 630, alt: work.title }],
            type: work.type === 'video' ? 'video.other' : 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${work.title} | K2Digital Media`,
            description: work.description || '',
            images: [image],
        },
    };
}

export default async function WorkDetailPage({
                                                 params,
                                             }: {
    params: ParamsPromise;
}) {
    const { slug } = await params; // ← important
    const { data: work } = await getWorkBySlug(slug);

    if (!work) return notFound();

    return (
        <main className="px-6 py-20 max-w-4xl mx-auto bg-white dark:bg-black text-black dark:text-white">
            <h1 className="text-4xl font-bold mb-4 text-blue-900 dark:text-blue-300">
                {work.title}
            </h1>

            {work.description && (
                <div className="mb-6 text-gray-700 dark:text-gray-300">
                    {work.description}
                </div>
            )}

            {work.type === 'video' && work.videoURL ? (
                <video src={work.videoURL} controls className="w-full mb-6 rounded shadow-lg" />
            ) : (
                <Image
                    src={work.thumbnailURL || '/Logo.png'}
                    alt={work.title}
                    width={800}
                    height={400}
                    className="rounded shadow-lg mb-6"
                />
            )}

            {work.content && (
                <article
                    className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: work.content }}
                />
            )}
        </main>
    );
}
