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

export default async function ServiceDetailPage(props: { params: { slug: string } }) {
    const { slug } = props.params;

    const { data } = await getAllServices();
    const service = data?.find(s => s.route === slug);

    if (!service) return notFound();

    return <ServiceDetailClient service={service} />;
}
