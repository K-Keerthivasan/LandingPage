// app/services/[slug]/page.tsx

import { notFound } from 'next/navigation';

import ServiceDetailClient from '@/components/services/ServiceDetailClient';
import {getAllServices} from "@/app/lib/ourserviceServer";
import {createStaticSupabase} from "@/app/lib/static-supabase";

export const revalidate = 3600;

//export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    const supabase = createStaticSupabase();
    const { data } = await supabase.from('services').select('route');
    if (!data) return [];

    return data.map(service => ({
        slug: service.route,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const supabase = createStaticSupabase();
    const { data } = await supabase.from('services').select('*').eq('route', params.slug).single();

    if (!data) {
        return {
            title: 'Service Not Found | K2Digital Media',
            description: 'This service may have been removed or is temporarily unavailable.',
        };
    }

    return {
        title: `${data.title} | K2Digital Media`,
        description: data.description || `Explore our freelance ${data.title} service.`,
        openGraph: {
            title: `${data.title} | K2Digital Media`,
            description: data.description || `Explore freelance services for ${data.title}.`,
            url: `https://k2digitalmedia.ca/services/${params.slug}`,
            siteName: 'K2Digital Media',
            images: [
                {
                    url: data.thumbnailURI || '/Logo.png',
                    width: 1200,
                    height: 630,
                    alt: `${data.title} - K2Digital Media`,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.title} | K2Digital Media`,
            description: data.description,
            images: [data.thumbnailURI || '/Logo.png'],
        },
    };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const { data } = await getAllServices();
    const service = data?.find(s => s.route === slug);

    if (!service) return notFound();

    return <ServiceDetailClient service={service} />;
}
