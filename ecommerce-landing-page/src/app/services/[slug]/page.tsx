// app/services/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllServices } from '@/components/backend/service/servicesClient';
import ServiceDetailClient from '@/components/services/ServiceDetailClient';

export async function generateStaticParams() {
    const { data } = await getAllServices();
    if (!data) return [];

    return data.map(service => ({
        slug: service.route,
    }));
}

export const dynamic = 'force-dynamic';

// ✅ Dynamic Metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { data } = await getAllServices();
    const service = data?.find(s => s.route === params.slug);

    if (!service) {
        return {
            title: 'Service Not Found | K2Digital Media',
            description: 'This service may have been removed or is temporarily unavailable.',
        };
    }

    return {
        title: `${service.title} | K2Digital Media`,
        description: service.description || `Explore our freelance ${service.title} service.`,
        openGraph: {
            title: `${service.title} | K2Digital Media`,
            description: service.description || `Explore freelance services for ${service.title}.`,
            url: `https://k2digitalmedia.ca/services/${params.slug}`,
            siteName: 'K2Digital Media',
            images: [
                {
                    url: service.thumbnailURI || '/Logo.png',
                    width: 1200,
                    height: 630,
                    alt: `${service.title} - K2Digital Media`,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${service.title} | K2Digital Media`,
            description: service.description,
            images: [service.thumbnailURI || '/Logo.png'],
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
